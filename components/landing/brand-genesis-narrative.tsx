"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const fontNarrative =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"

function AnimatedMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-[20%] -top-[30%] h-[85%] w-[85%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,43,79,0.55)_0%,rgba(0,27,58,0.12)_45%,transparent_70%)] blur-[100px] motion-safe:animate-genesis-mesh-a" />
      <div className="absolute -right-[25%] top-[10%] h-[75%] w-[75%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(192,192,192,0.08)_40%,transparent_68%)] blur-[90px] motion-safe:animate-genesis-mesh-b" />
      <div className="absolute bottom-[-20%] left-[15%] h-[60%] w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.06)_0%,transparent_55%)] blur-[80px] motion-safe:animate-genesis-mesh-c" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(0,43,79,0.12),transparent_50%)]" />
    </div>
  )
}

/** 수분 입자 · 꽃봉오리 느낌의 추상 글로우 */
function EtherealAccents({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 w-[min(42vw,320px)] -translate-y-1/2 select-none",
        side === "left" ? "-left-[8%] md:left-0" : "-right-[8%] md:right-0",
      )}
      aria-hidden
    >
      <div
        className={cn(
          "absolute rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-40 blur-2xl motion-safe:animate-genesis-drift",
          side === "left" ? "left-0 top-0 h-32 w-32" : "right-8 top-12 h-28 w-28",
        )}
        style={{ animationDelay: side === "left" ? "0s" : "1.2s" }}
      />
      <div
        className={cn(
          "absolute rounded-full border border-white/10 bg-white/[0.04] blur-sm motion-safe:animate-genesis-drift",
          side === "left" ? "left-12 top-24 h-3 w-3" : "right-20 top-8 h-2 w-2",
        )}
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className={cn(
          "absolute rounded-full bg-white/15 blur-xl motion-safe:animate-genesis-drift",
          side === "left" ? "left-8 top-40 h-16 w-16" : "right-4 top-32 h-20 w-20",
        )}
        style={{ animationDelay: side === "left" ? "2s" : "0.3s" }}
      />
      <div
        className={cn(
          "absolute h-px w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60",
          side === "left" ? "left-4 top-52 rotate-[35deg]" : "right-6 top-48 -rotate-[25deg]",
        )}
      />
    </div>
  )
}

function ShimmerSilver({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-[linear-gradient(105deg,#f8fafc_0%,#c0c0c0_40%,#e8eef5_70%,#9aa3ad_100%)] bg-[length:220%_auto] bg-clip-text text-transparent motion-safe:animate-genesis-shimmer",
        className,
      )}
    >
      {children}
    </span>
  )
}

type ActBlockProps = {
  actLabel: string
  actTitle: string
  lines: { key: string; text: React.ReactNode; micro?: boolean }[]
  connector?: boolean
}

