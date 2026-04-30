import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  type RequestOptions,
} from '@google/generative-ai'
import {
  ANALYSIS_STYLES,
  DEFAULT_ANALYSIS_STYLE,
  type AnalysisStyle,
} from '@/lib/analysis-style'
import { K_AESTHETIC_SENSORY_COPY_GUIDELINES } from '@/lib/prompts/k-aesthetic-sensory'
import { buildSentimentModeBlock } from '@/lib/prompts/k-beauty-emotional'
import { buildLanguageUpgradePrompt } from '@/lib/prompts/language-upgrade'
import { buildDiversityRealityCheckPrompt } from '@/lib/prompts/diversity-reality-check'
import {
  buildNarrativeStructurePrompt,
  buildVoiceModeAppendix,
} from '@/lib/prompts/narrative-sync'
import { DEFAULT_VOICE_MODE, type VoiceMode } from '@/lib/narrative/voice-mode'
import { type SentimentMode } from '@/lib/k-beauty/k-beauty-sentiment'
import { type MoodKeyword, moodPromptBlock } from '@/lib/mood-keywords'
import { buildEnCharterPromptAppendix, isEnCharterEnabled } from '@/lib/lumina/en-charter'
import { buildGusoCharterPromptAppendix, isGusoCharterEnabled } from '@/lib/lumina/guso-charter'
import {
  buildGusoMacroAestheticsPromptAppendix,
  isGusoMacroAestheticsEnabled,
} from '@/lib/lumina/guso-macro-aesthetics-charter'
import {
  buildRawScentNarrativePromptAppendix,
  isRawScentNarrativeEnabled,
} from '@/lib/lumina/raw-scent-charter'
import {
  buildYoungNicheTargetingPromptAppendix,
  isYoungNicheTargetingEnabled,
} from '@/lib/lumina/young-niche-charter'
import { buildTrinityCharterPromptAppendix, isTrinityCharterEnabled } from '@/lib/lumina/lumina-trinity-charter'
import { buildLoveCharterPromptAppendix, isLoveCharterEnabled } from '@/lib/lumina/love-charter'
import { buildMeiCharterPromptAppendix, isMeiCharterEnabled } from '@/lib/lumina/mei-charter'
import { buildXinCharterPromptAppendix, isXinCharterEnabled } from '@/lib/lumina/xin-charter'
import { buildVulnerabilityHonestyPromptAppendix } from '@/lib/lumina/vulnerability-marketing'
import { buildDuCharterPromptAppendix, isDuCharterEnabled } from '@/lib/lumina/du-charter'
import { buildMingCharterPromptAppendix, isMingCharterEnabled } from '@/lib/lumina/ming-charter'
import {
  buildShuangxiCharterPromptAppendix,
  isShuangxiCharterEnabled,
} from '@/lib/lumina/shuangxi-charter'
import { buildTanCharterPromptAppendix, isTanCharterEnabled } from '@/lib/lumina/tan-charter'
import {
  buildIntelligencePriorityPromptAppendix,
  isIntelligencePriorityCharterEnabled,
} from '@/lib/lumina/intelligence-priority'
import { buildDualSynchroLanguagePromptAppendix } from '@/lib/lumina/dual-synchro-charter'
import { buildNakedVesselCardLanguagePromptAppendix } from '@/lib/lumina/naked-vessel-card-charter'
import {
  buildNarrativeSpearPromptAppendix,
  isNarrativeSpearCharterEnabled,
} from '@/lib/lumina/narrative-spear-charter'
import { buildZenCharterPromptAppendix, isZenCharterEnabled } from '@/lib/lumina/zen-charter'
import {
  buildMasterMottoPromptAppendix,
  isMasterMottoCharterEnabled,
} from '@/lib/lumina/lumina-master-motto-charter'
import {
  buildFirstPrinciplePromptAppendix,
  isFirstPrincipleCharterEnabled,
} from '@/lib/lumina/lumina-first-principle-charter'
import {
  buildCustomerImpressionPromptAppendix,
  isCustomerImpressionCharterEnabled,
} from '@/lib/lumina/lumina-customer-impression-charter'

