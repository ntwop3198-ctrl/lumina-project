export type PricingTargetPersona = "entry" | "bestseller" | "premium"

export type PricingBrandTier = "entry" | "bestseller" | "premium"

export type BundlePlanType = "intro_single" | "bestseller_2plus1" | "premium_gift_set"

export type BundlePlan = {
  type: BundlePlanType
  title: string
  /** 고객이 받는 구성(지불/증정) */
  payCount: number
  getCount: number
  /** 1개 단위가 “몇 개가 하나의 묶음인지”를 위해 */
  totalUnits: number
  includesGift: boolean
  /** 가격선/전술 */
  pricingPolicyLabel: string
}

export type PriceComputation = {
  unitCost: number
  bundlePlan: BundlePlan
  /** 정가(예시 anchor) */
  listPriceWon: number
  /** 단가 */
  unitPriceWon: number
  /** 2+1 같은 경우 실제 단가 */
  effectiveUnitPriceWon: number
}

export type PricingRecommendation = {
  bundlePlans: [PriceComputation, PriceComputation, PriceComputation]
  bestPlanType: BundlePlanType
}

