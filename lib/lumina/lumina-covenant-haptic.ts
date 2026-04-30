/**
 * 루미나 청각 정책: 배경음·자동 재생 금지. 모바일 등에서 의식적 클릭 직후
 * 아주 짧은 진동만 허용(소리 대신 ‘무게’ 전달). iOS Safari 등 미지원 시 무시.
 */
export function tryLuminaCovenantHaptic(): void {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return
  try {
    void navigator.vibrate([8, 48, 12])
  } catch {
    /* 정책 또는 기기 제한 */
  }
}
