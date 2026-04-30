import { DeeperHero } from "@/components/deeper/deeper-hero"
import { KLuxuryTriangleHero } from "@/components/k-luxury/k-luxury-triangle-hero"
import { MoonWaveWellnessGraph } from "@/components/k-luxury/moon-wave-wellness-graph"

export default function DeeperPrototypePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-cream">
      <KLuxuryTriangleHero />
      <section className="px-4 py-14 max-w-3xl mx-auto">
        <MoonWaveWellnessGraph value={82} label="흡수 체감" />
      </section>
      <DeeperHero />
    </main>
  )
}

