'use client';

import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT, ROUTES } from '@/lib/content';
import { legalDictionaries, type LegalDocKey } from '@/lib/legal';

export function LegalContent({ doc }: { doc: LegalDocKey }) {
  const { lang, t } = useLang();
  const legal = legalDictionaries[lang];
  const d = legal[doc];

  return (
    <>
      <PageHero
        crumb={d.title}
        eyebrow={t.footer.legalHeading}
        title={d.title}
        lead={`${legal.updatedLabel}: ${legal.updated}`}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Contents */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <nav aria-label={d.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <p className="eyebrow mb-4 text-slate-500">{d.title}</p>
                    <ol className="space-y-2">
                      {d.sections.map((s, i) => (
                        <li key={s.h}>
                          <a
                            href={`#s-${i}`}
                            className="flex gap-2.5 text-sm text-slate-600 transition-colors hover:text-emerald-700"
                          >
                            <span className="shrink-0 font-mono text-2xs text-slate-400">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {s.h}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </Reveal>

                <Reveal delay={0.1} className="mt-4">
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <p className="text-sm text-slate-600">{legal.contactLine}</p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 transition-colors hover:text-emerald-700"
                    >
                      <Mail className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                      {CONTACT.email}
                    </a>
                  </div>
                </Reveal>
              </div>
            </aside>

            {/* Body */}
            <article className="lg:col-span-8">
              <Reveal>
                <p className="text-lg leading-relaxed text-slate-700">{d.intro}</p>
              </Reveal>

              <div className="mt-10 space-y-10">
                {d.sections.map((s, i) => (
                  <Reveal key={s.h} as="section">
                    <div id={`s-${i}`} className="scroll-mt-28">
                      <h2 className="font-display text-xl font-bold tracking-tight text-navy-800 sm:text-2xl">
                        <span className="mr-3 font-mono text-sm font-medium text-emerald-600">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s.h}
                      </h2>
                      <div className="mt-4 space-y-4 border-l-2 border-slate-100 pl-5">
                        {s.p.map((para) => (
                          <p key={para.slice(0, 30)} className="copy">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-12 border-t border-slate-200 pt-8">
                <Link
                  href={ROUTES.home}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 transition-colors hover:text-emerald-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {legal.backToHome}
                </Link>
              </Reveal>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
