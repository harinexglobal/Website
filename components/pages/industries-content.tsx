'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { IndustriesGrid } from '@/components/site/industries-grid';
import { ImageBanner } from '@/components/site/image-banner';
import { TranslationModule } from '@/components/site/translation-module';
import { CtaBand } from '@/components/site/cta-band';

export function IndustriesContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.nav.industries}
        eyebrow={t.industries.eyebrow}
        title={t.industries.heading}
        lead={t.industries.lead}
        image="industries"
        imagePosition="center 40%"
      />
      <IndustriesGrid showHeading={false} />
      <ImageBanner
        image="bridge"
        eyebrow={t.about.eyebrow}
        heading={t.about.heading}
        body={t.about.lead}
        imagePosition="70% center"
      />
      <TranslationModule />
      <CtaBand />
    </>
  );
}
