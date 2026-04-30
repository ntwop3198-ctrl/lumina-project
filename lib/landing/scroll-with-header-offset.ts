/** 고정 글로벌 헤더 높이를 반영한 앵커 스크롤 (미드나잇 랜딩 등) */

const FALLBACK_HEADER_PX = 72

export function getFixedHeaderOffsetPx(): number {
  if (typeof document === "undefined") return FALLBACK_HEADER_PX
  const header = document.querySelector("header")
  if (!header) return FALLBACK_HEADER_PX
  return Math.ceil(header.getBoundingClientRect().height)
}

export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "smooth"
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
}

/**
 * 브라우저 기본 앵커 이동·scrollIntoView와 달리 `header` 높이만큼 위로 보정합니다.
 */
export function scrollToIdWithHeaderOffset(id: string, behavior?: ScrollBehavior): void {
  if (typeof window === "undefined") return
  const el = document.getElementById(id)
  if (!el) return
  const navH = getFixedHeaderOffsetPx()
  const top = el.getBoundingClientRect().top + window.scrollY - navH
  window.scrollTo({
    top: Math.max(0, top),
    behavior: behavior ?? getScrollBehavior(),
  })
}
