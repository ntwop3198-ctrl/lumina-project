import type { IndustryModule } from "../types"

export const COSMETIC_INDUSTRY_MODULE: IndustryModule = {
  id: "cosmetic",
  label: "코스메틱 · 뷰티",
  shortLabel: "Beauty",
  activation: "active",
  tone: {
    label: "감각적 정밀 · 클린 럭스",
    principles: [
      "성분·질감·루틴을 시각적 언어로 번역한다.",
      "과학은 낮은 톤, 혜택은 따뜻한 톤으로 분리한다.",
      "피부·시간에 대한 존중을 문장 끝 톤에 반영한다.",
    ],
    vocabularyHints: ["재질", "흡수", "광채", "밀도", "루틴", "피부 리듬"],
    avoid: ["과장된 의학 표현", "저가형 할인 언어 남용"],
  },
  visual: {
    id: "vx-cosmetic-porcelain",
    name: "Porcelain Grain · 샴페인 골드",
    grainIntensity: "subtle",
    accentSemantic: "warm_gold",
    surfaceBias: "soft_matte",
    description: "달항아리 미색 베이스, 로즈골드 액센트, 미세 그레인.",
  },
  defaultLayoutRefs: [
    "lb-hero-stacked-proof",
    "lb-service-hub-rail",
    "lb-roadmap-four-act",
    "lb-upload-diagnosis",
  ],
}
