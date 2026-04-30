/**
 * Lumina Color Intelligence — 자연 유래 오색 (생명의 결)
 * 합성 원색이 아닌 시간·빛·추출물의 가변 채도를 비주얼 엔진 파라미터로 고정.
 */

export type NaturalColorId = "sakura" | "azalea" | "dandelion" | "forest" | "purity"

/** 0 = 수분감·가벼운 유동, 1 = 꿀·앰버급 묵직한 점성 (렌더·모션 가이드) */
export type ViscositySim = 0 | 0.25 | 0.5 | 0.75 | 1

export type NaturalColorEntry = {
  id: NaturalColorId
  symbol: string
  nameKo: string
  nameEn: string
  knowledgeDataKo: string
  knowledgeDataEn: string
  luminaReadKo: string
  luminaReadEn: string
  visualImplementationKo: string
  visualImplementationEn: string
  /** Fluid dynamics — 점성 시뮬레이션 가이드 */
  viscosity: ViscositySim
  viscosityNoteEn: string
  /** 산란·틴들 강조 계수 (프롬프트 서술 강도) */
  scatterEmphasis: "high" | "very_high" | "extreme"
}

export const NATURAL_COLOR_INTELLIGENCE: NaturalColorEntry[] = [
  {
    id: "sakura",
    symbol: "🌸",
    nameKo: "벚꽃색",
    nameEn: "Sakura pink",
    knowledgeDataKo: "옅은 분홍빛 속에 미세하게 서린 하얀 수분감",
    knowledgeDataEn: "Pale pink with a veil of white moisture inside the hue",
    luminaReadKo: "긴 방황(겨울) 끝에 찾아온 첫 번째 안도감",
    luminaReadEn: "The first relief after a long winter of wandering",
    visualImplementationKo:
      "투명 용기 안에서 은은히 번지는 반투명 핑크; 빛을 받으면 백색으로 산란되는 청초한 투명도",
    visualImplementationEn:
      "Semi-transparent pink blooming inside clear glass; under light, innocent forward-scatter toward white",
    viscosity: 0.25,
    viscosityNoteEn: "High watery mobility, low meniscus drag, dew-like cling to inner wall",
    scatterEmphasis: "very_high",
  },
  {
    id: "azalea",
    symbol: "🌺",
    nameKo: "진달래색",
    nameEn: "Azalea magenta",
    knowledgeDataKo: "산기슭의 척박함을 이겨낸 진하고 맑은 자주빛",
    knowledgeDataEn: "Deep, clear magenta-violet born of harsh mountainside survival",
    luminaReadKo: "포장을 걷어내고 드러낸 알맹이의 강력한 에너지",
    luminaReadEn: "Fierce energy of the core once ornament is stripped away",
    visualImplementationKo:
      "묵직한 점성의 딥 핑크; 용기 바닥면 그림자가 붉은 보석처럼 영롱",
    visualImplementationEn:
      "Dense viscous deep pink; pooled shadow on the glass base reads like a ruby caustic",
    viscosity: 0.75,
    viscosityNoteEn: "Thick serum body, slow pour, jewel-like pooling and sharp red undertone in shadow",
    scatterEmphasis: "high",
  },
  {
    id: "dandelion",
    symbol: "🌼",
    nameKo: "민들레색",
    nameEn: "Dandelion yellow",
    knowledgeDataKo: "길가 어디서든 뿌리 내리는 강인한 노란빛",
    knowledgeDataEn: "Resilient roadside yellow that roots anywhere",
    luminaReadKo: "기본(小)에 충실하여 얻어낸 단단한 영양의 정수",
    luminaReadEn: "The dense distillate of fidelity to fundamentals",
    visualImplementationKo:
      "꿀처럼 찰진 황금빛 액체; 미드나잇 블루와 만날 때 가장 찬란한 고농축 황금비율",
    visualImplementationEn:
      "Honey-thick golden serum; against midnight blue it becomes the most brilliant condensed gold ratio",
    viscosity: 1,
    viscosityNoteEn: "Maximum viscosity cue — heavy golden flow, slow coherent ribbons, high internal glow",
    scatterEmphasis: "extreme",
  },
  {
    id: "forest",
    symbol: "🌿",
    nameKo: "숲의 청색",
    nameEn: "Forest teal",
    knowledgeDataKo: "이슬 머금은 잎사귀에서 배어 나오는 맑은 초록빛",
    knowledgeDataEn: "Clear green-teal leached from dew-heavy leaves",
    luminaReadKo: "외곡된 시선을 멈추게 하는 내면의 고요함",
    luminaReadEn: "Inward stillness that stops the restless gaze",
    visualImplementationKo:
      "심해처럼 깊지만 맑은 청록; 빛 투과 시 숲 공기 같은 쿨링 투명도",
    visualImplementationEn:
      "Deep yet lucid teal; transmitted light feels like cool forest air — cooling transparency",
    viscosity: 0.5,
    viscosityNoteEn: "Balanced flow, silken meniscus, Tyndall in cool cyan-green scatter",
    scatterEmphasis: "very_high",
  },
  {
    id: "purity",
    symbol: "☁️",
    nameKo: "순백색",
    nameEn: "Purity white",
    knowledgeDataKo: "갓 씻은 쌀이나 진주에서 나오는 우윳빛 광택",
    knowledgeDataEn: "Milky-pearlescent luster from rinsed rice or pearl",
    luminaReadKo: "모든 군더더기를 걷어낸 알몸의 순수",
    luminaReadEn: "Bare purity after every garnish is removed",
    visualImplementationKo:
      "불투명과 투명의 경계의 오팔 화이트; 스스로 빛을 머금는 자체 발광 질감",
    visualImplementationEn:
      "Opal white straddling opacity and transparency; self-lit glow as if the serum holds its own dawn",
    viscosity: 0.5,
    viscosityNoteEn: "Creamy opalescent body, soft internal scatter, minimal chroma but maximal milk-glass depth",
    scatterEmphasis: "very_high",
  },
]

