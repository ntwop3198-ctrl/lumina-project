export interface PilotSettlementInput {
  partnerId: string
  periodStart: string
  periodEnd: string
  grossRevenueWon: number
  platformSharePercent: number
  adjustmentWon?: number
}

export type PilotSettlementStatus = "draft" | "confirmed" | "paid" | "hold"

export interface PilotSettlementLineItem {
  key: "gross_revenue" | "platform_fee" | "adjustment_amount" | "net_settlement"
  labelKo: string
  amountWon: number
  explanationKo: string
}

export interface PilotSettlementSnapshot {
  partnerId: string
  periodStart: string
  periodEnd: string
  status: PilotSettlementStatus
  lines: PilotSettlementLineItem[]
  summary: {
    grossRevenueWon: number
    platformFeeWon: number
    adjustmentWon: number
    netSettlementWon: number
  }
}

export function buildPilotSettlementSnapshot(
  input: PilotSettlementInput,
  status: PilotSettlementStatus = "draft",
): PilotSettlementSnapshot {
  const gross = Math.max(0, Math.round(input.grossRevenueWon))
  const pct = clampPercent(input.platformSharePercent)
  const platformFeeWon = Math.round((gross * pct) / 100)
  const adjustmentWon = Math.round(input.adjustmentWon ?? 0)
  const netSettlementWon = gross - platformFeeWon + adjustmentWon

  return {
    partnerId: input.partnerId,
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    status,
    lines: [
      {
        key: "gross_revenue",
        labelKo: "총매출",
        amountWon: gross,
        explanationKo: "해당 기간 총매출 원금액",
      },
      {
        key: "platform_fee",
        labelKo: "플랫폼 배분금",
        amountWon: platformFeeWon,
        explanationKo: `사전 합의된 배분율 ${pct}% 적용`,
      },
      {
        key: "adjustment_amount",
        labelKo: "조정금액",
        amountWon: adjustmentWon,
        explanationKo: "반품/오류/합의조정 항목 반영",
      },
      {
        key: "net_settlement",
        labelKo: "최종 정산액",
        amountWon: netSettlementWon,
        explanationKo: "총매출 - 플랫폼 배분금 + 조정금액",
      },
    ],
    summary: {
      grossRevenueWon: gross,
      platformFeeWon,
      adjustmentWon,
      netSettlementWon,
    },
  }
}

export interface SettlementAlertDraft {
  dueDayOfMonth: 10
  gracePeriodDays: 7
  reminders: Array<{
    offsetDaysFromDue: number
    messageKo: string
  }>
}

export function buildSettlementAlertDraft(): SettlementAlertDraft {
  return {
    dueDayOfMonth: 10,
    gracePeriodDays: 7,
    reminders: [
      {
        offsetDaysFromDue: -3,
        messageKo: "정산 지급일 3일 전입니다. draft 상태 항목을 confirmed로 확정해 주세요.",
      },
      {
        offsetDaysFromDue: 0,
        messageKo: "오늘은 정산 지급일(매월 10일)입니다. 지급 처리 여부를 업데이트해 주세요.",
      },
      {
        offsetDaysFromDue: 7,
        messageKo: "지급일+7일 경과 알림입니다. 미지급 항목은 사유와 예정일을 기록해 주세요.",
      },
    ],
  }
}

function clampPercent(n: number): number {
  if (!Number.isFinite(n)) return 0
  return Math.min(100, Math.max(0, Math.round(n * 100) / 100))
}

