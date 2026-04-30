"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { CtaButton } from "@/components/landing/ui/cta-button"
import type { VoiceMode } from "@/lib/narrative/voice-mode"

export function ExportLaunchBundleButton({
  analysisMarkdown,
  voiceMode,
  productName,
}: {
  analysisMarkdown: string
  voiceMode: VoiceMode
  productName?: string
}) {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onExport() {
    setErr(null)
    setLoading(true)
    try {
      const res = await fetch("/api/export-launch-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisMarkdown, voiceMode, productName }),
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || "내보내기에 실패했습니다.")
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `lumina-launch-bundle-${productName ?? "product"}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setErr(e instanceof Error ? e.message : "내보내기에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <CtaButton
        type="button"
        tone="primary"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm"
        onClick={onExport}
        disabled={loading}
      >
        <Download className="w-4 h-4" />
        {loading ? "내보내는 중…" : "런칭 패키지 내보내기"}
      </CtaButton>
      {err ? <p className="text-xs text-red-500/90 max-w-[220px]">{err}</p> : null}
    </div>
  )
}

