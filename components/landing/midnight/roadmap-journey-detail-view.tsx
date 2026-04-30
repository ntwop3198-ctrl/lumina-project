"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  ROADMAP_GENESIS_BLOCK1_BODY_EN,
  ROADMAP_GENESIS_BLOCK1_BODY_KO,
  ROADMAP_GENESIS_BLOCK1_TITLE_EN,
  ROADMAP_GENESIS_BLOCK1_TITLE_KO,
  ROADMAP_GENESIS_BLOCK2_BODY_EN,
  ROADMAP_GENESIS_BLOCK2_BODY_KO,
  ROADMAP_GENESIS_BLOCK2_TITLE_EN,
  ROADMAP_GENESIS_BLOCK2_TITLE_KO,
  ROADMAP_GENESIS_BLOCK3_BODY_EN,
  ROADMAP_GENESIS_BLOCK3_BODY_KO,
  ROADMAP_GENESIS_BLOCK3_TITLE_EN,
  ROADMAP_GENESIS_BLOCK3_TITLE_KO,
  ROADMAP_GENESIS_HERO_EN,
  ROADMAP_GENESIS_HERO_KO,
  ROADMAP_GENESIS_LEAD_EN,
  ROADMAP_GENESIS_LEAD_KO,
  ROADMAP_JOURNEY_BACK_EN,
  ROADMAP_JOURNEY_BACK_KO,
  ROADMAP_SCALING_BLOCK1_BODY_EN,
  ROADMAP_SCALING_BLOCK1_BODY_KO,
  ROADMAP_SCALING_BLOCK1_TITLE_EN,
  ROADMAP_SCALING_BLOCK1_TITLE_KO,
  ROADMAP_SCALING_BLOCK2_BODY_EN,
  ROADMAP_SCALING_BLOCK2_BODY_KO,
  ROADMAP_SCALING_BLOCK2_TITLE_EN,
  ROADMAP_SCALING_BLOCK2_TITLE_KO,
  ROADMAP_SCALING_BLOCK3_BODY_EN,
  ROADMAP_SCALING_BLOCK3_BODY_KO,
  ROADMAP_SCALING_BLOCK3_TITLE_EN,
  ROADMAP_SCALING_BLOCK3_TITLE_KO,
  ROADMAP_SCALING_HERO_EN,
  ROADMAP_SCALING_HERO_KO,
  ROADMAP_SCALING_LEAD_EN,
  ROADMAP_SCALING_LEAD_KO,
} from "@/lib/lumina/lumina-roadmap-journey-pages-copy"
import { GenesisElevenAxesTree } from "@/components/landing/midnight/genesis-eleven-axes-tree"
import { ScalingExpansionTree } from "@/components/landing/midnight/scaling-expansion-tree"
import { cn } from "@/lib/utils"

const fontSerifKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSerifEn = "font-['Playfair_Display',Georgia,var(--font-serif),serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type JourneyVariant = "genesis" | "scaling"

const blocks = {
  genesis: [
    {
      titleKo: ROADMAP_GENESIS_BLOCK1_TITLE_KO,
      titleEn: ROADMAP_GENESIS_BLOCK1_TITLE_EN,
      bodyKo: ROADMAP_GENESIS_BLOCK1_BODY_KO,
      bodyEn: ROADMAP_GENESIS_BLOCK1_BODY_EN,
    },
    {
      titleKo: ROADMAP_GENESIS_BLOCK2_TITLE_KO,
      titleEn: ROADMAP_GENESIS_BLOCK2_TITLE_EN,
      bodyKo: ROADMAP_GENESIS_BLOCK2_BODY_KO,
      bodyEn: ROADMAP_GENESIS_BLOCK2_BODY_EN,
    },
    {
      titleKo: ROADMAP_GENESIS_BLOCK3_TITLE_KO,
      titleEn: ROADMAP_GENESIS_BLOCK3_TITLE_EN,
      bodyKo: ROADMAP_GENESIS_BLOCK3_BODY_KO,
      bodyEn: ROADMAP_GENESIS_BLOCK3_BODY_EN,
    },
  ],
  scaling: [
    {
      titleKo: ROADMAP_SCALING_BLOCK1_TITLE_KO,
      titleEn: ROADMAP_SCALING_BLOCK1_TITLE_EN,
      bodyKo: ROADMAP_SCALING_BLOCK1_BODY_KO,
      bodyEn: ROADMAP_SCALING_BLOCK1_BODY_EN,
    },
    {
      titleKo: ROADMAP_SCALING_BLOCK2_TITLE_KO,
      titleEn: ROADMAP_SCALING_BLOCK2_TITLE_EN,
      bodyKo: ROADMAP_SCALING_BLOCK2_BODY_KO,
      bodyEn: ROADMAP_SCALING_BLOCK2_BODY_EN,
    },
    {
      titleKo: ROADMAP_SCALING_BLOCK3_TITLE_KO,
      titleEn: ROADMAP_SCALING_BLOCK3_TITLE_EN,
      bodyKo: ROADMAP_SCALING_BLOCK3_BODY_KO,
      bodyEn: ROADMAP_SCALING_BLOCK3_BODY_EN,
    },
  ],
} as const