const KW_SAKURA_KO = [
  "안도",
  "안도감",
  "본질",
  "각성",
  "벚꽃",
  "회귀",
  "정수",
  "방황",
  "겨울",
  "침묵",
  "고요",
]
const KW_SAKURA_EN = [
  "relief",
  "essence",
  "awakening",
  "sakura",
  "return",
  "stillness",
  "quiet",
  "winter",
  "truth",
  "core",
]

const KW_AZALEA_KO = ["진달래", "강인", "에너지", "알맹이", "자주", "생명력"]
const KW_AZALEA_EN = ["azalea", "vigor", "core", "magenta", "jewel", "intense"]

const KW_DANDELION_KO = ["민들레", "영양", "황금", "기본", "견실", "단단"]
const KW_DANDELION_EN = ["dandelion", "nourish", "gold", "golden", "firm", "basics"]

const KW_FOREST_KO = ["숲", "청록", "치유", "진정", "평온", "쿨링", "이슬"]
const KW_FOREST_EN = ["forest", "heal", "calm", "teal", "cool", "dew", "serenity"]

const KW_PURITY_KO = ["순백", "순수", "백색", "진주", "쌀", "정갈", "미백"]
const KW_PURITY_EN = ["purity", "white", "pearl", "rice", "clean", "bare", "opal"]

function textMatchesAny(haystack: string, needles: readonly string[]): boolean {
  const h = haystack.toLowerCase()
  return needles.some((n) => h.includes(n.toLowerCase()))
}

export type EmotionalColorAlchemyResult = {
  matchedNatural: NaturalColorId | null
  /** 안도·본질 등 → 벚꽃 + 미드나잇 블루 조합 권장 */
  pairSakuraWithMidnightBlue: boolean
  promptTailEn: string
}

/**
 * 사용자 자유 입력에서 자연색 레인과 미드나잇 페어링 힌트 추출 (이미지·카피 라우팅).
 */
