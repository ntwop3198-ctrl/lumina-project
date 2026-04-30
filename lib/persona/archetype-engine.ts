/**
 * 브랜드 페르소나 진단 → 4가지 아키타입 (에테르 뮤즈, 볼드 알케미스트, 미네랄 가디언, 글래스 아키텍트)
 */

import { essentialismDiamondMultiplier } from "@/lib/lumina/paradox-engine"

export type ArchetypeId = "ether_muse" | "bold_alchemist" | "mineral_guardian" | "glass_architect"

export type ArchetypeProfile = {
  id: ArchetypeId
  nameKo: string
  nameEn: string
  essenceKo: string
  essenceEn: string
  /** 화보 목업용 그라데이션 */
  mockGradient: string
  /** 팔레트 스와치 */
  palette: { hex: string; labelKo: string; labelEn: string }[]
}

const ARCHETYPES: Record<ArchetypeId, ArchetypeProfile> = {
  ether_muse: {
    id: "ether_muse",
    nameKo: "에테르 뮤즈",
    nameEn: "Ether Muse",
    essenceKo: "감성의 안개 속에서 본질만 남깁니다. 부드러운 광채와 여백이 브랜드의 언어입니다.",
    essenceEn: "Essence distilled in mist and feeling — soft radiance and negative space speak for you.",
    mockGradient:
      "linear-gradient(145deg, rgba(232,238,245,0.35) 0%, rgba(154,163,173,0.2) 35%, rgba(0,27,58,0.85) 100%)",
    palette: [
      { hex: "#E8EEF5", labelKo: "페일 에테르", labelEn: "Pale ether" },
      { hex: "#9AA3AD", labelKo: "실버 미스트", labelEn: "Silver mist" },
      { hex: "#112240", labelKo: "미드나잇", labelEn: "Midnight" },
    ],
  },
  bold_alchemist: {
    id: "bold_alchemist",
    nameKo: "볼드 알케미스트",
    nameEn: "Bold Alchemist",
    essenceKo: "실험과 대비로 진실을 증명합니다. 크롬의 날카로움과 액체의 점성이 한 화면에 충돌합니다.",
    essenceEn: "Truth through experiment and contrast — chrome edge meets viscous depth.",
    mockGradient:
      "linear-gradient(160deg, rgba(192,192,192,0.45) 0%, rgba(10,22,40,0.9) 45%, rgba(0,0,0,0.95) 100%)",
    palette: [
      { hex: "#C0C0C0", labelKo: "리퀴드 실버", labelEn: "Liquid silver" },
      { hex: "#0A1628", labelKo: "딥 크롬", labelEn: "Deep chrome" },
      { hex: "#F8FAFC", labelKo: "하이라이트", labelEn: "Highlight" },
    ],
  },
  mineral_guardian: {
    id: "mineral_guardian",
    nameKo: "미네랄 가디언",
    nameEn: "Mineral Guardian",
    essenceKo: "암석처럼 쌓인 신뢰와 데이터. 침묵의 밀도가 브랜드의 방어력이 됩니다.",
    essenceEn: "Trust layered like strata — silent density becomes your brand armor.",
    mockGradient:
      "linear-gradient(135deg, rgba(107,114,128,0.35) 0%, rgba(55,65,81,0.55) 40%, rgba(0,27,58,0.92) 100%)",
    palette: [
      { hex: "#6B7280", labelKo: "슬레이트", labelEn: "Slate" },
      { hex: "#9CA3AF", labelKo: "미네랄 그레이", labelEn: "Mineral gray" },
      { hex: "#001B3A", labelKo: "심해 블루", labelEn: "Abyss blue" },
    ],
  },
  glass_architect: {
    id: "glass_architect",
    nameKo: "글래스 아키텍트",
    nameEn: "Glass Architect",
    essenceKo: "빛의 굴절과 구조의 정밀. 유리와 선으로 시장이 이해하는 명품 서사를 설계합니다.",
    essenceEn: "Refraction and precision — glass and line architect luxury the market reads instantly.",
    mockGradient:
      "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(223,230,238,0.15) 30%, rgba(0,27,58,0.88) 70%, rgba(0,0,0,0.9) 100%)",
    palette: [
      { hex: "#DFE6EE", labelKo: "프로스트 글래스", labelEn: "Frost glass" },
      { hex: "#FFFFFF", labelKo: "스펙큘러", labelEn: "Specular" },
      { hex: "#112240", labelKo: "베이스 글래스", labelEn: "Base glass" },
    ],
  },
}

export function getArchetypeProfile(id: ArchetypeId): ArchetypeProfile {
  return ARCHETYPES[id]
}

