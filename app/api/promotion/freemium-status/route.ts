import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import {
  ESSENCE_FREE_DETAIL_VISUAL_CAP,
  isEssenceUnlimitedFree,
  PIONEER_GENESIS_DISCOUNT_PERCENT,
  PIONEER_GENESIS_TOTAL_SLOTS,
} from "@/lib/promotion/genesis-alliance"

export const runtime = "nodejs"
export const maxDuration = 10

/**
 * Genesis Alliance — Tier 1 (Essence) freemium policy for clients.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")?.trim()

  const base = {
    campaign: "Lumina 1000: The Genesis Alliance" as const,
    essence: {
      tier: 1 as const,
      operationFree: "detail_visual" as const,
      unlimitedFree: isEssenceUnlimitedFree(),
      freeUsesCap: ESSENCE_FREE_DETAIL_VISUAL_CAP,
      /** Normal Lumi cost if paid (for UI copy) */
      lumiPerUseIfPaid: 1,
    },
    pioneerGenesis: {
      totalSlots: PIONEER_GENESIS_TOTAL_SLOTS,
      discountPercent: PIONEER_GENESIS_DISCOUNT_PERCENT,
    },
  }

  if (!userId || !supabaseAdmin) {
    return NextResponse.json({
      ...base,
      userId: userId ?? null,
      essenceUsesRemaining: null as number | null,
      essenceUsesConsumed: null as number | null,
    })
  }

  const { count, error } = await supabaseAdmin
    .from("lumi_transactions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("transaction_type", "spend")
    .like("description", "render:detail_visual:tier1%")

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    )
  }

  const consumed = count ?? 0
  const unlimited = isEssenceUnlimitedFree()
  const remaining = unlimited
    ? null
    : Math.max(0, ESSENCE_FREE_DETAIL_VISUAL_CAP - consumed)

  return NextResponse.json({
    ...base,
    userId,
    essenceUsesConsumed: consumed,
    essenceUsesRemaining: remaining,
  })
}
