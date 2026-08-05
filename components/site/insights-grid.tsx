'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';

/**
 * Cards now come from lib/insights.ts and link to the written article, rather
 * than reading from content.ts and showing "coming soon".
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

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.id}>
              <Link
                href={`${ROUTES.insights}/${item.id}`}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-lg"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-navy-800/5 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-navy-700">
                    {item.category}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-600"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="h-card text-navy-800">{item.title}</h3>
                <p className="copy mt-2.5 text-[0.88rem]">{item.excerpt}</p>

                <p className="mt-auto flex items-center gap-1.5 pt-5 text-2xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {item.minutes} {dict.meta.readingTime}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
