/**
 * 배포 이미지 URL: Cloudinary fetch 변환(선택) 또는 원본.
 * 원본은 Supabase 등 스토리지, 전달은 AVIF/WebP (Next/Image formats).
 *
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME 이 있으면 f_auto,q_auto,w_* 적용.
 */

type DeliveryOpts = {
  width?: number
}

export function getDeliveryImageUrl(originalUrl: string, opts: DeliveryOpts = {}): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim()
  if (!cloud || !originalUrl.startsWith("http")) {
    return originalUrl
  }

  const w = opts.width && opts.width > 0 ? opts.width : 1200
  const encoded = encodeURIComponent(originalUrl)
  return `https://res.cloudinary.com/${cloud}/image/fetch/f_auto,q_auto,w_${w}/${encoded}`
}
