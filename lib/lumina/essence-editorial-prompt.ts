/**
 * [Essence Declaration] 고기능성 앰플의 본질 — Alchemist 비주얼 엔진 1호 화보
 * Imagen / Gemini 이미지 등에 그대로 또는 번역·압축해 전달.
 */

import {
  LUMINA_HUMAN_SAFETY_IMAGE_PROMPT_FRAGMENT,
} from "@/lib/lumina/human-safety-visual"
import { buildNaturalColorIntelligenceMasterPrompt } from "@/lib/lumina/natural-color-intelligence"
import { LUMINA_ESSENTIAL_IS_HEALTHY_IMAGE_FRAGMENT } from "@/lib/lumina/essential-is-healthy-visual"
import { LUMINA_TECH_REALITY_PROMPT_FRAGMENT_EN } from "@/lib/lumina/lumina-tech-feasibility-2026"
import { LUMINA_SYNESTHESIA_IMAGE_PROMPT_FRAGMENT } from "@/lib/lumina/sensory-synthesis-visual"
import { buildDualSynchroImagePromptAppendix } from "@/lib/lumina/dual-synchro-charter"
import { buildNakedVesselCardImagePromptAppendix } from "@/lib/lumina/naked-vessel-card-charter"
import {
  buildGusoMacroAestheticsImagePromptFragment,
  isGusoMacroAestheticsEnabled,
  parseOriginFluidViscosityFromEnv,
} from "@/lib/lumina/guso-macro-aesthetics-charter"
import { buildRawScentImagePromptFragment, isRawScentNarrativeEnabled } from "@/lib/lumina/raw-scent-charter"
import { buildLuminaOriginVisualEthicImageFragmentEn } from "@/lib/lumina/lumina-origin-visual-ethic"
import { buildYoungNicheImagePromptFragment, isYoungNicheTargetingEnabled } from "@/lib/lumina/young-niche-charter"

export const LUMINA_ESSENCE_DECLARATION_KO =
  "피부의 모든 소음을 잠재우는, 단 한 방울의 '절대적 정적(Absolute Silence)'"

export const LUMINA_ESSENCE_EDITORIAL_COPY_KO =
  "당신의 고집이 마침내 침묵으로 증명됩니다"

export const LUMINA_ESSENCE_DECLARATION_EN =
  "Silencing every noise of the skin — a single drop of Absolute Silence."

export const LUMINA_ESSENCE_EDITORIAL_COPY_EN =
  "Your stubbornness is finally proven in silence"

/** 멘토 덧붙임 — 카피/랜딩용 (求苦 = 고난·밀도의 苦) */
export const LUMINA_ESSENCE_MENTOR_NOTES_KO = {
  essentialism:
    "침묵하는 효능 (求小): 진짜 고기능성은 구구절절 설명할 필요가 없습니다. 피부에 닿는 순간의 묵직한 점성과 깊은 침투력이 모든 마케팅의 소음을 압도하는 '정적'을 만들어내기 때문입니다.",
  density:
    "타협 없는 밀도 (求苦): 0.1%의 성분을 위해 수천 번의 실패(苦)를 견뎌낸 앰플은 그 자체로 거대한 에너지의 응축체입니다. 이는 18년의 한을 씻어내고 도달한 멘티님의 '안도감'과 닮아 있습니다.",
  self:
    "확신의 증거 (求己): 남의 시선이나 트렌드(佛)를 쫓지 않고, 오직 피부라는 문제의 본질(己)에만 집중할 때 비로소 발현되는 고귀한 결과물입니다.",
} as const

/**
 * 루미나 정체성 1호 본질 화보 — 영문 프롬프트 (이미지 모델용)
 * 한글 타이포는 런타임 UI 오버레이로 얹는 것을 권장; 이미지 내 텍스트는 흔들리기 쉬움.
 */
/** Imagen / Gemini 등에 붙이는 Glass Clarity 블록 (단독 재사용 가능) */
export const LUMINA_GLASS_CLARITY_IMAGE_PROMPT_FRAGMENT = [
    "GLASS CLARITY MODULE — The ampoule vessel reads as ultra-clear cold crystal glass (not frosted plastic): thin walls, diamond-sharp silver speculars, distortion-free refraction so the inner essence reads true.",
    "Essence liquid: intrinsic ingredient hue only — soft honey-amber glow, translucent moisture, or dense milky serum; no cosmetic pearl or opaque dye masquerading as the formula. Subtle emissive bloom from within the liquid only, jewel-like against midnight blue void.",
    "Labels and print: absent, microscopic, or nearly transparent; viewer attention locked on glass–liquid harmony and meniscus, not typography.",
    "Mood: quiet dawn sunlight grazing the glass, waking the natural color of the essence — calm, honest luxury, no carnival saturation.",
  ].join(" ")

