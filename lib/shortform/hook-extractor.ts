import type { HookMoment } from "@/lib/shortform/types"
import type { NarrativeStage } from "@/lib/narrative/detail-narrative"

import { parseNarrativeFromAnalysis, fallbackNarrativeBlocks } from "@/lib/narrative/detail-narrative"

const VISUAL_IMPACT_KEYWORDS = [
  "빛",
  "투명",
  "블루",
  "반짝",
  "광",
  "거울",
  "제형",
  "공기",
  "에어리스",
  "스며",
  "차갑",
  "은은",
  "보호",
  "무광",
  "실크",
  "진주",
]

function scoreLine(line: string): number {
  const t = line.toLowerCase()
  let s = 0
  for (const k of VISUAL_IMPACT_KEYWORDS) {
    if (t.includes(k.toLowerCase())) s += 1
  }
  // numbers and technical words can correlate with “punch”
  if (/\d/.test(t)) s += 0.6
  if (t.includes("airless") || t.includes("에어리스")) s += 0.7
  return s
}

function stageWindow(stage: NarrativeStage): { startSec: number; endSec: number } {
  // 9:16 쇼츠 기준 가정: 총 8~12초 중 “hook은 앞 3초”
  // discovery → 0-1.7, refining → 1.7-3.0, healing → 3.0-4.6, promise → 4.6-6.2
  if (stage === "discovery") return { startSec: 0.0, endSec: 1.7 }
  if (stage === "refining") return { startSec: 1.7, endSec: 3.0 }
  if (stage === "healing") return { startSec: 3.0, endSec: 4.6 }
  return { startSec: 4.6, endSec: 6.2 }
}

export function extractThreeSecHookAnd0p5(
  analysisMarkdown: string
): { threeSec: { startSec: number; endSec: number; stageTag: string }; hook: HookMoment } {
  const blocks = parseNarrativeFromAnalysis(analysisMarkdown)
  const stageBlocks = blocks.length ? blocks : fallbackNarrativeBlocks(analysisMarkdown)

  // stage importance by keywords in its lines
  let bestStage: NarrativeStage = stageBlocks[0]?.stage ?? "discovery"
  let bestStageScore = -1
  for (const b of stageBlocks) {
    const s = b.lines.slice(0, 3).reduce((acc, l) => acc + scoreLine(l), 0)
    if (s > bestStageScore) {
      bestStageScore = s
      bestStage = b.stage
    }
  }

  const win = stageWindow(bestStage)
  // “3초 도입”: 추출된 최강 시각 장면(3초)을 릴의 도입부(0~3s)로 재구성
  const threeSecStart = 0
  const threeSec = {
    startSec: threeSecStart,
    endSec: threeSecStart + 3.0,
    stageTag: bestStage,
  }

  // 0.5s hook line: pick the highest scoring line among the first 2 lines of that stage
  const stageLines = stageBlocks.find((b) => b.stage === bestStage)?.lines ?? []
  const candidate = stageLines.slice(0, 4)
  let bestLine = candidate[0] ?? ""
  let bestLineScore = -1
  for (const l of candidate) {
    const s = scoreLine(l)
    if (s > bestLineScore) {
      bestLineScore = s
      bestLine = l
    }
  }

  const keywords = VISUAL_IMPACT_KEYWORDS.filter((k) =>
    bestLine.toLowerCase().includes(k.toLowerCase())
  ).slice(0, 4)

  // “hookLine” is kept short
  const hookText = bestLine
    .replace(/[#_*`>]/g, "")
    .trim()
    .slice(0, 44)

  const hook: HookMoment = {
    startSec: threeSecStart,
    endSec: threeSecStart + 0.5,
    hookLine:
      hookText.length >= 5 ? hookText : "한 번, 빛이 닿으면 달라집니다",
    onScreenKeywords: keywords.length ? keywords : ["빛", "제형", "차이"],
  }

  return { threeSec, hook }
}

