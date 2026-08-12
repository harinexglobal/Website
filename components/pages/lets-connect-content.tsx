'use client';

import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { ContentIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT, ROUTES } from '@/lib/content';

/**
 * Let's Connect — routing, not a fourth contact form.
 *
 * Three enquiries reach the firm and they need three different people. Each card
 * carries the enquiry type through to the contact form as a query parameter, so
 * whoever opens it knows which conversation it is before reading a word.
 *
 * One form, three doors. Three separate forms would triple the validation, the
 * delivery paths and the places a change has to be made.
 */
export function LetsConnectContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.letsConnect.eyebrow}
        eyebrow={t.letsConnect.eyebrow}
        title={t.letsConnect.heading}
        lead={t.letsConnect.lead}
        image="contact"
        imagePosition="center 35%"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {t.letsConnect.items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1} as="article">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-card-lg sm:p-7">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-bridge-grad" />

                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-emerald-300">
                    <ContentIcon name={item.icon} className="h-6 w-6" />
                  </span>

                  <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-navy-800">
                    {item.title}
                  </h2>
                  <p className="copy mt-3 flex-1">{item.body}</p>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {t.letsConnect.routeLabel}
                    </p>
                    <p className="mt-1 text-[0.85rem] font-medium text-slate-700">{item.route}</p>
                  </div>

                  <Link
                    href={`${ROUTES.contact}?enquiry=${item.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy-800 transition-colors group-hover:text-emerald-700"
                  >
                    {item.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-[0.88rem] leading-relaxed text-slate-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
              <span>
                {t.contact.responseNote}{' '}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold text-emerald-700 underline-offset-4 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