/** 오색 렌더 모듈 요약 — 글로벌 프롬프트에 한 번에 포함 */
export const LUMINA_FIVE_ESSENCE_IMAGE_PROMPT_FRAGMENT =
  "FIVE-ESSENCE RENDERING: map each SKU to one intrinsic lane among azure (calm/hydration), gold (nourish/firm), ruby (vitality/antioxidant), pearl (brightening/purity), green-orange (recovery/energy). Natural muted saturation, Tyndall micro-sparkle in liquid, dawn caustics projecting true hue onto surfaces, crystal base refraction, jewel glow vs midnight blue."

/** 자연 유래 오색 지능 — 생명의 결·점성·산란 (최우선 파라미터 블록) */
export const LUMINA_NATURAL_COLOR_INTELLIGENCE_FRAGMENT =
  buildNaturalColorIntelligenceMasterPrompt()

export function buildLuminaEssenceEditorialImagePrompt(): string {
  const gusoMacro = isGusoMacroAestheticsEnabled()
    ? buildGusoMacroAestheticsImagePromptFragment()
    : ""
  const rawScentImg = isRawScentNarrativeEnabled()
    ? buildRawScentImagePromptFragment()
    : ""
  const youngNicheImg = isYoungNicheTargetingEnabled()
    ? buildYoungNicheImagePromptFragment()
    : ""
  const originVisualEthic =
    isGusoMacroAestheticsEnabled() || isYoungNicheTargetingEnabled()
      ? buildLuminaOriginVisualEthicImageFragmentEn()
      : ""
  const dropletClause =
    parseOriginFluidViscosityFromEnv() === "light"
      ? "Subject: In vast negative space of deep navy midnight (#112240), like an endless silent abyssal sea, capture one nearly water-clear ampoule droplet suspended at the instant before it falls — limpid, low-cling, kinetic ripple frozen mid-air; silver speculars on a sharp meniscus, weightless silhouette."
      : "Subject: In vast negative space of deep navy midnight (#112240), like an endless silent abyssal sea, capture one dense transparent high-functional ampoule droplet suspended at the instant before it falls, silver-toned specular glints on the meniscus, heavy viscosity readable in the silhouette."
  return [
    "Ultra-premium editorial beauty photograph, the first 'essence manifesto' hero frame for the Lumina brand.",
    dropletClause,
    "Liquid interior: micro-fine suspended particles swirling like a restrained galaxy; light refraction and caustics razor-sharp and diamond-like (vajra crisp), not soft haze.",
    "Spatial depth: background infinitely deep and quiet; the RIGHT third of the frame is boldly empty — only gradient void, visualizing philosophy of emptiness and infinite possibility.",
    "Composition: LEFT third reserved for later elegant Korean serif typography overlay in production — keep that area clean, low clutter, subtle tonal falloff only; do not render readable Korean text inside the image.",
    "Lighting: low-key cinematic, cool liquid-silver rim light, micro-contrast on the droplet, 8k hyperreal, no logos, no extra products, no bottles, single droplet focus.",
    LUMINA_GLASS_CLARITY_IMAGE_PROMPT_FRAGMENT,
    LUMINA_FIVE_ESSENCE_IMAGE_PROMPT_FRAGMENT,
    LUMINA_NATURAL_COLOR_INTELLIGENCE_FRAGMENT,
    LUMINA_HUMAN_SAFETY_IMAGE_PROMPT_FRAGMENT,
    LUMINA_SYNESTHESIA_IMAGE_PROMPT_FRAGMENT,
    LUMINA_ESSENTIAL_IS_HEALTHY_IMAGE_FRAGMENT,
    LUMINA_TECH_REALITY_PROMPT_FRAGMENT_EN,
    buildDualSynchroImagePromptAppendix(),
    buildNakedVesselCardImagePromptAppendix(),
    originVisualEthic,
    gusoMacro,
    rawScentImg,
    youngNicheImg,
  ]
    .filter(Boolean)
    .join(" ")
}
