import type { ApiFeatureId } from '@/lib/api-usage/features'

function num(env: string | undefined, fallback: number): number {
  if (env == null || env === '') return fallback
  const n = Number(env)
  return Number.isFinite(n) && n >= 0 ? n : fallback
}

/** Estimated USD per call — tune via env for your pricing tier */
export function estimatedCostUsd(feature: ApiFeatureId): number {
  const map: Record<ApiFeatureId, string> = {
    analyze_product: 'LUMINA_COST_USD_ANALYZE_PRODUCT',
    analyze_product_stream: 'LUMINA_COST_USD_ANALYZE_PRODUCT_STREAM',
    generate_background: 'LUMINA_COST_USD_GENERATE_BACKGROUND',
    refine_copy: 'LUMINA_COST_USD_REFINE_COPY',
    export_launch_bundle: 'LUMINA_COST_USD_EXPORT_LAUNCH_BUNDLE',
    genesis_render_queue: 'LUMINA_COST_USD_GENESIS_RENDER_QUEUE',
  }
  const defaults: Record<ApiFeatureId, number> = {
    analyze_product: 0.002,
    analyze_product_stream: 0.002,
    generate_background: 0.04,
    refine_copy: 0.0008,
    export_launch_bundle: 0,
    genesis_render_queue: 0,
  }
  return num(process.env[map[feature]], defaults[feature])
}

export function rateLimitPerMinute(feature: ApiFeatureId): number {
  const envKey = `LUMINA_RATE_LIMIT_${feature.toUpperCase().replace(/-/g, '_')}_PER_MINUTE`
  const specific = num(process.env[envKey], -1)
  if (specific >= 0) return specific
  return num(process.env.LUMINA_RATE_LIMIT_PER_MINUTE, 24)
}

export function rateLimitPerHour(feature: ApiFeatureId): number {
  const envKey = `LUMINA_RATE_LIMIT_${feature.toUpperCase().replace(/-/g, '_')}_PER_HOUR`
  const specific = num(process.env[envKey], -1)
  if (specific >= 0) return specific
  return num(process.env.LUMINA_RATE_LIMIT_PER_HOUR, 180)
}

export function blockDurationMs(): number {
  return num(process.env.LUMINA_API_BLOCK_DURATION_MS, 15 * 60 * 1000)
}
