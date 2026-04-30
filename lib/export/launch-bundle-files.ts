import type { LaunchBundleExport, ViralShortformPlan } from "@/lib/shortform/types"

function formatPlan(plan: ViralShortformPlan) {
  const lines: string[] = []
  lines.push(`# ${plan.variantName}`)
  lines.push(`Duration: ${plan.durationSec}s`)
  lines.push("")
  lines.push("## Three-Second Hook (3s)")
  lines.push(
    `Time: ${plan.threeSecHook.startSec}s ~ ${plan.threeSecHook.endSec}s · Stage: ${plan.threeSecHook.stageTag}`
  )
  lines.push(`0.5s Hook: ${plan.hook.startSec}s ~ ${plan.hook.endSec}s`)
  lines.push(`Hook line: ${plan.hook.hookLine}`)
  lines.push(`On-screen keywords: ${plan.hook.onScreenKeywords.join(", ")}`)
  lines.push("")
  lines.push("## High-Retention Edit Points")
  for (const ep of plan.editPoints) {
    lines.push(`- ${ep.timeSec}s: ${ep.newOnScreenText}`)
    lines.push(`  Reason: ${ep.reason}`)
  }
  lines.push("")
  lines.push("## On-screen Text (sequence)")
  for (const t of plan.onScreenText) {
    lines.push(`- ${t}`)
  }
  lines.push("")
  lines.push("## Viral Caption")
  lines.push(plan.caption)
  lines.push("")
  lines.push("## BGM Guide")
  lines.push(`BPM: ${plan.bgm.bpm}`)
  lines.push(`Mood: ${plan.bgm.mood}`)
  lines.push(`Guide: ${plan.bgm.guide}`)
  lines.push("")
  lines.push("## Production Notes")
  for (const n of plan.productionNotes) lines.push(`- ${n}`)
  lines.push("")
  return lines.join("\n")
}

function formatBanner(b: { id: string; headline: string; sub: string; cta: string }) {
  return [
    `# ${b.id}`,
    `Headline: ${b.headline}`,
    `Sub: ${b.sub}`,
    `CTA: ${b.cta}`,
    "",
    `Note: 1) CTR 중심 카피 2) 900원 톤/정가 정책 톤을 브랜드 등급에 맞춰 조절`,
  ].join("\n")
}

export function buildLaunchBundleFiles(exportData: LaunchBundleExport) {
  const rootFolder = "lumina-launch-bundle"
  const files: Array<{ path: string; content: string }> = []

  files.push({
    path: `${rootFolder}/README.txt`,
    content:
      "Lumina Launch Bundle\n\n- Instagram Reels Shorts: 3종\n- Ad Banners: 5종\n\n각 파일은 분석 텍스트 기반으로 Hook/편집점/캡션/BGM 및 배너 문구를 포함합니다.\n",
  })

  exportData.shortforms.slice(0, 3).forEach((plan, idx) => {
    files.push({
      path: `${rootFolder}/instagram_short_${idx + 1}.txt`,
      content: formatPlan(plan),
    })
  })

  exportData.adBanners.slice(0, 5).forEach((b) => {
    const num = b.id.replace(/[^0-9]/g, "")
    const suffix = num ? num : "1"
    files.push({
      path: `${rootFolder}/ad_banner_${suffix}.txt`,
      content: formatBanner(b),
    })
  })

  return files
}

