import type {
  BundlePlan,
  PricingBrandTier,
  PricingRecommendation,
  PricingTargetPersona,
  PriceComputation,
} from "@/lib/pricing/types"
import {
  computePriceForBundle,
  pricePolicyLabel,
} from "@/lib/pricing/psychological-pricing"

const personaToTier: Record<PricingTargetPersona, PricingBrandTier> = {
  entry: "entry",
  bestseller: "bestseller",
  premium: "premium",
}

function makePlans({ brandTier }: { brandTier: PricingBrandTier }): [BundlePlan, BundlePlan, BundlePlan] {
  const intro: BundlePlan = {
    type: "intro_single",
    title: "입문자용 1종(단일 구성)",
    payCount: 1,
    getCount: 1,
    totalUnits: 1,
    includesGift: false,
    pricingPolicyLabel: pricePolicyLabel(brandTier),
  }
  const best: BundlePlan = {
    type: "bestseller_2plus1",
    title: "베스트셀러 2+1(구매 혜택 구성)",
    payCount: 2,
    getCount: 1,
    totalUnits: 3,
    includesGift: false,
    pricingPolicyLabel: pricePolicyLabel(brandTier),
  }
  const premium: BundlePlan = {
    type: "premium_gift_set",
    title: "프리미엄 선물 세트(한정판 증정)",
    payCount: 1,
    getCount: 1,
    totalUnits: 1,
    includesGift: true,
    pricingPolicyLabel: pricePolicyLabel(brandTier),
  }
  return [intro, best, premium]
}

function bestPlanForPersona(persona: PricingTargetPersona): BundlePlan["type"] {
  if (persona === "entry") return "intro_single"
  if (persona === "bestseller") return "bestseller_2plus1"
  return "premium_gift_set"
}

export function recommendBundles({
  unitCost,
  persona,
}: {
  unitCost: number
  persona: PricingTargetPersona
}): PricingRecommendation {
  const brandTier = personaToTier[persona]
  const [introPlan, bestPlan, premiumPlan] = makePlans({ brandTier })

  const p1: PriceComputation = computePriceForBundle({ unitCost, plan: introPlan, brandTier })
  const p2: PriceComputation = computePriceForBundle({ unitCost, plan: bestPlan, brandTier })
  const p3: PriceComputation = computePriceForBundle({ unitCost, plan: premiumPlan, brandTier })

  const bestPlanType = bestPlanForPersona(persona)

  return {
    bundlePlans: [p1, p2, p3],
    bestPlanType,
  }
}

