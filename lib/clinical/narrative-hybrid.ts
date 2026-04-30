import type { ClinicalMetric } from "@/lib/clinical/types"

function normalizeNumber(raw: string): string {
  const n = Number(raw.replace(/[^0-9.-]/g, ""))
  if (!Number.isFinite(n)) return raw
  return Number.isInteger(n) ? `${n}` : `${n.toFixed(1)}`
}

function buildClause(label: string, value: string, unit: string): string {
  const normalized = normalizeNumber(value)
  const token = `[${normalized}${unit}]`
  const lower = label.toLowerCase()

  if (lower.includes("탄력")) return `피부 탄력은 ${token} 더 견고해졌습니다.`
  if (lower.includes("수분")) return `수분 장벽은 ${token} 더 오래 머물렀습니다.`
  if (lower.includes("흡수")) return `유효 성분은 ${token} 더 빠르게 스며들었습니다.`
  return `${label} 지표는 ${token} 개선되었습니다.`
}

/**
 * 감성 문장과 임상 수치를 하나의 문맥으로 연결하는 서사 템플릿.
 */
export function buildNarrativeHybridLines(metrics: ClinicalMetric[]): string[] {
  const anchors = [
    "진주의 막이 씌워진 지 [8시간],",
    "하루의 리듬을 정돈한 [4주],",
    "매일 밤 축적된 [28일],",
  ]

  return metrics.slice(0, 3).map((metric, i) => {
    const prefix = anchors[i] ?? "데이터가 말하는 순간,"
    return `${prefix} ${buildClause(metric.label, metric.value, metric.unit)}`
  })
}
