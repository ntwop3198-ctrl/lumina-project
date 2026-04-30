import { createHash } from "crypto"
import type { FinalRefineResult } from "@/lib/compliance/refine-types"
import { getUpstashRedis } from "@/lib/infra/upstash-redis"

const MAX_ENTRIES = Number(process.env.LUMINA_REFINE_CACHE_MAX?.trim() || "256") || 256
const REDIS_TTL_SEC = Math.max(
  60,
  Number.parseInt(process.env.LUMINA_REFINE_CACHE_TTL_SEC?.trim() || "604800", 10) || 604800,
)
const REDIS_KEY_PREFIX = "lumina:refine:v1:"

const memoryStore = new Map<string, { value: FinalRefineResult; at: number }>()
const memoryOrder: string[] = []

function touchMemory(key: string) {
  const i = memoryOrder.indexOf(key)
  if (i >= 0) memoryOrder.splice(i, 1)
  memoryOrder.push(key)
  while (memoryOrder.length > MAX_ENTRIES) {
    const oldest = memoryOrder.shift()
    if (oldest) memoryStore.delete(oldest)
  }
}

export function refineCacheKey(rawAnalysis: string): string {
  return createHash("sha256").update(rawAnalysis, "utf8").digest("hex")
}

export function isRefineCacheEnabled(): boolean {
  return process.env.LUMINA_REFINE_CACHE?.trim() !== "0"
}

/**
 * Prefer Upstash Redis when configured; otherwise LRU memory (local dev).
 */
export async function getRefinedFromCache(key: string): Promise<FinalRefineResult | null> {
  const redis = getUpstashRedis()
  if (redis) {
    try {
      const raw = await redis.get<string>(`${REDIS_KEY_PREFIX}${key}`)
      if (raw == null) return null
      const parsed =
        typeof raw === "string" ? (JSON.parse(raw) as FinalRefineResult) : (raw as FinalRefineResult)
      if (parsed?.documentForPersistence && parsed?.snapshot) return parsed
    } catch {
      return null
    }
    return null
  }

  const e = memoryStore.get(key)
  if (!e) return null
  touchMemory(key)
  return e.value
}

export async function setRefinedCache(key: string, value: FinalRefineResult): Promise<void> {
  const redis = getUpstashRedis()
  if (redis) {
    try {
      await redis.set(`${REDIS_KEY_PREFIX}${key}`, JSON.stringify(value), { ex: REDIS_TTL_SEC })
      return
    } catch {
      /* single-instance fallback if Redis blips */
    }
  }

  memoryStore.set(key, { value, at: Date.now() })
  touchMemory(key)
}
