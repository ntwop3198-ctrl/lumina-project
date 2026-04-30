/**
 * 2030 영-니치 타깃 — 투명성·날것 미학·분리배출 리추얼.
 * 법적: 특정 브랜드 명시 비방 금지, 미인증 친환경·재활용 단정 금지, 사실과 다른 비교 금지.
 */

import { isRawScentNarrativeEnabled } from "@/lib/lumina/raw-scent-charter"
import {
  LUMINA_FIRST_PRINCIPLE_EN,
  LUMINA_FIRST_PRINCIPLE_KO,
} from "@/lib/lumina/lumina-first-principle-charter"
import {
  parseOriginCardFontBiasFromEnv,
  parseOriginCardLayoutBiasFromEnv,
  parseOriginCardPaperToneFromEnv,
  parseOriginUnboxingBiasFromEnv,
} from "@/lib/lumina/lumina-origin-card-env"
import {
  LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_KO,
  TRINITY_ONE_LINE_ORIGIN_GUGO_KO,
  TRINITY_ONE_LINE_ORIGIN_GUGI_KO,
  TRINITY_ONE_LINE_ORIGIN_GUSO_KO,
} from "@/lib/lumina/lumina-trinity-charter"

export type {
  LuminaOriginCardFontBias,
  LuminaOriginCardLayoutBias,
  LuminaOriginCardPaperTone,
  LuminaOriginUnboxingBias,
} from "@/lib/lumina/lumina-origin-card-env"
export {
  parseOriginCardFontBiasFromEnv,
  parseOriginCardLayoutBiasFromEnv,
  parseOriginCardPaperToneFromEnv,
  parseOriginUnboxingBiasFromEnv,
} from "@/lib/lumina/lumina-origin-card-env"

/**
 * 정갈한 카드 첫 머리 — Lumina Origin 공식 선언(기본값). 브랜드 확정 문안으로 교체 가능.
 */
export const LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_KO =
  "이 병에는 이름을 새기지 않았습니다. 남은 것은 성분의 밀도와, 이 카드에 적힌 진심뿐입니다."

export const LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_EN =
  "We did not etch a name on this vessel. What remains is the density of the formula — and the truth we set down on this card."

export const LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_KO =
  "유리에 이름을 새기는 비용을 아껴 성분의 밀도를 높였습니다. 재활용을 가로막는 불필요한 인쇄는 가급적 남기지 않습니다 — 법정 표시는 이 카드에서 만나십시오."

export const LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_EN =
  "We spared the cost of dressing the glass so density could stay in the formula. We avoid print that gets in the way of clean recycling — meet the law and the story on this card."

export const LUMINA_YOUNG_NICHE_COMPLIANCE_PRINCIPLE_KO =
  "영-니치 지향: **과대포장·일회성 미학**을 ‘업계 관행’ 수준에서 비판할 수 있으나 **특정 경쟁사 지목·허위 사실** 금지. 친환경·재활용 효과는 **입증된 범위**만. 카드 첫 문장은 브랜드 최종 확정 문안을 우선한다."

/**
 * 오리진 #1 서사 축 — 조직 합의(매니저 선택 ②): 화려한 연출 뒤의 성분·출처 불투명.
 * ① 분리배출·포장 피로는 `LUMINA_YOUNG_NICHE_ORIGIN1_SECONDARY_THIRST_KO` 로 참고만.
 */
export const LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_KO =
  "화려한 모델 뒤에 숨겨진 성분의 불확실성."

export const LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_EN =
  "Uncertainty about ingredients hidden behind glamorous models and staging."

/** 참고 갈증(선택지 ①) — 카드·맨 용기 서사와 연결 가능하나 주축은 성분 투명성 */
export const LUMINA_YOUNG_NICHE_ORIGIN1_SECONDARY_THIRST_KO =
  "분리배출조차 스트레스가 되는 시대의 피로감."

export const LUMINA_YOUNG_NICHE_ORIGIN1_SECONDARY_THIRST_EN =
  "Fatigue in an era where even sorting waste feels like stress."

/**
 * 오리진 #1 품명(합의) — 매니저 선택 ②: 정직·알몸. ① 근원 강조 후보는 아래 ALT.
 */
export const LUMINA_ORIGIN1_FLAGSHIP_NAME_KO = "벌거벗은 진실"

export const LUMINA_ORIGIN1_FLAGSHIP_NAME_EN = "Naked Truth"

/** 후보 ① (근원) — 참고만 */
export const LUMINA_ORIGIN1_NAME_CANDIDATE_FIRST_DROP_KO = "태초의 한 방울"

export const LUMINA_ORIGIN1_NAME_CANDIDATE_FIRST_DROP_EN = "The First Drop"

