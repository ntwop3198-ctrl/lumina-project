"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Gem, Menu, Sparkles, X } from "lucide-react"
import { useCallback, useState } from "react"
import { scrollToIdWithHeaderOffset } from "@/lib/landing/scroll-with-header-offset"
import { cn } from "@/lib/utils"
import {
  SoulPathHeaderSwitcher,
  useBrandSoulChoice,
} from "@/components/providers/brand-soul-choice-provider"
import { useConvictionAtmosphere } from "@/components/providers/conviction-atmosphere-provider"
import { useLuminaLanguage } from "@/components/providers/language-provider"

const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const fontSerif = "font-['Nanum_Myeongjo','Cormorant_Garamond',var(--font-serif),Georgia,serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

const hubItemsRow1 = [
  {
    titleKo: "브랜드 제네시스",
    titleEn: "Brand Genesis",
    descKo: "신규 창업·리브랜딩 시작점",
    descEn: "Starting point for launch and rebrand",
    href: "/brand-genesis",
    badge: "START",
  },
  {
    titleKo: "런칭 패키지",
    titleEn: "Launch Package",
    descKo: "기획·카피·비주얼 일괄 구성",
    descEn: "All-in-one launch orchestration",
    href: "#agent-dynamic",
  },
  {
    titleKo: "쇼케이스",
    titleEn: "Showcase",
    descKo: "실시간 AI 분석 데모",
    descEn: "Live AI analysis demo",
    href: "#agent-dynamic",
  },
  {
    titleKo: "브랜드 빌더",
    titleEn: "Brand Builder",
    descKo: "AI 기반 사이트 제작/운영",
    descEn: "AI-powered site building",
    href: "/brand-builder",
  },
  {
    titleKo: "마케팅 에이전트",
    titleEn: "Marketing Agent",
    descKo: "퍼널·콘텐츠·성장 자동화",
    descEn: "Funnel and growth automation",
    href: "/marketing-agent",
    badge: "NEW",
  },
]

const hubItemsRow2 = [
  {
    titleKo: "루미나 샌드박스",
    titleEn: "Lumina Sandbox",
    descKo: "빠른 실험과 콘셉트 테스트",
    descEn: "Rapid experiments and concept tests",
    href: "/lumina-sandbox",
  },
  {
    titleKo: "보석함",
    titleEn: "Vault",
    descKo: "성과 사례 및 레퍼런스",
    descEn: "Curated outcomes and references",
    href: "/dashboard",
  },
]

export type GlobalHeaderVariant = "luxury" | "midnight"

