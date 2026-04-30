import type { BundlePlan, PriceComputation } from "@/lib/pricing/types"

function roundTo(n: number, base: number) {
  return Math.round(n / base) * base
}

function apply900Marketing(priceWon: number) {
  // 1000 단위로 “끝이 900”에 맞춘 뒤, 오버되면 1000 내립니다.
  const base = Math.floor(priceWon / 1000) * 1000 + 900
  return base > priceWon ? base - 1000 : base
}

function applyLuxuryRounding(priceWon: number) {
  // 럭셔리 정가 정책: 5,000~10,000 단위로 절제된 반올림.
  return roundTo(priceWon, priceWon > 80000 ? 10000 : 5000)
}

function formatKRW(n: number) {
  return new Intl.NumberFormat("ko-KR").format(Math.round(n))
}

export function computePriceForBundle({
  unitCost,
  plan,
  brandTier,
}: {
  unitCost: number
  plan: BundlePlan
  brandTier: "entry" | "bestseller" | "premium"
}): PriceComputation {
  // 기본 원가 대비 멀티플라이어(지표 목적: “판매 가능성”과 “브랜드 등급”을 동시에 반영)
  const multiplier =
    plan.type === "intro_single"
      ? 2.55
      : plan.type === "bestseller_2plus1"
        ? 2.25
        : 3.05

  const rawListPrice = unitCost * multiplier * plan.payCount

  const listPriceWon =
    brandTier === "entry"
      ? apply900Marketing(rawListPrice)
      : brandTier === "bestseller"
        ? apply900Marketing(rawListPrice * 0.985)
        : applyLuxuryRounding(rawListPrice * 1.02)

  // 단가/효율 단가(2+1이면 effective)
  const unitPriceWon = listPriceWon / plan.payCount
  const effectiveUnitPriceWon = listPriceWon / plan.totalUnits

  return {
    unitCost,
    bundlePlan: plan,
    listPriceWon,
    unitPriceWon,
    effectiveUnitPriceWon,
  }
}

export function pricePolicyLabel(brandTier: "entry" | "bestseller" | "premium") {
  if (brandTier === "entry") return "900원 마케팅 정책"
  if (brandTier === "bestseller") return "900원 마케팅(럭셔리 톤 완화)"
  return "정가 정책(럭셔리 라운딩)"
}

export function formatPriceWon(price: number) {
  return `₩${formatKRW(price)}`
}

