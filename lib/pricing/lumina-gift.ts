export const LUMINA_GIFT_TITLE =
  "루미나 런칭 기념 한정판 진주 실크 파우치 증정"

export type LuminaGiftStatus = {
  startTs: number
  endTs: number
  expired: boolean
}

const STORAGE_KEY = "lumina_gift_window_v1"
const WINDOW_MS = 72 * 60 * 60 * 1000 // 72 hours

export function getOrCreateLuminaGiftWindow(now = Date.now()): LuminaGiftStatus {
  if (typeof window === "undefined") {
    return { startTs: now, endTs: now + WINDOW_MS, expired: false }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { startTs: number; endTs: number }
      const expired = now >= parsed.endTs
      return {
        startTs: parsed.startTs,
        endTs: parsed.endTs,
        expired,
      }
    }
  } catch {
    // ignore
  }

  const startTs = now
  const endTs = now + WINDOW_MS
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTs, endTs }))
  } catch {
    // ignore
  }
  return { startTs, endTs, expired: false }
}

export function formatRemaining(msRemaining: number) {
  const totalSec = Math.max(0, Math.floor(msRemaining / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function luminaGiftCopy(expired: boolean) {
  if (expired) {
    return {
      headline: "금일 한정판 증정은 종료되었습니다",
      sub: "다음 런칭 에디션에서 다시 만나요. 지금 상세페이지를 최적화해 전환을 앞당겨 보세요.",
      cta: "다시 보기",
    }
  }

  return {
    headline: LUMINA_GIFT_TITLE,
    sub: "수량 소진 시 자동 종료되는 런칭 기념 혜택입니다. 파우치 수령 조건을 확인해 주세요.",
    cta: "런칭 패키지 받기",
  }
}

