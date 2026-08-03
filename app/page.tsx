import { Hero } from '@/components/site/hero';
import { StatsBar } from '@/components/site/stats-bar';
import { AboutIntro, WhyUsGrid } from '@/components/site/about-intro';
import { CapabilitiesTabs } from '@/components/site/capabilities-tabs';
import { IndustriesGrid } from '@/components/site/industries-grid';
import { TranslationModule } from '@/components/site/translation-module';
import { GlobalNetwork } from '@/components/site/global-network';
import { HomeBanner } from '@/components/site/home-banner';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { TeamSection } from '@/components/site/team-section';
import { AdvisoryBoard } from '@/components/site/advisory-board';
import { CtaBand } from '@/components/site/cta-band';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutIntro variant="home" />
      <WhyUsGrid />
      <CapabilitiesTabs />
      <GlobalNetwork />
      <IndustriesGrid />
      <TranslationModule />
      <HomeBanner />
      <ProcessTimeline />
      <TeamSection />
      <AdvisoryBoard />
      <CtaBand />
    </>
  );
}
