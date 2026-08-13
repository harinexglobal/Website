'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { buildIndex, searchIndex, type SearchResult } from '@/lib/search';
import { cn } from '@/lib/utils';

/**
 * Site search.
 *
 * Everything the site says fits in the bundle already, so this searches an
 * index built from the same dictionaries the pages render — no service, no
 * request, no result that can go stale or point somewhere that does not exist.
 *
 * The panel is rendered through a portal into document.body. The header is a
 * fixed, backdrop-filtered element, and a filter on an ancestor makes it the
 * containing block for `position: fixed` descendants — the overlay would be
 * trapped inside the header and clipped. That is the same bug that hid the
 * mobile menu in August and the contact form's success modal this month.
 */
export function SiteSearch({ className }: { className?: string }) {
  const { t, lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  const index = useMemo(() => buildIndex(lang), [lang]);
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  useEffect(() => setActive(0), [query]);

  /* Ctrl/Cmd-K opens, Esc closes — the shortcuts people already try. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => input.current?.focus(), 40);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(id);
    };
  }, [open]);

  const go = (r: SearchResult) => {
    setOpen(false);
    router.push(r.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.nav.search}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-navy-800',
          className,
        )}
      >
        <Search className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span className="hidden xl:inline">{t.nav.search}</span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[90] flex items-start justify-center bg-navy-900/60 p-4 pt-[12vh] backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label={t.nav.search}
                  className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-card-lg"
                >
                  <div className="flex items-center gap-3 border-b border-slate-200 px-4">
                    <Search className="h-5 w-5 shrink-0 text-slate-400" strokeWidth={2} />
                    <input
                      ref={input}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder={t.nav.searchPlaceholder}
                      aria-label={t.nav.searchPlaceholder}
                      className="h-14 flex-1 bg-transparent text-base text-navy-800 outline-none placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={t.nav.searchHint}
                      className="shrink-0 rounded p-1.5 text-slate-400 transition-colors hover:text-navy-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {query.trim() !== '' && (
                    <div className="max-h-[55vh] overflow-y-auto p-2">
                      {results.length === 0 ? (
                        <p className="px-3 py-6 text-center text-sm text-slate-500">
                          {t.nav.searchEmpty}
                        </p>
                      ) : (
                        <ul>
                          {results.map((r, i) => (
                            <li key={r.id}>
                              <Link
                                href={r.href}
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setActive(i)}
                                className={cn(
                                  'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors',
                                  i === active ? 'bg-slate-100' : 'hover:bg-slate-50',
                                )}
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-semibold text-navy-800">
                                    {r.title}
                                  </span>
                                  <span className="mt-0.5 line-clamp-1 block text-xs text-slate-500">
                                    {r.detail}
                                  </span>
                                </span>
                                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-2xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                                  {r.group}
                                </span>
                                {i === active && (
                                  <CornerDownLeft
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
