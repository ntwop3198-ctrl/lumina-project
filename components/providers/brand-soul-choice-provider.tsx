"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import { LuminaReturnPathRitual } from "@/components/landing/midnight/lumina-return-path-ritual"
import {
  LUMINA_BRAND_SOUL_STORAGE_KEY,
  LUMINA_SOUL_GATE_CONVENTIONAL_DESC_EN,
  LUMINA_SOUL_GATE_CONVENTIONAL_DESC_KO,
  LUMINA_SOUL_GATE_CONVENTIONAL_MESSAGE_EN,
  LUMINA_SOUL_GATE_CONVENTIONAL_MESSAGE_KO,
  LUMINA_SOUL_GATE_CONVENTIONAL_TITLE_EN,
  LUMINA_SOUL_GATE_CONVENTIONAL_TITLE_KO,
  LUMINA_SOUL_GATE_HEADLINE_EN,
  LUMINA_SOUL_GATE_HEADLINE_KO,
  LUMINA_SOUL_GATE_NATURAL_DESC_EN,
  LUMINA_SOUL_GATE_NATURAL_DESC_KO,
  LUMINA_SOUL_GATE_NATURAL_MESSAGE_EN,
  LUMINA_SOUL_GATE_NATURAL_MESSAGE_KO,
  LUMINA_SOUL_GATE_NATURAL_TITLE_EN,
  LUMINA_SOUL_GATE_NATURAL_TITLE_KO,
  LUMINA_SOUL_GATE_SUB_EN,
  LUMINA_SOUL_GATE_SUB_KO,
  LUMINA_SOUL_RETURN_PATH_TITLE_EN,
  LUMINA_SOUL_RETURN_PATH_TITLE_KO,
  parseBrandSoulPath,
  type BrandSoulPathId,
} from "@/lib/lumina/choice-of-soul"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type BrandSoulContextValue = {
  path: BrandSoulPathId | null
  setPath: (p: BrandSoulPathId) => void
  clearPathForGate: () => void
  /** 효율 → 본질: 암전·벚꽃 햇살 리추얼 후 natural 전환 */
  beginReturnRitual: () => void
  isNatural: boolean
  isConventional: boolean
}

const BrandSoulContext = createContext<BrandSoulContextValue | null>(null)

export function useBrandSoulChoice(): BrandSoulContextValue {
  const ctx = useContext(BrandSoulContext)
  if (!ctx) {
    return {
      path: null,
      setPath: () => {},
      clearPathForGate: () => {},
      beginReturnRitual: () => {},
      isNatural: false,
      isConventional: false,
    }
  }
  return ctx
}

function readStoredPath(): BrandSoulPathId | null {
  if (typeof window === "undefined") return null
  try {
    return parseBrandSoulPath(sessionStorage.getItem(LUMINA_BRAND_SOUL_STORAGE_KEY))
  } catch {
    return null
  }
}

