'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { ServiceRail } from '@/components/site/service-rail';
import { CapabilityCards } from '@/components/site/capability-cards';
import { HelpJourneys } from '@/components/site/help-journeys';
import { TranslationModule } from '@/components/site/translation-module';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { Faq } from '@/components/site/faq';
import { CtaBand } from '@/components/site/cta-band';

export function CapabilitiesContent() {
  const { t } = useLang();

  return (
    <>
      {/* The rail is this page's hero image. A static photograph here said
          nothing the eight panels below do not say better, and the panels are
          the page's own subject rather than decoration over it — so the hero
          carries the words and hands straight over to them. */}
      <PageHero
        crumb={t.nav.whatWeDo}
        eyebrow={t.capabilities.eyebrow}
        title={t.capabilities.heading}
        lead={t.capabilities.lead}
      />
      <ServiceRail showHeading={false} />
      <CapabilityCards showHeading={false} />
      <HelpJourneys />
      <TranslationModule />
      <ProcessTimeline />
      <Faq />
      <CtaBand />
    </>
  );
}
