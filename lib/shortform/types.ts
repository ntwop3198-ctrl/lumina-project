export type HookMoment = {
  startSec: number
  endSec: number
  /** 0.5s 내외의 “도입 훅” 카피 */
  hookLine: string
  /** 해당 구간에서 화면에 띄울 키워드 */
  onScreenKeywords: string[]
}

export type EditPoint = {
  timeSec: number
  reason: string
  /** 자막/텍스트 교체 제안 */
  newOnScreenText: string
}

export type ViralShortformPlan = {
  variantName: string
  durationSec: number
  hook: HookMoment
  threeSecHook: { startSec: number; endSec: number; stageTag: string }
  editPoints: EditPoint[]
  onScreenText: string[]
  caption: string
  bgm: {
    bpm: number
    mood: string
    guide: string
  }
  /** 제작용 메모: 텍스트와 컷 타이밍 */
  productionNotes: string[]
}

export type LaunchBundleExport = {
  shortforms: ViralShortformPlan[]
  adBanners: Array<{
    id: string
    headline: string
    sub: string
    cta: string
  }>
}

