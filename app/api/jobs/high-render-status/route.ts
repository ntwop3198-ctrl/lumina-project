import { NextResponse } from "next/server"
import { getGenesisJob } from "@/lib/jobs/genesis-job-store"

export const runtime = "nodejs"
export const maxDuration = 10

/** 대시보드 폴링: Genesis 비동기 잡 상태 (Redis). */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const jobId = url.searchParams.get("jobId")?.trim()
  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 })
  }

  const job = await getGenesisJob(jobId)
  if (!job) {
    return NextResponse.json(
      { jobId, status: "unknown", message: "No Redis record or expired" },
      { status: 404 },
    )
  }

  return NextResponse.json({ job })
}
