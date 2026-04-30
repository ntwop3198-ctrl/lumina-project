"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  LUMINA_HERITAGE_BRIDGE_BODY_EN,
  LUMINA_HERITAGE_BRIDGE_BODY_KO,
  LUMINA_HERITAGE_BRIDGE_CTA_EN,
  LUMINA_HERITAGE_BRIDGE_CTA_KO,
  LUMINA_HERITAGE_BRIDGE_EYEBROW_EN,
  LUMINA_HERITAGE_BRIDGE_EYEBROW_KO,
  LUMINA_HERITAGE_BRIDGE_TITLE_EN,
  LUMINA_HERITAGE_BRIDGE_TITLE_KO,
} from "@/lib/lumina/lumina-heritage-story-bridge-copy"
import { cn } from "@/lib/utils"

const fontSerifKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSerifEn = "font-['Playfair_Display',Georgia,var(--font-serif),serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function LuminaHeritageStoryBridge() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="brand-story"
      aria-labelledby="heritage-story-bridge-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-b border-white/[0.06] px-5 py-16 sm:px-8 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_65%_at_38%_38%,#1a5080_0%,#112240_45%,#0d1828_88%,#080f1a_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_78%_62%,rgba(192,192,192,0.05)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="lumina-hero-grain opacity-[0.03]" aria-hidden />

      <div className="relative z-[1] mx-auto w-full max-w-[42rem]">
        <motion.p
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-32px" }}
          transition={{ duration: 0.55, ease: easeLux }}
          className={cn(
            "mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#8fa6be]/80",
            fontSans,
          )}
        >
          {isKo ? LUMINA_HERITAGE_BRIDGE_EYEBROW_KO : LUMINA_HERITAGE_BRIDGE_EYEBROW_EN}
        </motion.p>

        <motion.h2
          id="heritage-story-bridge-heading"
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-32px" }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.04, ease: easeLux }}
          className={cn(
            "mb-6 text-balance text-[1.35rem] font-semibold leading-snug tracking-[0.02em] text-[#eceff4] sm:text-[1.5rem]",
            isKo ? fontSerifKo : fontSerifEn,
          )}
        >
          {isKo ? LUMINA_HERITAGE_BRIDGE_TITLE_KO : LUMINA_HERITAGE_BRIDGE_TITLE_EN}
        </motion.h2>

        <motion.p
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-32px" }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.1, ease: easeLux }}
          className={cn(
            "lumina-hero-subcopy-dawn text-[0.8125rem] font-medium leading-[1.95] tracking-[0.02em] antialiased [text-rendering:optimizeLegibility] sm:text-[0.875rem]",
            fontSans,
          )}
        >
          {isKo ? LUMINA_HERITAGE_BRIDGE_BODY_KO : LUMINA_HERITAGE_BRIDGE_BODY_EN}
        </motion.p>
        <motion.p
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{ duration: 0.62, delay: reduceMotion ? 0 : 0.14, ease: easeLux }}
          className={cn(
            "mt-4 text-[0.78rem] font-semibold leading-[1.9] tracking-[0.07em] text-[#d3dfec]/88 sm:text-[0.82rem]",
            fontSans,
          )}
        >
          {isKo
            ? "작게 구하고, 깊게 돕고, 길게 번영합니다."
            : "Seek small, help deep, and let prosperity last long."}
        </motion.p>

        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.22, ease: easeLux }}
          className="mt-8"
        >
          <Link
            href="#trinity-magic"
            className={cn(
              "inline-flex items-center gap-2 border-b border-[#c0c0c0]/35 pb-0.5 text-[11px] font-semibold tracking-[0.18em] text-[#dce4ee] transition-colors hover:border-[#e8eef6]/80 hover:text-[#f4f7fb]",
              fontSans,
            )}
          >
            {isKo ? LUMINA_HERITAGE_BRIDGE_CTA_KO : LUMINA_HERITAGE_BRIDGE_CTA_EN}
            <span aria-hidden className="text-[0.65rem] opacity-80">
              ↓
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
