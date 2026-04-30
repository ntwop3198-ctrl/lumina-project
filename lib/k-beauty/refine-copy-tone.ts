import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
} from '@google/generative-ai'
import { formatLexiconForPrompt } from '@/lib/k-beauty/k-beauty-sentiment'
import {
  GENESIS_TRANSFORMATION_GENERATION_CONFIG,
  GENESIS_TRANSFORMATION_SYSTEM_APPEND_KO,
} from '@/lib/lumina/paradox-engine'
import { buildLanguageUpgradePrompt } from '@/lib/prompts/language-upgrade'
import { buildDiversityRealityCheckPrompt } from '@/lib/prompts/diversity-reality-check'
import { buildDualSynchroLanguagePromptAppendix } from '@/lib/lumina/dual-synchro-charter'
import { buildNakedVesselCardLanguagePromptAppendix } from '@/lib/lumina/naked-vessel-card-charter'
import { buildTrinityCharterPromptAppendix, isTrinityCharterEnabled } from '@/lib/lumina/lumina-trinity-charter'
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
import {
  buildNarrativeSpearPromptAppendix,
  isNarrativeSpearCharterEnabled,
} from '@/lib/lumina/narrative-spear-charter'

/**
 * 한국 하이엔드 뷰티 **일기장** 톤 — LLM 시스템 지침.
 * "한국 여성들의 일기장을 읽은 듯, 욕망을 가장 우아한 한국어로 대변"하는 것이 목표.
 */
export const REFINE_COPY_LUXURY_SYSTEM_KO = `당신은 한국 하이엔드 뷰티 하우스의 수석 에디터이자, 루미나(Lumina) 전용 카피 디렉터입니다.
입력 문장의 **사실·효능·대상**은 바꾸지 않고, 말하는 방식만 바꿉니다.

## 톤: 일기장 한 페이지
- 마치 **한국 여성들의 일기장**을 읽은 듯: 하루의 피로, 거울 앞의 한순간, 스스로에게 주는 작은 보상 같은 **통점**이 문장 깊숙이 스며 있게 합니다.
- 직설("~을 좋게 만듭니다", "~에 좋습니다") 대신 **시간(밤·아침)·공간(거울·화장대)·감각(온도·숨)**의 이미지로 치환합니다.
  예: "당신의 피부를 좋게 만듭니다" → "지친 하루의 끝, 당신의 피부가 가장 먼저 만나는 고결한 휴식"
## 리듬
- 짧은 절 + 쉼표 + 여백. 명품 카탈로그·에디토리얼 광고의 호흡. 문어체와 은유를 섞되 과장 광고는 피합니다.
## 사실
- 허위 효능·의료적 약속을 **새로 만들지 않습니다**. 입력에 없는 성분·수치는 추가하지 않습니다.
## 어휘
- 아래에 주어지는 K-커뮤니티 참고 어휘는 **0~2개만**, 자연스럽게 녹입니다. 나열·남용 금지.
## 출력
- **한국어** 한 덩어리. 입력보다 길이는 대략 1.2~1.9배. 제목·따옴표 없이 본문만.` +
  buildLanguageUpgradePrompt()

const GEMINI_TEXT_FALLBACKS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-latest',
  'gemini-flash-latest',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
] as const

function isModelNotFound(err: unknown): boolean {
  return err instanceof GoogleGenerativeAIFetchError && err.status === 404
}

/**
 * 휴리스틱: 자주 쓰이는 평문 패턴을 서정적으로 치환 (API 없음).
 */
export function refineCopyToneHeuristic(plain: string): string {
  let t = plain.trim()
  if (!t) return t

  const rules: Array<[RegExp, string]> = [
    [
      /당신의\s*피부를\s*좋게\s*만듭니다/gi,
      '지친 하루의 끝, 당신의 피부가 가장 먼저 만나는 고결한 휴식을 선사합니다',
    ],
    [
      /피부를\s*건강하게\s*합니다/gi,
      '하루의 무게를 잠시 내려놓은 듯, 피부에 고요한 균형을 되찾게 합니다',
    ],
    [
      /수분을\s*공급합니다/gi,
      '속까지 차오르는 촉촉함이, 겉결에 은은히 머뭅니다',
    ],
    [
      /효과적입니다/gi,
      '매일의 리추얼 속에서, 눈에 띄는 변화를 천천히 확인하게 합니다',
    ],
    [
      /사용하기\s*쉽습니다/gi,
      '손끝에 닿는 순간부터, 부담 없이 스며드는 사용감입니다',
    ],
    [
      /피부\s*고민을\s*개선합니다/gi,
      '거울 앞에서 머물렀던 작은 고민들이, 조금씩 잦아들 만큼의 시간을 선사합니다',
    ],
    [
      /자외선으로부터\s*보호합니다/gi,
      '밝은 빛 아래에서도, 하루의 피부를 지켜 줄 얇은 숨결 같은 보호막을 더합니다',
    ],
    [
      /모든\s*피부\s*타입에\s*맞습니다/gi,
      '예민한 날과 괜찮은 날, 당신의 피부 리듬에 따라 편안히 머무릅니다',
    ],
    [
      /눈에\s*띄게\s*좋아집니다/gi,
      '서두르지 않아도, 닿는 만큼 느껴지는 변화를 천천히 기대해 보세요',
    ],
  ]

  for (const [re, rep] of rules) {
    t = t.replace(re, rep)
  }

  return t
}

