"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import { EN_CANONICAL_LINES, EN_CHARTER_GLOSS_KO } from "@/lib/lumina/en-charter"
import { LOVE_CANONICAL_LINES, LOVE_CHARTER_GLOSS_KO } from "@/lib/lumina/love-charter"
import {
  LUMINA_INTELLIGENCE_HANDOFF_CHECKLIST_EN,
  LUMINA_INTELLIGENCE_HANDOFF_CHECKLIST_KO,
  LUMINA_INTELLIGENCE_PRIORITY_BODY_EN,
  LUMINA_INTELLIGENCE_PRIORITY_BODY_KO,
  LUMINA_INTELLIGENCE_PRIORITY_HEADLINE_EN,
  LUMINA_INTELLIGENCE_PRIORITY_HEADLINE_KO,
} from "@/lib/lumina/intelligence-priority"
import {
  LUMINA_FOUNDER_EPILOGUE_BODY_EN,
  LUMINA_FOUNDER_EPILOGUE_BODY_KO,
  LUMINA_FOUNDER_EPILOGUE_TITLE_EN,
  LUMINA_FOUNDER_EPILOGUE_TITLE_KO,
} from "@/lib/lumina/founder-weekend-epilogue"
import {
  LUMINA_GENESIS_FLAGSHIP_SLOT_COUNT,
  LUMINA_NARRATIVE_SPEAR_BODY_EN,
  LUMINA_NARRATIVE_SPEAR_BODY_KO,
  LUMINA_NARRATIVE_SPEAR_HEADLINE_EN,
  LUMINA_NARRATIVE_SPEAR_HEADLINE_KO,
} from "@/lib/lumina/narrative-spear-charter"
import {
  CARD_STOCK_CHOICE_PRINCIPLE_EN,
  CARD_STOCK_CHOICE_PRINCIPLE_KO,
  CARD_STOCK_EARTHY_HINT_EN,
  CARD_STOCK_EARTHY_HINT_KO,
  CARD_STOCK_EARTHY_TITLE_EN,
  CARD_STOCK_EARTHY_TITLE_KO,
  CARD_STOCK_REFINED_HINT_EN,
  CARD_STOCK_REFINED_HINT_KO,
  CARD_STOCK_REFINED_TITLE_EN,
  CARD_STOCK_REFINED_TITLE_KO,
  NAKED_VESSEL_CARD_GLOSS_EN,
  NAKED_VESSEL_CARD_GLOSS_KO,
  NAKED_VESSEL_CARD_HEADLINE_EN,
  NAKED_VESSEL_CARD_HEADLINE_KO,
} from "@/lib/lumina/naked-vessel-card-charter"
import {
  LUMINA_TRUST_COVENANT_EN,
  LUMINA_TRUST_COVENANT_KO,
} from "@/lib/lumina/lumina-trust-covenant"
import { DU_CANONICAL_LINES, DU_CHARTER_GLOSS_KO } from "@/lib/lumina/du-charter"
import { MING_CANONICAL_LINES, MING_CHARTER_GLOSS_KO } from "@/lib/lumina/ming-charter"
import {
  SHUANGXI_CANONICAL_LINES,
  SHUANGXI_CHARTER_GLOSS_KO,
} from "@/lib/lumina/shuangxi-charter"
import { TAN_CANONICAL_LINES, TAN_CHARTER_GLOSS_KO } from "@/lib/lumina/tan-charter"
import { ZEN_CANONICAL_LINES, ZEN_CHARTER_GLOSS_KO } from "@/lib/lumina/zen-charter"
import { MEI_CANONICAL_LINES, MEI_CHARTER_GLOSS_KO } from "@/lib/lumina/mei-charter"
import { XIN_CANONICAL_LINES, XIN_CHARTER_GLOSS_KO } from "@/lib/lumina/xin-charter"
import { GUSO_CANONICAL_LINES, GUSO_CHARTER_GLOSS_KO } from "@/lib/lumina/guso-charter"
import {
  LUMINA_ORIGIN_GUSO_HEADLINE_EN,
  LUMINA_ORIGIN_GUSO_HEADLINE_KO,
  LUMINA_ORIGIN_GUSO_SUBCOPY_EN,
  LUMINA_ORIGIN_GUSO_SUBCOPY_KO,
} from "@/lib/lumina/guso-macro-aesthetics-charter"
import {
  LUMINA_RAW_SCENT_OLFACTORY_LINE_EN,
  LUMINA_RAW_SCENT_OLFACTORY_LINE_KO,
  LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_EN,
  LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_KO,
  LUMINA_RAW_SCENT_REBUTTAL_EN,
  LUMINA_RAW_SCENT_REBUTTAL_KO,
} from "@/lib/lumina/raw-scent-charter"
import {
  LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_EN,
  LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_KO,
  LUMINA_ORIGIN1_FLAGSHIP_NAME_EN,
  LUMINA_ORIGIN1_FLAGSHIP_NAME_KO,
  LUMINA_ORIGIN1_GRAND_SYNTHESIS_LEDGER_TITLE_EN,
  LUMINA_ORIGIN1_GRAND_SYNTHESIS_LEDGER_TITLE_KO,
  LUMINA_ORIGIN1_GRAND_SYNTHESIS_ROWS_EN,
  LUMINA_ORIGIN1_GRAND_SYNTHESIS_ROWS_KO,
  LUMINA_ORIGIN1_LAUNCH_CTA_LINE_EN,
  LUMINA_ORIGIN1_LAUNCH_CTA_LINE_KO,
  LUMINA_ORIGIN1_PRICE_PHILOSOPHY_EN,
  LUMINA_ORIGIN1_PRICE_PHILOSOPHY_KO,
  LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_EN,
  LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_KO,
  LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_EN,
  LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_KO,
  LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_EN,
  LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_KO,
} from "@/lib/lumina/young-niche-charter"
import {
  LUMINA_MASTER_MOTTO_EN,
  LUMINA_MASTER_MOTTO_KO,
} from "@/lib/lumina/lumina-master-motto-charter"
import {
  LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_EN,
  LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_KO,
  LUMINA_CUSTOMER_IMPRESSION_MANDATE_EN,
  LUMINA_CUSTOMER_IMPRESSION_MANDATE_KO,
  LUMINA_CUSTOMER_IMPRESSION_THREE_LAYERS_EN,
  LUMINA_CUSTOMER_IMPRESSION_THREE_LAYERS_KO,
} from "@/lib/lumina/lumina-customer-impression-charter"
import {
  LUMINA_FIRST_PRINCIPLE_EN,
  LUMINA_FIRST_PRINCIPLE_KO,
  LUMINA_FIRST_PRINCIPLE_RDC_EN,
  LUMINA_FIRST_PRINCIPLE_RDC_KO,
  LUMINA_FIRST_PRINCIPLE_TRIPLE_ACCESS_EN,
  LUMINA_FIRST_PRINCIPLE_TRIPLE_ACCESS_KO,
} from "@/lib/lumina/lumina-first-principle-charter"
import {
  LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_EN,
  LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_KO,
  TRINITY_CANONICAL_LINES,
  TRINITY_CHARTER_GLOSS_EN,
  TRINITY_CHARTER_GLOSS_KO,
  TRINITY_ONE_LINE_ORIGIN_GUGO_EN,
  TRINITY_ONE_LINE_ORIGIN_GUGO_KO,
  TRINITY_ONE_LINE_ORIGIN_GUGI_EN,
  TRINITY_ONE_LINE_ORIGIN_GUGI_KO,
  TRINITY_ONE_LINE_ORIGIN_GUSO_EN,
  TRINITY_ONE_LINE_ORIGIN_GUSO_KO,
} from "@/lib/lumina/lumina-trinity-charter"

