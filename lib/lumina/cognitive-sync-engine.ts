/**
 * Visual–linguistic cognitive sync (Neural-Reflectance S+ × Empathic Logic v3).
 * Client-only metrics; no network — sub-frame reads via ref in rAF.
 */

export type LuminaCognitiveZone = "idle" | "narrative" | "price" | "clinical"

export type LuminaCognitiveVisualMode = "neutral" | "aura" | "onyx" | "sapphire"

/** Runtime snapshot read by SensoryVisualUpgrade each frame */
export type LuminaCognitiveMetrics = {
  zone: LuminaCognitiveZone
  visualMode: LuminaCognitiveVisualMode
  /** 0 = still, 1 = fast scroll (normalized) */
  scrollVelocityNorm: number
  /** Multiplier for trust / sapphire lighting (+30% → 1.3) */
  sapphireTrustMultiplier: number
  /** Warm-copy emphasis 0..1 */
  warmCertaintyWeight: number
  /** Micro-contrast hint for WebGL layer (Neural-Reflectance S+) */
  microShadowBoost: number
  /** Price section dwell preemption active */
  pricePreemptionActive: boolean
}

export const DEFAULT_COGNITIVE_METRICS: LuminaCognitiveMetrics = {
  zone: "idle",
  visualMode: "neutral",
  scrollVelocityNorm: 0,
  sapphireTrustMultiplier: 1,
  warmCertaintyWeight: 0.35,
  microShadowBoost: 1,
  pricePreemptionActive: false,
}

export const LUMINA_NEURAL_REFLECTANCE_S_PLUS = {
  ko: "Neural-Reflectance S+ · 마이크로 섀도 신경 렌더링",
  en: "Neural-Reflectance S+ · micro-shadow neural rendering",
} as const

export const LUMINA_EMPATHIC_LOGIC_V3 = {
  ko: "Empathic Logic v3 · 선제적 반박 완화",
  en: "Empathic Logic v3 · counter-argument preemption",
} as const

/** Table: zone → default sync line (language layer) */
export const COGNITIVE_SYNC_LINES = {
  ko: {
    narrative:
      "눈에 보이지 않는 미세한 혁신이 피부 깊숙이 닿는 찰나입니다.",
    price: "고결한 가치는 타협하지 않는 디테일에서 완성됩니다.",
    clinical: "과학은 숫자로 증명하지만, 우리는 당신의 '확신'으로 완성합니다.",
    pricePreempt:
      "이 가격은 단순한 비용이 아니라, 당신이 되찾을 '시간의 가치'에 대한 투자입니다.",
    evidenceWarmth:
      "98%라는 결과보다 우리가 더 중요하게 생각하는 것은 당신이 내일 아침 거울 앞에서 느낄 '안도감'입니다.",
  },
  en: {
    narrative:
      "The instant invisible micro-innovation meets skin — depth in a glance.",
    price: "Noble value finishes in details that never compromise.",
    clinical:
      "Science proves in numbers; we complete the story in your conviction.",
    pricePreempt:
      "This isn’t mere cost — it’s investment in the time you reclaim.",
    evidenceWarmth:
      "Beyond a 98% figure, we care most about the relief you feel at the mirror tomorrow.",
  },
} as const

/** Reflexive adjectives from scroll velocity (texture language pipeline) */
export const TEXTURE_ADJECTIVES = {
  ko: {
    slow: "고농축의 묵직함",
    medium: "균형 잡힌 제형감",
    fast: "수분감 넘치는 퍼짐성",
  },
  en: {
    slow: "dense, concentrated weight",
    medium: "balanced formula presence",
    fast: "hydrated, expansive flow",
  },
} as const

export function velocityNormToAdjective(
  norm: number,
  lang: "ko" | "en",
): string {
  const pack = lang === "ko" ? TEXTURE_ADJECTIVES.ko : TEXTURE_ADJECTIVES.en
  if (norm < 0.22) return pack.slow
  if (norm < 0.55) return pack.medium
  return pack.fast
}

export function zoneToVisualMode(zone: LuminaCognitiveZone): LuminaCognitiveVisualMode {
  if (zone === "narrative") return "aura"
  if (zone === "price") return "onyx"
  if (zone === "clinical") return "sapphire"
  return "neutral"
}

/** +30% trust lighting for price/clinical resistance zones */
export const SAPPHIRE_TRUST_BOOST = 1.3

export function buildMetrics(input: {
  zone: LuminaCognitiveZone
  scrollVelocityNorm: number
  pricePreemptionActive: boolean
}): LuminaCognitiveMetrics {
  const visualMode = zoneToVisualMode(input.zone)
  const resistance = input.zone === "price" || input.zone === "clinical"
  return {
    zone: input.zone,
    visualMode,
    scrollVelocityNorm: input.scrollVelocityNorm,
    sapphireTrustMultiplier: resistance ? SAPPHIRE_TRUST_BOOST : 1,
    warmCertaintyWeight: resistance ? 1 : input.pricePreemptionActive ? 0.95 : 0.35,
    microShadowBoost: input.zone === "narrative" ? 1.08 : resistance ? 1.12 : 1,
    pricePreemptionActive: input.pricePreemptionActive,
  }
}

export function pickSyncLine(
  zone: LuminaCognitiveZone,
  lang: "ko" | "en",
  pricePreemption: boolean,
  clinicalWarmth: boolean,
): string {
  const c = lang === "ko" ? COGNITIVE_SYNC_LINES.ko : COGNITIVE_SYNC_LINES.en
  if (pricePreemption && zone === "price") return c.pricePreempt
  if (clinicalWarmth && zone === "clinical") return c.evidenceWarmth
  if (zone === "narrative") return c.narrative
  if (zone === "price") return c.price
  if (zone === "clinical") return c.clinical
  return lang === "ko"
    ? "루미나 인지 동기화가 시각과 언어를 맞춥니다."
    : "Lumina cognitive sync aligns sight and language."
}
