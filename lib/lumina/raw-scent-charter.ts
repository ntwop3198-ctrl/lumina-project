/**
 * Raw Scent 내러티브 — 후각적 정직(求苦 정합), 시각–후각 동기.
 * 법적: 특정 향·「합성 향료 0%」는 전성분·규제 문서와 일치할 때만 단정한다.
 */

import { isGusoMacroAestheticsEnabled } from "@/lib/lumina/guso-macro-aesthetics-charter"

/** 참고 카피 — 실제 제품이 무향/원료향이 아니면 그에 맞게 수정 */
export const LUMINA_RAW_SCENT_OLFACTORY_LINE_KO =
  "우리는 향기를 팔지 않습니다. 우리는 식물이 뿌리 내렸던 대지의 숨결을 배달합니다."

export const LUMINA_RAW_SCENT_REBUTTAL_KO =
  "처음엔 낯설 수 있습니다. 이것은 가공되지 않은 씨앗·원료가 가진 향입니다. 인공 향에 익숙한 코가 아니라, 피부가 먼저 만나는 생명력의 언어에 가깝습니다."

export const LUMINA_RAW_SCENT_OLFACTORY_LINE_EN =
  "We do not sell perfume. We deliver the breath of the soil where the plant rooted."

export const LUMINA_RAW_SCENT_REBUTTAL_EN =
  "It may feel unfamiliar at first — this is the unmasked note of seed and raw material. Closer to a language your skin meets before a nose trained on synthetic top notes."

export const LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_KO =
  "당신의 코가 아닌 당신의 세포가 호흡하는 향."

export const LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_EN =
  "A scent meant for your cells before your nose — not perfume theater."

/** 전성분 등에서 합성 향료 미사용이 검증된 SKU에만 배지 문구로 사용 */
export const LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_KO = "합성 향료 0%"
export const LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_EN = "0% synthetic fragrance"

export const LUMINA_RAW_SCENT_COMPLIANCE_PRINCIPLE_KO =
  "후각 서사: ‘향기로운’류 낭만화보다 원료의 질감 언어를 우선하되, 실제 배합·라벨과 어긋나는 향·농도·무향 주장은 금지. 「합성 향료 0%」는 근거 SKU에만."

/**
 * unset: Lumina Origin 매크로 번들과 함께 켜짐 · 0=끔 · 1=강제 켬
 */
export function isRawScentNarrativeEnabled(): boolean {
  const v = process.env.LUMINA_RAW_SCENT_NARRATIVE?.trim()
  if (v === "0") return false
  if (v === "1") return true
  return isGusoMacroAestheticsEnabled()
}

/** 푸터·배지: 법무 확인된 빌드에서만 true (예: .env LUMINA_RAW_SCENT_ZERO_SYNTHETIC_SUBSTANTIATED=1) */
export function isRawScentZeroSyntheticBadgeSubstantiated(): boolean {
  return process.env.LUMINA_RAW_SCENT_ZERO_SYNTHETIC_SUBSTANTIATED?.trim() === "1"
}

export function buildRawScentNarrativePromptAppendix(): string {
  return `
## 루미나 후각적 정직 · Raw Scent (求苦 정합)
**참고 선언**: ${LUMINA_RAW_SCENT_OLFACTORY_LINE_KO}
**반박 톤(참고)**: ${LUMINA_RAW_SCENT_REBUTTAL_KO}

1. **올팩토리 카피라이팅**  
   "향기로운", "은은한", "프리미엄 향" 등 **향을 팔아먹는 관용 화법**은 피한다. 대신 사진·자료에 기대 **원료의 언어**만: 예) 흙의 짙음, 풀의 거침, 씨앗·추출물 특유의 비릿함·톡 쏨 — **근거 없으면 추측하지 말고 "확인 어려움"**.

2. **의학·감각 단정 금지**  
   "세포가 호흡"류는 **시적 메타포**로만 쓰고, 치료·흡수·의약적 암시로 읽히게 쓰지 않는다.

3. **Texture–aroma sync**  
   제형 묘사 시 **묽은 물감 같은 연출**보다, 투명하지만 **원액에 가까운 점도·메니스커의 무게**를 시각 언어로 잡아, (자료가 허락할 때) 원료 향의 밀도와 정합되게 쓴다.

4. **배지 문구**  
   「${LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_KO}」/「${LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_EN}」는 **전성분에 합성 향료(fragrance/parfum 등)가 없음이 확인된 경우에만** 본문에 넣는다. 불확실하면 배지 없이 정직 노트만.`
}

export function buildRawScentImagePromptFragment(): string {
  return [
    "RAW SCENT / TEXTURE–AROMA SYNC — Describe the liquid as dense, slow-moving oil or serum viscosity (not watery wash), transparent yet optically heavy.",
    "Micro-particles suspended with visible drag in the medium; crisp internal refraction so the viewer infers raw, unmasked material presence.",
    "No perfume mist, glitter glam, or cosmetic fragrance storytelling in the frame unless the brief explicitly requires it.",
  ].join(" ")
}
