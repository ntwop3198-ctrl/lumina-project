export type ClinicalMetric = {
  id: string
  label: string
  value: string
  unit: string
  /** 보조 설명 (기간, 대조군 등) */
  footnote?: string
}

export function createId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : String(Date.now())
}

export const DEFAULT_CLINICAL_METRICS: ClinicalMetric[] = [
  {
    id: "m1",
    label: "흡수도",
    value: "42",
    unit: "%",
    footnote: "피부 적층 모델 대비 4주 후",
  },
  {
    id: "m2",
    label: "탄력 개선도",
    value: "18",
    unit: "%",
    footnote: "촉촉탄력 지수 기준",
  },
  {
    id: "m3",
    label: "수분 보유력",
    value: "36",
    unit: "%",
    footnote: "TEWL 감소율",
  },
]
