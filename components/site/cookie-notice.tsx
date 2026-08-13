'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Button, ButtonLink } from '@/components/ui/button';

const STORAGE_KEY = 'harinex.storage-consent';

/**
 * Storage notice.
 *
 * This site sets no advertising or analytics cookies — the only thing it keeps
 * in the browser is the language preference and this acknowledgement. The
 * notice says exactly that rather than the usual vague "we value your privacy",
 * because claiming to use cookies we do not use would make the privacy policy
 * inaccurate.
 *
 * Cloudflare Web Analytics runs on every page and is deliberately NOT gated on
 * this notice: consent under ePrivacy is required for storing or reading data
 * on the visitor's device, and that product stores nothing. Gating it would
 * also make the figures useless, since everyone who ignores the banner would go
 * uncounted. `hasStorageConsent()` stays exported for anything added later that
 * genuinely does write to the browser — that would need the gate.
 */

type Consent = 'accepted' | 'declined';

export function hasStorageConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export function CookieNotice() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        // Let the page settle before interrupting.
        const timer = window.setTimeout(() => setVisible(true), 1200);
        return () => window.clearTimeout(timer);
      }
    } catch {
      /* storage blocked — do not nag, and do not assume consent */
    }
  }, []);

  const decide = (choice: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* nothing we can do; hide the notice for this session anyway */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={t.cookies.title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-card-lg sm:inset-x-5 sm:bottom-5 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 sm:flex">
              <Cookie className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-navy-800">{t.cookies.title}</p>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-slate-600">{t.cookies.body}</p>

              <ul className="mt-3 grid gap-1.5">
                {t.cookies.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.8rem] text-slate-600">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button size="sm" onClick={() => decide('accepted')}>
                  {t.cookies.accept}
                </Button>
                <Button size="sm" variant="outline" onClick={() => decide('declined')}>
                  {t.cookies.decline}
                </Button>
                <ButtonLink href="/privacy" variant="link" className="ml-1 text-xs font-semibold">
                  {t.cookies.policy}
                </ButtonLink>
              </div>
            </div>

            <button
              type="button"
              onClick={() => decide('declined')}
              aria-label={t.cookies.decline}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:text-navy-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