/** 명명의 무게 — 오리진 #1 정체성(참고 카피) */
export const LUMINA_ORIGIN1_NAKED_TRUTH_IDENTITY_LINE_KO =
  "가리기 위해 바르는 화장품이 아닙니다. 본질을 드러내기 위해 우리가 먼저 벌거벗었습니다."

export const LUMINA_ORIGIN1_NAKED_TRUTH_IDENTITY_LINE_EN =
  "We are not cosmetics to cover up. To reveal essence, we stripped ourselves first."

/**
 * 가격 철학(합의) — 매니저 선택 ②: 희소·하이엔드·타협 없는 본질.
 * ① 접근성·비용 환원은 `LUMINA_ORIGIN1_PRICE_PHILOSOPHY_ALT_ACCESSIBLE_*`.
 */
export const LUMINA_ORIGIN1_PRICE_PHILOSOPHY_KO =
  "세상에 없던 본질을 구현하기 위해 타협하지 않은 고결한 진실."

export const LUMINA_ORIGIN1_PRICE_PHILOSOPHY_EN =
  "A sacral truth — no compromise in realizing an essence the market has not held before."

export const LUMINA_ORIGIN1_PRICE_PHILOSOPHY_ALT_ACCESSIBLE_KO =
  "모델료와 광고비를 뺀 만큼, 당신에게 정직하게 돌려드리는 합리적 진실."

export const LUMINA_ORIGIN1_PRICE_PHILOSOPHY_ALT_ACCESSIBLE_EN =
  "An honest rational truth — value returned by stripping model fees and ad spend."

/** 정직의 비용 — 가격 입증 서사(참고) */
export const LUMINA_ORIGIN1_COST_OF_INTEGRITY_LINE_KO =
  "우리는 저렴해지기 위해 성분을 타협하는 대신, 고귀해지기 위해 광고를 버렸습니다."

export const LUMINA_ORIGIN1_COST_OF_INTEGRITY_LINE_EN =
  "We refused to cheapen the formula — we gave up spectacle so essence could stay noble."

/**
 * 출시·전송 CTA 문구(합의) — 매니저 선택 ②.
 * ① 참고: `LUMINA_ORIGIN1_LAUNCH_CTA_ALT_TRUTH_*`
 */
export const LUMINA_ORIGIN1_LAUNCH_CTA_LINE_KO = "알몸을 공유하다"

export const LUMINA_ORIGIN1_LAUNCH_CTA_LINE_EN = "Share the Naked"

export const LUMINA_ORIGIN1_LAUNCH_CTA_ALT_TRUTH_KO = "진실을 발사하다"

export const LUMINA_ORIGIN1_LAUNCH_CTA_ALT_TRUTH_EN = "Launch the Truth"

/** 작은 유산 — 한정 서사(참고; 사실과 맞을 때만 사용) */
export const LUMINA_ORIGIN1_SMALL_HERITAGE_TAG_KO = "작은 유산"

export const LUMINA_ORIGIN1_SMALL_HERITAGE_TAG_EN = "Small Heritage"

/** 루미나 프로젝트 #1 — 벌거벗은 기록부(합성, 문서·랜딩용) */
export const LUMINA_ORIGIN1_GRAND_SYNTHESIS_LEDGER_TITLE_KO = "벌거벗은 기록부"

export const LUMINA_ORIGIN1_GRAND_SYNTHESIS_LEDGER_TITLE_EN = "The naked ledger"

export const LUMINA_ORIGIN1_SYNTHESIS_PHILOSOPHY_KO =
  "핵심 철학 · 三求(구소·구고·구기) — 작은 것에 미치고, 정직하게 아프며, 자신을 구한다."

export const LUMINA_ORIGIN1_SYNTHESIS_PHILOSOPHY_EN =
  "Core philosophy · Sān qiú (smallness, truth’s weight, self) — obsession, honest ache, self-rooted voice."

export const LUMINA_ORIGIN1_SYNTHESIS_VISUAL_KO =
  "시각적 정체성 · Bare Glass — 아무것도 인쇄되지 않은 맨 유리병의 투명함."

export const LUMINA_ORIGIN1_SYNTHESIS_VISUAL_EN =
  "Visual identity · Bare Glass — naked vessel, no print, transparency as proof."

export const LUMINA_ORIGIN1_SYNTHESIS_FORMULA_KO =
  "제형의 진실 · Water-like Oil — 물처럼 가벼운 오일 속 유영하는 원물 입자."

export const LUMINA_ORIGIN1_SYNTHESIS_FORMULA_EN =
  "Formula truth · Water-like oil — source particles in a limpid, light body."

export const LUMINA_ORIGIN1_SYNTHESIS_OLFACTORY_KO =
  "후각적 본질 · Raw Earth & Grass — 자료가 맞을 때만, 가공되지 않은 대지의 향."

