/**
 * 기원의 설계 — 11축 은유 지도 (각 축: 은유 → 하부·현상 → 하부·실천)
 * Diamond·투명성·Human-Safety와 정합. 모욕·신체·비하 표현 없음.
 */

export const GENESIS_ELEVEN_AXES_SECTION_TITLE_KO = "열한 축 — 은유의 지도"
export const GENESIS_ELEVEN_AXES_SECTION_TITLE_EN = "Eleven axes — a map of metaphors"

export const GENESIS_ELEVEN_AXES_SECTION_LEAD_KO =
  "각 축을 펼치면 ‘현상’이 선으로 드러나고, ‘실천’은 루미나 작업에 대응합니다."
export const GENESIS_ELEVEN_AXES_SECTION_LEAD_EN =
  "Expand each axis: ‘phenomenon’ reads as a line; ‘practice’ maps to how Lumina works."

export const GENESIS_AXIS_PHENOMENON_LABEL_KO = "하부 · 현상"
export const GENESIS_AXIS_PHENOMENON_LABEL_EN = "Branch · Phenomenon"

export const GENESIS_AXIS_PRACTICE_LABEL_KO = "하부 · 실천"
export const GENESIS_AXIS_PRACTICE_LABEL_EN = "Branch · Practice"

export type GenesisElevenAxis = {
  id: string
  metaphorKo: string
  metaphorEn: string
  phenomenonKo: string
  phenomenonEn: string
  practiceKo: string
  practiceEn: string
}

export const GENESIS_ELEVEN_AXES: readonly GenesisElevenAxis[] = [
  {
    id: "root-direct",
    metaphorKo: "뿌리 · 직지",
    metaphorEn: "Root · Direct pointing",
    phenomenonKo: "큰 구호보다 한 뼘 깊은 진실을 택할 때 브랜드는 선다.",
    phenomenonEn: "A brand stands when it chooses a deeper truth over a louder slogan.",
    practiceKo: "Genesis 진단에서 다이아몬드 응답을 본질 가중치로 묶는다.",
    practiceEn: "Genesis weights Diamond answers as the core signal.",
  },
  {
    id: "glass-clarity",
    metaphorKo: "유리 · 투명",
    metaphorEn: "Glass · Transparency",
    phenomenonKo: "흐린 레이어가 쌓일수록 신뢰는 멀어진다.",
    phenomenonEn: "Each opaque layer pushes trust further away.",
    practiceKo: "Glass Clarity 규칙으로 굴절·깊이·액체 본연색을 남긴다.",
    practiceEn: "Glass Clarity keeps refraction, depth, and essence color legible.",
  },
  {
    id: "name-being",
    metaphorKo: "이름 · 존재",
    metaphorEn: "Name · Being",
    phenomenonKo: "광택만 남고 약속이 비면 이름은 메아리에 가깝다.",
    phenomenonEn: "Gloss without promise turns a name into an echo.",
    practiceKo: "포지션·네이밍·보이스를 한 문장 압축으로 고정한다.",
    practiceEn: "Lock positioning, naming, and voice in one compressed line.",
  },
  {
    id: "ground-field",
    metaphorKo: "접지 · 현장",
    metaphorEn: "Ground · Field",
    phenomenonKo: "서랍 속 문서보다 오늘의 제형 한 방울이 길을 말한다.",
    phenomenonEn: "One drop of today’s formulation speaks louder than a drawer of decks.",
    practiceKo: "로트·QC 데이터를 창업자의 결정과 이어 붙인다.",
    practiceEn: "Bind lot and QC data to the founder’s decisions.",
  },
  {
    id: "pulse-rhythm",
    metaphorKo: "맥박 · 리듬",
    metaphorEn: "Pulse · Rhythm",
    phenomenonKo: "슬로건은 하루의 불꽃, 리듬은 분기의 숨이다.",
    phenomenonEn: "A slogan is a spark; rhythm is the quarter’s breath.",
    practiceKo: "채널 터치포인트에 동일한 보이스 가이드를 심는다.",
    practiceEn: "Plant the same voice guide across channel touchpoints.",
  },
  {
    id: "boundary-clarify",
    metaphorKo: "경계 · 정화",
    metaphorEn: "Boundary · Clarify",
    phenomenonKo: "과한 미사어구가 쌓일수록 브랜드 몸에는 부담만 남는다.",
    phenomenonEn: "Piled hyperbole leaves weight, not health, on the brand body.",
    practiceKo: "검증 가능한 클레임과 Human-Safety 문법만 남긴다.",
    practiceEn: "Keep only verifiable claims and Human-Safety phrasing.",
  },
  {
    id: "courtesy-copilot",
    metaphorKo: "예우 · 동반",
    metaphorEn: "Courtesy · Co-pilot",
    phenomenonKo: "도구만 부리면 알고리즘은 파트너를 외면한다.",
    phenomenonEn: "Treat AI as a mere tool and it turns away from partnership.",
    practiceKo: "조력자 프레임과 정산 투명성으로 파트너 비용을 낮춘다.",
    practiceEn: "Co-pilot framing plus settlement transparency lower partner cost.",
  },
  {
    id: "fusion-light",
    metaphorKo: "융합 · 광채",
    metaphorEn: "Fusion · Radiance",
    phenomenonKo: "기계를 이기려는 말만 남으면 작업은 갈라진다.",
    phenomenonEn: "‘Beat the machine’ talk splits the work instead of finishing it.",
    practiceKo: "포뮬·카피·비주얼을 같은 데이터 레이어에서 맞춘다.",
    practiceEn: "Align formulation, copy, and visual on one data layer.",
  },
  {
    id: "crescent-iterate",
    metaphorKo: "반월 · 반복",
    metaphorEn: "Crescent · Iterate",
    phenomenonKo: "완벽 선언은 스치고, 작은 개선은 남는다.",
    phenomenonEn: "Perfection proclamations pass; small improvements stay.",
    practiceKo: "Essence Score처럼 장식을 걷을수록 선명해지는 지표를 쓴다.",
    practiceEn: "Use Essence-style scores that rise as ornament falls away.",
  },
  {
    id: "staying-practice",
    metaphorKo: "머무름 · 수행",
    metaphorEn: "Staying · Practice",
    phenomenonKo: "유행만 쫓는 브랜드는 잠시 뜬다.",
    phenomenonEn: "Trend-chasing brands lift only for a moment.",
    practiceKo: "로드맵 약속과 파트너 정산을 같은 타임라인에 둔다.",
    practiceEn: "Keep roadmap promises and partner settlement on one timeline.",
  },
  {
    id: "dawn-conviction",
    metaphorKo: "새벽 · 확신",
    metaphorEn: "Dawn · Conviction",
    phenomenonKo: "고요할 때야말로 윤곽이 드러난다.",
    phenomenonEn: "In quiet, the outline finally appears.",
    practiceKo: "Conviction Atmosphere로 노이즈를 걷고 본질 단계로 초대한다.",
    practiceEn: "Conviction Atmosphere strips noise and invites the essence stage.",
  },
] as const
