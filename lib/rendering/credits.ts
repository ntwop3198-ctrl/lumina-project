import { type RenderTier } from "@/lib/rendering/render-config"

export type RenderOperation = "detail_visual" | "analysis" | "refine_copy"

const BASE_RENDER_CREDITS_BY_TIER: Record<RenderTier, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 12,
}

/**
 * Tier별 Credit 산정 규칙.
 * - 기본값: 비주얼 렌더 비용 중심
 * - analysis/refine은 향후 더 정교화(예: GPU/LLM 비용) 가능
 */
export function getCreditsForTier(tier: RenderTier, operation: RenderOperation): number {
  const base = BASE_RENDER_CREDITS_BY_TIER[tier]!
  if (operation === "detail_visual") return base
  if (operation === "analysis") return Math.round(base * 0.6)
  return Math.round(base * 0.4)
}