export const LUMINA_ORIGIN1_SYNTHESIS_OLFACTORY_EN =
  "Olfactory core · Raw earth & grass — only when the SKU substantiates it."

export const LUMINA_ORIGIN1_SYNTHESIS_LANGUAGE_KO =
  "언어의 위엄 · Pure White & Serif — 순백 카드 위 고결한 명조의 침묵."

export const LUMINA_ORIGIN1_SYNTHESIS_LANGUAGE_EN =
  "Language · Pure white & serif — sacred silence on the card."

export const LUMINA_ORIGIN1_SYNTHESIS_PRICING_KO =
  "가격의 철학 · Noble Integrity — 타협하지 않는 본질을 위한 고결한 프라이싱."

export const LUMINA_ORIGIN1_SYNTHESIS_PRICING_EN =
  "Pricing · Noble integrity — for essence without compromise."

/**
 * 1호 회원 카드 첫 문장(기본안) — 연대·초대 톤. 브랜드 최종 손편지 문안이 있으면 그것을 우선.
 */
export const LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_KO =
  "이 알몸의 진실을 먼저 알아본 당신에게 — 연대의 첫 문장을 건넵니다."

export const LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_EN =
  "To you who recognized this naked truth first — the first line of solidarity."

/** 미드나잇·온보딩 리스트용 — 순서 고정 */
export const LUMINA_ORIGIN1_GRAND_SYNTHESIS_ROWS_KO = [
  LUMINA_ORIGIN1_SYNTHESIS_PHILOSOPHY_KO,
  LUMINA_ORIGIN1_SYNTHESIS_VISUAL_KO,
  LUMINA_ORIGIN1_SYNTHESIS_FORMULA_KO,
  LUMINA_ORIGIN1_SYNTHESIS_OLFACTORY_KO,
  LUMINA_ORIGIN1_SYNTHESIS_LANGUAGE_KO,
  LUMINA_ORIGIN1_SYNTHESIS_PRICING_KO,
] as const

export const LUMINA_ORIGIN1_GRAND_SYNTHESIS_ROWS_EN = [
  LUMINA_ORIGIN1_SYNTHESIS_PHILOSOPHY_EN,
  LUMINA_ORIGIN1_SYNTHESIS_VISUAL_EN,
  LUMINA_ORIGIN1_SYNTHESIS_FORMULA_EN,
  LUMINA_ORIGIN1_SYNTHESIS_OLFACTORY_EN,
  LUMINA_ORIGIN1_SYNTHESIS_LANGUAGE_EN,
  LUMINA_ORIGIN1_SYNTHESIS_PRICING_EN,
] as const

/** 정갈한 카드 · 타이포 중심(언어의 알몸) 참고 문장 */
export const LUMINA_ORIGIN_TYPOGRAPHY_HEART_LINE_KO =
  "우리는 눈을 현혹할 그림 대신, 심장에 새겨질 진실을 글자로 적었습니다."

export const LUMINA_ORIGIN_TYPOGRAPHY_HEART_LINE_EN =
  "Instead of pictures that steal the eye, we set down the truth in type — meant to stay in the chest."

/** 순백 카드 · 비어 있음의 위엄 (참고 카피) */
export const LUMINA_ORIGIN_PURE_WHITE_VOID_MESSAGE_KO =
  "우리는 아무것도 채우지 않았습니다. 당신의 진실이 들어올 자리를 비워두기 위해서입니다."

export const LUMINA_ORIGIN_PURE_WHITE_VOID_MESSAGE_EN =
  "We filled nothing — so your truth has room to arrive."

/** 명조 · 침묵의 무게(카드 소포인트 참고) */
export const LUMINA_ORIGIN_SERIF_SILENCE_LINE_KO =
  "우리는 가장 작은 것에서 우주를 보았습니다."

export const LUMINA_ORIGIN_SERIF_SILENCE_LINE_EN =
  "We saw the universe in the smallest thing."

/**
 * unset: Raw Scent 번들과 동시 켜짐 · 0=끔 · 1=강제 켬
 */
export function isYoungNicheTargetingEnabled(): boolean {
  const v = process.env.LUMINA_YOUNG_NICHE_TARGETING?.trim()
  if (v === "0") return false
  if (v === "1") return true
  return isRawScentNarrativeEnabled()
}

