"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { scrollToIdWithHeaderOffset } from "@/lib/landing/scroll-with-header-offset"

/** 홈(/)에서 URL 해시로 진입하거나 `/#id` 클라이언트 이동 후 헤더 높이만큼 보정 스크롤 */
export function MidnightLandingHashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    const run = () => {
      const id = window.location.hash.replace(/^#/, "")
      if (!id) return
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToIdWithHeaderOffset(id))
      })
    }

    run()
    window.addEventListener("hashchange", run)
    return () => window.removeEventListener("hashchange", run)
  }, [pathname])

  return null
}
