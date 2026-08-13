'use client';

import { ArrowRight, Info } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { Reveal } from '@/components/ui/reveal';

/**
 * Collaborators — a sub-page of Global Markets.
 *
 * Sits under /markets rather than /about because each organisation here is
 * anchored to a market: the page is what turns "seven markets" from a claim
 * into named work. /about stays about who HariNex is.
 *
 * Deliberately honest about being short. Two live engagements presented plainly
 * beats a wall of logos the firm cannot stand behind, and the note at the foot
 * says so rather than leaving a visitor to wonder.
 */
export function CollaboratorsContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.collaborators.heading}
        eyebrow={t.collaborators.eyebrow}
        title={t.collaborators.heading}
        lead={t.collaborators.lead}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            {t.collaborators.items.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.1} as="article">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-lg sm:p-8">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-bridge-grad" />

                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-navy-800/5 px-3 py-1.5 text-xs font-semibold text-navy-700">
                      {c.from}
                      <ArrowRight className="h-3 w-3 text-saffron-500" aria-hidden="true" />
                      {c.to}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {t.collaborators.statusLabel}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-navy-800 sm:text-2xl">
                    {c.name}
                  </h2>

                  <dl className="mt-4 grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                    <div>
                      <dt className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {t.collaborators.marketLabel}
                      </dt>
                      <dd className="mt-1 text-[0.9rem] font-medium text-slate-700">{c.country}</dd>
                    </div>
                    <div>
                      <dt className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {t.collaborators.sectorLabel}
                      </dt>
                      <dd className="mt-1 text-[0.9rem] font-medium text-slate-700">{c.sector}</dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {t.collaborators.workLabel}
                  </p>
                  <p className="copy mt-2 flex-1">{c.work}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-[0.88rem] leading-relaxed text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
              {t.collaborators.note}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
