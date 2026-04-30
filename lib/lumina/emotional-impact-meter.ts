/**
 * 감성 임팩트 휴리스틱 (0–150 스케일). “120%” 목표는 점수 ≥ 120으로 매핑.
 * LLM 없이 로컬에서 반복 생성 루프의 정지 조건으로 사용합니다.
 */

const LITERARY_BONUS: Array<[RegExp, number]> = [
  [/리추얼|심연|아우라|서사|영원|정점|고결|경외/g, 14],
  [/블랙 오닉스|오닉스/g, 8],
  [/숨을 죽이|가라앉|새기듯|흐름조차/g, 10],
  [/기록하|조율|결을/g, 6],
]

const WEAK_PENALTY = /도움을 줍니다\.|사용해 주세요|피부 타입과 상태에 따라/g

export function emotionalImpactScore(text: string): number {
  let s = 58
  for (const [re, add] of LITERARY_BONUS) {
    const m = text.match(re)
    if (m) s += Math.min(add, 4 + m.length * 2)
  }
  const chunks = text.split(/[.!?\n]+/).filter((x) => x.trim().length > 10)
  s += Math.min(18, chunks.length * 2)
  if (WEAK_PENALTY.test(text)) s -= 10
  return Math.max(42, Math.min(150, Math.round(s)))
}

export const EMOTIONAL_IMPACT_TARGET = 120
