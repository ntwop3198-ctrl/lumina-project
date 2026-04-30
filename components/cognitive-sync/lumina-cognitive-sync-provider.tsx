"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import {
  type LuminaCognitiveMetrics,
  type LuminaCognitiveZone,
  DEFAULT_COGNITIVE_METRICS,
  buildMetrics,
  pickSyncLine,
  velocityNormToAdjective,
} from "@/lib/lumina/cognitive-sync-engine"
import { useLuminaLanguage } from "@/components/providers/language-provider"

type CognitiveSyncContextValue = {
  metricsRef: RefObject<LuminaCognitiveMetrics>
  /** Live line for UI (throttled ~100ms) */
  syncLine: string
  textureAdjective: string
}

const CognitiveSyncContext = createContext<CognitiveSyncContextValue | null>(null)

function readZoneFromElement(el: Element | null): LuminaCognitiveZone {
  if (!el) return "idle"
  const z = el.getAttribute("data-lumina-cognitive-zone")
  if (z === "narrative" || z === "price" || z === "clinical") return z
  return "idle"
}

export function LuminaCognitiveSyncProvider({ children }: { children: ReactNode }) {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const metricsRef = useRef<LuminaCognitiveMetrics>({ ...DEFAULT_COGNITIVE_METRICS })
  const [syncLine, setSyncLine] = useState(() =>
    pickSyncLine("idle", isKo ? "ko" : "en", false, false),
  )
  const [textureAdjective, setTextureAdjective] = useState(() =>
    velocityNormToAdjective(0, isKo ? "ko" : "en"),
  )

  const zoneScoresRef = useRef<Record<LuminaCognitiveZone, number>>({
    idle: 0,
    narrative: 0,
    price: 0,
    clinical: 0,
  })
  const priceEnteredAtRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const lastScrollTRef = useRef(0)
  const smoothedVelocityRef = useRef(0)

  const value = useMemo(
    () => ({
      metricsRef,
      syncLine,
      textureAdjective,
    }),
    [syncLine, textureAdjective],
  )

  useEffect(() => {
    const zones = new Map<Element, LuminaCognitiveZone>()
    let raf = 0
    let lastUi = 0

    const refreshTargets = () => {
      zones.clear()
      document.querySelectorAll("[data-lumina-cognitive-zone]").forEach((node) => {
        const z = readZoneFromElement(node)
        if (z !== "idle") zones.set(node, z)
      })
    }

    refreshTargets()
    const mo = new MutationObserver(() => refreshTargets())
    mo.observe(document.body, { childList: true, subtree: true })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target
          const z = zones.get(el) ?? readZoneFromElement(el)
          if (z === "idle") continue
          zoneScoresRef.current[z] = e.intersectionRatio
        }
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
    )

    const observeAll = () => {
      zones.forEach((_, el) => io.observe(el))
    }
    observeAll()

    const rebindObserver = () => {
      io.disconnect()
      refreshTargets()
      zones.forEach((_, el) => io.observe(el))
    }
    const mo2 = new MutationObserver(() => rebindObserver())
    mo2.observe(document.body, { childList: true, subtree: true })

    const onScroll = () => {
      const y = window.scrollY
      const now = performance.now()
      const dt = Math.max(1, now - lastScrollTRef.current) / 1000
      const dy = y - lastScrollYRef.current
      const v = Math.abs(dy) / dt
      smoothedVelocityRef.current = smoothedVelocityRef.current * 0.82 + v * 0.18
      lastScrollYRef.current = y
      lastScrollTRef.current = now
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    const tick = () => {
      const scores = zoneScoresRef.current
      let winner: "narrative" | "price" | "clinical" = "narrative"
      let winnerR = -1
      for (const z of ["narrative", "price", "clinical"] as const) {
        const r = scores[z]
        if (r > winnerR) {
          winnerR = r
          winner = z
        }
      }
      const activeZone: LuminaCognitiveZone = winnerR < 0.12 ? "idle" : winner
      const bestR = Math.max(0, winnerR)

      const vNorm = Math.min(1, smoothedVelocityRef.current / 2200)
      const now = performance.now()

      if (activeZone === "price" && bestR > 0.35) {
        if (priceEnteredAtRef.current === null) priceEnteredAtRef.current = now
      } else {
        priceEnteredAtRef.current = null
      }

      const pricePreemption =
        activeZone === "price" &&
        bestR > 0.35 &&
        priceEnteredAtRef.current !== null &&
        now - priceEnteredAtRef.current > 2400

      const clinicalWarmth = activeZone === "clinical" && bestR > 0.28

      const next = buildMetrics({
        zone: activeZone,
        scrollVelocityNorm: vNorm,
        pricePreemptionActive: pricePreemption,
      })
      metricsRef.current = next

      if (now - lastUi > 100) {
        lastUi = now
        const lg = isKo ? "ko" : "en"
        setSyncLine(pickSyncLine(activeZone, lg, pricePreemption, clinicalWarmth))
        setTextureAdjective(velocityNormToAdjective(vNorm, lg))
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      mo2.disconnect()
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [isKo])

  return (
    <CognitiveSyncContext.Provider value={value}>{children}</CognitiveSyncContext.Provider>
  )
}

export function useLuminaCognitiveSync(): CognitiveSyncContextValue {
  const ctx = useContext(CognitiveSyncContext)
  if (!ctx) {
    throw new Error("useLuminaCognitiveSync must be used within LuminaCognitiveSyncProvider")
  }
  return ctx
}

/** Outside provider: null (visual layer uses defaults). */
export function useLuminaCognitiveSyncOptional(): CognitiveSyncContextValue | null {
  return useContext(CognitiveSyncContext)
}
