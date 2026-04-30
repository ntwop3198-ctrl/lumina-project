import { NextResponse } from "next/server"
import { enqueueHighRenderJob, type HighRenderJobPayload } from "@/lib/jobs/async-high-render"

export const runtime = "nodejs"
export const maxDuration = 25

export async function POST(request: Request) {
  let body: Partial<HighRenderJobPayload> = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON body required" }, { status: 400 })
  }

  if (!body.imageUrl?.trim() || typeof body.tier !== "number") {
    return NextResponse.json({ error: "imageUrl and tier required" }, { status: 400 })
  }

  const payload: HighRenderJobPayload = {
    kind: body.kind === "tier_upgrade_preview" ? "tier_upgrade_preview" : "genesis_visual",
    imageUrl: body.imageUrl.trim(),
    tier: body.tier,
    userId: body.userId ?? null,
    reservationId: body.reservationId ?? null,
    jobId: typeof body.jobId === "string" ? body.jobId : null,
  }

  const result = await enqueueHighRenderJob(payload)

  if (result.strategy === "deferred" && result.retryAfterSec != null) {
    return NextResponse.json(
      { ok: false, payload, queue: result },
      {
        status: 429,
        headers: { "Retry-After": String(result.retryAfterSec) },
      },
    )
  }

  return NextResponse.json({ ok: true, payload, queue: result })
}
