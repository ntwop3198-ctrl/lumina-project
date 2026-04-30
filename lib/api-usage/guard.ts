import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { ApiFeatureId } from '@/lib/api-usage/features'
import {
  blockDurationMs,
  estimatedCostUsd,
  rateLimitPerHour,
  rateLimitPerMinute,
} from '@/lib/api-usage/config'
import { resolveApiUserKey } from '@/lib/api-usage/user-key'
import { memoryAssertAndRecord } from '@/lib/api-usage/memory-store'

export type GuardOk = { ok: true; userKey: string }
export type GuardFail = { ok: false; response: NextResponse }

/**
 * Enforces per-user rate limits, optional DB logging, and temporary blocks.
 * Call at the start of each billable API route (after auth / key checks if desired).
 */
export async function enforceApiUsageGuard(
  request: Request,
  feature: ApiFeatureId,
  options?: { estimatedCostUsdOverride?: number; skipRecord?: boolean },
): Promise<GuardOk | GuardFail> {
  const userKey = resolveApiUserKey(request)
  const cost = options?.estimatedCostUsdOverride ?? estimatedCostUsd(feature)

  if (!supabaseAdmin) {
    const mem = memoryAssertAndRecord(userKey, feature, cost)
    if (!mem.ok) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: '요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
            code: 'RATE_LIMITED',
            retryAfterSec: mem.retryAfterSec,
            feature,
          },
          {
            status: 429,
            headers: { 'Retry-After': String(mem.retryAfterSec) },
          },
        )
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.warn('[lumina] API usage: SUPABASE_SERVICE_ROLE_KEY 없음 — 메모리 전용 레이트 리밋만 적용됩니다.')
    }
    return { ok: true, userKey }
  }

  const now = new Date()
  const nowIso = now.toISOString()

  const { data: blockRow } = await supabaseAdmin
    .from('lumina_api_feature_blocks')
    .select('blocked_until')
    .eq('user_key', userKey)
    .eq('feature', feature)
    .maybeSingle()

  if (blockRow?.blocked_until && new Date(blockRow.blocked_until) > now) {
    const retryAfterSec = Math.ceil(
      (new Date(blockRow.blocked_until).getTime() - now.getTime()) / 1000,
    )
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: '이 기능은 일시적으로 제한되었습니다. 잠시 후 다시 시도해 주세요.',
          code: 'FEATURE_BLOCKED',
          feature,
          retryAfterSec,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.max(1, retryAfterSec)) },
        },
      ),
    }
  }

  const sinceMinute = new Date(now.getTime() - 60_000).toISOString()
  const sinceHour = new Date(now.getTime() - 60 * 60 * 1000).toISOString()

  const { count: countMin } = await supabaseAdmin
    .from('lumina_api_usage_events')
    .select('*', { count: 'exact', head: true })
    .eq('user_key', userKey)
    .eq('feature', feature)
    .gte('created_at', sinceMinute)

  const { count: countHour } = await supabaseAdmin
    .from('lumina_api_usage_events')
    .select('*', { count: 'exact', head: true })
    .eq('user_key', userKey)
    .eq('feature', feature)
    .gte('created_at', sinceHour)

  const limMin = rateLimitPerMinute(feature)
  const limHour = rateLimitPerHour(feature)
  const cMin = countMin ?? 0
  const cHour = countHour ?? 0

  if (cMin >= limMin || cHour >= limHour) {
    const blockUntil = new Date(now.getTime() + blockDurationMs())
    await supabaseAdmin.from('lumina_api_feature_blocks').upsert(
      {
        user_key: userKey,
        feature,
        blocked_until: blockUntil.toISOString(),
        reason: 'rate_limit_exceeded',
      },
      { onConflict: 'user_key,feature' },
    )

    const retryAfterSec = Math.ceil(blockDurationMs() / 1000)
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: '요청 한도를 초과했습니다. 이 기능이 잠시 차단되었습니다.',
          code: 'RATE_LIMITED',
          feature,
          retryAfterSec,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfterSec) },
        },
      ),
    }
  }

  if (!options?.skipRecord) {
    const { error: insErr } = await supabaseAdmin.from('lumina_api_usage_events').insert({
      user_key: userKey,
      feature,
      estimated_cost_usd: cost,
      meta: {},
    })
    if (insErr) {
      console.error('[lumina] api_usage_events insert failed:', insErr)
    }
  }

  return { ok: true, userKey }
}
