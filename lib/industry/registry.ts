import { CORE_BRANDING_ENGINE } from "./core-engine"
import { getLayoutPatternById } from "./knowledge-bridge"
import { COSMETIC_INDUSTRY_MODULE } from "./templates/cosmetic"
import { FASHION_INDUSTRY_MODULE } from "./templates/fashion"
import { TECH_INDUSTRY_MODULE } from "./templates/tech"
import type { IndustryId, IndustryModule, ResolvedIndustryContext } from "./types"

export const DEFAULT_INDUSTRY_ID: IndustryId = "cosmetic"

const MODULES: Record<IndustryId, IndustryModule> = {
  cosmetic: COSMETIC_INDUSTRY_MODULE,
  fashion: FASHION_INDUSTRY_MODULE,
  tech: TECH_INDUSTRY_MODULE,
}

export const INDUSTRY_IDS = Object.keys(MODULES) as IndustryId[]

export function getIndustryModule(id: IndustryId): IndustryModule {
  return MODULES[id]
}

export function listIndustryModules(): IndustryModule[] {
  return INDUSTRY_IDS.map((id) => MODULES[id])
}

export function isIndustrySelectable(id: IndustryId): boolean {
  const m = MODULES[id]
  return m.activation === "active" || m.activation === "beta"
}

export function resolveIndustryContext(industryId: IndustryId): ResolvedIndustryContext {
  const industryModule = getIndustryModule(industryId)
  const layoutPatterns = industryModule.defaultLayoutRefs
    .map((ref) => getLayoutPatternById(ref))
    .filter((p): p is NonNullable<typeof p> => p != null)

  return {
    industryId,
    module: industryModule,
    core: CORE_BRANDING_ENGINE,
    layoutPatterns,
  }
}

export { CORE_BRANDING_ENGINE }
