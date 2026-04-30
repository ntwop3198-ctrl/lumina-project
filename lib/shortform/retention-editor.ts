import type { EditPoint, ViralShortformPlan } from "@/lib/shortform/types"
import { extractThreeSecHookAnd0p5 } from "@/lib/shortform/hook-extractor"
import type { VoiceMode } from "@/lib/narrative/voice-mode"

function pickSentences(analysisMarkdown: string, max = 8): string[] {
  const cleaned = analysisMarkdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#_*`>!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (!cleaned) return []
  const parts = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  return parts.slice(0, max)
}

function estimateEditPoints({
  analysisMarkdown,
  startAt,
  endAt,
}: {
  analysisMarkdown: string
  startAt: number
  endAt: number
}): EditPoint[] {
  // “빠른 템포의 편집점”: 숫자/짧은 문장/기술어가 있는 곳을 자막 전환 포인트로 사용
  const sentences = pickSentences(analysisMarkdown, 10)
  const editCandidates = sentences
    .map((s, idx) => {
      const t = s.toLowerCase()
      const hasNum = /\d/.test(t)
      const short = s.length < 28
      const tech = /(airless|에어리스|tewl|수분|탄력|흡수|보호)/i.test(t)
      const comma = /,/.test(s) || /，/.test(s)
      const score = (hasNum ? 1.2 : 0) + (short ? 0.8 : 0) + (tech ? 0.9 : 0) + (comma ? 0.4 : 0)
      return { s, idx, score }
    })
    .sort((a, b) => b.score - a.score)

  const picked = editCandidates.slice(0, 3)
  const interval = endAt - startAt
  return picked.map((p, i) => {
    const timeSec = startAt + (interval * (i + 1)) / (picked.length + 1)
    const newText = p.s.length ? p.s.slice(0, 40) : "변화는 눈에 먼저 닿습니다"
    return {
      timeSec: Math.round(timeSec * 10) / 10,
      reason: p.score > 2 ? "숫자/기술 신호 기반 빠른 전환" : "리듬 컷 포인트",
      newOnScreenText: newText,
    }
  })
}

function buildCaption(analysisMarkdown: string, voiceMode: VoiceMode) {
  const hasWe = analysisMarkdown.includes("우리는")
  const brandAnchor = hasWe || voiceMode === "confession" ? "우리는" : "당신의"
  const vibeKeyword =
    analysisMarkdown.includes("빛") ? "빛" : analysisMarkdown.includes("제형") ? "제형" : "리추얼"

  return `${brandAnchor} ${vibeKeyword}가 닿는 순간, 상세페이지가 ‘전환 장면’이 됩니다. 저장하고 다음 페이지로 확인해 보세요.`
    .replace(/\s+/g, " ")
    .trim()
}

function buildBgmGuide(analysisMarkdown: string) {
  const isBright = /(빛|반짝|광)/.test(analysisMarkdown)
  const isHealing = /(치유|회복|리추얼|밤|스며)/.test(analysisMarkdown)
  const hasData = /(\d+(\.\d+)?\s*%)/.test(analysisMarkdown)

  if (isBright && hasData) {
    return {
      bpm: 96,
      mood: "미래적·샤이니·타이트 그루브",
      guide: "미세한 신스 리드 + 짧은 드롭(0.5s~1.2s)에서 훅 텍스트가 타격감 있게 들어오게 합니다.",
    }
  }
  if (isHealing) {
    return {
      bpm: 74,
      mood: "차분·감각적·워밍 앰비언스",
      guide: "저역은 눌러두고, B-roll 전환(2~5s)에서 부드러운 필터 스윕으로 감정 리듬을 유지합니다.",
    }
  }
  return {
    bpm: 88,
    mood: "럭셔리 미니멀·클린 펄스",
    guide: "클린 킥 + 얇은 패드로 3초 훅부터 템포를 고정하고, 자막 교체 시점에 맞춰 짧게 숨을 끊습니다.",
  }
}

export function buildViralShortformPlan({
  analysisMarkdown,
  voiceMode,
  variantName,
}: {
  analysisMarkdown: string
  voiceMode: VoiceMode
  variantName: string
}): ViralShortformPlan {
  const { threeSec, hook } = extractThreeSecHookAnd0p5(analysisMarkdown)
  const editPoints = estimateEditPoints({
    analysisMarkdown,
    startAt: threeSec.endSec,
    endAt: 7.5,
  })

  const onScreenText = [
    hook.hookLine,
    "빛이 닿으면, 달라집니다",
    "정교해진 디테일 = 안정적인 사용감",
    "수치로 확인되는 차이",
    voiceMode === "confession" && analysisMarkdown.includes("우리는") ? "우리가 고집한 이유" : "당신을 위한 약속",
  ]

  const caption = buildCaption(analysisMarkdown, voiceMode)
  const bgm = buildBgmGuide(analysisMarkdown)

  const productionNotes = [
    "0~0.5s: 훅 텍스트만 크게(최소 3줄 이내), 배경은 빛/제형 클로즈업 중심",
    "0.5~3s: 2~3회 빠른 컷(편집점) + 자막 교체",
    "3~7.5s: 데이터/증거 문장 등장 구간에서 리듬 컷(숫자/짧은 문장 기반)",
    `BGM BPM=${bgm.bpm}: 자막 전환마다 드롭/스윕을 1회씩만`,
  ]

  return {
    variantName,
    durationSec: 8.0,
    hook,
    threeSecHook: threeSec,
    editPoints,
    onScreenText,
    caption,
    bgm,
    productionNotes,
  }
}

