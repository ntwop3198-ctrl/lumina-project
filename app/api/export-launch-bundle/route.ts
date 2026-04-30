import { NextResponse } from "next/server"
import JSZip from "jszip"
import { ApiFeature } from "@/lib/api-usage/features"
import { enforceApiUsageGuard } from "@/lib/api-usage/guard"

import type { LaunchBundleExport } from "@/lib/shortform/types"
import { buildLaunchBundleExport } from "@/lib/shortform/orchestrator"
import { buildLaunchBundleFiles } from "@/lib/export/launch-bundle-files"
import type { VoiceMode } from "@/lib/narrative/voice-mode"

export const runtime = "nodejs"
export const maxDuration = 60

type Body = {
  analysisMarkdown: string
  voiceMode: VoiceMode
  /** optional for filename */
  productName?: string
}

function safeName(name?: string) {
  const raw = (name ?? "").trim()
  if (!raw) return "lumina"
  return raw.replace(/[^a-zA-Z0-9-_가-힣]/g, "").slice(0, 30) || "lumina"
}

export async function POST(request: Request) {
  const guard = await enforceApiUsageGuard(request, ApiFeature.EXPORT_LAUNCH_BUNDLE)
  if (!guard.ok) return guard.response

  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON 본문이 필요합니다." }, { status: 400 })
  }

  if (!body?.analysisMarkdown?.trim()) {
    return NextResponse.json({ error: "analysisMarkdown이 필요합니다." }, { status: 400 })
  }

  const exportData: LaunchBundleExport = buildLaunchBundleExport({
    analysisMarkdown: body.analysisMarkdown,
    voiceMode: body.voiceMode,
  })

  const files = buildLaunchBundleFiles(exportData)

  const zip = new JSZip()
  for (const f of files) {
    zip.file(f.path, f.content)
  }

  const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" })
  // NextResponse 타입 호환을 위해 Uint8Array로 변환합니다.
  const u8 = new Uint8Array(buf as unknown as ArrayBuffer)

  const filename = `lumina-launch-bundle-${safeName(body.productName)}.zip`
  return new NextResponse(u8, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}

