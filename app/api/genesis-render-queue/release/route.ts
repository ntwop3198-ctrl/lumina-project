import { NextResponse } from "next/server"
import { releaseGenesisReservation } from "@/lib/rendering/genesis-render-queue"

export const runtime = "nodejs"
export const maxDuration = 10

export async function POST(request: Request) {
  let body: { reservationId?: string } = {}
  try {
    body = await request.json()
  } catch {
    // ignore
  }

  const reservationId = body.reservationId?.trim()
  if (!reservationId) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  releaseGenesisReservation(reservationId)
  return NextResponse.json({ ok: true })
}

