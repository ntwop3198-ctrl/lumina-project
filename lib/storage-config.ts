/** Supabase Storage 버킷 이름 — 대시보드에서 같은 이름으로 만들어야 합니다. */
export const PRODUCT_IMAGES_BUCKET = 'product-images'

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024 // 10MB

const SAFE_EXT = /[^a-zA-Z0-9._-]/g

export function sanitizeUploadFileName(name: string): string {
  const base = name.split(/[/\\]/).pop() || 'image'
  return base.replace(SAFE_EXT, '_').slice(0, 120)
}