/**
 * LLM 호출용 사용자 메시지.
 */
export function buildRefineCopyUserPrompt(plain: string): string {
  return `아래 문장을 위 시스템 지침대로 다듬어 주세요. 사실 왜곡 없이.

---
${plain}
---`
}

/**
 * Gemini로 서정체 변환. API 키는 호출자가 전달.
 */
export type RefineCopyGeminiOptions = {
  /** 求死 Transformation — 낡은 브랜딩 틀을 깨는 제안, temperature 상향 */
  transformationMode?: boolean
}

export async function refineCopyToneWithGemini(
  apiKey: string,
  plain: string,
  seedInput: string = '',
  options?: RefineCopyGeminiOptions,
): Promise<string> {
  const trimmed = plain.trim()
  if (!trimmed) {
    throw new Error('빈 문장입니다.')
  }

  const lexHint = formatLexiconForPrompt(14)
  const userText = `${buildRefineCopyUserPrompt(trimmed)}

[참고: K-커뮤니티 어휘 — 남용·나열 금지, 필요 시 1~2개만 자연스럽게]
${lexHint}`

  const genAI = new GoogleGenerativeAI(apiKey)
  let lastErr: unknown
  const transform = Boolean(options?.transformationMode)
  const narrativeSpear = isNarrativeSpearCharterEnabled()
    ? buildNarrativeSpearPromptAppendix()
    : ''
  const dualSynchro = buildDualSynchroLanguagePromptAppendix()
  const nakedVesselCard = buildNakedVesselCardLanguagePromptAppendix()
  const trinity = isTrinityCharterEnabled() ? buildTrinityCharterPromptAppendix() : ''
  const gusoMacro = isGusoMacroAestheticsEnabled()
    ? buildGusoMacroAestheticsPromptAppendix()
    : ''
  const rawScent = isRawScentNarrativeEnabled()
    ? buildRawScentNarrativePromptAppendix()
    : ''
  const youngNiche = isYoungNicheTargetingEnabled()
    ? buildYoungNicheTargetingPromptAppendix()
    : ''
  const customerImpression = isCustomerImpressionCharterEnabled()
    ? buildCustomerImpressionPromptAppendix()
    : ''
  const masterMotto = isMasterMottoCharterEnabled()
    ? buildMasterMottoPromptAppendix()
    : ''
  const firstPrinciple = isFirstPrincipleCharterEnabled()
    ? buildFirstPrinciplePromptAppendix()
    : ''
  const systemInstruction = [
    REFINE_COPY_LUXURY_SYSTEM_KO,
    masterMotto,
    firstPrinciple,
    transform ? GENESIS_TRANSFORMATION_SYSTEM_APPEND_KO : '',
    narrativeSpear,
    dualSynchro,
    nakedVesselCard,
    trinity,
    gusoMacro,
    rawScent,
    youngNiche,
    customerImpression,
    buildDiversityRealityCheckPrompt(seedInput || plain, 'refine'),
  ]
    .filter(Boolean)
    .join('\n\n')

  for (const modelName of GEMINI_TEXT_FALLBACKS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
        ...(transform ? { generationConfig: { ...GENESIS_TRANSFORMATION_GENERATION_CONFIG } } : {}),
      })
      const result = await model.generateContent(userText)
      const text = result.response.text()?.trim()
      if (!text) {
        throw new Error('모델이 빈 응답을 반환했습니다.')
      }
      return text
    } catch (e) {
      lastErr = e
      if (isModelNotFound(e)) {
        continue
      }
      throw e
    }
  }

  const hint =
    lastErr instanceof Error ? lastErr.message : String(lastErr ?? '알 수 없음')
  throw new Error(
    `사용 가능한 Gemini 텍스트 모델을 찾지 못했습니다. 마지막 오류: ${hint}`
  )
}

/**
 * 통합: 기본은 휴리스틱. (서버에서 Gemini와 병행하려면 \`refineCopyToneWithGemini\` 사용)
 */
export function refineCopyTone(
  plain: string,
  options?: { useHeuristic?: boolean }
): string {
  const useH = options?.useHeuristic !== false
  if (!useH) return plain
  return refineCopyToneHeuristic(plain)
}
