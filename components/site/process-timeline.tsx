'use client';

import { useLang } from '@/components/providers/language-provider';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function ProcessTimeline() {
  const { t } = useLang();

  return (
    <section className="section bg-slate-50" id="process">
      <div className="container">
        <SectionHeading
          eyebrow={t.process.eyebrow}
          heading={t.process.heading}
          lead={t.process.lead}
          className="mb-14"
        />

        <RevealGroup className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {/* connecting rail on large screens */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-saffron-500/40 via-slate-300 to-emerald-500/40 lg:block"
            aria-hidden="true"
          />

          {t.process.steps.map((step) => (
            <RevealItem key={step.n}>
              <article className="relative h-full rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 font-display text-sm font-extrabold text-emerald-400">
                    {step.n}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <h3 className="h-card text-navy-800">{step.title}</h3>
                <p className="copy mt-2.5 text-[0.9rem]">{step.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
