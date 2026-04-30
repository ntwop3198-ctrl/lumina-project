import { NextResponse } from 'next/server'
import { GoogleGenerativeAI, type RequestOptions } from '@google/generative-ai'
import { ApiFeature } from '@/lib/api-usage/features'
import { enforceApiUsageGuard } from '@/lib/api-usage/guard'
import { getGoogleGenerativeAiApiKey } from '@/lib/env/google-ai'
import {
  ANALYSIS_STYLES,
  DEFAULT_ANALYSIS_STYLE,
  isAnalysisStyle,
  type AnalysisStyle,
} from '@/lib/analysis-style'

export const runtime = 'nodejs'
export const maxDuration = 60

const MAX_FETCH_BYTES = 10 * 1024 * 1024

function isAllowedStorageUrl(imageUrl: string, supabaseBase: string | undefined): boolean {
  if (!supabaseBase) return false
  const base = supabaseBase.replace(/\/$/, '')
  const prefix = `${base}/storage/v1/object/public/`
  return imageUrl.startsWith(prefix)
}

function resolveApiVersion(): RequestOptions['apiVersion'] {
  const v = process.env.GEMINI_API_VERSION?.trim().toLowerCase()
  if (v === 'v1' || v === 'v1beta') return v
  return 'v1beta'
}

const BASE_ANALYSIS_PROMPT = `당신은 K-뷰티 화장품 브랜드 디렉터입니다.
첨부된 **제품 용기/패키지 사진**만 보고 분석하세요. 사진에 없는 내용은 추측하지 말고 "확인 어려움"이라고 적으세요.

반드시 아래 형식으로 한국어로 답하세요 (소제목 유지):

## 제품으로 추정되는 유형
(예: 에센스, 크림, 립, 향수 등)

## 패키징 & 무드
색상, 재질 느낌, 전체적인 분위기

## 사진에서 읽히는 텍스트
보이는 브랜드명·용량·핵심 카피가 있으면 인용, 없으면 "뚜렷한 문구 없음"

## 상세페이지용 초안 카피 (2~3문장)
고급스럽고 신뢰가 가는 톤으로, 마케팅 과장은 자제`

function buildAnalysisPrompt(style: AnalysisStyle): string {
  const selected = ANALYSIS_STYLES[style] ?? ANALYSIS_STYLES[DEFAULT_ANALYSIS_STYLE]
  return `${BASE_ANALYSIS_PROMPT}

추가 지시:
너는 지금 선택된 [${selected.expertTitle}]의 최고 전문가야.
그 말투와 구조에 맞춰서 결과물을 작성해줘.
${selected.guide}`
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

  const guard = await enforceApiUsageGuard(request, ApiFeature.ANALYZE_PRODUCT_STREAM)
  if (!guard.ok) return guard.response

  let body: { imageUrl?: string; style?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON 본문이 필요합니다.' }, { status: 400 })
  }

  const imageUrl = body.imageUrl?.trim()
  if (!imageUrl) {
    return NextResponse.json({ error: 'imageUrl이 필요합니다.' }, { status: 400 })
  }

  let selectedStyle: AnalysisStyle = DEFAULT_ANALYSIS_STYLE
  if (body.style) {
    const candidate = body.style.trim()
    if (!isAnalysisStyle(candidate)) {
      return NextResponse.json({ error: '지원하지 않는 분석 스타일입니다.' }, { status: 400 })
    }
    selectedStyle = candidate
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

  const genAI = new GoogleGenerativeAI(apiKey)
  const modelName =
    process.env.GEMINI_VISION_MODEL?.trim() || 'gemini-2.5-flash'

  const model = genAI.getGenerativeModel(
    { model: modelName },
    {
      apiVersion: resolveApiVersion(),
      baseUrl:
        process.env.GEMINI_API_BASE_URL?.trim() ||
        'https://generativelanguage.googleapis.com',
    }
  )

  const imagePart = {
    inlineData: { mimeType, data: base64 },
  }
  const textPart = { text: buildAnalysisPrompt(selectedStyle) }

  const encoder = new TextEncoder()

  const stream = await model.generateContentStream([imagePart, textPart])

  const readable = new ReadableStream<Uint8Array>({
    start(controller) {
      ;(async () => {
        try {
          for await (const chunk of stream.stream) {
            const text = chunk.text()
            if (text) {
              controller.enqueue(encoder.encode(text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      })()
    },
  })

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

