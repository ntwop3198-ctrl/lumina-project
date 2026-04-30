/**
 * Human-Safety Priority — 인체 안전성 비주얼 · Natural Logic · 이미지 프롬프트
 */

/** 결과 카드 · 에디토리얼 모크 옆 실버 태그 */
export const LUMINA_SAFETY_TAG_ORIGIN_KO = "자연 유래 100%"
export const LUMINA_SAFETY_TAG_ORIGIN_EN = "Natural Origin: 100%"
export const LUMINA_SAFETY_TAG_SKIN_KO = "피부에 안전"
export const LUMINA_SAFETY_TAG_SKIN_EN = "Safe for Skin"

/** 성분의 자서전 — 비주얼 캡션 */
export const LUMINA_INGREDIENT_AUTOBIOGRAPHY_CAPTION_KO =
  "이 벚꽃빛은 인공 색소 0%를 시각으로 말해 줍니다 — 색이 곧 성분의 자서전입니다."

export const LUMINA_INGREDIENT_AUTOBIOGRAPHY_CAPTION_EN =
  "This sakura tone is visual proof of 0% artificial dye — hue as the ingredient’s autobiography."

/** 컬러 확인 시 짧은 공감 UX */
export const LUMINA_SAFETY_EMPATHY_FLASH_KO = "피부가 먼저 알아보는 편안함"
export const LUMINA_SAFETY_EMPATHY_FLASH_EN = "Comfort skin recognizes first"

/** Natural Logic — 엔진 학습용 요약 (영문 프롬프트 친화) */
export const LUMINA_NATURAL_LOGIC_SAFETY_EN = [
  "Non-toxic clarity: natural extract color holds light in transparent depth; deep translucency signals nothing to hide — ultra-precise transmission rendering through the serum.",
  "Bio-harmony: sakura pink and dandelion yellow share wavebands close to healthy skin flush; when compositing on midnight blue, preserve tones that would rest on real hands and cheek without alien cast.",
  "Ingredient autobiography: treat intrinsic hue as a legible proxy for formulation story — never substitute neon or cosmetic lake dyes for botanical truth.",
].join(" ")

export const LUMINA_HUMAN_SAFETY_IMAGE_PROMPT_FRAGMENT = [
  "HUMAN-SAFETY PRIORITY: ban fluorescent, neon, and carnival primaries; only soft deep pastels as they appear in real cherry blossom, azalea, and dandelion extracts.",
  "Natural hue filter: no electric saturation; muted living chroma readable through crystal glass.",
  "Visual proof of safety: Tyndall scattering and forward scatter set SOFT and clean — clear moisture body, no muddy artificial precipitate; reads as trustworthy botanical suspension.",
  LUMINA_NATURAL_LOGIC_SAFETY_EN,
].join(" ")

export function buildHumanSafetyPriorityPrompt(): string {
  return LUMINA_HUMAN_SAFETY_IMAGE_PROMPT_FRAGMENT
}
