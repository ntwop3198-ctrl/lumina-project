"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  LUMINA_VISION_PAGE_CTA_LANDING_EN,
  LUMINA_VISION_PAGE_CTA_LANDING_KO,
  LUMINA_VISION_PAGE_CTA_PARTNER_EN,
  LUMINA_VISION_PAGE_CTA_PARTNER_KO,
  LUMINA_VISION_PAGE_EYEBROW_EN,
  LUMINA_VISION_PAGE_EYEBROW_KO,
  LUMINA_VISION_PAGE_LEAD_EN,
  LUMINA_VISION_PAGE_LEAD_KO,
  LUMINA_VISION_PAGE_TITLE_EN,
  LUMINA_VISION_PAGE_TITLE_KO,
  LUMINA_VISION_PILLAR1_BODY_EN,
  LUMINA_VISION_PILLAR1_BODY_KO,
  LUMINA_VISION_PILLAR1_TITLE_EN,
  LUMINA_VISION_PILLAR1_TITLE_KO,
  LUMINA_VISION_PILLAR2_BODY_EN,
  LUMINA_VISION_PILLAR2_BODY_KO,
  LUMINA_VISION_PILLAR2_TITLE_EN,
  LUMINA_VISION_PILLAR2_TITLE_KO,
  LUMINA_VISION_PILLAR3_BODY_EN,
  LUMINA_VISION_PILLAR3_BODY_KO,
  LUMINA_VISION_PILLAR3_TITLE_EN,
  LUMINA_VISION_PILLAR3_TITLE_KO,
} from "@/lib/lumina/lumina-vision-page-copy"
import { cn } from "@/lib/utils"

const fontSerifKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSerifEn = "font-['Playfair_Display',Georgia,var(--font-serif),serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

const pillars = [
  {
    titleKo: LUMINA_VISION_PILLAR1_TITLE_KO,
    titleEn: LUMINA_VISION_PILLAR1_TITLE_EN,
    bodyKo: LUMINA_VISION_PILLAR1_BODY_KO,
    bodyEn: LUMINA_VISION_PILLAR1_BODY_EN,
  },
  {
    titleKo: LUMINA_VISION_PILLAR2_TITLE_KO,
    titleEn: LUMINA_VISION_PILLAR2_TITLE_EN,
    bodyKo: LUMINA_VISION_PILLAR2_BODY_KO,
    bodyEn: LUMINA_VISION_PILLAR2_BODY_EN,
  },
  {
    titleKo: LUMINA_VISION_PILLAR3_TITLE_KO,
    titleEn: LUMINA_VISION_PILLAR3_TITLE_EN,
    bodyKo: LUMINA_VISION_PILLAR3_BODY_KO,
    bodyEn: LUMINA_VISION_PILLAR3_BODY_EN,
  },
] as const

export function VisionPageView() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative pb-24 pt-[max(6rem,env(safe-area-inset-top,0px))]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_30%_28%,#1a5080_0%,#112240_45%,#0d1828_78%,#080f1a_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_82%_70%,rgba(192,192,192,0.06)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="lumina-hero-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <header className="max-w-3xl">
          <motion.p
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeLux }}
            className={cn(
              "mb-5 font-mono text-[10px] uppercase tracking-[0.32em] text-[#8fa6be]/85",
              fontSans,
            )}
          >
            {isKo ? LUMINA_VISION_PAGE_EYEBROW_KO : LUMINA_VISION_PAGE_EYEBROW_EN}
          </motion.p>
          <motion.h1
            id="vision-page-heading"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.06, ease: easeLux }}
            className={cn(
              "mb-6 text-balance text-[1.75rem] font-semibold leading-tight tracking-[0.02em] text-[#f0f4fa] sm:text-[2rem] md:text-[2.35rem]",
              isKo ? fontSerifKo : fontSerifEn,
            )}
          >
            {isKo ? LUMINA_VISION_PAGE_TITLE_KO : LUMINA_VISION_PAGE_TITLE_EN}
          </motion.h1>
          <motion.p
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.14, ease: easeLux }}
            className={cn(
              "max-w-2xl text-[0.9375rem] leading-[1.85] tracking-[0.02em] text-[#c8d2e0] sm:text-base",
              fontSans,
            )}
          >
            {isKo ? LUMINA_VISION_PAGE_LEAD_KO : LUMINA_VISION_PAGE_LEAD_EN}
          </motion.p>
        </header>

        <ul className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <motion.li
              key={p.titleKo}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : i * 0.08, ease: easeLux }}
              className="flex flex-col border border-white/[0.08] bg-white/[0.02] px-6 py-8 backdrop-blur-[6px] sm:px-7 sm:py-9"
            >
              <h2
                className={cn(
                  "mb-4 text-[1rem] font-semibold leading-snug tracking-[0.02em] text-[#e8edf4] sm:text-[1.05rem]",
                  isKo ? fontSerifKo : fontSerifEn,
                )}
              >
                {isKo ? p.titleKo : p.titleEn}
              </h2>
              <p
                className={cn(
                  "text-[0.8125rem] leading-[1.82] text-[#a8b4c4] sm:text-[0.875rem] sm:leading-[1.8]",
                  fontSans,
                )}
              >
                {isKo ? p.bodyKo : p.bodyEn}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeLux }}
          className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-12 sm:flex-row sm:items-center sm:gap-8"
        >
          <Link
            href="/#vision"
            className={cn(
              "inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/[0.14] bg-transparent px-8 py-3 text-[12px] font-medium tracking-[0.12em] text-[#e8eef5] transition-[border-color,background-color] hover:border-[#C0C0C0]/45 hover:bg-white/[0.04]",
              fontSans,
            )}
          >
            {isKo ? LUMINA_VISION_PAGE_CTA_LANDING_KO : LUMINA_VISION_PAGE_CTA_LANDING_EN}
          </Link>
          <Link
            href="/partner-guide"
            className={cn(
              "inline-flex min-h-[48px] items-center justify-center text-[12px] font-medium tracking-[0.1em] text-[#C0C0C0]/75 transition-colors hover:text-[#e8eef5]",
              fontSans,
            )}
          >
            {isKo ? LUMINA_VISION_PAGE_CTA_PARTNER_KO : LUMINA_VISION_PAGE_CTA_PARTNER_EN}
            <span className="ml-1.5 text-[0.65rem] opacity-80" aria-hidden>
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
