import type { Metadata } from 'next';
import { CinematicHero } from '@/components/site/cinematic/cinematic-hero';
import { StatsBar } from '@/components/site/stats-bar';
import { AboutIntro, WhyUsGrid } from '@/components/site/about-intro';
import { TechnologyBridge } from '@/components/site/technology-bridge';
import { ServiceRail } from '@/components/site/service-rail';
import { Engagements } from '@/components/site/engagements';
import { GlobalNetwork } from '@/components/site/global-network';
import { IndustriesGrid } from '@/components/site/industries-grid';
import { TranslationModule } from '@/components/site/translation-module';
import { HomeBanner } from '@/components/site/home-banner';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { CtaBand } from '@/components/site/cta-band';

/**
 * A self-referencing canonical, which every other route already had and the
 * homepage did not. Search Console reported "User-declared canonical: None"
 * and had selected an unrelated domain instead — while the domain was still
 * forwarding through Porkbun, Googlebot saw a redirect and concluded the
 * other page was the original. A page that does not name itself lets the
 * crawler decide, and it decided wrongly.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <StatsBar />
      <AboutIntro variant="home" />
      {/* What we do, before how we are organised to do it. The rail replaces the
          tab interface rather than joining it: both list the same practices, and
          the detailed version belongs on /capabilities where someone has already
          chosen to go deeper. */}
      <ServiceRail />
      <TechnologyBridge />
      <WhyUsGrid />
      <Engagements />
      <GlobalNetwork />
      <IndustriesGrid />
      <TranslationModule />
      <HomeBanner />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
