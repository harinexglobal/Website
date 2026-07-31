'use client';

import { ArrowLeftRight, BadgeCheck, FileText } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';

/** The dedicated Big4-style technical translation showcase. */
export function TranslationModule() {
  const { t } = useLang();

  return (
    <section className="surface-navy on-navy section" id="translation">
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t.translation.eyebrow}
              heading={t.translation.heading}
              lead={t.translation.lead}
              invert
            />

            {/* Language pair badge */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <span className="font-display text-base font-bold text-white">繁體中文</span>
              <ArrowLeftRight className="h-4 w-4 text-emerald-400" strokeWidth={2} />
              <span className="font-display text-base font-bold text-white">English</span>
            </div>

            <p className="copy-invert mt-6">{t.translation.body}</p>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="eyebrow mb-4 text-emerald-400">{t.translation.qualityHeading}</p>
              <ul className="space-y-2.5">
                {t.translation.quality.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2} />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ButtonLink href={`${ROUTES.capabilities}#technical-translation`} variant="ghostLight" className="mt-8">
              {t.common.learnMore}
            </ButtonLink>
          </div>

          {/* Document type grid */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-slate-400">{t.translation.docTypesHeading}</p>

            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {t.translation.docTypes.map((d) => (
                <RevealItem key={d.title}>
                  <div className="group h-full rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-emerald-400/30 hover:bg-white/[0.07]">
                    <FileText
                      className="mb-3 h-5 w-5 text-slate-400 transition-colors group-hover:text-emerald-400"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <h3 className="text-[0.95rem] font-semibold text-white">{d.title}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-400">{d.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
