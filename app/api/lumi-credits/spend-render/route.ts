import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import {
  essenceFreemiumDescription,
  resolveEssenceFreemium,
} from "@/lib/promotion/freemium-rules"
import { getCreditsForTier, type RenderOperation } from "@/lib/rendering/credits"
import { getRenderConfig, type RenderTier } from "@/lib/rendering/render-config"

type Body = {
  userId?: string
  tier: RenderTier
  operation: RenderOperation
  /** 렌더요청 식별(멱등) - 선택 */
  referenceId?: string
}

function resolveUserId(bodyUserId?: string): string | null {
  const v = bodyUserId?.trim()
  if (v) return v
  // 데모/초기 구축용 fallback
  const env = process.env.LUMINA_CREDITS_USER_ID?.trim() || process.env.NEXT_PUBLIC_LUMINA_DEMO_USER_ID?.trim()
  return env || null
}

export const runtime = "nodejs"
export const maxDuration = 20

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Service role required" }, { status: 501 })
  }

  let body: Body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON body required" }, { status: 400 })
  }

  const userId = resolveUserId(body.userId)
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 })
  }

  const { tier, operation, referenceId } = body
  // safety: tier must exist in config
  if (![1, 2, 3, 4, 5].includes(tier)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 })
  }
  getRenderConfig(tier) // throws if missing

  const credits = getCreditsForTier(tier, operation)
  if (credits <= 0) {
    return NextResponse.json({ ok: true, tier, operation, credits, balanceAfter: undefined })
  }

  // idempotency: if referenceId exists, don't double spend (incl. freemium amount 0)
  if (referenceId) {
    const { data: existing, error: exErr } = await supabaseAdmin
      .from("lumi_transactions")
      .select("amount, transaction_type")
      .eq("user_id", userId)
      .eq("transaction_type", "spend")
      .eq("reference_id", referenceId)
      .maybeSingle()

    if (!exErr && existing) {
      const { data: balRow } = await supabaseAdmin
        .from("lumi_balances")
        .select("balance")
        .eq("user_id", userId)
        .maybeSingle()
      return NextResponse.json({
        ok: true,
        tier,
        operation,
        credits,
        balanceAfter: Number(balRow?.balance ?? 0),
        alreadySpent: true,
      })
    }
  }

  const freemium = await resolveEssenceFreemium({
    supabase: supabaseAdmin,
    userId,
    tier,
    operation,
  })

  if (freemium.waived) {
    const { data: balRow } = await supabaseAdmin
      .from("lumi_balances")
      .select("balance")
      .eq("user_id", userId)
      .maybeSingle()
    const currentBal = Number(balRow?.balance ?? 0)

    const { error: freeTxErr } = await supabaseAdmin.from("lumi_transactions").insert({
      user_id: userId,
      transaction_type: "spend",
      amount: 0,
      description: essenceFreemiumDescription(referenceId),
      reference_id: referenceId ?? null,
    })
    if (freeTxErr) {
      return NextResponse.json({ error: freeTxErr.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      tier,
      operation,
      credits: 0,
      creditsNominal: credits,
      balanceAfter: currentBal,
      freemium: { waived: true, reason: freemium.reason },
    })
  }

  const { data: balData, error: balErr } = await supabaseAdmin
    .from("lumi_balances")
    .select("balance")
    .eq("user_id", userId)
    .maybeSingle()

  if (balErr) return NextResponse.json({ error: balErr.message }, { status: 500 })
  const current = Number(balData?.balance ?? 0)
  if (current < credits) {
    return NextResponse.json({
      ok: false,
      tier,
      operation,
      creditsRequired: credits,
      balance: current,
    }, { status: 402 })
  }

  const balanceAfter = current - credits

  const { error: updErr } = await supabaseAdmin
    .from("lumi_balances")
    .update({ balance: balanceAfter })
    .eq("user_id", userId)

  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 })

  const { error: txErr } = await supabaseAdmin.from("lumi_transactions").insert({
    user_id: userId,
    transaction_type: "spend",
    amount: credits,
    description: `render:${operation}:tier${tier}`,
    reference_id: referenceId ?? null,
  })

  if (txErr) {
    // balance는 이미 차감됐을 수 있으나, 여기서는 서비스 안정성을 위해 에러 반환 대신 OK를 유지합니다.
    // 운영에서는 DB 트랜잭션/함수로 원자성 확보를 권장합니다.
    return NextResponse.json({ ok: true, tier, operation, credits, balanceAfter })
  }

  return NextResponse.json({
    ok: true,
    tier,
    operation,
    credits,
    balanceAfter,
  })
}

