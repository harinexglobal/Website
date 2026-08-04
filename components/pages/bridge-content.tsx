'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { WhyTaiwanIndia } from '@/components/site/why-taiwan-india';
import { GlobalNetwork } from '@/components/site/global-network';
import { ImageBanner } from '@/components/site/image-banner';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { CtaBand } from '@/components/site/cta-band';

export function BridgeContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.nav.bridge}
        eyebrow={t.bridge.eyebrow}
        title={t.bridge.heading}
        lead={t.bridge.lead}
        image="trade-routes"
        imagePosition="center 45%"
      />
      <GlobalNetwork />
      <WhyTaiwanIndia />
      <ImageBanner
        image="india-growth"
        eyebrow={t.about.bridgeLabel}
        heading={t.about.heading}
        body={t.about.lead}
        imagePosition="60% center"
      />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
