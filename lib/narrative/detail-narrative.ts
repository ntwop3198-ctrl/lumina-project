/**
 * 상세페이지 **[발견 → 정제 → 치유 → 약속]** 4단계 서사 에이전트.
 * LLM 출력 파싱·UI 매핑에 사용.
 */

export type NarrativeStage = 'discovery' | 'refining' | 'healing' | 'promise'

export const NARRATIVE_ORDER: NarrativeStage[] = [
  'discovery',
  'refining',
  'healing',
  'promise',
]

export const NARRATIVE_LABELS: Record<
  NarrativeStage,
  { ko: string; en: string; blurb: string }
> = {
  discovery: {
    ko: '발견',
    en: 'Discovery',
    blurb: '처음 마주한 순간의 시선 — 용기·빛·첫인상',
  },
  refining: {
    ko: '정제',
    en: 'Refining',
    blurb: '원료와 기술이 다듬어지는 정밀함',
  },
  healing: {
    ko: '치유',
    en: 'Healing',
    blurb: '피부와 감각에 닿는 위로',
  },
  promise: {
    ko: '약속',
    en: 'Promise',
    blurb: '브랜드가 고객과 맺는 신뢰',
  },
}

export type NarrativeBlock = {
  stage: NarrativeStage
  title: string
  /** 본문 줄 단위 */
  lines: string[]
}

const STAGE_HEADER: Record<NarrativeStage, RegExp> = {
  discovery: /###\s*발견\s*(?:\(Discovery\))?/i,
  refining: /###\s*정제\s*(?:\(Refining\))?/i,
  healing: /###\s*치유\s*(?:\(Healing\))?/i,
  promise: /###\s*약속\s*(?:\(Promise\))?/i,
}

/**
 * Gemini 마크다운에서 4단계 블록 추출. 없으면 빈 배열.
 */
export function parseNarrativeFromAnalysis(markdown: string): NarrativeBlock[] {
  const text = markdown.replace(/\r\n/g, '\n')
  const blocks: NarrativeBlock[] = []

  for (const stage of NARRATIVE_ORDER) {
    const re = STAGE_HEADER[stage]
    const match = text.match(re)
    if (!match || match.index === undefined) continue

    const start = match.index + match[0].length
    let end = text.length
    for (const other of NARRATIVE_ORDER) {
      if (other === stage) continue
      const next = text.slice(start).search(STAGE_HEADER[other])
      if (next !== -1) {
        end = Math.min(end, start + next)
      }
    }
    const chunk = text.slice(start, end).trim()
    const lines = chunk
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith('###'))

    if (lines.length) {
      blocks.push({
        stage,
        title: `${NARRATIVE_LABELS[stage].ko} (${NARRATIVE_LABELS[stage].en})`,
        lines,
      })
    }
  }

  return blocks
}

/** 서사가 없으면 전체 텍스트를 한 블록으로 (폴백 UI용) */
export function fallbackNarrativeBlocks(plain: string): NarrativeBlock[] {
  const lines = plain
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  if (!lines.length) return []
  return [
    {
      stage: 'discovery',
      title: 'Story',
      lines: lines.slice(0, Math.ceil(lines.length / 2)),
    },
    {
      stage: 'promise',
      title: 'Continue',
      lines: lines.slice(Math.ceil(lines.length / 2)),
    },
  ]
}
