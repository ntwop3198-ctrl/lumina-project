"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, ChevronLeft, Gem, ThumbsUp } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import {
  LUMINA_CONVICTION_SUB_EN,
  LUMINA_CONVICTION_SUB_KO,
  LUMINA_CONVICTION_TITLE_EN,
  LUMINA_CONVICTION_TITLE_KO,
} from "@/lib/lumina/conviction-copy"
import {
  LUMINA_ESSENCE_COLOR_REPORT_OPENING_EN,
  LUMINA_ESSENCE_COLOR_REPORT_OPENING_KO,
  LUMINA_ESSENCE_COLOR_REPORT_SAFETY_SUB_EN,
  LUMINA_ESSENCE_COLOR_REPORT_SAFETY_SUB_KO,
} from "@/lib/lumina/essence-color-report-copy"
import {
  LUMINA_INGREDIENT_AUTOBIOGRAPHY_CAPTION_EN,
  LUMINA_INGREDIENT_AUTOBIOGRAPHY_CAPTION_KO,
  LUMINA_SAFETY_EMPATHY_FLASH_EN,
  LUMINA_SAFETY_EMPATHY_FLASH_KO,
  LUMINA_SAFETY_TAG_ORIGIN_EN,
  LUMINA_SAFETY_TAG_ORIGIN_KO,
  LUMINA_SAFETY_TAG_SKIN_EN,
  LUMINA_SAFETY_TAG_SKIN_KO,
} from "@/lib/lumina/human-safety-visual"
import {
  LUMINA_ESSENCE_SCORE_HINT_EN,
  LUMINA_ESSENCE_SCORE_HINT_KO,
  LUMINA_ESSENCE_SCORE_LABEL_EN,
  LUMINA_ESSENCE_SCORE_LABEL_KO,
  LUMINA_ESSENCE_STRIP_LABEL_EN,
  LUMINA_ESSENCE_STRIP_LABEL_KO,
  LUMINA_FINALE_BODY_LINE_1_EN,
  LUMINA_FINALE_BODY_LINE_1_KO,
  LUMINA_FINALE_BODY_LINE_2_EN,
  LUMINA_FINALE_BODY_LINE_2_KO,
  LUMINA_FINALE_HEADLINE_EN,
  LUMINA_FINALE_HEADLINE_KO,
} from "@/lib/lumina/law-of-essential-beauty-copy"
import {
  LUMINA_CONVENTIONAL_PATH_WARNING_EN,
  LUMINA_CONVENTIONAL_PATH_WARNING_KO,
} from "@/lib/lumina/choice-of-soul"
import {
  LUMINA_PRODUCT_DETAIL_CLOSING_COMFORT_EN,
  LUMINA_PRODUCT_DETAIL_CLOSING_COMFORT_KO,
  LUMINA_SENSORY_BRIDGE_TITLE_EN,
  LUMINA_SENSORY_BRIDGE_TITLE_KO,
  LUMINA_SENSORY_CONTRAST_TACTILE_EN,
  LUMINA_SENSORY_CONTRAST_TACTILE_KO,
  LUMINA_SENSORY_CONTRAST_VISUAL_EN,
  LUMINA_SENSORY_CONTRAST_VISUAL_KO,
} from "@/lib/lumina/sensory-synthesis-copy"
import {
  LUMINA_PARADOX_KYUSHO_DECLARATION_EN,
  LUMINA_PARADOX_KYUSHO_DECLARATION_KO,
  LUMINA_PARADOX_KYUSI_DECLARATION_EN,
  LUMINA_PARADOX_KYUSI_DECLARATION_KO,
  LUMINA_PARADOX_LABEL_KYUSHO_EN,
  LUMINA_PARADOX_LABEL_KYUSHO_KO,
  LUMINA_PARADOX_LABEL_KYUSI_EN,
  LUMINA_PARADOX_LABEL_KYUSI_KO,
} from "@/lib/lumina/paradox-white-suit-copy"
import {
  LUMINA_ETERNAL_FLAME_FOOTNOTE_EN,
  LUMINA_ETERNAL_FLAME_FOOTNOTE_KO,
} from "@/lib/lumina/eternal-flame-copy"
import {
  LUMINA_HONEST_GENESIS_TAGLINE_EN,
  LUMINA_HONEST_GENESIS_TAGLINE_KO,
  LUMINA_HONEST_LOADING_REFINE_EN,
  LUMINA_HONEST_LOADING_REFINE_KO,
  LUMINA_HONEST_MIRROR_LINE_EN,
  LUMINA_HONEST_MIRROR_LINE_KO,
  LUMINA_HONEST_REFINING_WHISPER_EN,
  LUMINA_HONEST_REFINING_WHISPER_KO,
} from "@/lib/lumina/honest-luxury-copy"
import { GenesisSunMomentOverlay } from "@/components/landing/midnight/genesis-sun-moment-overlay"
import { useBrandSoulChoice } from "@/components/providers/brand-soul-choice-provider"
import { useConvictionAtmosphere } from "@/components/providers/conviction-atmosphere-provider"
import {
  buildGenesisVisualEngineInput,
  getArchetypeProfile,
  inferArchetypeFromGenesis5,
  type ArchetypeId,
  type GenesisDiagnosisAnswers,
} from "@/lib/persona/archetype-engine"

const fontSerifDisplay =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeWave = [0.25, 0.46, 0.45, 0.94] as const

const reportStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.065, delayChildren: 0.05 },
  },
} as const

const reportItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeWave },
  },
} as const
const AUTO_MS = 420

const CLUTTER_KEYS = ["loudLabel", "syntheticSparkle", "hollowBuzz"] as const
type ClutterKey = (typeof CLUTTER_KEYS)[number]

/** 본질 점수: 기본 54 → 가식 3종 제거 시 +15 / +15 / +16 = 100 */
const ESSENCE_SCORE_BASE = 54
const ESSENCE_SCORE_BONUS: Record<ClutterKey, number> = {
  loudLabel: 15,
  syntheticSparkle: 15,
  hollowBuzz: 16,
}

const PILLAR_STAMP_TOAST_KO = [
  "실천·건강 시리즈 — 성분의 정밀 한 치를 굽히지 않는 선택.",
  "실천·건강 시리즈 — 추출의 결에서 타협을 걷어 낸 각.",
  "실천·건강 시리즈 — 정직한 가격이 신뢰의 기준선이 됩니다.",
] as const
const PILLAR_STAMP_TOAST_EN = [
  "Practice & wellness — precision on the 0.1% line.",
  "Practice & wellness — extraction without compromise.",
  "Practice & wellness — honest pricing as the spine of trust.",
] as const

const ESSENCE_LOADING_WHISPER_KO = "불필요한 장식을 걷어내는 중..."
const ESSENCE_LOADING_WHISPER_EN = "Stripping away the non-essential…"
const DW_BIRTH_KO = "DIAMOND WISDOM — 탄생"
const DW_BIRTH_EN = "DIAMOND WISDOM — birth"
const CORE_ESSENCE_HEAD_KO = "당신의 본질 (Core Essence)"
const CORE_ESSENCE_HEAD_EN = "Your Core Essence"
const MAX_ESSENCE_ANIM_CHARS = 180
const SHRED_MS = 820
const VORTEX_MS = 1450

const PARTICLE_RING = Array.from({ length: 36 }, (_, i) => i)

function playStampThud() {
  if (typeof window === "undefined") return
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(58, ctx.currentTime)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.16)
    const close = () => {
      try {
        ctx.close()
      } catch {
        /* ignore */
      }
    }
    window.setTimeout(close, 400)
  } catch {
    /* autoplay / secure context */
  }
}

type GenesisStepChoice = {
  id: number
  inputType: "choice"
  tagKo: string
  tagEn: string
  meaningKo: string
  meaningEn: string
  questionKo: string
  questionEn: string
  choicesKo: string[]
  choicesEn: string[]
}

type GenesisStepEssence = {
  id: number
  inputType: "essence"
  tagKo: string
  tagEn: string
  meaningKo: string
  meaningEn: string
  questionKo: string
  questionEn: string
}

type GenesisStepDef = GenesisStepChoice | GenesisStepEssence

