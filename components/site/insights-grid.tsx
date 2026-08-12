'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';

/**
 * Cards come from lib/insights.ts and link to the written article.
 *
 * Same card treatment as the capabilities grid — photograph on top, lift and
 * shadow on hover, the image easing up 6%, title and arrow taking the accent.
 * Deliberately identical: both are "here is a set of things, pick one", and two
 * different card languages for the same job is how a site starts feeling
 * assembled rather than designed.
 *
 * The photograph is keyed by article id, so a card cannot illustrate a piece it
 * does not belong to.
 */
export function InsightsGrid({ limit, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const { lang, t } = useLang();
  const dict = insightsDictionaries[lang];
  const items = limit ? dict.articles.slice(0, limit) : dict.articles;

  return (
    <section className="section" id="insights">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow={t.insights.eyebrow}
            heading={t.insights.heading}
            lead={t.insights.lead}
            className="mb-12"
          />
        )}

        <RevealGroup className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.id}>
              <Link
                href={`${ROUTES.insights}/${item.id}`}
                className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-card-lg"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={`/brand/insights/${item.id}.webp`}
                    alt=""
                    width={1200}
                    height={750}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
                  />
                  {/* Category rides the photograph rather than taking a line of
                      its own — it is a filing label, not a heading. */}
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/75 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/20 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-navy-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {item.title}
                  </h3>
                  <p className="copy mt-2.5 flex-1 text-[0.88rem]">{item.excerpt}</p>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-1.5 text-2xs font-medium uppercase tracking-[0.12em] text-slate-400">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {item.minutes} {dict.meta.readingTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-800 transition-colors duration-300 group-hover:text-emerald-700">
                      {t.common.learnMore}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
