import type { IndustryModule } from "../types"

export const FASHION_INDUSTRY_MODULE: IndustryModule = {
  id: "fashion",
  label: "패션 · 라이프스타일",
  shortLabel: "Fashion",
  activation: "coming_soon",
  tone: {
    label: "에디토리얼 · 실루엣 중심",
    principles: [
      "컷·드레이프·시즌 내러티브를 문장 리듬으로 옮긴다.",
      "톤은 잡지형 선언과 스토리텔링 혼합.",
      "가치는 「소재·제작 윤리·착용 맥락」 삼각으로 설명한다.",
    ],
    vocabularyHints: ["실루엣", "드레이프", "아카이브", "에디션", "텍스타일"],
    avoid: ["과도한 할인 리테일 톤", "유행어 남발"],
  },
  visual: {
    id: "vx-fashion-editorial",
    name: "Editorial Matte · 하이 콘트라스트",
    grainIntensity: "medium",
    accentSemantic: "warm_gold",
    surfaceBias: "paper",
    description: "페이퍼 텍스처, 강한 타이포 대비, 룩북형 여백.",
  },
  defaultLayoutRefs: [
    "lb-hero-stacked-proof",
    "lb-service-hub-rail",
    "lb-roadmap-four-act",
  ],
}
