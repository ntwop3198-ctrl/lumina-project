import type { IndustryModule } from "../types"

export const TECH_INDUSTRY_MODULE: IndustryModule = {
  id: "tech",
  label: "테크 · SaaS",
  shortLabel: "Tech",
  activation: "coming_soon",
  tone: {
    label: "정밀 · 신뢰 최우선",
    principles: [
      "기능은 벡터로, 이점은 시나리오로 설명한다.",
      "보안·가용성·통합은 숫자와 프로세스로 증명한다.",
      "과장 대신 「한계와 전제」를 명시해 신뢰를 얻는다.",
    ],
    vocabularyHints: ["레이턴시", "가용성", "워크플로", "API", "거버넌스"],
    avoid: ["불가능한 약속", "모호한 AI 만능 서사"],
  },
  visual: {
    id: "vx-tech-glass",
    name: "Glass Chrome · 미세 그리드",
    grainIntensity: "none",
    accentSemantic: "cool_chrome",
    surfaceBias: "glass",
    description: "얇은 글래스 레이어, 크롬 액센트, 옵션 네온 엣지.",
  },
  defaultLayoutRefs: [
    "lb-hero-stacked-proof",
    "lb-service-hub-rail",
    "lb-upload-diagnosis",
  ],
}
