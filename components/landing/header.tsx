"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  LayoutGrid,
  Menu,
  Search,
  Sparkles,
  Star,
  Upload,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { IndustrySwitcher } from "@/components/landing/industry-switcher"
import { cn } from "@/lib/utils"

type GenesisChild = {
  label: string
  href: string
  sublabel: string
  icon: "search" | "sparkles"
}

type NavItem = {
  label: string
  href: string
  subtitle: string
  /** 신규 기능 */
  isNew?: boolean
  /** 0 to 1 시작점 강조 */
  isStart?: boolean
  /** 브랜드 제네시스 하위 (데스크톱 호버 메뉴) */
  children?: GenesisChild[]
}

const topNavItems: { label: string; href: string }[] = [
  { label: "서비스 허브", href: "#service-hub" },
  { label: "스토리", href: "#stories" },
  { label: "전문성", href: "#expertise" },
  { label: "기능", href: "#features" },
]

const serviceNavItems: NavItem[] = [
  {
    label: "브랜드 제네시스",
    href: "/brand-genesis",
    subtitle: "신규 창업·기존 브랜드 고도화, 0 to 1 & 리프레시",
    isStart: true,
    children: [
      {
        label: "브랜드 진단",
        href: "/brand-diagnosis",
        sublabel: "점수·취약점 분석",
        icon: "search",
      },
      {
        label: "가치 재창조",
        href: "/brand-recreation",
        sublabel: "AI 가치 재설계",
        icon: "sparkles",
      },
    ],
  },
  {
    label: "런칭 패키지",
    href: "#launch-bundle",
    subtitle: "분석·제작·마케팅 올인원 스타터",
  },
  {
    label: "쇼케이스",
    href: "#showcase",
    subtitle: "실시간 AI 브랜드 분석 결과",
  },
  {
    label: "브랜드 빌더",
    href: "/brand-builder",
    subtitle: "AI 기반 사이트 제작 및 관리",
  },
  {
    label: "마케팅 에이전트",
    href: "/marketing-agent",
    subtitle: "맞춤형 마케팅 전략 및 실행안",
    isNew: true,
  },
  {
    label: "루미나 샌드박스",
    href: "/lumina-sandbox",
    subtitle: "가상 창업 시뮬레이션 및 리스크 진단",
  },
  {
    label: "보석함",
    href: "/dashboard",
    subtitle: "프로젝트 및 분석 데이터 보관함",
  },
]
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060605]"

function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.href.startsWith("#")) return false
  if (pathname === item.href) return true
  if (item.children?.some((c) => pathname === c.href)) return true
  return false
}

function scrollToUpload() {
  const el = document.getElementById("upload")
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  else window.location.href = "/#upload"
}

function TopNavLink({
  item,
  onNavigate,
  stacked,
}: {
  item: { label: string; href: string }
  onNavigate?: () => void
  stacked?: boolean
}) {
  const pathname = usePathname()
  const isHash = item.href.startsWith("#")
  const isActive = !isHash && pathname === item.href

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "relative text-[13px] font-medium tracking-wide transition-colors",
        !stacked &&
          "whitespace-nowrap after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold/80 after:transition-transform hover:after:scale-x-100",
        stacked &&
          "block w-full rounded-lg px-2 py-2.5 hover:bg-white/[0.06]",
        isActive ? "text-gold" : "text-white/72 hover:text-white",
        focusRing,
      )}
    >
      {item.label}
    </Link>
  )
}

