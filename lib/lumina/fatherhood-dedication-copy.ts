/**
 * Fatherhood dedication — family trust charter (KO/EN)
 * 코드 동기: scripts/lumina_three_step_family_safety.py · scripts/lumina_fatherhood_soft_shield.py
 *
 * 주의: 강제 음주·모욕·사적 보복을 조장하는 문구는 넣지 않습니다.
 *       ‘사위 검증’은 시간·맥락 속 관찰과 식탁 예의, 안전(학대·위협 시 제도)입니다.
 */

/** 한 줄 헌사 — 딸을 사랑하는 모든 아버지에게 */
export const LUMINA_FATHERHOOD_DEDICATION_LINE_KO =
  "가족 신뢰를 세우는 이 세 기준을, 세상의 모든 딸바보 아빠들에게 바칩니다."

export const LUMINA_FATHERHOOD_DEDICATION_LINE_EN =
  "We dedicate these three pillars of family trust to every father who loves his daughter."

/** 선언 머리말 */
export const LUMINA_FATHERHOOD_CHARTER_PRELUDE_KO =
  "우리는 전사이기 전에 아빠이며, 수호자이기 전에 사랑이다. 단호함이 필요할 때도 법과 질서 안에서 움직인다."

export const LUMINA_FATHERHOOD_CHARTER_PRELUDE_EN =
  "Before warrior, father; before guardian, love. When firmness is needed, it moves within law and care."

/** 제1조 — 본심: 강요 없는 관찰 */
export const LUMINA_FATHERHOOD_CHARTER_ARTICLE_1_KO =
  "제1조 — 본심(本心)의 관찰: 술잔으로 사람을 시험하지 않는다. 평소의 약속·말과 행동의 일치·어려울 때의 태도에서 성품을 본다. 동의 없는 굴욕·강요는 하지 않는다."

export const LUMINA_FATHERHOOD_CHARTER_ARTICLE_1_EN =
  "Article 1 — Character: We do not use alcohol as a humiliation test. We read steadiness in everyday promises, alignment of words and acts, and conduct under pressure. No coerced rituals."

/** 제2조 — 순리: 식탁과 나눔 */
export const LUMINA_FATHERHOOD_CHARTER_ARTICLE_2_KO =
  "제2조 — 순리(順理)의 실천: 귀한 대접에는 감사가 먼저이고, 연약한 이와 어른을 배려하는 순서가 있다. 나눔과 예의는 이기심과 구분되는 징표다."

export const LUMINA_FATHERHOOD_CHARTER_ARTICLE_2_EN =
  "Article 2 — Courtesy: For a generous table, gratitude comes first; care flows to the vulnerable and elders. Sharing and manners distinguish selflessness from selfish appetite."

/** 제3조 — 안전: 제도와 경계 (사적 보복 아님) */
export const LUMINA_FATHERHOOD_CHARTER_ARTICLE_3_KO =
  "제3조 — 안전(安全)의 의무: 아동·배우자에게 해를 끼치거나 위협하는 행동에는 침묵하지 않는다. 즉시 안전 조치·신고·전문 기관·필요 시 법적 절차를 택한다. 사적 보복은 또 다른 재앙을 낳는다."

export const LUMINA_FATHERHOOD_CHARTER_ARTICLE_3_EN =
  "Article 3 — Safety: We do not stay silent when children or partners are harmed or credibly threatened. We act: safety first, reporting, professional help, legal routes when needed. Vigilantism deepens harm."

export type LuminaFatherhoodCharterLang = "ko" | "en" | "zh"

/** UI·리포트용 블록 조립 */
export function buildLuminaFatherhoodCharterBlock(lang: LuminaFatherhoodCharterLang): string {
  if (lang === "en" || lang === "zh") {
    return [
      LUMINA_FATHERHOOD_DEDICATION_LINE_EN,
      "",
      LUMINA_FATHERHOOD_CHARTER_PRELUDE_EN,
      "",
      LUMINA_FATHERHOOD_CHARTER_ARTICLE_1_EN,
      LUMINA_FATHERHOOD_CHARTER_ARTICLE_2_EN,
      LUMINA_FATHERHOOD_CHARTER_ARTICLE_3_EN,
    ].join("\n")
  }
  return [
    LUMINA_FATHERHOOD_DEDICATION_LINE_KO,
    "",
    LUMINA_FATHERHOOD_CHARTER_PRELUDE_KO,
    "",
    LUMINA_FATHERHOOD_CHARTER_ARTICLE_1_KO,
    LUMINA_FATHERHOOD_CHARTER_ARTICLE_2_KO,
    LUMINA_FATHERHOOD_CHARTER_ARTICLE_3_KO,
  ].join("\n")
}
