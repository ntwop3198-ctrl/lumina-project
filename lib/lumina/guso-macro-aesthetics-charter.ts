/**
 * 구소 매크로 미학 — Lumina Origin 상단 서사·비주얼 지휘 (求小: 입자·여백·맨 유리).
 * 법적: 향·성분·질감은 사진·COA·실제 배합과 어긋나게 서술하지 않는다.
 */

import { isGusoCharterEnabled } from "@/lib/lumina/guso-charter"
import {
  parseOriginCardLayoutBiasFromEnv,
  parseOriginCardPaperToneFromEnv,
} from "@/lib/lumina/lumina-origin-card-env"
/** 플래그십 Origin PDP 헤드라인(한국어) — 엔진·랜딩 공통 참조 */
export const LUMINA_ORIGIN_GUSO_HEADLINE_KO =
  "우리는 당신의 눈에 잘 보이지 않는 '작은 것'에 미쳐 있습니다."

export const LUMINA_ORIGIN_GUSO_SUBCOPY_KO =
  "거대한 마케팅 수사를 걷어내고 나니, 오직 성분의 입자와 유리의 투명함만 남았습니다. 루미나 오리진은 그 찰나의 진실을 위해 99%의 화려함을 기꺼이 버렸습니다."

export const LUMINA_ORIGIN_GUSO_HEADLINE_EN =
  "We are obsessed with the 'small things' your eyes barely register."

export const LUMINA_ORIGIN_GUSO_SUBCOPY_EN =
  "Strip away grand marketing rhetoric, and only ingredient particles and the honesty of glass remain. Lumina Origin gladly abandons ninety-nine percent of spectacle for that fleeting truth."

/** 저점도·물 같은 오일 — 카드·히어로 참고 (사실과 맞을 때만 본문 사용) */
export const LUMINA_ORIGIN_KINETIC_PURITY_THEME_KO =
  "거친 땅에서 피어난 가장 맑은 눈물."

export const LUMINA_ORIGIN_KINETIC_PURITY_THEME_EN =
  "The clearest tear sprung from stubborn earth."

export const LUMINA_ORIGIN_WEIGHTLESS_TRUTH_KO =
  "무게를 덜어내고 맑게 담았습니다. 끈적임을 과시하지 않고, 원료의 숨결이 스치듯 남는 산뜻한 잔상을 지향합니다."

export const LUMINA_ORIGIN_WEIGHTLESS_TRUTH_EN =
  "We shed weight and kept clarity. No cling as spectacle — only a clean trace where raw material breath once passed."

export const LUMINA_ORIGIN_WEIGHTLESS_REBUTTAL_KO =
  "가볍다고 비었음을 뜻하지 않습니다. 불필요한 번질거림만 걷어내고, 투명하게 읽히는 농축을 택했음을 — 배합·사용감이 허락할 때 — 설명합니다."

export const LUMINA_ORIGIN_WEIGHTLESS_REBUTTAL_EN =
  "Light is not empty. Where the formula allows, we trade tack for transparent density — say it only when the product truly reads that way."

export function isGusoMacroAestheticsEnabled(): boolean {
  if (process.env.LUMINA_GUSO_MACRO_AESTHETICS?.trim() === "0") return false
  return isGusoCharterEnabled()
}

/**
 * 求小 1순위 · Micro-Sense(미시감) — 오늘 비주얼·카피 연산을 입자·미세면에 몰빵.
 * `LUMINA_GUSO_MICRO_SENSE_PRIORITY=0` 끔 · `=1` 강제 켬 · 미설정 시 매크로 미학과 함께 켜짐.
 */
export function isGusoMicroSensePriorityEnabled(): boolean {
  const v = process.env.LUMINA_GUSO_MICRO_SENSE_PRIORITY?.trim()
  if (v === "0") return false
  if (v === "1") return true
  return isGusoMacroAestheticsEnabled()
}

export type LuminaOriginFluidViscosityHint = "light" | "dense" | "neutral"

/** 오일·세럼 제형 감: light(물처럼) | dense(꿀·농축) | neutral(브리프에 맡김). `LUMINA_ORIGIN_FLUID_VISCOSITY` */
export function parseOriginFluidViscosityFromEnv(): LuminaOriginFluidViscosityHint {
  const raw = process.env.LUMINA_ORIGIN_FLUID_VISCOSITY?.trim().toLowerCase() ?? ""
  if (
    raw === "light" ||
    raw === "water" ||
    raw === "thin" ||
    raw === "물" ||
    raw === "순수"
  ) {
    return "light"
  }
  if (
    raw === "dense" ||
    raw === "honey" ||
    raw === "thick" ||
    raw === "heavy" ||
    raw === "꿀" ||
    raw === "묵직"
  ) {
    return "dense"
  }
  return "neutral"
}

