import { Redis } from "@upstash/redis"

let client: Redis | null | undefined

/**
 * Upstash Redis (REST). Stateless shared memory for caches, job status, rate windows.
 * Returns null when not configured — callers fall back to in-process behavior.
 */
export function getUpstashRedis(): Redis | null {
  if (client !== undefined) return client
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  if (!url || !token) {
    client = null
    return null
  }
  client = new Redis({ url, token })
  return client
}

export function isUpstashRedisConfigured(): boolean {
  return getUpstashRedis() != null
}
