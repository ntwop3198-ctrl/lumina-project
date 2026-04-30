/**
 * Lumina 1000: The Genesis Alliance — promotion constants (env-overridable).
 */

export const PIONEER_GENESIS_TOTAL_SLOTS = Math.max(
  1,
  Number.parseInt(process.env.LUMINA_PIONEER_TOTAL_SLOTS ?? "100", 10) || 100,
)

export const PIONEER_GENESIS_DISCOUNT_PERCENT = Math.min(
  100,
  Math.max(
    0,
    Number.parseInt(process.env.LUMINA_PIONEER_DISCOUNT_PERCENT ?? "90", 10) || 90,
  ),
)

/** Tier 1 (Essence) detail_visual free uses per user before paid Lumi applies. */
export const ESSENCE_FREE_DETAIL_VISUAL_CAP = Math.max(
  0,
  Number.parseInt(process.env.LUMINA_ESSENCE_FREE_USES_CAP ?? "10", 10) || 10,
)

export function isEssenceUnlimitedFree(): boolean {
  return process.env.LUMINA_ESSENCE_FREE_UNLIMITED === "1"
}

export const REVENUE_SHARE_MIN_PERCENT = Number(
  process.env.LUMINA_REVENUE_SHARE_MIN_PERCENT ?? "1",
)
export const REVENUE_SHARE_MAX_PERCENT = Number(
  process.env.LUMINA_REVENUE_SHARE_MAX_PERCENT ?? "3",
)
