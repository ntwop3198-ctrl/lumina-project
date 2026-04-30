"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  NARRATIVE_LABELS,
  fallbackNarrativeBlocks,
  parseNarrativeFromAnalysis,
} from "@/lib/narrative/detail-narrative"
import { SensoryVisualUpgrade } from "@/components/storytelling/sensory-visual-upgrade"
import { useLuminaCognitiveSyncOptional } from "@/components/cognitive-sync/lumina-cognitive-sync-provider"
import { stableHash } from "@/lib/lumina/stable-hash"
import {
  type EssenceVisualPreset,
  type RenderTier,
} from "@/lib/rendering/render-config"

type ScrollStorytellingProps = {
  markdown: string
  /** 업로드 제품 컷 — 섹션별 시네마틱 배경으로 깔림 */
  productImageUrl?: string | null
  /** 쇼케이스에서 선택된 티어를 외부 패널과 동기화 */
  onTierChange?: (tier: RenderTier) => void
  className?: string
}

/**
 * 긴 상세 카피를 **[발견·정제·치유·약속]** 블록으로 나누어 스크롤 스토리텔링.
 * 문단마다 페이드인, 배경에 원료·제품 디테일 컷(동일 이미지 레이어).
 */
export function ScrollStorytelling({
  markdown,
  productImageUrl,
  onTierChange,
  className = "",
}: ScrollStorytellingProps) {
  const [selectedTier, setSelectedTier] = useState<RenderTier>(1)
  const [essenceVisualPreset, setEssenceVisualPreset] =
    useState<EssenceVisualPreset>("default")
  const [hoveringGenesis, setHoveringGenesis] = useState(false)
  const [narrativeLine, setNarrativeLine] = useState("와, 예쁘다. 첫 감탄이 문을 연다.")
  let blocks = parseNarrativeFromAnalysis(markdown)
  if (blocks.length === 0) {
    blocks = fallbackNarrativeBlocks(markdown)
  }

  const cognitive = useLuminaCognitiveSyncOptional()

  const bg = productImageUrl?.trim() || "/placeholder.svg"
  const visualSeed = useMemo(() => {
    // markdown이 길어도 빠르게 동작하도록 일부만 사용합니다.
    const input = `${bg}::${markdown.slice(0, 1400)}`
    return stableHash(input)
  }, [bg, markdown])

  useEffect(() => {
    setNarrativeLine(
      selectedTier === 5
        ? "빛은 제형 내부에서 산란한다. 움직임은 물리의 진실을 증명한다."
        : "와, 예쁘다. 첫 감탄이 문을 연다."
    )
    onTierChange?.(selectedTier)
  }, [selectedTier, onTierChange])

  return (
    <div
      id="story-scroll"
      className={`relative rounded-3xl border border-rose-gold/15 overflow-hidden bg-cream ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent z-20" />

      <SensoryVisualUpgrade
        className="z-[1]"
        imageUrl={bg}
        seed={visualSeed}
        forcedTier={selectedTier}
        allowGenesis
        cognitiveMetricsRef={cognitive?.metricsRef}
        essenceVisualPreset={essenceVisualPreset}
      />

      <div className="relative z-[12] px-4 md:px-8 pt-5 md:pt-7">
        <div className="rounded-2xl border border-rose-gold/20 bg-black/[0.22] backdrop-blur-[2px] p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <button
              type="button"
              onClick={() => setSelectedTier(1)}
              className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition ${
                selectedTier === 1
                  ? "bg-white/90 text-charcoal"
                  : "bg-white/10 text-white/75 hover:bg-white/20"
              }`}
            >
              Tier 1 Essence
            </button>
            <button
              type="button"
              onClick={() => setSelectedTier(5)}
              className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition ${
                selectedTier === 5
                  ? "bg-rose-gold text-charcoal"
                  : "bg-white/10 text-white/75 hover:bg-white/20"
              }`}
            >
              Tier 5 Genesis
            </button>
          </div>

          {selectedTier === 1 ? (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                Essence visual
              </span>
              <button
                type="button"
                onClick={() => setEssenceVisualPreset("default")}
                className={`rounded-full px-2.5 py-1 text-[10px] tracking-wide transition ${
                  essenceVisualPreset === "default"
                    ? "bg-white/85 text-charcoal"
                    : "bg-white/10 text-white/70 hover:bg-white/18"
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setEssenceVisualPreset("studio_minimalist")}
                className={`rounded-full px-2.5 py-1 text-[10px] tracking-wide transition ${
                  essenceVisualPreset === "studio_minimalist"
                    ? "bg-white/85 text-charcoal"
                    : "bg-white/10 text-white/70 hover:bg-white/18"
                }`}
              >
                Studio Minimalist
              </button>
            </div>
          ) : null}

          <p className="text-xs md:text-sm text-white/90 leading-relaxed mb-4">{narrativeLine}</p>
          {cognitive ? (
            <p className="text-[11px] md:text-xs text-white/55 leading-relaxed mb-4 border-l border-rose-gold/25 pl-3">
              <span className="text-rose-gold/80 block mb-0.5 tracking-wide">
                Cognitive sync · {cognitive.textureAdjective}
              </span>
              {cognitive.syncLine}
            </p>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative h-40 rounded-xl overflow-hidden border border-white/20 bg-black/25">
              <Image src={bg} alt="Tier 1 preview" fill className="object-cover scale-[1.08] saturate-110 contrast-105" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,230,160,0.32),transparent_40%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black/30" />
              <div className="absolute left-2 top-2 rounded-full bg-black/45 px-2 py-1 text-[10px] text-white/90">
                Zoom-In Trap: Beautiful image
              </div>
            </div>

            <div
              className="group relative h-40 rounded-xl overflow-hidden border border-rose-gold/40 bg-black/30"
              onMouseEnter={() => setHoveringGenesis(true)}
              onMouseLeave={() => setHoveringGenesis(false)}
            >
              <Image src={bg} alt="Tier 5 preview" fill className="object-cover scale-[1.26] saturate-125 contrast-110" />
              <motion.div
                animate={{
                  opacity: hoveringGenesis ? 0.82 : 0.55,
                  x: hoveringGenesis ? [0, 8, -8, 0] : 0,
                  y: hoveringGenesis ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: hoveringGenesis ? 1.4 : 0.6,
                  repeat: hoveringGenesis ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_65%_42%,rgba(255,232,176,0.55),rgba(245,220,160,0.22)_30%,transparent_58%)]"
              />
              <motion.div
                animate={{ opacity: hoveringGenesis ? 0.9 : 0.4 }}
                className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(255,238,190,0.26)_0px,rgba(255,238,190,0.0)_5px,rgba(255,238,190,0.18)_9px)] mix-blend-screen"
              />
              <div className="absolute left-2 top-2 rounded-full bg-black/45 px-2 py-1 text-[10px] text-white/90">
                Zoom-In Trap: Molecular light scatter
              </div>
              <div className="absolute right-2 bottom-2 rounded-full bg-rose-gold/35 px-2 py-1 text-[10px] text-white">
                Mouse-over Light active
              </div>
            </div>
          </div>
        </div>
      </div>

      {blocks.map((block, sectionIndex) => (
        <section
          key={block.stage}
          className="relative min-h-[min(88vh,720px)] flex items-center py-16 md:py-24 px-5 md:px-10 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={bg}
              alt=""
              fill
              className="object-cover opacity-[0.18] scale-[1.03] blur-[0.5px]"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={sectionIndex === 0}
              loading={sectionIndex === 0 ? "eager" : "lazy"}
            />
            <motion.div
              initial={{ opacity: 0.85 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-gradient-to-b from-cream/[0.94] via-cream/[0.88] to-cream/[0.96]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,162,39,0.06),transparent_55%)]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto w-full">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] md:text-[11px] tracking-[0.38em] uppercase text-rose-gold/90 mb-3"
            >
              {NARRATIVE_LABELS[block.stage].en} · {NARRATIVE_LABELS[block.stage].ko}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-2xl md:text-3xl text-charcoal mb-2 tracking-tight"
            >
              {NARRATIVE_LABELS[block.stage].ko}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-xs text-charcoal/45 mb-10 max-w-md leading-relaxed"
            >
              {NARRATIVE_LABELS[block.stage].blurb}
            </motion.p>

            <div className="space-y-6">
              {block.lines.map((line, i) => (
                <motion.p
                  key={`${block.stage}-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6% 0px" }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-sans text-[15px] md:text-[16px] leading-[1.9] text-charcoal/[0.92]"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
