/**
 * 제1 원칙 — 본질·근원·사실 (Triple Access). 작업 윤리 / 리서치·디자인·커뮤니케이션.
 * `LUMINA_FIRST_PRINCIPLE_CHARTER=0` 으로 프롬프트·Legal Trace 블록 비활성(랜딩·대시보드 문구는 상수 그대로 노출 가능).
 */

export const LUMINA_FIRST_PRINCIPLE_KO =
  "본질에 집중하고 근원에 충실하여 사실에 접근한다."

export const LUMINA_FIRST_PRINCIPLE_EN =
  "We focus on essence, stay faithful to origin, and approach the fact."

export const LUMINA_FIRST_PRINCIPLE_COMPLIANCE_PRINCIPLE_KO =
  "제1원칙: **본질**·**근원**·**사실** — 팩트 없는 본질 논의 금지, 근거 카피, 리서치는 원료·초심에서."

/** 랜딩·온보딩용 — 트리플 액세스 한 줄씩 */
export const LUMINA_FIRST_PRINCIPLE_TRIPLE_ACCESS_KO = [
  "본질 · 이 기능·이 수식어·이 주장이 **정말 필요하고 진실한가**를 끊임없이 묻는다.",
  "근원 · 겉현상이 아니라 **원료·산지·초심·물리적 성질** 같은 뿌리를 파고든다.",
  "사실 · 마케팅 과장·희망사항을 걷어내고 **데이터와 날것**을 직시한다.",
] as const

export const LUMINA_FIRST_PRINCIPLE_TRIPLE_ACCESS_EN = [
  "Essence · keep asking whether this feature, modifier, or claim is **truly needed and true**.",
  "Origin · dig past surface into **source, terroir, founding intent, physical facts**.",
  "Fact · strip hype and wishful framing; face **data and raw signal**.",
] as const

export const LUMINA_FIRST_PRINCIPLE_RDC_KO = {
  research:
    "브랜딩의 시작은 검색만이 아니라 **원료의 근원**과 **리더의 고통·초심**을 인터뷰하는 데서 시작한다.",
  design:
    "사실을 왜곡하는 필터·보정을 거부하고, **있는 그대로의 질감**을 신뢰한다.",
  communication:
    "팩트가 준비되지 않았다면 본질을 논하지 않는다 — 말은 **근거 있는 고집**이어야 한다.",
} as const

export const LUMINA_FIRST_PRINCIPLE_RDC_EN = {
  research:
    "Research begins not only with search but with **material provenance** and the **founder’s pain and first intent**.",
  design:
    "Reject filters and corrections that distort truth; trust **texture as it is**.",
  communication:
    "Do not argue essence before facts are ready — copy must be **stubborn with evidence**.",
} as const

export function isFirstPrincipleCharterEnabled(): boolean {
  return process.env.LUMINA_FIRST_PRINCIPLE_CHARTER?.trim() !== "0"
}

export function buildFirstPrinciplePromptAppendix(): string {
  return `
## 루미나 제1 원칙 (작업 윤리 · Triple Access)
**${LUMINA_FIRST_PRINCIPLE_KO}**

1. **본질(Essence)**: 불필요한 기능·과한 수식어·근거 없는 주장을 걷어내고, 남는 **단 하나의 이유**에 충실한다.
2. **근원(Origin)**: 유행만이 아니라 **원료·산지·초심·물리**까지 추적 가능한 서사만 쓴다. 추측으로 역사를 만들지 않는다.
3. **사실(Fact)**: "최고" 같은 빈 주장 대신 **검증 가능한 관측·수치·출처**로 말한다. 사진·라벨에 없는 것은 단정하지 않는다.

**실무 동기화(참고)**  
- 리서치: ${LUMINA_FIRST_PRINCIPLE_RDC_KO.research}  
- 디자인: ${LUMINA_FIRST_PRINCIPLE_RDC_KO.design}  
- 커뮤니케이션: ${LUMINA_FIRST_PRINCIPLE_RDC_KO.communication}`
}