function buildBaseAnalysisPrompt(
  narrativeStructure: boolean,
  voiceMode: VoiceMode,
  brandSeed: string
): string {
  const legacyDetail = `## 상세페이지용 초안 카피 (2~3문장)
럭셔리하고 권위 있는 톤으로, 고객의 구매 욕구를 자극하는 심리학적 기법(희소성·손실 회피·자기 보상 등)을 자연스럽게 녹여 작성하세요. 마케팅 과장은 자제하되, 프리미엄 브랜드다운 자신감은 분명히 드러내세요.
`
  const narrativeDetail = `${buildNarrativeStructurePrompt()}${buildVoiceModeAppendix(voiceMode)}`

  return `당신은 20년 경력의 글로벌 화장품 패키징 전문가이자, 100억 매출을 만든 수석 카피라이터입니다.
첨부된 **제품 용기/패키지 사진**만 보고 전문적으로 분석하세요. 사진에 없는 내용은 추측하지 말고 "확인 어려움"이라고 적으세요.

반드시 아래 형식으로 한국어로 답하세요 (소제목 유지):

## 제품으로 추정되는 유형
(예: 에센스, 크림, 립, 향수 등)

## 패키징 & 무드
에어리스(Airless), 차광, 제형 보호 구조 등 용기의 기술적 장점을 공학적으로 설명하고, 색상·재질·전체적인 분위기를 함께 정리하세요.

## 사진에서 읽히는 텍스트
보이는 브랜드명·용량·핵심 카피가 있으면 인용하고, 메시지가 어떤 포지셔닝(예: 민감성 피부, 안티에이징 등)에 맞춰져 있는지 해석하세요. 없으면 "뚜렷한 문구 없음"

${narrativeStructure ? narrativeDetail : legacyDetail}

${K_AESTHETIC_SENSORY_COPY_GUIDELINES}

${buildLanguageUpgradePrompt()}

${buildDiversityRealityCheckPrompt(brandSeed, "analysis")}`
}

function buildAnalysisPrompt(
  style: AnalysisStyle,
  mood?: MoodKeyword | null,
  sentimentMode: SentimentMode = 'empathy',
  narrativeStructure = true,
  voiceMode: VoiceMode = DEFAULT_VOICE_MODE,
  brandSeed: string = ''
): string {
  const selected = ANALYSIS_STYLES[style] ?? ANALYSIS_STYLES[DEFAULT_ANALYSIS_STYLE]
  const moodBlock = mood ? moodPromptBlock(mood) : ''
  const sentimentBlock = buildSentimentModeBlock(sentimentMode)
  const base = buildBaseAnalysisPrompt(narrativeStructure, voiceMode, brandSeed)
  const truthLabel =
    process.env.LUMINA_VULNERABILITY_HONESTY?.trim() === '0'
      ? ''
      : `\n\n${buildVulnerabilityHonestyPromptAppendix()}`

  const masterMottoBlock = isMasterMottoCharterEnabled()
    ? `\n\n${buildMasterMottoPromptAppendix()}`
    : ''
  const firstPrincipleBlock = isFirstPrincipleCharterEnabled()
    ? `\n\n${buildFirstPrinciplePromptAppendix()}`
    : ''
  const gusoBlock = isGusoCharterEnabled() ? `\n\n${buildGusoCharterPromptAppendix()}` : ''
  const gusoMacroBlock = isGusoMacroAestheticsEnabled()
    ? `\n\n${buildGusoMacroAestheticsPromptAppendix()}`
    : ''
  const rawScentBlock = isRawScentNarrativeEnabled()
    ? `\n\n${buildRawScentNarrativePromptAppendix()}`
    : ''
  const youngNicheBlock = isYoungNicheTargetingEnabled()
    ? `\n\n${buildYoungNicheTargetingPromptAppendix()}`
    : ''
  const customerImpressionBlock = isCustomerImpressionCharterEnabled()
    ? `\n\n${buildCustomerImpressionPromptAppendix()}`
    : ''
  const trinityBlock = isTrinityCharterEnabled() ? `\n\n${buildTrinityCharterPromptAppendix()}` : ''
  const enBlock = isEnCharterEnabled() ? `\n\n${buildEnCharterPromptAppendix()}` : ''
  const xinBlock = isXinCharterEnabled() ? `\n\n${buildXinCharterPromptAppendix()}` : ''
  const meiBlock = isMeiCharterEnabled() ? `\n\n${buildMeiCharterPromptAppendix()}` : ''
  const loveBlock = isLoveCharterEnabled() ? `\n\n${buildLoveCharterPromptAppendix()}` : ''
  const zenBlock = isZenCharterEnabled() ? `\n\n${buildZenCharterPromptAppendix()}` : ''
  const duBlock = isDuCharterEnabled() ? `\n\n${buildDuCharterPromptAppendix()}` : ''
  const mingBlock = isMingCharterEnabled() ? `\n\n${buildMingCharterPromptAppendix()}` : ''
  const tanBlock = isTanCharterEnabled() ? `\n\n${buildTanCharterPromptAppendix()}` : ''
  const shuangxiBlock = isShuangxiCharterEnabled()
    ? `\n\n${buildShuangxiCharterPromptAppendix()}`
    : ''
  const intelligenceFirstBlock = isIntelligencePriorityCharterEnabled()
    ? `\n\n${buildIntelligencePriorityPromptAppendix()}`
    : ''
  const narrativeSpearBlock = isNarrativeSpearCharterEnabled()
    ? `\n\n${buildNarrativeSpearPromptAppendix()}`
    : ''
  const dualSynchroLang = buildDualSynchroLanguagePromptAppendix()
  const dualSynchroBlock = dualSynchroLang ? `\n\n${dualSynchroLang}` : ''
  const nakedVesselLang = buildNakedVesselCardLanguagePromptAppendix()
  const nakedVesselBlock = nakedVesselLang ? `\n\n${nakedVesselLang}` : ''

  return `${base}${moodBlock}

${sentimentBlock}

추가 지시:
너는 지금 선택된 [${selected.expertTitle}]의 최고 전문가야.
그 말투와 구조에 맞춰서 결과물을 작성해줘.
${selected.guide}${truthLabel}${masterMottoBlock}${firstPrincipleBlock}${gusoBlock}${gusoMacroBlock}${rawScentBlock}${youngNicheBlock}${customerImpressionBlock}${trinityBlock}${enBlock}${xinBlock}${meiBlock}${loveBlock}${zenBlock}${duBlock}${mingBlock}${tanBlock}${shuangxiBlock}${intelligenceFirstBlock}${narrativeSpearBlock}${dualSynchroBlock}${nakedVesselBlock}`
}

