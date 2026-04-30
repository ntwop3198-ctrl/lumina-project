/**
 * Luxury Scaling — 5엔진 확장 지도 (엔진 → 하부·시스템 → 하부·가치)
 * 파트너 투명성·글로벌 운영과 정합. 모욕·신체·특정 비하 표현 없음.
 */

export const SCALING_EXPANSION_SECTION_TITLE_KO = "다섯 엔진 — 1에서 100으로"
export const SCALING_EXPANSION_SECTION_TITLE_EN = "Five engines — from one to one hundred"

export const SCALING_EXPANSION_SECTION_LEAD_KO =
  "각 엔진을 펼치면 ‘시스템’이 선으로 드러나고, ‘글로벌 가치’는 루미나 확장 작업에 대응합니다."
export const SCALING_EXPANSION_SECTION_LEAD_EN =
  "Expand each engine: ‘system’ reads as a line; ‘global value’ maps to how Lumina scales."

export const SCALING_AXIS_SYSTEM_LABEL_KO = "하부 · 시스템"
export const SCALING_AXIS_SYSTEM_LABEL_EN = "Branch · System"

export const SCALING_AXIS_VALUE_LABEL_KO = "하부 · 가치"
export const SCALING_AXIS_VALUE_LABEL_EN = "Branch · Global value"

export type ScalingExpansionEngine = {
  id: string
  engineKo: string
  engineEn: string
  systemKo: string
  systemEn: string
  valueKo: string
  valueEn: string
}

export const SCALING_EXPANSION_ENGINES: readonly ScalingExpansionEngine[] = [
  {
    id: "radiance-assets",
    engineKo: "광휘 · 자산",
    engineEn: "Radiance · Assets",
    systemKo:
      "채널별 키 비주얼·컴포넌트·톤을 한 라이브러리로 묶어 생성·승인 파이프라인을 둔다.",
    systemEn:
      "One library for key visuals, components, and tone—paired with a create-and-approve pipeline.",
    valueKo:
      "하이엔드 시장에서도 동일한 ‘빛의 문법’으로 반복 노출될 때 브랜드가 기억에 남는다.",
    valueEn:
      "In premium markets, memory forms when the same grammar of light repeats with discipline.",
  },
  {
    id: "etiquette-market",
    engineKo: "예우 · 시장",
    engineEn: "Etiquette · Market",
    systemKo:
      "수수료·배분·정산을 기간·항목별로 읽을 수 있는 규칙과 응답 형태로 고정한다.",
    systemEn:
      "Lock fees, splits, and settlement into legible rules and API-shaped responses by period and line.",
    valueKo:
      "격식만의 럭셔리가 아니라, 인격적 신뢰가 기본값이 되는 운영이 글로벌 표준이 된다.",
    valueEn:
      "Global standard becomes operations where trust—not only polish—is the default.",
  },
  {
    id: "cadence-ops",
    engineKo: "리듬 · 운영",
    engineEn: "Cadence · Operations",
    systemKo:
      "캠페인 캘린더·에셋 승인·로트 QC를 한 타임라인에서 움직이게 맞춘다.",
    systemEn:
      "Run campaign cadence, asset approval, and lot QC on one coherent timeline.",
    valueKo:
      "대륙과 팀이 달라도 같은 템포를 공유할 때 브랜드가 흔들리지 않는다.",
    valueEn:
      "When continents share tempo, the brand stops wobbling under scale.",
  },
  {
    id: "alliance-ecosystem",
    engineKo: "연대 · 생태",
    engineEn: "Alliance · Ecosystem",
    systemKo:
      "샌드박스·파트너 가이드·나눔형 연동 초안이 같은 철학과 데이터 계층에 붙는다.",
    systemEn:
      "Sandbox, partner guide, and sharing-first integration drafts share one philosophy and data layer.",
    valueKo:
      "국경을 넘어도 동일한 본질 언어로 협업할 수 있는 파트너 생태가 열린다.",
    valueEn:
      "Partners can collaborate across borders in the same language of essence.",
  },
  {
    id: "order-trust",
    engineKo: "정돈 · 신뢰",
    engineEn: "Order · Trust",
    systemKo:
      "과장된 클레임·근거 없는 수치를 걷어내는 카피 리라이트와 라벨 검증 루프를 돌린다.",
    systemEn:
      "Run a rewrite and label loop that strips hype and ungrounded numbers.",
    valueKo:
      "시장이 읽는 ‘깨끗한 라벨’과 일치하는 서사가 장기 신뢰와 LTV를 만든다.",
    valueEn:
      "Narrative that matches a clean label earns long-term trust and LTV.",
  },
] as const
