'use client';

import { ArrowRight, Info, Wrench } from 'lucide-react';
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

          {/* Delivery partners are kept apart from the client engagements above.
              Both are "organisations we work with", but one is work we were
              hired to do and the other is capability we do not have — filing a
              subcontractor among the clients would read as a client, which is
              the one thing this page must not get wrong. */}
          <Reveal delay={0.2} className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy-800">
              {t.collaborators.partnersHeading}
            </h2>
            <p className="copy mt-3 max-w-2xl">{t.collaborators.partnersLead}</p>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {t.collaborators.partners.map((p, i) => (
              <Reveal key={p.id} delay={0.25 + i * 0.1} as="article">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-card sm:p-8">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-saffron-500" />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/10 px-3 py-1.5 text-xs font-semibold text-saffron-700">
                      <Wrench className="h-3 w-3" aria-hidden="true" />
                      {t.collaborators.partnersHeading}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {p.country}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-navy-800">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{p.sector}</p>

                  <p className="mt-5 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {t.collaborators.partnersProvidesLabel}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {p.provides.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.88rem] text-slate-700">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-saffron-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {t.collaborators.partnersModelLabel}
                  </p>
                  <p className="copy mt-2 flex-1">{p.model}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
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