const fontSerif = "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeDeep = [0.16, 1, 0.3, 1] as const

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function SilverGlow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[#f4f6f9]/[0.97]"
      style={{
        textShadow:
          "0 0 16px rgba(192,192,192,0.4), 0 0 32px rgba(192,192,192,0.22), 0 0 48px rgba(232,238,245,0.14)",
      }}
    >
      {children}
    </span>
  )
}

export function MidnightPhilosophySection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  /** opacity는 0으로 두지 않음 — whileInView 미트리거 시 본문이 사라지는 문제 방지 */
  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: easeDeep },
    },
  }

  const container = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.42, delayChildren: 0.1 },
    },
  }

  return (
    <section
      id="brand-charters"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/[0.06] py-24 md:py-32 lg:py-40"
      aria-labelledby="midnight-philosophy-heading"
    >
      {/* Deep navy #112240 기반 방사형 — 공기감 있는 심해 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#112240]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_22%_35%,rgba(26,80,128,0.48)_0%,rgba(17,34,64,0.9)_42%,rgba(8,15,26,0.95)_78%,#080f1a_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_60%,rgba(192,192,192,0.04)_0%,transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: grainSvg }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <p
          className={cn(
            "mb-5 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C0C0C0]/60",
            fontSans,
          )}
        >
          The Philosophy of Midnight Blue
        </p>
        <h2
          id="midnight-philosophy-heading"
          className={cn(
            "max-w-[min(42rem,70vw)] text-left text-[1.55rem] font-semibold leading-snug tracking-[0.03em] text-[#fafafa]/[0.96] sm:text-[1.9rem] md:text-[2.1rem]",
            fontSerif,
          )}
        >
          {isKo ? "우리가 미드나잇 블루를 선택한 이유" : "Why we chose midnight blue"}
        </h2>
        <p
          className={cn(
            "mt-5 max-w-[min(42rem,70vw)] text-[15px] font-normal leading-[2.05] tracking-[0.04em] text-[#e8eef5]/76 sm:text-[1.02rem] sm:leading-[2.2] md:tracking-[0.045em]",
            fontSans,
          )}
        >
          {isKo ? (
            <>
              밤바다처럼 깊은 미드나잇 블루는 숙성된 집념, 한국적 신뢰의 푸름, 그리고
              <br />
              당신이라는 별이 서는 무대를 한 톤으로 묶습니다. 아래에서 그 이유를 세 조각으로 풀어 말합니다.
            </>
          ) : (
            <>
              Deep as a night sea, midnight blue binds matured resolve, Korean trust in blue, and the stage where your
              brand shines as a star. Below, three threads spell out why.
            </>
          )}
        </p>

        <div className="mt-10 max-w-[min(42rem,70vw)] border-l border-rose-gold/30 pl-5 md:mt-12">
          <p
            className={cn(
              "mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
              fontSans,
            )}
          >
            {isKo ? "마스터 모토" : "Master motto"}
          </p>
          <p
            className={cn(
              "mb-4 text-[1.12rem] font-medium leading-[1.65] tracking-[0.04em] text-[#f6f9fc]/94 sm:text-[1.2rem]",
              fontSerif,
            )}
          >
            {isKo ? LUMINA_MASTER_MOTTO_KO : LUMINA_MASTER_MOTTO_EN}
          </p>
          <ul
            className={cn(
              "list-none space-y-2.5 text-[13px] leading-[1.8] tracking-[0.04em] text-[#d8e4f0]/76",
              fontSans,
            )}
          >
            <li>
              {isKo ? (
                <>
                  <span className="text-[#c5d4e6]/88">無名 · </span>
                  이름을 앞세우지 않고 파트너의 己를 비출 빈자리를 남긴다.
                </>
              ) : (
                <>
                  <span className="text-[#c5d4e6]/88">No name · </span>
                  Leave room so each partner’s self can show — not the platform’s noise.
                </>
              )}
            </li>
            <li>
              {isKo ? (
                <>
                  <span className="text-[#c5d4e6]/88">無飾 · </span>
                  꾸밈을 걷어 본질과 진실이 드러나게 한다.
                </>
              ) : (
                <>
                  <span className="text-[#c5d4e6]/88">No ornament · </span>
                  Strip adornment so essence and truth read clear.
                </>
              )}
            </li>
            <li>
              {isKo ? (
                <>
                  <span className="text-[#c5d4e6]/88">無欲 · </span>
                  없는 것을 있다고 말하지 않는다.
                </>
              ) : (
                <>
                  <span className="text-[#c5d4e6]/88">No false want · </span>
                  Never claim what is not there.
                </>
              )}
            </li>
          </ul>
        </div>

        <div className="mt-8 max-w-[min(42rem,70vw)] border-l border-[#6b8cae]/25 pl-5 md:mt-10">
          <p
            className={cn(
              "mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
              fontSans,
            )}
          >
            {isKo ? "작업 지침 · 제1원칙" : "Work ethic · First principle"}
          </p>
          <p
            className={cn(
              "mb-4 text-[1.05rem] font-medium leading-[1.65] tracking-[0.04em] text-[#f0f4f8]/90 sm:text-[1.12rem]",
              fontSerif,
            )}
          >
            {isKo ? LUMINA_FIRST_PRINCIPLE_KO : LUMINA_FIRST_PRINCIPLE_EN}
          </p>
          <p
            className={cn(
              "mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8fa6bc]/70",
              fontSans,
            )}
          >
            Triple Access
          </p>
          <ul
            className={cn(
              "list-none space-y-2 text-[13px] leading-[1.8] tracking-[0.04em] text-[#d8e4f0]/76",
              fontSans,
            )}
          >
            {(isKo ? LUMINA_FIRST_PRINCIPLE_TRIPLE_ACCESS_KO : LUMINA_FIRST_PRINCIPLE_TRIPLE_ACCESS_EN).map(
              (line, i) => (
                <li key={i}>{line}</li>
              ),
            )}
          </ul>
          <p
            className={cn(
              "mb-2 mt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8fa6bc]/70",
              fontSans,
            )}
          >
            {isKo ? "리서치 · 디자인 · 커뮤니케이션" : "Research · Design · Communication"}
          </p>
          <ul
            className={cn(
              "list-none space-y-2 text-[12.5px] leading-[1.75] tracking-[0.04em] text-[#cad8e8]/72",
              fontSans,
            )}
          >
            <li>{isKo ? LUMINA_FIRST_PRINCIPLE_RDC_KO.research : LUMINA_FIRST_PRINCIPLE_RDC_EN.research}</li>
            <li>{isKo ? LUMINA_FIRST_PRINCIPLE_RDC_KO.design : LUMINA_FIRST_PRINCIPLE_RDC_EN.design}</li>
            <li>
              {isKo ? LUMINA_FIRST_PRINCIPLE_RDC_KO.communication : LUMINA_FIRST_PRINCIPLE_RDC_EN.communication}
            </li>
          </ul>
        </div>

        <div className="mt-8 max-w-[min(42rem,70vw)] border-l border-rose-gold/22 pl-5 md:mt-10">
          <p
            className={cn(
              "mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
              fontSans,
            )}
          >
            {isKo ? "고객 감동" : "Customer impression"}
          </p>
          <p
            className={cn(
              "mb-4 text-[1.05rem] font-medium leading-[1.65] tracking-[0.04em] text-[#f6f9fc]/92 sm:text-[1.12rem]",
              fontSerif,
            )}
          >
            {isKo ? LUMINA_CUSTOMER_IMPRESSION_MANDATE_KO : LUMINA_CUSTOMER_IMPRESSION_MANDATE_EN}
          </p>
          <p
            className={cn(
              "mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8fa6bc]/70",
              fontSans,
            )}
          >
            {isKo ? "순백의 밀서 · 첫 문장" : "The first letter · opening line"}
          </p>
          <p
            className={cn(
              "mb-5 text-[13px] font-normal leading-[1.85] tracking-[0.045em] text-[#dce8f2]/78",
              fontSerif,
            )}
          >
            {isKo ? LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_KO : LUMINA_CUSTOMER_IMPRESSION_FIRST_LETTER_LEAD_EN}
          </p>
          <p
            className={cn(
              "mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8fa6bc]/70",
              fontSans,
            )}
          >
            {isKo ? "감동의 세 겹" : "Three layers of impression"}
          </p>
          <ul
            className={cn(
              "list-none space-y-2.5 text-[12.5px] leading-[1.8] tracking-[0.04em] text-[#cad8e8]/74",
              fontSans,
            )}
          >
            {(isKo ? LUMINA_CUSTOMER_IMPRESSION_THREE_LAYERS_KO : LUMINA_CUSTOMER_IMPRESSION_THREE_LAYERS_EN).map(
              (line, i) => (
                <li key={i} className="border-l border-white/[0.08] pl-3">
                  {line}
                </li>
              ),
            )}
          </ul>
        </div>

        <motion.div
          className="mt-12 max-w-[min(42rem,70vw)] space-y-14 text-left md:mt-16 md:space-y-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.08 }}
          variants={container}
        >
          {/* 본문 1 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>18년</SilverGlow>의 침묵, 그 숙성된 깊이
                </>
              ) : (
                <>
                  <SilverGlow>18 years</SilverGlow> of silence, depth matured
                </>
              )}
            </h3>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                <>
                  우리는 압니다. 세상을 놀라게 할 단 한 방울의 앰플을 만들기 위해 당신이 견뎌온 고독한 시간들을. 미드나잇
                  블루는 빛조차 닿지 않는 심해에서 묵묵히 본질을 벼려온 당신의 &apos;숙성된 고집&apos;을 상징합니다. 루미나는
                  그 깊은 어둠 속에서 당신의 진가를 발견해내는 첫 번째 빛이 되고자 합니다.
                </>
              ) : (
                <>
                  We know the solitary hours you have endured to forge that single drop of ampoule that could astonish the
                  world. Midnight blue stands for your tempered stubbornness — essence honed in a deep sea where light
                  barely reaches. Lumina seeks to be the first light that finds your true worth in that darkness.
                </>
              )}
            </p>
          </motion.article>

          {/* 본문 2 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? "한국인의 DNA에 각인된 신뢰" : "Trust etched in Korean DNA"}
            </h3>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                <>
                  한국인에게 푸른 빛은 가장 정교한 기술과 흔들리지 않는 전문성의 상징입니다. 청화백자의 고결한 푸른 눈물처럼,
                  루미나의 블루는 당신의 제품이 가진 순수함과 정교함이 시장에서 즉각적인 신뢰로 번역되게 만드는 가장 강력한
                  시각적 언어입니다.
                </>
              ) : (
                <>
                  For Koreans, blue light signals the finest craft and unwavering expertise. Like the pure blue tear of
                  celadon, Lumina&apos;s blue is the strongest visual language — turning your product&apos;s purity and
                  precision into immediate trust in the market.
                </>
              )}
            </p>
          </motion.article>

          {/* 본문 3 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? "별이 가장 찬란하게 빛나는 무대" : "The stage where stars shine brightest"}
            </h3>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                <>
                  별(Lumina)은 칠흑 같은 밤하늘에서 비로소 그 존재를 증명합니다. 루미나의 미드나잇 블루는 당신의 브랜드라는
                  찬란한 별이 가장 돋보일 수 있도록 마련된 우아한 무대입니다. 우리는 화려한 수식어로 당신을 가리지 않습니다.
                  오직 깊이 있는 배경이 되어 당신의 <SilverGlow>확신</SilverGlow>만을 돋보이게 할 뿐입니다.
                </>
              ) : (
                <>
                  A star proves itself only against a pitch-black sky. Lumina&apos;s midnight blue is the elegant stage
                  where your brand — the brightest star — can show itself. We do not cover you with loud ornament; we are
                  only the deep backdrop that lets your <SilverGlow>conviction</SilverGlow> shine.
                </>
              )}
            </p>
          </motion.article>

          {/* 구소 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>구소</SilverGlow> — 역설의 본질
                </>
              ) : (
                <>
                  <SilverGlow>Guso</SilverGlow> — the paradox of essence
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {GUSO_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? GUSO_CHARTER_GLOSS_KO : (
                <>
                  We choose the small over the grand, the awkward over polished beauty, the stained over sterile
                  perfection — not as failure, but as fidelity to what is real. We seek self (己), not borrowed miracles.
                  Lumina&apos;s Essence tier and legal shield both rest on this: truth before ornament.
                </>
              )}
            </p>
          </motion.article>

          {/* Lumina Origin — 求小 첫 목소리 (매크로 미학) */}
          <motion.article variants={item} className="max-w-xl">
            <p
              className={cn(
                "mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
                fontSans,
              )}
            >
              {isKo ? "Lumina Origin · 求小" : "Lumina Origin · qiú xiǎo"}
            </p>
            <h3
              className={cn(
                "mb-6 text-[1rem] font-medium leading-[1.65] tracking-[0.04em] text-[#f2f6fa]/92 sm:text-[1.05rem] md:tracking-[0.045em]",
                fontSerif,
              )}
            >
              {isKo ? LUMINA_ORIGIN_GUSO_HEADLINE_KO : LUMINA_ORIGIN_GUSO_HEADLINE_EN}
            </h3>
            <p
              className={cn(
                "text-[13px] font-normal leading-[2.05] tracking-[0.055em] text-[#dce4ee]/72 sm:text-[13.5px] sm:leading-[2.12]",
                fontSans,
              )}
            >
              {isKo ? LUMINA_ORIGIN_GUSO_SUBCOPY_KO : LUMINA_ORIGIN_GUSO_SUBCOPY_EN}
            </p>
          </motion.article>

          {/* 후각적 정직 · Raw Scent (求苦 정합) */}
          <motion.article variants={item} className="max-w-xl">
            <p
              className={cn(
                "mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
                fontSans,
              )}
            >
              {isKo ? "후각적 무결성 · 구고" : "Olfactory integrity · qiú kǔ"}
            </p>
            <h3
              className={cn(
                "mb-4 text-[1rem] font-medium leading-[1.65] tracking-[0.04em] text-[#f2f6fa]/90 sm:text-[1.05rem]",
                fontSerif,
              )}
            >
              {isKo ? LUMINA_RAW_SCENT_OLFACTORY_LINE_KO : LUMINA_RAW_SCENT_OLFACTORY_LINE_EN}
            </h3>
            <p
              className={cn(
                "mb-5 text-[13px] font-normal leading-[2.05] tracking-[0.05em] text-[#dce4ee]/72 sm:text-[13.5px]",
                fontSans,
              )}
            >
              {isKo ? LUMINA_RAW_SCENT_REBUTTAL_KO : LUMINA_RAW_SCENT_REBUTTAL_EN}
            </p>
            <p
              className={cn(
                "border-l border-white/[0.12] pl-4 text-[12px] font-normal italic leading-[1.85] tracking-[0.04em] text-[#c5d2e2]/68",
                fontSerif,
              )}
            >
              {isKo ? LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_KO : LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_EN}
            </p>
          </motion.article>

          {/* 2030 영-니치 — 카드 선언 · 급진적 투명성 */}
          <motion.article variants={item} className="max-w-xl">
            <p
              className={cn(
                "mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
                fontSans,
              )}
            >
              {isKo ? "2030 영-니치 · 정갈한 카드" : "Young-niche · the honest card"}
            </p>
            <p
              className={cn(
                "mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8fa6bc]/80",
                fontSans,
              )}
            >
              {isKo ? "공식 선언(첫 머리)" : "Official opening line"}
            </p>
            <h3
              className={cn(
                "mb-5 text-[1rem] font-medium leading-[1.65] tracking-[0.04em] text-[#f2f6fa]/90 sm:text-[1.05rem]",
                fontSerif,
              )}
            >
              {isKo ? LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_KO : LUMINA_ORIGIN_OFFICIAL_CARD_OPENING_EN}
            </h3>
            <p
              className={cn(
                "text-[13px] font-normal leading-[2.05] tracking-[0.05em] text-[#dce4ee]/72 sm:text-[13.5px]",
                fontSans,
              )}
            >
              {isKo ? LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_KO : LUMINA_YOUNG_NICHE_RADICAL_TRANSPARENCY_EN}
            </p>
            <p
              className={cn(
                "mt-5 border-l border-rose-gold/25 pl-4 text-[12px] font-normal leading-[1.85] tracking-[0.04em] text-[#c5d2e2]/72",
                fontSans,
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8b8cc]/70">
                {isKo ? "오리진 #1 · 핵심 갈증" : "Origin #1 · core thirst"}
              </span>
              <br />
              <span className="mt-1 inline-block font-serif text-[#e8eef5]/88">
                {isKo ? LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_KO : LUMINA_YOUNG_NICHE_ORIGIN1_PRIMARY_THIRST_EN}
              </span>
            </p>
            <p
              className={cn(
                "mt-4 border-l border-white/[0.1] pl-4 text-[12px] leading-[1.85] tracking-[0.04em] text-[#b8c8d8]/78",
                fontSans,
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8b8cc]/70">
                {isKo ? "품명(합의)" : "Flagship name (agreed)"}
              </span>
              <br />
              <span className="mt-1 inline-block font-serif text-[0.95rem] text-[#f0f4f8]/90">
                {isKo ? LUMINA_ORIGIN1_FLAGSHIP_NAME_KO : LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}
              </span>
            </p>
            <p
              className={cn(
                "mt-4 border-l border-[#6b8cae]/22 pl-4 text-[12px] leading-[1.85] tracking-[0.04em] text-[#b0c0d4]/76",
                fontSans,
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8b8cc]/70">
                {isKo ? "가격 철학(합의)" : "Pricing philosophy (agreed)"}
              </span>
              <br />
              <span className="mt-1 inline-block font-serif text-[0.9rem] text-[#e8eef5]/86">
                {isKo ? LUMINA_ORIGIN1_PRICE_PHILOSOPHY_KO : LUMINA_ORIGIN1_PRICE_PHILOSOPHY_EN}
              </span>
            </p>
            <p
              className={cn(
                "mt-4 border-l border-rose-gold/20 pl-4 text-[12px] leading-[1.85] tracking-[0.04em] text-[#c5d4e6]/74",
                fontSans,
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8b8cc]/70">
                {isKo ? "출시 CTA(합의)" : "Launch CTA (agreed)"}
              </span>
              <br />
              <span className="mt-1 inline-block font-serif text-[0.95rem] tracking-[0.06em] text-[#f4f7fb]/92">
                {isKo ? LUMINA_ORIGIN1_LAUNCH_CTA_LINE_KO : LUMINA_ORIGIN1_LAUNCH_CTA_LINE_EN}
              </span>
            </p>
            <div className="mt-6 max-w-xl border-t border-white/[0.08] pt-6">
              <p
                className={cn(
                  "mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a8b8cc]/75",
                  fontSans,
                )}
              >
                {isKo ? "프로젝트 #1" : "Project #1"} ·{" "}
                {isKo ? LUMINA_ORIGIN1_GRAND_SYNTHESIS_LEDGER_TITLE_KO : LUMINA_ORIGIN1_GRAND_SYNTHESIS_LEDGER_TITLE_EN}
              </p>
              <p
                className={cn(
                  "mb-4 font-serif text-[0.92rem] font-medium tracking-[0.04em] text-[#eef2f8]/88",
                  fontSerif,
                )}
              >
                Naked Truth · {isKo ? LUMINA_ORIGIN1_FLAGSHIP_NAME_KO : LUMINA_ORIGIN1_FLAGSHIP_NAME_EN}
              </p>
              <ul
                className={cn(
                  "list-none space-y-2.5 text-[12.5px] leading-[1.8] tracking-[0.04em] text-[#cad8e8]/74",
                  fontSans,
                )}
              >
                {(isKo ? LUMINA_ORIGIN1_GRAND_SYNTHESIS_ROWS_KO : LUMINA_ORIGIN1_GRAND_SYNTHESIS_ROWS_EN).map(
                  (row, i) => (
                    <li key={i} className="border-l border-white/[0.08] pl-3">
                      {row}
                    </li>
                  ),
                )}
              </ul>
              <p
                className={cn(
                  "mt-6 border-l border-rose-gold/22 pl-4 text-[12px] font-normal italic leading-[1.85] tracking-[0.04em] text-[#d0dde8]/78",
                  fontSerif,
                )}
              >
                <span className="not-italic font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8b8cc]/70">
                  {isKo ? "1호 회원 카드 · 첫 문장(기본안)" : "Member #1 card · default opening"}
                </span>
                <br />
                <span className="mt-2 inline-block not-italic text-[#f2f6fa]/90">
                  {isKo ? LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_KO : LUMINA_ORIGIN1_FIRST_MEMBER_CARD_OPENING_EN}
                </span>
              </p>
            </div>
          </motion.article>

          {/* 삼求 — 구소·구고·구기 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>三求</SilverGlow> — 구소 · 구고 · 구기
                </>
              ) : (
                <>
                  <SilverGlow>Sān qiú</SilverGlow> — smallness, truth&apos;s weight, self
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {TRINITY_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? TRINITY_CHARTER_GLOSS_KO : TRINITY_CHARTER_GLOSS_EN}
            </p>
            <div className="mt-8 max-w-xl space-y-4 border-t border-white/[0.08] pt-8">
              <p
                className={cn(
                  "mb-1 text-[10px] font-medium uppercase tracking-[0.26em] text-[#a8b8cc]/75",
                  fontSans,
                )}
              >
                {isKo ? "한 줄 해석 · 카드·히어로" : "One-line keys · card & hero"}
              </p>
              <ul
                className={cn(
                  "list-none space-y-3 text-[13px] leading-[1.85] tracking-[0.04em] text-[#dce4ee]/80",
                  fontSerif,
                )}
              >
                <li>
                  <span className="text-[#c5d4e6]/90">求小 · </span>
                  {isKo ? TRINITY_ONE_LINE_ORIGIN_GUSO_KO : TRINITY_ONE_LINE_ORIGIN_GUSO_EN}
                </li>
                <li>
                  <span className="text-[#c5d4e6]/90">求苦 · </span>
                  {isKo ? TRINITY_ONE_LINE_ORIGIN_GUGO_KO : TRINITY_ONE_LINE_ORIGIN_GUGO_EN}
                </li>
                <li>
                  <span className="text-[#c5d4e6]/90">求己 · </span>
                  {isKo ? TRINITY_ONE_LINE_ORIGIN_GUGI_KO : TRINITY_ONE_LINE_ORIGIN_GUGI_EN}
                </li>
              </ul>
              <p
                className={cn(
                  "border-l border-rose-gold/25 pl-4 text-[13px] font-medium leading-[1.9] tracking-[0.035em] text-[#eef3f8]/88",
                  fontSerif,
                )}
              >
                {isKo ? LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_KO : LUMINA_TRINITY_MASTER_SLOGAN_ORIGIN_EN}
              </p>
            </div>
          </motion.article>

          {/* 恩 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>恩</SilverGlow> — 은혜의 순서
                </>
              ) : (
                <>
                  <SilverGlow>Ēn</SilverGlow> — the order of gratitude
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {EN_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                EN_CHARTER_GLOSS_KO
              ) : (
                <>
                  Repay those who <em>raised</em> the work before those who only gave existence; the many before the
                  narrow clan; the future you owe before the rescue of the past; the milk before the state. Lumina reads
                  this as: partners, makers, and consumers who sustain the craft come before performative loyalty — still
                  without false claims or pressure selling.
                </>
              )}
            </p>
          </motion.article>

          {/* 心 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>心</SilverGlow> — 정심과 三正
                </>
              ) : (
                <>
                  <SilverGlow>Xīn</SilverGlow> — right mind, three rectifications
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {XIN_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                XIN_CHARTER_GLOSS_KO
              ) : (
                <>
                  The market mirrors intent: hollow copy invites doubt; honest positioning invites trust. Order the work:
                  clarify purpose first, then systems and craft, then what the customer sees. Environment and mind shape
                  each other — keep claims, tone, and visuals aligned. Lumina does not treat karma or timing as advertising
                  facts.
                </>
              )}
            </p>
          </motion.article>

          {/* 没 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>没</SilverGlow> — 상대·중도·無
                </>
              ) : (
                <>
                  <SilverGlow>Méi</SilverGlow> — relativity, middle way, void
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {MEI_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                MEI_CHARTER_GLOSS_KO
              ) : (
                <>
                  Names like high, beauty, or salvation lean on their paired lows. The middle way refuses to trap the
                  audience in a single pole. In product language: balance truth and restraint; let whitespace and the
                  object speak. Lumina does not use paradox to misstate what a product is or does.
                </>
              )}
            </p>
          </motion.article>

          {/* 爱 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>爱</SilverGlow> — 헌신과 브랜드 우선
                </>
              ) : (
                <>
                  <SilverGlow>Ài</SilverGlow> — devotion, brand first
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {LOVE_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                LOVE_CHARTER_GLOSS_KO
              ) : (
                <>
                  Poetic reversal: choose the hard truths the market ignores — not as cruelty, but as fidelity. In
                  service: lift the client brand, quiet the platform ego. The closing refrain is diligence on every job,
                  not manipulation. Lumina never turns these lines into hate, death-wish, or slur.
                </>
              )}
            </p>
          </motion.article>

          {/* 禅 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>禅</SilverGlow> — 평상심이 곧 도
                </>
              ) : (
                <>
                  <SilverGlow>Chán</SilverGlow> — ordinary mind is the way
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {ZEN_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                ZEN_CHARTER_GLOSS_KO
              ) : (
                <>
                  Zen is not only sitting; one-pointed work in imperfect conditions still counts. Ordinary mind: eat when
                  eating, work when working — full presence per step. “Dust” is clutter in copy; sweep it so the product
                  shows. Lumina does not sell meditation as medicine.
                </>
              )}
            </p>
          </motion.article>

          {/* 赌 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>赌</SilverGlow> — 끝과 그늘에 건 확신
                </>
              ) : (
                <>
                  <SilverGlow>Dǔ</SilverGlow> — conviction at the end and in the shadow
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {DU_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                DU_CHARTER_GLOSS_KO
              ) : (
                <>
                  Here <strong>Dǔ</strong> is not gambling or harm — it is how Lumina reads your lines: stake the work on
                  small verifiable facts, long-term trust and exit with dignity, honest limits (the &quot;shadow&quot;),
                  and sustained essence over flash. The fade to <strong>无</strong> is clarity after stripping greed from
                  the copy. No casino pitches, no death-wish or hate incitement.
                </>
              )}
            </p>
          </motion.article>

          {/* 名 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>名</SilverGlow> — 허명을 거부하고 실체로 선다
                </>
              ) : (
                <>
                  <SilverGlow>Míng</SilverGlow> — refuse hollow fame; stand on substance
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {MING_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                MING_CHARTER_GLOSS_KO
              ) : (
                <>
                  <strong>Míng</strong> here is not anti-branding in the legal sense — it refuses <strong>empty fame</strong>{" "}
                  and platform ego so the client&apos;s product stays in front. The fade to <strong>无</strong> is clarity and
                  space, not an excuse to drop mandatory labels or deceive. Lumina does not hide required facts behind
                  &quot;namelessness.&quot;
                </>
              )}
            </p>
          </motion.article>

          {/* 贪 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>贪</SilverGlow> — 실제를 탐하고 말은 책임질 것만
                </>
              ) : (
                <>
                  <SilverGlow>Tān</SilverGlow> — seek the real; answer for what you say
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 max-h-[min(70vh,36rem)] overflow-y-auto whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {TAN_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                TAN_CHARTER_GLOSS_KO
              ) : (
                <>
                  Poetic <strong>Tān</strong> inverts appetites toward substance, limits, and consequence — not toward
                  cruelty. Lumina uses it for fraud resistance, fact-first copy, and regulatory humility. The
                  harsher spiritual imagery in the scroll stays archival; outputs must not threaten, damn, or label people
                  as villains.
                </>
              )}
            </p>
          </motion.article>

          {/* 囍 헌장 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>囍</SilverGlow> — 들뜸을 쫓지 않는 不喜
                </>
              ) : (
                <>
                  <SilverGlow>Shuāngxǐ</SilverGlow> — equanimity beyond hype
                </>
              )}
            </h3>
            <pre
              className={cn(
                "mb-5 whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.85] tracking-[0.02em] text-[#d8e4f2]/88 sm:text-[13px]",
                fontSerif,
              )}
            >
              {SHUANGXI_CANONICAL_LINES.join("\n")}
            </pre>
            <p
              className={cn(
                "text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? (
                SHUANGXI_CHARTER_GLOSS_KO
              ) : (
                <>
                  The paradox is not cruelty — it is not chasing the market&apos;s mood. Lumina avoids manic hype and
                  emotional bait, without mocking real pain or failure. 不喜 means a steady, factual hand.
                </>
              )}
            </p>
          </motion.article>

          {/* 창시자 결정: 지능 우선 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>{LUMINA_INTELLIGENCE_PRIORITY_HEADLINE_KO}</SilverGlow> — 마음이 먼저
                </>
              ) : (
                <>
                  <SilverGlow>{LUMINA_INTELLIGENCE_PRIORITY_HEADLINE_EN}</SilverGlow> — mind before machine
                </>
              )}
            </h3>
            <p
              className={cn(
                "mb-6 text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? LUMINA_INTELLIGENCE_PRIORITY_BODY_KO : LUMINA_INTELLIGENCE_PRIORITY_BODY_EN}
            </p>
            <p
              className={cn(
                "mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#C0C0C0]/55",
                fontSans,
              )}
            >
              {isKo ? "월요일 · 온보딩 체크" : "Monday handoff · onboarding"}
            </p>
            <pre
              className={cn(
                "whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.9] tracking-[0.02em] text-[#d8e4f2]/85 sm:text-[13px]",
                fontSans,
              )}
            >
              {isKo ? LUMINA_INTELLIGENCE_HANDOFF_CHECKLIST_KO : LUMINA_INTELLIGENCE_HANDOFF_CHECKLIST_EN}
            </pre>
          </motion.article>

          {/* 창시자 결정: 진실의 창 · Genesis 서사 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>{LUMINA_NARRATIVE_SPEAR_HEADLINE_KO}</SilverGlow> — Genesis 서사
                </>
              ) : (
                <>
                  <SilverGlow>{LUMINA_NARRATIVE_SPEAR_HEADLINE_EN}</SilverGlow> — Genesis storytelling
                </>
              )}
            </h3>
            <p
              className={cn(
                "mb-6 text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? LUMINA_NARRATIVE_SPEAR_BODY_KO : LUMINA_NARRATIVE_SPEAR_BODY_EN}
            </p>
            <pre
              className={cn(
                "whitespace-pre-wrap break-words rounded-none border border-white/[0.12] bg-black/25 px-4 py-3 text-[12px] leading-[1.9] tracking-[0.02em] text-[#d8e4f2]/85 sm:text-[13px]",
                fontSans,
              )}
            >
              {isKo
                ? `Genesis · 플래그십 ${LUMINA_GENESIS_FLAGSHIP_SLOT_COUNT}슬롯\n서버 환경 변수 LUMINA_FLAGSHIP_BRAND_NAMES (쉼표 또는 | 구분)에 브랜드명을 넣으면 분석·다듬기 프롬프트에 시드로 붙습니다.\n비활성: LUMINA_NARRATIVE_SPEAR_CHARTER=0`
                : `Genesis · ${LUMINA_GENESIS_FLAGSHIP_SLOT_COUNT} flagship slots\nSet server env LUMINA_FLAGSHIP_BRAND_NAMES (comma or |) to inject seed names into analysis/refine prompts.\nDisable: LUMINA_NARRATIVE_SPEAR_CHARTER=0`}
            </pre>
          </motion.article>

          {/* 맨 용기 + 정갈한 카드 */}
          <motion.article variants={item}>
            <h3
              className={cn(
                "mb-5 text-[1.08rem] font-semibold leading-snug tracking-[0.06em] text-[#f0f4f8]/90 sm:text-[1.15rem] md:text-[1.22rem]",
                fontSerif,
              )}
            >
              {isKo ? (
                <>
                  <SilverGlow>{NAKED_VESSEL_CARD_HEADLINE_KO}</SilverGlow>
                </>
              ) : (
                <>
                  <SilverGlow>{NAKED_VESSEL_CARD_HEADLINE_EN}</SilverGlow>
                </>
              )}
            </h3>
            <p
              className={cn(
                "mb-6 text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/78 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? NAKED_VESSEL_CARD_GLOSS_KO : NAKED_VESSEL_CARD_GLOSS_EN}
            </p>
            <p
              className={cn(
                "mb-5 text-[15px] font-normal leading-[2.15] tracking-[0.04em] text-[#e8eef5]/80 sm:text-[1.02rem] sm:leading-[2.25] md:tracking-[0.045em]",
                fontSans,
              )}
            >
              {isKo ? CARD_STOCK_CHOICE_PRINCIPLE_KO : CARD_STOCK_CHOICE_PRINCIPLE_EN}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className={cn(
                  "rounded-none border border-white/[0.12] bg-black/20 px-4 py-3 text-[13px] leading-[1.85] text-[#d8e4f2]/85 sm:text-[14px]",
                  fontSans,
                )}
              >
                <p className={cn("mb-2 font-semibold text-[#f0f4f8]/90", fontSerif)}>
                  {isKo ? CARD_STOCK_EARTHY_TITLE_KO : CARD_STOCK_EARTHY_TITLE_EN}
                </p>
                <p>{isKo ? CARD_STOCK_EARTHY_HINT_KO : CARD_STOCK_EARTHY_HINT_EN}</p>
              </div>
              <div
                className={cn(
                  "rounded-none border border-white/[0.12] bg-black/20 px-4 py-3 text-[13px] leading-[1.85] text-[#d8e4f2]/85 sm:text-[14px]",
                  fontSans,
                )}
              >
                <p className={cn("mb-2 font-semibold text-[#f0f4f8]/90", fontSerif)}>
                  {isKo ? CARD_STOCK_REFINED_TITLE_KO : CARD_STOCK_REFINED_TITLE_EN}
                </p>
                <p>{isKo ? CARD_STOCK_REFINED_HINT_KO : CARD_STOCK_REFINED_HINT_EN}</p>
              </div>
            </div>
          </motion.article>

          {/* 신의(信義) — 창시자 헌사 */}
          <motion.article
            variants={item}
            className="border-t border-white/[0.08] pt-14 md:pt-16"
          >
            <p
              className={cn(
                "mb-3 font-mono text-[9px] uppercase tracking-[0.38em] text-[#C0C0C0]/50",
                fontSans,
              )}
            >
              {isKo ? "Trust covenant · 信義" : "Trust covenant · 信義"}
            </p>
            <p
              className={cn(
                "max-w-[min(40rem,88vw)] text-[14px] font-normal leading-[2.05] tracking-[0.04em] text-[#e8eef5]/72 sm:text-[15px] sm:leading-[2.2]",
                fontSerif,
              )}
            >
              {isKo ? LUMINA_TRUST_COVENANT_KO : LUMINA_TRUST_COVENANT_EN}
            </p>
          </motion.article>

          {/* 오늘의 마지막 글 — 창시자 에필로그 */}
          <motion.article variants={item} className="pt-10 md:pt-12">
            <p
              className={cn(
                "mb-3 font-mono text-[9px] uppercase tracking-[0.38em] text-[#C0C0C0]/45",
                fontSans,
              )}
            >
              {isKo ? LUMINA_FOUNDER_EPILOGUE_TITLE_KO : LUMINA_FOUNDER_EPILOGUE_TITLE_EN}
            </p>
            <p
              className={cn(
                "max-w-[min(40rem,88vw)] text-[14px] font-normal leading-[2.1] tracking-[0.04em] text-[#e8eef5]/68 sm:text-[15px] sm:leading-[2.25]",
                fontSerif,
              )}
            >
              {isKo ? LUMINA_FOUNDER_EPILOGUE_BODY_KO : LUMINA_FOUNDER_EPILOGUE_BODY_EN}
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