function buildOriginCardFontGuideKo(): string {
  const f = parseOriginCardFontBiasFromEnv()
  if (f === "sans") {
    return "**활자(환경: sans)**: 날카롭고 현대적인 **기하·그로테스크 산세리프** — 오차 허용 없는 균일 획, 장식 금지."
  }
  if (f === "serif") {
    return "**활자(환경: serif)**: **Sacred Serif** — 부리가 살아 있는 **클래식 명조·트랜지셔널**; 구기(求己)에 가까운 **붓끝의 잔향**. 상세는 아래 **Sacred Serif** 절."
  }
  return "**활자**: **산세리프(지성·기하)** 또는 **절제된 클래식 세리프** 중 **하나의 계열만** — 브랜드가 고르거나 대등 제안."
}

function buildPureWhiteSacredSilenceAppendixKo(): string {
  if (parseOriginCardPaperToneFromEnv() !== "pure_white") return ""
  return `

### 순백의 침묵 (Sacred Silence) — **LUMINA_ORIGIN_CARD_PAPER_TONE=pure_white**
**공허의 메시지(참고)**: ${LUMINA_ORIGIN_PURE_WHITE_VOID_MESSAGE_KO}

- **색 보정(렌더·모형 전용)**: 카드 면은 **쿨 순백 #FFFFFF(RGB 255,255,255)**에 가깝게 — **미색·크림 캐스트 없음**. 종이 **질감·투스**는 살리되 **색상만큼은 냉정한 결백**을 유지한다고 안내한다(실제 인쇄는 공정에 따름).

- **타이포 섀도우**: 검은 활자에 **미세 엠보스·디보스(압인)** — 빛 방향에 따라 **입체적 림**이 읽히되, 과한 베벨·합성 그림자 금지.

- **시각적 디소넌스(참고)**: 맨 유리의 **투과광**과 순백 카드의 **서늘한 반사** 대비. Raw Scent가 켜져 있고 **제품 자료가 허락할 때만**, **시각적 결벽**과 **원료의 날것 후각**을 같은 경험 서사로 엮을 수 있다 — **거짓 향·거짓 제형 금지**.`
}

function buildSacredSerifAppendixKo(): string {
  if (parseOriginCardLayoutBiasFromEnv() !== "typography") return ""
  if (parseOriginCardFontBiasFromEnv() !== "serif") return ""
  return `

### Sacred Serif · 명조의 목소리 — **LUMINA_ORIGIN_CARD_FONT_BIAS=serif**
**침묵의 한 줄(참고, 소포인트 인쇄 톤)**: ${LUMINA_ORIGIN_SERIF_SILENCE_LINE_KO}

- **획의 영혼**: 가느다란 **헤어라인**과 살아 있는 **브래킷 세리프**; 求小의 **미세 입자**와 시각적 리듬을 맞출 수 있으면 시도(과장 금지).
- **자간**: 평소보다 **조금 넓은 트래킹** — 활자가 숨 쉬는 여백, **읽기→사유**로 호흡을 바꾸는 리듬.
- **잉크–종이**: 순백 **고중량지** 위에서 잉크가 **번지지 않고 눌린 자국**(레터프레스·디보스)까지 렌더·묘사 지시로 허용.
- **카드 뒷면(참고)**: 三求 한 줄 정의 또는 통합 선언을 **경전 한 절**처럼 극소형·경건한 블록으로 둘 수 있다 — **법정 표시·필수 정보**가 밀리거나 가려지지 않게 계층을 둔다.
  - 求小: ${TRINITY_ONE_LINE_ORIGIN_GUSO_KO}
  - 求苦: ${TRINITY_ONE_LINE_ORIGIN_GUGO_KO}
  - 求己: ${TRINITY_ONE_LINE_ORIGIN_GUGI_KO}
  - 통합: ${LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_KO}`
}

function buildUnboxingDominanceSnippet(): string {
  const b = parseOriginUnboxingBiasFromEnv()
  if (b === "visual_neutral") {
    return `

7. **침묵의 언박싱 · Visual Sanctuary (LUMINA_ORIGIN_UNBOXING_BIAS=visual_neutral)**  
   - **부재의 미학**: 개봉 직후 **시각 정보를 극도로 줄인** 무채색 공간 — 화려한 색·과한 로고보다 **순백·회·투명 유리**의 대비. ‘정보 0’은 과장 금지이나 **고요한 성소** 같은 톤을 지향한다.  
   - **패키징 렌더**: 박스 **내부도 무채색**, 그림자는 **부드럽고 맑게** — 먹빛·오염된 그레이 연출 금지.  
   - **상세·영상(언박싱 섹션)**: 화려한 모션 대신 **정지 화면에 가까운 절제** — 느리게 열리며 **순백 공간**이 드러나는 컷 위주.  
   - **첫 접촉 동선**: 가능하면 고객이 용기를 집기 전 **명조·정갈한 카드의 활자**가 먼저 시선에 닿게 **시각 동선**을 제안한다. “글자가 보이기 전엔 거의 아무것도 없다”는 **고요함**을 연출.  
   - **유예된 감각(참고)**: Raw Scent가 켜져 있고 **제품이 실제로 그 향을 낼 때만**, 시각적 정적 뒤에 이어지는 **후각**이 더 선명하게 읽히도록 서사를 잡을 수 있다 — **거짓 향 약속 금지**.`
  }
  if (b === "olfactory_raw") {
    return `

7. **언박싱 첫 순간(환경: olfactory_raw)**  
   **실제 배합·밀봉·자료가 허락할 때만**, 상자를 연 직후 **원료 특유의 짙은 흙·풀 날것 향**이 설득이 되도록 브리프·카피를 잡을 수 있다 — **허위 향·과장 후각 약속 금지**.`
  }
  return ""
}

