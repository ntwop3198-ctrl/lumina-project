export const CONNECTIVE_PHRASES = [
  "그리하여",
  "마침내",
  "이제야",
  "바로 그 순간",
  "당신을 향한 약속은",
  "한 걸음 더 나아가",
  "또한",
  "그럼에도",
  "그러므로",
  "다시 말해",
  "여기서부터",
  "끝내",
] as const

export type ConnectivePhrase = (typeof CONNECTIVE_PHRASES)[number]

export function buildEditorialFlowEnginePrompt(): string {
  const list = CONNECTIVE_PHRASES.map((p) => `- "${p}"`).join("\n")
  return `
## 서사적 연결어(Editorial Flow Engine) 라이브러리 사용 지시
아래 연결어 중 **반드시 5개 이상**을 골라, 각 문단의 전환(장면 전환/논리 전환/감성-이성 전환)마다 자연스럽게 1회씩 삽입해.

연결어 후보:
${list}

원칙:
- 연결어는 “장식”이 아니라 문장 사이의 이유/결론/전환을 보여주는 역할로만 사용한다.
- 동일 연결어 반복은 금지(같은 연결어는 최대 1회).
- 숫자·효능이 등장하는 문장 앞/뒤 전환에도 연결어를 1회씩 배치해.
`
}

