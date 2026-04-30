"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { LuminaCognitiveSyncProvider } from "@/components/cognitive-sync/lumina-cognitive-sync-provider"
import { ScrollStorytelling } from "@/components/storytelling/scroll-storytelling"
import { TemporalMetaphorAura } from "@/components/storytelling/temporal-metaphor-aura"
import { detectTemporalMetaphor } from "@/lib/lumina/linguistic-bridge"
import { ClinicalDataModule } from "@/components/luxury/clinical-data-module"
import { ConversionTrustTrigger } from "@/components/luxury/conversion-trust-trigger"
import { HonestFlawsTransparency } from "@/components/storytelling/honest-flaws-transparency"
import {
  LuminaSignatureBadges,
  type BadgeTexture,
} from "@/components/luxury/lumina-signature-badges"
import { PricingOptimizerPanel } from "@/components/pricing/pricing-optimizer-panel"
import { LuminaGiftBanner } from "@/components/pricing/lumina-gift-banner"
import { buildNarrativeHybridLines } from "@/lib/clinical/narrative-hybrid"
import {
  DEFAULT_CLINICAL_METRICS,
  type ClinicalMetric,
} from "@/lib/clinical/types"
import { type RenderTier } from "@/lib/rendering/render-config"

type DetailProofSectionProps = {
  markdown: string
  productImageUrl?: string | null
  className?: string
}

/**
 * 감성 서사(크림 톤) → 브릿지 전환 → Fact Check(다크 톤) + 임상 카드 + 루미나 배지.
 */
export function DetailProofSection({
  markdown,
  productImageUrl,
  className = "",
}: DetailProofSectionProps) {
  const [metrics, setMetrics] = useState<ClinicalMetric[]>(DEFAULT_CLINICAL_METRICS)
  const [badgeTexture, setBadgeTexture] = useState<BadgeTexture>("metal")
  const [selectedTier, setSelectedTier] = useState<RenderTier>(1)

  const bridgeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    offset: ["start end", "end start"],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const bridgeGlow = useTransform(smooth, [0, 0.45, 1], [0.15, 0.55, 0.9])
  const bridgeInvert = useTransform(smooth, [0, 0.5, 1], [0, 0.25, 0.45])
  const hybridLines = buildNarrativeHybridLines(metrics)
  const strongestTrustData = metrics[0]
    ? `${metrics[0].label} ${metrics[0].value}${metrics[0].unit} · ${metrics[0].footnote ?? "저자극 테스트 완료"}`
    : "저자극 테스트 완료"

  return (
    <LuminaCognitiveSyncProvider>
    <div className={`space-y-0 ${className}`}>
      <div className="relative rounded-3xl overflow-hidden">
        <TemporalMetaphorAura active={detectTemporalMetaphor(markdown)} />
        <ScrollStorytelling
          markdown={markdown}
          productImageUrl={productImageUrl}
          onTierChange={setSelectedTier}
        />
      </div>

      <HonestFlawsTransparency className="bg-cream border-y border-rose-gold/10" />

      {/* Counter-Punch: 서사 종료 → 조명·톤 전환 브릿지 */}
      <motion.div
        ref={bridgeRef}
        className="relative min-h-[min(52vh,520px)] flex flex-col items-center justify-center px-4 py-20 md:py-28"
        style={{
          background:
            "linear-gradient(180deg, #F9F8F6 0%, #2d2a26 42%, #1a1816 100%)",
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: bridgeGlow,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,162,39,0.35), transparent 60%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            opacity: bridgeInvert,
            background: "linear-gradient(180deg, #fff 0%, #0a0a0a 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-xl mx-auto"
        >
          <p className="text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-rose-gold/90 mb-4">
            Rational proof
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-cream mb-3 tracking-tight">
            Fact Check
          </h3>
          <p className="text-sm md:text-[15px] text-white/65 leading-relaxed">
            감성의 뒤편에서, 수치와 인증이 같은 목소리로 말합니다. 스크롤을 내려
            과학의 언어를 확인하세요.
          </p>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <span className="text-[9px] tracking-[0.35em] uppercase">Scroll</span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent rounded-full" />
        </motion.div>
      </motion.div>

      {/* Fact Check 본문 */}
      <section
        id="fact-check"
        className="relative -mt-1 rounded-b-3xl border border-t-0 border-rose-gold/20 bg-[#141210] text-cream px-4 py-14 md:py-20 shadow-[0_-32px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(201,162,39,0.07),transparent_55%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div data-lumina-cognitive-zone="clinical">
          <div className="text-center mb-12 md:mb-14">
            <p className="text-[10px] tracking-[0.35em] uppercase text-rose-gold/85 mb-2">
              Clinical &amp; certification
            </p>
            <h4 className="font-serif text-2xl md:text-3xl text-cream/95">
              누구도 반박하기 어려운 근거
            </h4>
            <p className="mt-3 text-sm text-white/55 max-w-2xl mx-auto leading-relaxed">
              임상 지표를 입력하면 즉시 Luxury Data Card로 정리됩니다. 아래는 루미나
              시그니처 배지입니다 — 금속 또는 유리 질감을 선택해 보세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <span className="text-[10px] uppercase tracking-wider text-white/45">
              Badge texture
            </span>
            <div className="inline-flex rounded-full border border-white/15 p-1 bg-black/30">
              <button
                type="button"
                onClick={() => setBadgeTexture("metal")}
                className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                  badgeTexture === "metal"
                    ? "bg-rose-gold/25 text-cream"
                    : "text-white/55 hover:text-white/80"
                }`}
              >
                Metal
              </button>
              <button
                type="button"
                onClick={() => setBadgeTexture("glass")}
                className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                  badgeTexture === "glass"
                    ? "bg-rose-gold/25 text-cream"
                    : "text-white/55 hover:text-white/80"
                }`}
              >
                Glass
              </button>
            </div>
          </div>

          <LuminaSignatureBadges texture={badgeTexture} className="mb-16 md:mb-20" />

          <div
            data-lumina-cognitive-zone="clinical"
            className="mb-14 rounded-2xl border border-rose-gold/25 bg-white/[0.03] p-5 md:p-7"
          >
            <p className="text-[10px] tracking-[0.28em] uppercase text-rose-gold/85 mb-3">
              Narrative-Hybrid
            </p>
            <h5 className="font-serif text-xl text-cream/95 mb-4">
              숫자가 문장 안에서 약속이 되는 순간
            </h5>
            <div className="space-y-3">
              {hybridLines.map((line, i) => (
                <motion.p
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="text-[14px] md:text-[15px] text-white/80 leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="mb-10 text-center">
            <p className="font-serif text-xl text-cream/95 leading-relaxed">
              이 과학적 증거는 우리가 당신에게 바치는 진심의 기록입니다
            </p>
            <p className="mt-2 text-sm text-white/55 leading-relaxed">
              입력하신 임상 지표가, 감성의 다음 페이지에서 바로 신뢰로 이어집니다.
            </p>
          </div>

          <ClinicalDataModule
            metrics={metrics}
            onChange={setMetrics}
            previewVariant="dark"
          />
          </div>
          <div data-lumina-cognitive-zone="price" className="mt-10 scroll-mt-6">
            <PricingOptimizerPanel renderTier={selectedTier} />
          </div>
          <ConversionTrustTrigger strongestTrustData={strongestTrustData} />
          <LuminaGiftBanner />
        </div>
      </section>
    </div>
    </LuminaCognitiveSyncProvider>
  )
}
