/**
 * Tier 5 (Genesis) 고사양 렌더 — QStash + Upstash Flow Control.
 *
 * 필수(프로덕션): QSTASH_TOKEN, LUMINA_PUBLIC_APP_URL, QSTASH_CURRENT_SIGNING_KEY (+ NEXT)
 * 선택: LUMINA_HIGH_RENDER_WORKER_URL — API 앱과 물리 분리 시 워커 공개 URL만 지정
 * 로컬/스텁: LUMINA_ASYNC_JOB_SECRET 만 있고 QStash 미설정 시 deferred 안내
 *
 * 완료 알림: LUMINA_RENDER_NOTIFY_URL (선택)
 */

import { randomUUID } from "crypto"
import { Client } from "@upstash/qstash"
import { assertGenesisEnqueueAllowed } from "@/lib/jobs/genesis-enqueue-guard"
import { patchGenesisJob, saveGenesisJob, type GenesisJobRecord } from "@/lib/jobs/genesis-job-store"

export type HighRenderJobPayload = {
  kind: "genesis_visual" | "tier_upgrade_preview"
  imageUrl: string
  tier: number
  userId?: string | null
  reservationId?: string | null
  /** 클라이언트 제공 시 그대로 사용, 없으면 서버 발급 */
  jobId?: string | null
}

export type EnqueueResult =
  | { strategy: "qstash"; messageId?: string; jobId: string }
  | { strategy: "deferred"; message: string; retryAfterSec?: number }
  | { strategy: "no_queue"; message: string }

function resolveWorkerUrl(base: string): string {
  const override = process.env.LUMINA_HIGH_RENDER_WORKER_URL?.trim()
  if (override) return override.replace(/\/$/, "")
  return `${base.replace(/\/$/, "")}/api/jobs/high-render-worker`
}

export async function enqueueHighRenderJob(payload: HighRenderJobPayload): Promise<EnqueueResult> {
  if (payload.tier !== 5) {
    return {
      strategy: "no_queue",
      message:
        "Genesis (Tier 5)만 QStash 파이프라인을 사용합니다. 하위 티어는 동기 API 경로를 유지하세요.",
    }
  }

  const token = process.env.QSTASH_TOKEN?.trim()
  const base = process.env.LUMINA_PUBLIC_APP_URL?.trim()?.replace(/\/$/, "")
  const hasSigning = Boolean(process.env.QSTASH_CURRENT_SIGNING_KEY?.trim())
  const legacySecret = process.env.LUMINA_ASYNC_JOB_SECRET?.trim()

  if (!token || !base || (!hasSigning && !legacySecret)) {
    return {
      strategy: "deferred",
      message:
        "QStash not configured. Set QSTASH_TOKEN, LUMINA_PUBLIC_APP_URL, and QSTASH_CURRENT_SIGNING_KEY (recommended) or LUMINA_ASYNC_JOB_SECRET for dev-only secret fallback.",
    }
  }

  const gate = await assertGenesisEnqueueAllowed()
  if (!gate.ok) {
    return {
      strategy: "deferred",
      message: gate.reason,
      retryAfterSec: gate.retryAfterSec,
    }
  }

  const jobId = payload.jobId?.trim() || randomUUID()
  const record: GenesisJobRecord = {
    jobId,
    status: "queued",
    tier: payload.tier,
    kind: payload.kind,
    imageUrl: payload.imageUrl,
    userId: payload.userId ?? null,
    reservationId: payload.reservationId ?? null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  await saveGenesisJob(record)

  const workerUrl = resolveWorkerUrl(base)
  const client = new Client({ token })

  const flowKey = process.env.LUMINA_GENESIS_FLOW_KEY?.trim() || "lumina-genesis"
  const parallelism = Math.max(1, Number(process.env.LUMINA_GENESIS_FLOW_PARALLELISM ?? "4") || 4)
  const rate = Math.max(1, Number(process.env.LUMINA_GENESIS_FLOW_RATE_PER_MIN ?? "120") || 120)

  const body: Record<string, unknown> = {
    kind: payload.kind,
    imageUrl: payload.imageUrl,
    tier: payload.tier,
    userId: payload.userId ?? null,
    reservationId: payload.reservationId ?? null,
    jobId,
  }
  if (!hasSigning && legacySecret) {
    body.secret = legacySecret
  }

  try {
    const timeoutSec = Math.min(400, Math.max(30, Number(process.env.LUMINA_GENESIS_WORKER_TIMEOUT_SEC ?? "290") || 290))
    const res = await client.publishJSON({
      url: workerUrl,
      body,
      retries: Number(process.env.LUMINA_QSTASH_RETRIES ?? "3") || 3,
      timeout: `${BigInt(timeoutSec)}s` as `${bigint}s`,
      flowControl: {
        key: flowKey,
        parallelism,
        rate,
        period: "1m",
      },
      ...(payload.reservationId?.trim()
        ? { deduplicationId: `genesis:${payload.reservationId.trim()}` }
        : {}),
    })

    const messageId =
      res && typeof res === "object" && "messageId" in res
        ? (res as { messageId?: string }).messageId
        : undefined
    await patchGenesisJob(jobId, { messageId })

    return { strategy: "qstash", messageId, jobId }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    await patchGenesisJob(jobId, { status: "failed", message: msg.slice(0, 500) })
    return {
      strategy: "deferred",
      message: `QStash publish failed: ${msg.slice(0, 240)}`,
    }
  }
}

export async function notifyRenderComplete(body: Record<string, unknown>): Promise<void> {
  const url = process.env.LUMINA_RENDER_NOTIFY_URL?.trim()
  if (!url) return
  const key = process.env.LUMINA_RENDER_NOTIFY_KEY?.trim()
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
    },
    body: JSON.stringify({ ...body, at: Date.now() }),
  }).catch(() => {})
}
