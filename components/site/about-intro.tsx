'use client';

import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { BridgeDiagram } from '@/components/site/bridge-diagram';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';

export function AboutIntro() {
  const { t } = useLang();

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Diagram */}
          <div className="lg:col-span-5">
            <Reveal>
              <BridgeDiagram />
            </Reveal>

            <Reveal delay={0.12} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="eyebrow mb-2.5 text-saffron-600">{t.about.visionTitle}</p>
                <p className="text-sm leading-relaxed text-slate-700">{t.about.vision}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="eyebrow mb-2.5 text-emerald-700">{t.about.missionTitle}</p>
                <p className="text-sm leading-relaxed text-slate-700">{t.about.mission}</p>
              </div>
            </Reveal>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} lead={t.about.lead} />

            <Reveal delay={0.1} className="mt-6 space-y-4">
              {t.about.body.map((p) => (
                <p key={p.slice(0, 24)} className="copy">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.16} className="mt-8">
              <ButtonLink href={ROUTES.about} variant="outline">
                {t.common.learnMore}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Why organisations work with us" — six short proof points. */
export function WhyUsGrid() {
  const { t } = useLang();

  return (
    <section className="section-sm pb-16 md:pb-20">
      <div className="container">
        <Reveal>
          <h2 className="h-section mb-8 text-navy-800">{t.about.whyUs.heading}</h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.whyUs.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full bg-white p-6 transition-colors hover:bg-slate-50">
                <span className="font-display text-sm font-extrabold text-emerald-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-base font-bold tracking-tight text-navy-800">{item.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-slate-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
