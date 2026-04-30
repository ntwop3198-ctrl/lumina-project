"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  DEFAULT_INDUSTRY_ID,
  getIndustryModule,
  isIndustrySelectable,
  resolveIndustryContext,
  type IndustryId,
  type ResolvedIndustryContext,
} from "@/lib/industry"

const STORAGE_KEY = "lumina.industry.v1"

type IndustryContextValue = {
  industryId: IndustryId
  setIndustryId: (id: IndustryId) => void
  resolved: ResolvedIndustryContext
  module: ResolvedIndustryContext["module"]
}

const IndustryContext = createContext<IndustryContextValue | null>(null)

function readStoredIndustry(): IndustryId | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === "cosmetic" || raw === "fashion" || raw === "tech") return raw
  } catch {
    /* ignore */
  }
  return null
}

export function IndustryProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryIdState] = useState<IndustryId>(DEFAULT_INDUSTRY_ID)

  useEffect(() => {
    const stored = readStoredIndustry()
    if (stored && isIndustrySelectable(stored)) setIndustryIdState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.luminaIndustry = industryId
    document.documentElement.dataset.luminaIndustryActivation = getIndustryModule(industryId).activation
  }, [industryId])

  const setIndustryId = useCallback((id: IndustryId) => {
    if (!isIndustrySelectable(id)) return
    setIndustryIdState(id)
    try {
      window.localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* ignore */
    }
  }, [])

  const resolved = useMemo(() => resolveIndustryContext(industryId), [industryId])

  const value = useMemo<IndustryContextValue>(
    () => ({
      industryId,
      setIndustryId,
      resolved,
      module: resolved.module,
    }),
    [industryId, setIndustryId, resolved],
  )

  return <IndustryContext.Provider value={value}>{children}</IndustryContext.Provider>
}

export function useIndustry(): IndustryContextValue {
  const ctx = useContext(IndustryContext)
  if (!ctx) {
    throw new Error("useIndustry must be used within IndustryProvider")
  }
  return ctx
}

/** Optional: 헤더 등 Provider 밖 폴백 없이 쓰기 어려울 때는 Switcher만 Provider 안에 둠 */
export function useIndustryOptional(): IndustryContextValue | null {
  return useContext(IndustryContext)
}
