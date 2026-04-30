import {
  parseOriginCardLayoutBiasFromEnv,
  parseOriginCardPaperToneFromEnv,
} from "@/lib/lumina/lumina-origin-card-env"
import { buildOriginCardRestrainedTypographyLanguageAppendix } from "@/lib/lumina/young-niche-charter"

/**
 * 맨 용기 + 정갈한 카드 — 브랜드·법적 정보를 용기 인쇄와 분리해 카드(삽입·태그)로 두는 패키징 철학.
 * 재활용·분리배출 UX를 돕되, **허위 친환경 인증·과장된 순환 주장** 금지. 법정 표시는 카드 등 **소비자가 확실히 받을 수 있는 매체**에 남긴다.
 * `LUMINA_NAKED_VESSEL_CARD_CHARTER=0` 비활성.
 */

export const NAKED_VESSEL_CARD_HEADLINE_KO = "맨 용기와 정갈한 카드"
export const NAKED_VESSEL_CARD_HEADLINE_EN = "Bare vessel, honest card"

export const NAKED_VESSEL_CARD_GLOSS_KO =
  "아담한 **맨 유리(또는 단순 용기)**에는 가급적 인쇄·스티커를 얹지 않고, **브랜드명·상표·제품설명·법정 표시**는 **정갈한 카드**(상자 내 동봉·태그 등)로 옮긴다. 쓰고 난 뒤 **용기와 정보 매체를 쉽게 나누는 것**이 목적이다. 루미나 카피는 이 구조를 **과학적·법적으로 확인된 사실** 안에서만 서술한다."

export const NAKED_VESSEL_CARD_GLOSS_EN =
  "A **bare minimal vessel** carries little or no print; **brand, mark, story, and legally required facts** move to a **neat card or insert** (tag, box insert). Goal: easier separation at end of use. Lumina copy stays inside **verified facts** — no fake eco badges or exaggerated circular claims."

/** 카드 재질 톤 — 둘 다 유효; 최종 선택은 브랜드(고객) 몫 */
export type LuminaCardStockToneId = "neutral" | "earthly" | "refined"

export const CARD_STOCK_EARTHY_TITLE_KO = "자연에 가까운 길 (재생지)"
export const CARD_STOCK_EARTHY_TITLE_EN = "The earthy path (recycled fiber)"
export const CARD_STOCK_EARTHY_HINT_KO =
  "거친 섬유·무광·진솔한 문장. 비건·로컬 원료 등 톤과 잘 맞을 수 있다 — **강요 아님**."
export const CARD_STOCK_EARTHY_HINT_EN =
  "Visible fiber, matte, plainspoken copy. May suit vegan or local-ingredient stories — **never imposed**."

export const CARD_STOCK_REFINED_TITLE_KO = "절제된 우아함 (고중량 면지)"
export const CARD_STOCK_REFINED_TITLE_EN = "Quiet luxury (heavy cotton paper)"
export const CARD_STOCK_REFINED_HINT_KO =
  "묵직한 촉감·부드러운 화이트·철학적 여백. 하이엔드 라인과 잘 맞을 수 있다 — **강요 아님**."
export const CARD_STOCK_REFINED_HINT_EN =
  "Substantial hand, soft white, editorial restraint. May suit high-end lines — **never imposed**."

export const CARD_STOCK_CHOICE_PRINCIPLE_KO =
  "**두 길 모두 좋다.** 루미나는 재생지와 면지 중 **어느 쪽이 맞는지 브랜드가 고른다**. 서버 환경 변수 `LUMINA_CARD_STOCK_PRESET`에 `earthy` 또는 `refined`를 넣으면 카피·이미지 힌트가 그 톤으로 기본 정렬되고, 비우거나 `neutral`이면 두 옵션을 **대등하게 제안**만 한다."

export const CARD_STOCK_CHOICE_PRINCIPLE_EN =
  "**Both paths are valid.** The brand chooses recycled fiber or heavy cotton — Lumina does not dictate. Set server env `LUMINA_CARD_STOCK_PRESET` to `earthy` or `refined` to bias copy/image hints, or leave unset / `neutral` to present both as equal options."

export function parseCardStockToneFromEnv(): LuminaCardStockToneId {
  const raw = process.env.LUMINA_CARD_STOCK_PRESET?.trim().toLowerCase() ?? ""
  if (!raw || raw === "neutral" || raw === "both") return "neutral"
  if (
    raw === "earthy" ||
    raw === "earth" ||
    raw === "recycled" ||
    raw === "재생" ||
    raw === "재생지"
  ) {
    return "earthly"
  }
  if (
    raw === "refined" ||
    raw === "ethereal" ||
    raw === "cotton" ||
    raw === "면지" ||
    raw === "cottonpaper"
  ) {
    return "refined"
  }
  return "neutral"
}

