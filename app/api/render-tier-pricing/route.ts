import { NextResponse } from "next/server"
import { getCreditsForTier, type RenderOperation } from "@/lib/rendering/credits"
import { type RenderTier } from "@/lib/rendering/render-config"

/** 순수 계산 — Edge에서 저지연·글로벌 복제 */
export const runtime = "edge"

function isRenderTier(v: unknown): v is RenderTier {
  return v === 1 || v === 2 || v === 3 || v === 4 || v === 5
}

function isRenderOperation(v: unknown): v is RenderOperation {
  return v === "detail_visual" || v === "analysis" || v === "refine_copy"
}

export async function POST(request: Request) {
  let body: { tier?: unknown; operation?: unknown } = {}
  try {
    body = await request.json()
  } catch {
    // ignore
  }

  const tier = body.tier
  const operation = body.operation
  if (!isRenderTier(tier) || !isRenderOperation(operation)) {
    return NextResponse.json({ error: "Invalid tier/operation" }, { status: 400 })
  }

  const credits = getCreditsForTier(tier, operation)
  return NextResponse.json({ tier, operation, credits })
}

