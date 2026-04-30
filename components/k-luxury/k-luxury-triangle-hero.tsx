"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type KLuxuryTriangleHeroProps = {
  jewelSrc?: string
  ingredientLabel?: string
  trustLabel?: string
}

/**
 * 3초 인지: 첫 뷰포트에서 핵심 성분 · 보석 비주얼 · 신뢰 수치가 삼각 구도로 동시에 인지되도록 배치.
 */
export function KLuxuryTriangleHero({
  jewelSrc = "/placeholder.svg",
  ingredientLabel = "Mg",
  trustLabel = "99%",
}: KLuxuryTriangleHeroProps) {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 pt-safe pb-12 bg-[#030712] text-[#e8eef5] overflow-hidden"
      style={{ fontFamily: "'Pretendard', var(--font-sans), system-ui, sans-serif" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 18%, rgba(56,189,248,0.14), transparent 55%), radial-gradient(circle at 20% 80%, rgba(30,58,138,0.35), transparent 45%), #030712",
        }}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto grid grid-rows-[auto_1fr_auto] min-h-[min(88dvh,640px)] gap-2">
        {/* Apex: jewel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center pt-4 md:pt-8"
        >
          <div className="relative w-[min(42vw,200px)] aspect-square rounded-[2rem] border border-sky-400/25 shadow-[0_0_60px_rgba(56,189,248,0.2)] overflow-hidden bg-slate-900/80">
            <Image
              src={jewelSrc}
              alt="제품 보석 톤 비주얼"
              fill
              className="object-cover opacity-95"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(56,189,248,0.15) 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Base corners: ingredient (left) + trust (right) — 삼각형 저점 */}
        <div className="grid grid-cols-2 items-end gap-3 px-1 pb-2">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="text-left pl-1"
          >
            <p className="text-[10px] tracking-[0.28em] text-sky-200/60 uppercase mb-1">core</p>
            <p
              className="text-[clamp(1.75rem,8vw,2.5rem)] leading-none font-extrabold tracking-tight text-sky-100/95"
              style={{ fontFamily: "'Nanum Myeongjo', var(--font-serif), serif", fontWeight: 800 }}
            >
              {ingredientLabel}
            </p>
            <p className="mt-1.5 text-[11px] text-slate-400/90 leading-snug max-w-[9rem]">
              깊이 스미는 성분
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-right pr-1"
          >
            <p className="text-[10px] tracking-[0.28em] text-amber-200/50 uppercase mb-1">trust</p>
            <p
              className="text-[clamp(1.85rem,8.5vw,2.65rem)] leading-none tabular-nums text-amber-100/95"
              style={{ fontFamily: "'Nanum Myeongjo', var(--font-serif), serif", fontWeight: 800 }}
            >
              {trustLabel}
            </p>
            <p className="mt-1.5 text-[11px] text-slate-400/90 leading-snug ml-auto max-w-[9rem]">
              만족 · 재구매 의향
            </p>
          </motion.div>
        </div>

        <p className="text-center text-[10px] tracking-[0.2em] text-slate-500 pt-2">
          Deep:er · Liquid Jewel
        </p>
      </div>

      {/* 삼각 가이드(은은한 선) */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polygon
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          className="text-sky-300"
          points="50,22 18,78 82,78"
        />
      </svg>
    </section>
  )
}
