/**
 * The Alchemist's Palette — 본연의 오색 (오방색 계열 × 기능 정수)
 * Five-Essence Rendering · UI 토큰 · 이미지 프롬프트
 */

export type FiveEssenceId = "qing" | "huang" | "chi" | "bai" | "cheng"

export type FiveEssenceEntry = {
  id: FiveEssenceId
  /** 한자 표기 (UI) */
  hanja: string
  labelKo: string
  labelEn: string
  originKo: string
  originEn: string
  functionKo: string
  functionEn: string
  messageKo: string
  messageEn: string
  /** 섹션 앰비언트 오버레이 (CSS background, transition) */
  ambientBackground: string
  /** 기본 미드나잇 글로우 구체 opacity 배율 (1 = 기본) */
  midnightGlowScale: number
  /** SVG 액체 시각 토큰 */
  visual: {
    emissive0: string
    emissive40: string
    emissive100: string
    liq0: string
    liq32: string
    liq58: string
    liq100: string
    particleWarm: string
    particleCool: string
    bottomGlow: string
  }
}

export const FIVE_ESSENCE_PALETTE: FiveEssenceEntry[] = [
  {
    id: "qing",
    hanja: "靑",
    labelKo: "靑 · 청색",
    labelEn: "Azure · Blue",
    originKo: "해조류, 블루 탄지, 청색 식물",
    originEn: "Marine algae, blue carbon extracts, blue-hued botanicals",
    functionKo: "[진정 & 수분] 피부의 화(火)를 잠재움",
    functionEn: "[Calm & hydration] Quiets heat and stress in the skin",
    messageKo: "고요한 휴식",
    messageEn: "A quiet recess",
    ambientBackground:
      "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,120,175,0.14) 0%, transparent 55%)",
    midnightGlowScale: 0.82,
    visual: {
      emissive0: "rgba(160,220,245,0.5)",
      emissive40: "rgba(80,160,210,0.28)",
      emissive100: "rgba(0,45,82,0.1)",
      liq0: "rgba(230,248,255,0.58)",
      liq32: "rgba(120,200,235,0.4)",
      liq58: "rgba(60,130,185,0.35)",
      liq100: "rgba(0,40,72,0.62)",
      particleWarm: "rgba(200,235,255,0.9)",
      particleCool: "rgba(255,255,255,0.85)",
      bottomGlow:
        "radial-gradient(ellipse at center, rgba(100,190,230,0.26), rgba(40,100,150,0.1) 45%, transparent 72%)",
    },
  },
  {
    id: "huang",
    hanja: "黃",
    labelKo: "黃 · 황금",
    labelEn: "Yellow · Gold",
    originKo: "프로폴리스, 비타민C, 단호박",
    originEn: "Propolis, vitamin C, pumpkin",
    functionKo: "[영양 & 탄력] 피부의 중심을 세움",
    functionEn: "[Nourish & firmness] Centers and grounds the skin",
    messageKo: "견실한 풍요",
    messageEn: "Grounded abundance",
    ambientBackground:
      "radial-gradient(ellipse 80% 60% at 50% 42%, rgba(220,175,80,0.12) 0%, transparent 58%)",
    midnightGlowScale: 0.88,
    visual: {
      emissive0: "rgba(255,230,160,0.55)",
      emissive40: "rgba(235,190,95,0.32)",
      emissive100: "rgba(60,45,20,0.1)",
      liq0: "rgba(255,248,230,0.65)",
      liq32: "rgba(255,215,130,0.45)",
      liq58: "rgba(220,170,80,0.32)",
      liq100: "rgba(55,40,15,0.55)",
      particleWarm: "rgba(255,235,180,0.95)",
      particleCool: "rgba(255,252,245,0.88)",
      bottomGlow:
        "radial-gradient(ellipse at center, rgba(255,210,120,0.28), rgba(200,160,70,0.12) 45%, transparent 72%)",
    },
  },
  {
    id: "chi",
    hanja: "赤",
    labelKo: "赤 · 적색",
    labelEn: "Red · Ruby",
    originKo: "석류, 아스타잔틴, 히비스커스",
    originEn: "Pomegranate, astaxanthin, hibiscus",
    functionKo: "[활력 & 항산화] 피부에 생명력을 주입",
    functionEn: "[Vitality & antioxidant] Pours life into the skin",
    messageKo: "멈추지 않는 시간",
    messageEn: "Time that does not stall",
    ambientBackground:
      "radial-gradient(ellipse 75% 55% at 48% 45%, rgba(180,70,95,0.11) 0%, transparent 55%)",
    midnightGlowScale: 0.85,
    visual: {
      emissive0: "rgba(255,160,165,0.52)",
      emissive40: "rgba(220,90,110,0.3)",
      emissive100: "rgba(50,15,25,0.12)",
      liq0: "rgba(255,235,238,0.6)",
      liq32: "rgba(240,130,145,0.42)",
      liq58: "rgba(180,70,95,0.35)",
      liq100: "rgba(45,12,22,0.58)",
      particleWarm: "rgba(255,200,205,0.92)",
      particleCool: "rgba(255,245,246,0.88)",
      bottomGlow:
        "radial-gradient(ellipse at center, rgba(230,120,130,0.24), rgba(140,50,70,0.1) 45%, transparent 72%)",
    },
  },
  {
    id: "bai",
    hanja: "白",
    labelKo: "白 · 백색",
    labelEn: "White · Pearl",
    originKo: "쌀 추출물, 진주, 나이아신아마이드",
    originEn: "Rice extract, pearl, niacinamide",
    functionKo: "[미백 & 순수] 피부 본연의 빛을 회복",
    functionEn: "[Brightening & purity] Restores the skin’s native light",
    messageKo: "정갈한 근본",
    messageEn: "Clarity at the root",
    ambientBackground:
      "radial-gradient(ellipse 85% 65% at 50% 38%, rgba(245,248,252,0.1) 0%, transparent 52%)",
    midnightGlowScale: 0.92,
    visual: {
      emissive0: "rgba(255,252,248,0.58)",
      emissive40: "rgba(230,236,245,0.3)",
      emissive100: "rgba(30,45,65,0.08)",
      liq0: "rgba(255,255,252,0.68)",
      liq32: "rgba(240,245,250,0.48)",
      liq58: "rgba(210,225,240,0.3)",
      liq100: "rgba(25,40,58,0.55)",
      particleWarm: "rgba(255,250,240,0.95)",
      particleCool: "rgba(248,252,255,0.92)",
      bottomGlow:
        "radial-gradient(ellipse at center, rgba(230,240,252,0.22), rgba(200,215,235,0.1) 45%, transparent 72%)",
    },
  },
  {
    id: "cheng",
    hanja: "緑",
    labelKo: "橙 · 緑 · 회복",
    labelEn: "Orange · Green · Recovery",
    originKo: "당근, 시카, 티트리, 비타민E",
    originEn: "Carrot, cica, tea tree, vitamin E",
    functionKo: "[회복 & 에너지] 손상된 결을 치유",
    functionEn: "[Recovery & energy] Mends compromised texture",
    messageKo: "강인한 생명력",
    messageEn: "Resilient life force",
    ambientBackground:
      "radial-gradient(ellipse 78% 58% at 52% 44%, rgba(90,165,120,0.11) 0%, rgba(210,145,70,0.06) 35%, transparent 58%)",
    midnightGlowScale: 0.86,
    visual: {
      emissive0: "rgba(200,235,190,0.48)",
      emissive40: "rgba(120,185,140,0.26)",
      emissive100: "rgba(35,55,40,0.1)",
      liq0: "rgba(240,255,245,0.58)",
      liq32: "rgba(180,220,160,0.38)",
      liq58: "rgba(140,175,130,0.32)",
      liq100: "rgba(20,45,35,0.58)",
      particleWarm: "rgba(220,245,200,0.9)",
      particleCool: "rgba(235,250,240,0.88)",
      bottomGlow:
        "radial-gradient(ellipse at center, rgba(160,210,170,0.22), rgba(200,170,100,0.1) 45%, transparent 72%)",
    },
  },
]