function buildCardStockTonePromptSnippet(): string {
  const tone = parseCardStockToneFromEnv()
  if (tone === "earthly") {
    return `
- **카드 재질 톤(환경 변수: earthly)**: 카피는 **진솔·무광·거친 종이 질감**을 연상시키되 과장 금지. 이미지 묘사 시 **섬유 결·무광 표면**을 허용한다.`
  }
  if (tone === "refined") {
    return `
- **카드 재질 톤(환경 변수: refined)**: 카피는 **절제·묵직·에디토리얼** 톤을 우선하되 허위 권위 금지. 이미지 묘사 시 **고중량 면지·부드러운 화이트**를 허용한다.`
  }
  return `
- **카드 재질 톤(브랜드 선택)**: **재생지(earthy)**와 **고중량 면지(refined)** 둘 다 합법한 선택이다. 브랜드 지시가 없으면 **두 옵션을 대등하게** 한 문단씩 제안하거나, 중립 문장만 쓴다. **어느 쪽이 ‘정답’이라 단정하지 않는다**.`
}

export const LUMINA_NAKED_VESSEL_CARD_COMPLIANCE_PRINCIPLE_KO =
  "맨 용기·카드: **분리 패키징 UX**는 정직하게, **인증·재활용률·탄소** 등은 입증 없이 단정하지 않는다. **의무 표시**는 소비자가 반드시 받을 수 있는 형태로 유지한다. **재생지·면지 등 카드 재질은 브랜드 선택을 존중**하고 한쪽을 ‘정답’으로 강요하지 않는다."

export function isNakedVesselCardCharterEnabled(): boolean {
  return process.env.LUMINA_NAKED_VESSEL_CARD_CHARTER?.trim() !== "0"
}

export function buildNakedVesselCardLanguagePromptAppendix(): string {
  if (!isNakedVesselCardCharterEnabled()) return ""
  return `
## 루미나 패키징 지향: 맨 용기 + 정갈한 카드
요지: ${NAKED_VESSEL_CARD_GLOSS_KO}
- **비주얼 서술**: 상세·분석에서 용기가 맑은 유리·저인쇄라면 **제형·굴절·투명도**를 앞세우고, 정보는 **카드·박스 삽입**으로 읽힐 수 있음을 구분해 서술할 수 있다(사진에 없으면 추측 금지).
- **카피 각도(예시)**: “유리에 이름을 새기지 않고, 종이에 진심과 의무를 모았다” 류는 **브랜드 톤에 맞을 때만** 사용; **의무 표시 누락**을 정당화하는 문장 금지.
- **언박싱·사용 가이드**: 용기 ↔ 카드 분리가 **직관적인 순서**를 짧게 안내할 수 있다.
- **금지**: 미인증 **친환경·탄소중립·100% 재활용** 단정; 지역 규정과 다른 **분리배출 약속**; 용기를 비워도 **법적 정보 소비자 접근권**을 해치는 취지의 문구.${buildCardStockTonePromptSnippet()}${buildOriginCardRestrainedTypographyLanguageAppendix()}`
}

function buildNakedVesselTypographyCardImageFragment(): string {
  if (parseOriginCardLayoutBiasFromEnv() !== "typography") return ""
  const p = parseOriginCardPaperToneFromEnv()
  const paper =
    p === "pure_white"
      ? "RGB#FFFFFF cool sacred-silence insert, micro-emboss black type, vast whitespace, no cream cast"
      : p === "raw_beige"
        ? "unbleached beige fiber card, debossed type, tactile tooth"
        : "white or unbleached stock per brief"
  return ` TYPOGRAPHY-CARD SYNC — ${paper}; architecture-of-silence layout; no drawings.`
}

/** 병·용기가 그려질 때 붙이는 영문 프롬프트 조각 */
export function buildNakedVesselCardImagePromptAppendix(): string {
  if (!isNakedVesselCardCharterEnabled()) return ""
  const tone = parseCardStockToneFromEnv()
  const cardSurface =
    tone === "earthly"
      ? "Optional insert card: recycled-paper tactility, visible fiber, matte, humble craft — if brief includes a card."
      : tone === "refined"
        ? "Optional insert card: heavy cotton or museum-grade paper, soft white, calm emboss or deboss only if brief includes a card."
        : "Optional insert card: either humble recycled fiber matte OR refined heavy cotton — match brand choice; do not imply one is superior."

  return [
    "NAKED-VESSEL + CARD MODULE — When a bottle or vial appears: prefer clean unprinted or minimally printed glass showing true formula color and refraction;",
    "brand identity and regulatory text belong on a separate neat card or insert in-scene only if the brief asks; do not invent fake certification logos.",
    cardSurface,
    buildNakedVesselTypographyCardImageFragment(),
  ]
    .filter(Boolean)
    .join(" ")
}
