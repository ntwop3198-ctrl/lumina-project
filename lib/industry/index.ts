export type {
  ActivationStatus,
  CoreBrandingEngine,
  IndustryId,
  IndustryModule,
  LayoutPatternRecord,
  ResolvedIndustryContext,
  ToneOfVoice,
  VisualTexturePreset,
} from "./types"

export { CORE_BRANDING_ENGINE } from "./core-engine"
export {
  getBridgeablePatternsForIndustry,
  getLayoutPatternById,
  LAYOUT_PATTERN_LIBRARY,
  registerLayoutValidation,
} from "./knowledge-bridge"
export {
  DEFAULT_INDUSTRY_ID,
  getIndustryModule,
  INDUSTRY_IDS,
  isIndustrySelectable,
  listIndustryModules,
  resolveIndustryContext,
} from "./registry"
