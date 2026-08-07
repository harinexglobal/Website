'use client';

import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';

/**
 * `variant` picks which copy block to render: the homepage uses the shorter
 * "Welcome" text, the About page uses the fuller About narrative.
 */
export function AboutIntro({ variant = 'about' }: { variant?: 'home' | 'about' }) {
  const { t } = useLang();
  const copy =
    variant === 'home'
      ? { eyebrow: t.welcome.eyebrow, heading: t.welcome.heading, lead: undefined, body: t.welcome.body }
      : { eyebrow: t.about.eyebrow, heading: t.about.heading, lead: t.about.lead, body: t.about.body };

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Narrative leads now that the bridge diagram has its own full-width
              section — the copy no longer has to share the fold with a widget. */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} lead={copy.lead} />

            <Reveal delay={0.1} className="mt-6 space-y-4">
              {copy.body.map((p) => (
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

          {/* Vision & mission */}
          <div className="lg:col-span-5">
            <Reveal className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-saffron-500" />
                <p className="eyebrow mb-3 text-saffron-600">{t.about.visionTitle}</p>
                <p className="text-[0.95rem] leading-relaxed text-slate-700">{t.about.vision}</p>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-emerald-500" />
                <p className="eyebrow mb-3 text-emerald-700">{t.about.missionTitle}</p>
                <p className="text-[0.95rem] leading-relaxed text-slate-700">{t.about.mission}</p>
              </div>
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
