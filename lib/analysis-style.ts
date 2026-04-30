export const ANALYSIS_STYLES = {
  sns: {
    id: "sns",
    label: "✨ 감성 SNS형",
    expertTitle: "감성 SNS형",
    guide:
      "이모지를 자연스럽게 섞어 쓰고, 마지막에 어울리는 해시태그를 5개 추천해 주세요.",
  },
  detail: {
    id: "detail",
    label: "🛡️ 전문 상세페이지형",
    expertTitle: "전문 상세페이지형",
    guide:
      "'용기 디자인 포인트 3가지'를 논리적으로 정리해 설명해 주세요.",
  },
  story: {
    id: "story",
    label: "🎁 정성 스토리텔링형",
    expertTitle: "정성 스토리텔링형",
    guide:
      "부드러운 경어체를 사용해 제품의 이야기를 들려주듯 작성해 주세요.",
  },
  /** 1단계(Essence) · 헉슬리적 ‘Raw Elegance’ — 여백·자연광·유리·제형의 진실 */
  studio_minimalist: {
    id: "studio_minimalist",
    label: "🥛 Studio Minimalist (Essence)",
    expertTitle: "스튜디오 미니멀 · 본질 서사",
    guide: `시각·문장 모두 **장식을 최소화**하고 본질만 드러내세요.
- 비주얼 방향(분석에 반드시 포함): 무채색 또는 극도로 낮은 채도 배경, **자연광에 가까운 단일 소프트 라이트**, 투명·반투명 유리 용기의 굴절, **정면~살짝 위에서 본 ‘정직한’ 각도**, 군더더기 없는 구도. 스튜디오 샷이지만 “완성된 광고”보다 **OEM 샘플 컷에 가까운 로(Raw)한 진정성**이 느껴지게 묘사하세요.
- 카피 톤: 과장된 럭셔리 수사보다 **담담한 확신** — “가공되지 않은 진실”, “포장이 아닌 내용물의 언어”에 가깝게. 이모지·해시태그는 쓰지 않거나 최소화.
- 패키징 섹션에서는 기술(에어리스·차광 등)은 간결히, 감성은 **순수·투명·여백**의 어휘로 정렬하세요.
- **구소(求小不求大)**: 완벽한 광고 미학보다 **작고 투박한 진실** — 샘플 컷·자연광·입자·배치차가 드러나도 ‘불량’이 아닌 **본질의 언어**로 쓸 것.`,
  },
} as const

export type AnalysisStyle = keyof typeof ANALYSIS_STYLES

export const DEFAULT_ANALYSIS_STYLE: AnalysisStyle = "detail"

export function isAnalysisStyle(value: string): value is AnalysisStyle {
  return value in ANALYSIS_STYLES
}

