"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  LUMINA_TRUTH_COVENANT_CTA_EN,
  LUMINA_TRUTH_COVENANT_CTA_KO,
} from "@/lib/lumina/law-of-essential-beauty-copy"
import {
  LUMINA_ORIGIN1_FLAGSHIP_NAME_EN,
  LUMINA_ORIGIN1_FLAGSHIP_NAME_KO,
} from "@/lib/lumina/young-niche-charter"
import { cn } from "@/lib/utils"

const fontSerifKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSerifEn = "font-['Playfair_Display',Georgia,var(--font-serif),serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function NakedTruthCoverSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="naked-truth-cover"
      aria-labelledby="naked-truth-cover-heading"
      className="relative isolate overflow-hidden px-5 py-16 sm:px-8 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,#1c3a5a_0%,#112240_48%,#0d1828_100%)]"
        aria-hidden
      />
      <div className="lumina-hero-grain opacity-[0.035]" aria-hidden />

      <div className="relative z-[1] mx-auto flex max-w-3xl flex-col items-center">
        <p
          className={cn(
            "mb-8 text-[10px] tracking-[0.32em] text-[#8fa6be]/75",
            fontSans,
          )}
        >
          {isKo ? "루미나 오리진 #1 · 브랜드 기획서 표지" : "LUMINA ORIGIN #1 · BRAND REPORT COVER"}
        </p>

        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeLux }}
          className={cn(
            "lumina-origin-card-light w-full max-w-[min(100%,26rem)] rounded-none px-8 py-12 sm:px-12 sm:py-16",
            "border border-neutral-400/35 bg-white shadow-none",
          )}
        >
          <div className="flex min-h-[min(52vw,220px)] flex-col items-center justify-center text-center sm:min-h-[240px]">
            {isKo ? (
              <>
                <h2
                  id="naked-truth-cover-heading"
                  className={cn(
                    fontSerifKo,
                    "text-[1.35rem] font-semibold leading-[1.35] tracking-[0.14em] text-neutral-950 sm:text-[1.65rem] sm:tracking-[0.16em]",
                  )}
                  style={{
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.85), 0 2px 14px rgba(0,0,0,0.07), 0 -1px 1px rgba(0,0,0,0.12)",
                  }}
                >
                  {LUMINA_ORIGIN1_FLAGSHIP_NAME_KO}
                </h2>
                <p
                  className={cn(
                    fontSerifEn,
                    "mt-5 text-[0.95rem] font-semibold tracking-[0.22em] text-neutral-900 uppercase sm:text-[1.05rem] sm:tracking-[0.26em]",
                  )}
                  style={{
                    textShadow: "0 1px 0 rgba(255,255,255,0.7), 0 1px 10px rgba(0,0,0,0.06)",
                  }}
                >
                  {LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}
                </p>
              </>
            ) : (
              <>
                <h2
                  id="naked-truth-cover-heading"
                  className={cn(
                    fontSerifEn,
                    "text-[1.85rem] font-bold leading-[1.2] tracking-[0.08em] text-neutral-950 sm:text-[2.15rem] sm:tracking-[0.1em]",
                  )}
                  style={{
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.85), 0 2px 14px rgba(0,0,0,0.07), 0 -1px 1px rgba(0,0,0,0.12)",
                  }}
                >
                  {LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}
                </h2>
                <p
                  className={cn(
                    fontSerifKo,
                    "mt-6 text-[1.05rem] font-medium tracking-[0.12em] text-neutral-900 sm:text-[1.12rem] sm:tracking-[0.14em]",
                  )}
                  style={{
                    textShadow: "0 1px 0 rgba(255,255,255,0.7), 0 1px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  {LUMINA_ORIGIN1_FLAGSHIP_NAME_KO}
                </p>
              </>
            )}

            <div className="mx-auto mt-10 w-12 border-t border-neutral-400/55" aria-hidden />

            <p
              className={cn(
                isKo ? fontSerifKo : fontSerifEn,
                "mx-auto mt-8 max-w-[20rem] text-[0.78rem] font-medium leading-[1.95] tracking-[0.1em] text-neutral-800 sm:max-w-none sm:text-[0.82rem] sm:tracking-[0.12em]",
              )}
            >
              {isKo ? LUMINA_TRUTH_COVENANT_CTA_KO : LUMINA_TRUTH_COVENANT_CTA_EN}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: easeLux, delay: reduceMotion ? 0 : 0.18 }}
          className="relative mt-12 flex h-56 w-full max-w-[18rem] items-end justify-center overflow-hidden sm:h-64"
          aria-label={isKo ? "안개 속에서 나타나는 맨 유리병" : "Bare glass vessel emerging from mist"}
        >
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_at_center,rgba(230,238,248,0.32)_0%,rgba(186,208,232,0.18)_36%,transparent_76%)]"
            animate={reduceMotion ? undefined : { opacity: [0.45, 0.62, 0.45] }}
            transition={reduceMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-x-[12%] bottom-6 h-16 bg-[radial-gradient(ellipse_at_center,rgba(245,250,255,0.45)_0%,rgba(176,197,218,0.18)_38%,transparent_76%)] blur-md"
            animate={reduceMotion ? undefined : { opacity: [0.55, 0.75, 0.5], y: [0, -3, 0] }}
            transition={reduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            initial={reduceMotion ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(9px)", y: 16 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.2 : 1.05, ease: easeLux, delay: reduceMotion ? 0 : 0.35 }}
            className="lumina-dew-ampoule-glass lumina-glass-clarity-ampoule relative z-[2] h-44 w-20 rounded-t-md border border-white/22 border-b-0 bg-gradient-to-b from-white/[0.28] to-white/[0.06] sm:h-52 sm:w-[5.25rem]"
          >
            <div className="absolute inset-x-2 top-3 z-[1] h-10 rounded-b-sm bg-white/18 backdrop-blur-sm" />
            <div className="absolute inset-x-[11%] bottom-[7%] top-[18%] overflow-hidden rounded-sm">
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(234,242,250,0.62)_0%,rgba(201,216,232,0.38)_52%,rgba(182,201,222,0.24)_100%)]" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-t-[inherit] bg-gradient-to-br from-white/[0.2] via-transparent to-transparent opacity-70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