export function BrandSoulChoiceProvider({ children }: { children: ReactNode }) {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const [path, setPathState] = useState<BrandSoulPathId | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [returnRitualActive, setReturnRitualActive] = useState(false)

  useEffect(() => {
    setPathState(readStoredPath())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (path) {
      document.documentElement.setAttribute("data-lumina-soul-path", path)
    } else {
      document.documentElement.removeAttribute("data-lumina-soul-path")
    }
    return () => document.documentElement.removeAttribute("data-lumina-soul-path")
  }, [path, hydrated])

  const setPath = useCallback((p: BrandSoulPathId) => {
    setPathState(p)
    try {
      sessionStorage.setItem(LUMINA_BRAND_SOUL_STORAGE_KEY, p)
    } catch {
      /* */
    }
  }, [])

  const clearPathForGate = useCallback(() => {
    setPathState(null)
    try {
      sessionStorage.removeItem(LUMINA_BRAND_SOUL_STORAGE_KEY)
    } catch {
      /* */
    }
  }, [])

  const beginReturnRitual = useCallback(() => {
    if (path !== "conventional") return
    setReturnRitualActive(true)
  }, [path])

  const completeReturnRitual = useCallback(() => {
    setReturnRitualActive(false)
    setPath("natural")
  }, [setPath])

  const value = useMemo(
    () => ({
      path,
      setPath,
      clearPathForGate,
      beginReturnRitual,
      isNatural: path === "natural",
      isConventional: path === "conventional",
    }),
    [path, setPath, clearPathForGate, beginReturnRitual],
  )

  const showGate = hydrated && path === null

  return (
    <BrandSoulContext.Provider value={value}>
      {children}
      <LuminaReturnPathRitual active={returnRitualActive} onComplete={completeReturnRitual} />
      <AnimatePresence>
        {showGate ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lumina-soul-gate-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeLux }}
            className="fixed inset-0 z-[280] flex items-center justify-center bg-[#02040a]/88 px-4 py-10 backdrop-blur-md"
          >
            <motion.div
              initial={reduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeLux }}
              className="relative w-full max-w-[42rem] rounded-2xl border border-white/[0.12] bg-[#050a14]/95 p-6 shadow-[0_32px_100px_rgba(0,0,0,0.55)] sm:p-8"
            >
              <p
                id="lumina-soul-gate-title"
                className={cn(
                  "text-center text-[10px] uppercase tracking-[0.32em] text-[#C0C0C0]/55",
                  fontBody,
                )}
              >
                LUMINA · {isKo ? LUMINA_SOUL_GATE_HEADLINE_KO : LUMINA_SOUL_GATE_HEADLINE_EN}
              </p>
              <p
                className={cn(
                  "mx-auto mt-4 max-w-xl text-center text-[13px] leading-relaxed text-white/58 sm:text-[14px]",
                  fontBody,
                )}
              >
                {isKo ? LUMINA_SOUL_GATE_SUB_KO : LUMINA_SOUL_GATE_SUB_EN}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
                <button
                  type="button"
                  onClick={() => setPath("natural")}
                  className={cn(
                    "group rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.07] to-transparent px-4 py-5 text-left transition-[border-color,box-shadow] duration-300 sm:px-5 sm:py-6",
                    "hover:border-[#f5c4d4]/45 hover:shadow-[0_0_36px_rgba(245,196,212,0.12)]",
                    fontBody,
                  )}
                >
                  <p className={cn("text-[11px] tracking-[0.18em] text-[#e8c4d0]", fontSerif)}>
                    {isKo ? LUMINA_SOUL_GATE_NATURAL_TITLE_KO : LUMINA_SOUL_GATE_NATURAL_TITLE_EN}
                  </p>
                  <p className="mt-3 text-[12px] leading-[1.75] text-white/62 sm:text-[13px]">
                    {isKo ? LUMINA_SOUL_GATE_NATURAL_DESC_KO : LUMINA_SOUL_GATE_NATURAL_DESC_EN}
                  </p>
                  <p className={cn("mt-4 text-[11.5px] leading-snug text-white/78 sm:text-[12px]", fontSerif)}>
                    {isKo ? LUMINA_SOUL_GATE_NATURAL_MESSAGE_KO : LUMINA_SOUL_GATE_NATURAL_MESSAGE_EN}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPath("conventional")}
                  className={cn(
                    "group rounded-xl border border-[#a855f7]/35 bg-gradient-to-b from-[#1a0a24]/90 to-[#050810] px-4 py-5 text-left transition-[border-color,box-shadow] duration-300 sm:px-5 sm:py-6",
                    "hover:border-[#e879f9]/55 hover:shadow-[0_0_40px_rgba(168,85,247,0.22)]",
                    fontBody,
                  )}
                >
                  <p className="text-[11px] tracking-[0.2em] text-[#e9d5ff]">
                    {isKo ? LUMINA_SOUL_GATE_CONVENTIONAL_TITLE_KO : LUMINA_SOUL_GATE_CONVENTIONAL_TITLE_EN}
                  </p>
                  <p className="mt-3 text-[12px] leading-[1.75] text-white/58 sm:text-[13px]">
                    {isKo ? LUMINA_SOUL_GATE_CONVENTIONAL_DESC_KO : LUMINA_SOUL_GATE_CONVENTIONAL_DESC_EN}
                  </p>
                  <p className={cn("mt-4 text-[11.5px] leading-snug text-[#f0abfc]/90 sm:text-[12px]", fontSerif)}>
                    {isKo ? LUMINA_SOUL_GATE_CONVENTIONAL_MESSAGE_KO : LUMINA_SOUL_GATE_CONVENTIONAL_MESSAGE_EN}
                  </p>
                </button>
              </div>

              <p className={cn("mt-8 text-center text-[10px] leading-relaxed text-white/38", fontBody)}>
                {isKo
                  ? "기본 추천은 본질의 길입니다. 설정은 언제든 헤더에서 바꿀 수 있습니다."
                  : "We recommend Natural first. Switch anytime from the header."}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </BrandSoulContext.Provider>
  )
}

/** 헤더 — 경로 토글 (미드나잇 랜딩) */
export function SoulPathHeaderSwitcher({ className }: { className?: string }) {
  const { lang } = useLuminaLanguage()
  const { path, setPath, beginReturnRitual } = useBrandSoulChoice()
  const isKo = lang === "ko"
  if (!path) return null
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.18] bg-black/40 p-1 antialiased [text-rendering:optimizeLegibility]",
        className,
      )}
      role="group"
      aria-label={isKo ? "브랜딩 경로" : "Branding path"}
    >
      <button
        type="button"
        onClick={() => (path === "conventional" ? beginReturnRitual() : setPath("natural"))}
        className={cn(
          "rounded-full px-3 py-1.5 text-[12px] font-bold leading-none tracking-[0.04em] transition-colors sm:px-3.5 sm:py-2 sm:text-[13px] md:text-sm",
          fontBody,
          path === "natural"
            ? "bg-white/[0.16] text-[#fff0f4] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "text-white/72 hover:text-white/92",
        )}
      >
        {isKo ? "본질" : "Natural"}
      </button>
      <button
        type="button"
        onClick={() => setPath("conventional")}
        className={cn(
          "rounded-full px-3 py-1.5 text-[12px] font-bold leading-none tracking-[0.04em] transition-colors sm:px-3.5 sm:py-2 sm:text-[13px] md:text-sm",
          fontBody,
          path === "conventional"
            ? "bg-[#a855f7]/35 text-[#faf0ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "text-white/72 hover:text-white/92",
        )}
      >
        {isKo ? "효율" : "Fast"}
      </button>
    </div>
  )
}

/** 헤더 등 — 본질 길로 전환 (회귀의 통로) */
export function BrandSoulReturnLink({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const { lang } = useLuminaLanguage()
  const { path, beginReturnRitual } = useBrandSoulChoice()
  const isKo = lang === "ko"
  if (path !== "conventional") return null
  return (
    <button
      type="button"
      className={cn(
        "text-[11px] tracking-[0.12em] text-[#f5c4d4]/80 underline-offset-4 transition-colors hover:text-[#fce7f3]",
        className,
      )}
      onClick={() => {
        beginReturnRitual()
        onNavigate?.()
      }}
    >
      {isKo ? LUMINA_SOUL_RETURN_PATH_TITLE_KO : LUMINA_SOUL_RETURN_PATH_TITLE_EN}
    </button>
  )
}
