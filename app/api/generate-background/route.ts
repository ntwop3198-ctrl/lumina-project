import { NextResponse } from 'next/server'
import { ApiFeature } from '@/lib/api-usage/features'
import { enforceApiUsageGuard } from '@/lib/api-usage/guard'
import { getGoogleGenerativeAiApiKey } from '@/lib/env/google-ai'
import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
} from '@google/generative-ai'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import {
  ANALYSIS_STYLES,
  DEFAULT_ANALYSIS_STYLE,
  isAnalysisStyle,
  type AnalysisStyle,
} from '@/lib/analysis-style'
import { PRODUCT_IMAGES_BUCKET, sanitizeUploadFileName } from '@/lib/storage-config'

type GenerateBody = {
  id?: string
  product_name?: string
  analysis_text?: string
  analysis_style?: string | null
}

export const runtime = 'nodejs'
export const maxDuration = 60

function extractKeywords(analysisText: string): string {
  const lines = analysisText.split(/\r?\n/).map((l) => l.trim())
  const pieces: string[] = []

  for (const line of lines) {
    if (line.includes('색상') || line.toLowerCase().includes('color')) {
      pieces.push(line)
    } else if (line.includes('재질') || line.toLowerCase().includes('texture')) {
      pieces.push(line)
    } else if (line.includes('분위기') || line.includes('무드') || line.toLowerCase().includes('mood')) {
      pieces.push(line)
    }
    if (pieces.length >= 3) break
  }

  if (!pieces.length) {
    return 'soft neutral beige tones, gentle textures, calm luxurious mood'
  }

  return pieces.join(', ').slice(0, 240)
}

function buildPrompt(productName: string, style: AnalysisStyle, analysisText: string): string {
  const styleConfig = ANALYSIS_STYLES[style] ?? ANALYSIS_STYLES[DEFAULT_ANALYSIS_STYLE]
  const safeName = productName || 'high-end skincare product'
  const keywords = extractKeywords(analysisText)

  return [
    `High-end skincare product advertisement background for a ${safeName}.`,
    `Ambiance should match the "${styleConfig.expertTitle}" marketing style.`,
    `Visual keywords: ${keywords}.`,
    'Soft studio lighting, subtle bokeh, 8k resolution, minimalist editorial aesthetic.',
    'Background only, no physical bottle, no jar, no logo, no text.',
    'Focus on atmospheric environment textures such as silk, marble, glass reflections, and soft light gradients.',
  ].join(' ')
}

export async function POST(request: Request) {
  const apiKey = getGoogleGenerativeAiApiKey()
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GOOGLE_GENERATIVE_AI_API_KEY(또는 GEMINI_API_KEY)가 설정되지 않았습니다. .env.local을 확인해 주세요.',
      },
      { status: 500 }
    )
  }

  const guard = await enforceApiUsageGuard(request, ApiFeature.GENERATE_BACKGROUND)
  if (!guard.ok) return guard.response

  let body: GenerateBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON 본문이 필요합니다.' }, { status: 400 })
  }

  const id = body.id?.trim()
  if (!id) {
    return NextResponse.json({ error: 'id가 필요합니다.' }, { status: 400 })
  }

  const analysisText = (body.analysis_text ?? '').trim()
  if (!analysisText) {
    return NextResponse.json({ error: 'analysis_text가 필요합니다.' }, { status: 400 })
  }

  let style: AnalysisStyle = DEFAULT_ANALYSIS_STYLE
  if (body.analysis_style) {
    const candidate = body.analysis_style.trim()
    if (!isAnalysisStyle(candidate)) {
      return NextResponse.json({ error: '지원하지 않는 분석 스타일입니다.' }, { status: 400 })
    }
    style = candidate
  }

  const productName = (body.product_name ?? '').trim()
  const prompt = buildPrompt(productName, style, analysisText)

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const explicitModel = process.env.GOOGLE_IMAGE_MODEL?.trim()

    const modelCandidates = [
      explicitModel,
      'imagen-3.0-generate-001',
      'imagen-3.0-generate-1',
      'imagen-3.0-lite-001',
    ].filter(Boolean) as string[]

    let lastErr: unknown
    let result: any | null = null

    for (const modelName of modelCandidates) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        result = await model.generateContent(prompt)
        console.info('[generate-background] Using image model:', modelName)
        break
      } catch (e) {
        lastErr = e
        if (e instanceof GoogleGenerativeAIFetchError && e.status === 404) {
          console.error(
            `[generate-background] Model not found (${modelName}) for image generation:`,
            {
              status: e.status,
              statusText: e.statusText,
              errorDetails: (e as any).errorDetails,
            }
          )
          continue
        }
        console.error(
          `[generate-background] Image generation error with model ${modelName}:`,
          e
        )
        throw e
      }
    }

    if (!result) {
      console.error(
        '[generate-background] No usable image model found. Last error:',
        lastErr
      )
      return NextResponse.json(
        { error: '사용 가능한 이미지 생성 모델을 찾지 못했습니다.' },
        { status: 502 }
      )
    }
    const imagePart = result.response.candidates?.[0]?.content?.parts?.find(
      (p: { inlineData?: { data?: string } }) => p.inlineData
    )?.inlineData

    const base64Data: string | undefined = imagePart?.data
    if (!base64Data) {
      return NextResponse.json(
        { error: '이미지 데이터를 생성하지 못했습니다.' },
        { status: 502 }
      )
    }

    const buffer = Buffer.from(base64Data, 'base64')
    const safeName = sanitizeUploadFileName(productName || `background-${id}.png`)
    const path = `backgrounds/${id}-${Date.now()}-${safeName}`

    const { error: upErr } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(path, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/png',
      })

    if (upErr) {
      console.error('Supabase Storage upload error:', upErr)
      return NextResponse.json(
        { error: '생성된 이미지를 저장하지 못했습니다.' },
        { status: 502 }
      )
    }

    const { data } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(path)

    const publicUrl = data.publicUrl

    if (supabaseAdmin) {
      try {
        const { error: dbError } = await supabaseAdmin
          .from('product_analyses')
          .update({ background_image_url: publicUrl })
          .eq('id', id)

        if (dbError) {
          console.error('Failed to update background_image_url:', dbError)
        }
      } catch (dbErr) {
        console.error('Unexpected error while updating background_image_url:', dbErr)
      }
    }

    return NextResponse.json({ imageUrl: publicUrl })
  } catch (e) {
    if (e instanceof GoogleGenerativeAIFetchError) {
      console.error('generate-background GoogleGenerativeAIFetchError:', {
        status: e.status,
        statusText: e.statusText,
        errorDetails: (e as any).errorDetails,
      })
    } else {
      console.error('generate-background error:', e)
    }
    return NextResponse.json(
      { error: '배경 이미지를 생성하는 중 오류가 발생했습니다.' },
      { status: 502 }
    )
  }
}


