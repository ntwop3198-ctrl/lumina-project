import type { Metadata } from "next"
import { RoadmapJourneyDetailView } from "@/components/landing/midnight/roadmap-journey-detail-view"
import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual"
import { MidnightFooterCta } from "@/components/landing/midnight/midnight-footer-cta"
import {
  ROADMAP_SCALING_META_TITLE_EN,
  ROADMAP_SCALING_META_TITLE_KO,
} from "@/lib/lumina/lumina-roadmap-journey-pages-copy"

export const metadata: Metadata = {
  title: `${ROADMAP_SCALING_META_TITLE_KO} · LUMINA`,
  description:
    "1에서 100으로 — 비주얼 자산·배포·글로벌 스탠다드. 루미나 Luxury Scaling 여정을 설명합니다.",
  openGraph: {
    title: `LUMINA — ${ROADMAP_SCALING_META_TITLE_EN}`,
    description: "From one to one hundred: assets, deployment, and transparent global standards.",
  },
}

export default function RoadmapScalingPage() {
  return (
    <main className="min-h-screen lumina-midnight-landing text-foreground">
      <GlobalHeaderBilingual variant="midnight" />
      <RoadmapJourneyDetailView variant="scaling" />
      <MidnightFooterCta />
    </main>
  )
}
