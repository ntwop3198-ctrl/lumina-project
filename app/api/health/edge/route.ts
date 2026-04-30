import { NextResponse } from "next/server"

export const runtime = "edge"

/** 글로벌 엣지 핑 — 콜드 스타트 없는 경량 경로 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    runtime: "edge",
    t: Date.now(),
  })
}
