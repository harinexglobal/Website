'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { CONTACT, ROUTES } from '@/lib/content';

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-navy on-navy">
      <div className="container relative">
        {/* Top */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={ROUTES.home} className="inline-flex items-center gap-2.5">
              <span className="rounded-lg bg-white p-1.5">
                <Image src="/brand/logo-mark.png" alt="" width={400} height={374} className="h-7 w-auto" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Hari<span className="text-saffron-400">Nex</span> Global
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{t.footer.blurb}</p>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              {t.site.legalName}
              <br />
              {t.site.legalNameAlt}
            </p>

            <a
              href={CONTACT.linkedin}
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.capabilitiesHeading}
            </h2>
            <ul className="space-y-2.5">
              {t.capabilities.items.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`${ROUTES.capabilities}#${c.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.companyHeading}
            </h2>
            <ul className="space-y-2.5">
              {[
                { href: ROUTES.about, label: t.nav.about },
                { href: ROUTES.industries, label: t.nav.industries },
                { href: ROUTES.bridge, label: t.nav.bridge },
                { href: ROUTES.insights, label: t.nav.insights },
                { href: ROUTES.contact, label: t.nav.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.contactHeading}
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span>
                    {t.contact.whatsappLabel}
                    <span className="block text-xs text-slate-500">{CONTACT.phone}</span>
                  </span>
                </a>
              </li>
              {t.contact.offices.map((o) => (
                <li key={o.city} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span>
                    {o.city}
                    <span className="block text-xs text-slate-500">{o.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 py-6">
          <p className="max-w-4xl text-xs leading-relaxed text-slate-500">{t.footer.disclaimerBody}</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} {t.site.legalName}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[t.footer.privacy, t.footer.terms, t.footer.disclaimer].map((l) => (
              <li key={l}>
                <span className="text-xs text-slate-500 transition-colors hover:text-slate-300">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
