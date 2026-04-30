import type { AnalysisStyle } from '@/lib/analysis-style'

/** 인디 브랜드용 단순 감성 키워드 — 복잡한 파라미터 대신 톤만 선택 */
export const MOOD_IDS = ['chic', 'dreamy', 'bold', 'minimal'] as const
export type MoodKeyword = (typeof MOOD_IDS)[number]

export const DEFAULT_MOOD: MoodKeyword = 'chic'

export const MOOD_KEYWORDS: Record<
  MoodKeyword,
  {
    labelEn: string
    labelKo: string
    hint: string
    /** Gemini 분석 스타일과 매핑 */
    analysisStyle: AnalysisStyle
  }
> = {
  chic: {
    labelEn: 'Chic',
    labelKo: '시크',
    hint: '세련된 백화점 감성',
    analysisStyle: 'detail',
  },
  dreamy: {
    labelEn: 'Dreamy',
    labelKo: '드리미',
    hint: '몽글한 서사와 감성',
    analysisStyle: 'story',
  },
  bold: {
    labelEn: 'Bold',
    labelKo: '볼드',
    hint: '피드에서 멈추는 임팩트',
    analysisStyle: 'sns',
  },
  minimal: {
    labelEn: 'Minimal',
    labelKo: '미니멀',
    hint: '여백·자연광·유리 — Studio Minimalist (Essence)',
    analysisStyle: 'studio_minimalist',
  },
}

export function isMoodKeyword(value: string): value is MoodKeyword {
  return (MOOD_IDS as readonly string[]).includes(value)
}

export function resolveStyleFromMood(mood: MoodKeyword): AnalysisStyle {
  return MOOD_KEYWORDS[mood].analysisStyle
}

export function moodPromptBlock(mood: MoodKeyword): string {
  const m = MOOD_KEYWORDS[mood]
  return `
## 브랜드 감성 키워드 (필수 반영)
창업자가 선택한 감성: **${m.labelEn}** (${m.labelKo}) — ${m.hint}
패키징 해석·상세페이지 카피 톤·문장 리듬을 이 키워드와 **한 줄로도 통일감** 있게 맞추세요. 기술 설명은 유지하되, 어조와 이미지 연상은 선택된 감성에 맞춥니다.`
}
