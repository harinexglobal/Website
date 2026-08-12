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
