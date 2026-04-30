"use client"

import { useEffect, useMemo, useState } from "react"

export type VisualThemeMode = "base" | "luxury" | "science"

type VisualThemeTokens = {
  mode: VisualThemeMode
  accent: string
  background: string
  fontWeight: number
}

const LUXURY_KEYWORDS = ["luxury", "럭셔리", "명품", "고급", "선물"]
const SCIENCE_KEYWORDS = ["science", "사이언스", "임상", "성분", "연구소"]

function hasAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase()
  return keywords.some((kw) => lower.includes(kw.toLowerCase()))
}

function inferModeFromQuery(raw: string): VisualThemeMode {
  if (!raw) return "base"
  if (hasAny(raw, LUXURY_KEYWORDS)) return "luxury"
  if (hasAny(raw, SCIENCE_KEYWORDS)) return "science"
  return "base"
}

function getTokens(mode: VisualThemeMode): VisualThemeTokens {
  switch (mode) {
    case "luxury":
      return {
        mode,
        accent: "#d4af37",
        background: "#090806",
        fontWeight: 600,
      }
    case "science":
      return {
        mode,
        accent: "#4fd1c5",
        background: "#020617",
        fontWeight: 500,
      }
    default:
      return {
        mode: "base",
        accent: "#c9a227",
        background: "#0a0a0a",
        fontWeight: 500,
      }
  }
}

export function useVisualTheme(queryParamKey = "q"): VisualThemeTokens {
  const [queryString, setQueryString] = useState("")
  const [mode, setMode] = useState<VisualThemeMode>("base")

  const tokens = useMemo(() => getTokens(mode), [mode])

  // 0.2초 이내에 CSS 변수 적용
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--accent", tokens.accent)
    root.style.setProperty("--primary", tokens.accent)
    root.style.setProperty("--background", tokens.background)
    root.style.setProperty("--lumina-font-weight", String(tokens.fontWeight))
  }, [tokens])

  useEffect(() => {
    // Parse location on client only for SSR/hydration safety.
    const update = () => setQueryString(window.location.search ?? "")
    update()
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  // 쿼리 변경 감지
  useEffect(() => {
    const raw = new URLSearchParams(queryString).get(queryParamKey) ?? ""
    const next = inferModeFromQuery(raw)
    setMode(next)
  }, [queryString, queryParamKey])

  return tokens
}