/**
 * Google AI Studio 기준 (2025~2026) 안정·비전 지원 모델 우선.
 * `gemini-1.5-flash` 단독 이름은 지역/계정에 따라 404가 날 수 있어 최신 2.5를 먼저 둡니다.
 * @see https://ai.google.dev/gemini-api/docs/models/gemini
 */
export const GEMINI_VISION_MODEL_FALLBACKS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-latest',
  'gemini-flash-latest',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
] as const

function resolveApiVersion(): RequestOptions['apiVersion'] {
  const v = process.env.GEMINI_API_VERSION?.trim().toLowerCase()
  if (v === 'v1' || v === 'v1beta') return v
  /** SDK 기본과 동일: generativelanguage.googleapis.com/v1beta/... */
  return 'v1beta'
}

function buildRequestOptions(): RequestOptions {
  return {
    apiVersion: resolveApiVersion(),
    baseUrl:
      process.env.GEMINI_API_BASE_URL?.trim() ||
      'https://generativelanguage.googleapis.com',
  }
}

async function generateOnce(
  apiKey: string,
  mimeType: string,
  base64Data: string,
  modelName: string,
  requestOptions: RequestOptions,
  style: AnalysisStyle,
  mood?: MoodKeyword | null,
  sentimentMode: SentimentMode = 'empathy',
  narrativeStructure = true,
  voiceMode: VoiceMode = DEFAULT_VOICE_MODE,
  brandSeed: string = ''
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: modelName }, requestOptions)

  const imagePart = {
    inlineData: { mimeType, data: base64Data },
  }
  const textPart = {
    text: buildAnalysisPrompt(
      style,
      mood,
      sentimentMode,
      narrativeStructure,
      voiceMode,
      brandSeed
    ),
  }

  const result = await model.generateContent([imagePart, textPart])
  const text = result.response.text()
  if (!text?.trim()) {
    throw new Error('모델이 빈 응답을 반환했습니다.')
  }
  return text.trim()
}

function isModelNotFound(err: unknown): boolean {
  return err instanceof GoogleGenerativeAIFetchError && err.status === 404
}

/**
 * 선호 모델(env) → 고정 폴백 순으로 시도. 모델 엔드포인트 404일 때만 다음 이름으로 넘어갑니다.
 */
export async function analyzeProductImageBase64(
  apiKey: string,
  mimeType: string,
  base64Data: string,
  preferredModel?: string | null,
  style: AnalysisStyle = DEFAULT_ANALYSIS_STYLE,
  mood?: MoodKeyword | null,
  sentimentMode: SentimentMode = 'empathy',
  narrativeStructure = true,
  voiceMode: VoiceMode = DEFAULT_VOICE_MODE,
  brandSeed: string = ''
): Promise<string> {
  const requestOptions = buildRequestOptions()
  const preferred = preferredModel?.trim()
  const chain: string[] = []
  if (preferred) {
    chain.push(preferred)
  }
  for (const m of GEMINI_VISION_MODEL_FALLBACKS) {
    if (!chain.includes(m)) chain.push(m)
  }

  let lastErr: unknown
  for (const modelName of chain) {
    try {
      return await generateOnce(
        apiKey,
        mimeType,
        base64Data,
        modelName,
        requestOptions,
        style,
        mood,
        sentimentMode,
        narrativeStructure,
        voiceMode,
        brandSeed
      )
    } catch (e) {
      lastErr = e
      if (isModelNotFound(e)) {
        console.warn(`[Gemini] 모델 "${modelName}" 사용 불가(404), 다음 후보 시도…`)
        continue
      }
      throw e
    }
  }

  const hint =
    lastErr instanceof Error ? lastErr.message : String(lastErr ?? '알 수 없음')
  throw new Error(
    `사용 가능한 Gemini 비전 모델을 찾지 못했습니다. GEMINI_VISION_MODEL·GEMINI_API_VERSION(.env)을 확인하세요. 마지막 오류: ${hint}`
  )
}