function ServiceNavLink({
  item,
  onNavigate,
  compact = false,
  align = "center",
}: {
  item: NavItem
  onNavigate?: () => void
  compact?: boolean
  align?: "center" | "start"
}) {
  const pathname = usePathname()
  const isActive = isNavItemActive(pathname ?? "", item)

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex flex-col gap-0.5 rounded-xl transition-all duration-200",
        align === "center" && "items-center text-center",
        align === "start" && "w-full items-start text-left hover:bg-white/[0.05]",
        compact
          ? "min-w-[6rem] shrink-0 snap-start px-2.5 py-2"
          : align === "start"
            ? "px-2 py-2.5"
            : "px-3 py-2.5 md:px-4 md:py-3",
        "hover:bg-white/[0.06] focus-visible:bg-white/[0.06]",
        focusRing,
        isActive && "bg-white/[0.05]",
      )}
    >
      <span
        className={cn(
          "flex items-baseline gap-1.5",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {item.isStart ? (
          <Star
            className={cn(
              "h-3 w-3 shrink-0 fill-gold/25 stroke-gold/90 stroke-[1.25]",
              isActive && "fill-gold/35",
            )}
            aria-hidden
          />
        ) : null}
        <span
          className={cn(
            "text-[12px] font-bold tracking-wide leading-tight transition-colors md:text-[13px]",
            isActive
              ? "text-gold group-hover:text-[#e8c76a]"
              : "text-white/90 group-hover:text-white",
          )}
        >
          {item.label}
        </span>
        {item.isStart ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded border px-[4px] py-px text-[6.5px] font-bold uppercase leading-none tracking-[0.14em]",
              isActive
                ? "border-gold/50 bg-gold/15 text-gold"
                : "border-gold/25 bg-gold/[0.08] text-gold/80 group-hover:border-gold/40 group-hover:text-gold",
            )}
            aria-label="시작"
          >
            START
          </span>
        ) : null}
        {item.isNew && !item.isStart ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded border px-[3px] py-px text-[6px] font-semibold uppercase leading-none tracking-[0.16em]",
              isActive
                ? "border-gold/40 bg-gold/12 text-gold/95"
                : "border-white/18 bg-white/[0.05] text-white/45 group-hover:border-gold/30 group-hover:text-gold/85",
            )}
            aria-label="신규"
          >
            NEW
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "leading-snug font-normal transition-colors",
          align === "start" ? "max-w-none pr-2" : "max-w-[11rem] lg:max-w-[12rem]",
          "text-[8.5px] text-white/60 group-hover:text-white/68 md:text-[9.5px]",
          isActive && "text-gold/60 group-hover:text-gold/70",
        )}
      >
        {item.subtitle}
      </span>
    </Link>
  )
}

