import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual";
import { AlchemistEngineSection } from "@/components/landing/midnight/alchemist-engine-section";
import { ConvictionRoadmapSection } from "@/components/landing/midnight/conviction-roadmap-section";
import { MidnightFooterCta } from "@/components/landing/midnight/midnight-footer-cta";
import { EssenceShortformSection } from "@/components/landing/midnight/essence-shortform-section";
import { GenesisAlliancePromoSection } from "@/components/landing/midnight/genesis-alliance-promo-section";
import { LuminaHeritageStoryBridge } from "@/components/landing/midnight/lumina-heritage-story-bridge";
import { MidnightHero } from "@/components/landing/midnight/midnight-hero";
import { TrinityRotatingMagicSection } from "@/components/landing/midnight/trinity-rotating-magic-section";
import { NakedTruthCoverSection } from "@/components/landing/midnight/naked-truth-cover-section";
import { PersonaGenesisWizard } from "@/components/landing/midnight/persona-genesis-wizard";
import { GodClassShowcaseWindow } from "@/components/landing/midnight/god-class-showcase-window";
import { TrustPerformanceSection } from "@/components/landing/midnight/trust-performance-section";
import { MidnightPhilosophySection } from "@/components/landing/midnight/midnight-philosophy-section";
import { MidnightLandingHashScroll } from "@/components/landing/midnight-landing-hash-scroll";
import { LuminaMidnightHomeProviders } from "@/components/providers/lumina-midnight-home-providers";
import { FieldSeriesPreviewSection } from "@/components/landing/midnight/field-series-preview-section";

export default function Home() {
  return (
    <LuminaMidnightHomeProviders>
      <MidnightLandingHashScroll />
      <a
        href="#lumina-main-content"
        className="sr-only z-[120] rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#0E192B] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <main id="lumina-main-content" className="min-h-screen">
        <GlobalHeaderBilingual variant="midnight" />
        <section id="hero" aria-label="Hero">
          <MidnightHero />
          <FieldSeriesPreviewSection />
        </section>

        <section id="value" aria-label="Value highlights">
          <LuminaHeritageStoryBridge />
          <TrinityRotatingMagicSection />
          <NakedTruthCoverSection />
          <GenesisAlliancePromoSection />
          <EssenceShortformSection />
          <GodClassShowcaseWindow />
        </section>

        <section id="trust" aria-label="Trust and transparency">
          <TrustPerformanceSection />
          <AlchemistEngineSection />
          <ConvictionRoadmapSection />
        </section>

        <section id="final-cta" aria-label="Final call to action">
          <PersonaGenesisWizard />
          <MidnightPhilosophySection />
          <MidnightFooterCta />
        </section>
      </main>
    </LuminaMidnightHomeProviders>
  );
}