const GENESIS_STEPS: GenesisStepDef[] = [
  {
    id: 1,
    inputType: "choice",
    tagKo: "Step 1 · Origin: 고집의 뿌리",
    tagEn: "Step 1 · Origin: root of conviction",
    meaningKo:
      "제품의 본질(성분, 철학, 공정 등) 중 절대 양보할 수 없는 지점을 찾습니다.",
    meaningEn:
      "Find the one point in essence (ingredients, philosophy, process) you will never compromise.",
    questionKo: "당신이 끝까지 포기하지 않은 '단 하나'는 무엇입니까?",
    questionEn: "What is the one thing you have never given up on?",
    choicesKo: ["0.1%의 성분 함량", "타협 없는 추출 방식", "정직한 가격 구조"],
    choicesEn: ["0.1% ingredient precision", "No-compromise extraction", "Honest pricing structure"],
  },
  {
    id: 2,
    inputType: "choice",
    tagKo: "Step 2 · Logic: 穩 & 準",
    tagEn: "Step 2 · Logic: solid & accurate",
    meaningKo: "제품의 견실함과 정확성을 확인합니다.",
    meaningEn: "We read steadiness and scientific precision in your brand.",
    questionKo:
      "당신의 제품이 과학적 데이터로 증명될 때, 고객이 느껴야 할 가장 묵직한 가치는 무엇입니까?",
    questionEn:
      "When your product is proven by data, what weighty value should the customer feel first?",
    choicesKo: [
      "압도적인 치유의 힘",
      "흐트러짐 없는 피부의 정돈",
      "정교하게 설계된 영양",
      "흔들리지 않는 본연의 건강함",
    ],
    choicesEn: [
      "Overwhelming healing power",
      "Impeccably ordered skin",
      "Meticulously designed nourishment",
      "Unwavering intrinsic wellness",
    ],
  },
  {
    id: 3,
    inputType: "choice",
    tagKo: "Step 3 · Presence: 명품의 궤도",
    tagEn: "Step 3 · Presence: luxury orbit",
    meaningKo: "브랜드의 시각적 페르소나와 격조를 결정합니다.",
    meaningEn: "Defines visual persona and tone.",
    questionKo:
      "만약 당신의 브랜드가 한 명의 인물이라면, 어떤 공간에서 어떤 옷을 입고 서 있기를 원하십니까?",
    questionEn:
      "If your brand were a person, in what space and garment would you want them to stand?",
    choicesKo: [
      "심해의 정적을 닮은 미드나잇 블루 드레스",
      "차갑고 예리한 실버 수트",
      "따뜻하고 묵직한 앰버 골드 코트",
    ],
    choicesEn: [
      "A midnight-blue dress, still as the deep sea",
      "A cool, sharp silver suit",
      "A warm, weighty amber-gold coat",
    ],
  },
  {
    id: 4,
    inputType: "choice",
    tagKo: "Step 4 · Action: 쾌(快)",
    tagEn: "Step 4 · Action: swift clarity",
    meaningKo: "마케팅 메시지의 신속함과 명확성을 결정합니다.",
    meaningEn: "Sets the speed and clarity of your market message.",
    questionKo:
      "고객이 제품을 처음 만나는 순간, 단 3초 만에 뇌리에 박혀야 할 '확신의 한 마디'는 무엇입니까?",
    questionEn:
      "In the first three seconds, what single line of conviction must land in the customer’s mind?",
    choicesKo: [
      '"피부의 기적"',
      '"완벽한 침투"',
      '"당신의 고집은 틀리지 않았다"',
      '"시간을 되돌리는 정밀함"',
    ],
    choicesEn: [
      '"Miracle for the skin"',
      '"Perfect penetration"',
      '"Your stubbornness was never wrong"',
      '"Precision that reverses time"',
    ],
  },
  {
    id: 5,
    inputType: "choice",
    tagKo: "Step 5 · Vision: 사장 만들기",
    tagEn: "Step 5 · Vision: leadership you embody",
    meaningKo:
      "‘모두가 사장’ 철학을 반영하여, 브랜드가 지향하는 궁극적 리더십을 찾습니다.",
    meaningEn:
      "Reflecting democratized leadership — the ultimate leader your brand aspires to be.",
    questionKo:
      "이 브랜드를 통해 당신은 어떤 리더로 기억되고 싶습니까?",
    questionEn: "Through this brand, how do you want to be remembered as a leader?",
    choicesKo: [
      "시장의 흐름을 바꾸는 개척자",
      "본질의 가치를 지키는 수호자",
      "아름다움의 기준을 재정의하는 혁신가",
    ],
    choicesEn: [
      "A pioneer who shifts the market",
      "A guardian of essential value",
      "An innovator redefining beauty standards",
    ],
  },
  {
    id: 6,
    inputType: "essence",
    tagKo: "Step 6 · Diamond Wisdom: 금강(金剛) 통찰",
    tagEn: "Step 6 · Diamond Wisdom: vajra discernment",
    meaningKo:
      "로고·이름·포장 같은 겉모습을 잠시 내려놓고, 시장이 바뀌어도 부서지지 않는 한 가지를 글로 남깁니다. 이 응답은 비주얼 생성 엔진에 전달될 때 아키타입보다 높은 가중치로 반영됩니다.",
    meaningEn:
      "Set aside logos, names, and packaging for a moment. Write the one truth that survives any market shift. This answer is weighted highest for your visual-generation profile.",
    questionKo: "모든 겉모습이 사라져도 끝까지 남을 당신만의 본질은 무엇입니까?",
    questionEn:
      "If every surface identity vanished, what indestructible essence would still remain — yours alone?",
  },
]