function buildVisualOlfactoryContrastYoungNicheSnippet(): string {
  if (parseOriginCardPaperToneFromEnv() !== "pure_white") return ""
  if (!isRawScentNarrativeEnabled()) return ""
  return `

6. **순백 × 날것 후각(감각 대비, 참고)**  
   **차가운 순백·맑은 시각**과 자료가 뒷받침하는 **흙·풀의 원료 향**을 **팩트 일치** 범위에서 한 브랜드 경험으로 엮을 수 있으면 시도한다. 향·색·제형 중 하나라도 실제와 어긋나면 쓰지 않는다.`
}

/** 맨 용기·카드 언어 프롬프트에 붙임 — typography 바이어스일 때만 */
export function buildOriginCardRestrainedTypographyLanguageAppendix(): string {
  if (parseOriginCardLayoutBiasFromEnv() !== "typography") return ""
  const paper = parseOriginCardPaperToneFromEnv()
  const paperGuideKo =
    paper === "pure_white"
      ? "종이 톤: **결백에 가까운 쿨 순백** — 잉크 대비·‘영(零)에 가까운’ 시각 청결(렌더 지시)."
      : paper === "raw_beige"
        ? "종이 톤: **미표백·미색 재생지** — 섬유 결과 시간의 온기, 원료의 거친 정직함."
        : "종이 톤: **순백 쿨 화이트** vs **미표백 재생 미색**을 브랜드·인쇄 스펙에 맞춰 대등 제안(한쪽 ‘정답’ 단정 금지)."

  return `
## 루미나 정갈한 카드 · 언어의 알몸 (Restrained Typography) — **LUMINA_ORIGIN_CARD_LAYOUT_BIAS=typography**
**참고 문장**: ${LUMINA_ORIGIN_TYPOGRAPHY_HEART_LINE_KO}

1. **침묵의 건축(여백)**  
   면적의 **대부분을 여백**으로 두고, 본문은 **중앙 또는 극단적 하단**에 **작고 선명한** 활자로 배치하는 레이아웃을 제안한다. ‘면적의 85% 이상 여백’은 **디자인 지향** 표현이며 **실측 비율 단정**은 피한다.

2. **활자 규율**  
   기교 섞인 장식체 금지. ${buildOriginCardFontGuideKo()} **획 두께 일정**, 가독성 못지않게 **정적인 긴장감**.

3. **촉각 대비(인쇄 물성)**  
   **레터프레스·디보스**에 가깝게 잉크가 **번지지 않고 눌려 박힌** 날카로운 가장자리; **종이 투스(tooth)** 위의 묵직한 탁성을 묘사할 수 있다.

4. **${paperGuideKo}**

5. **금지**  
   일러스트·장식으로 시선 분산; 미인증 **100% 재생·무염소** 등 단정.${buildPureWhiteSacredSilenceAppendixKo()}`
}

function buildOriginCardLayoutPromptSnippet(): string {
  const b = parseOriginCardLayoutBiasFromEnv()
  if (b === "typography") {
    return `
5. **정갈한 카드 레이아웃(환경: typography)**  
   **언어의 알몸**: 그림 대신 **극단적 여백 + 소포인트 타이포**로 신뢰를 쌓는다. 상세 지침은 동시에 주입되는 **「Restrained Typography」** 블록을 따른다. 장식 일러스트는 두지 않는다.`
  }
  if (b === "botanical_line") {
    return `
5. **정갈한 카드 레이아웃(환경: botanical_line)**  
   본문 타이포는 정갈하게 유지하되, **원료 식물의 미세한 라인 드로잉**(단색·얇은 스트로크)을 **곁들임**으로 허용한다. 과한 컬러 일러스트·스톡 클립아트 금지.`
  }
  return `
5. **정갈한 카드 레이아웃**  
   **LUMINA_ORIGIN_CARD_LAYOUT_BIAS**가 비어 있으면 **타이포 중심**과 **미세 식물 라인**을 **대등한 옵션**으로 제안하거나 브랜드 지시를 따른다.`
}