export type DiagnosisInput = {
  /** STEP 2: 선택한 문구 (한글 또는 영문 문자열) */
  phraseChoice: string
  /** STEP 3: 타깃 선택 */
  audienceChoice: string
  /** STEP 4: 서술형 원칙 */
  principleText: string
  /** STEP 5: 칩 라벨들 (현재 언어) */
  chips: string[]
  isKo: boolean
}

function chipScores(chips: string[], isKo: boolean): Record<ArchetypeId, number> {
  const s: Record<ArchetypeId, number> = {
    ether_muse: 0,
    bold_alchemist: 0,
    mineral_guardian: 0,
    glass_architect: 0,
  }
  for (const c of chips) {
    if (isKo) {
      if (c === "안개") s.ether_muse += 3
      if (c === "유리") s.glass_architect += 3
      if (c === "크롬") s.bold_alchemist += 2
      if (c === "클리닉") s.bold_alchemist += 2
      if (c === "미네랄") s.mineral_guardian += 3
      if (c === "심해") s.mineral_guardian += 2
    } else {
      if (c === "Mist") s.ether_muse += 3
      if (c === "Glass") s.glass_architect += 3
      if (c === "Chrome") s.bold_alchemist += 2
      if (c === "Clinic") s.bold_alchemist += 2
      if (c === "Mineral") s.mineral_guardian += 3
      if (c === "Deep sea") s.mineral_guardian += 2
    }
  }
  return s
}

export const PHRASES_KO = [
  "타협하지 않은 당신의 고집이, 브랜드의 유일한 자산입니다.",
  "수치와 임상이 아니면 말하지 않겠다는 원칙을 지킵니다.",
  "감각의 아름다움보다 피부의 고요가 먼저입니다.",
  "글로벌 무대에서 한국적 정밀함을 증명하고 싶습니다.",
] as const

export const PHRASES_EN = [
  "What you refused to compromise is your brand's only true asset.",
  "You speak only when numbers and clinical proof allow.",
  "Calm skin before decorative beauty — always.",
  "You want Korean precision to read as global luxury.",
] as const

function phraseScores(phrase: string, isKo: boolean): Record<ArchetypeId, number> {
  const s: Record<ArchetypeId, number> = {
    ether_muse: 0,
    bold_alchemist: 0,
    mineral_guardian: 0,
    glass_architect: 0,
  }
  const list = isKo ? PHRASES_KO : PHRASES_EN
  const idx = list.findIndex((p) => p === phrase.trim())
  if (idx === 0) {
    s.bold_alchemist += 3
    s.ether_muse += 2
  } else if (idx === 1) {
    s.mineral_guardian += 4
    s.glass_architect += 1
  } else if (idx === 2) {
    s.ether_muse += 4
    s.mineral_guardian += 1
  } else if (idx === 3) {
    s.glass_architect += 4
    s.bold_alchemist += 2
  }
  return s
}

function textHints(text: string, isKo: boolean): Record<ArchetypeId, number> {
  const s: Record<ArchetypeId, number> = {
    ether_muse: 0,
    bold_alchemist: 0,
    mineral_guardian: 0,
    glass_architect: 0,
  }
  const t = text.toLowerCase()
  if (isKo) {
    if (/고요|감성|부드|향|온도/.test(text)) s.ether_muse += 2
    if (/실험|대담|강한|대비|독보/.test(text)) s.bold_alchemist += 2
    if (/데이터|임상|수치|성분|검증/.test(text)) s.mineral_guardian += 2
    if (/구조|선|유리|프리미엄|글로벌/.test(text)) s.glass_architect += 2
  } else {
    if (/calm|soft|sensor|warm|quiet/.test(t)) s.ether_muse += 2
    if (/bold|contrast|experiment|edge/.test(t)) s.bold_alchemist += 2
    if (/data|clinical|metric|proof|ingredient/.test(t)) s.mineral_guardian += 2
    if (/structure|line|glass|global|luxury/.test(t)) s.glass_architect += 2
  }
  return s
}

function addScores(
  a: Record<ArchetypeId, number>,
  b: Record<ArchetypeId, number>,
): Record<ArchetypeId, number> {
  return {
    ether_muse: a.ether_muse + b.ether_muse,
    bold_alchemist: a.bold_alchemist + b.bold_alchemist,
    mineral_guardian: a.mineral_guardian + b.mineral_guardian,
    glass_architect: a.glass_architect + b.glass_architect,
  }
}

const ORDER: ArchetypeId[] = ["ether_muse", "bold_alchemist", "mineral_guardian", "glass_architect"]

/** Lumina Genesis 1–5단 선택 응답 (穩·準·快) */
export type Genesis5Answers = {
  origin: string
  logic: string
  presence: string
  action: string
  vision: string
}

