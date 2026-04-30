"use client"

import type { ReactNode } from "react"
import { IndustryProvider } from "@/components/providers/industry-provider"
import { LanguageProvider } from "@/components/providers/language-provider"

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <IndustryProvider>{children}</IndustryProvider>
    </LanguageProvider>
  )
}