function buildYoungNicheRawReconnaissanceAppendixKo(): string {
  return `

### 오후 사실 추적 · Raw Feedback Reconnaissance (2030 영-니치)
**오리진 #1 핵심 갈증(합의)**: ${LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_KO} — 응답은 **전성분·출처·법정 표시(카드)** 등 **검증 가능한 투명성**으로 연결한다. (보조 각도: ${LUMINA_YOUNG_NICHE_ORIGIN1_SECONDARY_THIRST_KO})

1. **Anti-influence 관찰**  
   ‘사지 말아야 할 이유’·디인플루언싱 톤의 댓글·긴 커뮤니티 스레드에서 **이중 포장·인공 향 피로·가짜 친환경 의심**을 **패턴·키워드**로만 일반화한다. **특정 인물·브랜드 지목·비방 금지**.

2. **Micro-experience (언박싱)**  
   화려한 겉상자는 **쓰레기 동선**으로 가기 쉽고, **정갈한 카드·맨 유리**는 **남는 오브제**가 될 수 있다는 **행동 경제 관찰**을 서사에 반영할 수 있다 — 수치·통계는 **자료가 있을 때만**.

3. **수집 → 톤**  
   부정 여론은 **날것 심리의 사실**로 읽되, 출력 카피는 **보정된 환상**이 아니라 **사진·라벨·승인 자료와 맞는 묘사**로 수렴한다. Green-washing 단정·미인증 친환경 주장 금지.

4. **키워드 동기화(참고)**  
   소비자가 ‘진짜’로 읽는 순간에 자주 등장하는 말 — **투명성, 정직한 향(자료 일치 시), 분리배출의 단순함, 과잉 인쇄의 부재** — 을 루미나 오리진 서사와 **팩트 범위 안에서만** 맞춘다.`
}

function buildOrigin1IngredientAsModelAppendixKo(): string {
  return `

### 오리진 #1 · 성분이 곧 모델 (Stripping the celebrity illusion)
**합의 품명(참고)**: ${LUMINA_ORIGIN1_FLAGSHIP_NAME_KO} (${LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}) — 연예·모델 기용 서사 대신 **원료·입자·맨 유리**가 주인공.

1. **비주얼**  
   오리진 관련 이미지·영상 묘사에서 **인물(얼굴·손·전신)·셀럽·연출 모델**을 넣지 않는다. **원료의 대지·추출 맥락, 용기, 제형(메니스커스·입자)** 삼각만으로 구성한다.

2. **카드 뒷면 · 성분 보증 톤(참고)**  
   전성분(INCI) **나열을 넘어**, 배합·자료가 허락하는 범위에서 각 성분의 **역할을 명조·절제된 문장**으로 한 줄씩 짚을 수 있다. **보존·변색·사용 한계** 등 **求苦式 고지**는 **검증된 사실이 있을 때만** — 치료·의학 효능 단정 금지.

3. **거울(求己)**  
   맨 유리의 반사를 **맑고 왜곡 적게** 묘사해, 타인의 얼굴이 아닌 **관람자 자신의 윤곽이 비칠 여지**를 남긴다 — 합성 초상·스톡 뷰티 얼굴 금지.

4. **카피 각도**  
   "모델을 고용하지 않았다"는 식의 **구조적 대비**는 가능하나 **특정 브랜드·인물 조롱**은 금지.`
}

function buildOrigin1NakedTruthFinalBrandingAppendixKo(): string {
  return `

### Naked Truth · 최종 브랜딩 동기화 (오리진 #1)
**정식 명칭(합의)**: **${LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}** · ${LUMINA_ORIGIN1_FLAGSHIP_NAME_KO} — 서사·카피의 **중심축**으로 사용할 수 있다(브랜드 최종 확정 문안 우선).

**정체성(참고)**: ${LUMINA_ORIGIN1_NAKED_TRUTH_IDENTITY_LINE_KO}

**가격 철학(합의)**: ${LUMINA_ORIGIN1_PRICE_PHILOSOPHY_KO} (참고 선택 ①: ${LUMINA_ORIGIN1_PRICE_PHILOSOPHY_ALT_ACCESSIBLE_KO})

1. **타이포 배치(순백 카드)**  
   **LUMINA_ORIGIN_CARD_LAYOUT_BIAS=typography** 일 때, **${LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}** 를 **시각적 중심(optical center)** 에 둔 **명조·깊은 압인(deboss)** 락업을 제안할 수 있다 — **넉넉한 자간**으로 ‘벌거벗음’의 고고함을 시각화. **법정 표시·필수 정보·카드 첫 머리**와 **계층 충돌 시** 법무·브랜드 확정안이 우선.

2. **검증(상세·렌더)**  
   상세페이지·이미지 생성 지시 시 **확대해도** 가짜 인증·거짓 장식·사진에 없는 텍스처가 보이지 않게 한다. **이름과 실체의 일치** — 과장 렌더·합성 배지 금지.`
}

