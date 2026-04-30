/**
 * 삼求(求小·求苦·求己) — 루미나 삼기둥. 구소 헌장(求小·求己 일부)과 정합; **求苦**를 정직·한계 서술로 명시.
 * `LUMINA_TRINITY_CHARTER=0` 비활성.
 */

export const TRINITY_CANONICAL_LINES = [
  "三求",
  "",
  "求小 — 작은 진실·미세한 질감에서 본질을 본다.",
  "求苦 — 달콤한 연기보다 투박한 정직·한계를 외면하지 않는다.",
  "求己 — 佛·허명이 아니라 브랜드 본연(己)의 목소리에 선다.",
] as const

export const TRINITY_CHARTER_GLOSS_KO =
  "**求小(구소)**: 거창한 담론보다 디테일·원료·여백·아담한 용기와 카드 같은 **작은 데서 우주를 읽는다** — 전문 시구는 `guso-charter.ts`와 같이 간다. **求苦(구고)**: 불편·배치차·짧은 유통기한 등 **사실로 확인되는 한계**를 가리지 않고, 치료·기적로 바꾸지 않는 선에서 서술한다. **求己(구기)**: 트렌드·타인의 권위(佛)를 앞세우기보다 **그 브랜드만의 서사·팩트**를 캐낸다."

export const TRINITY_CHARTER_GLOSS_EN =
  "**Qiú xiǎo (Guso)**: read essence in detail, material, restraint — full lines live in `guso-charter.ts`. **Qiú kǔ**: do not hide **fact-bound** limits (variance, short dating, inconvenience); never reframe them as cure or miracle. **Qiú jǐ**: mine the brand’s own voice and facts before trend slang or borrowed authority."

export const LUMINA_TRINITY_COMPLIANCE_PRINCIPLE_KO =
  "三求: **求小**는 구소와 같이 가고, **求苦**는 허위 없는 한계·정직, **求己**는 브랜드 중심 서술 — 플랫폼 과시·만능 서사 금지."

/** 카드·히어로용 한 줄(2030 영-니치 톤). ‘세포’ 등은 시적 메타포로만 쓰고 의료 단정으로 읽히게 쓰지 않는다. */
export const TRINITY_ONE_LINE_ORIGIN_GUSO_KO =
  "거대한 포장의 허상을 지우고, 당신의 피부가 마주할 가장 작은 입자와 세포의 진실에만 집착합니다."

export const TRINITY_ONE_LINE_ORIGIN_GUGO_KO =
  "매끈한 인공의 달콤함 대신, 원료 고유의 거친 향과 짧은 생명력이라는 ‘정직한 불편함’을 기꺼이 선택합니다."

export const TRINITY_ONE_LINE_ORIGIN_GUGI_KO =
  "세상의 유행과 이름(名)을 쫓지 않고, 오직 우리 브랜드가 가진 날것 그대로의 본질(己)만을 오롯이 증명합니다."

/** 삼求 통합 마스터 슬로건 — Lumina Origin · Naked */
export const LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_KO =
  "가장 작은 것에 미쳐 있고, 가장 정직하게 불편하며, 오직 우리만의 길을 걷는 것—이것이 루미나가 당신에게 바치는 알몸(Naked)의 진실입니다."

export const TRINITY_ONE_LINE_ORIGIN_GUSO_EN =
  "We erase the illusion of grand packaging and fixate only on the smallest particles — the truth your skin meets at its threshold."

export const TRINITY_ONE_LINE_ORIGIN_GUGO_EN =
  "Rather than smooth artificial sweetness, we choose the honest inconvenience of raw scent and a shorter vitality window."

export const TRINITY_ONE_LINE_ORIGIN_GUGI_EN =
  "We chase neither trends nor hollow fame — we prove only the unvarnished essence that is ours alone."

export const LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_EN =
  "Obsessed with the smallest truth, choosing honest discomfort, walking only our own path — this is the naked truth Lumina offers you."

export function isTrinityCharterEnabled(): boolean {
  return process.env.LUMINA_TRINITY_CHARTER?.trim() !== "0"
}

export function buildTrinityCharterPromptAppendix(): string {
  if (!isTrinityCharterEnabled()) return ""
  return `
## 루미나 삼求 (求小 · 求苦 · 求己 — 마스터 기둥)
요지: ${TRINITY_CHARTER_GLOSS_KO}
- **求小**: 비주얼·카피에서 **의미 있는 미세 요소**(제형·굴절·타이포 여백)를 우선하고, 화려한 배경·빈 수퍼라티브로 덮지 않는다. (구소 헌장 블록과 **함께** 적용.)
- **求苦**: 단점·불편을 **사실 범위**에서 서술하고, vulnerability·dual-synchro 계열과 모순되지 않게 한다. **‘고귀한 고집’** 수사는 **근거가 있을 때만** 제한적으로.
- **求己**: 출력의 주인공은 **클라이언트 브랜드·제품**; 시장 유행어·검증 불가 AI 자랑으로 己를 대체하지 않는다.
- **금지**: 미검증 **0.1mm** 등 숫자 과시; 한계를 **의료 효과**로 둔갑; 求苦를 **소비자 불안 조장**으로 쓰기.

**카드·히어로 참고(한 줄 정의)**  
- **求小**: ${TRINITY_ONE_LINE_ORIGIN_GUSO_KO}
- **求苦**: ${TRINITY_ONE_LINE_ORIGIN_GUGO_KO}
- **求己**: ${TRINITY_ONE_LINE_ORIGIN_GUGI_KO}
- **통합 선언(참고)**: ${LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_KO}`
}
