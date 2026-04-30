import { NextResponse } from "next/server"
import { Receiver } from "@upstash/qstash"
import {
  notifyRenderComplete,
  type HighRenderJobPayload,
} from "@/lib/jobs/async-high-render"
import { patchGenesisJob } from "@/lib/jobs/genesis-job-store"

export const runtime = "nodejs"
export const maxDuration = 300

type WorkerBody = HighRenderJobPayload & { secret?: string }

/**
 * QStash가 호출하는 전용 워커 엔드포인트.
 * 프로덕션: QSTASH_CURRENT_SIGNING_KEY 로 서명 검증 (바디에 secret 불필요).
 * 로컬: LUMINA_ASYNC_JOB_SECRET 을 JSON 바디에 포함해 검증.
 */
export async function POST(request: Request) {
  const signingKey = process.env.QSTASH_CURRENT_SIGNING_KEY?.trim()
  const expectedSecret = process.env.LUMINA_ASYNC_JOB_SECRET?.trim()
  const rawBody = await request.text()

  if (signingKey) {
    const receiver = new Receiver({
      currentSigningKey: signingKey,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY?.trim(),
    })
    try {
      await receiver.verify({
        signature: request.headers.get("upstash-signature") || "",
        body: rawBody,
      })
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  } else if (expectedSecret) {
    let probe: WorkerBody
    try {
      probe = JSON.parse(rawBody) as WorkerBody
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }
    if (probe.secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  } else {
    return NextResponse.json(
      {
        error:
          "Set QSTASH_CURRENT_SIGNING_KEY (production) or LUMINA_ASYNC_JOB_SECRET (dev)",
      },
      { status: 503 },
    )
  }

  let body: WorkerBody
  try {
    body = JSON.parse(rawBody) as WorkerBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!body.imageUrl?.trim() || typeof body.tier !== "number") {
    return NextResponse.json({ error: "imageUrl and tier required" }, { status: 400 })
  }

  const jobId = body.jobId?.trim()
  if (jobId) {
    await patchGenesisJob(jobId, { status: "processing" })
  }

  console.info("[high-render-worker] processing", {
    kind: body.kind,
    tier: body.tier,
    jobId: jobId ?? null,
    hasImage: Boolean(body.imageUrl),
  })

  // TODO: 실제 Genesis / GPU 렌더 파이프라인 연결
  if (jobId) {
    await patchGenesisJob(jobId, {
      status: "completed",
      message: "stub_complete",
    })
  }

  await notifyRenderComplete({
    event: "high_render_completed",
    kind: body.kind,
    tier: body.tier,
    userId: body.userId,
    jobId: jobId ?? null,
  })

  return NextResponse.json({ ok: true, processed: "stub", jobId: jobId ?? null })
}
