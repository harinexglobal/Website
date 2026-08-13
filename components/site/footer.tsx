'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SocialLinks } from '@/components/ui/social-links';
import { useLang } from '@/components/providers/language-provider';
import { CONTACT, ROUTES } from '@/lib/content';

/**
 * Footer, restructured on the pattern the big advisory firms use.
 *
 * It used to open with a logo, a blurb and a wall of equal-weight links —
 * a sitemap, which is a thing you scan for a name you already know. It now
 * opens with an invitation and four large actions, and only then lists the
 * rest. The columns are labelled so the eye can skip whole groups.
 *
 * The social icons sit under a "Follow us" label rather than floating beside
 * the brand: an unlabelled row of glyphs is a puzzle, and the label costs one
 * line.
 *
 * Colours are unchanged — navy surface, slate text, emerald on hover. Only
 * the structure and the labelling moved.
 */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const actions = [
    { href: ROUTES.letsConnect, label: t.footer.getInTouch },
    { href: ROUTES.whereWeWork, label: t.footer.viewLocations },
    { href: ROUTES.team, label: t.footer.meetTeam },
    { href: ROUTES.whoWeAre, label: t.footer.learnAbout },
  ];

  const company = [
    { href: ROUTES.whoWeAre, label: t.nav.whoWeAre },
    { href: ROUTES.team, label: t.nav.team },
    { href: ROUTES.industries, label: t.nav.sectorsWeWorkIn },
    { href: ROUTES.howWeHelp, label: t.nav.howWeHelp },
    { href: ROUTES.whereWeWork, label: t.nav.whereWeWork },
    { href: ROUTES.collaborators, label: t.nav.collaborators },
    { href: ROUTES.insights, label: t.nav.insights },
  ];

  const legal = [
    { href: '/privacy', label: t.footer.privacy },
    { href: '/terms', label: t.footer.terms },
    { href: '/disclaimer', label: t.footer.disclaimer },
  ];

  return (
    <footer className="surface-navy on-navy">
      <div className="container relative">
        {/* Invitation + the four things people come here to do */}
        <div className="grid gap-10 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.footer.connectHeading}
            </h2>

            <ul className="mt-7 space-y-3.5">
              {actions.map((a) => (
                <li key={a.label}>
                  <Link
                    href={a.href}
                    className="group inline-flex items-center gap-2 text-lg font-medium text-slate-200 transition-colors hover:text-emerald-400 sm:text-xl"
                  >
                    {a.label}
                    <ArrowRight
                      className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-400"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* What we do — two sub-columns, as eight in one column is a wall */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.capabilitiesHeading}
            </h3>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {t.capabilities.items.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`${ROUTES.whatWeDo}/${c.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {c.short ?? c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.companyHeading}
            </h3>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.contactHeading}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span className="break-all">{CONTACT.email}</span>
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
                  {t.contact.whatsappLabel}
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

        {/* Brand line + Follow us */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href={ROUTES.home} className="inline-flex items-center gap-2.5">
              <span className="rounded-lg bg-white p-1.5">
                <Image
                  src="/brand/logo-mark.png"
                  alt=""
                  width={400}
                  height={374}
                  className="h-7 w-auto"
                />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Hari<span className="text-saffron-400">Nex</span> Global
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{t.footer.blurb}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {t.site.legalName}
              <br />
              {t.site.legalNameAlt}
            </p>
          </div>

          <div className="shrink-0">
            <h3 className="mb-3 text-2xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.footer.followUs}
            </h3>
            <SocialLinks variant="dark" size="md" />
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="max-w-4xl text-xs leading-relaxed text-slate-500">{t.footer.disclaimerBody}</p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-slate-500 transition-colors hover:text-emerald-400"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">
            © {year} {t.site.legalName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
