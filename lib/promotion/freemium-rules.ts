import type { SupabaseClient } from "@supabase/supabase-js"

import {
  ESSENCE_FREE_DETAIL_VISUAL_CAP,
  isEssenceUnlimitedFree,
} from "@/lib/promotion/genesis-alliance"
import type { RenderOperation } from "@/lib/rendering/credits"
import type { RenderTier } from "@/lib/rendering/render-config"

const TIER1_VISUAL_PREFIX = "render:detail_visual:tier1"

export type EssenceFreemiumResult = {
  waived: boolean
  reason?: "unlimited" | "within_cap" | "paid_tier"
}

/**
 * Tier 1 + detail_visual: waive Lumi spend when within free cap or unlimited mode.
 */
export async function resolveEssenceFreemium(params: {
  supabase: SupabaseClient
  userId: string
  tier: RenderTier
  operation: RenderOperation
}): Promise<EssenceFreemiumResult> {
  const { supabase, userId, tier, operation } = params
  if (tier !== 1 || operation !== "detail_visual") {
    return { waived: false, reason: "paid_tier" }
  }
  if (isEssenceUnlimitedFree()) {
    return { waived: true, reason: "unlimited" }
  }
  if (ESSENCE_FREE_DETAIL_VISUAL_CAP <= 0) {
    return { waived: false, reason: "paid_tier" }
  }

  const { count, error } = await supabase
    .from("lumi_transactions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("transaction_type", "spend")
    .like("description", `${TIER1_VISUAL_PREFIX}%`)

  if (error) {
    return { waived: false, reason: "paid_tier" }
  }
  const used = count ?? 0
  if (used < ESSENCE_FREE_DETAIL_VISUAL_CAP) {
    return { waived: true, reason: "within_cap" }
  }
  return { waived: false, reason: "paid_tier" }
}

export function essenceFreemiumDescription(referenceId?: string | null): string {
  const base = `${TIER1_VISUAL_PREFIX}:freemium`
  return referenceId ? `${base}:ref:${referenceId}` : base
}
