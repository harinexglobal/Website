'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, type Dict, type Lang } from '@/lib/content';

const STORAGE_KEY = 'harinext.lang';

type LanguageContextValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Restore the visitor's previous choice on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') setLangState(stored);
    } catch {
      /* localStorage unavailable (private mode / blocked) — keep the default */
    }
  }, []);

  // Keep <html lang> honest for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en';
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'zh' : 'en');
  }, [lang, setLang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionaries[lang], setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