function buildMicroSensePromptAppendix(): string {
  return `

### 구소 Micro-Attack · 미시적 진실 (1순위 기둥)
5. **Visual: Dancing particle**  
   전신 제품 샷은 **과감히 배경·축소**하고, **오일·세럼 속 단일 원료 입자**(불규칙 단면·미세 산란)가 프레임을 지배하는 클로즈업을 최우선으로 서술·제안한다. **8K급 초미세 디테일**은 **스타일 지시**로만 쓰고, **실제 해상도·측정값을 단정하지 않는다**.

6. **Quiet copy · 작은 것의 경이**  
   수식어·빈 슈퍼라티브를 줄이고, **미세 디테일의 완결성·정직한 질감**만 낮은 톤으로 읊는다.

7. **수치 금지(미검증)**  
   **0.1mm, 300일** 등 **구체 치수·기간**은 제품 문서·브리프에 **근거가 있을 때만** 인용한다. 없으면 **질적 묘사**만 한다 (삼求 블록의 수치 과시 금지와 동일).

8. **Non-printing proof**  
   인쇄 없는 맨 유리의 투명함이 **가장 밀도 높은 디자인 결정**임을, 과장 없이 시각 논리로 연결할 수 있다.`
}

function buildWaterLikeOilLanguageAppendix(): string {
  if (parseOriginFluidViscosityFromEnv() !== "light") return ""
  return `

### 흐르는 진실 · Water-like oil (Kinetic Purity) — \`LUMINA_ORIGIN_FLUID_VISCOSITY=light\`
**테마(참고)**: ${LUMINA_ORIGIN_KINETIC_PURITY_THEME_KO} / ${LUMINA_ORIGIN_KINETIC_PURITY_THEME_EN}
**카피(참고)**: ${LUMINA_ORIGIN_WEIGHTLESS_TRUTH_KO}
**반박 톤(참고)**: ${LUMINA_ORIGIN_WEIGHTLESS_REBUTTAL_KO}
- **시각 서술**: 찰나의 **파동·미세 기포·입자의 반짝임**; 맨 유리 너머로 **바닥면 caustics(물그림자)**가 또렷한 **청량감**.
- **대비 서사**: Raw Scent(흙·풀의 날것 후각)와 **지독하게 맑은 시각**을 한 캠페인 안에서 이을 수 있으면 시도 — **후각·제형 묘사가 자료와 모순되면 금지**.
- **금지**: 점도 0·피부 흡수 보장·의효 단정; "끈적임 없음"은 **실제 사용감과 일치할 때만**.`
}

function buildKineticPurityImageFragment(): string {
  return [
    "KINETIC PURITY / WATER-LIKE OIL — High-speed clarity: freeze a micro-instant of ripple in nearly water-clear oil; fine micro-bubbles after gentle implied agitation; ingredient particles catch light along the wavefront.",
    "Aquatic caustics: light through the transparent medium draws bright dancing caustics on the vessel floor — crystalline, not murky; naked glass transmits motion without label noise.",
    "Visual–olfactory contrast (when brief allows): brutally clear liquid vs raw earthy material story — keep both fact-consistent; no fake turbidity, no perfume haze.",
  ].join(" ")
}

function fluidViscosityImageClause(): string {
  const v = parseOriginFluidViscosityFromEnv()
  if (v === "light") {
    return "FLUID VISCOSITY (env: light / water-like): water-adjacent clarity — quick meniscus shimmer, very low cling, high translucency; particle reads with crisp edge contrast against a limpid field."
  }
  if (v === "dense") {
    return "FLUID VISCOSITY (env: dense): honey-weight oil/serum — slow drag, ribboning cling on particle surfaces, optically thick yet still translucent, raw concentrated life-force legible."
  }
  return "FLUID VISCOSITY (env: neutral): match brief — may read light-to-dense; never default to cosmetic slip; preserve honest material body."
}