export function PersonaGenesisWizard() {
  const { lang } = useLuminaLanguage()
  const { unveilMorning } = useConvictionAtmosphere()
  const { isConventional } = useBrandSoulChoice()
  const reduceMotion = useReducedMotion()
  const isKo = lang === "ko"
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"quiz" | "loading">("quiz")
  const [resultOpen, setResultOpen] = useState(false)
  /** idle → pause → dawn → paradox(백색 역설 문구) → done(순백 리포트) */
  const [resultSunPhase, setResultSunPhase] = useState<
    "idle" | "pause" | "dawn" | "paradox" | "done"
  >("idle")
  const [answers, setAnswers] = useState<Partial<Record<number, string>>>({})
  const [archetypeId, setArchetypeId] = useState<ArchetypeId>("glass_architect")
  const [flameKick, setFlameKick] = useState(0)
  const [safetyEmpathyToken, setSafetyEmpathyToken] = useState(0)
  const [clutter, setClutter] = useState<Record<ClutterKey, boolean>>({
    loudLabel: true,
    syntheticSparkle: true,
    hollowBuzz: true,
  })
  const [rootQuestionHover, setRootQuestionHover] = useState(false)
  const [stampToast, setStampToast] = useState<string | null>(null)
  const [displayedEssenceScore, setDisplayedEssenceScore] = useState(ESSENCE_SCORE_BASE)
  /** Diamond step: 글자 분해 → 로고로 빨아들임 → 로딩 */
  const [essenceAnimPhase, setEssenceAnimPhase] = useState<"idle" | "shred" | "vortex">("idle")
  const [essenceAnimChars, setEssenceAnimChars] = useState<string[]>([])
  const [essenceAnimTick, setEssenceAnimTick] = useState(0)
  const [essenceLoadingWhisper, setEssenceLoadingWhisper] = useState(false)
  /** DOM timer ids are numeric; Node's `Timeout` type would mismatch `window.setTimeout` here */
  const essenceAlchemyTimers = useRef<number[]>([])
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const advanceTimer = useRef<number | null>(null)
  const answersRef = useRef<Partial<Record<number, string>>>({})
  const stepIndexRef = useRef(0)
  const step = GENESIS_STEPS[stepIndex]
  const total = GENESIS_STEPS.length

  const progress = useMemo(() => ((stepIndex + 1) / total) * 100, [stepIndex, total])

  const strippedCount = useMemo(
    () => CLUTTER_KEYS.filter((k) => !clutter[k]).length,
    [clutter],
  )

  const essenceScore = useMemo(() => {
    let s = ESSENCE_SCORE_BASE
    for (const k of CLUTTER_KEYS) {
      if (!clutter[k]) s += ESSENCE_SCORE_BONUS[k]
    }
    return Math.min(100, s)
  }, [clutter])

  useEffect(() => {
    const id = window.setInterval(() => {
      setDisplayedEssenceScore((prev) => {
        const t = essenceScore
        if (prev === t) {
          clearInterval(id)
          return prev
        }
        return prev < t ? prev + 1 : prev - 1
      })
    }, 34)
    return () => clearInterval(id)
  }, [essenceScore])

  const visualCalm = essenceScore / 100
  const questionSharpness = essenceScore / 100

  useEffect(() => {
    if (!stampToast) return
    const t = window.setTimeout(() => setStampToast(null), 2600)
    return () => clearTimeout(t)
  }, [stampToast])

  const clearEssenceAlchemyTimers = useCallback(() => {
    for (const t of essenceAlchemyTimers.current) {
      window.clearTimeout(t)
    }
    essenceAlchemyTimers.current = []
  }, [])

  useEffect(() => () => clearEssenceAlchemyTimers(), [clearEssenceAlchemyTimers])

  const bumpFlame = useCallback(() => {
    if (reduceMotion) return
    setFlameKick((k) => k + 1)
  }, [reduceMotion])

  const chosenAction = typeof answers[4] === "string" ? answers[4] : ""
  const chosenOrigin = typeof answers[1] === "string" ? answers[1] : ""
  const chosenDiamond = typeof answers[6] === "string" ? answers[6].trim() : ""
  const essenceMinChars = 8
  const essenceWriteProgress = Math.min(chosenDiamond.length / 200, 1)
  const meetsEssenceMin = chosenDiamond.length >= essenceMinChars

  const shardOffsets = useMemo(
    () =>
      essenceAnimChars.map((_, i) => ({
        x: Math.sin(i * 1.73 + essenceAnimTick * 0.15) * 108 + ((i * 17) % 33) - 16,
        y: Math.cos(i * 0.91 - essenceAnimTick * 0.08) * 74 + ((i * 13) % 29) - 14,
        rot: ((i * 29) % 54) - 27,
      })),
    [essenceAnimChars, essenceAnimTick],
  )

  /** 1 = max passion (early steps), 0 = still line (all answered / loading / result). */
  const passionAmp = useMemo(() => {
    if (resultOpen || phase === "loading") return 0
    const keys = [1, 2, 3, 4, 5] as const
    let choiceFilled = 0
    for (const k of keys) {
      if (answers[k]) choiceFilled++
    }
    const essenceFull = (answers[6] ?? "").trim().length >= essenceMinChars
    const units = choiceFilled + (essenceFull ? 1 : 0)
    return Math.max(0, 1 - units / 6)
  }, [resultOpen, phase, answers, essenceMinChars])

  const profile = useMemo(() => getArchetypeProfile(archetypeId), [archetypeId])

  const clearAdvance = useCallback(() => {
    if (advanceTimer.current) {
      window.clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }, [])

  useEffect(() => () => clearAdvance(), [clearAdvance])

  useEffect(() => {
    answersRef.current = answers
  }, [answers])

  useEffect(() => {
    stepIndexRef.current = stepIndex
  }, [stepIndex])

  useEffect(() => {
    if (!resultOpen) {
      setResultSunPhase("idle")
      return
    }
    if (reduceMotion) {
      setResultSunPhase("done")
      return
    }
    const tDawn = window.setTimeout(() => setResultSunPhase("dawn"), 500)
    /* Awakening: 느린 명조 + 벚꽃 앰플 체류 ~3초 이상 */
    const tParadox = window.setTimeout(() => setResultSunPhase("paradox"), 500 + 6200)
    const tDone = window.setTimeout(
      () => setResultSunPhase("done"),
      500 + 6200 + 2800,
    )
    return () => {
      window.clearTimeout(tDawn)
      window.clearTimeout(tParadox)
      window.clearTimeout(tDone)
    }
  }, [resultOpen, reduceMotion])

  useEffect(() => {
    if (resultOpen && resultSunPhase === "done") {
      setSafetyEmpathyToken((n) => n + 1)
    }
  }, [resultOpen, resultSunPhase])

  function runFinishWithSnapshot(a: Partial<Record<number, string>>) {
    const full: GenesisDiagnosisAnswers = {
      origin: String(a[1] ?? ""),
      logic: String(a[2] ?? ""),
      presence: String(a[3] ?? ""),
      action: String(a[4] ?? ""),
      vision: String(a[5] ?? ""),
      diamondEssence: String(a[6] ?? ""),
    }
    const id = inferArchetypeFromGenesis5(full, isKo)
    setArchetypeId(id)
    try {
      sessionStorage.setItem(
        "lumina.genesis.visualEngineInput",
        JSON.stringify(buildGenesisVisualEngineInput(id, full)),
      )
    } catch {
      /* quota / private */
    }
    setResultSunPhase(reduceMotion ? "done" : "pause")
    setResultOpen(true)
    setPhase("quiz")
    setEssenceLoadingWhisper(false)
  }

  function startLoadingAndFinish() {
    unveilMorning()
    setPhase("loading")
    const ms = reduceMotion ? 600 : 2400
    window.setTimeout(() => {
      runFinishWithSnapshot(answersRef.current)
    }, ms)
  }

  function beginAnalyze() {
    clearAdvance()
    bumpFlame()
    const i = stepIndexRef.current
    if (i < total - 1) {
      goNextFromStep()
      return
    }
    if (!selected) return

    if (reduceMotion) {
      setEssenceLoadingWhisper(true)
      startLoadingAndFinish()
      return
    }

    const raw = (answersRef.current[6] ?? "").trim()
    const chars = Array.from(raw.slice(0, MAX_ESSENCE_ANIM_CHARS))
    clearEssenceAlchemyTimers()
    setEssenceAnimTick((t) => t + 1)
    setEssenceAnimChars(chars)
    setEssenceAnimPhase("shred")

    const t1 = window.setTimeout(() => {
      setEssenceAnimPhase("vortex")
    }, SHRED_MS)
    const t2 = window.setTimeout(() => {
      setEssenceAnimPhase("idle")
      setEssenceAnimChars([])
      setEssenceLoadingWhisper(true)
      startLoadingAndFinish()
    }, SHRED_MS + VORTEX_MS)
    essenceAlchemyTimers.current = [t1, t2]
  }

  function goNextFromStep() {
    const i = stepIndexRef.current
    if (i < total - 1) {
      setStepIndex(i + 1)
      return
    }
    startLoadingAndFinish()
  }

  function onSelectChoice(choice: string) {
    if (step.inputType !== "choice") return
    clearAdvance()
    bumpFlame()
    setAnswers((prev) => {
      const next = { ...prev, [step.id]: choice }
      answersRef.current = next
      return next
    })
    if (reduceMotion) return
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null
      const i = stepIndexRef.current
      if (i < total - 1) {
        setStepIndex(i + 1)
      } else {
        startLoadingAndFinish()
      }
    }, AUTO_MS)
  }

  function back() {
    clearAdvance()
    if (stepIndex > 0) setStepIndex((i) => i - 1)
  }

  function closeResult() {
    setResultOpen(false)
    setResultSunPhase("idle")
    setEssenceLoadingWhisper(false)
    setEssenceAnimPhase("idle")
    setEssenceAnimChars([])
  }

  const choices = step.inputType === "choice" ? (isKo ? step.choicesKo : step.choicesEn) : []
  const selected =
    step.inputType === "essence"
      ? chosenDiamond.length >= essenceMinChars
      : Boolean(answers[step.id])

  return (
    <section
      id="persona-genesis"
      className="relative px-5 pb-28 pt-24 sm:px-8 sm:pb-32 sm:pt-28 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-[34rem]">
        <div className="mb-14 text-center md:text-left md:max-w-[30rem]">
          <p
            className={cn(
              "mb-3 text-[11px] tracking-[0.28em] text-liquid-silver/70",
              fontBody,
            )}
          >
            LUMINA GENESIS
          </p>
          <h2
            className={cn("text-[1.5rem] text-white sm:text-[1.75rem]", fontSerifDisplay)}
          >
            {isKo ? "브랜드 페르소나 진단" : "Brand persona diagnosis"}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 md:mx-0",
              fontBody,
            )}
          >
            {isKo
              ? "여백 속에 집중이 스며들도록 — 穩·準·快 다섯 선택, 마지막은 본질만 남기는 Diamond Wisdom 한 문장입니다."
              : "Six steps — steadiness, accuracy, swiftness — ending in Diamond Wisdom: one sentence of indestructible essence."}
          </p>
          <p
            className={cn(
              "mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-white/48 md:mx-0",
              fontSerifDisplay,
            )}
          >
            {isKo ? LUMINA_HONEST_GENESIS_TAGLINE_KO : LUMINA_HONEST_GENESIS_TAGLINE_EN}
          </p>
        </div>

        <div className="relative min-h-[min(61.8vh,640px)] overflow-hidden overflow-x-hidden rounded-none border border-white/[0.12] shadow-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Midnight radial + depth */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_8%,#1a5080_0%,#112240_38%,#0e192b_88%)]"
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-[1.1s]",
              phase === "quiz" && !resultOpen ? "opacity-100" : "opacity-0",
            )}
            style={{
              background: `radial-gradient(ellipse 68% 52% at 50% 36%, rgba(255, 165, 95, ${0.028 + passionAmp * 0.062}) 0%, transparent 58%)`,
            }}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute bottom-5 right-5 z-0 h-24 w-36 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,175,105,0.34)_0%,rgba(255,125,65,0.11)_42%,transparent_74%)] blur-xl motion-reduce:animate-none motion-safe:animate-genesis-amber-ember",
            )}
            style={{
              opacity:
                phase === "loading" || resultOpen || !clutter.syntheticSparkle
                  ? 0
                  : reduceMotion
                    ? 0.22
                    : Math.max(
                        0,
                        (0.22 + passionAmp * 0.78) * (0.38 + 0.62 * (1 - visualCalm)),
                      ),
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-1/4 top-1/3 h-[min(80%,520px)] w-[min(140%,720px)] rounded-full bg-[radial-gradient(circle,rgba(0,43,79,0.55)_0%,transparent_68%)] blur-3xl animate-genesis-mesh-a"
            style={{
              opacity: clutter.syntheticSparkle ? 0.22 + 0.68 * (1 - visualCalm) : 0,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(70%,480px)] w-[min(120%,600px)] rounded-full bg-[radial-gradient(circle,rgba(192,192,192,0.06)_0%,transparent_65%)] blur-3xl animate-genesis-mesh-b"
            style={{
              opacity: clutter.syntheticSparkle ? (0.42 + 0.48 * (1 - visualCalm)) * 0.72 : 0,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-none transition-[opacity] duration-[900ms] ease-out"
            style={{
              opacity:
                reduceMotion || phase !== "quiz" || resultOpen || !clutter.syntheticSparkle
                  ? 0
                  : Math.min(
                      1,
                      (0.035 + passionAmp * 0.12) * (0.42 + 0.58 * (1 - visualCalm)),
                    ),
            }}
            aria-hidden
          >
            <div className="lumina-honest-luxury-veil__noise h-full w-full" />
          </div>

          {essenceScore >= 100 && phase === "quiz" && !resultOpen ? (
            <motion.div
              className="pointer-events-none absolute inset-0 z-[1] rounded-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.05, ease: easeWave }}
              style={{
                background:
                  "radial-gradient(ellipse 100% 92% at 50% 38%, rgba(255,220,160,0.16) 0%, rgba(212,175,55,0.09) 42%, rgba(17,34,64,0.2) 68%, transparent 100%)",
              }}
              aria-hidden
            />
          ) : null}

          {essenceScore >= 100 && phase === "quiz" && !resultOpen ? (
            <motion.div
              className="pointer-events-none absolute bottom-5 right-5 z-[8] flex flex-col items-center gap-1.5"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.07, 1],
                      filter: [
                        "drop-shadow(0 0 10px rgba(212,175,55,0.35))",
                        "drop-shadow(0 0 22px rgba(212,175,55,0.55))",
                        "drop-shadow(0 0 10px rgba(212,175,55,0.35))",
                      ],
                    }
              }
              transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <Gem className="h-8 w-8 text-[#D4AF37]" strokeWidth={1.35} />
              <span
                className={cn(
                  "max-w-[10rem] text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.22em] text-[#D4AF37]/85",
                  fontBody,
                )}
              >
                {isKo ? "Diamond Wisdom · 각성" : "Diamond Wisdom · awake"}
              </span>
            </motion.div>
          ) : null}

          <div
            className={cn(
              "relative z-[2] flex min-h-[min(61.8vh,640px)] flex-col px-6 py-[min(8.09vw,2.618rem)] sm:px-12 sm:py-14",
              "[gap:min(1.618rem,4.5vw)]",
            )}
          >
            {!reduceMotion && phase === "quiz" && !resultOpen ? (
              <motion.div
                key={flameKick}
                className={cn(
                  "pointer-events-none absolute left-1/2 top-[46%] z-0 h-[min(42%,200px)] w-px -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_22px_rgba(255,185,120,0.18)]",
                  passionAmp < 0.22
                    ? "bg-gradient-to-b from-transparent via-liquid-silver/55 to-liquid-silver/18"
                    : "bg-gradient-to-b from-transparent via-amber-200/45 to-amber-100/15",
                )}
                style={{ transformOrigin: "50% 50%" }}
                initial={false}
                animate={
                  passionAmp < 0.04
                    ? { scaleY: 1, x: 0, opacity: 0.32 }
                    : {
                        scaleY: [1, 1 + passionAmp * 0.2, 1 - passionAmp * 0.05, 1],
                        x: [0, passionAmp * 6, -passionAmp * 4.5, passionAmp * 2.2, 0],
                        opacity: [
                          0.2 + passionAmp * 0.14,
                          0.44 + passionAmp * 0.12,
                          0.28 + passionAmp * 0.09,
                          0.2 + passionAmp * 0.14,
                        ],
                      }
                }
                transition={
                  passionAmp < 0.04
                    ? { duration: 0.75, ease: easeWave }
                    : {
                        duration: Math.max(1.25, 2.55 - passionAmp * 1.75),
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                aria-hidden
              />
            ) : null}
            {phase === "loading" && !reduceMotion ? (
              <div
                className="pointer-events-none absolute left-1/2 top-[46%] z-0 h-[min(42%,200px)] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-liquid-silver/75 to-liquid-silver/22 opacity-95"
                aria-hidden
              />
            ) : null}
            {/* 한자 워터마크 — 穩·準·快 → 만점 시 直·指·本·心(直指本心) */}
            <AnimatePresence mode="wait">
              <motion.p
                key={essenceScore >= 100 ? "core-four" : "heritage-three"}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: easeWave }}
                className={cn(
                  "pointer-events-none absolute left-1/2 top-7 z-0 -translate-x-1/2 select-none text-center",
                  "text-[clamp(2rem,8vw,4.75rem)] leading-none tracking-[0.42em]",
                  essenceScore >= 100 ? "text-[#D4AF37]/[0.22]" : "text-white/[0.085]",
                  fontSerifDisplay,
                )}
                aria-hidden
              >
                {essenceScore >= 100 ? "直·指·本·心" : "穩·準·快"}
              </motion.p>
            </AnimatePresence>
            {step.inputType === "essence" ? (
              <p
                className={cn(
                  "pointer-events-none absolute left-1/2 top-[clamp(4.5rem,16vw,7.5rem)] z-0 -translate-x-1/2 select-none text-[clamp(0.65rem,2vw,0.8rem)] tracking-[0.55em] text-white/[0.06]",
                  fontSerifDisplay,
                )}
                aria-hidden
              >
                若見諸相非相
              </p>
            ) : null}

            {phase === "loading" ? (
              <>
                <div
                  className="pointer-events-none absolute inset-0 z-[14] bg-[#02060d]/82 backdrop-blur-[2px]"
                  aria-hidden
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-[16] flex flex-1 flex-col items-center justify-center gap-8 text-center"
                >
                  <p
                    className={cn(
                      "max-w-sm text-[1.05rem] leading-relaxed text-liquid-silver/95 sm:text-[1.15rem]",
                      fontSerifDisplay,
                    )}
                  >
                    {isKo
                      ? "당신의 고집을 데이터로 분석 중입니다..."
                      : "Translating your conviction into data..."}
                  </p>
                  {essenceLoadingWhisper ? (
                    <motion.p
                      className={cn(
                        "max-w-sm text-[13px] leading-[2.1] text-[#e8dcc4] sm:text-[14px]",
                        fontSerifDisplay,
                      )}
                      animate={
                        reduceMotion
                          ? { opacity: 0.92 }
                          : { opacity: [0.42, 1, 0.42] }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0.3 }
                          : { duration: 2.85, repeat: Infinity, ease: "easeInOut" }
                      }
                    >
                      {isKo ? ESSENCE_LOADING_WHISPER_KO : ESSENCE_LOADING_WHISPER_EN}
                    </motion.p>
                  ) : (
                    <p
                      className={cn(
                        "max-w-sm text-[12px] leading-[1.95] text-white/42 sm:text-[13px]",
                        fontSerifDisplay,
                      )}
                    >
                      {isKo ? LUMINA_HONEST_LOADING_REFINE_KO : LUMINA_HONEST_LOADING_REFINE_EN}
                    </p>
                  )}
                  <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      className="h-full w-full rounded-full bg-gradient-to-r from-[#112240] via-liquid-silver/95 to-[#112240] bg-[length:200%_100%] animate-midnight-shimmer"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduceMotion ? 0.35 : 2.1, ease: easeWave }}
                    />
                  </div>
                  <p className={cn("text-[12px] text-white/40", fontBody)}>
                    {isKo ? "잠시만 기다려 주세요." : "One moment."}
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <div className="relative mb-2 h-0.5 w-full max-w-xs overflow-hidden rounded-full bg-white/[0.05]">
                  <AnimatePresence mode="wait">
                    {clutter.loudLabel ? (
                      <motion.div
                        key="essence-progress-fill"
                        className="h-full overflow-hidden rounded-full"
                        initial={false}
                        exit={{
                          opacity: 0,
                          scaleX: 0,
                          filter: "blur(3px)",
                          transition: { duration: 0.38, ease: easeWave },
                        }}
                        style={{ transformOrigin: "left center" }}
                      >
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            passionAmp > 0.18
                              ? "bg-gradient-to-r from-[#2a1a08]/90 via-amber-400/35 to-liquid-silver/85"
                              : "bg-gradient-to-r from-midnight-deep via-liquid-silver/80 to-white/85",
                          )}
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: easeWave }}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                {phase === "quiz" && !resultOpen ? (
                  <div className="mb-4 w-full max-w-xs">
                    <div className="flex items-end justify-between gap-2 border-b border-white/[0.08] pb-2.5 text-[11px] text-[#d0d8e4] sm:text-[12px]">
                      <span className={cn("font-medium tracking-[0.14em]", fontBody)}>
                        {isKo ? LUMINA_ESSENCE_SCORE_LABEL_KO : LUMINA_ESSENCE_SCORE_LABEL_EN}
                      </span>
                      <span className={cn("tabular-nums text-[#f0f4fa] text-[1.1rem] sm:text-[1.2rem]", fontBody)}>
                        {displayedEssenceScore}
                      </span>
                    </div>
                    <p className={cn("mt-2.5 text-[10px] leading-relaxed text-white/55 sm:text-[11px]", fontBody)}>
                      {isKo ? LUMINA_ESSENCE_SCORE_HINT_KO : LUMINA_ESSENCE_SCORE_HINT_EN}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {CLUTTER_KEYS.map((k) => (
                        <button
                          key={k}
                          type="button"
                          disabled={!clutter[k]}
                          onClick={() => {
                            setClutter((prev) => ({ ...prev, [k]: false }))
                            bumpFlame()
                          }}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-[10px] tracking-wide transition-[color,box-shadow,border-color,transform] duration-300 sm:text-[11px]",
                            fontBody,
                            clutter[k]
                              ? "border-white/[0.14] bg-white/[0.04] text-white/72 hover:border-[#D4AF37]/70 hover:text-white hover:shadow-[0_0_0_1px_rgba(212,175,55,0.45),0_0_28px_rgba(212,175,55,0.14)] active:scale-[0.98]"
                              : "pointer-events-none border-white/[0.06] text-white/28 line-through",
                          )}
                        >
                          {isKo ? LUMINA_ESSENCE_STRIP_LABEL_KO[k] : LUMINA_ESSENCE_STRIP_LABEL_EN[k]}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 28, filter: "blur(10px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -22, filter: "blur(8px)" }
                    }
                    transition={{ duration: 0.55, ease: easeWave }}
                    className="relative flex flex-1 flex-col"
                  >
                    {step.id === 1 && phase === "quiz" && !resultOpen ? (
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 z-[3] transition-colors duration-500",
                          rootQuestionHover ? "bg-[#030810]/78" : "bg-transparent",
                        )}
                        aria-hidden
                      />
                    ) : null}
                    <p
                      className={cn(
                        "relative z-[4] text-[11px] font-medium tracking-[0.16em] text-[#e4eaf2] sm:text-[12.5px]",
                        fontBody,
                      )}
                    >
                      {isKo ? step.tagKo : step.tagEn}
                    </p>

                    {step.id === 1 ? (
                      <div className="relative z-[5] mt-[min(4.5vh,2rem)] min-h-[min(6.18vh,3rem)] shrink-0" aria-hidden />
                    ) : null}

                    <h3
                      onMouseEnter={() => step.id === 1 && setRootQuestionHover(true)}
                      onMouseLeave={() => step.id === 1 && setRootQuestionHover(false)}
                      style={
                        step.id === 1
                          ? {
                              filter: `contrast(${1 + 0.14 * questionSharpness})`,
                              letterSpacing: `${-0.015 + questionSharpness * 0.045}em`,
                              textShadow:
                                questionSharpness > 0.45
                                  ? `0 0 ${4 + questionSharpness * 14}px rgba(248,250,252,${0.05 + questionSharpness * 0.1})`
                                  : undefined,
                            }
                          : undefined
                      }
                      className={cn(
                        "relative z-[5] mt-7 text-[clamp(1.28rem,3.8vw,1.72rem)] font-medium leading-[1.52] tracking-tight transition-[color,background-image] duration-500",
                        fontSerifDisplay,
                        step.id === 1
                          ? rootQuestionHover
                            ? "bg-gradient-to-b from-[#c4b896] via-[#f5ebd4] to-[#D4AF37] bg-clip-text text-transparent"
                            : "text-[#8b9199] [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
                          : clutter.loudLabel
                            ? "text-gradient-liquid-silver"
                            : "text-[#e8eef6] [background-image:none]",
                      )}
                    >
                      {isKo ? step.questionKo : step.questionEn}
                    </h3>

                    <p
                      className={cn(
                        "relative z-[4] mt-7 max-w-[28rem] text-[13px] leading-[2] tracking-[0.03em] text-white/48 sm:text-[14px]",
                        fontBody,
                      )}
                    >
                      {isKo ? step.meaningKo : step.meaningEn}
                    </p>

                    {step.inputType === "essence" ? (
                      <p
                        className={cn(
                          "relative z-[4] mt-8 max-w-[28rem] border-l border-white/[0.18] pl-4 text-[12.5px] leading-[2.05] tracking-[0.04em] text-liquid-silver/78 sm:text-[13px]",
                          fontSerifDisplay,
                        )}
                      >
                        {isKo
                          ? LUMINA_HONEST_REFINING_WHISPER_KO
                          : LUMINA_HONEST_REFINING_WHISPER_EN}
                      </p>
                    ) : null}

                    <div className="relative z-[5] mt-12 flex flex-1 flex-col gap-3 sm:mt-14">
                      {step.inputType === "choice" ? (
                        choices.map((c, idx) => {
                          const active = answers[step.id] === c
                          const pillar = step.id === 1
                          const shared = cn(
                            "genesis-glass-option lumina-honest-luxury-option lumina-midnight-glass rounded-none border px-4 py-3.5 text-left transition-[border-color,box-shadow,transform] duration-300 sm:px-5 sm:py-4",
                            pillar && "relative overflow-hidden",
                            fontBody,
                            active
                              ? pillar
                                ? "border-[#D4AF37]/80 shadow-[0_0_28px_rgba(212,175,55,0.22)]"
                                : "border-liquid-silver/55 shadow-[0_0_20px_rgba(192,192,192,0.1)]"
                              : "border-white/[0.12] hover:border-liquid-silver/32",
                          )
                          const inner = (
                            <span
                              className={cn(
                                "text-[14px] leading-relaxed sm:text-[15px]",
                                active ? "text-white" : "text-white/80",
                              )}
                            >
                              {c}
                            </span>
                          )
                          if (pillar) {
                            return (
                              <motion.button
                                key={c}
                                type="button"
                                whileTap={{ scale: 0.985, rotate: -0.4 }}
                                transition={{ type: "spring", stiffness: 520, damping: 28 }}
                                onClick={() => {
                                  playStampThud()
                                  setStampToast(
                                    isKo ? PILLAR_STAMP_TOAST_KO[idx]! : PILLAR_STAMP_TOAST_EN[idx]!,
                                  )
                                  onSelectChoice(c)
                                }}
                                className={shared}
                              >
                                <span
                                  className={cn(
                                    "pointer-events-none absolute inset-0 rounded-none opacity-0 transition-opacity duration-200",
                                    active && "opacity-100",
                                  )}
                                  style={{
                                    boxShadow: active
                                      ? "inset 0 0 0 1px rgba(212,175,55,0.35)"
                                      : undefined,
                                  }}
                                  aria-hidden
                                />
                                {inner}
                              </motion.button>
                            )
                          }
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => onSelectChoice(c)}
                              className={shared}
                            >
                              {inner}
                            </button>
                          )
                        })
                      ) : (
                        <div
                          className={cn(
                            "relative z-[1] transition-opacity duration-300",
                            essenceAnimPhase !== "idle" && "opacity-0",
                          )}
                        >
                          <div
                            className="pointer-events-none absolute -inset-[min(8vw,2.25rem)] overflow-visible"
                            aria-hidden
                          >
                            {PARTICLE_RING.map((i) => {
                              const ring = (i / 36) * Math.PI * 2
                              const pull = essenceWriteProgress * 0.38
                              const px = 50 + 44 * Math.cos(ring) * (1 - pull)
                              const py = 50 + 44 * Math.sin(ring) * (1 - pull)
                              return (
                                <span
                                  key={i}
                                  className="absolute h-[3px] w-[3px] rounded-full bg-[#D4AF37]/70 blur-[0.5px]"
                                  style={{
                                    left: `${px}%`,
                                    top: `${py}%`,
                                    opacity: 0.12 + essenceWriteProgress * 0.62,
                                    transform: `translate(-50%, -50%) scale(${0.65 + essenceWriteProgress * 0.5})`,
                                  }}
                                />
                              )
                            })}
                          </div>
                          <textarea
                            ref={textareaRef}
                            rows={5}
                            autoComplete="off"
                            spellCheck
                            className={cn(
                              "relative z-[1] min-h-[168px] w-full resize-y rounded-none border bg-black/18 px-4 py-4 text-[15px] leading-[1.75] text-white/90 shadow-none outline-none backdrop-blur-sm transition-[border-color,box-shadow] duration-500 placeholder:text-white/30 focus:ring-1",
                              fontBody,
                              meetsEssenceMin
                                ? "border-[#D4AF37]/55 focus:border-[#D4AF37]/70 focus:ring-[#D4AF37]/35"
                                : "border-white/[0.16] ring-liquid-silver/20 focus:border-liquid-silver/38",
                            )}
                            style={{
                              boxShadow: meetsEssenceMin
                                ? `0 0 ${10 + essenceWriteProgress * 34}px rgba(212,175,55,${0.2 + essenceWriteProgress * 0.42}), inset 0 0 ${8 + essenceWriteProgress * 36}px rgba(212,175,55,${0.05 + essenceWriteProgress * 0.1})`
                                : undefined,
                            }}
                            placeholder={
                              isKo
                                ? "한 문장 이상, 겉껍질이 아닌 ‘남는 것’만 적어 주세요."
                                : "Write what remains when every surface is gone — at least one full sentence."
                            }
                            value={answers[6] ?? ""}
                            onChange={(e) => {
                              clearAdvance()
                              setAnswers((prev) => {
                                const next = { ...prev, 6: e.target.value }
                                answersRef.current = next
                                return next
                              })
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {step.inputType === "essence" ? (
                      <p className={cn("relative z-[1] mt-3 text-[11px] text-white/35", fontBody)}>
                        {isKo
                          ? `${essenceMinChars}자 이상 · 덜어낼수록 선명해집니다 (求小).`
                          : `${essenceMinChars}+ chars — less is sharper (essentialism).`}
                      </p>
                    ) : null}

                    <div className="relative z-[1] mt-12 flex flex-wrap items-center justify-between gap-6">
                      <button
                        type="button"
                        onClick={back}
                        disabled={stepIndex === 0}
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25",
                          fontBody,
                        )}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        {isKo ? "이전" : "Back"}
                      </button>
                      <div className="flex flex-wrap items-center gap-3">
                        {stepIndex === total - 1 ? (
                          <motion.button
                            type="button"
                            onClick={beginAnalyze}
                            disabled={!selected}
                            whileHover={
                              reduceMotion || !selected
                                ? undefined
                                : { scale: 1.02 }
                            }
                            whileTap={
                              reduceMotion || !selected
                                ? undefined
                                : { scale: 0.98 }
                            }
                            className={cn(
                              "group relative inline-flex min-w-[9.5rem] items-center justify-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-[13px] transition-[color,box-shadow,background-color,border-color] duration-500 disabled:cursor-not-allowed",
                              fontBody,
                              selected
                                ? "border-[#D4AF37]/75 bg-gradient-to-br from-[#3a2810]/90 via-[#1a1208]/95 to-[#0d0a06]/98 text-[#f5e6c8] shadow-[0_0_28px_rgba(212,175,55,0.28)] hover:border-[#e8c86a]/90 hover:shadow-[0_0_36px_rgba(212,175,55,0.38)]"
                                : "border-white/[0.14] bg-white/[0.04] text-white/38",
                            )}
                          >
                            <motion.span
                              className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#D4AF37]"
                              aria-hidden
                              whileHover={
                                reduceMotion || !selected
                                  ? undefined
                                  : {
                                      rotate: [0, 26, -18, 14, 0],
                                      filter: [
                                        "drop-shadow(0 0 6px rgba(212,175,55,0.35))",
                                        "drop-shadow(0 0 14px rgba(212,175,55,0.55))",
                                        "drop-shadow(0 0 6px rgba(212,175,55,0.35))",
                                      ],
                                      transition: { duration: 1.05, ease: easeWave },
                                    }
                              }
                            >
                              <Gem className="h-5 w-5" strokeWidth={1.35} />
                            </motion.span>
                            <span>{isKo ? "분석 시작" : "Analyze"}</span>
                          </motion.button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              clearAdvance()
                              bumpFlame()
                              goNextFromStep()
                            }}
                            disabled={!selected}
                            className={cn(
                              "rounded-full border border-liquid-silver/40 bg-white/[0.05] px-5 py-2.5 text-[13px] text-liquid-silver transition-colors hover:bg-white/[0.09] disabled:opacity-35",
                              fontBody,
                            )}
                          >
                            {isKo ? "다음" : "Next"}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                  {stampToast ? (
                    <motion.div
                      key={stampToast}
                      role="status"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.38, ease: easeWave }}
                      className="pointer-events-none absolute bottom-[min(7.5rem,13vh)] left-4 right-4 z-[24] flex justify-center sm:left-8 sm:right-8"
                    >
                      <p
                        className={cn(
                          "max-w-md rounded-none border border-[#D4AF37]/45 bg-[#030810]/94 px-5 py-3 text-center text-[11px] leading-relaxed text-[#f2e9d2] shadow-[0_0_40px_rgba(0,0,0,0.45)] sm:text-[12px]",
                          fontSerifDisplay,
                        )}
                      >
                        {stampToast}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                {phase === "quiz" && !resultOpen ? (
                  <div className="relative z-[4] mt-10 flex w-full flex-col items-center gap-3 border-t border-white/[0.07] pt-[min(2.618rem,5vh)] text-center">
                    <p
                      className={cn(
                        "max-w-md text-[12px] leading-relaxed tracking-[0.035em] text-white/52 sm:text-[13px]",
                        fontSerifDisplay,
                      )}
                    >
                      {isKo ? LUMINA_HONEST_MIRROR_LINE_KO : LUMINA_HONEST_MIRROR_LINE_EN}
                    </p>
                    <div className="flex items-center gap-2 text-[#D4AF37]/65">
                      <ThumbsUp className="h-4 w-4 shrink-0" strokeWidth={1.25} aria-hidden />
                      <span className={cn("text-[10px] uppercase tracking-[0.26em]", fontBody)}>
                        {isKo ? "정직한 럭셔리" : "Honest Luxury"}
                      </span>
                    </div>
                  </div>
                ) : null}
              </>
            )}
            <AnimatePresence>
              {essenceAnimPhase !== "idle" ? (
                <motion.div
                  key={essenceAnimTick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="pointer-events-none absolute inset-0 z-[38] overflow-hidden rounded-none bg-[#02060d]/62"
                  aria-hidden
                >
                  <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
                    <motion.div
                      className="drop-shadow-[0_0_14px_rgba(212,175,55,0.45)]"
                      animate={
                        essenceAnimPhase === "vortex" ? { scale: [1, 1.14, 1] } : { scale: 1 }
                      }
                      transition={{ duration: 1.05, ease: easeWave }}
                    >
                      <Gem className="h-9 w-9 text-[#D4AF37]" strokeWidth={1.35} />
                    </motion.div>
                    <span
                      className={cn(
                        "max-w-[14rem] text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.26em] text-[#D4AF37]/88",
                        fontBody,
                      )}
                    >
                      {isKo ? DW_BIRTH_KO : DW_BIRTH_EN}
                    </span>
                  </div>
                  {essenceAnimChars.slice(0, 120).map((ch, i) => {
                    const o = shardOffsets[i]
                    if (!o) return null
                    const display = ch === " " ? "\u00a0" : ch
                    return (
                      <div
                        key={`${essenceAnimTick}-${i}`}
                        className="absolute left-1/2 top-[min(34%,10.5rem)] -translate-x-1/2"
                      >
                        <motion.span
                          className={cn(
                            "block whitespace-pre text-[15px] text-white/[0.92]",
                            fontSerifDisplay,
                          )}
                          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                          animate={
                            essenceAnimPhase === "shred"
                              ? {
                                  x: o.x,
                                  y: o.y,
                                  opacity: 0.55,
                                  rotate: o.rot,
                                  scale: 1.02,
                                }
                              : {
                                  x: 0,
                                  y: 210,
                                  opacity: 0,
                                  rotate: 0,
                                  scale: 0.2,
                                }
                          }
                          transition={{
                            duration: essenceAnimPhase === "shred" ? 0.76 : 1.18,
                            ease: easeWave,
                          }}
                        >
                          {display}
                        </motion.span>
                      </div>
                    )
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {resultOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8"
          >
            <button
              type="button"
              aria-label={isKo ? "결과 닫기" : "Close result"}
              className="absolute inset-0 bg-black/78 backdrop-blur-md"
              onClick={closeResult}
            />

            <AnimatePresence>
              {resultSunPhase === "pause" ||
              resultSunPhase === "dawn" ||
              resultSunPhase === "paradox" ? (
                <motion.div
                  key="lumina-genesis-sun"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: reduceMotion ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: easeWave }}
                  className={cn(
                    "pointer-events-none fixed inset-0 z-[65]",
                    reduceMotion && "invisible",
                  )}
                >
                  <GenesisSunMomentOverlay
                    phase={
                      resultSunPhase === "pause"
                        ? "pause"
                        : resultSunPhase === "dawn"
                          ? "dawn"
                          : "paradox"
                    }
                    isKo={isKo}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {resultSunPhase === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, ease: easeWave }}
              className="relative z-[61] max-h-[min(92vh,880px)] w-full max-w-2xl overflow-y-auto"
            >
              <div className="lumina-origin-card-light relative overflow-hidden rounded-none border border-neutral-300/90 bg-[linear-gradient(163deg,#ffffff_0%,#f9fafb_52%,#f3f4f6_100%)] p-6 sm:p-8">
                {!reduceMotion ? (
                  <motion.div
                    key="lumina-essence-gold-flash"
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[24] rounded-none bg-[radial-gradient(ellipse_90%_70%_at_50%_38%,rgba(255,228,190,0.82)_0%,rgba(212,175,55,0.35)_42%,transparent_70%)]"
                    initial={{ opacity: 0.95 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.72, ease: easeWave }}
                  />
                ) : null}
                {!reduceMotion ? (
                  <>
                    <motion.div
                      aria-hidden
                      className="lumina-report-cloud-haze pointer-events-none absolute inset-x-0 top-0 z-[4] h-16 rounded-t-[inherit]"
                      initial={{ opacity: 0.72 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 3.2, delay: 0.12, ease: easeWave }}
                    />
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
                      initial={{ y: "-42%" }}
                      animate={{ y: "128%" }}
                      transition={{
                        duration: 3.1,
                        delay: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.82) 12%, rgba(230,236,248,0.5) 28%, rgba(255,255,255,0.14) 44%, transparent 62%)",
                      }}
                    />
                  </>
                ) : null}
                <motion.div
                  className="relative z-[3]"
                  variants={reportStagger}
                  initial="hidden"
                  animate="show"
                >
                <motion.div
                  variants={reportItem}
                  className="mb-8 flex flex-col items-center gap-3 border-b border-[#e5e0d5]/90 pb-8 text-center"
                >
                  <motion.div
                    aria-hidden
                    initial={{ scale: 0.4, opacity: 0, rotate: -18 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.08 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#c9a227]/55 bg-[linear-gradient(165deg,#fffdf8_0%,#f3ead4_100%)] shadow-[0_8px_32px_rgba(201,162,39,0.22)]"
                  >
                    <ThumbsUp className="h-7 w-7 text-[#b8941f]" strokeWidth={1.85} />
                  </motion.div>
                  <p
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b8941f]",
                      fontBody,
                    )}
                  >
                    {isKo ? CORE_ESSENCE_HEAD_KO : CORE_ESSENCE_HEAD_EN}
                  </p>
                  <p
                    className={cn(
                      "max-w-[32rem] text-[1.06rem] font-medium leading-[1.75] tracking-[0.02em] text-[#2a3542] sm:text-[1.12rem] sm:leading-[1.72]",
                      fontSerifDisplay,
                    )}
                  >
                    {chosenDiamond || "—"}
                  </p>
                </motion.div>
                <motion.p
                  variants={reportItem}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-500",
                    fontBody,
                  )}
                >
                  {isKo ? "진단 결과 · 아키타입" : "Diagnosis · Archetype"}
                </motion.p>
                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-5 max-w-[28rem] text-[1rem] font-medium leading-[2] tracking-[0.085em] text-[#2a3542] sm:text-[1.06rem] sm:leading-[1.95]",
                    fontSerifDisplay,
                  )}
                >
                  {isKo ? LUMINA_ESSENCE_COLOR_REPORT_OPENING_KO : LUMINA_ESSENCE_COLOR_REPORT_OPENING_EN}
                </motion.p>
                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-4 max-w-[28rem] text-[12.5px] leading-[2.05] tracking-[0.04em] text-[#5c6778] sm:text-[13px]",
                    fontBody,
                  )}
                >
                  {isKo ? LUMINA_ESSENCE_COLOR_REPORT_SAFETY_SUB_KO : LUMINA_ESSENCE_COLOR_REPORT_SAFETY_SUB_EN}
                </motion.p>
                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-8 max-w-[28rem] text-[1.02rem] font-medium leading-[1.82] tracking-[0.1em] text-[#2d3a47] sm:text-[1.12rem] sm:leading-[1.78] sm:tracking-[0.095em]",
                    fontSerifDisplay,
                  )}
                >
                  {isKo ? LUMINA_CONVICTION_TITLE_KO : LUMINA_CONVICTION_TITLE_EN}
                </motion.p>
                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-6 max-w-[28rem] text-[13px] leading-[2.2] tracking-[0.045em] text-[#5c6778] sm:text-[14px] sm:leading-[2.25]",
                    fontBody,
                  )}
                >
                  {isKo ? LUMINA_CONVICTION_SUB_KO : LUMINA_CONVICTION_SUB_EN}
                </motion.p>

                <motion.div variants={reportItem} className="mt-10 space-y-8 border-t border-neutral-200/90 pt-10">
                  <div>
                    <p
                      className={cn(
                        "text-[10px] font-medium tracking-[0.32em] text-neutral-500",
                        fontBody,
                      )}
                    >
                      {isKo ? LUMINA_PARADOX_LABEL_KYUSHO_KO : LUMINA_PARADOX_LABEL_KYUSHO_EN}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-[15px] leading-[2.15] tracking-[0.055em] text-[#3d4856]",
                        fontSerifDisplay,
                      )}
                    >
                      {isKo
                        ? LUMINA_PARADOX_KYUSHO_DECLARATION_KO
                        : LUMINA_PARADOX_KYUSHO_DECLARATION_EN}
                    </p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-[10px] font-medium tracking-[0.32em] text-neutral-500",
                        fontBody,
                      )}
                    >
                      {isKo ? LUMINA_PARADOX_LABEL_KYUSI_KO : LUMINA_PARADOX_LABEL_KYUSI_EN}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-[15px] leading-[2.15] tracking-[0.055em] text-[#3d4856]",
                        fontSerifDisplay,
                      )}
                    >
                      {isKo
                        ? LUMINA_PARADOX_KYUSI_DECLARATION_KO
                        : LUMINA_PARADOX_KYUSI_DECLARATION_EN}
                    </p>
                  </div>
                </motion.div>

                <motion.h4
                  variants={reportItem}
                  className={cn(
                    "mt-10 text-[1.65rem] font-semibold leading-[1.35] text-[#0a1628] sm:text-[2rem]",
                    fontSerifDisplay,
                  )}
                >
                  {isKo ? profile.nameKo : profile.nameEn}
                </motion.h4>
                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-5 text-[14px] leading-[2.05] tracking-[0.04em] text-neutral-600 sm:text-[15px]",
                    fontBody,
                  )}
                >
                  {isKo ? profile.essenceKo : profile.essenceEn}
                </motion.p>

                <motion.div
                  variants={reportItem}
                  className="mt-9 rounded-none border border-neutral-200 bg-white px-5 py-5 shadow-none"
                >
                  <p
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-500",
                      fontBody,
                    )}
                  >
                    {isKo ? "Diamond Wisdom · 본질 정수 (Vajra)" : "Diamond Wisdom · vajra essence"}
                  </p>
                  <p
                    className={cn(
                      "mt-4 text-[1.02rem] leading-[2] tracking-[0.03em] text-[#3d4856] sm:text-[1.08rem]",
                      fontSerifDisplay,
                    )}
                  >
                    {chosenDiamond ||
                      (isKo ? "본질 서술이 여기에 표시됩니다." : "Your essence statement appears here.")}
                  </p>
                  <p className={cn("mt-4 text-[11px] leading-[1.85] tracking-[0.06em] text-neutral-500", fontBody)}>
                    {isKo
                      ? "비주얼 생성 파이프라인에 전달될 때 가장 높은 가중치를 갖는 코어 파라미터입니다 수식어를 덜수록(求小) 시그널은 더 선명해집니다"
                      : "Core parameter for the visual pipeline Fewer modifiers (essentialism) sharpen the signal"}
                  </p>
                </motion.div>

                <motion.blockquote
                  variants={reportItem}
                  className={cn(
                    "mt-8 border-l-2 border-[#1c3a5a] pl-5 text-left text-[1rem] leading-[2] tracking-[0.04em] text-[#4a5a6e] sm:text-[1.06rem]",
                    fontSerifDisplay,
                  )}
                >
                  {chosenAction ||
                    (isKo ? "선택하신 확신의 한 마디가 여기에 표시됩니다." : "Your conviction line appears here.")}
                </motion.blockquote>

                {chosenOrigin ? (
                  <motion.p variants={reportItem} className={cn("mt-4 text-[13px] text-neutral-600", fontBody)}>
                    <span className="text-neutral-500">{isKo ? "고집의 뿌리 · " : "Origin · "}</span>
                    {chosenOrigin}
                  </motion.p>
                ) : null}

                <motion.div variants={reportItem} className="relative mt-8">
                  <p
                    className={cn(
                      "mb-3 text-[11px] tracking-[0.2em] text-neutral-500",
                      fontBody,
                    )}
                  >
                    {isKo ? "컬러 팔레트" : "Color palette"}
                  </p>
                  {!reduceMotion && safetyEmpathyToken > 0 ? (
                    <motion.p
                      key={safetyEmpathyToken}
                      aria-live="polite"
                      className={cn(
                        "pointer-events-none absolute -top-1 right-0 max-w-[14rem] text-right text-[10px] leading-snug tracking-[0.06em] text-[#8b9aad] sm:text-[10.5px]",
                        fontSerifDisplay,
                      )}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.92, 0.92, 0] }}
                      transition={{
                        duration: 3.4,
                        times: [0, 0.12, 0.5, 1],
                        ease: easeWave,
                      }}
                    >
                      {isKo ? LUMINA_SAFETY_EMPATHY_FLASH_KO : LUMINA_SAFETY_EMPATHY_FLASH_EN}
                    </motion.p>
                  ) : null}
                  <div className="flex flex-wrap gap-3">
                    {profile.palette.map((sw) => (
                      <div key={sw.hex} className="flex min-w-[5.5rem] flex-col gap-1.5">
                        <div
                          className="h-12 w-full rounded-none border border-neutral-200 bg-white shadow-none"
                          style={{ backgroundColor: sw.hex }}
                        />
                        <span className={cn("text-[10px] text-neutral-500", fontBody)}>
                          {isKo ? sw.labelKo : sw.labelEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={reportItem} className="mt-10">
                  <p
                    className={cn(
                      "mb-3 text-[11px] tracking-[0.2em] text-neutral-500",
                      fontBody,
                    )}
                  >
                    {isKo ? "가상 화보 시안" : "Editorial mock"}
                  </p>
                  <div
                    className="lumina-sensory-haptic-surface relative cursor-default overflow-hidden rounded-none border border-neutral-200/80 p-6 sm:p-8"
                    style={{ background: profile.mockGradient }}
                    onMouseMove={(e) => {
                      if (reduceMotion) return
                      const el = e.currentTarget
                      const r = el.getBoundingClientRect()
                      el.style.setProperty(
                        "--lumina-hx",
                        `${((e.clientX - r.left) / r.width) * 100}%`,
                      )
                      el.style.setProperty(
                        "--lumina-hy",
                        `${((e.clientY - r.top) / r.height) * 100}%`,
                      )
                    }}
                  >
                    <div className="relative z-[2]">
                    <p
                      className={cn(
                        "mb-2 text-center text-[8.5px] uppercase tracking-[0.22em] text-white/40 sm:text-[9px]",
                        fontBody,
                      )}
                    >
                      {isKo ? LUMINA_SENSORY_BRIDGE_TITLE_KO : LUMINA_SENSORY_BRIDGE_TITLE_EN}
                    </p>
                    <div className="relative mx-auto mb-2 min-h-[2.25rem] max-w-[17rem] text-center">
                      {!reduceMotion ? (
                        <>
                          <motion.p
                            className={cn(
                              "text-[9.5px] leading-snug tracking-[0.06em] text-white/72 sm:text-[10px]",
                              fontSerifDisplay,
                            )}
                            aria-hidden
                            animate={{ opacity: [1, 0.08, 0.08, 1] }}
                            transition={{
                              duration: 5.6,
                              repeat: Infinity,
                              ease: easeWave,
                              times: [0, 0.42, 0.52, 1],
                            }}
                          >
                            色 ·{" "}
                            {isKo ? LUMINA_SENSORY_CONTRAST_VISUAL_KO : LUMINA_SENSORY_CONTRAST_VISUAL_EN}
                          </motion.p>
                          <motion.p
                            className={cn(
                              "absolute inset-x-0 top-0 text-[9.5px] leading-snug tracking-[0.06em] text-white/72 sm:text-[10px]",
                              fontSerifDisplay,
                            )}
                            aria-hidden
                            animate={{ opacity: [0.1, 1, 1, 0.1] }}
                            transition={{
                              duration: 5.6,
                              repeat: Infinity,
                              ease: easeWave,
                              times: [0, 0.42, 0.52, 1],
                            }}
                          >
                            觸 ·{" "}
                            {isKo ? LUMINA_SENSORY_CONTRAST_TACTILE_KO : LUMINA_SENSORY_CONTRAST_TACTILE_EN}
                          </motion.p>
                        </>
                      ) : (
                        <p
                          className={cn(
                            "text-[9.5px] leading-snug tracking-[0.06em] text-white/65",
                            fontSerifDisplay,
                          )}
                        >
                          {isKo ? LUMINA_SENSORY_CONTRAST_VISUAL_KO : LUMINA_SENSORY_CONTRAST_VISUAL_EN}
                          <span className="mx-1.5 text-white/35">·</span>
                          {isKo ? LUMINA_SENSORY_CONTRAST_TACTILE_KO : LUMINA_SENSORY_CONTRAST_TACTILE_EN}
                        </p>
                      )}
                    </div>
                    <div className="relative mx-auto flex h-48 max-w-[200px] flex-col items-center justify-end sm:h-56">
                      <div className="mb-3 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-1">
                        <motion.span
                          className={cn(
                            "text-[8.5px] font-medium uppercase tracking-[0.28em] text-[#b8c4d4] sm:text-[9px]",
                            fontBody,
                          )}
                          initial={reduceMotion ? false : { opacity: 0.35 }}
                          animate={
                            reduceMotion
                              ? undefined
                              : { opacity: [0.38, 0.88, 0.48, 0.82, 0.55] }
                          }
                          transition={
                            reduceMotion
                              ? undefined
                              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                          }
                        >
                          {isKo ? LUMINA_SAFETY_TAG_ORIGIN_KO : LUMINA_SAFETY_TAG_ORIGIN_EN}
                        </motion.span>
                        <motion.span
                          className={cn(
                            "text-[8.5px] font-medium uppercase tracking-[0.28em] text-[#aab8ca] sm:text-[9px]",
                            fontBody,
                          )}
                          initial={reduceMotion ? false : { opacity: 0.35 }}
                          animate={
                            reduceMotion
                              ? undefined
                              : { opacity: [0.42, 0.9, 0.52, 0.78, 0.5] }
                          }
                          transition={
                            reduceMotion
                              ? undefined
                              : {
                                  duration: 5.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.35,
                                }
                          }
                        >
                          {isKo ? LUMINA_SAFETY_TAG_SKIN_KO : LUMINA_SAFETY_TAG_SKIN_EN}
                        </motion.span>
                      </div>
                      <div className="relative flex w-full flex-1 items-end justify-center">
                      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                      <div className="lumina-dew-ampoule-glass lumina-glass-clarity-ampoule lumina-quiet-conviction-ampoule relative z-0 h-44 w-20 rounded-t-md border border-white/22 border-b-0 bg-gradient-to-b from-white/[0.28] to-white/[0.06] sm:h-52 sm:w-[5.25rem]">
                        <div className="absolute inset-x-2 top-3 z-[1] h-10 rounded-b-sm bg-white/18 backdrop-blur-sm" />
                        <div className="absolute left-1/2 top-1/2 z-[1] h-16 w-0.5 -translate-x-1/2 bg-gradient-to-b from-white/50 to-transparent opacity-70" />
                        <span
                          className="lumina-dew-logo-mark lumina-quiet-conviction-logo pointer-events-none absolute left-1/2 top-[38%] z-[1] -translate-x-1/2 text-[9px] font-medium tracking-[0.42em] text-white/50"
                          aria-hidden
                        >
                          L
                        </span>
                      </div>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "mt-4 text-center text-[10px] leading-relaxed tracking-[0.04em] text-white/45 sm:text-[10.5px]",
                        fontSerifDisplay,
                      )}
                    >
                      {isKo
                        ? LUMINA_INGREDIENT_AUTOBIOGRAPHY_CAPTION_KO
                        : LUMINA_INGREDIENT_AUTOBIOGRAPHY_CAPTION_EN}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-center text-[10px] leading-[1.85] tracking-[0.045em] text-white/52 sm:text-[10.5px]",
                        fontSerifDisplay,
                      )}
                    >
                      {isKo ? LUMINA_PRODUCT_DETAIL_CLOSING_COMFORT_KO : LUMINA_PRODUCT_DETAIL_CLOSING_COMFORT_EN}
                    </p>
                    <p
                      className={cn(
                        "mt-5 text-center text-[11px] uppercase tracking-[0.25em] text-white/55",
                        fontBody,
                      )}
                    >
                      HIGH‑FUNCTIONAL AMPOULE · K‑BEAUTY INDIE
                    </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={reportItem}
                  className="mt-10 rounded-none border border-neutral-200 bg-white p-5 shadow-none"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p
                      className={cn(
                        "text-[11px] tracking-[0.2em] text-neutral-500",
                        fontBody,
                      )}
                    >
                      BRAND IDENTITY REPORT · PREVIEW
                    </p>
                    <Check className="h-4 w-4 text-neutral-500" />
                  </div>
                  <p className={cn("text-[14px] leading-[2] tracking-[0.035em] text-neutral-700", fontBody)}>
                    {isKo
                      ? `6단 Genesis(마지막 Diamond Wisdom 가중)으로 아키타입 「${profile.nameKo}」을 산출했습니다. 톤·조명·재질 가이드는 워크스페이스에서 확장할 수 있습니다.`
                      : `Six-step Genesis (Diamond Wisdom weighted highest) yielded “${profile.nameEn}”. Extend tone, light, and material guides in your workspace.`}
                  </p>
                  <div className="mt-4 h-px w-full bg-neutral-200" />
                  <p className={cn("mt-4 text-[12px] text-neutral-500", fontBody)}>
                    {isKo
                      ? "전체 PDF는 루미나 워크스페이스에서 다운로드할 수 있습니다."
                      : "Download the full PDF from your Lumina workspace."}
                  </p>
                </motion.div>

                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-10 border-t border-neutral-200 pt-8 text-center text-[0.95rem] leading-[1.85] text-[#4a5568] sm:text-[1.02rem]",
                    fontSerifDisplay,
                  )}
                >
                  {isKo
                    ? "이 모든 확신의 근거는 외부가 아닌 창업자 당신의 고집 안에 있었습니다."
                    : "Every ounce of this conviction was never out there — it lived in your stubbornness all along."}
                </motion.p>

                <motion.p
                  variants={reportItem}
                  className={cn(
                    "mt-8 text-center text-[11px] leading-[1.95] tracking-[0.06em] text-neutral-400/50 sm:text-[11.5px]",
                    fontSerifDisplay,
                  )}
                >
                  {isKo ? LUMINA_ETERNAL_FLAME_FOOTNOTE_KO : LUMINA_ETERNAL_FLAME_FOOTNOTE_EN}
                </motion.p>

                {isConventional ? (
                  <motion.p
                    variants={reportItem}
                    className={cn(
                      "mt-6 text-center text-[10.5px] leading-[1.9] tracking-[0.05em] text-neutral-500/75 sm:text-[11px]",
                      fontSerifDisplay,
                    )}
                  >
                    {isKo ? LUMINA_CONVENTIONAL_PATH_WARNING_KO : LUMINA_CONVENTIONAL_PATH_WARNING_EN}
                  </motion.p>
                ) : null}

                <motion.div
                  variants={reportItem}
                  className="mt-10 border-t border-neutral-200 pt-8 text-center"
                >
                  <p
                    className={cn(
                      "text-[0.98rem] font-medium leading-[1.72] tracking-[0.04em] text-[#2d3a47] sm:text-[1.05rem]",
                      fontSerifDisplay,
                    )}
                  >
                    {isKo ? LUMINA_FINALE_HEADLINE_KO : LUMINA_FINALE_HEADLINE_EN}
                  </p>
                  <p className={cn("mt-4 text-[12.5px] leading-[2] text-[#5c6778] sm:text-[13px]", fontBody)}>
                    {isKo ? LUMINA_FINALE_BODY_LINE_1_KO : LUMINA_FINALE_BODY_LINE_1_EN}
                  </p>
                  <p className={cn("mt-2 text-[12.5px] leading-[2] text-[#5c6778] sm:text-[13px]", fontBody)}>
                    {isKo ? LUMINA_FINALE_BODY_LINE_2_KO : LUMINA_FINALE_BODY_LINE_2_EN}
                  </p>
                </motion.div>

                <motion.button
                  variants={reportItem}
                  type="button"
                  onClick={closeResult}
                  className={cn(
                    "mt-8 w-full rounded-full border border-neutral-300 bg-white py-3 text-[13px] text-neutral-700 transition-colors hover:bg-neutral-50",
                    fontBody,
                  )}
                >
                  {isKo ? "닫기" : "Close"}
                </motion.button>
                </motion.div>
              </div>
            </motion.div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
