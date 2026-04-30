/**
 * Lumina Tech Feasibility & Blue Ocean (2026) — 천연 오색·알맹이 효능·컨셔스 안전
 * 철학을 공상이 아닌 제품/데이터로 연결하기 위한 내부 지식 베이스.
 */

export const LUMINA_TECH_FEASIBILITY_TAGLINE_KO =
  "본질로의 회귀(Natural Essence & Safety)는 2026년 뷰티 과학으로 충분히 가능하나, 비용·효율 때문에 대다수가 외면하는 영역이다."

export const LUMINA_TECH_FEASIBILITY_TAGLINE_EN =
  "Natural essence & safety is technically feasible in 2026 beauty science — a blue ocean because most firms defer it for cost and throughput."

/** 1. 천연 오색 — 가능성과 숙제 */
export const LUMINA_NATURAL_CHROMA_IMPLEMENTATION_KO = [
  "청(靑): 블루 탄지·해조류 등으로 맑은 푸른빛.",
  "적·분홍: 히비스커스·자색 고구마·비트 등 안토시아닌 계열.",
  "황·백·등(橙/회복) 레인도 식생 추출로 구현 가능.",
].join(" ")

export const LUMINA_NATURAL_CHROMA_IMPLEMENTATION_EN = [
  "Azure lane: blue tansy, marine botanicals for lucid blue.",
  "Red / sakura: anthocyanins from hibiscus, purple sweet potato, beet, etc.",
  "Gold, pearl-white, recovery green-orange: achievable from plant extracts.",
].join(" ")

export const LUMINA_NATURAL_CHROMA_STABILITY_CHALLENGE_KO =
  "천연 색소는 자외선·온도에 취약해 시간이 지나면 색 변화·흐림이 생기기 쉽다 — 인공 색소 대비 안정화가 숙제."

export const LUMINA_NATURAL_CHROMA_STABILITY_CHALLENGE_EN =
  "Unlike synthetic lakes, natural pigments drift under UV and temperature — stability is the engineering homework, not existence."

export const LUMINA_NATURAL_CHROMA_MITIGATION_KO =
  "나노 에멀전·캡슐화로 천연 색소의 파동을 보호하면서 투명도를 유지할 수 있다 — 기술 부재가 아니라 고비용 기술이다."

export const LUMINA_NATURAL_CHROMA_MITIGATION_EN =
  "Nano-emulsion and encapsulation can shield natural chromophores while keeping clarity — the gap is cost, not physics."

/** 2. 알맹이 효능 */
export const LUMINA_BIO_EFFICACY_STATE_KO =
  "식물 줄기세포 배양·발효 공법은 화학 단일 성분만큼 정교하게 표적에 접근할 수 있는 주류 기술 경로다. 인위 점증제 없이 엑기스 자체 점성만으로 촉(觸)을 설계하는 레시피도 가능하다."

export const LUMINA_BIO_EFFICACY_STATE_EN =
  "Plant stem-cell culture and fermentation are mature paths to precision at the cell level; viscosity-led touch without synthetic thickeners is formulation-realistic."

/** 3. 안전·보존 */
export const LUMINA_CONSCIOUS_PRESERVATION_KO =
  "천연 방부 대체제(예: 펜틸렌글라이콜 등)와 에어리스 용기를 결합하면, ‘알몸’ 엑기스도 장기 유통 안전성을 설계할 수 있다 — 클린을 넘어 컨셔스(Conscious) 보존 전략."

export const LUMINA_CONSCIOUS_PRESERVATION_EN =
  "Conscious preservation: mild glycolic co-solvents plus airless systems can defend bare serums for commercial shelf life — beyond clean-label slogans."

/** 왜 대기업이 피하는가 */
export const LUMINA_WHY_INCUMBENTS_AVOID_KO = {
  cost: "천연 오색 안정화·검증 비용이 인공 색소 대비 수배 높다.",
  standardization: "수확·시즌에 따른 미세 색차를 대량 라인이 ‘불량’으로 처리하기 쉽다.",
  packagingTemptation: "알맹이 고통보다 화려한 용기가 단기 전환이 쉽다.",
} as const

export const LUMINA_WHY_INCUMBENTS_AVOID_EN = {
  cost: "Stabilizing and validating natural chroma costs multiples of synthetic dye programs.",
  standardization: "Harvest variance reads as defect in mass SKU discipline.",
  packagingTemptation: "Ornate shells sell faster than naked essence R&D.",
} as const

