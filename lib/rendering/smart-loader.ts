import { type RenderTier } from "@/lib/rendering/render-config"

type SmartLoaderInput = {
  allowGenesis: boolean
}

function getNetworkHint(): { effectiveType?: string; saveData: boolean } {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return { saveData: false }
  }
  const conn = (navigator as unknown as { connection?: unknown }).connection as
    | { effectiveType?: string; saveData?: boolean }
    | undefined

  return {
    effectiveType: conn?.effectiveType,
    saveData: conn?.saveData ?? false,
  }
}

function pickTierFromSignals(signals: {
  saveData: boolean
  effectiveType?: string
  deviceMemory: number
  hardwareConcurrency: number
  dpr: number
}): RenderTier {
  const { saveData, effectiveType, deviceMemory, hardwareConcurrency, dpr } = signals

  // Data saver: 빠른/경량만.
  if (saveData) return 1

  const slowNet =
    effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g"
  if (slowNet) {
    if (deviceMemory <= 2 || hardwareConcurrency <= 4) return 1
    return 2
  }

  const fastNet = effectiveType === "4g" || effectiveType === "5g"
  if (!fastNet) {
    // unknown-ish
    if (deviceMemory <= 2 || hardwareConcurrency <= 4) return 2
    return 3
  }

  // Fast network
  const strongDevice = deviceMemory >= 6 && hardwareConcurrency >= 8
  const veryHighDpr = dpr >= 2.75

  if (strongDevice) return veryHighDpr ? 4 : 5
  if (deviceMemory >= 4 && hardwareConcurrency >= 6) return 4
  return 3
}

export function chooseRenderTier(input: SmartLoaderInput): RenderTier {
  const { saveData, effectiveType } = getNetworkHint()
  const deviceMemory =
    (typeof navigator !== "undefined"
      ? ((navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4)
      : 4) || 4
  const hardwareConcurrency =
    typeof navigator !== "undefined" ? navigator.hardwareConcurrency ?? 4 : 4
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

  const baseTier = pickTierFromSignals({
    saveData,
    effectiveType,
    deviceMemory,
    hardwareConcurrency,
    dpr,
  })

  // Genesis 제한: allowGenesis가 false면 Tier 4까지만.
  if (!input.allowGenesis && baseTier === 5) return 4
  return baseTier
}