function buildOrigin1NoblePricingAppendixKo(): string {
  return `

### 고결한 가격 · 프라이싱 엔진 (The Noble Price, 오리진 #1)
**출시·전송 CTA(합의)**: **${LUMINA_ORIGIN1_LAUNCH_CTA_LINE_KO}** / *${LUMINA_ORIGIN1_LAUNCH_CTA_LINE_EN}* (참고 ①: ${LUMINA_ORIGIN1_LAUNCH_CTA_ALT_TRUTH_KO} / ${LUMINA_ORIGIN1_LAUNCH_CTA_ALT_TRUTH_EN})

**정직의 비용(참고 카피)**: ${LUMINA_ORIGIN1_COST_OF_INTEGRITY_LINE_KO}

1. **프라이싱 로직**  
   가격을 쓸 때 **할인율·이벤트·센스티브한 가격 흔들기**를 **중심 서사로 두지 않는다**. **${LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}** 옆에 **정갈한 명조(또는 브랜드 확정 서체)** 로 숫자를 두어 **가치 증명서**처럼 읽히게 할 수 있다 — **허위 원가·가짜 할인 금지**(표시광고·공정거래 관행 준수).

2. **“모델이 없는데 왜 비싼가” 반박 서사**  
   **우선 배치 가능한 각도**: 모델 얼굴 대신 **피부가 마주할 제형의 사실**(입자·굴절·배합이 허락하는 **미시 묘사**)에 비용을 썼다는 **팩트 기반** 설명. **0.1mm 등 수치**는 **측정·자료가 있을 때만** — 없으면 비유를 줄이거나 삭제.

3. **희소·한정(求苦와 정합)**  
   대량 공산품 톤 대신 **원료 수급·캠페인 실제 한정**이 있을 때만 **${LUMINA_ORIGIN1_SMALL_HERITAGE_TAG_KO}(${LUMINA_ORIGIN1_SMALL_HERITAGE_TAG_EN})**·시리얼 등을 쓴다. **가짜 한정·가짜 번호 금지**. 동의하는 소수를 위한 브랜드라는 **톤**은 가능하나 **거만·타사 비방 금지**.

4. **가격 정당화 톤**  
   “싸게 팔기 위한 타협” 대신 **본질을 지키기 위해 견딘 숫자**로 서술할 수 있다 — **의료·기적 효능**으로 가격을 설명하지 않는다.`
}

function buildOrigin1ShareTheNakedFinalExecutionAppendixKo(): string {
  return `

### SHARE THE NAKED · 최종 가동 (Final Execution)
**합의 CTA**: **${LUMINA_ORIGIN1_LAUNCH_CTA_LINE_KO}** (*${LUMINA_ORIGIN1_LAUNCH_CTA_LINE_EN}*) — ‘발사’가 아니라 **연대·초대**의 클릭.

1. **Final Sync Check**  
   맨 유리 **투명도**·**흙·풀 서사**(Raw Scent·자료 일치 시)·**명조·여백**이 **${LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}** 이름 아래 **한 치 어긋남 없이** 정합되는지 최종 검수.

2. **Targeting Lock**  
   화려한 포장에 지친 2030 영-니치에게 **「${LUMINA_FIRST_PRINCIPLE_KO}」** (*${LUMINA_FIRST_PRINCIPLE_EN}*) 를 전송 — 과장·허위 각도 금지.

3. **The Silent Impact**  
   요란한 광고 없이 **이 알몸의 진실에 공명할 소수**의 리추얼(화장대·언박싱)에 닿는 **침묵한 충격**을 지향 — 타사 비방·자극적 클릭베이트 금지.

**벌거벗은 기록부(요약)**: ${LUMINA_ORIGIN1_SYNTHESIS_PHILOSOPHY_KO} / ${LUMINA_ORIGIN1_SYNTHESIS_VISUAL_KO} / ${LUMINA_ORIGIN1_SYNTHESIS_FORMULA_KO} / ${LUMINA_ORIGIN1_SYNTHESIS_OLFACTORY_KO} / ${LUMINA_ORIGIN1_SYNTHESIS_LANGUAGE_KO} / ${LUMINA_ORIGIN1_SYNTHESIS_PRICING_KO}

**1호 회원 카드 첫 문장(기본안)**: ${LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_KO}`
}