/** 선택 없음 — Glass Clarity 기본(호박·수분·미드나잇) */
export const NEUTRAL_ALC_VISUAL: FiveEssenceEntry["visual"] = {
  emissive0: "rgba(255,220,175,0.55)",
  emissive40: "rgba(255,185,130,0.28)",
  emissive100: "rgba(0,45,82,0.08)",
  liq0: "rgba(255,250,242,0.62)",
  liq32: "rgba(255,205,155,0.42)",
  liq58: "rgba(210,228,248,0.32)",
  liq100: "rgba(0,48,88,0.58)",
  particleWarm: "rgba(255,230,200,0.95)",
  particleCool: "rgba(255,255,255,0.88)",
  bottomGlow:
    "radial-gradient(ellipse at center, rgba(255,200,160,0.22), rgba(192,210,230,0.12) 45%, transparent 72%)",
}

export function getFiveEssenceEntry(id: FiveEssenceId): FiveEssenceEntry {
  const found = FIVE_ESSENCE_PALETTE.find((e) => e.id === id)
  if (!found) return FIVE_ESSENCE_PALETTE[0]!
  return found
}

/** 이미지 모델용 — 오색 중 하나를 지정해 렌더 지시 */
export function buildFiveEssenceRenderPrompt(essenceId: FiveEssenceId): string {
  const e = getFiveEssenceEntry(essenceId)
  return [
    "FIVE-ESSENCE RENDERING MODULE — Modern alchemist palette (obangsaek lineage): intrinsic ingredient color only, never garish synthetic primaries; muted natural chroma readable through ultra-clear crystal glass.",
    `Essence lane: ${e.labelEn} (${e.hanja}) — ${e.functionEn}. Origins to suggest visually: ${e.originEn}.`,
    "Tyndall-like micro-sparkle: suspended natural particles catching oblique dawn light inside the serum.",
    "Caustics: quiet morning sun through the vessel projects soft truthful color onto the opposing surface — 'projection of essence'.",
    "Base refraction: emphasize thick crystal glass base and sharp silver speculars; midnight blue void behind; jewel effect — only the liquid appears lit from within.",
  ].join(" ")
}
