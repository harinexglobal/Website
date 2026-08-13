'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronLeft, Clock } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { QuickInquiry } from '@/components/site/quick-inquiry';
import { Reveal } from '@/components/ui/reveal';
import { ROUTES } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';

export function InsightDetail({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const dict = insightsDictionaries[lang];

  const article = dict.articles.find((a) => a.id === slug);
  if (!article) notFound();

  const related = dict.articles.filter((a) => a.id !== slug).slice(0, 3);

  return (
    <>
      {/* Each article has its own photograph in public/brand/insights,
          generated alongside the cards on the index but never used here —
          the detail pages opened on plain navy. */}
      <PageHero
        crumb={article.title}
        eyebrow={article.category}
        title={article.title}
        lead={article.excerpt}
        image={`insights/${article.id}`}
        imagePosition="center 40%"
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <Link
              href={ROUTES.insights}
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700"
            >
              <ChevronLeft className="h-4 w-4" />
              {dict.meta.backToAll}
            </Link>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Body */}
            <article className="lg:col-span-8">
              <Reveal className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-200 pb-6 text-sm text-slate-500">
                <span className="rounded-full bg-navy-800/5 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-navy-700">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {article.minutes} {dict.meta.readingTime}
                </span>
                <span>
                  {dict.meta.published}{' '}
                  <time dateTime={article.date}>{article.date}</time>
                </span>
              </Reveal>

              <Reveal>
                <p className="text-lg leading-relaxed text-slate-700">{article.intro}</p>
              </Reveal>

              <div className="mt-10 space-y-9">
                {article.sections.map((s) => (
                  <Reveal key={s.h} as="section">
                    <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-navy-800 sm:text-2xl">
                      {s.h}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {s.p.map((para) => (
                        <p key={para.slice(0, 28)} className="copy">
                          {para}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Takeaway */}
              <Reveal className="mt-12">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-50/60 p-6 sm:p-7">
                  <p className="eyebrow mb-3 text-emerald-700">{dict.meta.takeawayHeading}</p>
                  <p className="text-[1.02rem] leading-relaxed text-navy-800">{article.takeaway}</p>
                </div>
              </Reveal>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <Reveal delay={0.1}>
                  <QuickInquiry source={`insight:${article.id}`} />
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <p className="eyebrow mb-4 text-slate-500">{dict.meta.relatedHeading}</p>
                    <ul className="grid gap-1">
                      {related.map((r) => (
                        <li key={r.id}>
                          <Link
                            href={`${ROUTES.insights}/${r.id}`}
                            className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                          >
                            <span className="min-w-0">
                              <span className="block text-2xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                                {r.category}
                              </span>
                              <span className="block text-sm font-medium leading-snug text-slate-700 group-hover:text-navy-800">
                                {r.title}
                              </span>
                            </span>
                            <ArrowRight className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="rounded-2xl bg-navy-800 p-6 text-white">
                    <h2 className="h-card">{dict.meta.ctaHeading}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{dict.meta.ctaBody}</p>
                    <Link
                      href={ROUTES.letsConnect}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      {t.common.requestConsultation}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