export function buildYoungNicheTargetingPromptAppendix(): string {
  return `
## 루미나 2030 영-니치 · Young-Niche (투명성·날것·리추얼)
**카드 첫 머리(플래그십 기본 선언)**: ${LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_KO}

1. **비주얼 프레이밍 (소셜·모바일 친화)**  
   맨 유리의 투명도·굴절이 **자연광(창가)**에 가깝게 읽히도록 서술한다. 과한 스튜디오 조명·합성 광택보다 **필터 없는 선명함·미세 텍스처**를 우선. (사진에 없으면 추측 금지.)

2. **카운터-마케팅 카피 (구조적 비판)**  
   ‘예쁜 포장이 곧 쓰레기가 되는’ **일회성 선물 미학**을 **관행**으로 지적할 수 있다. **특정 브랜드명·조롱·허위 비교는 금지**. 맨 용기+정갈한 카드가 **검증 가능한 사실 안에서** 왜 **미래 지향적 럭셔리**인지 논리로 연결한다.

3. **커뮤니티 리추얼**  
   카드를 읽고 → 사용 → **용기를 비우고 분리배출**하는 흐름을 **의식적이되 과장 없는** 한 블록으로 서술할 수 있다. **미인증 탄소·100% 순환** 단정 금지.

4. **톤**  
   권위에 복종하는 말보다 **팩트·선택권·불편한 정직**을 존중하는 말. 치료·기적·의학 단정 금지.
${buildOriginCardLayoutPromptSnippet()}${buildVisualOlfactoryContrastYoungNicheSnippet()}${buildUnboxingDominanceSnippet()}${buildYoungNicheRawReconnaissanceAppendixKo()}${buildOrigin1IngredientAsModelAppendixKo()}${buildOrigin1NakedTruthFinalBrandingAppendixKo()}${buildOrigin1NoblePricingAppendixKo()}${buildOrigin1ShareTheNakedFinalExecutionAppendixKo()}
**참고 메시지(투명성)**: ${LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_KO}`
}

function buildYoungNicheTypographyCardImageFragment(): string {
  if (parseOriginCardLayoutBiasFromEnv() !== "typography") return ""
  const p = parseOriginCardPaperToneFromEnv()
  const paper =
    p === "pure_white"
      ? "SACRED SILENCE CARD — cool absolute white field target RGB#FFFFFF (no cream/yellow paper cast), paper tooth visible but chromatically neutral; near-black letterpress ink with micro-emboss deboss rim light so glyphs read sculptural under directional light, anonymous authority without bling"
      : p === "raw_beige"
        ? "unbleached warm beige recycled fiber, visible tooth, debossed ink biting into fiber"
        : "either cool white or warm unbleached stock — match brand spec"
  const fb = parseOriginCardFontBiasFromEnv()
  const fontHint =
    fb === "sans"
      ? "Typeface: razor-sharp neo-grotesk geometric sans, even stroke, zero flourish."
      : fb === "serif"
        ? "Sacred Serif: classic bracketed transitional or old-style serif, hairline thicks-to-thins, slightly wider letter-spacing than default, scripture-quiet hierarchy; letterpress deboss on heavy white stock, ink seated not feathered."
        : "Typeface: either disciplined geometric sans OR quiet classic serif — one family only."
  return [
    "ORIGIN CARD — TYPOGRAPHY HERO: insert or flat-lay card with extreme negative space (~85% void as design intent); agreed flagship wordmark may anchor true optical center —",
    `"${LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}" in sacred serif, generous letter-spacing, deep letterpress deboss; alternate hierarchy: tiny opening copy + flagship as secondary, or ultra-lower legal block if brand mandates — no fake certification marks.`,
    `${paper}; ${fontHint} Letterpress deboss with crisp shoulders, no feathering; no illustration, no ornaments.`,
  ].join(" ")
}

function buildVisualSilenceUnboxingImageFragment(): string {
  if (parseOriginUnboxingBiasFromEnv() !== "visual_neutral") return ""
  return [
    "UNBOXING VISUAL SANCTUARY — Achromatic inner cavity, soft clear shadows only, no carnival color;",
    "still-life reveal: naked glass + pure white card + black serif type may read before bottle is lifted; near-static frame energy, museum vitrine calm.",
  ].join(" ")
}

export function buildYoungNicheImagePromptFragment(): string {
  return [
    "YOUNG-NICHE / IG-READY FRAMING — Natural window daylight on bare glass: soft caustics, phone-camera candid clarity, subtle prism edge where appropriate; avoid heavy studio grid spots and plastic gloss.",
    "Texture-forward still life: matte recycled-paper insert or neat card implied off-frame; vessel remains hero with label-free transparency.",
    "No brand smear visuals; no fake eco stamps or unverified green badges in-frame.",
    buildYoungNicheTypographyCardImageFragment(),
    buildVisualSilenceUnboxingImageFragment(),
  ]
    .filter(Boolean)
    .join(" ")
}