/** 6단 Diamond Wisdom 본질 서술 포함 — 비주얼 엔진·아키타입 최종 입력 */
export type GenesisDiagnosisAnswers = Genesis5Answers & {
  /** 겉모습을 떠난 불변 정수 (Vajra) — 추론 시 최고 가중치 */
  diamondEssence: string
}

/** API/렌더 큐로 넘길 때 묶음 */
export type GenesisVisualEngineInput = {
  archetypeId: ArchetypeId
  answers: GenesisDiagnosisAnswers
}

function addTo(
  s: Record<ArchetypeId, number>,
  id: ArchetypeId,
  n: number,
): Record<ArchetypeId, number> {
  return { ...s, [id]: s[id] + n }
}

/** Diamond Wisdom 서술 — 아키타입에 가장 강하게 반영 (비주얼 엔진 1순위 시그널) */
const DIAMOND_WEIGHT = 4.25

function scoreDiamondEssence(text: string, isKo: boolean): Record<ArchetypeId, number> {
  const d: Record<ArchetypeId, number> = {
    ether_muse: 0,
    bold_alchemist: 0,
    mineral_guardian: 0,
    glass_architect: 0,
  }
  const t = text.trim()
  if (!t) return d

  if (isKo) {
    if (/고요|감성|부드|여백|안개|숨|깊이|정적|온화|포근|녹아|스며/.test(t)) d.ether_muse += 5
    if (/날카|파괴|용기|대비|독보|압도|전진|불꽃|격렬|끝까지 밀/.test(t)) d.bold_alchemist += 5
    if (/데이터|수치|검증|암석|밀도|수호|견고|정직|본질|불변|한치|신뢰의 층|쌓/.test(t)) d.mineral_guardian += 5
    if (/선|구조|정밀|유리|명료|설계|기하|투명|굴절|프레임|격자/.test(t)) d.glass_architect += 5
    if (/정수|금강|다이아|vajra|불괴|끝까지 남|사라져도/.test(t)) {
      d.mineral_guardian += 3
      d.bold_alchemist += 2
    }
  } else {
    const x = t.toLowerCase()
    if (/quiet|soft|mist|depth|still|calm|gentle|hush|ethereal/.test(x)) d.ether_muse += 5
    if (/sharp|break|forge|courage|contrast|sole|overwhelm|fire|thrust/.test(x)) d.bold_alchemist += 5
    if (/data|metric|proof|strata|guard|dense|honest|essence|invariant|layer|trust/.test(x))
      d.mineral_guardian += 5
    if (/line|structure|precision|glass|clear|design|geometry|grid|refraction/.test(x))
      d.glass_architect += 5
    if (/vajra|diamond|indestruct|remains when|stripped|surface/.test(x)) {
      d.mineral_guardian += 3
      d.bold_alchemist += 2
    }
  }

  const hints = textHints(t, isKo)
  for (const id of ORDER) d[id] += hints[id]

  return d
}

