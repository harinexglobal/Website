'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { AboutIntro, WhyUsGrid } from '@/components/site/about-intro';
import { TeamSection } from '@/components/site/team-section';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { CtaBand } from '@/components/site/cta-band';

export function AboutContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.nav.about}
        eyebrow={t.about.eyebrow}
        title={t.about.heading}
        lead={t.about.lead}
        image="about"
        imagePosition="center 35%"
      />
      <AboutIntro />
      <WhyUsGrid />
      <TeamSection />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
