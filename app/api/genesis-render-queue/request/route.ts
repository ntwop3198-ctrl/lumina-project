import { NextResponse } from "next/server"
import { requestGenesisReservation } from "@/lib/rendering/genesis-render-queue"
import { ApiFeature } from "@/lib/api-usage/features"
import { enforceApiUsageGuard } from "@/lib/api-usage/guard"

export const runtime = "nodejs"
export const maxDuration = 10

export async function POST(request: Request) {
  const guard = await enforceApiUsageGuard(request, ApiFeature.GENESIS_RENDER_QUEUE)
  if (!guard.ok) return guard.response

  let body: { ttlMs?: number } = {}
  try {
    body = await request.json()
  } catch {
    // ignore
  }

  const ttlMs = typeof body.ttlMs === "number" ? body.ttlMs : 45_000
  const res = requestGenesisReservation(ttlMs)
  return NextResponse.json(res)
}

