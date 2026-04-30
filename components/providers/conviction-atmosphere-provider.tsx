"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type ConvictionAtmosphereValue = {
  morningUnveiled: boolean
  /** 페르소나 진단으로 스크롤할 때: 먹장구름이 걷히며 맑은 심해로 */
  unveilMorning: () => void
}

const ConvictionAtmosphereContext = createContext<ConvictionAtmosphereValue | null>(
  null,
)

export function useConvictionAtmosphere(): ConvictionAtmosphereValue {
  const ctx = useContext(ConvictionAtmosphereContext)
  if (!ctx) {
    return { morningUnveiled: false, unveilMorning: () => {} }
  }
  return ctx
}

export function ConvictionAtmosphereProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const [morningUnveiled, setMorningUnveiled] = useState(false)

  const unveilMorning = useCallback(() => {
    setMorningUnveiled(true)
  }, [])

  const value = useMemo(
    () => ({ morningUnveiled, unveilMorning }),
    [morningUnveiled, unveilMorning],
  )

  const cleared = reduceMotion || morningUnveiled

  return (
    <ConvictionAtmosphereContext.Provider value={value}>
      <div
        className={cn(
          "lumina-midnight-landing lumina-midnight-atmosphere-root relative min-h-screen",
          cleared && "lumina-morning-revealed",
        )}
      >
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div
            className={cn(
              "lumina-midnight-atmosphere-base absolute inset-0",
              cleared && "lumina-midnight-atmosphere-base--clear",
            )}
          />
          <div
            className={cn(
              "lumina-morning-storm-layer absolute inset-0",
              cleared && "lumina-morning-storm-layer--cleared",
            )}
          />
        </div>
        <div className="relative z-[1] min-h-screen">{children}</div>
      </div>
    </ConvictionAtmosphereContext.Provider>
  )
}
