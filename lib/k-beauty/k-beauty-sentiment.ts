import data from '@/k_beauty_sentiment.json'

export type LexiconEntry = {
  term: string
  weight: number
  /** 집계·필터용 태그 */
  category: string
  context: string
}

export type SentimentMode = 'direct' | 'empathy'

export type KBeautySentimentData = {
  version: string
  description: string
  lexicon: LexiconEntry[]
  mode_hints: { direct: string; empathy: string }
}

const DATA = data as KBeautySentimentData

export function getKBeautySentimentData(): KBeautySentimentData {
  return DATA
}

/** 가중치 상위 n개 — 프롬프트에 요약 삽입 */
export function getTopLexiconTerms(n = 12): LexiconEntry[] {
  return [...DATA.lexicon].sort((a, b) => b.weight - a.weight).slice(0, n)
}

/** 카테고리별로 묶어 프롬프트 한 줄 요약 */
export function formatLexiconForPrompt(maxTerms = 20): string {
  const lines = getTopLexiconTerms(maxTerms).map(
    (e) => `- "${e.term}" (w=${e.weight.toFixed(2)}, ${e.category}: ${e.context})`
  )
  return lines.join('\n')
}

export function isSentimentMode(v: string): v is SentimentMode {
  return v === 'direct' || v === 'empathy'
}

export function getModeHint(mode: SentimentMode): string {
  return DATA.mode_hints[mode]
}
