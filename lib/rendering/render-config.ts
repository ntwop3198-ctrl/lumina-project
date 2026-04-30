export type RenderTier = 1 | 2 | 3 | 4 | 5

/** Tier 1(Essence) 전용 — ‘헉슬리적’ 로우 럭셔리 / 여백의 미 */
export type EssenceVisualPreset = "default" | "studio_minimalist"

export type RenderConfig = {
  tier: RenderTier
  /**
   * WebGL 해상도 스케일 (캔버스 픽셀 비율)
   * 예: 1.0이면 DPR 그대로, 0.75면 DPR의 75% 수준
   */
  resolutionScale: number

  /**
   * 프로시저럴 노이즈 품질(= fbm 옥타브/루프)
   * 컴파일 타임 상수로 사용합니다.
   */
  fbmOctaves: 2 | 3 | 4 | 5

  /** 포인터/조명 반응 강도(0~1). */
  lightingComplexity: number

  /** WebGL에서 spec/tremolo 강도(0~1). */
  shimmer: number

  /**
   * 폴리곤 수에 준하는 프래그먼트 복잡도(에너지 입자 샤드).
   * WebGL에서 compile-time loop로 적용됩니다.
   */
  facetShards: 1 | 2 | 3 | 4 | 5

  /** 캔버스 점적(2D) 품질/개수 계수(0~1). */
  dropletQuality: number

  /** WebGL 전체 opacity/블렌딩 강도 계수(0~1). */
  layerOpacity: number

  /** Tier 5 전용: 서버 예약 게이팅 대상 여부 */
  requiresGenesisReservation: boolean
}

export const RENDER_CONFIGS: Record<RenderTier, RenderConfig> = {
  1: {
    tier: 1,
    resolutionScale: 0.6,
    fbmOctaves: 2,
    lightingComplexity: 0.18,
    shimmer: 0.18,
    facetShards: 1,
    dropletQuality: 0.12,
    layerOpacity: 0.18,
    requiresGenesisReservation: false,
  },
  2: {
    tier: 2,
    resolutionScale: 0.85,
    fbmOctaves: 3,
    lightingComplexity: 0.45,
    shimmer: 0.45,
    facetShards: 2,
    dropletQuality: 0.55,
    layerOpacity: 0.35,
    requiresGenesisReservation: false,
  },
  3: {
    tier: 3,
    resolutionScale: 1.0,
    fbmOctaves: 4,
    lightingComplexity: 0.65,
    shimmer: 0.65,
    facetShards: 3,
    dropletQuality: 0.7,
    layerOpacity: 0.45,
    requiresGenesisReservation: false,
  },
  4: {
    tier: 4,
    resolutionScale: 1.05,
    fbmOctaves: 5,
    lightingComplexity: 0.85,
    shimmer: 0.8,
    facetShards: 4,
    dropletQuality: 0.85,
    layerOpacity: 0.55,
    requiresGenesisReservation: false,
  },
  5: {
    tier: 5,
    resolutionScale: 1.25,
    fbmOctaves: 5,
    lightingComplexity: 1.0,
    shimmer: 1.0,
    facetShards: 5,
    dropletQuality: 1.0,
    layerOpacity: 0.78,
    requiresGenesisReservation: true,
  },
}

function applyEssenceStudioMinimal(base: RenderConfig): RenderConfig {
  return {
    ...base,
    resolutionScale: 0.52,
    fbmOctaves: 2,
    lightingComplexity: 0.05,
    shimmer: 0.04,
    facetShards: 1,
    dropletQuality: 0.04,
    layerOpacity: 0.07,
  }
}

export function getRenderConfig(
  tier: RenderTier,
  essencePreset: EssenceVisualPreset = "default",
): RenderConfig {
  const base = RENDER_CONFIGS[tier]!
  if (tier === 1 && essencePreset === "studio_minimalist") {
    return applyEssenceStudioMinimal(base)
  }
  return base
}

