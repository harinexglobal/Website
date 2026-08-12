'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { AboutIntro, WhyUsGrid } from '@/components/site/about-intro';
import { TechnologyBridge } from '@/components/site/technology-bridge';
import { GlobalNetwork } from '@/components/site/global-network';
import { ProcessTimeline } from '@/components/site/process-timeline';
import { CtaBand } from '@/components/site/cta-band';
import { Reveal } from '@/components/ui/reveal';
import { ROUTES } from '@/lib/content';

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
        video="about"
        imagePosition="center 35%"
      />
      <AboutIntro />
      <TechnologyBridge />
      <WhyUsGrid />
      <GlobalNetwork />
      <TeamTeaser />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}

/**
 * The roster itself lives only on /about/team. This is a pointer to it, so the
 * two pages never drift apart.
 */
function TeamTeaser() {
  const { t } = useLang();
  const count =
    t.leadership.people.length + t.regional.people.length;

  return (
    <section className="section-sm pb-16 md:pb-20">
      <div className="container">
        <Reveal>
          <Link
            href={ROUTES.team}
            className="group flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-colors hover:border-slate-300 hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <div>
              <p className="eyebrow mb-3 text-saffron-600">{t.team.eyebrow}</p>
              <h2 className="h-section text-navy-800">{t.team.heading}</h2>
              <p className="copy mt-3 max-w-2xl">{t.team.lead}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="text-right">
                <span className="block font-display text-4xl font-extrabold text-emerald-600">
                  {count}
                </span>
                <span className="text-2xs uppercase tracking-[0.14em] text-slate-500">
                  {t.team.eyebrow}
                </span>
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
