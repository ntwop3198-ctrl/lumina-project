import type { ApiFeatureId } from '@/lib/api-usage/features'
import {
  blockDurationMs,
  estimatedCostUsd,
  rateLimitPerHour,
  rateLimitPerMinute,
} from '@/lib/api-usage/config'

type Event = { at: number; cost: number }

const events = new Map<string, Event[]>()
const blocks = new Map<string, number>()

function key(userKey: string, feature: ApiFeatureId) {
  return `${userKey}::${feature}`
}

function prune(list: Event[], windowMs: number) {
  const cutoff = Date.now() - windowMs
  return list.filter((e) => e.at >= cutoff)
}

export function memoryAssertAndRecord(
  userKey: string,
  feature: ApiFeatureId,
  costOverride?: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const k = key(userKey, feature)
  const now = Date.now()
  const until = blocks.get(k)
  if (until && until > now) {
    return { ok: false, retryAfterSec: Math.ceil((until - now) / 1000) }
  }

  const list = prune(events.get(k) ?? [], 60 * 60 * 1000)
  const perMin = rateLimitPerMinute(feature)
  const perHour = rateLimitPerHour(feature)
  const lastMin = list.filter((e) => e.at >= now - 60_000).length
  const lastHour = list.length

  if (lastMin >= perMin || lastHour >= perHour) {
    blocks.set(k, now + blockDurationMs())
    return { ok: false, retryAfterSec: Math.ceil(blockDurationMs() / 1000) }
  }

  const cost = costOverride ?? estimatedCostUsd(feature)
  list.push({ at: now, cost })
  events.set(k, list)
  return { ok: true }
}
