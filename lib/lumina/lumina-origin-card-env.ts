/**
 * Lumina Origin 카드·레이아웃 env 파서 — guso-macro ↔ young-niche 순환 참조 방지.
 */

export type LuminaOriginCardLayoutBias = "typography" | "botanical_line" | "neutral"

export type LuminaOriginCardPaperTone = "pure_white" | "raw_beige" | "neutral"

export type LuminaOriginCardFontBias = "sans" | "serif" | "neutral"

/** 언박싱 첫 순간 지배 감각: visual_neutral | olfactory_raw | neutral. `LUMINA_ORIGIN_UNBOXING_BIAS` */
export type LuminaOriginUnboxingBias = "visual_neutral" | "olfactory_raw" | "neutral"

/** `LUMINA_ORIGIN_CARD_LAYOUT_BIAS` */
export function parseOriginCardLayoutBiasFromEnv(): LuminaOriginCardLayoutBias {
  const raw = process.env.LUMINA_ORIGIN_CARD_LAYOUT_BIAS?.trim().toLowerCase() ?? ""
  if (
    raw === "typography" ||
    raw === "type" ||
    raw === "글자" ||
    raw === "타이포"
  ) {
    return "typography"
  }
  if (
    raw === "botanical_line" ||
    raw === "line" ||
    raw === "drawing" ||
    raw === "illustration" ||
    raw === "식물" ||
    raw === "드로잉"
  ) {
    return "botanical_line"
  }
  return "neutral"
}

/** `LUMINA_ORIGIN_CARD_PAPER_TONE` */
export function parseOriginCardPaperToneFromEnv(): LuminaOriginCardPaperTone {
  const raw = process.env.LUMINA_ORIGIN_CARD_PAPER_TONE?.trim().toLowerCase() ?? ""
  if (
    raw === "pure_white" ||
    raw === "white" ||
    raw === "cool" ||
    raw === "순백" ||
    raw === "화이트"
  ) {
    return "pure_white"
  }
  if (
    raw === "raw_beige" ||
    raw === "beige" ||
    raw === "unbleached" ||
    raw === "미색" ||
    raw === "재생지" ||
    raw === "크래프트"
  ) {
    return "raw_beige"
  }
  return "neutral"
}

/** `LUMINA_ORIGIN_CARD_FONT_BIAS` */
export function parseOriginCardFontBiasFromEnv(): LuminaOriginCardFontBias {
  const raw = process.env.LUMINA_ORIGIN_CARD_FONT_BIAS?.trim().toLowerCase() ?? ""
  if (
    raw === "sans" ||
    raw === "gothic" ||
    raw === "고딕" ||
    raw === "산세리프" ||
    raw === "grotesk"
  ) {
    return "sans"
  }
  if (
    raw === "serif" ||
    raw === "myeongjo" ||
    raw === "명조" ||
    raw === "세리프" ||
    raw === "oldstyle"
  ) {
    return "serif"
  }
  return "neutral"
}

/** `LUMINA_ORIGIN_UNBOXING_BIAS` */
export function parseOriginUnboxingBiasFromEnv(): LuminaOriginUnboxingBias {
  const raw = process.env.LUMINA_ORIGIN_UNBOXING_BIAS?.trim().toLowerCase() ?? ""
  if (
    raw === "visual_neutral" ||
    raw === "visual" ||
    raw === "neutral_open" ||
    raw === "무채색" ||
    raw === "정적"
  ) {
    return "visual_neutral"
  }
  if (
    raw === "olfactory_raw" ||
    raw === "olfactory" ||
    raw === "scent" ||
    raw === "향" ||
    raw === "후각"
  ) {
    return "olfactory_raw"
  }
  return "neutral"
}
