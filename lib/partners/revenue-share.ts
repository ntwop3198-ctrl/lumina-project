/**
 * Revenue-share settlement foundation (Success-Share model).
 * Partner shops report period revenue; Lumina attributes uplift and applies 1–3% share.
 */

export type RevenueShareReportPayload = {
  partnerId: string
  periodStart: string // ISO date
  periodEnd: string
  /** Gross revenue in KRW (whole won) for the period */
  grossRevenueWon: number
  /** Optional: revenue Lumina attributes to its channel (defaults to gross for MVP) */
  attributedRevenueWon?: number
  /** Optional baseline period for uplift (ISO dates) */
  baselinePeriodStart?: string
  baselinePeriodEnd?: string
  baselineGrossRevenueWon?: number
  notes?: string
}

export type RevenueShareSettlement = {
  partnerId: string
  periodStart: string
  periodEnd: string
  sharePercent: number
  /** Revenue base used for the fee */
  baseRevenueWon: number
  shareAmountWon: number
  upliftWon: number | null
  ledgerId: string
}

function clampSharePercent(requested?: number): number {
  const min = Number(process.env.LUMINA_REVENUE_SHARE_MIN_PERCENT ?? "1")
  const max = Number(process.env.LUMINA_REVENUE_SHARE_MAX_PERCENT ?? "3")
  const raw =
    requested != null && Number.isFinite(requested)
      ? requested
      : (min + max) / 2
  return Math.min(max, Math.max(min, raw))
}

export function computeRevenueShareSettlement(
  payload: RevenueShareReportPayload,
  options?: { sharePercentOverride?: number },
): RevenueShareSettlement {
  const attributed =
    payload.attributedRevenueWon != null && payload.attributedRevenueWon >= 0
      ? payload.attributedRevenueWon
      : Math.max(0, payload.grossRevenueWon)

  let upliftWon: number | null = null
  if (
    payload.baselineGrossRevenueWon != null &&
    payload.baselineGrossRevenueWon >= 0
  ) {
    upliftWon = Math.max(0, payload.grossRevenueWon - payload.baselineGrossRevenueWon)
  }

  const sharePercent = clampSharePercent(options?.sharePercentOverride)
  const shareAmountWon = Math.round((attributed * sharePercent) / 100)

  const ledgerId = `rs_${payload.partnerId}_${payload.periodStart}_${payload.periodEnd}_${Date.now().toString(36)}`

  return {
    partnerId: payload.partnerId,
    periodStart: payload.periodStart,
    periodEnd: payload.periodEnd,
    sharePercent,
    baseRevenueWon: attributed,
    shareAmountWon,
    upliftWon,
    ledgerId,
  }
}
