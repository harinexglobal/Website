'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { ContentIcon } from '@/components/ui/icon';
import { SocialLinks } from '@/components/ui/social-links';
import { ROUTES } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';
import { cn } from '@/lib/utils';

/**
 * Primary navigation — five sections, each with a mega menu.
 *
 * The site previously carried seven flat links (About, Our Team, How We Help,
 * Capabilities, Industries, Global Markets, Insights). That is the shape the
 * architecture brief singled out as reading like a traditional consultancy
 * rather than a global business, so everything now hangs off five headings:
 * Who We Are, What We Do, Where We Work, Insights, Let's Connect.
 *
 * The panel is anchored to the header rather than to the link that opened it.
 * A menu carrying eight practices beside seven sectors will not fit under its
 * own trigger, and anchoring each panel separately makes the columns jump as
 * the pointer moves along the bar. One full-width panel, one position.
 *
 * Every entry points at something that exists. Nothing here links to a filter
 * that was never built or to a section with no anchor — a menu that lies is
 * worse than a short one.
 */

type MenuItem = { href: string; label: string; icon?: string; pin?: boolean };
type MenuColumn = { heading: string; items: MenuItem[]; wide?: boolean };

export function Navbar() {
  const { t, lang, setLang } = useLang();
  /* Articles are keyed by full slug here, not by the short ids in the
     content dictionary. Linking to the latter produced six 404s. */
  const articles = insightsDictionaries[lang].articles;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenId(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpenId(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const sections = useMemo(() => {
    const n = t.nav;

    return [
      {
        id: 'who-we-are',
        href: ROUTES.whoWeAre,
        label: n.whoWeAre,
        intro: n.whoWeAreIntro,
        columns: [
          {
            heading: n.overviewLabel,
            items: [
              { href: ROUTES.whoWeAre, label: n.aboutUs, icon: 'building' },
              { href: ROUTES.team, label: n.team, icon: 'users' },
              { href: `${ROUTES.whoWeAre}#approach`, label: n.approach, icon: 'route' },
              { href: `${ROUTES.whoWeAre}#why-us`, label: n.whyHarinex, icon: 'award' },
            ],
          },
        ] as MenuColumn[],
      },
      {
        id: 'what-we-do',
        href: ROUTES.whatWeDo,
        label: n.whatWeDo,
        intro: n.whatWeDoIntro,
        columns: [
          {
            heading: n.practicesLabel,
            wide: true,
            items: t.capabilities.items.map((c) => ({
              href: `${ROUTES.whatWeDo}/${c.id}`,
              label: c.short ?? c.title,
              icon: c.icon,
            })),
          },
          {
            heading: n.sectorsLabel,
            items: t.industries.items.map((i) => ({
              href: `${ROUTES.industries}#${i.id}`,
              label: i.title,
              icon: i.icon,
            })),
          },
          {
            heading: n.overviewLabel,
            items: [
              { href: ROUTES.whatWeDo, label: n.allPractices, icon: 'layers' },
              { href: ROUTES.howWeHelp, label: n.howWeHelp, icon: 'route' },
            ],
          },
        ] as MenuColumn[],
      },
      {
        id: 'where-we-work',
        href: ROUTES.whereWeWork,
        label: n.whereWeWork,
        intro: n.whereWeWorkIntro,
        columns: [
          {
            heading: n.marketsLabel,
            wide: true,
            items: t.network.locations.map((m) => ({
              href: `${ROUTES.whereWeWork}#${m.id}`,
              label: `${m.city}, ${m.country}`,
              pin: true,
            })),
          },
          {
            heading: n.overviewLabel,
            items: [
              { href: ROUTES.whereWeWork, label: n.whereWeWork, icon: 'globe' },
              { href: ROUTES.collaborators, label: n.collaborators, icon: 'handshake' },
            ],
          },
        ] as MenuColumn[],
      },
      {
        id: 'insights',
        href: ROUTES.insights,
        label: n.insights,
        intro: n.insightsIntro,
        columns: [
          {
            heading: n.topicsLabel,
            wide: true,
            items: articles.map((a) => ({
              href: `${ROUTES.insights}/${a.id}`,
              label: a.title,
            })),
          },
          {
            heading: n.overviewLabel,
            items: [{ href: ROUTES.insights, label: n.allInsights, icon: 'book' }],
          },
        ] as MenuColumn[],
      },
      {
        id: 'lets-connect',
        href: ROUTES.letsConnect,
        label: n.letsConnect,
        intro: n.letsConnectIntro,
        columns: [
          {
            heading: n.enquiriesLabel,
            items: t.letsConnect.items.map((e) => ({
              href: `${ROUTES.letsConnect}?enquiry=${e.id}`,
              label: e.title,
              icon: e.icon,
            })),
          },
        ] as MenuColumn[],
      },
    ];
  }, [t, articles]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const open = sections.find((s) => s.id === openId) ?? null;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || open
            ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-white/90 backdrop-blur-sm',
        )}
        onMouseLeave={() => setOpenId(null)}
      >
        <div className="container">
          <div
            className={cn(
              'flex items-center justify-between gap-6 transition-all',
              scrolled ? 'h-16' : 'h-[4.5rem]',
            )}
          >
            <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2.5" aria-label={t.site.name}>
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={400}
                height={374}
                priority
                className={cn('w-auto transition-all', scrolled ? 'h-8' : 'h-10')}
              />
              <span className="font-display text-lg font-extrabold leading-none tracking-tight text-forest-600">
                Hari<span className="text-saffron-500">Nex</span> Global
              </span>
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {sections.map((s) => (
                <div key={s.id} onMouseEnter={() => setOpenId(s.id)}>
                  <Link
                    href={s.href}
                    onFocus={() => setOpenId(s.id)}
                    aria-expanded={openId === s.id}
                    aria-haspopup="true"
                    className={cn(
                      'flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive(s.href) || openId === s.id
                        ? 'text-navy-800'
                        : 'text-slate-600 hover:text-navy-800',
                    )}
                  >
                    {s.label}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 text-slate-400 transition-transform',
                        openId === s.id && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden xl:block">
                <SocialLinks size="sm" />
              </div>

              <span aria-hidden="true" className="hidden h-5 w-px bg-slate-200 xl:block" />

              <LanguageSwitcher lang={lang} setLang={setLang} />

              <ButtonLink
                href={ROUTES.letsConnect}
                size="sm"
                className="hidden whitespace-nowrap sm:inline-flex"
              >
                {t.hero.primaryCta}
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-navy-800 lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega panel. Anchored to the header, not to the trigger. */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-slate-200 bg-white shadow-card-lg lg:block"
            >
              <div className="container max-h-[70vh] overflow-y-auto py-7">
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <p className="font-display text-lg font-bold tracking-tight text-navy-800">
                      {open.label}
                    </p>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-slate-600">{open.intro}</p>
                    <Link
                      href={open.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:underline"
                    >
                      {open.label}
                      <ChevronDown className="h-3.5 w-3.5 -rotate-90" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="grid gap-8 lg:col-span-9 lg:grid-cols-3">
                    {open.columns.map((col) => (
                      <div key={col.heading} className={cn(col.wide && 'lg:col-span-2')}>
                        <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {col.heading}
                        </p>
                        <ul className={cn('grid gap-0.5', col.wide && 'sm:grid-cols-2')}>
                          {col.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="group flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-slate-50"
                              >
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-navy-800/5 text-navy-700 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-600">
                                  {item.pin ? (
                                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                  ) : (
                                    <ContentIcon name={item.icon ?? 'file'} className="h-3.5 w-3.5" />
                                  )}
                                </span>
                                <span className="text-[0.82rem] font-medium leading-snug text-slate-700 group-hover:text-navy-800">
                                  {item.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile sheet — the same five sections as accordions. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] overflow-hidden bg-white lg:hidden"
          >
            <div className="container flex h-20 items-center justify-between">
              <span className="font-display text-lg font-extrabold text-forest-600">
                Hari<span className="text-saffron-500">Nex</span> Global
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-navy-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="container flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto overscroll-contain bg-white pb-8"
              aria-label="Mobile"
            >
              <Link
                href={ROUTES.home}
                className="border-b border-slate-100 py-4 font-display text-xl font-bold text-navy-800"
              >
                {t.nav.home}
              </Link>

              {sections.map((s) => {
                const expanded = mobileSection === s.id;
                return (
                  <div key={s.id} className="border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <Link href={s.href} className="flex-1 py-4 font-display text-xl font-bold text-navy-800">
                        {s.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSection(expanded ? null : s.id)}
                        aria-expanded={expanded}
                        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${s.label}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-400"
                      >
                        <ChevronDown
                          className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
                        />
                      </button>
                    </div>

                    {expanded && (
                      <div className="grid gap-4 pb-4">
                        {s.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {col.heading}
                            </p>
                            <ul className="grid gap-0.5">
                              {col.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-2 py-1.5 text-sm text-slate-600"
                                  >
                                    {item.pin ? (
                                      <MapPin className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                    ) : (
                                      <ContentIcon
                                        name={item.icon ?? 'file'}
                                        className="h-4 w-4 shrink-0 text-emerald-600"
                                      />
                                    )}
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <ButtonLink href={ROUTES.letsConnect} size="lg" className="mt-6 w-full">
                {t.hero.primaryCta}
              </ButtonLink>

              <SocialLinks size="md" className="mt-6 justify-center pb-4" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitcher({
  lang,
  setLang,
  tone = 'light',
}: {
  lang: 'en' | 'zh';
  setLang: (l: 'en' | 'zh') => void;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';

  const btn = (active: boolean) =>
    cn(
      'whitespace-nowrap rounded px-2 py-0.5 transition-colors',
      active
        ? dark
          ? 'bg-white/15 text-white'
          : 'bg-navy-800 text-white'
        : dark
          ? 'text-slate-400 hover:text-white'
          : 'text-slate-500 hover:text-navy-800',
    );

  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-0.5 rounded-md p-0.5 text-xs font-semibold',
        dark ? 'border border-white/15' : 'border border-slate-300',
      )}
      role="group"
      aria-label="Language"
    >
      <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'} className={btn(lang === 'en')}>
        EN
      </button>
      <button type="button" onClick={() => setLang('zh')} aria-pressed={lang === 'zh'} className={btn(lang === 'zh')}>
        繁中
      </button>
    </div>
  );
}
