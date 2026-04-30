import { NextResponse } from 'next/server'
import { analyzeProductImageBase64 } from '@/lib/gemini/analyze-product-image'
import { runFinalRefineGate } from '@/lib/compliance/final-refine-gate'
import { supabaseAdmin } from '@/lib/supabase'
import { ApiFeature } from '@/lib/api-usage/features'
import { enforceApiUsageGuard } from '@/lib/api-usage/guard'
import { getGoogleGenerativeAiApiKey } from '@/lib/env/google-ai'
import {
  DEFAULT_ANALYSIS_STYLE,
  isAnalysisStyle,
  type AnalysisStyle,
} from '@/lib/analysis-style'
import { isMoodKeyword, resolveStyleFromMood, type MoodKeyword } from '@/lib/mood-keywords'
import { isSentimentMode, type SentimentMode } from '@/lib/k-beauty/k-beauty-sentiment'
import {
  DEFAULT_VOICE_MODE,
  isVoiceMode,
  type VoiceMode,
} from '@/lib/narrative/voice-mode'

export const runtime = 'nodejs'
export const maxDuration = 60

const MAX_FETCH_BYTES = 10 * 1024 * 1024

function isAllowedStorageUrl(imageUrl: string, supabaseBase: string | undefined): boolean {
  if (!supabaseBase) return false
  const base = supabaseBase.replace(/\/$/, '')
  const prefix = `${base}/storage/v1/object/public/`
  return imageUrl.startsWith(prefix)
}

export async function POST(request: Request) {
  const apiKey = getGoogleGenerativeAiApiKey()
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GOOGLE_GENERATIVE_AI_API_KEY(또는 GEMINI_API_KEY)가 설정되지 않았습니다. .env.local을 확인하세요.',
      },
      { status: 500 }
    )
  }

  const guard = await enforceApiUsageGuard(request, ApiFeature.ANALYZE_PRODUCT)
  if (!guard.ok) return guard.response

  let body: {
    imageUrl?: string
    style?: string
    mood?: string
    sentimentMode?: string
    narrativeStructure?: boolean
    voiceMode?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON 본문이 필요합니다.' }, { status: 400 })
  }

  const imageUrl = body.imageUrl?.trim()
  if (!imageUrl) {
    return NextResponse.json({ error: 'imageUrl이 필요합니다.' }, { status: 400 })
  }
  const brandSeed = imageUrl

  let mood: MoodKeyword | null = null
  if (body.mood?.trim()) {
    const m = body.mood.trim().toLowerCase()
    if (!isMoodKeyword(m)) {
      return NextResponse.json({ error: '지원하지 않는 감성 키워드입니다. (chic, dreamy, bold, minimal)' }, { status: 400 })
    }
    mood = m
  }

  let selectedStyle: AnalysisStyle = DEFAULT_ANALYSIS_STYLE
  if (mood) {
    selectedStyle = resolveStyleFromMood(mood)
  } else if (body.style) {
    const candidate = body.style.trim()
    if (!isAnalysisStyle(candidate)) {
      return NextResponse.json({ error: '지원하지 않는 분석 스타일입니다.' }, { status: 400 })
    }
    selectedStyle = candidate
  }

  let sentimentMode: SentimentMode = 'empathy'
  if (body.sentimentMode?.trim()) {
    const s = body.sentimentMode.trim().toLowerCase()
    if (!isSentimentMode(s)) {
      return NextResponse.json(
        { error: 'sentimentMode는 direct 또는 empathy 여야 합니다.' },
        { status: 400 }
      )
    }
    sentimentMode = s
  }

  const narrativeStructure =
    typeof body.narrativeStructure === 'boolean' ? body.narrativeStructure : true

  let voiceMode: VoiceMode = DEFAULT_VOICE_MODE
  if (body.voiceMode?.trim()) {
    const v = body.voiceMode.trim().toLowerCase()
    if (!isVoiceMode(v)) {
      return NextResponse.json(
        { error: 'voiceMode는 confession 또는 neutral 입니다.' },
        { status: 400 }
      )
    }
    voiceMode = v
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  if (!isAllowedStorageUrl(imageUrl, supabaseUrl)) {
    return NextResponse.json(
      { error: '허용되지 않은 이미지 주소입니다. Supabase Storage 공개 URL만 사용할 수 있어요.' },
      { status: 400 }
    )
  }

  const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(30_000) })
  if (!imgRes.ok) {
    return NextResponse.json(
      { error: `이미지를 불러오지 못했습니다 (${imgRes.status})` },
      { status: 502 }
    )
  }

  const lenHeader = imgRes.headers.get('content-length')
  if (lenHeader && parseInt(lenHeader, 10) > MAX_FETCH_BYTES) {
    return NextResponse.json({ error: '이미지가 너무 큽니다.' }, { status: 400 })
  }

  const buf = await imgRes.arrayBuffer()
  if (buf.byteLength > MAX_FETCH_BYTES) {
    return NextResponse.json({ error: '이미지가 너무 큽니다.' }, { status: 400 })
  }

  const mimeType = imgRes.headers.get('content-type')?.split(';')[0]?.trim() || 'image/jpeg'
  if (!mimeType.startsWith('image/')) {
    return NextResponse.json({ error: '이미지가 아닌 응답입니다.' }, { status: 400 })
  }

  const base64 = Buffer.from(buf).toString('base64')
  const modelName = process.env.GEMINI_VISION_MODEL?.trim() || null

  try {
    const rawAnalysis = await analyzeProductImageBase64(
      apiKey,
      mimeType,
      base64,
      modelName,
      selectedStyle,
      mood,
      sentimentMode,
      narrativeStructure,
      voiceMode,
      brandSeed
    )

    const refined = await runFinalRefineGate(rawAnalysis)

    // 분석 결과를 Supabase에 기록 (service role 설정 시) — 정제본만 저장
    let historyId: string | null = null
    if (supabaseAdmin) {
      try {
        const { data: inserted, error: dbError } = await supabaseAdmin
          .from('product_analyses')
          .insert({
            image_url: imageUrl,
            analysis_text: refined.documentForPersistence,
            analysis_style: selectedStyle,
          })
          .select('id')
          .single()

        if (dbError) {
          console.error('Failed to insert into product_analyses:', dbError)
        } else if (inserted?.id) {
          historyId = String(inserted.id)
        }
      } catch (dbErr) {
        console.error('Unexpected error while inserting into product_analyses:', dbErr)
      }
    }

    return NextResponse.json({
      analysis: refined.documentForPersistence,
      compliance: refined.snapshot,
      historyId,
    })
  } catch (e) {
    console.error('Gemini analyze error:', e)
    const message = e instanceof Error ? e.message : '분석 중 오류가 났습니다.'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
