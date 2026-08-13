'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { QuickInquiry } from '@/components/site/quick-inquiry';
import { CtaBand } from '@/components/site/cta-band';
import { ContentIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { ROUTES } from '@/lib/content';

export function CapabilityDetail({ slug }: { slug: string }) {
  const { t } = useLang();

  const index = t.capabilities.items.findIndex((c) => c.id === slug);
  if (index < 0) notFound();

  const cap = t.capabilities.items[index];
  const related = t.capabilities.items.filter((c) => c.id !== slug).slice(0, 3);

  return (
    <>
      {/* Each practice has its own photograph in public/brand/capabilities.
          All eight pages previously shared the generic capabilities hero, so
          the page looked identical whichever practice you opened. */}
      <PageHero
        crumb={cap.title}
        eyebrow={t.capabilities.eyebrow}
        title={cap.title}
        lead={cap.summary}
        image={`capabilities/${cap.id}`}
        imagePosition="center 35%"
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <Link
              href={ROUTES.whatWeDo}
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700"
            >
              <ChevronLeft className="h-4 w-4" />
              {t.capabilityPage.backToAll}
            </Link>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Body */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-emerald-400">
                  <ContentIcon name={cap.icon} className="h-6 w-6" />
                </span>
                <h2 className="h-section text-navy-800">{t.capabilityPage.overview}</h2>
                <div className="bridge-rule mt-5" />
                <p className="copy mt-6 text-base">{cap.description}</p>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <p className="eyebrow mb-5 text-saffron-600">{t.common.deliverables}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {cap.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-3.5 text-[0.9rem] text-slate-700"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </Reveal>
            </div>

            {/* Sidebar: enquiry + related */}
            <aside className="lg:col-span-5">
              <Reveal delay={0.1}>
                <QuickInquiry source={cap.id} />
              </Reveal>

              <Reveal delay={0.15} className="mt-6">
                <div className="rounded-2xl border border-slate-200 p-6">
                  <p className="eyebrow mb-4 text-slate-500">{t.capabilityPage.relatedHeading}</p>
                  <ul className="grid gap-1">
                    {related.map((r) => (
                      <li key={r.id}>
                        <Link
                          href={`${ROUTES.whatWeDo}/${r.id}`}
                          className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-navy-700 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-700">
                            <ContentIcon name={r.icon} className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-medium text-slate-700 group-hover:text-navy-800">
                            {r.title}
                          </span>
                          <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
