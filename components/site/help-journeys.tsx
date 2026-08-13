'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ContentIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { ROUTES } from '@/lib/content';

/**
 * How an engagement usually starts — three journeys into the same practices.
 *
 * This was a page of its own until the architecture brief cut the site to five
 * sections. It was never a ninth service, only a second way into the eight, so
 * it belongs inside What We Do rather than beside it. Folding it in also fixes
 * the failure mode it always had as a standalone page: two pages describing the
 * same work in different words, drifting apart with every edit.
 *
 * Each journey names the practices that do the work and links to them, so this
 * stays navigation and the practice pages remain the single source of truth.
 */
export function HelpJourneys() {
  const { t } = useLang();

  const practice = (id: string) => t.capabilities.items.find((c) => c.id === id);

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-saffron-600">{t.howWeHelp.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
            {t.howWeHelp.heading}
          </h2>
          <p className="copy mt-4 max-w-2xl">{t.howWeHelp.lead}</p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {t.howWeHelp.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} as="article">
              <div className="grid gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card lg:grid-cols-12">
                <div className="relative bg-navy-800 p-6 sm:p-8 lg:col-span-4">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-bridge-grad lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-0.5"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-emerald-400/25">
                    <ContentIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {t.howWeHelp.problemLabel}
                  </p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-slate-300">{item.problem}</p>
                </div>

                <div className="p-6 sm:p-8 lg:col-span-8">
                  <p className="copy">{item.body}</p>

                  <p className="mt-7 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {t.howWeHelp.practicesLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.practices.map((id) => {
                      const c = practice(id);
                      if (!c) return null;
                      return (
                        <Link
                          key={id}
                          href={`${ROUTES.whatWeDo}/${id}`}
                          className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[0.85rem] font-medium text-navy-800 transition-colors hover:border-emerald-500 hover:bg-white hover:text-emerald-700"
                        >
                          {c.short}
                          <ArrowRight
                            className="h-3.5 w-3.5 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                            aria-hidden="true"
                          />
                        </Link>
                      );
                    })}
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
