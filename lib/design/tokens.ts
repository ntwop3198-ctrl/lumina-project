export const LANDING_ICON = {
  badge: "w-4 h-4 text-rose-gold",
  nav: "w-4 h-4",
  cta: "w-4 h-4",
  logo: "w-5 h-5 text-cream",
  card: "w-8 h-8 text-rose-gold",
  cardArrow: "w-5 h-5 text-rose-gold",
  meter: "w-6 h-6 text-rose-gold",
  plan: "w-7 h-7",
  list: "w-3 h-3 text-rose-gold",
  processArrow: "w-4 h-4 text-rose-gold/50",
  primaryHero: "w-8 h-8 text-cream",
} as const

export const LANDING_MOTION = {
  fast: "transition-all duration-300",
  normal: "transition-all duration-500",
  fade: "transition-opacity duration-500",
} as const

export const LANDING_SURFACE = {
  cardSoft:
    "rounded-3xl border border-rose-gold/10 bg-cream/70 shadow-sm",
  cardSoftHover:
    "hover:shadow-xl hover:border-rose-gold/30",
  cardGlass:
    "rounded-[2rem] border border-rose-gold/20 bg-gradient-to-b from-cream/90 via-cream/70 to-cream/90 backdrop-blur-2xl shadow-xl",
  cardStrong:
    "rounded-3xl border-2 border-rose-gold/30 bg-cream shadow-lg",
  panelSoft:
    "rounded-xl border border-rose-gold/10 bg-white/40",
} as const

/** 시맨틱 텍스트 색 — Tailwind 유틸 문자열 (랜딩 전역에서 재사용) */
export const LANDING_TEXT = {
  primary: "text-charcoal",
  secondary: "text-warm-gray",
  brand: "text-rose-gold",
  brandMuted: "text-rose-gold/70",
  brandSoft: "text-rose-gold/50",
  divider: "text-rose-gold/30",
  inverse: "text-cream",
  inverseMuted: "text-cream/70",
  body: "text-charcoal/90",
} as const

/** 인라인 링크·네비 호버 톤 */
export const LANDING_LINK = {
  nav: "text-warm-gray hover:text-rose-gold transition-colors duration-300",
  navActive: "text-rose-gold",
  subtle: "text-warm-gray hover:text-rose-gold transition-colors text-sm",
} as const

export const LANDING_TYPE = {
  sectionBadge: `inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase ${LANDING_TEXT.brand}`,
  sectionTitle: `font-serif text-3xl md:text-5xl font-medium text-balance ${LANDING_TEXT.primary}`,
  sectionBody: `${LANDING_TEXT.secondary} text-lg max-w-2xl mx-auto`,
  heroTitle: `font-serif font-medium leading-[1.1] text-balance ${LANDING_TEXT.primary} text-[clamp(44px,6vw,76px)]`,
  heroBody: `${LANDING_TEXT.secondary} text-lg md:text-xl max-w-xl mx-auto leading-relaxed`,
  cardTitle: `font-serif text-xl md:text-2xl font-medium ${LANDING_TEXT.primary}`,
  cardBody: `${LANDING_TEXT.secondary} leading-relaxed`,
  caption: `text-xs ${LANDING_TEXT.secondary}`,
  faqQuestion: `font-serif text-lg ${LANDING_TEXT.primary}`,
  faqAnswer: `${LANDING_TEXT.secondary} text-sm leading-relaxed`,
  heroBadgeLabel: `text-sm font-medium tracking-wide ${LANDING_TEXT.primary}`,
  heroStatValue: `text-xl md:text-2xl font-serif font-semibold ${LANDING_TEXT.brand}`,
  heroStatLabel: `text-xs ${LANDING_TEXT.secondary}`,
  reportLabel: `${LANDING_TEXT.brand} text-[11px] font-semibold tracking-wider uppercase`,
} as const

export const LANDING_LAYOUT = {
  sectionY: "py-28 md:py-36",
  container: "max-w-7xl mx-auto px-6 md:px-8",
  heroContainer: "max-w-4xl mx-auto px-6 md:px-8",
  heroTopPadding: "pt-24",
  heroStatGrid:
    "flex flex-row divide-x divide-rose-gold/25 max-w-2xl mx-auto w-full items-stretch",
  heroBottomGap: "mb-10",
  heroBodyGap: "mb-14",
  heroTitleGap: "mb-6",
  heroBadgeGap: "mb-10",
  heroBadgePadding: "px-4 py-2",
  heroInnerGap: "gap-5",
  heroUploadPadding: "p-10",
  helperTopGap: "mt-2",
  ctaTopGap: "mt-3",
  headerGap: "mb-18 md:mb-22",
  sectionGap: "mb-14 md:mb-18",
  sectionTopGap: "mt-20",
  compareGridGap: "gap-10 md:gap-18",
  processGap: "gap-7 md:gap-11",
  panelPadding: "p-6",
  cardPaddingLg: "p-7 md:p-8",
  stackGap: "space-y-3.5",
  cardPadding: "p-6 md:p-7",
  cardInnerGap: "gap-3.5",
  chipGap: "gap-2",
  titleGap: "mb-3",
  bodyGap: "mb-7",
  statGap: "mb-1",
  splitGap: "gap-1",
  iconTopGap: "mt-1",
  contentPaddingX: "px-6",
  contentPaddingBottom: "pb-6",
  gridGapTight: "gap-7",
  gridGap: "gap-9",
  /** Header: desktop nav / mobile drawer */
  mobileNavShellY: "py-6",
  mobileNavStack: "gap-2",
  mobileAuthStack: "gap-3",
  /** Footer */
  footerShellY: "py-18 md:py-20",
  footerBrandTitleGap: "mb-4",
  footerBrandBodyGap: "mb-6",
  footerSocialGap: "gap-3",
  footerPanelPadding: "p-4",
  footerHeadingGap: "mb-4",
  footerDividerGap: "mt-12 pt-8",
  footerMetaGap: "gap-6 mt-4 md:mt-0",
} as const
