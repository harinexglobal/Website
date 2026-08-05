'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { chatPacks, matchIntent } from '@/lib/chatbot';
import { ROUTES } from '@/lib/content';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  role: 'bot' | 'user';
  text: string;
  link?: { href: string; label: string };
  chips?: string[];
};

export function ChatWidget() {
  const { lang, t } = useLang();
  const pack = chatPacks[lang];
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const make = (m: Omit<Message, 'id'>): Message => ({ ...m, id: (nextId.current += 1) });

  // Seed (and re-seed on language change) with the greeting and starters.
  useEffect(() => {
    setMessages([make({ role: 'bot', text: pack.ui.greeting, chips: pack.starters })]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;

    setMessages((m) => [...m, make({ role: 'user', text: q })]);
    setInput('');
    setThinking(true);

    // Small delay so the exchange reads as a conversation rather than a lookup.
    window.setTimeout(
      () => {
        const intent = matchIntent(q, lang);
        setThinking(false);
        setMessages((m) => [
          ...m,
          intent
            ? make({ role: 'bot', text: intent.answer, link: intent.link, chips: intent.followUps })
            : make({
                role: 'bot',
                text: pack.ui.fallback,
                link: { href: ROUTES.contact, label: pack.ui.contactCta },
                chips: pack.starters.slice(0, 3),
              }),
        ]);
      },
      reduce ? 0 : 420,
    );
  }

  function reset() {
    nextId.current = 0;
    setMessages([make({ role: 'bot', text: pack.ui.greeting, chips: pack.starters })]);
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? pack.ui.close : pack.ui.launcher}
        className={cn(
          'fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-card-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
          open ? 'bg-navy-700' : 'bg-navy-800 hover:bg-navy-700',
        )}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageSquare className="h-5 w-5" />
            <span className="hidden text-sm sm:inline">{pack.ui.launcher}</span>
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
          </>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={pack.ui.title}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 z-[60] flex h-[min(32rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-lg sm:right-5"
          >
            {/* Header */}
            <div className="surface-navy on-navy relative flex items-start justify-between gap-3 p-4">
              <div className="relative">
                <p className="font-display text-sm font-bold text-white">{pack.ui.title}</p>
                <p className="mt-0.5 text-2xs text-slate-400">{pack.ui.subtitle}</p>
              </div>
              <div className="relative flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  aria-label={pack.ui.reset}
                  title={pack.ui.reset}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={pack.ui.close}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[85%]', m.role === 'user' && 'text-right')}>
                    <div
                      className={cn(
                        'inline-block rounded-2xl px-3.5 py-2.5 text-left text-[0.85rem] leading-relaxed',
                        m.role === 'user'
                          ? 'rounded-br-sm bg-navy-800 text-white'
                          : 'rounded-bl-sm border border-slate-200 bg-white text-slate-700',
                      )}
                    >
                      {m.text}

                      {m.link && (
                        <Link
                          href={m.link.href}
                          onClick={() => setOpen(false)}
                          className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                        >
                          {m.link.label}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>

                    {m.chips && m.chips.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => ask(c)}
                            className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[0.7rem] font-medium text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-700"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3.5 py-3">
                    <span className="sr-only">{pack.ui.typing}</span>
                    <span className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="border-t border-slate-200 bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={pack.ui.placeholder}
                  aria-label={pack.ui.placeholder}
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label={pack.ui.send}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron-500 text-white transition-colors hover:bg-saffron-600 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-400">{pack.ui.disclaimer}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
