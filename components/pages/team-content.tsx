'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { TeamSection } from '@/components/site/team-section';
import { RegionalTeam } from '@/components/site/regional-team';
import { AdvisoryBoard } from '@/components/site/advisory-board';
import { GlobalNetwork } from '@/components/site/global-network';
import { CtaBand } from '@/components/site/cta-band';

/**
 * /about/team — the full roster in three explicit tiers: officers of the
 * company, regional directors who represent it in each market, and the
 * advisory board that carries out technical evaluation.
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

      <TeamSection />
      <RegionalTeam />
      <AdvisoryBoard />
      <GlobalNetwork />
      <CtaBand />
    </>
  );
}
