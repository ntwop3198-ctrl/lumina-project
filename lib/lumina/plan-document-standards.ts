/**
 * Knowledge Engine 기획서 — 레이아웃·데이터·카피 표준
 *
 * ## 문서 계층 (렌더 순서)
 * 1. `intro` — 메타·기획 톤(알고리즘)·주의 블록
 * 2. `steps[5]` — 결핍 → 소통 (각 `headingLine` + `body`)
 * 3. `appendix` — 부록 체크리스트
 * 4. `serviceScope` — 무료/유료 범위 안내
 * 5. (마스터만) `buildLuminaMasterExecutionAnnexMarkdown` — 제조·원가·인증·마케팅·90일·면책
 *
 * 타입: `LuminaPlanFields`, `LuminaMasterExtraFields`, `LuminaPlanAlgorithm` (`knowledge-engine-plan*.ts`)
 */

/** `LuminaPlanFields`와 동일 형태 (순환 import 방지) */
export type PlanFieldsInput = {
  brandName: string
  targetAudience: string
  priceRange: string
  channel: string
  products: string
  differentiator: string
}

/** 사전 정의 고유명사 (스펠링 고정 — 사용자 입력 교정 시 대조) */
export const PLAN_CANONICAL_NAMES = {
  brandEn: "LUMINA",
  /** 파트너·제품 코드명 등 문맥에 따라 사용 */
  n2p: "N2P",
  beena: "Beena",
} as const

/**
 * 흔한 오타·띄어쓰기 — 문맥상 명확한 비즈니스 용어로 교정 (공격적 치환 지양)
 */
const TYPO_NORMALIZATIONS: ReadonlyArray<[RegExp, string]> = [
  [/상세\s*기핵서/g, "상세 기획서"],
  [/상세기핵서/g, "상세 기획서"],
  [/상세기획서/g, "상세 기획서"],
  [/O\s*E\s*M/gi, "OEM"],
  [/O\s*D\s*M/gi, "ODM"],
  [/M\s*O\s*Q/gi, "MOQ"],
  [/H\s*S\s*코드/gi, "HS Code"],
  [/루미\s*나/g, "루미나"],
  [/Lummina/gi, "LUMINA"],
  [/\bLumia\b/gi, "LUMINA"],
]

/** 영문 브랜드 흔한 오타 → 표기 통일 (단어 경계 근처) */
const BRAND_EN_FIXES: ReadonlyArray<[RegExp, string]> = [
  [/\bN\s*2\s*P\b/gi, PLAN_CANONICAL_NAMES.n2p],
  [/\bBeena\b/gi, PLAN_CANONICAL_NAMES.beena],
  [/\bBEENA\b/g, PLAN_CANONICAL_NAMES.beena],
]

/**
 * 사용자·생성 혼입 텍스트에 오타 방지·고유명사 정렬 적용
 */
export function applyPlanCopyGuards(text: string): string {
  if (!text) return text
  let out = text
  for (const [re, rep] of TYPO_NORMALIZATIONS) {
    out = out.replace(re, rep)
  }
  for (const [re, rep] of BRAND_EN_FIXES) {
    out = out.replace(re, rep)
  }
  return out
}

export function normalizePlanFields<T extends PlanFieldsInput>(fields: T): T {
  return {
    ...fields,
    brandName: applyPlanCopyGuards(fields.brandName.trim()),
    targetAudience: applyPlanCopyGuards(fields.targetAudience.trim()),
    priceRange: applyPlanCopyGuards(fields.priceRange.trim()),
    channel: applyPlanCopyGuards(fields.channel.trim()),
    products: applyPlanCopyGuards(fields.products.trim()),
    differentiator: applyPlanCopyGuards(fields.differentiator.trim()),
  }
}