export function inferArchetypeFromGenesis5(
  input: GenesisDiagnosisAnswers,
  isKo: boolean,
): ArchetypeId {
  let s: Record<ArchetypeId, number> = {
    ether_muse: 0,
    bold_alchemist: 0,
    mineral_guardian: 0,
    glass_architect: 0,
  }
  const { origin, logic, presence, action, vision, diamondEssence } = input

  if (isKo) {
    if (origin.includes("0.1%")) s = addTo(s, "mineral_guardian", 3), (s = addTo(s, "bold_alchemist", 2))
    if (origin.includes("추출")) s = addTo(s, "bold_alchemist", 3), (s = addTo(s, "ether_muse", 1))
    if (origin.includes("가격")) s = addTo(s, "glass_architect", 3)
    if (origin.includes("제형")) s = addTo(s, "glass_architect", 2), (s = addTo(s, "ether_muse", 2))

    if (logic.includes("치유")) s = addTo(s, "ether_muse", 3)
    if (logic.includes("정돈")) s = addTo(s, "glass_architect", 3)
    if (logic.includes("영양")) s = addTo(s, "mineral_guardian", 3)
    if (logic.includes("본연")) s = addTo(s, "mineral_guardian", 3)

    if (presence.includes("심해") || presence.includes("미드나잇")) {
      s = addTo(s, "mineral_guardian", 2)
      s = addTo(s, "ether_muse", 2)
    }
    if (presence.includes("실버")) s = addTo(s, "bold_alchemist", 2), (s = addTo(s, "glass_architect", 3))
    if (presence.includes("앰버") || presence.includes("골드"))
      s = addTo(s, "bold_alchemist", 2), (s = addTo(s, "ether_muse", 1))

    if (action.includes("기적")) s = addTo(s, "ether_muse", 3)
    if (action.includes("침투")) s = addTo(s, "bold_alchemist", 3)
    if (action.includes("고집")) s = addTo(s, "bold_alchemist", 2), (s = addTo(s, "glass_architect", 2))
    if (action.includes("정밀")) s = addTo(s, "glass_architect", 2), (s = addTo(s, "mineral_guardian", 2))

    if (vision.includes("개척")) s = addTo(s, "bold_alchemist", 4)
    if (vision.includes("수호")) s = addTo(s, "mineral_guardian", 4)
    if (vision.includes("혁신")) s = addTo(s, "glass_architect", 4)
  } else {
    const o = origin.toLowerCase()
    const l = logic.toLowerCase()
    const p = presence.toLowerCase()
    const a = action.toLowerCase()
    const v = vision.toLowerCase()

    if (/0\.1%|ingredient precision/i.test(o)) s = addTo(s, "mineral_guardian", 3), (s = addTo(s, "bold_alchemist", 2))
    if (/extraction|compromise/i.test(o)) s = addTo(s, "bold_alchemist", 3), (s = addTo(s, "ether_muse", 1))
    if (/pricing|honest/i.test(o)) s = addTo(s, "glass_architect", 3)
    if (/texture|formula/i.test(o)) s = addTo(s, "glass_architect", 2), (s = addTo(s, "ether_muse", 2))

    if (/healing|miracle/i.test(l)) s = addTo(s, "ether_muse", 3)
    if (/ordered|impeccable/i.test(l)) s = addTo(s, "glass_architect", 3)
    if (/nourishment|designed/i.test(l)) s = addTo(s, "mineral_guardian", 3)
    if (/intrinsic|unwavering/i.test(l)) s = addTo(s, "mineral_guardian", 3)

    if (/midnight|deep sea|still/i.test(p)) s = addTo(s, "mineral_guardian", 2), (s = addTo(s, "ether_muse", 2))
    if (/silver|sharp suit/i.test(p)) s = addTo(s, "bold_alchemist", 2), (s = addTo(s, "glass_architect", 3))
    if (/amber|gold coat/i.test(p)) s = addTo(s, "bold_alchemist", 2), (s = addTo(s, "ether_muse", 1))

    if (/miracle for skin/i.test(a)) s = addTo(s, "ether_muse", 3)
    if (/penetration|perfect/i.test(a)) s = addTo(s, "bold_alchemist", 3)
    if (/stubbornness|never wrong/i.test(a)) s = addTo(s, "bold_alchemist", 2), (s = addTo(s, "glass_architect", 2))
    if (/precision|reverses time/i.test(a)) s = addTo(s, "glass_architect", 2), (s = addTo(s, "mineral_guardian", 2))

    if (/pioneer|shifts the market/i.test(v)) s = addTo(s, "bold_alchemist", 4)
    if (/guardian|essential value/i.test(v)) s = addTo(s, "mineral_guardian", 4)
    if (/innovator|redefin/i.test(v)) s = addTo(s, "glass_architect", 4)
  }

  const diamond = scoreDiamondEssence(diamondEssence, isKo)
  const ess = essentialismDiamondMultiplier(diamondEssence)
  for (const id of ORDER) {
    s[id] += Math.round(diamond[id] * DIAMOND_WEIGHT * ess)
  }

  let best: ArchetypeId = "glass_architect"
  let max = -1
  for (const id of ORDER) {
    if (s[id] > max) {
      max = s[id]
      best = id
    }
  }
  return best
}

/** 비주얼 파이프라인용 페이로드 조립 (클라이언트에서 fetch 본문 등에 사용) */
export function buildGenesisVisualEngineInput(
  archetypeId: ArchetypeId,
  answers: GenesisDiagnosisAnswers,
): GenesisVisualEngineInput {
  return { archetypeId, answers }
}

export function inferArchetype(input: DiagnosisInput): ArchetypeId {
  let total: Record<ArchetypeId, number> = {
    ether_muse: 0,
    bold_alchemist: 0,
    mineral_guardian: 0,
    glass_architect: 0,
  }
  total = addScores(total, phraseScores(input.phraseChoice, input.isKo))
  total = addScores(total, chipScores(input.chips, input.isKo))
  total = addScores(total, textHints(input.principleText, input.isKo))

  let best: ArchetypeId = "glass_architect"
  let max = -1
  for (const id of ORDER) {
    if (total[id] > max) {
      max = total[id]
      best = id
    }
  }
  if (max <= 0) {
    const aud = input.audienceChoice
    if (input.isKo) {
      if (aud.includes("민감")) return "ether_muse"
      if (aud.includes("클리닉")) return "bold_alchemist"
      if (aud.includes("글로벌")) return "glass_architect"
    } else {
      if (/sensitive/i.test(aud)) return "ether_muse"
      if (/clinic/i.test(aud)) return "bold_alchemist"
      if (/global/i.test(aud)) return "glass_architect"
    }
    return "mineral_guardian"
  }
  return best
}