/** 루미나 역할 — 포뮬러 데이터 */
export const LUMINA_ENGINE_FORMULATION_MISSION_KO =
  "AI로 ‘어떤 천연 원료를 어떻게 배합하면 색이 덜 변하고 효능 시그널을 극대화할 수 있는지’ 최적 포뮬레이션 데이터를 파트너에게 제공한다 — 남들이 비싸고 귀찮아서 안 하는 길을 기술로 실현."

export const LUMINA_ENGINE_FORMULATION_MISSION_EN =
  "Lumina’s engine should output formulation intelligence: which botanicals, stabilizers, and delivery forms minimize fade while maximizing efficacy — expensive paths made executable with data."

/** 이미지/카피 보조 블록 (Co-pilot·프롬프트에 붙일 수 있는 한 문단) */
export const LUMINA_TECH_REALITY_PROMPT_FRAGMENT_EN = [
  "2026 formulation reality: natural five-lane chroma is feasible with encapsulation / nano-emulsion for photostability; plant stem-cell and fermented actives for depth; conscious preservation + airless for bare-serum shelf life.",
  "Position as ultra-high-end technical luxury, not nostalgia — competitors skip for COGS and QC variance, not impossibility.",
].join(" ")

/** 첫 연구 과제 후보 — 우선순위 제안 (엔진 로드맵) */
export type LuminaFirstTechBarrierId =
  | "natural_chroma_photostability"
  | "preservative_minimal_shelf"
  | "harvest_chromatic_variance_qc"
  | "viscosity_without_synthetic_thickeners"

export const LUMINA_PRIORITY_TECH_BARRIERS: {
  id: LuminaFirstTechBarrierId
  titleKo: string
  titleEn: string
  rationaleKo: string
  rationaleEn: string
}[] = [
  {
    id: "natural_chroma_photostability",
    titleKo: "천연 색의 변질·광분해 방지",
    titleEn: "Photostability of natural chroma",
    rationaleKo:
      "브랜드 신뢰의 시각적 증거가 바로 색이므로, 캡슐화·나노 분산·포장 광차단 설계를 1순위로 두면 ‘본질의 빛’이 시장에서 깨지지 않는다.",
    rationaleEn:
      "Hue is your honesty signal in glass; stabilizing natural color against UV/time unlocks every other story.",
  },
  {
    id: "harvest_chromatic_variance_qc",
    titleKo: "수확·로트 간 미세 색차 QC",
    titleEn: "Lot-to-lot chromatic QC",
    rationaleKo:
      "대기업이 피하는 ‘미세한 다름’을 루미나는 데이터로 규격화·허용대역을 설계해 인디에게도 양산 언어를 준다.",
    rationaleEn:
      "Turn harvest variance into modeled tolerance bands — the moat incumbents refuse to operationalize.",
  },
  {
    id: "preservative_minimal_shelf",
    titleKo: "화학 방부 최소화와 유통 안전",
    titleEn: "Minimal chemistry preservation, proven shelf",
    rationaleKo:
      "컨셔스 보존 + 에어리스는 이미 가능; ‘몇 %까지 줄이고 몇 개월을 보장할지’를 레시피 그래프로 증명하는 것이 둘째 축.",
    rationaleEn:
      "Pair conscious preservatives with airless; ship evidence curves, not slogans.",
  },
  {
    id: "viscosity_without_synthetic_thickeners",
    titleKo: "합성 점증제 없는 촉(觸) 설계",
    titleEn: "Touch without synthetic thickeners",
    rationaleKo:
      "발효·고농축 추출물만의 점성 곡선은 色→觸 서사와 직결; 촉각적 시각화와 같은 데이터 파이프가 필요하다.",
    rationaleEn:
      "Intrinsic viscosity from concentrate and fermentation completes the visual-haptic promise.",
  },
]

/** 멘토 결론 한 줄 */
export const LUMINA_BLUE_OCEAN_CLOSING_KO =
  "불가능해 보이는 가능성을 데이터로 증명하는 것이 루미나의 첫 과제다."

export const LUMINA_BLUE_OCEAN_CLOSING_EN =
  "Lumina’s first job is to prove impossible-looking possibilities with data."
