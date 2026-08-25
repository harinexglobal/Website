'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Building2, Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { ContactForm } from '@/components/site/contact-form';
import { Faq } from '@/components/site/faq';
import { ContentIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT } from '@/lib/content';
import type { EnquiryKind } from '@/lib/inquiry-schema';
import { cn } from '@/lib/utils';

/**
 * Let's Connect — one page, three pathways, one form.
 *
 * This replaces the earlier split where a routing page of three cards linked
 * to a separate contact page. The architecture brief was explicit that the
 * three enquiry types should live "within one smart contact form using
 * enquiry-type selection rather than separate pages", and it was right: two
 * pages meant two hero images, two sets of copy and a click between a visitor
 * and the field they came to fill in.
 *
 * The selection is a real form value, not a UI flourish — it is submitted with
 * the enquiry and prefixes the subject line, so whoever opens the mail knows
 * which conversation it is before reading a word.
 *
 * `?enquiry=partner` still works, so the links in the mega menu land with the
 * right pathway already chosen.
 */
function LetsConnect() {
  const { t } = useLang();
  const params = useSearchParams();
  const [enquiry, setEnquiry] = useState<EnquiryKind>('business');

  /* Deep links from the navigation choose the pathway. Guarded against a
     hand-typed value so a bad query string cannot put the form in a state the
     schema will later reject. */
  useEffect(() => {
    const q = params.get('enquiry');
    if (q === 'business' || q === 'partner' || q === 'investor') setEnquiry(q);
  }, [params]);

  return (
    <>
      <PageHero
        crumb={t.nav.letsConnect}
        eyebrow={t.letsConnect.eyebrow}
        title={t.letsConnect.heading}
        lead={t.letsConnect.lead}
        image="contact"
        imagePosition="center 40%"
      />

      <section className="section">
        <div className="container">
          {/* Pathway selection */}
          <Reveal>
            <p className="eyebrow mb-4 text-saffron-600">{t.nav.enquiriesLabel}</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {t.letsConnect.items.map((item) => {
                const active = enquiry === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEnquiry(item.id as EnquiryKind)}
                    aria-pressed={active}
                    className={cn(
                      'group relative flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6',
                      active
                        ? 'border-emerald-500 bg-white shadow-card-lg ring-1 ring-emerald-500/20'
                        : 'border-slate-200 bg-white shadow-card hover:-translate-y-0.5 hover:border-slate-300',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                          active ? 'bg-emerald-600 text-white' : 'bg-navy-800 text-emerald-300',
                        )}
                      >
                        <ContentIcon name={item.icon} className="h-5 w-5" />
                      </span>
                      {active && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 font-display text-lg font-bold tracking-tight text-navy-800">
                      {item.title}
                    </h2>
                    <p className="copy mt-2 flex-1 text-[0.88rem]">{item.body}</p>

                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {t.letsConnect.routeLabel}
                      </p>
                      <p className="mt-1 text-[0.82rem] font-medium text-slate-700">{item.route}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm enquiry={enquiry} />
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
                  <p className="eyebrow mb-5 text-saffron-600">{t.contact.infoHeading}</p>

                  <ul className="space-y-5">
                    {t.contact.offices.map((o) => (
                      <li key={o.city} className="flex gap-3.5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy-700 shadow-sm">
                          <MapPin className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy-800">{o.city}</p>
                          <p className="text-sm text-emerald-700">{o.role}</p>
                          <p className="mt-0.5 text-[0.82rem] leading-relaxed text-slate-500">{o.detail}</p>
                          {'email' in o && o.email && (
                            <a
                              href={`mailto:${o.email}`}
                              className="mt-1 inline-block break-all text-[0.82rem] font-medium text-emerald-700 underline-offset-4 hover:underline"
                            >
                              {o.email}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <p className="eyebrow mb-4 text-slate-500">{t.contact.directHeading}</p>

                    <ul className="space-y-3">
                      <li>
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="flex items-center gap-3 text-sm font-medium text-navy-800 transition-colors hover:text-emerald-700"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                          <span>
                            {CONTACT.email}
                            <span className="block text-xs font-normal text-slate-500">
                              {t.contact.emailLabel}
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href={`tel:${CONTACT.phoneHref}`}
                          className="flex items-center gap-3 text-sm font-medium text-navy-800 transition-colors hover:text-emerald-700"
                        >
                          <Phone className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                          <span>
                            {CONTACT.phone}
                            <span className="block text-xs font-normal text-slate-500">
                              {t.contact.mobileLabel}
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href={CONTACT.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm font-medium text-navy-800 transition-colors hover:text-emerald-700"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                          <span>
                            {CONTACT.phone}
                            <span className="block text-xs font-normal text-slate-500">
                              {t.contact.whatsappLabel}
                            </span>
                          </span>
                        </a>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600">
                        <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                        <span>
                          {t.site.legalName}
                          <span className="block text-slate-500">{t.site.legalNameAlt}</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50">
        <Faq />
      </div>
    </>
  );
}

/* useSearchParams needs a Suspense boundary for the page to stay statically
   prerenderable. */
export function LetsConnectContent() {
  return (
    <Suspense fallback={null}>
      <LetsConnect />
    </Suspense>
  );
}
