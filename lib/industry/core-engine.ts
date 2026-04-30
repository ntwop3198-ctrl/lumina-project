import type { CoreBrandingEngine } from "./types"

/**
 * Core Branding Logic — 모든 산업에 동일하게 적용되는 추상 엔진.
 * (진단 파이프라인·LLM 시스템 프롬프트·내부 도구에서 이 객체를 주입)
 */
export const CORE_BRANDING_ENGINE: CoreBrandingEngine = {
  psychologicalObjectionHandling: {
    framework:
      "가격·신뢰·시간·비교 네 축에서 반박을 「재프레이밍 → 증거 → 리스크 역전 → 다음 행동」 순으로 처리한다.",
    moves: [
      {
        id: "reframe",
        title: "재프레이밍",
        description:
          "비용을 지출이 아닌 격 상승·시간 절감·오류 비용 제거로 재정의한다.",
      },
      {
        id: "evidence",
        title: "증거 스택",
        description:
          "감각적 디테일, 프로세스 투명성, 사회적 증거를 한 줄기 서사로 묶는다.",
      },
      {
        id: "risk_invert",
        title: "리스크 역전",
        description:
          "미실행 시 손실(기회·신뢰·재고·런칭 지연)을 명시하고 완화책을 제시한다.",
      },
      {
        id: "micro_commit",
        title: "마이크로 커밋",
        description:
          "저마찰 첫 행동(무료 분석·샘플·진단)으로 판단 부담을 낮춘다.",
      },
    ],
  },
  capitalEfficiency: {
    principles: [
      "한 번 만든 자산(카피·비주얼·구조)을 채널 간 재사용 가능한 모듈로 쪼갠다.",
      "검증 전에는 고정비보다 실험 단위비를 우선한다.",
      "브랜드 격은 「요소 개수」가 아니라 「결정 일관성」에서 나온다.",
    ],
    heuristics: [
      {
        id: "modular_reuse",
        title: "모듈 재사용",
        body: "히어로 클레임·증거 블록·CTA 리듬을 산업 템플릿 변수만 바꿔 재배치한다.",
      },
      {
        id: "sequential_proof",
        title: "순차적 증명",
        body: "저비용 진단 → 부분 납품 → 확장 계약 순으로 현금흐름과 신뢰를 동시에 쌓는다.",
      },
      {
        id: "premium_density",
        title: "명품 밀도",
        body: "화려함 대신 여백·타이포 계층·재질 언어로 단위 자본당 인지 프리미엄을 높인다.",
      },
    ],
  },
  luxuryNarrativeStructure: {
    acts: [
      {
        id: "tension",
        title: "긴장(The Noise)",
        purpose: "시장 소음과 내부 불안을 명명해 공감대를 형성한다.",
      },
      {
        id: "turn",
        title: "전환(The Breakthrough)",
        purpose: "자본·시간·역량의 한계를 체계로 넘는 순간을 선언한다.",
      },
      {
        id: "system",
        title: "체계(The Engines)",
        purpose: "반복 가능한 엔진(진단·서사·채널)을 나열해 신뢰를 만든다.",
      },
      {
        id: "bloom",
        title: "개화(The Bloom)",
        purpose: "고객의 이상적 상태를 감각적으로 묘사하고 CTA로 연결한다.",
      },
    ],
    bridgeToProduct:
      "서사의 마지막 문장은 항상 「지금 앱/플랫폼에서 실행 가능한 한 단계」와 직결된다.",
  },
}