function GenesisMobileSubLinks({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate?: () => void
}) {
  if (!item.children?.length) return null
  return (
    <div className="mb-1 ml-1.5 mt-0.5 space-y-0.5 border-l border-white/[0.09] pl-3">
      {item.children.map((c) => {
        const Icon = c.icon === "search" ? Search : Sparkles
        return (
          <Link
            key={c.href}
            href={c.href}
            onClick={onNavigate}
            className={cn(
              "flex gap-2.5 rounded-lg py-2 pr-2 text-left transition-colors hover:bg-white/[0.05]",
              focusRing,
            )}
          >
            <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-white/88">{c.label}</div>
              <div className="text-[9px] leading-snug text-white/45">{c.sublabel}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function GenesisDesktopNavItem({ item }: { item: NavItem & { children: GenesisChild[] } }) {
  const pathname = usePathname()
  const isActive = isNavItemActive(pathname ?? "", item)

  return (
    <div className="group/genesis relative">
      <Link
        href={item.href}
        className={cn(
          "group/trigger flex flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 text-center transition-all duration-200 md:px-4 md:py-3",
          "hover:bg-white/[0.06] focus-visible:bg-white/[0.06]",
          focusRing,
          isActive && "bg-white/[0.05]",
        )}
      >
        <span className="flex items-baseline justify-center gap-1">
          <Star
            className={cn(
              "h-3 w-3 shrink-0 fill-gold/25 stroke-gold/90 stroke-[1.25]",
              isActive && "fill-gold/35",
            )}
            aria-hidden
          />
          <span
            className={cn(
              "text-[12px] font-bold tracking-wide leading-tight md:text-[13px]",
              isActive
                ? "text-gold group-hover/trigger:text-[#e8c76a]"
                : "text-white/90 group-hover/trigger:text-white",
            )}
          >
            {item.label}
          </span>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded border px-[4px] py-px text-[6.5px] font-bold uppercase leading-none tracking-[0.14em]",
              isActive
                ? "border-gold/50 bg-gold/15 text-gold"
                : "border-gold/25 bg-gold/[0.08] text-gold/80 group-hover/trigger:border-gold/40 group-hover/trigger:text-gold",
            )}
            aria-label="시작"
          >
            START
          </span>
          <ChevronDown
            className="h-3 w-3 shrink-0 text-white/35 transition-colors group-hover/genesis:text-white/55"
            strokeWidth={2}
            aria-hidden
          />
        </span>
        <span
          className={cn(
            "max-w-[11rem] text-[8.5px] leading-snug text-white/60 group-hover/trigger:text-white/68 md:max-w-[12rem] md:text-[9.5px]",
            isActive && "text-gold/60 group-hover/trigger:text-gold/70",
          )}
        >
          {item.subtitle}
        </span>
      </Link>

      <div
        className="pointer-events-none absolute left-1/2 top-[calc(100%-4px)] z-[60] w-[15.5rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-1 opacity-0 transition-opacity duration-200 group-hover/genesis:pointer-events-auto group-hover/genesis:opacity-100 group-focus-within/genesis:pointer-events-auto group-focus-within/genesis:opacity-100"
        role="menu"
        aria-label="브랜드 제네시스 하위 메뉴"
      >
        <div className="rounded-xl border border-white/12 bg-black/78 py-1 shadow-[0_20px_56px_rgba(0,0,0,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-black/65">
          {item.children.map((child) => {
            const Icon = child.icon === "search" ? Search : Sparkles
            const childActive = pathname === child.href
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className={cn(
                  "mx-1 flex gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.08]",
                  focusRing,
                  childActive && "bg-white/[0.06]",
                )}
              >
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/75" strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold leading-tight tracking-wide text-white/92">
                    {child.label}
                  </div>
                  <div className="mt-0.5 text-[9px] leading-snug text-white/48">{child.sublabel}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicePanelOpen, setServicePanelOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMd, setIsMd] = useState(false)
  const servicePanelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const apply = () => setIsMd(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    setServicePanelOpen(false)
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!servicePanelOpen) return
    const close = (e: MouseEvent) => {
      const el = servicePanelRef.current
      if (el && !el.contains(e.target as Node)) setServicePanelOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicePanelOpen(false)
    }
    document.addEventListener("mousedown", close)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", close)
      document.removeEventListener("keydown", onKey)
    }
  }, [servicePanelOpen])

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 48)
  }, [])

  useEffect(() => {
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  const hideTopBar = scrolled && isMd

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 backdrop-blur-xl transition-shadow duration-500",
        hideTopBar
          ? "shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
          : "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
        {/* —— Global Top Bar —— */}
        <div
          className={cn(
            "overflow-hidden border-b border-white/[0.045] bg-[#070605]/[0.98] transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:duration-500",
            hideTopBar ? "max-h-0 border-transparent opacity-0 md:pointer-events-none" : "max-h-[6.5rem] opacity-100",
          )}
          aria-hidden={hideTopBar}
        >
          <div className="flex items-center justify-between gap-4 py-3 md:py-3.5">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <Link href="/" className="relative flex shrink-0 items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-gradient-gold">
                  <span className="text-lg font-semibold text-black">L</span>
                </div>
                <span className="hidden font-sans text-[13px] font-bold uppercase tracking-[0.26em] text-[#FFFFFF] [text-shadow:0_0_12px_rgba(255,255,255,0.25),0_0_2px_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.4)] sm:inline-block">
                  LUMINA
                </span>
                <span className="absolute -right-1 -top-1 hidden h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.85)] sm:inline-block" />
              </Link>
              <IndustrySwitcher compact className="hidden min-w-0 sm:flex" />
            </div>

            <div className="hidden items-center gap-8 md:flex lg:gap-10">
              <nav className="flex items-center gap-8 lg:gap-10">
                {topNavItems.map((item) => (
                  <TopNavLink key={item.label + item.href} item={item} />
                ))}
              </nav>
              <Button
                className="bg-gradient-gold px-4 text-xs font-semibold text-black shadow-gold hover:bg-gradient-gold-hover lg:px-5 lg:text-sm"
                onClick={scrollToUpload}
              >
                무료 분석 체험하기
              </Button>
            </div>

            <button
              type="button"
              className={cn("rounded-lg p-2 text-white transition-colors hover:bg-white/[0.07] md:hidden", focusRing)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* —— Service Navigation Bar —— */}
        <div
          className={cn(
            "border-b border-white/[0.07] bg-black/[0.92] transition-[box-shadow] duration-500",
            /* 헤더와 본문 사이 공기감: 얇은 라인 + 하방 그림자로 플로팅 분리 */
            "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_40px_-6px_rgba(0,0,0,0.55),0_24px_64px_-12px_rgba(0,0,0,0.35)]",
            hideTopBar ? "shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_14px_48px_-8px_rgba(0,0,0,0.6)]" : "",
          )}
        >
          <nav className="hidden flex-wrap items-center justify-center gap-x-12 gap-y-3 py-4 lg:flex xl:gap-x-14 2xl:gap-x-16">
            {serviceNavItems.map((item) =>
              item.children?.length ? (
                <GenesisDesktopNavItem
                  key={item.label + item.href}
                  item={item as NavItem & { children: GenesisChild[] }}
                />
              ) : (
                <ServiceNavLink key={item.label + item.href} item={item} />
              ),
            )}
          </nav>

          {/* 태블릿·모바일: 드롭다운 */}
          <div ref={servicePanelRef} className="relative lg:hidden">
            <button
              type="button"
              aria-expanded={servicePanelOpen}
              aria-controls="service-nav-panel"
              onClick={() => setServicePanelOpen((o) => !o)}
              className={cn(
                "flex w-full items-center justify-between gap-3 border-t border-white/[0.04] px-1 py-3.5 text-left sm:px-0",
                focusRing,
              )}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
                서비스 탐색
              </span>
              <span className="flex items-center gap-2 text-sm text-white/75">
                <span className="hidden font-medium sm:inline">메뉴 열기</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-white/50 transition-transform duration-200",
                    servicePanelOpen && "rotate-180",
                  )}
                  strokeWidth={1.75}
                />
              </span>
            </button>

            <div
              id="service-nav-panel"
              className={cn(
                "overflow-hidden border-t border-white/[0.06] bg-[#080706]/98 transition-[max-height,opacity] duration-300 ease-out",
                servicePanelOpen ? "max-h-[min(70vh,520px)] opacity-100" : "max-h-0 border-transparent opacity-0",
              )}
            >
              <div className="max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain px-2 py-4 sm:px-3">
                <div className="flex flex-col gap-1">
                  {serviceNavItems.map((item) => (
                    <div key={item.label + item.href}>
                      <ServiceNavLink
                        item={item}
                        align="start"
                        onNavigate={() => setServicePanelOpen(false)}
                      />
                      <GenesisMobileSubLinks
                        item={item}
                        onNavigate={() => setServicePanelOpen(false)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-b border-white/10 bg-[#060605]/98 backdrop-blur-lg md:hidden">
          <div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-5">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                글로벌
              </p>
              <div className="mb-5">
                <IndustrySwitcher />
              </div>
              <div className="flex flex-col gap-1">
                {topNavItems.map((item) => (
                  <TopNavLink
                    key={item.label + item.href}
                    item={item}
                    stacked
                    onNavigate={() => setIsMenuOpen(false)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                서비스
              </p>
              <div className="flex flex-col gap-2">
                {serviceNavItems.map((item) => (
                  <div key={item.label + item.href}>
                    <ServiceNavLink
                      item={item}
                      align="start"
                      onNavigate={() => setIsMenuOpen(false)}
                    />
                    <GenesisMobileSubLinks
                      item={item}
                      onNavigate={() => setIsMenuOpen(false)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
              <Button
                variant="outline"
                size="sm"
                className={cn("border-white/15 bg-transparent text-white/80 hover:bg-white/[0.06]", focusRing)}
                onClick={() => {
                  setIsMenuOpen(false)
                  scrollToUpload()
                }}
              >
                <Upload className="mr-1.5 h-4 w-4" />
                업로드
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn("border-white/15 bg-transparent text-white/80 hover:bg-white/[0.06]", focusRing)}
                asChild
              >
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <LayoutGrid className="mr-1.5 h-4 w-4" />
                  보석함
                </Link>
              </Button>
              <Button
                className={cn("grow bg-gradient-gold font-semibold text-black shadow-gold", focusRing)}
                onClick={() => {
                  setIsMenuOpen(false)
                  scrollToUpload()
                }}
              >
                무료 분석 체험하기
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