export function resolveEmotionalColorAlchemy(userText: string): EmotionalColorAlchemyResult {
  const t = userText.trim()
  if (!t) {
    return {
      matchedNatural: null,
      pairSakuraWithMidnightBlue: false,
      promptTailEn: "",
    }
  }

  if (textMatchesAny(t, KW_SAKURA_KO) || textMatchesAny(t, KW_SAKURA_EN)) {
    return {
      matchedNatural: "sakura",
      pairSakuraWithMidnightBlue: true,
      promptTailEn:
        "EMOTIONAL ROUTING: user language signals relief / essence / awakening — prioritize Sakura pink intrinsic serum in ultra-clear glass against deep navy midnight (#112240); soft forward scatter to white, Tyndall pearls, quiet dawn rim light.",
    }
  }
  if (textMatchesAny(t, KW_AZALEA_KO) || textMatchesAny(t, KW_AZALEA_EN)) {
    return {
      matchedNatural: "azalea",
      pairSakuraWithMidnightBlue: false,
      promptTailEn:
        "EMOTIONAL ROUTING: azalea-magenta lane — dense viscous deep pink, ruby-like base caustic, strong inner life without neon saturation.",
    }
  }
  if (textMatchesAny(t, KW_DANDELION_KO) || textMatchesAny(t, KW_DANDELION_EN)) {
    return {
      matchedNatural: "dandelion",
      pairSakuraWithMidnightBlue: false,
      promptTailEn:
        "EMOTIONAL ROUTING: dandelion-gold lane — honey-thick golden serum, slow ribbons, maximum brilliance vs midnight void.",
    }
  }
  if (textMatchesAny(t, KW_FOREST_KO) || textMatchesAny(t, KW_FOREST_EN)) {
    return {
      matchedNatural: "forest",
      pairSakuraWithMidnightBlue: false,
      promptTailEn:
        "EMOTIONAL ROUTING: forest-teal lane — deep lucid teal, cooling transmitted light, forest-air Tyndall scatter.",
    }
  }
  if (textMatchesAny(t, KW_PURITY_KO) || textMatchesAny(t, KW_PURITY_EN)) {
    return {
      matchedNatural: "purity",
      pairSakuraWithMidnightBlue: false,
      promptTailEn:
        "EMOTIONAL ROUTING: purity-opal lane — milky pearl white, self-lit internal glow, boundary between opacity and glass clarity.",
    }
  }

  return {
    matchedNatural: null,
    pairSakuraWithMidnightBlue: false,
    promptTailEn: "",
  }
}

export function getNaturalColorEntry(id: NaturalColorId): NaturalColorEntry {
  const e = NATURAL_COLOR_INTELLIGENCE.find((x) => x.id === id)
  if (!e) return NATURAL_COLOR_INTELLIGENCE[0]!
  return e
}

/** 단일 레인 — 이미지 모델용 정밀 블록 */
export function buildNaturalColorRenderPrompt(colorId: NaturalColorId): string {
  const c = getNaturalColorEntry(colorId)
  const vis =
    c.viscosity <= 0.25
      ? "low viscosity, aqueous dew-like flow"
      : c.viscosity >= 0.85
        ? "high viscosity, honey-slow coherent pour"
        : "medium viscosity, silken serum"

  const scatter =
    c.scatterEmphasis === "extreme"
      ? "maximize forward scattering and Tyndall micro-sparkle inside the liquid"
      : c.scatterEmphasis === "very_high"
        ? "strong Tyndall and soft volumetric scatter through the serum"
        : "noticeable particle sparkle and controlled scatter"

  return [
    "NATURAL COLOR INTELLIGENCE — not CMYK/RGB primaries; emulate time- and light-aged botanical extract chroma with variable saturation.",
    `Lane: ${c.nameEn} (${c.symbol}) — ${c.luminaReadEn}`,
    `Botanical knowledge: ${c.knowledgeDataEn}`,
    `Visual: ${c.visualImplementationEn}`,
    `Fluid sim: ${vis}; ${c.viscosityNoteEn}.`,
    `Light: morning sun through crystal glass; ${scatter}; caustics project truthful hue — honest luxury.`,
  ].join(" ")
}

/** 글로벌 주입 블록 — Glass Clarity / Five-Essence와 병행 */
export function buildNaturalColorIntelligenceMasterPrompt(): string {
  return [
    "COLOR ALCHEMY (Lumina): all hues read as natural-extract variable chroma — sakura semi-transparent pink with white scatter, azalea dense jewel magenta, dandelion condensed honey gold, forest deep lucid teal, purity opal self-lit white.",
    "FLUID DYNAMICS: viscosity differs by lane — sakura most aqueous, dandelion most viscous; meniscus and pool shadows must respect that difference physically.",
    "LIGHT INTERACTION: maximize scattering + Tyndall in clear vessel; silver dawn rim; midnight blue negative space so only the essence glows like a jewel.",
  ].join(" ")
}
