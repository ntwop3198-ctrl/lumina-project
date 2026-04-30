export const AIRLESS_COPY = {
  headline: "당신의 앰플은 지금 이 순간에도 죽어가고 있습니다.",
  keyPoint: "진공 차단 기술로 성분 산화를 99% 막아줍니다.",
} as const

export function isAirlessContainer(text: string | null | undefined): boolean {
  if (!text) return false
  const lowered = text.toLowerCase()
  if (lowered.includes("airless")) return true
  return text.includes("에어리스")
}

