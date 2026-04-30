import { NextResponse } from "next/server"
import {
  computeRevenueShareSettlement,
  type RevenueShareReportPayload,
} from "@/lib/partners/revenue-share"
import { buildSettlementTransparencySnapshot } from "@/lib/partners/settlement-transparency"

export const runtime = "nodejs"
export const maxDuration = 15

function isIsoDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}/.test(s) && !Number.isNaN(Date.parse(s))
}

/**
 * GET — 파트너 투명 정산 스냅샷 (대시보드용 JSON).
 * Query: partnerId, periodStart, periodEnd, grossRevenueWon (number), optional attributedRevenueWon, sharePercent
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const partnerId = url.searchParams.get("partnerId")?.trim()
  const periodStart = url.searchParams.get("periodStart") ?? ""
  const periodEnd = url.searchParams.get("periodEnd") ?? ""
  const grossRaw = url.searchParams.get("grossRevenueWon")
  const attributedRaw = url.searchParams.get("attributedRevenueWon")
  const shareRaw = url.searchParams.get("sharePercent")

  if (!partnerId) {
    return NextResponse.json({ error: "partnerId required" }, { status: 400 })
  }
  if (!isIsoDate(periodStart) || !isIsoDate(periodEnd)) {
    return NextResponse.json(
      { error: "periodStart and periodEnd (ISO dates) required" },
      { status: 400 },
    )
  }

  const grossRevenueWon = grossRaw != null ? Number(grossRaw) : NaN
  if (!Number.isFinite(grossRevenueWon) || grossRevenueWon < 0) {
    return NextResponse.json(
      { error: "grossRevenueWon (non-negative number) required" },
      { status: 400 },
    )
  }

  let attributedRevenueWon: number | undefined
  if (attributedRaw != null && attributedRaw !== "") {
    const a = Number(attributedRaw)
    if (!Number.isFinite(a) || a < 0) {
      return NextResponse.json(
        { error: "attributedRevenueWon must be non-negative number" },
        { status: 400 },
      )
    }
    attributedRevenueWon = a
  }

  let sharePercent: number | undefined
  if (shareRaw != null && shareRaw !== "") {
    const s = Number(shareRaw)
    if (!Number.isFinite(s)) {
      return NextResponse.json({ error: "sharePercent invalid" }, { status: 400 })
    }
    sharePercent = s
  }

  const payload: RevenueShareReportPayload = {
    partnerId,
    periodStart,
    periodEnd,
    grossRevenueWon,
    attributedRevenueWon,
  }

  const settlement = computeRevenueShareSettlement(payload, {
    sharePercentOverride: sharePercent,
  })
  const snapshot = buildSettlementTransparencySnapshot(settlement)

  return NextResponse.json({
    ok: true,
    branding: "lumina_branding_ii",
    snapshot,
  })
}
