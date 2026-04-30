import { NextResponse } from 'next/server'
import {
  refineCopyToneHeuristic,
  refineCopyToneWithGemini,
} from '@/lib/k-beauty/refine-copy-tone'
import { ApiFeature } from '@/lib/api-usage/features'
import { enforceApiUsageGuard } from '@/lib/api-usage/guard'
import { getGoogleGenerativeAiApiKey } from '@/lib/env/google-ai'

export const runtime = 'nodejs'
export const maxDuration = 30

type Body = {
  text?: string
  /** true면 휴리스틱만 (API 비용 없음) */
  heuristicOnly?: boolean
  /** 선택: 브랜드/이미지별 고유성 강화를 위한 시드 힌트 */
  brandSeed?: string
  /** Genesis 역설 엔진 求死 — 낡은 브랜딩 틀을 깨는 모드 (temperature 상향) */
  transformationMode?: boolean
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON 본문이 필요합니다.' }, { status: 400 })
  }

  const text = body.text?.trim()
  if (!text) {
    return NextResponse.json({ error: 'text 필드가 필요합니다.' }, { status: 400 })
  }
  const seedInput = body.brandSeed?.trim() || text

  if (body.heuristicOnly) {
    const guard = await enforceApiUsageGuard(request, ApiFeature.REFINE_COPY, {
      estimatedCostUsdOverride: 0,
    })
    if (!guard.ok) return guard.response
    return NextResponse.json({
      refined: refineCopyToneHeuristic(text),
      mode: 'heuristic',
    })
  }

  const apiKey = getGoogleGenerativeAiApiKey()
  if (!apiKey) {
    return NextResponse.json(
      {
        error: 'GOOGLE_GENERATIVE_AI_API_KEY(또는 GEMINI_API_KEY)가 설정되지 않았습니다.',
        fallback: refineCopyToneHeuristic(text),
      },
      { status: 500 }
    )
  }

  const guard = await enforceApiUsageGuard(request, ApiFeature.REFINE_COPY)
  if (!guard.ok) return guard.response

  try {
    const refined = await refineCopyToneWithGemini(apiKey, text, seedInput, {
      transformationMode: Boolean(body.transformationMode),
    })
    return NextResponse.json({ refined, mode: 'gemini' })
  } catch (e) {
    const message = e instanceof Error ? e.message : '리파인 중 오류가 났습니다.'
    return NextResponse.json(
      {
        error: message,
        fallback: refineCopyToneHeuristic(text),
      },
      { status: 502 }
    )
  }
}
