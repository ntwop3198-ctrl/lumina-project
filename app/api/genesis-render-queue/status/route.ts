import { NextResponse } from "next/server"
import { checkGenesisReservation } from "@/lib/rendering/genesis-render-queue"

export const runtime = "nodejs"
export const maxDuration = 10

export async function GET(request: Request) {
  const url = new URL(request.url)
  const reservationId = url.searchParams.get("reservationId")?.trim() || ""
  if (!reservationId) {
    return NextResponse.json(
      { reservationId: "", status: "not_found" as const },
      { status: 400 }
    )
  }
  const res = checkGenesisReservation(reservationId)
  return NextResponse.json(res)
}

