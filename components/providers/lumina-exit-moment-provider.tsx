"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import {
  LUMINA_EXIT_MOMENT_DISMISS_EN,
  LUMINA_EXIT_MOMENT_DISMISS_KO,
  LUMINA_EXIT_MOMENT_WORD_EN,
  LUMINA_EXIT_MOMENT_WORD_KO,
} from "@/lib/lumina/law-of-essential-beauty-copy"

const SESSION_KEY = "lumina.exitMoment.v1"
const SCENE_PREF_KEY = "lumina.exitMoment.scene"

type LuminaExitMomentContextValue = {
  /** 수동으로 퇴장 연출 트리거 (접근성·QA) */
  triggerExitMoment: () => void
}

type ExitScene = "sakura" | "snow" | "rain"
type ExitParticle = {
  left: number
  delay: number
  duration: number
  size: number
  drift: number
}

function isExitScene(value: string | null): value is ExitScene {
  return value === "sakura" || value === "snow" || value === "rain"
}

function resolveExitSceneByTime(): ExitScene {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 17) return "sakura"
  if (hour >= 17 && hour < 21) return "rain"
  return "snow"
}

const LuminaExitMomentContext = createContext<LuminaExitMomentContextValue | null>(null)

export function useLuminaExitMoment(): LuminaExitMomentContextValue {
  const ctx = useContext(LuminaExitMomentContext)
  if (!ctx) return { triggerExitMoment: () => {} }
  return ctx
}

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function LuminaExitMomentProvider({ children }: { children: ReactNode }) {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scene, setScene] = useState<ExitScene>("sakura")
  const [particles, setParticles] = useState<ExitParticle[]>([])

  const makeParticles = useCallback((count: number, nextScene: ExitScene): ExitParticle[] => {
    return Array.from({ length: count }, (_, i) => {
      const jitter = Math.random()
      const baseDuration = nextScene === "rain" ? 1.05 : nextScene === "snow" ? 5.8 : 4.8
      return {
        left: (i + 0.5) * (100 / count) + (jitter - 0.5) * 4.4,
        delay: Math.random() * 2.2,
        duration: baseDuration + Math.random() * (nextScene === "rain" ? 1 : 2.6),
        size: nextScene === "rain" ? 7 + Math.random() * 6 : 10 + Math.random() * 12,
        drift: (Math.random() - 0.5) * (nextScene === "rain" ? 14 : 42),
      }
    })
  }, [])

  const openWithScene = useCallback(() => {
    let nextScene: ExitScene = resolveExitSceneByTime()
    try {
      const preferred = localStorage.getItem(SCENE_PREF_KEY)
      if (isExitScene(preferred)) nextScene = preferred
    } catch {
      /* private mode */
    }
    setScene(nextScene)
    setParticles(makeParticles(nextScene === "rain" ? 26 : 18, nextScene))
    setOpen(true)
  }, [makeParticles])

  const triggerExitMoment = useCallback(() => {
    if (reduceMotion) return
    openWithScene()
  }, [openWithScene, reduceMotion])

  const value = useMemo(() => ({ triggerExitMoment }), [triggerExitMoment])

  useEffect(() => {
    if (reduceMotion) return

    const maybeOpen = () => {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "1") return
      } catch {
        /* private mode */
      }
      openWithScene()
      try {
        sessionStorage.setItem(SESSION_KEY, "1")
      } catch {
        /* */
      }
    }

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 6) return
      maybeOpen()
    }

    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => document.documentElement.removeEventListener("mouseleave", onLeave)
  }, [openWithScene, reduceMotion])

  useEffect(() => {
    if (!open || reduceMotion) return
    const t = window.setTimeout(() => setOpen(false), 4200)
    return () => window.clearTimeout(t)
  }, [open, reduceMotion])

  return (
    <LuminaExitMomentContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && !reduceMotion ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={isKo ? "안도의 순간" : "Moment of relief"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeLux }}
            className="fixed inset-0 z-[240] flex flex-col items-center justify-center bg-[#000814]/82 px-6 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <div className="lumina-exit-ripple pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden />
            <motion.div
              className="relative z-[1] flex flex-col items-center text-center"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.45, ease: easeLux }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                className="text-[2.75rem] leading-none sm:text-[3.25rem]"
                aria-hidden
                initial={{ y: -28, rotate: -8, opacity: 0 }}
                animate={{
                  y: [0, 12, 28],
                  rotate: [0, 6, 14],
                  opacity: [0, 1, 0.85],
                }}
                transition={{ duration: 2.8, ease: easeLux }}
              >
                {scene === "rain" ? "🌧️" : scene === "snow" ? "❄️" : "🌸"}
              </motion.span>
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                {particles.map((p, idx) => (
                  <span
                    key={`${scene}-${idx}`}
                    className={cn(
                      "lumina-exit-particle",
                      scene === "rain"
                        ? "lumina-exit-particle-rain"
                        : scene === "snow"
                          ? "lumina-exit-particle-snow"
                          : "lumina-exit-particle-sakura",
                    )}
                    style={
                      {
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        width: `${p.size}px`,
                        height: scene === "rain" ? `${Math.max(16, p.size * 2.6)}px` : `${p.size}px`,
                        "--lumina-exit-drift": `${p.drift}px`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
              <motion.p
                className={cn(
                  "mt-6 text-[clamp(1.5rem,5vw,2.15rem)] font-medium tracking-[0.14em] text-[#f4f0f3]",
                  fontSerif,
                )}
                style={{
                  textShadow:
                    "0 0 40px rgba(248,210,220,0.45), 0 0 88px rgba(200,220,245,0.18)",
                }}
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: [0, 0.15, 0.85, 0.35, 0], filter: "blur(0px)" }}
                transition={{ duration: 3.2, times: [0, 0.15, 0.45, 0.72, 1], ease: easeLux }}
              >
                {isKo ? LUMINA_EXIT_MOMENT_WORD_KO : LUMINA_EXIT_MOMENT_WORD_EN}
              </motion.p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  "mt-10 text-[12px] tracking-[0.14em] text-white/55 underline-offset-4 hover:text-white/85",
                  fontBody,
                )}
              >
                {isKo ? LUMINA_EXIT_MOMENT_DISMISS_KO : LUMINA_EXIT_MOMENT_DISMISS_EN}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LuminaExitMomentContext.Provider>
  )
}
