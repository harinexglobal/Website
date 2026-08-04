'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { TeamRoster } from '@/components/site/team-roster';
import { GlobalNetwork } from '@/components/site/global-network';
import { CtaBand } from '@/components/site/cta-band';

/**
 * /about/team — the full roster. Every member of the company lives here and
 * nowhere else, so there is a single place to keep up to date.
 */
export function TeamContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.team.eyebrow}
        eyebrow={t.team.eyebrow}
        title={t.team.heading}
        lead={t.team.lead}
        image="about"
        imagePosition="center 35%"
      />

      <TeamRoster />
      <GlobalNetwork />
      <CtaBand />
    </>
  );
}
