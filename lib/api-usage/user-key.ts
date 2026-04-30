import { createHash } from 'crypto'

/**
 * Resolves a stable per-caller key for usage & rate limits.
 * Priority: x-lumina-user-id header → LUMINA_CREDITS_USER_ID env → hashed client IP.
 */
export function resolveApiUserKey(request: Request): string {
  const headerId = request.headers.get('x-lumina-user-id')?.trim()
  if (headerId) return `user:${headerId.slice(0, 128)}`

  const envUser = process.env.LUMINA_CREDITS_USER_ID?.trim()
  if (envUser) return `env:${envUser.slice(0, 128)}`

  const fwd = request.headers.get('x-forwarded-for')
  const ip =
    fwd?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown'
  const salt = process.env.LUMINA_RATE_LIMIT_IP_SALT?.trim() || 'lumina-ip-salt-change-in-prod'
  const hash = createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
  return `ip:${hash}`
}
