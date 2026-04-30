import type { VoiceMode } from "@/lib/narrative/voice-mode"

export type ROIBreakdown = {
  visual: number // 0..1
  copy: number // 0..1
  trust: number // 0..1
  bridge: number // 0..1
  total: number // 0..100
}

export type ROISeverity = "low" | "medium" | "high"

export type ROIFeedbackIssue = {
  id: string
  severity: ROISeverity
  title: string
  message: string
  /** 해당 조치가 해결하려는 세부 축 */
  axis: keyof Pick<ROIBreakdown, "visual" | "copy" | "trust" | "bridge">
}

export type PageBlueprint = {
  hasVisual: boolean
  stageCount: number // discovery/refining/healing/promise
  voiceMode: VoiceMode
  hasWePhrase: boolean
  hasHonorificTone: boolean
  hasDataBridgePhrase: boolean
  hasClinicalSignal: boolean
  /** 페이지에 Trust 영역(배지/임상/Fact Check 브릿지)이 존재하는지 */
  trustPresent: boolean
  /** 분석 마크다운 길이(간접적으로 ‘풍부함/읽힘’을 추정) */
  markdownLength: number
}

export type ROIPrediction = {
  score: number // 0..100
  breakdown: Omit<ROIBreakdown, "total"> & { total: number }
  issues: ROIFeedbackIssue[]
}

