/**
 * Lumina Modular Industry Engine — shared types.
 * Core logic is industry-agnostic; templates supply tone & visual presets.
 */

export type IndustryId = "cosmetic" | "fashion" | "tech"

export type ActivationStatus = "active" | "beta" | "coming_soon"

export type ToneOfVoice = {
  label: string
  principles: string[]
  vocabularyHints: string[]
  avoid: string[]
}

export type VisualTexturePreset = {
  id: string
  name: string
  grainIntensity: "none" | "subtle" | "medium" | "rich"
  accentSemantic: "warm_gold" | "cool_chrome" | "neon_edge"
  surfaceBias: "soft_matte" | "glass" | "paper"
  description: string
  /** Optional Tailwind arbitrary helpers for future themed sections */
  cssHooks?: {
    accentVar?: string
    grainClass?: string
  }
}

export type IndustryModule = {
  id: IndustryId
  label: string
  shortLabel: string
  activation: ActivationStatus
  tone: ToneOfVoice
  visual: VisualTexturePreset
  /** Knowledge Bridge layout pattern IDs this vertical weights by default */
  defaultLayoutRefs: string[]
}

export type ObjectionMove = {
  id: string
  title: string
  description: string
}

export type CapitalHeuristic = {
  id: string
  title: string
  body: string
}

export type NarrativeAct = {
  id: string
  title: string
  purpose: string
}

/** 산업 공통 — 프롬프트·진단·UI 카피에 동일하게 주입 */
export type CoreBrandingEngine = {
  psychologicalObjectionHandling: {
    framework: string
    moves: ObjectionMove[]
  }
  capitalEfficiency: {
    principles: string[]
    heuristics: CapitalHeuristic[]
  }
  luxuryNarrativeStructure: {
    acts: NarrativeAct[]
    bridgeToProduct: string
  }
}

export type LayoutDensity = "sparse" | "balanced" | "dense"

/** 검증된 레이아웃 DNA — 타 산업이 참조·복제 */
export type LayoutPatternRecord = {
  id: string
  name: string
  sourceIndustry: IndustryId
  validatedIn: IndustryId[]
  structure: {
    sections: string[]
    density: LayoutDensity
    ctaRhythm: string
  }
  transferableNotes: string
}

export type ResolvedIndustryContext = {
  industryId: IndustryId
  module: IndustryModule
  core: CoreBrandingEngine
  /** Layout patterns explicitly linked to this module + shared pool */
  layoutPatterns: LayoutPatternRecord[]
}
