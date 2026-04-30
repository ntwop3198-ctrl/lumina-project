"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HONEST_FLAW_FRAMINGS,
  type HonestFlawFraming,
} from "@/lib/lumina/vulnerability-marketing"

function FlawCard({ f, index }: { f: HonestFlawFraming; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-2xl border border-charcoal/10 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3.5 md:px-5 md:py-4 flex flex-col gap-1 hover:bg-cream/60 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] text-rose-gold/90">
          Honest flaw
        </span>
        <span className="font-serif text-base md:text-lg text-charcoal leading-snug">{f.titleKo}</span>
        <span className="text-xs text-warm-gray leading-relaxed">{f.subtitleKo}</span>
        <span className="text-[10px] text-warm-gray/80 mt-1">
          {open ? "접기" : "루미나 톤 · 과학 노트 펼치기"}
        </span>
      </button>
      {open ? (
        <div className="px-4 pb-4 md:px-5 md:pb-5 space-y-3 border-t border-charcoal/5 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-1">피할 톤</p>
            <p className="text-xs text-charcoal/55 italic leading-relaxed">{f.avoidToneKo}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-rose-gold/90 mb-1">
              루미나 정직 톤
            </p>
            <p className="text-sm text-charcoal leading-relaxed">{f.luminaToneKo}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-1">과학·공정 한 줄</p>
            <p className="text-xs text-warm-gray leading-relaxed">{f.scienceKo}</p>
          </div>
        </div>
      ) : null}
    </motion.article>
  )
}

type HonestFlawsTransparencyProps = {
  className?: string
}

/**
 * 상세 서사 하단 — "정직한 약점"을 배지형으로 고정 노출 (Vulnerability marketing).
 */
export function HonestFlawsTransparency({ className = "" }: HonestFlawsTransparencyProps) {
  return (
    <section
      className={`relative px-4 py-12 md:py-16 ${className}`}
      aria-labelledby="honest-flaws-heading"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-rose-gold/85 text-center mb-2">
          Transparency badge
        </p>
        <h2
          id="honest-flaws-heading"
          className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-2 tracking-tight"
        >
          루미나가 보증하는 정직한 약점
        </h2>
        <p className="text-sm text-warm-gray text-center leading-relaxed mb-8 max-w-xl mx-auto">
          완벽한 연기보다 본질에 맞는 설명을 선택했을 때 쓸 수 있는 서사입니다. 실제 제품
          표기·법규와 충돌하지 않도록 최종 문구는 항상 검수하세요.
        </p>
        <div className="space-y-3 md:space-y-4">
          {HONEST_FLAW_FRAMINGS.map((f, i) => (
            <FlawCard key={f.id} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
