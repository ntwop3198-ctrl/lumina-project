/**
 * 제2호 브랜딩 — 투명 정산·나눔 환원 표시용 모델 (MVP).
 * 실제 장부·지급은 별도 ledger/정산 시스템과 동기화한다.
 */

import type { RevenueShareSettlement } from "@/lib/partners/revenue-share"

export type SettlementLineCategory =
  | "partner_attributed_revenue"
  | "success_share_fee"
  | "platform_operations"
  | "partner_reinvestment_pool"

export interface SettlementTransparencyLine {
  id: string
  labelKo: string
  amountWon: number
  category: SettlementLineCategory
  /** 파트너 대시보드용 짧은 설명 */
  explanationKo: string
}

export interface SettlementTransparencySnapshot {
  partnerId: string
  periodStart: string
  periodEnd: string
  generatedAt: string
  lines: SettlementTransparencyLine[]
  /** 수수료가 플랫폼·재투자 등으로 어떻게 쓰이는지 요약 (정책 문구) */
  sharingNarrativeKo: string
  ledgerId: string | null
}

const DEFAULT_NARRATIVE =
  "성공보수(success-share)는 파트너 매출 기여 구간에만 산정됩니다. 플랫폼 운영·품질·나눔형 인프라에 재투자되어 파트너 접근성을 유지합니다."

/**
 * `computeRevenueShareSettlement` 결과를 파트너 대시보드용 라인으로 펼친다.
 * 플랫폼/재투자 비율은 환경변수로 조정 가능(초안).
 */
export function buildSettlementTransparencySnapshot(
  settlement: RevenueShareSettlement,
  options?: {
    platformOpsPercentOfFee?: number
    partnerReinvestPercentOfFee?: number
  },
): SettlementTransparencySnapshot {
  const fee = settlement.shareAmountWon
  const opsPct = clampPercent(
    options?.platformOpsPercentOfFee ??
      Number(process.env.LUMINA_TRANSPARENCY_OPS_PERCENT_OF_FEE ?? "60"),
  )
  const reinvestPct = clampPercent(
    options?.partnerReinvestPercentOfFee ??
      Number(process.env.LUMINA_TRANSPARENCY_REINVEST_PERCENT_OF_FEE ?? "40"),
  )

  const ops = Math.round((fee * opsPct) / 100)
  const reinvest = Math.max(0, fee - ops)

  const lines: SettlementTransparencyLine[] = [
    {
      id: "attributed",
      labelKo: "귀속 매출 (정산 기준)",
      amountWon: settlement.baseRevenueWon,
      category: "partner_attributed_revenue",
      explanationKo: "이번 기간 성공보수 산정에 사용한 매출 귀속액입니다.",
    },
    {
      id: "success_share",
      labelKo: "성공보수(플랫폼)",
      amountWon: fee,
      category: "success_share_fee",
      explanationKo: `적용 요율 ${settlement.sharePercent}% 기준 산출액입니다.`,
    },
    {
      id: "platform_ops",
      labelKo: "플랫폼 운영·안정화 (재투자)",
      amountWon: ops,
      category: "platform_operations",
      explanationKo: `성공보수 중 약 ${opsPct}%는 서버·품질·보안 등 운영에 사용됩니다(초안 비율).`,
    },
    {
      id: "partner_pool",
      labelKo: "파트너 나눔·접근성 프로그램 (재투자)",
      amountWon: reinvest,
      category: "partner_reinvestment_pool",
      explanationKo: `성공보수 중 약 ${reinvestPct}%는 저비용 연동·교육 등 파트너 생태계로 환원하는 풀로 배정합니다(초안 비율).`,
    },
  ]

  if (settlement.upliftWon != null) {
    lines.splice(1, 0, {
      id: "uplift",
      labelKo: "기준 대비 매출 상승(참고)",
      amountWon: settlement.upliftWon,
      category: "partner_attributed_revenue",
      explanationKo: "제공된 기준기간 대비 이번 기간 매출 증가분(참고 지표)입니다.",
    })
  }

  return {
    partnerId: settlement.partnerId,
    periodStart: settlement.periodStart,
    periodEnd: settlement.periodEnd,
    generatedAt: new Date().toISOString(),
    lines,
    sharingNarrativeKo: DEFAULT_NARRATIVE,
    ledgerId: settlement.ledgerId,
  }
}

function clampPercent(n: number): number {
  if (!Number.isFinite(n)) return 50
  return Math.min(100, Math.max(0, Math.round(n)))
}
