"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useConvictionAtmosphere } from "@/components/providers/conviction-atmosphere-provider"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  LUMINA_CONSTITUTION_HERO_LINE_EN,
  LUMINA_CONSTITUTION_HERO_LINE_KO,
} from "@/lib/lumina/law-of-essential-beauty-copy"
import {
  LUMINA_HERO_HEADLINE_EN,
  LUMINA_HERO_MANIFESTO_EN,
  LUMINA_HERO_MANIFESTO_KO,
  LUMINA_HERO_SUB_EN,
  LUMINA_HERO_SUB_KO,
  LUMINA_HERO_TRINITY_HAN_LINE,
  LUMINA_HERO_TRINITY_LINE2_KO,
} from "@/lib/lumina/lumina-landing-trinity-magic-copy"
import { scrollToIdWithHeaderOffset } from "@/lib/landing/scroll-with-header-offset"
import { cn } from "@/lib/utils"

/** 한국 메인 슬로건: 나눔명조 + Noto Serif KR 계열 — 고딕 대신 클래식 명조 */
const fontHeadlineKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),serif] font-extrabold"
const fontHanHero =
  "font-['Noto_Serif_TC','Noto_Serif_SC','Noto_Serif_JP','Nanum_Myeongjo',var(--font-serif),serif]"
const fontConstitutionKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),serif] font-medium"
const fontHeadEn = "font-['Playfair_Display',Georgia,serif] font-bold"
const fontConstitutionEn = "font-['Playfair_Display',Georgia,serif] font-medium"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function MidnightHero() {
  const { lang } = useLuminaLanguage()
  const { unveilMorning } = useConvictionAtmosphere()
  const reduceMotion = useReducedMotion()
  const isKo = lang === "ko"

  const floatTransition = reduceMotion
    ? undefined
    : {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: [0.42, 0, 0.58, 1] as const,
      }

  return (
    <section
      id="vision"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-transparent pb-20 pt-[max(5.5rem,env(safe-area-inset-top,0px))]"
    >
      {/* 방사형: 중심을 텍스트 쪽(좌측)으로 — 오른쪽 공간에 깊이 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_28%_42%,#1a5080_0%,#112240_42%,#0d1828_78%,#080f1a_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_22%_38%,rgba(192,192,192,0.07)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_65%,rgba(0,20,40,0.5)_0%,transparent_45%)]"
        aria-hidden
      />
      <div className="lumina-hero-grain" aria-hidden />

      {/* 12컬럼: 좌 7 / 우 5(비움) */}
      <div className="relative z-[1] mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-12 items-center gap-x-0 px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="col-span-12 flex flex-col items-start justify-center text-left lg:col-span-7">
          <motion.div
            className="w-full max-w-[52rem] text-left"
            initial={false}
          >
            <motion.p
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: easeLux }}
              className={cn(
                "mb-12 text-[9px] uppercase tracking-[0.3em] text-[#C0C0C0]/65 sm:text-[10px]",
                fontBody,
              )}
            >
              LUMINA BRANDING PLATFORM
            </motion.p>

            <motion.p
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, delay: reduceMotion ? 0 : 0.22, ease: easeLux }}
              className={cn(
                "mb-8 max-w-[36rem] text-[0.78rem] leading-[2] tracking-[0.06em] text-[#C8D0DC] sm:mb-10 sm:text-[0.82rem] sm:leading-[1.95] sm:tracking-[0.055em]",
                isKo ? fontConstitutionKo : fontConstitutionEn,
              )}
              style={{
                textShadow: "0 0 32px rgba(192,200,215,0.2), 0 0 64px rgba(200,210,225,0.08)",
              }}
            >
              {isKo ? LUMINA_CONSTITUTION_HERO_LINE_KO : LUMINA_CONSTITUTION_HERO_LINE_EN}
            </motion.p>

            <motion.h1
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.5, ease: easeLux }}
              className={cn(
                "w-full text-[1.7rem] sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.38] xl:text-5xl xl:leading-[1.36]",
                isKo
                  ? cn(
                      fontHeadlineKo,
                      "text-white tracking-widest [text-shadow:0_0_48px_rgba(255,255,255,0.06)]",
                    )
                  : cn(
                      fontHeadEn,
                      "text-lumina-silver-glow leading-[1.15] tracking-tight md:leading-[1.12]",
                    ),
              )}
            >
              {isKo ? (
                <>
                  <span
                    className={cn(
                      fontHanHero,
                      "block text-[1.55rem] leading-[1.4] tracking-[0.14em] text-[#eef3f8] sm:text-3xl sm:tracking-[0.16em] md:text-4xl lg:text-[2.5rem]",
                    )}
                    lang="zh-Hant"
                  >
                    {LUMINA_HERO_TRINITY_HAN_LINE}
                  </span>
                  <span className="mt-5 block text-[1.05rem] font-extrabold leading-[1.45] tracking-[0.04em] text-white sm:mt-6 sm:text-[1.2rem] md:text-[1.35rem] lg:text-[1.5rem] lg:leading-[1.42]">
                    {LUMINA_HERO_TRINITY_LINE2_KO}
                  </span>
                </>
              ) : (
                LUMINA_HERO_HEADLINE_EN
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: reduceMotion ? 0 : 0.32, ease: easeLux }}
              className={cn(
                "mt-10 max-w-[30rem] text-[13px] font-medium leading-[2.05] tracking-[0.035em] text-white/90 sm:mt-12 sm:text-[14px] sm:leading-[2.1] md:max-w-[32rem]",
                fontBody,
              )}
            >
              {isKo ? LUMINA_HERO_MANIFESTO_KO : LUMINA_HERO_MANIFESTO_EN}
            </motion.p>
            <motion.p
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: reduceMotion ? 0 : 0.42, ease: easeLux }}
              className={cn(
                "lumina-hero-subcopy-dawn mt-6 max-w-[26rem] text-[12px] font-medium leading-[2] tracking-[0.04em] antialiased [text-rendering:optimizeLegibility] sm:text-[13px] sm:leading-[2.05] md:max-w-[28rem]",
                fontBody,
              )}
            >
              {isKo ? LUMINA_HERO_SUB_KO : LUMINA_HERO_SUB_EN}
            </motion.p>
            <motion.p
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.5, ease: easeLux }}
              className={cn(
                "mt-5 max-w-[28rem] text-[11px] font-semibold leading-[1.9] tracking-[0.085em] text-[#d7e0ea]/90 sm:text-[12px]",
                fontBody,
              )}
            >
              {isKo
                ? "우리는 4를 먼저 나눕니다. 당신의 6을 함께 키웁니다."
                : "We share 4 first, and grow your 6 together."}
            </motion.p>

            <motion.div
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: reduceMotion ? 0 : 0.55, ease: easeLux }}
              className="mt-16 flex w-full flex-col items-start justify-start gap-6 sm:mt-20 sm:flex-row sm:items-center sm:gap-10"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={floatTransition}
              >
                <a
                  href="#persona-genesis"
                  onClick={(e) => {
                    e.preventDefault()
                    unveilMorning()
                    scrollToIdWithHeaderOffset("persona-genesis")
                    window.history.replaceState(null, "", "#persona-genesis")
                  }}
                  className={cn(
                    "group relative inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-full border border-white/[0.14] bg-transparent px-10 py-3.5 text-[12px] font-medium tracking-[0.12em] text-[#e8eef5] transition-[box-shadow,border-color,background-color] duration-500",
                    fontBody,
                    "hover:border-[#C0C0C0]/55 hover:bg-white/[0.04] hover:shadow-[0_0_28px_rgba(192,192,192,0.18),0_0_56px_rgba(192,192,192,0.06)]",
                  )}
                >
                  <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[inset_0_0_24px_rgba(192,192,192,0.08)]" />
                  {isKo ? "브랜드 진단 시작" : "Start brand diagnosis"}
                </a>
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 6.5,
                        repeat: Infinity,
                        repeatType: "reverse" as const,
                        ease: [0.42, 0, 0.58, 1] as const,
                        delay: 0.4,
                      }
                }
              >
                <a
                  href="#alchemist-engine"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToIdWithHeaderOffset("alchemist-engine")
                    window.history.replaceState(null, "", "#alchemist-engine")
                  }}
                  className={cn(
                    "group relative inline-flex min-h-[48px] items-center justify-center rounded-full border border-transparent px-2 py-3.5 text-[12px] tracking-[0.1em] text-[#C0C0C0]/65 transition-[color,box-shadow] duration-500 sm:px-4",
                    fontBody,
                    "hover:text-[#e8eef5] hover:shadow-[0_0_20px_rgba(192,192,192,0.12)]",
                  )}
                >
                  {isKo ? "Alchemist 엔진 살펴보기" : "Explore the Alchemist engine"}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* 우측 5컬럼: 콘텐츠 없음 — 여백만 */}
        <div
          className="relative col-span-12 hidden min-h-[40vh] lg:col-span-5 lg:block"
          aria-hidden
        />
      </div>

      <p
        className={cn(
          "pointer-events-none absolute bottom-8 right-10 z-[1] max-w-[min(42vw,20rem)] text-right text-[8px] leading-relaxed tracking-[0.22em] text-[#C0C0C0]/22 sm:bottom-10 sm:right-12 md:text-[9px] lg:bottom-14 lg:right-16 xl:right-24",
          fontBody,
        )}
      >
        {isKo ? "HIGH-FUNCTIONAL AMPOULE · K-BEAUTY INDIE" : "HIGH-FUNCTIONAL AMPOULE · K-BEAUTY INDIE"}
      </p>
    </section>
  )
}
