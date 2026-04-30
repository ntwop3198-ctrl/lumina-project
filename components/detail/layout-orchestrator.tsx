"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type SectionId = "clinical" | "brand-story" | "ritual-video" | "generic"

export type OrchestratedSection = {
  id: SectionId
  /**
   * 기본 렌더 순서. 숫자가 작을수록 위에 위치합니다.
   * 동일한 priority일 경우, sections 배열에 전달된 순서를 따릅니다.
   */
  priority?: number
  content: React.ReactNode
}

type LayoutOrchestratorProps = {
  sections: OrchestratedSection[]
  /**
   * 검색어를 가져올 쿼리 파라미터 이름 (기본값: "q")
   */
  queryParamKey?: string
  className?: string
}

const ANTI_AGE_KEYWORDS = ["탄력", "주름", "elastic", "elasticity", "wrinkle", "anti-aging", "antiaging"]
const LUXURY_GIFT_KEYWORDS = ["명품", "선물", "럭셔리", "luxury", "gift", "present"]

function includesAny(haystack: string, keywords: string[]): boolean {
  return keywords.some((kw) => haystack.includes(kw.toLowerCase()))
}

export function LayoutOrchestrator({
  sections,
  queryParamKey = "q",
  className,
}: LayoutOrchestratorProps) {
  const [queryString, setQueryString] = useState("")

  useEffect(() => {
    const update = () => setQueryString(window.location.search ?? "")
    update()
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  const rawQuery = useMemo(
    () => (new URLSearchParams(queryString).get(queryParamKey) ?? "").toLowerCase(),
    [queryString, queryParamKey],
  )

  const orderedSections = useMemo(() => {
    if (!sections.length) return []

    const hasAntiAgeIntent = includesAny(rawQuery, ANTI_AGE_KEYWORDS)
    const hasLuxuryIntent = includesAny(rawQuery, LUXURY_GIFT_KEYWORDS)

    // 기본 순서: priority → 원래 인덱스
    const base = sections
      .map((section, index) => ({
        ...section,
        _index: index,
        priority: section.priority ?? index,
      }))
      .sort((a, b) => {
        if (a.priority === b.priority) return a._index - b._index
        return a.priority - b.priority
      })

    if (!hasAntiAgeIntent && !hasLuxuryIntent) return base

    const clinical = base.filter((s) => s.id === "clinical")
    const brandAndRitual = base.filter((s) => s.id === "brand-story" || s.id === "ritual-video")
    const others = base.filter(
      (s) => !["clinical", "brand-story", "ritual-video"].includes(s.id)
    )

    const result: typeof base = []

    // 우선순위: 명시적으로 요구된 블록들을 최상단에 올리고, 나머지는 기본 순서 유지
    if (hasAntiAgeIntent && clinical.length > 0) {
      result.push(...clinical)
    }

    if (hasLuxuryIntent && brandAndRitual.length > 0) {
      // clinical과 중복될 수 있으므로 중복 제거
      brandAndRitual.forEach((s) => {
        if (!result.some((r) => r._index === s._index)) {
          result.push(s)
        }
      })
    }

    // 나머지 섹션들 추가 (이미 추가된 것은 건너뜀)
    others.forEach((s) => {
      if (!result.some((r) => r._index === s._index)) {
        result.push(s)
      }
    })

    // 혹시 clinical/brand-story/ritual-video 가 하나도 없을 때를 대비해 fallback
    if (!result.length) return base

    return result
  }, [sections, rawQuery])

  return (
    <div className={className}>
      <AnimatePresence initial={false}>
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 16,
          }}
          className="space-y-8 md:space-y-10"
        >
          {orderedSections.map((section) => (
            <motion.section
              key={section._index}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 18,
              }}
              className="rounded-3xl border border-rose-gold/20 bg-cream/70 px-6 md:px-8 py-6 md:py-8 shadow-sm"
            >
              {section.content}
            </motion.section>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

