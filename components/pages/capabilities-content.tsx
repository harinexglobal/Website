'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { CapabilitiesTabs } from '@/components/site/capabilities-tabs';
import { TranslationModule } from '@/components/site/translation-module';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { CtaBand } from '@/components/site/cta-band';

export function CapabilitiesContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.nav.capabilities}
        eyebrow={t.capabilities.eyebrow}
        title={t.capabilities.heading}
        lead={t.capabilities.lead}
        image="capabilities"
        imagePosition="center 30%"
      />
      <CapabilitiesTabs showHeading={false} />
      <TranslationModule />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
