/** God-Class 쇼케이스와 기획서 딥링크 공통 정의 */
export const SHOWCASE_TIERS = [
  { id: 1, nameKo: "에센스", nameEn: "Essence" },
  { id: 2, nameKo: "소셜", nameEn: "Social" },
  { id: 3, nameKo: "시그니처", nameEn: "Signature" },
  { id: 4, nameKo: "마스터피스", nameEn: "Masterpiece" },
  { id: 5, nameKo: "제네시스", nameEn: "Genesis" },
] as const

export type ShowcaseTierId = (typeof SHOWCASE_TIERS)[number]["id"]

export function buildMasterPlanHref(tierId: ShowcaseTierId) {
  return `/knowledge-engine/plan?plan=master&tier=${tierId}`
}

/** 티어 1~3: 본질 / 4~5: 효율 (쇼케이스 → 기획 톤 기본 매핑) */
export function algorithmForShowcaseTier(tierId: number): "essence" | "efficiency" {
  return tierId >= 4 ? "efficiency" : "essence"
}
