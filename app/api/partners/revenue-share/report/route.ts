import { NextResponse } from "next/server"
import {
  computeRevenueShareSettlement,
  type RevenueShareReportPayload,
} from "@/lib/partners/revenue-share"

export const runtime = "nodejs"
export const maxDuration = 15

function isIsoDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}/.test(s) && !Number.isNaN(Date.parse(s))
}

/**
 * POST partner revenue period → settlement preview (ledger id).
 * TODO: persist to `revenue_share_ledger` in Supabase + idempotency key.
 */
export async function POST(request: Request) {
  let body: Partial<RevenueShareReportPayload> & { sharePercent?: number }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON body required" }, { status: 400 })
  }

  const partnerId = body.partnerId?.trim()
  if (!partnerId) {
    return NextResponse.json({ error: "partnerId required" }, { status: 400 })
  }
  const { periodStart, periodEnd, grossRevenueWon } = body
  if (!periodStart || !periodEnd || !isIsoDate(periodStart) || !isIsoDate(periodEnd)) {
    return NextResponse.json(
      { error: "periodStart and periodEnd (ISO dates) required" },
      { status: 400 },
    )
  }
  if (typeof grossRevenueWon !== "number" || !Number.isFinite(grossRevenueWon) || grossRevenueWon < 0) {
    return NextResponse.json(
      { error: "grossRevenueWon (non-negative number) required" },
      { status: 400 },
    )
  }

  const payload: RevenueShareReportPayload = {
    partnerId,
    periodStart,
    periodEnd,
    grossRevenueWon,
    attributedRevenueWon: body.attributedRevenueWon,
    baselinePeriodStart: body.baselinePeriodStart,
    baselinePeriodEnd: body.baselinePeriodEnd,
    baselineGrossRevenueWon: body.baselineGrossRevenueWon,
    notes: body.notes,
  }

  const settlement = computeRevenueShareSettlement(payload, {
    sharePercentOverride: body.sharePercent,
  })

  return NextResponse.json({
    ok: true,
    settlement,
    nextSteps:
      "Persist ledger row, reconcile with shop API webhook, and schedule payout.",
  })
}
