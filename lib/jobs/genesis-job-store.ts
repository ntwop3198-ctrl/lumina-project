import { getUpstashRedis } from "@/lib/infra/upstash-redis"

const PREFIX = "lumina:genesis:job:"
const JOB_TTL_SEC = Math.max(
  3600,
  Number.parseInt(process.env.LUMINA_GENESIS_JOB_TTL_SEC?.trim() || "172800", 10) || 172800,
)

export type GenesisJobStatus = "queued" | "processing" | "completed" | "failed"

export type GenesisJobRecord = {
  jobId: string
  status: GenesisJobStatus
  tier: number
  kind: string
  imageUrl: string
  userId?: string | null
  reservationId?: string | null
  createdAt: number
  updatedAt: number
  message?: string
  messageId?: string
}

export async function saveGenesisJob(record: GenesisJobRecord): Promise<void> {
  const redis = getUpstashRedis()
  if (!redis) return
  try {
    await redis.set(`${PREFIX}${record.jobId}`, JSON.stringify(record), { ex: JOB_TTL_SEC })
  } catch {
    /* non-fatal */
  }
}

export async function patchGenesisJob(
  jobId: string,
  patch: Partial<Omit<GenesisJobRecord, "jobId">>,
): Promise<void> {
  const redis = getUpstashRedis()
  if (!redis) return
  try {
    const raw = await redis.get<string>(`${PREFIX}${jobId}`)
    if (raw == null) return
    const prev =
      typeof raw === "string" ? (JSON.parse(raw) as GenesisJobRecord) : (raw as GenesisJobRecord)
    const next: GenesisJobRecord = {
      ...prev,
      ...patch,
      jobId,
      updatedAt: Date.now(),
    }
    await redis.set(`${PREFIX}${jobId}`, JSON.stringify(next), { ex: JOB_TTL_SEC })
  } catch {
    /* non-fatal */
  }
}

export async function getGenesisJob(jobId: string): Promise<GenesisJobRecord | null> {
  const redis = getUpstashRedis()
  if (!redis) return null
  try {
    const raw = await redis.get<string>(`${PREFIX}${jobId}`)
    if (raw == null) return null
    return typeof raw === "string"
      ? (JSON.parse(raw) as GenesisJobRecord)
      : (raw as GenesisJobRecord)
  } catch {
    return null
  }
}
