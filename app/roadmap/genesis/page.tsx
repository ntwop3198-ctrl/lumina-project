import type { Metadata } from "next"
import { RoadmapJourneyDetailView } from "@/components/landing/midnight/roadmap-journey-detail-view"
import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual"
import { MidnightFooterCta } from "@/components/landing/midnight/midnight-footer-cta"
import {
  ROADMAP_GENESIS_META_TITLE_EN,
  ROADMAP_GENESIS_META_TITLE_KO,
} from "@/lib/lumina/lumina-roadmap-journey-pages-copy"

export const metadata: Metadata = {
  title: `${ROADMAP_GENESIS_META_TITLE_KO} · LUMINA`,
  description:
    "0에서 1로 — 이름·서사·시각 문법을 한 흐름으로. 루미나 Brand Genesis 여정의 기준을 설명합니다.",
  openGraph: {
    title: `LUMINA — ${ROADMAP_GENESIS_META_TITLE_EN}`,
    description: "From zero to one: naming, narrative, and visual grammar as one coherent system.",
  },
}

export default function RoadmapGenesisPage() {
  return (
    <main className="min-h-screen lumina-midnight-landing text-foreground">
      <GlobalHeaderBilingual variant="midnight" />
      <RoadmapJourneyDetailView variant="genesis" />
      <MidnightFooterCta />
    </main>
  )
}