function buildMicroSenseImageFragment(): string {
  return [
    "GU-SO MICRO-SENSE PRIORITY — Hero frame dominated by one suspended natural-origin particle in oil/serum; full bottle or pack shot only as distant or omitted context.",
    "Micro-geometry: slightly irregular facet breaks on the particle; internal and edge light scatter physically readable; micro-shadow anchoring depth.",
    fluidViscosityImageClause(),
    "Naked-glass path: if vessel edge intrudes, prove label-free transparency and curvature caustics as the 'densest' design choice.",
  ].join(" ")
}

/** 제품 이미지 분석·상세 카피 초안용 (한국어) */
export function buildGusoMacroAestheticsPromptAppendix(): string {
  const micro = isGusoMicroSensePriorityEnabled() ? buildMicroSensePromptAppendix() : ""
  return `
## 루미나 구소 매크로 미학 (Lumina Origin · 求小)
**선언(참고 카피)**: ${LUMINA_ORIGIN_GUSO_HEADLINE_KO} / ${LUMINA_ORIGIN_GUSO_SUBCOPY_KO}

1. **매크로 퍼스트 레이아웃(상세 히어로)**  
   전신 제품 샷만 과시하기보다, **오일·에센스 속 한 입자(또는 메니스커스·제형의 미세면)**에 시선이 머무는 클로즈업을 우선 제안한다. 화면의 상당 부분을 **단일 미세 대상**과 그 **그림자·굴절**이 차지하도록 서술한다.

2. **미니멀 타이포그래피**  
   헤드라인·덱은 **작고 정갈한 계열**, **넓은 여백**과 짝을 이루게 쓴다. "작은 글자 하나의 무게"가 메시지와 맞물리게 한다.

3. **맨 유리병(無印 유리)**  
   인쇄가 없거나 극히 절제된 **투명 유리**의 곡률·두께·**빛 산란·굴절**을 언급할 수 있으면 구체적으로 쓰고, 없으면 "확인 어려움". 허위 물성·향(예: 특정 '흙·풀' 향)은 **이미지·자료에 근거할 때만** 서술한다.

4. **Dual-Synchro**  
   비주얼이 말하는 것과 카피가 말하는 것이 어긋나지 않게, 같은 **미세 증거**를 반복한다.${micro}${buildWaterLikeOilLanguageAppendix()}`
}

/**
 * 맨 유리 + 물 같은 오일 + 입자 + 순백 타이포 카드 — 단일 프레임 통합 힌트.
 * typography + pure_white + light 유체가 모두 맞을 때만 출력.
 */
export function buildLuminaOriginNumberOneHeroImageFragment(): string {
  if (!isGusoMacroAestheticsEnabled()) return ""
  if (parseOriginFluidViscosityFromEnv() !== "light") return ""
  if (parseOriginCardLayoutBiasFromEnv() !== "typography") return ""
  if (parseOriginCardPaperToneFromEnv() !== "pure_white") return ""
  return [
    "LUMINA ORIGIN #1 MASTER HERO — Single composed still: naked ultra-clear glass vessel, water-limpid oil with one honest visible micro-particle and aquatic caustics;",
    "adjacent or foreground sacred-silence insert card at cool RGB#FFFFFF (no cream cast), tooth visible, near-black type with micro-emboss deboss rim light;",
    "coherent light direction across glass, liquid, and paper; no readable invented logos, no illustration on card.",
  ].join(" ")
}

/** Imagen / Gemini 이미지 프롬프트용 (영문) */
export function buildGusoMacroAestheticsImagePromptFragment(): string {
  const base = [
    "GU-SO MACRO AESTHETICS — Jewel-Tex priority: allocate roughly half the frame or more to one suspended micro-particle (or a single decisive meniscus detail) in clear oil/serum.",
    "Render micro-shadow, crisp caustics, and refractive depth on that particle; avoid busy backgrounds and carnival saturation.",
    "If a bottle appears: naked ultra-clear glass, minimal or no label, curvature-driven light scatter readable; do not invent readable logotype.",
    "Reserve generous negative space for small, elegant typography overlay in production; keep the image itself text-clean.",
  ].join(" ")
  const parts: string[] = [base]
  if (isGusoMicroSensePriorityEnabled()) parts.push(buildMicroSenseImageFragment())
  if (parseOriginFluidViscosityFromEnv() === "light") parts.push(buildKineticPurityImageFragment())
  const originOne = buildLuminaOriginNumberOneHeroImageFragment()
  if (originOne) parts.push(originOne)
  return parts.join(" ")
}
