import type { IndustryId, LayoutPatternRecord } from "./types"

/**
 * Knowledge Bridge — 코스메틱 등에서 검증된 레이아웃 DNA를 ID로 고정해
 * 다른 산업 모듈이 동일 구조를 참조·포크할 수 있게 한다.
 */
export const LAYOUT_PATTERN_LIBRARY: LayoutPatternRecord[] = [
  {
    id: "lb-hero-stacked-proof",
    name: "히어로 · 스택드 프루프",
    sourceIndustry: "cosmetic",
    validatedIn: ["cosmetic"],
    structure: {
      sections: ["hero_headline", "sub_copy_stack", "trust_chips", "primary_cta"],
      density: "balanced",
      ctaRhythm: "1차 CTA(저마찰) → 스크롤 후 2차 CTA(구체 행동)",
    },
    transferableNotes:
      "헤드라인-서브-증거의 수직 스택은 패션·테크에서도 제품 카테고리명만 치환하면 재사용 가능.",
  },
  {
    id: "lb-service-hub-rail",
    name: "서비스 허브 · 레일 내비",
    sourceIndustry: "cosmetic",
    validatedIn: ["cosmetic"],
    structure: {
      sections: ["sticky_rail", "module_tiles", "cross_links"],
      density: "dense",
      ctaRhythm: "모듈 카드마다 보조 CTA, 하단에 통합 CTA",
    },
    transferableNotes:
      "가로 레일+타일 그리드는 SKU가 많은 테크·컬렉션이 큰 패션에 그대로 이식하기 좋음.",
  },
  {
    id: "lb-roadmap-four-act",
    name: "로드맵 · 4막 서사",
    sourceIndustry: "cosmetic",
    validatedIn: ["cosmetic"],
    structure: {
      sections: ["noise", "breakthrough", "engines", "bloom"],
      density: "sparse",
      ctaRhythm: "막 전환마다 앵커 CTA 없이 마지막에 단일 강한 CTA",
    },
    transferableNotes:
      "4막 구조는 Core luxury narrative와 1:1 매핑 — 산업 템플릿은 카피와 질감만 교체.",
  },
  {
    id: "lb-upload-diagnosis",
    name: "업로드 · 진단 결과 레일",
    sourceIndustry: "cosmetic",
    validatedIn: ["cosmetic"],
    structure: {
      sections: ["drop_zone", "progress_states", "score_summary", "action_items"],
      density: "balanced",
      ctaRhythm: "업로드 직후 미리보기 → 결과 후 「다음 최적 행동」 단일 버튼",
    },
    transferableNotes:
      "파일 타입·스코어 카드 라벨만 산업별로 바꾸면 F&B·패션 리스크 진단에 공용.",
  },
]

export function getLayoutPatternById(id: string): LayoutPatternRecord | undefined {
  return LAYOUT_PATTERN_LIBRARY.find((p) => p.id === id)
}

/** 특정 산업이 참조 가능한 패턴(출처 + 이미 검증된 교차 산업) */
export function getBridgeablePatternsForIndustry(industry: IndustryId): LayoutPatternRecord[] {
  return LAYOUT_PATTERN_LIBRARY.filter(
    (p) => p.sourceIndustry === industry || p.validatedIn.includes(industry),
  )
}

export function registerLayoutValidation(
  patternId: string,
  industry: IndustryId,
): LayoutPatternRecord | undefined {
  const p = getLayoutPatternById(patternId)
  if (!p) return undefined
  if (p.validatedIn.includes(industry)) return p
  return { ...p, validatedIn: [...p.validatedIn, industry] }
}
