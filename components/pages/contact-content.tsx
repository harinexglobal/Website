'use client';

import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { ContactForm } from '@/components/site/contact-form';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT } from '@/lib/content';

export function ContactContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.nav.contact}
        eyebrow={t.contact.eyebrow}
        title={t.contact.heading}
        lead={t.contact.lead}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* Offices + direct */}
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
                          <Mail className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                          {CONTACT.email}
                        </a>
                      </li>
                      <li>
                        <a
                          href={`tel:${CONTACT.phoneHref}`}
                          className="flex items-center gap-3 text-sm font-medium text-navy-800 transition-colors hover:text-emerald-700"
                        >
                          <Phone className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                          {CONTACT.phone}
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
    </>
  );
}
