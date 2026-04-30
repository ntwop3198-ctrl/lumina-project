"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import type { PricingTargetPersona, PricingRecommendation } from "@/lib/pricing/types"
import type { PriceComputation } from "@/lib/pricing/types"
import { recommendBundles } from "@/lib/pricing/bundle-strategy"
import { formatPriceWon } from "@/lib/pricing/psychological-pricing"
import { getCreditsForTier } from "@/lib/rendering/credits"
import { type RenderTier } from "@/lib/rendering/render-config"

type PricingOptimizerPanelProps = {
  /** 상세페이지 원가 입력(1개 단위) */
  defaultUnitCost?: number
  /** 쇼케이스 선택 티어 */
  renderTier?: RenderTier
}

const PERSONA_LABEL: Record<PricingTargetPersona, string> = {
  entry: "입문자용(900원 톤)",
  bestseller: "베스트셀러(2+1 선호)",
  premium: "프리미엄(정가 정책)",
}

const BUNDLE_SHORT: Record<"intro_single" | "bestseller_2plus1" | "premium_gift_set", string> =
  {
    intro_single: "입문 1종",
    bestseller_2plus1: "2+1 베스트셀러",
    premium_gift_set: "프리미엄 선물 세트",
  }

function renderBundleLine(p: PriceComputation) {
  const { bundlePlan } = p
  const is2plus1 = bundlePlan.type === "bestseller_2plus1"
  const unit = is2plus1 ? p.effectiveUnitPriceWon : p.unitPriceWon

  return is2plus1
    ? `정가 ${formatPriceWon(p.listPriceWon)} · 실구매 단가 ${formatPriceWon(unit)}`
    : `정가 ${formatPriceWon(p.listPriceWon)} · 단가 ${formatPriceWon(unit)}`
}

export function PricingOptimizerPanel({
  defaultUnitCost = 12000,
  renderTier = 1,
}: PricingOptimizerPanelProps) {
  const [unitCostInput, setUnitCostInput] = useState(String(defaultUnitCost))
  const [persona, setPersona] = useState<PricingTargetPersona>("bestseller")

  const unitCost = useMemo(() => {
    const raw = Number(unitCostInput.replace(/[^0-9]/g, ""))
    if (!Number.isFinite(raw) || raw <= 0) return defaultUnitCost
    return raw
  }, [unitCostInput, defaultUnitCost])

  const recommendation: PricingRecommendation = useMemo(
    () => recommendBundles({ unitCost, persona }),
    [unitCost, persona]
  )

  const bestIdx = recommendation.bundlePlans.findIndex(
    (p) => p.bundlePlan.type === recommendation.bestPlanType
  )

  const detailCredits = useMemo(
    () => getCreditsForTier(renderTier, "detail_visual"),
    [renderTier]
  )
  const analysisCredits = useMemo(
    () => getCreditsForTier(renderTier, "analysis"),
    [renderTier]
  )
  const refineCredits = useMemo(
    () => getCreditsForTier(renderTier, "refine_copy"),
    [renderTier]
  )
  const totalCredits = detailCredits + analysisCredits + refineCredits
  const trustWeight = 0.7
  const conversionWeight = 0.3
  const valueScore = Math.round(
    (renderTier * 20 * trustWeight + renderTier * 14 * conversionWeight) * (6 / Math.max(1, totalCredits))
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.45 }}
      className="mb-10 rounded-2xl border border-rose-gold/25 bg-white/[0.03] p-5 md:p-7"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-rose-gold/85">
            Pricing Optimizer
          </p>
          <h5 className="font-serif text-xl text-cream/95 mt-2">
            원가·타겟 페르소나로 번들 & 정가선을 제안합니다
          </h5>
        </div>
        <Sparkles className="w-5 h-5 text-rose-gold mt-1" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3 items-end mb-5">
        <label className="space-y-2">
          <span className="text-[11px] text-white/60">제품 원가(1개)</span>
          <input
            inputMode="numeric"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream placeholder:text-white/30 focus:border-rose-gold/40 focus:outline-none focus:ring-1 focus:ring-rose-gold/30"
            value={unitCostInput}
            onChange={(e) => setUnitCostInput(e.target.value)}
          />
        </label>

        <label className="space-y-2">
          <span className="text-[11px] text-white/60">타겟 페르소나</span>
          <select
            className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream focus:border-rose-gold/40 focus:outline-none focus:ring-1 focus:ring-rose-gold/30"
            value={persona}
            onChange={(e) => setPersona(e.target.value as PricingTargetPersona)}
          >
            <option value="entry">{PERSONA_LABEL.entry}</option>
            <option value="bestseller">{PERSONA_LABEL.bestseller}</option>
            <option value="premium">{PERSONA_LABEL.premium}</option>
          </select>
        </label>

        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">
            추천 우선 구성
          </p>
          <p className="text-sm text-cream/90">
            {bestIdx >= 0
              ? BUNDLE_SHORT[recommendation.bundlePlans[bestIdx].bundlePlan.type]
              : "—"}
          </p>
          <p className="text-[11px] text-white/55 mt-1 leading-relaxed">
            고객이 망설이기 전에, “계산 가능한 혜택”부터 보이게 설계합니다.
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-rose-gold/25 bg-rose-gold/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-rose-gold/90">
            Tier-linked value
          </p>
          <p className="text-xs text-cream/90">
            Tier {renderTier} · Total {totalCredits} Credits / cycle
          </p>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-[10px] text-white/50">Detail Visual</p>
            <p className="text-sm text-cream">{detailCredits} Cr</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-[10px] text-white/50">Analysis</p>
            <p className="text-sm text-cream">{analysisCredits} Cr</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-[10px] text-white/50">Refine Copy</p>
            <p className="text-sm text-cream">{refineCredits} Cr</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-[10px] text-white/50">Elegant Efficiency</p>
            <p className="text-sm text-cream">{valueScore}</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-white/60 leading-relaxed">
          장기 신뢰(70) / 단기 전환(30) 가중치를 반영한 지표입니다. 높은 Tier일수록 표현력은 올라가고, 크레딧 효율은 예산 전략에 맞춰 선택됩니다.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {recommendation.bundlePlans.map((p, i) => {
          const isBest = i === bestIdx
          return (
            <div
              key={p.bundlePlan.type}
              className={[
                "relative overflow-hidden rounded-2xl border p-4",
                isBest
                  ? "border-rose-gold/40 bg-rose-gold/10"
                  : "border-white/10 bg-white/[0.02]",
              ].join(" ")}
            >
              {isBest ? (
                <div className="absolute -top-2 left-4 text-[10px] uppercase tracking-[0.22em] text-cream/95 bg-rose-gold/35 border border-rose-gold/40 rounded-full px-3 py-1">
                  Best Fit
                </div>
              ) : null}
              <p className="text-[10px] uppercase tracking-[0.22em] text-rose-gold/80 mb-2">
                {BUNDLE_SHORT[p.bundlePlan.type]}
              </p>
              <p className="text-sm text-cream/90 mb-2">
                {p.bundlePlan.type === "bestseller_2plus1"
                  ? "2개 구매 + 1개 증정"
                  : p.bundlePlan.type === "premium_gift_set"
                    ? "구매 1개 + 파우치 한정 증정"
                    : "구매 1개 단일 구성"}
              </p>
              <p className="text-[12px] text-white/70 leading-relaxed">
                {renderBundleLine(p)}
              </p>
              <p className="text-[11px] text-white/45 mt-3">
                {p.bundlePlan.pricingPolicyLabel}
              </p>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

