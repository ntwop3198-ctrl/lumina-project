import { supabaseAdmin } from '@/lib/supabase'
import type { ApiFeatureId } from '@/lib/api-usage/features'
import { estimatedCostUsd } from '@/lib/api-usage/config'

export type UsageSummary = {
  source: 'database' | 'unavailable'
  last24hTotalUsd: number
  last24hByFeature: Partial<Record<ApiFeatureId, number>>
  last24hCalls: number
  projectedMonthlyUsd: number
  /** Rough ceiling from env defaults × 24h call volume */
  budgetHintUsd: number
}

const FEATURES: ApiFeatureId[] = [
  'analyze_product',
  'analyze_product_stream',
  'generate_background',
  'refine_copy',
  'export_launch_bundle',
  'genesis_render_queue',
]

export async function getUsageSummaryForAdmin(): Promise<UsageSummary> {
  if (!supabaseAdmin) {
    return {
      source: 'unavailable',
      last24hTotalUsd: 0,
      last24hByFeature: {},
      last24hCalls: 0,
      projectedMonthlyUsd: 0,
      budgetHintUsd: 0,
    }
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { data: rows, error } = await supabaseAdmin
    .from('lumina_api_usage_events')
    .select('feature, estimated_cost_usd')
    .gte('created_at', since)

  if (error) {
    console.error('[lumina] getUsageSummaryForAdmin:', error)
    return {
      source: 'unavailable',
      last24hTotalUsd: 0,
      last24hByFeature: {},
      last24hCalls: 0,
      projectedMonthlyUsd: 0,
      budgetHintUsd: 0,
    }
  }

  const byFeature: Partial<Record<ApiFeatureId, number>> = {}
  let total = 0
  let calls = 0
  for (const row of rows ?? []) {
    const f = row.feature as ApiFeatureId
    const c = Number(row.estimated_cost_usd) || 0
    if (!FEATURES.includes(f)) continue
    calls += 1
    total += c
    byFeature[f] = (byFeature[f] ?? 0) + c
  }

  const projectedMonthlyUsd = total * 30
  const budgetMonthly = Number(process.env.LUMINA_MONTHLY_BUDGET_USD?.trim() || '')
  const budgetHintUsd = Number.isFinite(budgetMonthly) && budgetMonthly > 0 ? budgetMonthly : 0

  return {
    source: 'database',
    last24hTotalUsd: total,
    last24hByFeature: byFeature,
    last24hCalls: calls,
    projectedMonthlyUsd,
    budgetHintUsd,
  }
}

export function defaultCostMatrix(): Record<ApiFeatureId, number> {
  return {
    analyze_product: estimatedCostUsd('analyze_product'),
    analyze_product_stream: estimatedCostUsd('analyze_product_stream'),
    generate_background: estimatedCostUsd('generate_background'),
    refine_copy: estimatedCostUsd('refine_copy'),
    export_launch_bundle: estimatedCostUsd('export_launch_bundle'),
    genesis_render_queue: estimatedCostUsd('genesis_render_queue'),
  }
}
