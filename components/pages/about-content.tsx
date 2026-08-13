'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
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
      {/* No page hero. It carried the same eyebrow, heading and lead as the
          section below it, so the page opened by saying everything twice — and
          a still photograph directly above a film of the same subject made the
          repetition louder. The film section is the hero now. */}
      <AboutIntro video="about" crumb={t.nav.whoWeAre} />
      <TechnologyBridge />
      {/* Anchor targets for the Who We Are menu. scroll-mt clears the fixed
          header, which would otherwise sit over the heading being jumped to. */}
      <div id="why-us" className="scroll-mt-24">
        <WhyUsGrid />
      </div>
      <GlobalNetwork />
      <TeamTeaser />
      <div id="approach" className="scroll-mt-24">
        <ProcessTimeline />
      </div>
      <CtaBand />
    </>
  );
}

/**
 * The roster itself lives only on /who-we-are/team. This is a pointer to it, so the
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
