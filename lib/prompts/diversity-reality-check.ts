import { stableHash } from "@/lib/lumina/stable-hash"

export type DiversityRealityCheckMode = "analysis" | "refine"

const NOISE_METAPHORS = [
  "비늘의 빛결",
  "무중력의 크림성",
  "결정의 숨결",
  "기원의 백색광",
  "기계가 잠든 정적",
  "진동하는 진주결",
  "유효성의 온도",
  "빛이 새는 문장",
  "원리의 얇은 막",
  "기억의 라미네이션",
] as const

const STRUCTURE_RHYTHMS = [
  "각 소제목의 첫 문장은 1문장만으로 핵(Core)을 고정하라.",
  "문단 사이에 쉼표를 1번만 배치하고, 다음 문장으로 넘어가라.",
  "수식어는 줄이고, 명사 중심 문장 구조로 밀도를 유지하라.",
  "문장 끝은 절제된 종결로 통일하되, 핵심 문장만 길이를 짧게 유지하라.",
  "숫자/지표가 나오면, 곧바로 '확인 가능한 범위'를 함께 명시하라.",
] as const

const CORE_NOUN_BANK = [
  "기원",
  "원리",
  "기록",
  "존재",
  "증명",
  "약속",
  "빛",
  "감각",
  "차이",
  "근원",
] as const

function pick<T>(arr: readonly T[], seed: number, offset: number): T {
  const idx = (seed + offset) % arr.length
  return arr[idx]!
}

export function buildDiversityRealityCheckPrompt(
  seedInput: string,
  mode: DiversityRealityCheckMode
): string {
  const seed = stableHash(seedInput)

  // Anti-homogenization: seed로 고정된 "선택"을 모델이 반드시 따라가게 유도
  const metaphor = pick(NOISE_METAPHORS, seed, 17)
  const rhythm = pick(STRUCTURE_RHYTHMS, seed, 31)
  const coreNoun = pick(CORE_NOUN_BANK, seed, 53)

  const modeLabel = mode === "analysis" ? "상세페이지 초안 생성" : "리파인(문체 정제)"

  // Human Value Weight: 장기 신뢰 70%, 단기 전환 30% (명시적으로 우선순위 강제)
  return `
## Diversity & Reality Check (${modeLabel})
목표의 우선순위는 명확합니다.
- 장기적 신뢰도 70%: 과장, 단정, 의료/규제 위반 표현, 근거 없는 수치 추가를 금지합니다.
- 단기 전환 30%: 설득은 하되, 항상 '확인 가능한 범위' 안에서만 이루어져야 합니다.

## Anti-Homogenization (브랜드별 미적 노이즈 고정)
아래 선택을 반드시 사용하세요. (seed는 고정되어 있으니 동일 seed에서는 결과가 더 일관되게 달라지도록 하라.)
- 미적 노이즈 은유: "${metaphor}"
- 구조 리듬: "${rhythm}"
- 본질 핵(Core) 단어: "${coreNoun}"

## Reality Check (수익을 위해 사실을 흐리지 마라)
금지:
- 없는 성분/수치/효능을 새로 만들어 넣기
- '누구에게나 즉시' 같은 절대 보장 문장
- 의료적 치료/진단을 암시하는 표현

원칙:
- 사진/입력에 없는 정보는 반드시 "확인 어려움" 또는 "사진에서 확인 불가"로 처리합니다.
- 의도는 설득하되, 사실 경계는 흐리지 않습니다.

## 장기 신뢰 문장 1회 필수
출력 전체에서 1회, 독자가 안심할 수 있는 현실적인 기준(예: 사용 시 기대 가능한 변화의 범위, 확인 가능한 정보의 출처)을
짧은 문장으로 삽입하라.

`
}

