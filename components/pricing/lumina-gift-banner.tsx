"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import {
  formatRemaining,
  getOrCreateLuminaGiftWindow,
  luminaGiftCopy,
} from "@/lib/pricing/lumina-gift"

const REFRESH_MS = 250

export function LuminaGiftBanner() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), REFRESH_MS)
    return () => window.clearInterval(t)
  }, [])

  const windowInfo = useMemo(() => getOrCreateLuminaGiftWindow(now), [now])
  const copy = useMemo(() => luminaGiftCopy(windowInfo.expired), [windowInfo.expired])
  const remainingText = useMemo(() => formatRemaining(windowInfo.endTs - now), [now, windowInfo.endTs])

  const expired = windowInfo.expired

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45 }}
      className="mb-10 rounded-3xl border border-rose-gold/25 bg-[#0f0e0c] overflow-hidden"
    >
      {/* shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_10%,rgba(217,194,169,0.20),transparent_60%)]" />
      </div>

      <div className="relative z-10 px-5 py-6 md:px-7 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-gold/15 border border-rose-gold/25">
              <Sparkles className="w-4 h-4 text-rose-gold" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-rose-gold/90">
                Lumina Gift
              </span>
            </div>
            <h4 className="font-serif text-2xl text-cream/95 mt-3 tracking-tight">
              {copy.headline}
            </h4>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              {copy.sub}
            </p>
          </div>

          <div className="min-w-[160px] text-right">
            <p className="text-[10px] uppercase tracking-[0.28em] text-rose-gold/80 mb-2">
              {expired ? "Ended" : "Remaining"}
            </p>
            <div className="font-serif text-3xl text-cream/95 tabular-nums">
              {expired ? "—" : remainingText}
            </div>
            <p className="text-[11px] text-white/45 mt-1 leading-snug">
              {expired ? "한정판 증정 종료" : "지금, 놓치지 마세요"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="text-[11px] text-white/45 leading-relaxed">
            수령 조건: 런칭 기간 한정. 재고 소진 시 자동 종료됩니다.
          </div>

          <div className="flex gap-3 justify-end">
            <Link
              href="/pricing"
              aria-disabled={expired}
              onClick={(e) => {
                if (expired) e.preventDefault()
              }}
              className={[
                "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors border",
                expired
                  ? "border-white/15 bg-white/[0.04] text-white/55 cursor-not-allowed"
                  : "border-rose-gold/35 bg-gradient-to-r from-rose-gold-dark via-rose-gold to-rose-gold-light text-black hover:opacity-95",
              ].join(" ")}
            >
              {copy.cta}
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

