/**
 * Deterministic, dependency-free string hash.
 * - Client-safe (no Node APIs)
 * - Used to derive brand-specific "noise" / seeds
 */
export function stableHash(input: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  // unsigned 32-bit
  return h >>> 0
}

export function toSeedString(seed: number): string {
  // Keep it short, prompt-friendly.
  return seed.toString(36)
}

export function seedToUnit01(seed: number): number {
  return (seed % 10000) / 10000
}

