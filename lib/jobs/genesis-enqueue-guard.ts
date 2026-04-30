import { getUpstashRedis } from "@/lib/infra/upstash-redis"

const MAX_PER_MIN = Math.max(
  1,
  Number.parseInt(process.env.LUMINA_GENESIS_MAX_ENQUEUE_PER_MIN?.trim() || "200", 10) || 200,
)

/**
 * Soft global cap on Genesis enqueue bursts (per minute, all instances).
 * Without Redis, returns ok (rely on QStash flowControl only).
 */
export async function assertGenesisEnqueueAllowed(): Promise<
  | { ok: true }
  | { ok: false; retryAfterSec: number; reason: string }
> {
  const redis = getUpstashRedis()
  if (!redis) return { ok: true }

  const minute = Math.floor(Date.now() / 60_000)
  const key = `lumina:genesis:enqueue:min:${minute}`

  try {
    const n = await redis.incr(key)
    if (n === 1) await redis.expire(key, 120)
    if (n > MAX_PER_MIN) {
      return {
        ok: false,
        retryAfterSec: 60 - Math.floor((Date.now() % 60_000) / 1000),
        reason: `Genesis enqueue cap (${MAX_PER_MIN}/min). Retry shortly.`,
      }
    }
  } catch {
    return { ok: true }
  }

  return { ok: true }
}
