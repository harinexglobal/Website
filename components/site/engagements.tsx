'use client';

import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Current mandates.
 *
 * The first credibility section on the site that names anyone. Everywhere else
 * I have kept invented figures and testimonials off deliberately — these are
 * real, named, in-progress engagements, which is worth more than a counter
 * that cannot be checked.
 *
 * Worded as work in progress rather than outcomes, because that is what it is.
 * No volumes, no values, no results claimed.
 */
export function Engagements() {
  const { t } = useLang();

  return (
    <section className="section bg-white" id="engagements">
      <div className="container">
        <SectionHeading
          eyebrow={t.engagements.eyebrow}
          heading={t.engagements.heading}
          lead={t.engagements.lead}
          className="mb-10"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {t.engagements.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} as="article">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-lg sm:p-7">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-bridge-grad"
                />

                {/* Direction of travel — the thing that makes it ours */}
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-navy-800/5 px-3 py-1.5 text-xs font-semibold text-navy-700">
                    {item.from}
                    <ArrowRight className="h-3 w-3 text-saffron-500" aria-hidden="true" />
                    {item.to}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {t.engagements.statusLabel}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-navy-800">
                  {item.title}
                </h3>

                <p className="copy mt-3 flex-1">{item.body}</p>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-5">
                  <div>
                    <p className="font-display text-base font-bold text-navy-800">{item.client}</p>
                    <p className="mt-0.5 text-[0.8rem] text-slate-500">{item.clientMeta}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {t.engagements.sectorLabel}
                    </p>
                    <p className="mt-0.5 text-[0.82rem] font-medium text-slate-600">{item.sector}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
