import type { PageBlueprint } from "@/lib/roi/types"
import type { VoiceMode } from "@/lib/narrative/voice-mode"
import {
  fallbackNarrativeBlocks,
  parseNarrativeFromAnalysis,
} from "@/lib/narrative/detail-narrative"

const HONORIFIC_RE = /~(하십니다|드립니다|됩니다|이겠습니다|하실 수 있습니다)/g

const DATA_BRIDGE_PHRASE =
  "이 과학적 증거는 우리가 당신에게 바치는 진심의 기록입니다"

function countHonorificTone(markdown: string): number {
  const m = markdown.match(HONORIFIC_RE)
  return m?.length ?? 0
}

function detectClinicalSignal(markdown: string): boolean {
  // 임상 지표는 보통 % 또는 기간/TEWL 같은 지표 기호가 등장합니다.
  return /(\d+(\.\d+)?\s*%)/.test(markdown) || /(\d+\s*주)/.test(markdown) || /TEWL/i.test(markdown)
}

export function extractPageBlueprintFromAnalysis({
  analysisMarkdown,
  productImageUrl,
  voiceMode,
  trustPresent = true,
}: {
  analysisMarkdown: string
  productImageUrl?: string | null
  voiceMode: VoiceMode
  trustPresent?: boolean
}): PageBlueprint {
  const markdown = analysisMarkdown ?? ""
  const blocks = parseNarrativeFromAnalysis(markdown)
  const stageBlocks = blocks.length ? blocks : fallbackNarrativeBlocks(markdown)

  const stageCount = stageBlocks.length
  const markdownLength = markdown.trim().length

  const unclearVisual = /확인\s*어려움|뚜렷한\s*문구\s*없음/i.test(markdown)
  // “업로드가 있으나 모델이 읽기 어려운” 케이스를 비주얼 품질 저하로 간주합니다.
  const hasVisual = Boolean(productImageUrl?.trim()) && !unclearVisual
  const hasWePhrase = markdown.includes("우리는")
  const hasHonorificTone = countHonorificTone(markdown) > 0
  const hasDataBridgePhrase = markdown.includes(DATA_BRIDGE_PHRASE)
  const hasClinicalSignal = detectClinicalSignal(markdown)

  return {
    hasVisual,
    stageCount,
    voiceMode,
    hasWePhrase,
    hasHonorificTone,
    hasDataBridgePhrase,
    hasClinicalSignal,
    trustPresent,
    markdownLength,
  }
}

