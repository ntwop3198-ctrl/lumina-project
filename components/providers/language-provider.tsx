"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type LuminaLang = "ko" | "en" | "zh"

type LangContextValue = {
  lang: LuminaLang
  setLang: (lang: LuminaLang) => void
}

const LangContext = createContext<LangContextValue | null>(null)
const STORAGE_KEY = "lumina.lang.v1"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LuminaLang>("ko")

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw === "ko" || raw === "en" || raw === "zh") setLangState(raw)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang === "ko" ? "ko" : "en"
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: setLangState,
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLuminaLanguage() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLuminaLanguage must be used within LanguageProvider")
  return ctx
}

