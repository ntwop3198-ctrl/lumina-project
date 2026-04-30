"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  LUMINA_TRINITY_MAGIC_GUGI_BODY_EN,
  LUMINA_TRINITY_MAGIC_GUGI_BODY_KO,
  LUMINA_TRINITY_MAGIC_GUGI_HAN,
  LUMINA_TRINITY_MAGIC_GUGI_TITLE_EN,
  LUMINA_TRINITY_MAGIC_GUGI_TITLE_KO,
  LUMINA_TRINITY_MAGIC_GUGO_BODY_EN,
  LUMINA_TRINITY_MAGIC_GUGO_BODY_KO,
  LUMINA_TRINITY_MAGIC_GUGO_HAN,
  LUMINA_TRINITY_MAGIC_GUGO_TITLE_EN,
  LUMINA_TRINITY_MAGIC_GUGO_TITLE_KO,
  LUMINA_TRINITY_MAGIC_GUSO_BODY_EN,
  LUMINA_TRINITY_MAGIC_GUSO_BODY_KO,
  LUMINA_TRINITY_MAGIC_GUSO_HAN,
  LUMINA_TRINITY_MAGIC_GUSO_TITLE_EN,
  LUMINA_TRINITY_MAGIC_GUSO_TITLE_KO,
  LUMINA_TRINITY_MAGIC_SECTION_SUB_EN,
  LUMINA_TRINITY_MAGIC_SECTION_SUB_KO,
  LUMINA_TRINITY_MAGIC_SECTION_TITLE_EN,
  LUMINA_TRINITY_MAGIC_SECTION_TITLE_KO,
} from "@/lib/lumina/lumina-landing-trinity-magic-copy"
import { cn } from "@/lib/utils"

const fontSerifHan =
  "font-['Noto_Serif_TC','Noto_Serif_SC','Noto_Serif_JP','Nanum_Myeongjo',var(--font-serif),serif]"
const fontSerifKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSerifEn = "font-['Playfair_Display',Georgia,var(--font-serif),serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type Pillar = {
  han: string
  titleKo: string
  titleEn: string
  bodyKo: string
  bodyEn: string
}

const pillars: Pillar[] = [
  {
    han: LUMINA_TRINITY_MAGIC_GUSO_HAN,
    titleKo: LUMINA_TRINITY_MAGIC_GUSO_TITLE_KO,
    titleEn: LUMINA_TRINITY_MAGIC_GUSO_TITLE_EN,
    bodyKo: LUMINA_TRINITY_MAGIC_GUSO_BODY_KO,
    bodyEn: LUMINA_TRINITY_MAGIC_GUSO_BODY_EN,
  },
  {
    han: LUMINA_TRINITY_MAGIC_GUGO_HAN,
    titleKo: LUMINA_TRINITY_MAGIC_GUGO_TITLE_KO,
    titleEn: LUMINA_TRINITY_MAGIC_GUGO_TITLE_EN,
    bodyKo: LUMINA_TRINITY_MAGIC_GUGO_BODY_KO,
    bodyEn: LUMINA_TRINITY_MAGIC_GUGO_BODY_EN,
  },
  {
    han: LUMINA_TRINITY_MAGIC_GUGI_HAN,
    titleKo: LUMINA_TRINITY_MAGIC_GUGI_TITLE_KO,
    titleEn: LUMINA_TRINITY_MAGIC_GUGI_TITLE_EN,
    bodyKo: LUMINA_TRINITY_MAGIC_GUGI_BODY_KO,
    bodyEn: LUMINA_TRINITY_MAGIC_GUGI_BODY_EN,
  },
]

export function TrinityRotatingMagicSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="trinity-magic"
      aria-labelledby="trinity-magic-heading"
      className="relative isolate overflow-hidden px-5 py-20 sm:px-8 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_72%_at_50%_42%,#1a5080_0%,#112240_45%,#0d1828_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,192,192,0.06)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="lumina-hero-grain opacity-[0.04]" aria-hidden />

      {/* 느린 궤도: 장식 링만 회전 (본문은 읽기 고정) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(88vw,520px)] w-[min(88vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c0c0c0]/[0.12] sm:top-[45%]"
        style={{ willChange: "transform" }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 180, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
        }
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[min(72vw,420px)] w-[min(72vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8fa6be]/[0.1] sm:top-[45%]"
        style={{ willChange: "transform" }}
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 240, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
        }
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-6xl">
        <header className="mb-14 text-center md:mb-16">
          <p
            className={cn(
              "mb-4 text-[10px] tracking-[0.32em] text-[#8fa6be]/80",
              fontSans,
            )}
          >
            LUMINA · 三求
          </p>
          <h2
            id="trinity-magic-heading"
            className={cn(
              isKo ? fontSerifKo : fontSerifEn,
              "text-[1.35rem] font-semibold leading-snug tracking-[0.06em] text-[#e8eef5] sm:text-[1.6rem]",
            )}
          >
            {isKo ? LUMINA_TRINITY_MAGIC_SECTION_TITLE_KO : LUMINA_TRINITY_MAGIC_SECTION_TITLE_EN}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#a8b8cc]/95 sm:text-[0.95rem]",
              fontSans,
            )}
          >
            {isKo ? LUMINA_TRINITY_MAGIC_SECTION_SUB_KO : LUMINA_TRINITY_MAGIC_SECTION_SUB_EN}
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <motion.article
              key={p.han}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-32px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: easeLux }}
              className={cn(
                "relative flex flex-col rounded-2xl border border-white/[0.1] bg-[#0a1520]/55 px-6 py-8 backdrop-blur-md",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
              )}
            >
              <div className="mb-5 flex flex-col items-center text-center">
                <span
                  className={cn(
                    fontSerifHan,
                    "text-[2.35rem] leading-none tracking-[0.12em] text-[#dce6f2] sm:text-[2.65rem]",
                  )}
                  lang="zh-Hant"
                >
                  {p.han}
                </span>
                <span
                  className={cn(
                    "mt-3 text-[11px] tracking-[0.2em] text-[#8fa6be]/85",
                    fontSans,
                  )}
                >
                  {isKo ? p.titleKo : p.titleEn}
                </span>
              </div>
              <p
                className={cn(
                  "text-center text-[0.9rem] leading-relaxed text-[#c5d0dc]/95 sm:text-[0.95rem]",
                  fontSans,
                )}
              >
                {isKo ? p.bodyKo : p.bodyEn}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
