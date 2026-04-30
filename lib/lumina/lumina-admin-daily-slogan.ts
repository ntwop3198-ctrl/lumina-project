/**
 * 관리자 대시보드 상단 일일 슬로건.
 * 매니저 다짐은 `LUMINA_ADMIN_DAILY_SLOGAN_KO`에 설정(비우면 마스터 모토).
 */

import { LUMINA_MASTER_MOTTO_KO } from "@/lib/lumina/lumina-master-motto-charter"

export const LUMINA_ADMIN_DAILY_SLOGAN_FALLBACK_KO = LUMINA_MASTER_MOTTO_KO

export function getLuminaAdminDailySloganKo(): string {
  const custom = process.env.LUMINA_ADMIN_DAILY_SLOGAN_KO?.trim()
  if (custom) return custom
  return LUMINA_ADMIN_DAILY_SLOGAN_FALLBACK_KO
}
