"use client"

import type { ReactNode } from "react"
import { BrandSoulChoiceProvider } from "@/components/providers/brand-soul-choice-provider"
import { ConvictionAtmosphereProvider } from "@/components/providers/conviction-atmosphere-provider"
import { LuminaExitMomentProvider } from "@/components/providers/lumina-exit-moment-provider"

/** 미드나잇 랜딩 전용 — Provider 중첩을 한 클라이언트 경계로 고정 */
export function LuminaMidnightHomeProviders({ children }: { children: ReactNode }) {
  return (
    <ConvictionAtmosphereProvider>
      <BrandSoulChoiceProvider>
        <LuminaExitMomentProvider>{children}</LuminaExitMomentProvider>
      </BrandSoulChoiceProvider>
    </ConvictionAtmosphereProvider>
  )
}