export function GlobalHeaderBilingual({ variant = "luxury" }: { variant?: GlobalHeaderVariant }) {
  const pathname = usePathname()
  const router = useRouter()
  const { lang, setLang } = useLuminaLanguage()
  const { unveilMorning } = useConvictionAtmosphere()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hubOpen, setHubOpen] = useState(false)
  const isKo = lang === "ko"
  const headerLogin = lang === "ko" ? "로그인" : lang === "zh" ? "登录" : "Log In"
  const headerStart = lang === "ko" ? "시작하기" : lang === "zh" ? "开始" : "Get Started"
  const isMidnight = variant === "midnight"
  const focusRing = cn(
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isMidnight
      ? "focus-visible:ring-[#C0C0C0]/50 focus-visible:ring-offset-[#112240]"
      : "focus-visible:ring-[#D4AF37]/45 focus-visible:ring-offset-[#111111]",
  )
  const { isConventional } = useBrandSoulChoice()

  const navigateToHash = useCallback(
    (href: string, options?: { onBeforeScroll?: () => void }) => {
      if (!href.startsWith("#")) return
      const id = href.slice(1)
      options?.onBeforeScroll?.()
      if (pathname === "/") {
        scrollToIdWithHeaderOffset(id)
        window.history.replaceState(null, "", `#${id}`)
      } else {
        router.push(`/#${id}`, { scroll: false })
      }
    },
    [pathname, router],
  )
  const navItems = isMidnight
    ? [
        { labelKo: "히어로", labelEn: "Hero", href: "#hero" },
        { labelKo: "핵심 가치", labelEn: "Value", href: "#value" },
        { labelKo: "신뢰", labelEn: "Trust", href: "#trust" },
        { labelKo: "최종 CTA", labelEn: "Final CTA", href: "#final-cta" },
        { labelKo: "스토리", labelEn: "Story", href: "#brand-story" },
        { labelKo: "블로그", labelEn: "Blog", href: "/blog" },
        { labelKo: "파트너", labelEn: "Partner", href: "/partner-guide" },
      ]
    : [
        { labelKo: "서비스 소개", labelEn: "Overview", href: "#service-intro" },
        { labelKo: "특화 에이전트", labelEn: "Agents", href: "#agent-dynamic", key: "agents" },
        { labelKo: "요금제", labelEn: "Pricing", href: "/pricing" },
        { labelKo: "블로그", labelEn: "Blog", href: "/blog" },
        { labelKo: "견적 문의", labelEn: "Quote", href: "/pricing" },
      ]

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] backdrop-blur-[12px]",
        isMidnight ? "bg-[#112240]/72" : "bg-[#111111]/55",
        isMidnight &&
          isConventional &&
          "border-[#c084fc]/25 shadow-[0_0_32px_rgba(168,85,247,0.12)]",
      )}
      onMouseLeave={() => setHubOpen(false)}
    >
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:h-[4.5rem] sm:px-8 md:px-10 lg:px-12">
        <Link href="/" className={cn("inline-flex items-center gap-2.5 rounded-sm", focusRing)}>
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br",
              isMidnight ? "from-[#e8eef5] to-[#5c6570] lumina-dew-logo-mark" : "from-[#D4AF37] to-[#8f6d29]",
            )}
          >
            <Gem className={cn("h-4 w-4", isMidnight ? "text-[#0a1628]" : "text-black")} />
          </span>
          <span
            className={cn(
              "inline-block text-sm tracking-[0.24em] antialiased [text-rendering:optimizeLegibility]",
              fontSerif,
              isMidnight
                ? "font-bold text-[#FFFFFF] [text-shadow:0_0_14px_rgba(255,255,255,0.22),0_0_3px_rgba(255,255,255,0.5),0_1px_3px_rgba(0,0,0,0.45)]"
                : "bg-gradient-to-r from-[#6b5c2e] via-[#c6a03a] to-[#f3e9c8] bg-clip-text text-transparent font-semibold",
            )}
          >
            LUMINA
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-6 lg:flex">
          <nav className="flex items-center gap-6">
            <button
              type="button"
              onMouseEnter={() => setHubOpen(true)}
              onFocus={() => setHubOpen(true)}
              onClick={() => {
                if (isMidnight) {
                  navigateToHash("#value")
                } else {
                  navigateToHash("#service-intro")
                }
              }}
              className={cn(
                "group relative rounded-sm px-0.5 text-[14px] font-medium transition-colors hover:text-white",
                fontBody,
                isMidnight ? "text-[#e4eaf2]" : "text-white/82",
                focusRing,
              )}
            >
              {isKo ? "서비스 허브" : "Service Hub"}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-transparent to-transparent opacity-90 transition-transform duration-300 group-hover:scale-x-100",
                  isMidnight ? "via-[#C0C0C0]" : "via-[#D4AF37]",
                )}
              />
            </button>
            {navItems.map((item) => (
              <Link
                key={item.href + item.labelKo}
                href={item.href}
                scroll={item.href.startsWith("#") ? false : undefined}
                onClick={(e) => {
                  if (!item.href.startsWith("#")) return
                  e.preventDefault()
                  navigateToHash(item.href, {
                    onBeforeScroll: () => {
                      if (isMidnight && item.href === "#final-cta") unveilMorning()
                    },
                  })
                }}
                className={cn(
                  "group relative rounded-sm px-0.5 text-[14px] font-medium transition-colors hover:text-white",
                  fontBody,
                  isMidnight ? "text-[#e4eaf2]" : "text-white/82",
                  focusRing,
                )}
              >
                {isKo ? item.labelKo : item.labelEn}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-transparent to-transparent opacity-90 transition-transform duration-300 group-hover:scale-x-100",
                    isMidnight ? "via-[#C0C0C0]" : "via-[#D4AF37]",
                  )}
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-5 sm:gap-7 lg:flex">
          {isMidnight ? <SoulPathHeaderSwitcher /> : null}
          <div
            className={cn(
              "text-[13px] font-semibold tracking-[0.12em] antialiased [text-rendering:optimizeLegibility] sm:text-sm sm:tracking-[0.14em]",
              fontBody,
            )}
          >
            <button
              type="button"
              onClick={() => setLang("ko")}
              className={cn(
                "rounded-sm px-0.5 transition-colors",
                lang === "ko"
                  ? isMidnight
                    ? "text-[#e8ecf2]"
                    : "text-[#D4AF37]"
                  : "text-white/52 hover:text-white/72",
                focusRing,
              )}
            >
              KO
            </button>
            <span className="mx-1.5 text-white/40">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={cn(
                "rounded-sm px-0.5 transition-colors",
                lang === "en"
                  ? isMidnight
                    ? "text-[#e8ecf2]"
                    : "text-[#D4AF37]"
                  : "text-white/52 hover:text-white/72",
                focusRing,
              )}
            >
              EN
            </button>
            <span className="mx-1.5 text-white/40">|</span>
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={cn(
                "rounded-sm px-0.5 transition-colors",
                lang === "zh"
                  ? isMidnight
                    ? "text-[#e8ecf2]"
                    : "text-[#D4AF37]"
                  : "text-white/52 hover:text-white/72",
                focusRing,
              )}
            >
              ZH
            </button>
          </div>

          <Link
            href="/auth/login"
            className={cn(
              "rounded-sm px-1 text-sm font-semibold text-white/92 antialiased [text-rendering:optimizeLegibility] transition-colors hover:text-white",
              fontBody,
              focusRing,
            )}
          >
            {headerLogin}
          </Link>

          <Link
            href="/auth/signup"
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold antialiased [text-rendering:optimizeLegibility] transition-all",
              fontBody,
              isMidnight
                ? "border-[#C0C0C0]/65 text-[#d8dce4] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#C0C0C0]/12 hover:text-white"
                : "border-[#D4AF37]/65 text-[#D4AF37] hover:bg-[#D4AF37]/12",
              focusRing,
            )}
          >
            {headerStart}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/80 lg:hidden",
            focusRing,
          )}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {hubOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.985, y: -6, filter: "blur(8px)" }}
            transition={{ duration: 0.24, ease: easeLux }}
            className={cn(
              "hidden border-t border-white/[0.08] backdrop-blur-[15px] lg:block",
              isMidnight ? "bg-[#112240]/88" : "bg-[#181818]/75",
            )}
            onMouseEnter={() => setHubOpen(true)}
          >
            <div className="mx-auto max-w-7xl px-10 py-5">
              <div className="grid grid-cols-5 gap-3">
                {hubItemsRow1.map((item) => (
                  <Link
                    key={item.titleKo}
                    href={item.href}
                    className={cn(
                      "group border bg-white/[0.01] p-4 transition-all duration-300",
                      isMidnight
                        ? "rounded-none border-white/[0.12] hover:border-[#C0C0C0]/40"
                        : "rounded-xl border-white/[0.08] hover:border-[#D4AF37]/45 hover:shadow-[0_0_24px_rgba(212,175,55,0.15)]",
                    )}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <p className={cn("text-[13px] font-medium text-white/90", fontBody)}>
                        {isKo ? item.titleKo : item.titleEn}
                      </p>
                      {item.badge ? (
                        <span
                          className={cn(
                            "rounded-full border px-1.5 py-0.5 text-[9px] tracking-[0.08em]",
                            isMidnight
                              ? "border-[#C0C0C0]/35 text-[#C0C0C0]"
                              : "border-[#D4AF37]/35 text-[#D4AF37]",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className={cn("text-[11px] leading-[1.6] text-white/45", fontBody)}>
                      {isKo ? item.descKo : item.descEn}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mx-auto mt-3 grid max-w-[520px] grid-cols-2 gap-3">
                {hubItemsRow2.map((item) => (
                  <Link
                    key={item.titleKo}
                    href={item.href}
                    className={cn(
                      "group border bg-white/[0.01] p-4 text-center transition-all duration-300",
                      isMidnight
                        ? "rounded-none border-white/[0.12] hover:border-[#C0C0C0]/40"
                        : "rounded-xl border-white/[0.08] hover:border-[#D4AF37]/45 hover:shadow-[0_0_24px_rgba(212,175,55,0.14)]",
                    )}
                  >
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                      <Sparkles
                        className={cn(
                          "h-3.5 w-3.5",
                          isMidnight ? "text-[#C0C0C0]/75" : "text-[#D4AF37]/75",
                        )}
                      />
                      <p className={cn("text-[13px] font-medium text-white/90", fontBody)}>
                        {isKo ? item.titleKo : item.titleEn}
                      </p>
                    </div>
                    <p className={cn("text-[11px] leading-[1.6] text-white/45", fontBody)}>
                      {isKo ? item.descKo : item.descEn}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {mobileOpen ? (
        <div
          className={cn(
            "border-t border-white/10 px-6 pb-6 pt-4 backdrop-blur-xl lg:hidden",
            isMidnight ? "bg-[#112240]/95" : "bg-[#111111]/95",
          )}
        >
          <nav className="space-y-3">
            <button
              type="button"
              onClick={() => {
                if (isMidnight) {
                  navigateToHash("#value")
                } else {
                  navigateToHash("#service-intro")
                }
                setMobileOpen(false)
              }}
              className={cn(
                "block text-[15px] font-medium",
                fontBody,
                isMidnight ? "text-[#e8eef5]" : "text-white/85",
              )}
            >
              {isKo ? "서비스 허브" : "Service Hub"}
            </button>
            {navItems.map((item) => (
              <Link
                key={`m-${item.href}-${item.labelKo}`}
                href={item.href}
                scroll={item.href.startsWith("#") ? false : undefined}
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault()
                    navigateToHash(item.href, {
                      onBeforeScroll: () => {
                        if (isMidnight && item.href === "#final-cta") unveilMorning()
                      },
                    })
                  }
                  setMobileOpen(false)
                }}
                className={cn(
                  "block text-[15px] font-medium",
                  fontBody,
                  isMidnight ? "text-[#e8eef5]" : "text-white/85",
                )}
              >
                {isKo ? item.labelKo : item.labelEn}
              </Link>
            ))}
          </nav>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div
              className={cn(
                "mb-4 text-[13px] font-semibold tracking-[0.12em] antialiased [text-rendering:optimizeLegibility] sm:text-sm",
                fontBody,
              )}
            >
              <button
                type="button"
                onClick={() => setLang("ko")}
                className={cn(
                  "transition-colors",
                  lang === "ko"
                    ? isMidnight
                      ? "text-[#e8ecf2]"
                      : "text-[#D4AF37]"
                    : "text-white/52 hover:text-white/72",
                )}
              >
                KO
              </button>
              <span className="mx-1.5 text-white/40">|</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "transition-colors",
                  lang === "en"
                    ? isMidnight
                      ? "text-[#e8ecf2]"
                      : "text-[#D4AF37]"
                    : "text-white/52 hover:text-white/72",
                )}
              >
                EN
              </button>
              <span className="mx-1.5 text-white/40">|</span>
              <button
                type="button"
                onClick={() => setLang("zh")}
                className={cn(
                  "transition-colors",
                  lang === "zh"
                    ? isMidnight
                      ? "text-[#e8ecf2]"
                      : "text-[#D4AF37]"
                    : "text-white/52 hover:text-white/72",
                )}
              >
                ZH
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-semibold text-white/92 antialiased [text-rendering:optimizeLegibility] transition-colors hover:text-white",
                  fontBody,
                )}
              >
                {headerLogin}
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold antialiased [text-rendering:optimizeLegibility] transition-all",
                  fontBody,
                  isMidnight
                    ? "border-[#C0C0C0]/65 text-[#d8dce4] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#C0C0C0]/12 hover:text-white"
                    : "border-[#D4AF37]/65 text-[#D4AF37] hover:bg-[#D4AF37]/12",
                )}
              >
                {headerStart}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

