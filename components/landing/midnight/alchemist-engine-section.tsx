"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useId, useMemo, useRef, useState } from "react"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  FIVE_ESSENCE_PALETTE,
  type FiveEssenceId,
  getFiveEssenceEntry,
  NEUTRAL_ALC_VISUAL,
} from "@/lib/lumina/alchemist-five-essence-palette"
import { cn } from "@/lib/utils"
import {
  LUMINA_ESSENCE_DECLARATION_EN,
  LUMINA_ESSENCE_DECLARATION_KO,
  LUMINA_ESSENCE_EDITORIAL_COPY_EN,
  LUMINA_ESSENCE_EDITORIAL_COPY_KO,
  LUMINA_ESSENCE_MENTOR_NOTES_KO,
} from "@/lib/lumina/essence-editorial-prompt"
import {
  LUMINA_GLASS_CLARITY_TAGLINE_EN,
  LUMINA_GLASS_CLARITY_TAGLINE_KO,
} from "@/lib/lumina/glass-clarity-copy"

const fontHead = "font-['Nanum_Myeongjo',var(--font-serif),serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function AlchemistEngineSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const svgUid = useId().replace(/:/g, "")
  const [essenceId, setEssenceId] = useState<FiveEssenceId | null>(null)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [24, -24])
  const y2 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-12, 12])

  const activeEssence = useMemo(
    () => (essenceId ? getFiveEssenceEntry(essenceId) : null),
    [essenceId],
  )
  const v = activeEssence?.visual ?? NEUTRAL_ALC_VISUAL
  const midnightGlowOpacity = 0.35 * (activeEssence?.midnightGlowScale ?? 1)

  return (
    <section
      ref={ref}
      id="alchemist-engine"
      className="relative scroll-mt-28 overflow-hidden px-5 py-28 sm:px-8 md:px-10 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-[opacity,background] duration-[900ms] ease-out"
        style={{
          opacity: activeEssence ? 1 : 0,
          background: activeEssence?.ambientBackground ?? "transparent",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,43,79,0.5)_0%,transparent_65%)] blur-3xl transition-opacity duration-[900ms] ease-out"
          style={{ opacity: midnightGlowOpacity }}
        />
      </div>

      <div className="relative z-[1] mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <p
            className={cn(
              "mb-4 text-[11px] tracking-[0.28em] text-liquid-silver/70",
              fontBody,
            )}
          >
            {isKo ? "ESSENCE · ALCHEMIST" : "ESSENCE · ALCHEMIST"}
          </p>
          <h2
            className={cn(
              "text-[1.55rem] leading-snug text-white sm:text-[1.85rem]",
              fontHead,
            )}
          >
            {isKo ? (
              <>
                Alchemist 엔진 — <span className="text-gradient-liquid-silver">본질의 화보</span>
              </>
            ) : (
              <>
                Alchemist Engine — <span className="text-gradient-liquid-silver">essence editorial</span>
              </>
            )}
          </h2>
          <p
            className={cn(
              "mt-6 text-[15px] leading-[1.85] text-white/75 antialiased [text-rendering:optimizeLegibility] sm:text-[16px]",
              fontHead,
            )}
          >
            {isKo ? LUMINA_ESSENCE_DECLARATION_KO : LUMINA_ESSENCE_DECLARATION_EN}
          </p>
          <p
            className={cn(
              "mt-10 max-w-[22rem] text-[1.05rem] font-medium leading-[2] tracking-[-0.01em] text-white/90 antialiased [text-rendering:optimizeLegibility] sm:text-[1.1rem]",
              fontHead,
            )}
          >
            {isKo ? LUMINA_ESSENCE_EDITORIAL_COPY_KO : LUMINA_ESSENCE_EDITORIAL_COPY_EN}
          </p>
          <ul
            className={cn(
              "mt-10 space-y-5 border-t border-white/[0.1] pt-10 text-[13px] font-medium leading-[1.82] text-white/82 antialiased [text-rendering:optimizeLegibility] sm:space-y-6 sm:text-[14px] sm:leading-[1.85]",
              fontBody,
            )}
          >
            {isKo ? (
              <>
                <li className="max-w-prose">{LUMINA_ESSENCE_MENTOR_NOTES_KO.essentialism}</li>
                <li className="max-w-prose">{LUMINA_ESSENCE_MENTOR_NOTES_KO.density}</li>
                <li className="max-w-prose">{LUMINA_ESSENCE_MENTOR_NOTES_KO.self}</li>
              </>
            ) : (
              <>
                <li className="max-w-prose">
                  Silence of efficacy (求小): True high performance needs no long copy — dense viscosity and deep
                  penetration create a stillness that outshouts marketing noise.
                </li>
                <li className="max-w-prose">
                  Uncompromising density (求苦): An ampoule forged through thousands of failures for a 0.1% actives
                  story is condensed energy — akin to the relief after eighteen years of resolve.
                </li>
                <li className="max-w-prose">
                  Evidence of conviction (求己): When you stop chasing gaze and trends and focus only on skin as the
                  problem, the work becomes noble.
                </li>
              </>
            )}
          </ul>

          <div className="mt-12 border-t border-white/[0.08] pt-10">
            <p
              className={cn(
                "mb-4 text-[10px] font-medium tracking-[0.32em] text-liquid-silver/55",
                fontBody,
              )}
            >
              {isKo ? "THE ALCHEMIST'S PALETTE · 본연의 오색" : "THE ALCHEMIST'S PALETTE · five essences"}
            </p>
            <p className={cn("mb-5 text-[12px] leading-relaxed text-white/42", fontBody)}>
              {isKo
                ? "기능을 고르면 미드나잇 대비가 미세히 맞춰지고, 오른쪽 앰플은 그 본연색을 비춥니다."
                : "Pick a function — midnight depth shifts subtly so the ampoule’s intrinsic hue reads true."}
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={isKo ? "본연 오색 선택" : "Five essence palette"}
            >
              {FIVE_ESSENCE_PALETTE.map((e) => {
                const on = essenceId === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setEssenceId((prev) => (prev === e.id ? null : e.id))}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-left transition-[border-color,background-color,box-shadow] duration-300",
                      fontBody,
                      on
                        ? "border-liquid-silver/50 bg-white/[0.08] shadow-[0_0_20px_rgba(192,192,192,0.08)]"
                        : "border-white/[0.12] bg-white/[0.02] hover:border-liquid-silver/28",
                    )}
                  >
                    <span className="block text-[13px] font-medium tracking-wide text-white/92">
                      <span className="mr-1.5 font-['Nanum_Myeongjo','Noto_Serif_KR',serif] text-liquid-silver/90">
                        {e.hanja}
                      </span>
                      {isKo ? e.labelKo.split("·")[1]?.trim() ?? e.labelKo : e.labelEn.split("·")[0]?.trim()}
                    </span>
                  </button>
                )
              })}
            </div>
            {activeEssence ? (
              <div className="mt-6 rounded-none border border-white/[0.12] bg-black/20 px-4 py-4 backdrop-blur-sm">
                <p className={cn("text-[11px] tracking-[0.18em] text-liquid-silver/65", fontBody)}>
                  {isKo ? "원료의 기원" : "Origin"}
                </p>
                <p className={cn("mt-2 text-[13px] leading-relaxed text-white/78", fontBody)}>
                  {isKo ? activeEssence.originKo : activeEssence.originEn}
                </p>
                <p className={cn("mt-4 text-[11px] tracking-[0.18em] text-liquid-silver/65", fontBody)}>
                  {isKo ? "기능적 페르소나" : "Functional persona"}
                </p>
                <p className={cn("mt-2 text-[13px] leading-relaxed text-white/85", fontHead)}>
                  {isKo ? activeEssence.functionKo : activeEssence.functionEn}
                </p>
                <p className={cn("mt-4 border-t border-white/[0.06] pt-4 text-[12px] italic leading-relaxed text-white/55", fontHead)}>
                  “{isKo ? activeEssence.messageKo : activeEssence.messageEn}”
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-4">
          <motion.div style={{ y: y1 }} className="relative aspect-square w-full">
            <div className="absolute inset-0 rounded-none border border-white/[0.12] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(0,0,0,0.35))] shadow-none" />
            <div className="absolute inset-[12%] overflow-hidden rounded-none border border-white/[0.1] bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.14),transparent_55%),linear-gradient(180deg,rgba(0,27,58,0.92),rgba(0,0,0,0.92))]">
              <motion.div
                className="absolute inset-x-[18%] top-[12%] h-[26%] rounded-b-none bg-gradient-to-b from-white/[0.32] to-white/[0.03] blur-[0.5px]"
                style={{ y: y2 }}
              />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" aria-hidden>
                <defs>
                  <radialGradient id={`${svgUid}-ess-em`} cx="42%" cy="38%" r="58%">
                    <stop offset="0%" stopColor={v.emissive0} />
                    <stop offset="40%" stopColor={v.emissive40} />
                    <stop offset="100%" stopColor={v.emissive100} />
                  </radialGradient>
                  <linearGradient id={`${svgUid}-liq`} x1="8%" y1="12%" x2="92%" y2="92%">
                    <stop offset="0%" stopColor={v.liq0} />
                    <stop offset="32%" stopColor={v.liq32} />
                    <stop offset="58%" stopColor={v.liq58} />
                    <stop offset="100%" stopColor={v.liq100} />
                  </linearGradient>
                  <linearGradient id={`${svgUid}-glass`} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(185,200,218,0.35)" />
                    <stop offset="48%" stopColor="rgba(255,255,255,0.55)" />
                    <stop offset="100%" stopColor="rgba(192,198,210,0.25)" />
                  </linearGradient>
                  <filter id={`${svgUid}-bloom`} x="-35%" y="-35%" width="170%" height="170%">
                    <feGaussianBlur stdDeviation="5" result="bl" />
                    <feMerge>
                      <feMergeNode in="bl" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id={`${svgUid}-sharp`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.65" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M120 260 Q200 320 280 260 L260 140 Q200 100 140 140 Z"
                  fill={`url(#${svgUid}-ess-em)`}
                  opacity={0.72}
                  filter={`url(#${svgUid}-bloom)`}
                />
                <path
                  d="M120 260 Q200 320 280 260 L260 140 Q200 100 140 140 Z"
                  fill={`url(#${svgUid}-liq)`}
                  opacity={0.94}
                  filter={`url(#${svgUid}-sharp)`}
                />
                <path
                  d="M120 260 Q200 320 280 260 L260 140 Q200 100 140 140 Z"
                  fill="none"
                  stroke={`url(#${svgUid}-glass)`}
                  strokeWidth={1.15}
                  opacity={0.88}
                />
                <ellipse cx="200" cy="248" rx="72" ry="14" fill="rgba(255,252,248,0.1)" />
                <path
                  d="M168 118 L232 118 L228 132 L172 132 Z"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(220,232,245,0.42)"
                  strokeWidth={0.6}
                  opacity={0.92}
                />
                <path
                  d="M195 100 L205 100 L203 118 L197 118 Z"
                  fill="rgba(236,244,255,0.55)"
                />
                {[...Array(48)].map((_, i) => {
                  const a = (i * 137.5 * Math.PI) / 180
                  const r = 28 + (i % 7) * 8
                  const cx = 200 + Math.cos(a) * r * 0.35
                  const cy = 195 + Math.sin(a) * r * 0.5
                  const op = 0.12 + (i % 5) * 0.055
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={0.55 + (i % 3) * 0.32}
                      fill={i % 4 === 0 ? v.particleWarm : v.particleCool}
                      opacity={op}
                    />
                  )
                })}
              </svg>
              <div
                className="absolute bottom-[18%] left-1/2 h-28 w-[50%] -translate-x-1/2 rounded-full blur-lg transition-[background] duration-[900ms] ease-out"
                style={{ background: v.bottomGlow }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-none ring-1 ring-white/[0.05]" />
          </motion.div>
          <p
            className={cn(
              "mt-6 text-center text-[12px] font-medium tracking-[0.18em] text-liquid-silver/78 antialiased [text-rendering:optimizeLegibility] sm:text-[13px] sm:tracking-[0.2em]",
              fontBody,
            )}
          >
            {isKo
              ? "ABSOLUTE SILENCE · VAJRA REFRACTION · 한 방울 직전"
              : "ABSOLUTE SILENCE · VAJRA REFRACTION · instant before the drop"}
          </p>
          <p
            className={cn(
              "mt-2.5 text-center text-[11px] font-medium tracking-[0.16em] text-amber-100/62 antialiased [text-rendering:optimizeLegibility] sm:text-xs sm:tracking-[0.18em]",
              fontBody,
            )}
          >
            {isKo ? LUMINA_GLASS_CLARITY_TAGLINE_KO : LUMINA_GLASS_CLARITY_TAGLINE_EN}
          </p>
        </div>

        <div
          className="relative hidden min-h-[280px] flex-col justify-center rounded-none border border-white/[0.18] bg-[linear-gradient(270deg,rgba(0,27,58,0.28)_0%,transparent_85%)] px-6 py-12 lg:col-span-4 lg:flex"
          aria-hidden
        >
          <p
            className={cn(
              "text-[11px] font-semibold tracking-[0.28em] text-white/58 antialiased [text-rendering:optimizeLegibility] sm:text-xs sm:tracking-[0.32em]",
              fontBody,
            )}
          >
            {isKo ? "비움의 철학" : "PHILOSOPHY OF EMPTINESS"}
          </p>
          <p
            className={cn(
              "mt-5 max-w-[16rem] text-[13px] font-medium leading-relaxed text-white/72 antialiased [text-rendering:optimizeLegibility] sm:max-w-[18rem] sm:text-[14px] sm:leading-[1.65]",
              fontBody,
            )}
          >
            {isKo
              ? "오른쪽은 의도적으로 비웁니다. 생성 엔진의 첫 프레임도 동일한 여백을 남깁니다."
              : "The right stays open by design — the first generated frame leaves the same void."}
          </p>
        </div>
      </div>
    </section>
  )
}
