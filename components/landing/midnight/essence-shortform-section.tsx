"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { useConvictionAtmosphere } from "@/components/providers/conviction-atmosphere-provider"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { scrollToIdWithHeaderOffset } from "@/lib/landing/scroll-with-header-offset"
import { ESSENCE_SHORTFORM } from "@/lib/lumina/essence-shortform-copy"
import { cn } from "@/lib/utils"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type ShortformPhase = "chaos" | "void" | "beam" | "kyusho" | "wisdom" | "outro"

const PHASE_ORDER: ShortformPhase[] = [
  "chaos",
  "void",
  "beam",
  "kyusho",
  "wisdom",
  "outro",
]

const PHASE_MS: Record<ShortformPhase, number> = {
  chaos: 3000,
  void: 3000,
  beam: 4000,
  kyusho: 5000,
  wisdom: 5000,
  outro: 5000,
}

const LOOP_GAP_MS = 1200

function ChaosLayer({ caption }: { caption: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0218]">
      <div
        className="animate-shortform-chaos-glitch absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(125deg, #1a0030 0%, #2d0a4a 25%, #0f1a3a 50%, #3a0a2a 75%, #1a0a30 100%)",
        }}
      />
      <div className="absolute inset-0 animate-[cosmetic-scan-lines_2.2s_linear_infinite] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_4px)] opacity-45 motion-reduce:animate-none" />
      <div className="absolute inset-0 flex items-end justify-center gap-1 pb-[18%] opacity-85">
        {[0.35, 0.55, 0.4, 0.72, 0.45].map((h, i) => (
          <div
            key={i}
            className="w-[6%] max-w-[2.25rem] animate-shortform-neon-flicker rounded-t-sm border border-fuchsia-400/55 bg-gradient-to-t from-cyan-500/35 to-pink-500/45 shadow-[0_0_18px_rgba(255,0,200,0.3)]"
            style={{
              height: `${h * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute left-[8%] top-[12%] h-[22%] w-[28%] rounded border border-emerald-400/35 bg-emerald-500/10 shadow-[0_0_26px_rgba(0,255,200,0.18)]" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] h-[8%] w-[38%] -skew-x-6 rounded-sm bg-gradient-to-r from-yellow-400/45 via-red-500/35 to-transparent" />
      <p
        className={cn(
          "absolute bottom-[10%] left-0 right-0 px-6 text-center text-[11px] font-medium tracking-[0.28em] text-white/78 sm:text-[12px]",
          fontBody,
        )}
      >
        {caption}
      </p>
    </div>
  )
}

export function EssenceShortformSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const copy = isKo ? ESSENCE_SHORTFORM.ko : ESSENCE_SHORTFORM.en
  const reduceMotion = useReducedMotion()
  const { unveilMorning } = useConvictionAtmosphere()
  const [phase, setPhase] = useState<ShortformPhase>(
    reduceMotion ? "outro" : "chaos",
  )
  const stepRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setPhase("outro")
      return
    }
    const advance = () => {
      const i = stepRef.current % PHASE_ORDER.length
      const p = PHASE_ORDER[i]!
      setPhase(p)
      const wait = PHASE_MS[p] + (p === "outro" ? LOOP_GAP_MS : 0)
      stepRef.current = i + 1
      timerRef.current = setTimeout(advance, wait)
    }
    stepRef.current = 0
    advance()
    return () => clearTimer()
  }, [reduceMotion, clearTimer])

  const goPersona = useCallback(() => {
    unveilMorning()
    window.requestAnimationFrame(() => {
      scrollToIdWithHeaderOffset("persona-genesis")
      window.history.replaceState(null, "", "#persona-genesis")
    })
  }, [unveilMorning])

  const showMidnight = phase !== "chaos"
  const showSilverBeam =
    phase === "beam" ||
    phase === "kyusho" ||
    phase === "wisdom" ||
    reduceMotion

  return (
    <section
      id="essence-shortform"
      className="relative scroll-mt-28 px-5 py-24 sm:px-8 md:px-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute left-0 top-1/4 h-px w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <div className="max-w-2xl text-left lg:max-w-xl">
          <p
            className={cn(
              "mb-5 text-[10px] tracking-[0.38em] text-liquid-silver/55",
              fontBody,
            )}
          >
            {copy.sectionEyebrow}
          </p>
          <h2
            className={cn(
              "text-[1.65rem] font-medium leading-snug tracking-[0.08em] text-white sm:text-[1.95rem]",
              fontSerif,
            )}
          >
            {copy.sectionTitle}
          </h2>
          <p
            className={cn(
              "mt-6 text-[14px] leading-[2.1] tracking-[0.12em] text-white/48 sm:text-[15px]",
              fontBody,
            )}
          >
            {copy.sectionLead}
          </p>
        </div>

        <button
          type="button"
          onClick={goPersona}
          aria-label={copy.a11yPlay}
          className="group relative mt-14 w-full max-w-4xl cursor-pointer overflow-hidden rounded-none border border-white/[0.12] bg-black text-left shadow-none outline-none transition-[border-color] duration-500 focus-visible:border-liquid-silver/40 focus-visible:ring-2 focus-visible:ring-liquid-silver/25"
        >
          <div className="relative aspect-video w-full">
            <AnimatePresence mode="sync">
              {phase === "chaos" && !reduceMotion ? (
                <motion.div
                  key="chaos"
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.06 }}
                >
                  <ChaosLayer caption={copy.chaosSub} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {showMidnight || reduceMotion ? (
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,#112240_0%,#0d1828_55%,#080f1a_100%)]"
                  aria-hidden
                />

                {phase === "void" && !reduceMotion ? (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ backgroundColor: "#000000" }}
                    animate={{
                      backgroundColor: ["#080f1a", "#080f1a", "#112240"],
                    }}
                    transition={{
                      duration: 3,
                      times: [0, 0.22, 1],
                      ease: easeLux,
                    }}
                  />
                ) : null}

                {showSilverBeam ? (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[55%] origin-top bg-gradient-to-b from-white/[0.22] via-white/[0.07] to-transparent"
                    initial={
                      reduceMotion
                        ? { scaleY: 1, opacity: 0.5 }
                        : { scaleY: 0, opacity: 0 }
                    }
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{
                      duration: reduceMotion ? 0.01 : 1.15,
                      ease: easeLux,
                      delay: phase === "beam" && !reduceMotion ? 0.12 : 0,
                    }}
                  />
                ) : null}

                {(phase === "beam" ||
                  phase === "kyusho" ||
                  phase === "wisdom") &&
                !reduceMotion ? (
                  <motion.div
                    className="pointer-events-none absolute left-1/2 w-[9%] min-w-[1.65rem] max-w-[2.75rem] -translate-x-1/2 rounded-full border border-white/28 bg-gradient-to-b from-white/38 via-white/14 to-white/[0.07] shadow-[0_0_28px_rgba(220,235,255,0.38)]"
                    style={{ height: "min(16%, 5.5rem)" }}
                    initial={{ top: "9%", opacity: 0.92 }}
                    animate={{
                      top: phase === "beam" ? ["9%", "48%"] : "48%",
                      opacity: phase === "wisdom" ? 0.32 : 0.92,
                    }}
                    transition={{
                      top: {
                        duration: phase === "beam" ? 2.35 : 0.2,
                        delay: phase === "beam" ? 0.42 : 0,
                        ease: easeLux,
                      },
                      opacity: { duration: 0.45 },
                    }}
                  />
                ) : null}

                {phase === "kyusho" && !reduceMotion ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] overflow-hidden">
                    {[0, 1, 2].map((ring) => (
                      <motion.div
                        key={`${phase}-r${ring}`}
                        className="absolute bottom-[14%] left-1/2 aspect-square w-[min(34vw,11rem)] -translate-x-1/2 rounded-full border border-white/[0.14]"
                        initial={{ scale: 0.25, opacity: 0.5 }}
                        animate={{ scale: 2.4 + ring * 0.45, opacity: 0 }}
                        transition={{
                          duration: 2.6 + ring * 0.35,
                          delay: ring * 0.18,
                          ease: easeLux,
                        }}
                      />
                    ))}
                  </div>
                ) : null}

                {phase === "beam" && !reduceMotion ? (
                  <p
                    className={cn(
                      "pointer-events-none absolute bottom-[13%] left-0 right-0 px-8 text-center text-[clamp(0.85rem,2.4vw,1.05rem)] font-medium leading-[2.1] tracking-[0.14em] text-white/[0.9]",
                      fontSerif,
                    )}
                  >
                    {copy.beamSub}
                  </p>
                ) : null}

                {phase === "kyusho" && !reduceMotion ? (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-[9%] flex flex-col items-center gap-6 px-6"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.35, ease: easeLux }}
                  >
                    <p
                      className={cn(
                        "text-center text-[11px] tracking-[0.42em] text-liquid-silver/72",
                        fontSerif,
                      )}
                    >
                      {copy.kyushoTag}
                    </p>
                    <p
                      className={cn(
                        "max-w-[22rem] text-center text-[clamp(0.95rem,2.8vw,1.12rem)] font-medium leading-[2.15] tracking-[0.12em] text-[#f2f6fa]",
                        fontSerif,
                      )}
                      style={{
                        textShadow:
                          "0 0 40px rgba(220,232,245,0.22), 0 2px 18px rgba(0,0,0,0.45)",
                      }}
                    >
                      {copy.kyushoMain}
                    </p>
                  </motion.div>
                ) : null}

                {phase === "wisdom" && !reduceMotion ? (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-[11%] flex flex-col items-center gap-8 px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.85, ease: easeLux }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.04] to-white/[0.1]"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0.06 }}
                      transition={{ duration: 2.6, ease: easeLux }}
                    />
                    <p
                      className={cn(
                        "relative z-[1] max-w-[24rem] text-center text-[clamp(0.92rem,2.5vw,1.06rem)] leading-[2.15] tracking-[0.11em] text-white/88",
                        fontSerif,
                      )}
                    >
                      {copy.wisdomA}
                    </p>
                    <p
                      className={cn(
                        "relative z-[1] max-w-[26rem] text-center text-[clamp(0.88rem,2.2vw,1rem)] leading-[2.05] tracking-[0.1em] text-liquid-silver/72",
                        fontSerif,
                      )}
                    >
                      {copy.wisdomB}
                    </p>
                  </motion.div>
                ) : null}

                {(phase === "outro" || reduceMotion) && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-7 px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/[0.08] text-sm font-semibold tracking-tight text-white shadow-[0_0_26px_rgba(200,215,235,0.22)]">
                        L
                      </span>
                      <span
                        className={cn(
                          "text-[13px] tracking-[0.42em] text-white/88",
                          fontSerif,
                        )}
                      >
                        LUMINA
                      </span>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border border-white/20 bg-white/[0.06] px-6 py-2.5 text-[11px] font-medium tracking-[0.28em] text-[#e8eef5] motion-safe:animate-shortform-silver-cta",
                        fontBody,
                      )}
                    >
                      {copy.ctaPill}
                    </span>
                    <p
                      className={cn(
                        "max-w-md text-center text-[clamp(0.82rem,2vw,0.98rem)] leading-[2.2] tracking-[0.14em] text-white/52",
                        fontSerif,
                      )}
                    >
                      {copy.ctaLine}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "flex items-center justify-between gap-4 border-t border-white/[0.06] bg-black/45 px-4 py-3 sm:px-5",
              fontBody,
            )}
          >
            <span className="min-w-0 flex-1 text-[11px] tracking-[0.2em] text-white/38">
              {copy.sectionHint}
            </span>
            <span className="shrink-0 text-[10px] tracking-[0.22em] text-liquid-silver/45 transition-colors group-hover:text-liquid-silver/78">
              →
            </span>
          </div>
        </button>
      </div>
    </section>
  )
}
