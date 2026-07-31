'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { ContentIcon } from '@/components/ui/icon';
import { ROUTES } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [capsOpen, setCapsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setCapsOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open
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
        setCapsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const links = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.capabilities, label: t.nav.capabilities, hasMenu: true },
    { href: ROUTES.industries, label: t.nav.industries },
    { href: ROUTES.bridge, label: t.nav.bridge },
    { href: ROUTES.insights, label: t.nav.insights },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white/80 backdrop-blur-sm',
      )}
    >
      <div className="container">
        <div className={cn('flex items-center justify-between gap-4 transition-all', scrolled ? 'h-16' : 'h-20')}>
          {/* Logo */}
          <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2.5" aria-label={t.site.name}>
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={400}
              height={374}
              priority
              className={cn('w-auto transition-all', scrolled ? 'h-8' : 'h-10')}
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-tight text-forest-600">
                Hari<span className="text-saffron-500">Next</span>{' '}
                <span className="text-forest-600">Global</span>
              </span>
              <span className="mt-1 hidden text-[0.62rem] font-medium uppercase tracking-[0.14em] text-slate-500 sm:block">
                {t.site.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((link) =>
              link.hasMenu ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setCapsOpen(true)}
                  onMouseLeave={() => setCapsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive(link.href)
                        ? 'text-navy-800'
                        : 'text-slate-600 hover:text-navy-800',
                    )}
                    aria-expanded={capsOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform', capsOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </Link>

                  <AnimatePresence>
                    {capsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-card-lg">
                          <p className="px-3 pb-2 pt-1.5 text-2xs uppercase tracking-[0.16em] text-slate-400">
                            {t.nav.capabilitiesIntro}
                          </p>
                          <div className="grid grid-cols-2 gap-0.5">
                            {t.capabilities.items.map((c) => (
                              <Link
                                key={c.id}
                                href={`${ROUTES.capabilities}#${c.id}`}
                                className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                              >
                                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy-800/5 text-navy-700 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-600">
                                  <ContentIcon name={c.icon} className="h-4 w-4" />
                                </span>
                                <span className="text-[0.82rem] font-medium leading-snug text-slate-700 group-hover:text-navy-800">
                                  {c.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive(link.href) ? 'text-navy-800' : 'text-slate-600 hover:text-navy-800',
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher lang={lang} setLang={setLang} />

            <ButtonLink href={ROUTES.contact} size="sm" className="hidden sm:inline-flex">
              {t.common.requestConsultation}
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

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-50 bg-white lg:hidden"
          >
            <div className="container flex h-20 items-center justify-between">
              <span className="font-display text-lg font-extrabold text-forest-600">
                Hari<span className="text-saffron-500">Next</span> Global
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

            <nav className="container flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto pb-8" aria-label="Mobile">
              <Link
                href={ROUTES.home}
                className="border-b border-slate-100 py-4 font-display text-2xl font-bold text-navy-800"
              >
                {t.nav.home}
              </Link>

              {links.map((link) => (
                <div key={link.href} className="border-b border-slate-100">
                  <Link href={link.href} className="block py-4 font-display text-2xl font-bold text-navy-800">
                    {link.label}
                  </Link>
                  {link.hasMenu && (
                    <ul className="-mt-1 grid gap-1 pb-4">
                      {t.capabilities.items.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`${ROUTES.capabilities}#${c.id}`}
                            className="flex items-center gap-2 py-1.5 text-sm text-slate-600"
                          >
                            <ContentIcon name={c.icon} className="h-4 w-4 text-emerald-600" />
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <Link
                href={ROUTES.contact}
                className="border-b border-slate-100 py-4 font-display text-2xl font-bold text-navy-800"
              >
                {t.nav.contact}
              </Link>

              <ButtonLink href={ROUTES.contact} size="lg" className="mt-6 w-full">
                {t.common.requestConsultation}
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: 'en' | 'zh';
  setLang: (l: 'en' | 'zh') => void;
}) {
  return (
    <div
      className="flex items-center rounded-lg border border-slate-300 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={cn(
          'rounded-md px-2 py-1.5 transition-colors',
          lang === 'en' ? 'bg-navy-800 text-white' : 'text-slate-500 hover:text-navy-800',
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('zh')}
        aria-pressed={lang === 'zh'}
        className={cn(
          'rounded-md px-2 py-1.5 transition-colors',
          lang === 'zh' ? 'bg-navy-800 text-white' : 'text-slate-500 hover:text-navy-800',
        )}
      >
        繁中
      </button>
    </div>
  );
}
