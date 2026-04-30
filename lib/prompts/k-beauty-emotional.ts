import { type SentimentMode, formatLexiconForPrompt, getModeHint } from '@/lib/k-beauty/k-beauty-sentiment'

const DIRECT_MODE = `## 카피 모드: Direct (정보 전달)
- **목적**: 성분·용법·효능·주의를 빠짐없이, 과장 없이 전달한다.
- **톤**: 차분한 설명형. '~합니다', '~됩니다' 허용. 감성 비유는 최소화한다.
- **K-커뮤니티 어휘**: 아래 lexicon은 **검색·공감 키워드 보조**로만 1~2회 인용 수준으로 쓴다.`
const EMPATHY_MODE = `## 카피 모드: Empathy (공감·통점)
- **목적**: 소비자의 하루·리추얼·피로감 등 **통점**을 건드린 뒤, 제품을 그 해답으로 연결한다.
- **톤**: 일기·리뷰에 가까운 서정적 리듬. 짧은 절 + 여백. '당신'에게 말 건네기.
- **K-커뮤니티 어휘**: 아래 lexicon에서 **가중치가 높은 표현**을 자연스럽게 녹여, “한국 여성들의 일기장”처럼 읽히게 한다(남용·나열 금지).`

export function buildSentimentModeBlock(mode: SentimentMode): string {
  const hint = getModeHint(mode)
  const lex = formatLexiconForPrompt(24)
  const head = mode === 'direct' ? DIRECT_MODE : EMPATHY_MODE
  return `
${head}

### K-Community Lexicon (가중치 참고)
${lex}

모드 힌트: ${hint}
`
}
