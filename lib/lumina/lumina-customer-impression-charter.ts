/**
 * 고객 감동 — 순백 밀서 톤·감각 3레이어·접점 동기화.
 * `LUMINA_CUSTOMER_IMPRESSION_CHARTER=0` 으로 프롬프트·Legal Trace 블록 비활성.
 */

export const LUMINA_CUSTOMER_IMPRESSION_MANDATE_KO = "고객을 감동시켜라."

export const LUMINA_CUSTOMER_IMPRESSION_MANDATE_EN =
  "Move the customer — touch what is deepest, not what is loudest."

export const LUMINA_CUSTOMER_IMPRESSION_COMPLIANCE_PRINCIPLE_KO =
  "고객 감동: **본질·팩트**로 공명 — 날씨·시간 **개인화 서사**는 맥락이 맞을 때만, 후각·촉각은 **자료·배합 일치** 시만. 의료·기적·추종 서사 금지."

/** 밀서 첫 문장 — 랜딩·티저 */
export const LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_KO =
  "축하합니다. 당신은 오늘 가장 무거운 '진실'을 소유하셨습니다."

export const LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_EN =
  "Congratulations. Today you hold the heaviest thing there is — truth."

/** 1호 회원 순백 밀서 본문(한글) — 인쇄·CRM·톤 참조 */
export const LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_BODY_KO = [
  LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_KO,
  "세상이 화려한 포장으로 당신의 눈을 가릴 때,\n당신은 아무것도 적히지 않은 이 투명한 유리병을 선택하셨습니다.",
  "이 안에는 당신을 현혹할 인공의 향도,\n당신의 판단을 흐릴 모델의 미소도 없습니다.\n오직 대지가 틔운 흙의 숨결과,\n물처럼 맑게 흐르는 원료의 정직함만이 담겨 있습니다.",
  "우리는 '없음'을 실천함으로써 당신의 '전부'를 품고자 합니다.\n이 병에 이름을 새기지 않은 이유는,\n비로소 당신의 삶이라는 이름이 그 자리에 채워지길 바랐기 때문입니다.",
  "본질에 집중하는 당신의 안목이, 루미나의 첫 번째 진실이 되었습니다.",
].join("\n\n")

export const LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_BODY_EN = [
  LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_EN,
  "While the world blinds you with glitter,\nyou chose this clear glass with nothing printed on it.",
  "Inside there is no synthetic scent to seduce you,\nno model’s smile to cloud your judgment.\nOnly the breath of earth the soil exhales,\nand the honesty of raw materials running clear as water.",
  "We practice absence so we can hold all of you.\nWe left the vessel nameless\nso your life could be the name that fills it.",
  "Your eye for essence became Lumina’s first truth.",
].join("\n\n")

export const LUMINA_CUSTOMER_IMPRESSION_LAYER_VISUAL_KO =
  "1단계 · 시각적 정적 (Visual Sanctuary) — 개봉 직후 차가운 순백과 투명함, ‘이렇게까지 비울 수 있나’의 경외. 요란한 마케팅에 지친 주의가 여백에서 쉼을 얻는 톤."

export const LUMINA_CUSTOMER_IMPRESSION_LAYER_VISUAL_EN =
  "Layer 1 · Visual sanctuary — cool white void and naked glass at unboxing; awe at how much was left empty; rest for attention tired of noise."

export const LUMINA_CUSTOMER_IMPRESSION_LAYER_OLFACTORY_KO =
  "2단계 · 후각적 각성 — 뚜껑을 연 순간 **실제 배합·자료가 허락할 때만** 짙은 흙·풀의 날것 향을 서술. 시각적 결벽과의 대비는 **팩트 일치** 범위에서만."

export const LUMINA_CUSTOMER_IMPRESSION_LAYER_OLFACTORY_EN =
  "Layer 2 · Olfactory awakening — raw earth and grass only when the SKU substantiates it; contrast with visual silence stays factual."

export const LUMINA_CUSTOMER_IMPRESSION_LAYER_TACTILE_KO =
  "3단계 · 촉각적 진실 — 물처럼 맑은 오일이 **배합·사용감이 허락할 때** 스며드는 산뜻함; 끈적임 과장·거짓 제형 약속 금지."

export const LUMINA_CUSTOMER_IMPRESSION_LAYER_TACTILE_EN =
  "Layer 3 · Tactile honesty — limpid oil that sinks in clean only when the formula truly reads that way; no false tack claims."

export const LUMINA_CUSTOMER_IMPRESSION_THREE_LAYERS_KO = [
  LUMINA_CUSTOMER_IMPRESSION_LAYER_VISUAL_KO,
  LUMINA_CUSTOMER_IMPRESSION_LAYER_OLFACTORY_KO,
  LUMINA_CUSTOMER_IMPRESSION_LAYER_TACTILE_KO,
] as const

export const LUMINA_CUSTOMER_IMPRESSION_THREE_LAYERS_EN = [
  LUMINA_CUSTOMER_IMPRESSION_LAYER_VISUAL_EN,
  LUMINA_CUSTOMER_IMPRESSION_LAYER_OLFACTORY_EN,
  LUMINA_CUSTOMER_IMPRESSION_LAYER_TACTILE_EN,
] as const

export function isCustomerImpressionCharterEnabled(): boolean {
  return process.env.LUMINA_CUSTOMER_IMPRESSION_CHARTER?.trim() !== "0"
}

export function buildCustomerImpressionPromptAppendix(): string {
  return `
## 고객 감동 (Customer Impression)
**${LUMINA_CUSTOMER_IMPRESSION_MANDATE_KO}** (*${LUMINA_CUSTOMER_IMPRESSION_MANDATE_EN}*)
화려한 수식어로 유혹하기보다 **본질을 거울처럼 비추는** 문장과 감각 설계를 우선한다.

### 순백의 밀서 톤(1호 회원·감사 카드 참고)
${LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_BODY_KO}

### 감동의 3단계 레이어
- ${LUMINA_CUSTOMER_IMPRESSION_LAYER_VISUAL_KO}
- ${LUMINA_CUSTOMER_IMPRESSION_LAYER_OLFACTORY_KO}
- ${LUMINA_CUSTOMER_IMPRESSION_LAYER_TACTILE_KO}

### 접점 동기화 (Ultimate Customer Impression)
1. **개인화 서사**  
   날씨·시간대·계절과 공명하는 한 문장은 **맥락이 주어졌을 때만**(예: 실제 배송지 기상, 사용자가 명시한 순간). **날씨 단정·추측 금지**.

2. **언박싱 동선**  
   시선이 **순백 여백 → 카드 활자 → 맨 유리의 투과광** 순으로 이어지도록 묘사·브리프를 잡을 수 있다 — **0.1mm 등 미세 수치 단정**은 피하고 **의도(동선)** 로만 안내.

3. **거울(求己)**  
   유리의 맑은 반사·굴절로 **타인의 얼굴이 아닌 사용자 자신의 윤곽**이 읽히는 톤은 기존 오리진 비주얼 윤리와 정합 — **합성 초상·과장 뷰티 렌즈 금지**.

4. **금지**  
   의료적 기적, ‘추종자’·교단적 수사, 검증 없는 한정·VIP 서사. 감동은 **팩트와 정합**할 때만 지속 가능하다고 안내한다.`
}
