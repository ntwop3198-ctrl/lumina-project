import { NextResponse } from "next/server"
import {
  PIONEER_GENESIS_DISCOUNT_PERCENT,
  PIONEER_GENESIS_TOTAL_SLOTS,
} from "@/lib/promotion/genesis-alliance"

export const runtime = "nodejs"
export const maxDuration = 10

function parseClaimed(): number {
  const raw = process.env.LUMINA_PIONEER_CLAIMED_COUNT?.trim()
  if (!raw) return 0
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) && n >= 0 ? n : 0
}

/**
 * Remaining Pioneer (first N brands) Genesis discount slots.
 * Operatores bump `LUMINA_PIONEER_CLAIMED_COUNT` or replace with Supabase counts later.
 */
export async function GET() {
  const total = PIONEER_GENESIS_TOTAL_SLOTS
  const claimed = Math.min(total, parseClaimed())
  const remaining = Math.max(0, total - claimed)

  return NextResponse.json({
    campaign: "Lumina 1000: The Genesis Alliance",
    tier: 5,
    discountPercent: PIONEER_GENESIS_DISCOUNT_PERCENT,
    totalSlots: total,
    claimedSlots: claimed,
    remainingSlots: remaining,
    /** ISO timestamp for soft urgency (optional client countdown anchor) */
    updatedAt: new Date().toISOString(),
  })
}