function ActBlock({ actLabel, actTitle, lines, connector }: ActBlockProps) {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.16, delayChildren: 0.08 },
    },
  }

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 32, filter: "blur(22px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.05, ease: easeLux },
    },
  }

  return (
    <div className="relative">
      {connector ? (
        <div
          className="absolute left-[0.6rem] top-0 hidden h-0 w-px -translate-y-full md:block"
          style={{
            height: "4.5rem",
            background: "linear-gradient(180deg, transparent, rgba(192,192,192,0.35), transparent)",
          }}
          aria-hidden
        />
      ) : null}

      <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-white/[0.07] pb-6 md:mb-10 md:pb-8">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-[#C0C0C0]/75 md:text-[11px]">
          {actLabel}
        </span>
        <h2
          className={cn(
            fontNarrative,
            "text-xl font-light tracking-[0.28em] text-white/92 md:text-2xl",
          )}
          style={{ lineHeight: 1.85 }}
        >
          {actTitle}
        </h2>
      </div>

      <motion.div
        className="space-y-8 md:space-y-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px -8% 0px", amount: 0.2 }}
        variants={container}
      >
        {lines.map((line) => (
          <motion.div key={line.key} variants={item}>
            <p
              className={cn(
                fontNarrative,
                line.micro
                  ? "text-sm font-normal tracking-[0.06em] text-white/45 md:text-base"
                  : "text-[1.05rem] font-normal tracking-[0.14em] text-white/[0.88] md:text-[1.2rem] lg:text-[1.28rem]",
                "text-balance",
              )}
              style={{ lineHeight: line.micro ? 2 : 2.45 }}
            >
              {line.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function BrandGenesisNarrative() {
  return (
    <section
      className="relative overflow-hidden bg-[#112240] py-24 md:py-32 lg:py-40"
      aria-labelledby="brand-genesis-narrative-heading"
    >
      <AnimatedMesh />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{ backgroundImage: grainSvg }}
        aria-hidden
      />

      <EtherealAccents side="left" />
      <EtherealAccents side="right" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[min(42rem,70vw)] text-left">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-[#C0C0C0]/65">
          Cosmetic · Brand Story
        </p>
        <h2
          id="brand-genesis-narrative-heading"
          className={cn(
            fontNarrative,
            "mb-16 max-w-xl text-2xl font-bold tracking-[0.18em] text-white md:mb-20 md:text-3xl",
          )}
          style={{ lineHeight: 2.1 }}
        >
          한 편의 시나리오처럼,
          <br />
          <ShimmerSilver>당신의 브랜드</ShimmerSilver>가 깨어납니다
        </h2>

        <div className="relative space-y-20 md:space-y-28 md:pl-6">
          <div
            className="absolute left-0 top-8 hidden w-px md:block md:top-12"
            style={{
              height: "calc(100% - 4rem)",
              background:
                "linear-gradient(180deg, rgba(192,192,192,0.35) 0%, rgba(255,255,255,0.1) 45%, rgba(192,192,192,0.25) 100%)",
            }}
            aria-hidden
          />

          <ActBlock
            actLabel="Act I"
            actTitle="The Void — 결핍"
            lines={[
              {
                key: "v1",
                text: (
                  <>
                    스스로에게 묻습니다.
                    <br />
                    왜 바를수록, 피부는 더 고요히 아파하는 걸까요.
                  </>
                ),
              },
              {
                key: "v2",
                text: (
                  <>
                    수천 개의 약속이 겹친 자리,
                    <br />
                    그런데도 남는 것은 <span className="text-white/55">채워지지 않는 갈증</span>뿐입니다.
                  </>
                ),
              },
              {
                key: "v-micro",
                micro: true,
                text: "채우는 것만큼 비어버리는 밤이 있습니다.",
              },
            ]}
          />

          <ActBlock
            connector
            actLabel="Act II"
            actTitle="The Spark — 발견"
            lines={[
              {
                key: "s1",
                text: (
                  <>
                    수만 명의 고통이 데이터로 축적되던 어둠 속에서,
                    <br />
                    루미나는 한 가닥 <ShimmerSilver className="font-semibold">본질</ShimmerSilver>을
                    발견했습니다.
                  </>
                ),
              },
              {
                key: "s2",
                text: (
                  <>
                    왜 화장품을 바를수록 피부는 더 예민해질까요?
                    <br />
                    루미나는 그 질문을 데이터로 읽어냈고, 거기서{" "}
                    <span className="text-[#C0C0C0]/90">「덜어냄의 미학」</span>을
                    발견했습니다.
                  </>
                ),
              },
              {
                key: "s3",
                text: (
                  <>
                    이것은 단순한 화장품이 아닙니다.
                    <br />
                    <span className="text-white/80">당신을 향한, 우리의 존중입니다.</span>
                  </>
                ),
              },
              {
                key: "s-micro",
                micro: true,
                text: "우리는 단순히 성분을 배합하지 않습니다. 우리는 당신의 자부심을 설계합니다.",
              },
            ]}
          />

          <ActBlock
            connector
            actLabel="Act III"
            actTitle="The Promise — 약속"
            lines={[
              {
                key: "p1",
                text: (
                  <>
                    이제 선언합니다.
                    <br />
                    <ShimmerSilver className="font-semibold">
                      당신의 철학을 가장 화려하게 꽃피우겠습니다.
                    </ShimmerSilver>
                  </>
                ),
              },
              {
                key: "p-formula",
                micro: true,
                text: (
                  <span className="block border-l border-white/15 pl-4 text-white/50">
                    <span className="text-[#C0C0C0]/65">[창업자의 고통 · 의문]</span>
                    {" + "}
                    <span className="text-[#C0C0C0]/65">[루미나의 지능적 통찰]</span>
                    {" = "}
                    <span className="text-white/65">[새로운 아름다움의 탄생]</span>
                  </span>
                ),
              },
            ]}
          />
        </div>
        </div>
      </div>
    </section>
  )
}
