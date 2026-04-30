"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Shield, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

const fontHeadThin =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-light"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

const GOLD = "#D4AF37"
const SILVER = "#C0C0C0"

const SCAN_MESSAGES = [
  "가격 저항선 발견",
  "성분 불안 지점 감지",
  "효능 의구심 포착",
] as const

const REBUTTAL_CARDS = [
  {
    id: "logic",
    tag: "논리적 방어",
    body: "고객의 '비싸다'는 인식을 '오래 지속되는 가치'로 전환하는 서사 생성 완료.",
    accent: "gold" as const,
  },
  {
    id: "evidence",
    tag: "증거적 증명",
    body: "성분 불안을 잠재울 독일 더마테스트(Dermatest) 인증 데이터와 임상 그래프 매칭 완료.",
    accent: "silver" as const,
  },
  {
    id: "safety",
    tag: "심리적 안전장치",
    body: "구매 후회 방지를 위한 100% 안심 환불 보장 UI를 최적의 위치에 배치 완료.",
    accent: "gold" as const,
  },
]

type Phase = "idle" | "scanning" | "done"

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    rotateX: -16,
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.08 + i * 0.13,
      type: "spring" as const,
      stiffness: 340,
      damping: 28,
      mass: 0.82,
    },
  }),
}

export function CosmeticPrmShowcase() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("idle")
  const [scanMsgIdx, setScanMsgIdx] = useState(0)

  const runScan = useCallback(() => {
    setPhase("scanning")
    setScanMsgIdx(0)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setPhase("done")
      return
    }
    const t = setTimeout(() => runScan(), 650)
    return () => clearTimeout(t)
  }, [reduceMotion, runScan])

  useEffect(() => {
    if (phase !== "scanning") return
    let step = 0
    const maxStep = 10
    const id = setInterval(() => {
      setScanMsgIdx(step % 3)
      step += 1
      if (step >= maxStep) {
        clearInterval(id)
        setPhase("done")
      }
    }, 460)
    return () => clearInterval(id)
  }, [phase])

  const replay = () => {
    if (phase === "scanning") return
    runScan()
  }

  return (
    <div className="relative mt-12 border-t border-white/[0.08] pt-10 md:mt-14 md:pt-12">
      <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className={cn("mb-2 text-[10px] font-medium uppercase tracking-[0.28em]", fontBody)}
            style={{ color: GOLD }}
          >
            Core Engine · PRM
          </p>
          <h3
            className={cn(
              "text-lg tracking-[0.04em] text-white/[0.94] sm:text-xl",
              fontHeadThin,
            )}
            style={{ lineHeight: 1.55 }}
          >
            심리적 반박 대응 모델{" "}
            <span className="text-[#C0C0C0]/80">(Psychological Rebuttal Model)</span>
          </h3>
        </div>
        <button
          type="button"
          onClick={replay}
          disabled={phase === "scanning"}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
            fontBody,
            phase === "scanning"
              ? "cursor-wait border-[#D4AF37]/35 text-white/40"
              : "border-[#D4AF37]/45 text-[#D4AF37] hover:bg-[#D4AF37]/10",
          )}
        >
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
          {phase === "scanning" ? "스캔 중…" : "스캔 다시 보기"}
        </button>
      </div>

      <div
        className="relative mx-auto flex max-w-lg flex-col items-center justify-center pb-10 md:max-w-xl md:pb-12"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative w-full max-w-[min(100%,380px)]"
          animate={
            reduceMotion
              ? {}
              : {
                  rotateX: phase === "scanning" ? [0, -2.5, 2.5, 0] : 0,
                  rotateY: phase === "scanning" ? [0, 2, -2, 0] : 0,
                }
          }
          transition={{ duration: 3.8, repeat: phase === "scanning" ? Infinity : 0, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border p-[1px]",
              "shadow-[0_0_60px_rgba(212,175,55,0.12),0_0_120px_rgba(192,192,192,0.06)]",
            )}
            style={{
              background: `linear-gradient(135deg, rgba(212,175,55,0.45) 0%, rgba(192,192,192,0.28) 42%, transparent 68%, rgba(212,175,55,0.38) 100%)`,
            }}
          >
            <div className="relative overflow-hidden rounded-[15px] bg-[#060605]/95 backdrop-blur-2xl">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative space-y-3 p-4 sm:p-5">
                <div className="flex gap-2">
                  <div className="h-2 w-1/3 rounded-full bg-white/[0.12]" />
                  <div className="ml-auto h-2 w-16 rounded-full bg-[#D4AF37]/25" />
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/[0.08]">
                  <Image
                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop"
                    alt="코스메틱 샘플 제품"
                    fill
                    className="object-cover opacity-85"
                    sizes="(min-width: 768px) 380px, 92vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-[88%] rounded-full bg-white/[0.08]" />
                  <div className="h-1.5 w-[72%] rounded-full bg-white/[0.06]" />
                  <div className="h-1.5 w-[56%] rounded-full bg-white/[0.05]" />
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className={cn("text-[10px] text-[#C0C0C0]/55", fontBody)}>가격대 · 성분 · 효능</span>
                  <span className="text-[11px] font-medium tabular-nums" style={{ color: GOLD }}>
                    ₩ —
                  </span>
                </div>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-x-0 z-[2] h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}, ${SILVER}, transparent)`,
                  boxShadow: `0 0 24px ${GOLD}, 0 0 48px rgba(212,175,55,0.35)`,
                }}
                initial={{ top: "0%" }}
                animate={
                  phase === "scanning"
                    ? { top: ["0%", "100%", "0%"] }
                    : { top: phase === "done" ? "100%" : "0%" }
                }
                transition={
                  phase === "scanning"
                    ? { duration: 2.4, ease: "easeInOut", repeat: Infinity }
                    : { duration: 0.5 }
                }
              />

              <motion.div
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#D4AF37]/[0.08] via-transparent to-[#C0C0C0]/[0.06]"
                initial={{ opacity: 0.18 }}
                animate={{ opacity: phase === "scanning" ? [0.3, 0.58, 0.3] : 0.18 }}
                transition={{ duration: 1.5, repeat: phase === "scanning" ? Infinity : 0 }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-1 left-1/2 z-[5] flex min-h-[1.5rem] w-[min(100%,320px)] -translate-x-1/2 justify-center">
            <AnimatePresence mode="wait">
              {phase === "scanning" ? (
                <motion.p
                  key={SCAN_MESSAGES[scanMsgIdx]}
                  initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                  transition={{ duration: 0.32, ease: easeLux }}
                  className={cn(
                    "text-center text-[11px] font-medium tracking-wide sm:text-xs",
                    fontBody,
                  )}
                  style={{
                    color: GOLD,
                    textShadow: `0 0 24px rgba(212,175,55,0.55), 0 0 48px rgba(212,175,55,0.25)`,
                  }}
                >
                  {SCAN_MESSAGES[scanMsgIdx]}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className={cn("mt-14 text-center text-[10px] uppercase tracking-[0.2em] text-white/35", fontBody)}>
          Lumina AI · live objection trace
        </p>
        <AnimatePresence mode="wait">
          {phase === "done" ? (
            <motion.p
              key="scan-done-message"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: easeLux }}
              className={cn("mt-2 text-center text-[11px] tracking-[0.18em] text-[#d9c38e]", fontBody)}
            >
              신뢰 장벽 제거 완료
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-5xl" style={{ perspective: "1400px" }}>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {REBUTTAL_CARDS.map((card, i) => (
            <motion.article
              key={card.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={phase === "done" ? "show" : "hidden"}
              style={{ transformStyle: "preserve-3d" }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-[#080807]/90 p-5 backdrop-blur-xl sm:p-6",
                "border-[#C0C0C0]/22 shadow-[inset_0_1px_0_rgba(212,175,55,0.14)]",
                "before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#C0C0C0] before:to-[#D4AF37]/45",
              )}
            >
              <div className="relative flex items-start gap-3 pl-2">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C0C0C0]/28 bg-white/[0.04]"
                  style={{ boxShadow: "0 0 20px rgba(212,175,55,0.14)" }}
                >
                  <Shield
                    className="h-5 w-5"
                    strokeWidth={1.25}
                    style={{ color: card.accent === "gold" ? GOLD : SILVER }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", fontBody)}
                    style={{ color: card.accent === "gold" ? GOLD : SILVER }}
                  >
                    [{card.tag}]
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-[12px] leading-relaxed text-white/68 sm:text-[13px]",
                      fontBody,
                    )}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.p
        className={cn(
          "mx-auto mt-10 max-w-3xl text-center text-[13px] leading-[1.95] tracking-[0.02em] text-white/58 sm:mt-12 sm:text-sm",
          fontHeadThin,
        )}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: phase === "done" ? 1 : 0.4,
          y: phase === "done" ? 0 : 4,
        }}
        transition={{ duration: 0.55, delay: phase === "done" ? 0.28 : 0 }}
      >
        루미나는 고객의 거절을 분석하여 확신으로 바꿉니다. 당신의 제품은 이제 논리적으로 완벽한 요새가 됩니다.
      </motion.p>
      <AnimatePresence mode="wait">
        {phase === "done" ? (
          <motion.p
            key="authority-narrative"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: easeLux, delay: 0.08 }}
            className={cn(
              "mx-auto mt-4 max-w-3xl text-center text-[13px] leading-[1.9] tracking-[0.02em] text-[#e8dcc0]/88 sm:text-sm",
              fontHeadThin,
            )}
          >
            임상 근거와 감성 서사를 결합한 권위의 문장으로, 고객은 이제 제품의 가격이 아닌 신뢰의 밀도를 먼저 봅니다.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