export function RoadmapJourneyDetailView({ variant }: { variant: JourneyVariant }) {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  const heroKo = variant === "genesis" ? ROADMAP_GENESIS_HERO_KO : ROADMAP_SCALING_HERO_KO
  const heroEn = variant === "genesis" ? ROADMAP_GENESIS_HERO_EN : ROADMAP_SCALING_HERO_EN
  const leadKo = variant === "genesis" ? ROADMAP_GENESIS_LEAD_KO : ROADMAP_SCALING_LEAD_KO
  const leadEn = variant === "genesis" ? ROADMAP_GENESIS_LEAD_EN : ROADMAP_SCALING_LEAD_EN
  const list = blocks[variant]

  const headingId =
    variant === "genesis" ? "roadmap-genesis-heading" : "roadmap-scaling-heading"

  return (
    <div className="relative pb-24 pt-[max(6rem,env(safe-area-inset-top,0px))]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_28%_30%,#1a5080_0%,#112240_45%,#0d1828_78%,#080f1a_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_48%_at_78%_72%,rgba(212,175,55,0.04)_0%,transparent_52%)]"
        aria-hidden
      />
      <div className="lumina-hero-grain pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden />

      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <header className="max-w-3xl">
          <motion.h1
            id={headingId}
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeLux }}
            className={cn(
              "text-balance text-[1.65rem] font-semibold leading-tight tracking-[0.02em] text-[#f4f7fb] sm:text-[1.9rem] md:text-[2.1rem]",
              isKo ? fontSerifKo : fontSerifEn,
            )}
          >
            {isKo ? heroKo : heroEn}
          </motion.h1>
          <motion.p
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08, ease: easeLux }}
            className={cn(
              "mt-6 max-w-2xl text-[0.9375rem] leading-[1.85] text-[#c5ced9] sm:text-base",
              fontSans,
            )}
          >
            {isKo ? leadKo : leadEn}
          </motion.p>
        </header>

        <ul className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
          {list.map((b, i) => (
            <motion.li
              key={b.titleKo}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-36px" }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.06, ease: easeLux }}
              className="border border-white/[0.1] bg-[#0c1524]/55 p-6 backdrop-blur-[8px] sm:p-7"
            >
              <h2
                className={cn(
                  "mb-3 text-[0.95rem] font-semibold leading-snug text-[#ebeff5] sm:text-[1rem]",
                  isKo ? fontSerifKo : fontSerifEn,
                )}
              >
                {isKo ? b.titleKo : b.titleEn}
              </h2>
              <p
                className={cn(
                  "text-[0.8125rem] leading-[1.82] text-[#9fafc0] sm:text-[0.875rem]",
                  fontSans,
                )}
              >
                {isKo ? b.bodyKo : b.bodyEn}
              </p>
            </motion.li>
          ))}
        </ul>

        {variant === "genesis" ? <GenesisElevenAxesTree /> : null}
        {variant === "scaling" ? <ScalingExpansionTree /> : null}

        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 border-t border-white/[0.08] pt-10"
        >
          <Link
            href="/#conviction-roadmap"
            className={cn(
              "inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.12em] text-[#C0C0C0]/85 transition-colors hover:text-[#eef2f8]",
              fontSans,
            )}
          >
            <span aria-hidden className="text-[0.7rem]">
              ↑
            </span>
            {isKo ? ROADMAP_JOURNEY_BACK_KO : ROADMAP_JOURNEY_BACK_EN}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
