import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"
export const maxDuration = 15

export async function GET(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role required" }, { status: 501 })
  }

  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")?.trim()
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("lumi_balances")
    .select("balance")
    .eq("user_id", userId)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ userId, balance: Number(data?.balance ?? 0) })
}

