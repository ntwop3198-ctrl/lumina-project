/**
 * Intoskin pilot copy templates (two vest paths).
 * - 본질의 길: 철학/신뢰/정제 중심
 * - 효율의 길: 실행/전환/운영 효율 중심
 */

export type PilotVestPath = "essence" | "efficiency"

export interface IntoskinSourceInput {
  brandName: string
  ingredientHighlights: string[]
  technicalNotes: string
  targetCustomer?: string
}

export interface PilotVestOutput {
  path: PilotVestPath
  pathLabelKo: "본질의 길" | "효율의 길"
  storyKo: string
  landingHeroKo: string
  landingSectionsKo: string[]
  reviewChecklistKo: string[]
}

const PHILOSOPHY_ANCHOR =
  "구소구고구기(求小·求苦·求己), 덧칠하지 않아도 예쁜 본질, 파트너 상생과 정산 투명성"

export function buildIntoskinPilotVest(
  input: IntoskinSourceInput,
  path: PilotVestPath,
): PilotVestOutput {
  const ingredients = input.ingredientHighlights.join(", ")
  const customer = input.targetCustomer ?? "성분과 근거를 중시하는 고객"

  if (path === "essence") {
    return {
      path,
      pathLabelKo: "본질의 길",
      storyKo: [
        `${input.brandName}은 화려한 장식을 덜어내고 성분의 본질을 먼저 보여준다.`,
        `핵심 성분(${ingredients})과 기술 메모를 바탕으로 신뢰 가능한 언어만 남긴다.`,
        `루미나 철학(${PHILOSOPHY_ANCHOR})에 맞춰 고객의 안심과 파트너의 지속 가능성을 함께 설계한다.`,
      ].join(" "),
      landingHeroKo: `${input.brandName}, 본질이 먼저 보이는 스킨 솔루션`,
      landingSectionsKo: [
        "브랜드 철학: 왜 덜어낼수록 강해지는가",
        "성분 근거: 핵심 성분과 적용 이유",
        "안전·신뢰: 과장 없는 표현, 검증 가능한 정보",
        "파트너 약속: 항목별 정산 투명 공개",
      ],
      reviewChecklistKo: [
        "근거 없는 효능 단정 표현이 없는가",
        "기술 메모가 고객 언어로 정확히 번역되었는가",
        "정산/약속 문구가 추적 가능한 형태인가",
      ],
    }
  }

  return {
    path,
    pathLabelKo: "효율의 길",
    storyKo: [
      `${input.brandName}은 현장 실행 속도를 높이기 위해 정보 구조를 단순화한다.`,
      `핵심 성분(${ingredients})과 기술 포인트를 한 번에 이해되도록 정리해 의사결정 시간을 줄인다.`,
      `${customer}이 빠르게 비교·선택할 수 있도록 메시지와 화면 흐름을 최적화한다.`,
    ].join(" "),
    landingHeroKo: `${input.brandName}, 빠르게 이해되고 바로 선택되는 구조`,
    landingSectionsKo: [
      "핵심 요약: 10초 이해 포인트",
      "성분/기술: 구매 전 확인해야 할 사실",
      "사용 시나리오: 상황별 선택 가이드",
      "운영 지표: 실행 속도, 재작업률, 정산 정확도",
    ],
    reviewChecklistKo: [
      "메시지가 10초 내 이해 가능한가",
      "중복 표현/장식 문구가 제거되었는가",
      "실행 KPI와 연결된 문장으로 구성되었는가",
    ],
  }
}

