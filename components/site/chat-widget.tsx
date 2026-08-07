'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, RotateCcw, Send, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { chatPacks, matchIntent } from '@/lib/chatbot';
import { ROUTES } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Hari AI — hybrid assistant.
 *
 * Order of resolution:
 *   1. Rule-based knowledge base, matched in the browser. Free, instant, and
 *      incapable of inventing an answer — this is where the high-stakes topics
 *      (NDAs, IP, fees, regulatory) are answered verbatim.
 *   2. If nothing matches AND NEXT_PUBLIC_CHAT_AI is on, POST to /api/chat for
 *      a grounded Claude answer.
 *   3. Otherwise the honest "I don't have a reliable answer" fallback.
 *
 * Step 2 is the only step that costs anything, and it never runs unless the
 * rules miss. With the flag off there is no network call at all.
 */

const AI_ENABLED = process.env.NEXT_PUBLIC_CHAT_AI === 'true';

type Message = {
  id: number;
  role: 'bot' | 'user';
  text: string;
  link?: { href: string; label: string };
  chips?: string[];
  ai?: boolean;
};

export function ChatWidget() {
  const { lang } = useLang();
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

  const push = (m: Omit<Message, 'id'>) => setMessages((prev) => [...prev, make(m)]);

  const pushFallback = () =>
    push({
      role: 'bot',
      text: pack.ui.fallback,
      link: { href: ROUTES.contact, label: pack.ui.contactCta },
      chips: pack.starters.slice(0, 3),
    });

  async function ask(question: string) {
    const q = question.trim();
    if (!q || thinking) return;

    push({ role: 'user', text: q });
    setInput('');
    setThinking(true);

    // 1. Knowledge base first — free, instant, cannot hallucinate.
    const intent = matchIntent(q, lang);
    if (intent) {
      window.setTimeout(
        () => {
          setThinking(false);
          push({ role: 'bot', text: intent.answer, link: intent.link, chips: intent.followUps });
        },
        reduce ? 0 : 380,
      );
      return;
    }

    // 2. No match — hand off to the AI only if it is switched on.
    if (!AI_ENABLED) {
      window.setTimeout(
        () => {
          setThinking(false);
          pushFallback();
        },
        reduce ? 0 : 380,
      );
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, lang }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true; answer: string }
        | { ok: false }
        | null;

      setThinking(false);
      if (data && data.ok && data.answer) {
        push({ role: 'bot', text: data.answer, ai: true });
      } else {
        pushFallback();
      }
    } catch {
      setThinking(false);
      pushFallback();
    }
  }

  function reset() {
    nextId.current = 0;
    setMessages([make({ role: 'bot', text: pack.ui.greeting, chips: pack.starters })]);
  }

  return (
    <>
      {/* Launcher — floats gently so it reads as live without demanding attention */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? pack.ui.close : pack.ui.launcher}
        initial={reduce ? false : { opacity: 0, scale: 0.8, y: 20 }}
        animate={
          reduce
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 1, scale: 1, y: open ? 0 : [0, -5, 0] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                opacity: { duration: 0.4, delay: 0.8 },
                scale: { type: 'spring', stiffness: 260, damping: 18, delay: 0.8 },
                y: open
                  ? { duration: 0.3 }
                  : { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 },
              }
        }
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        className={cn(
          'group fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
          open ? 'bg-navy-700' : 'bg-navy-800 hover:bg-navy-700',
        )}
      >
        {/* Expanding halo */}
        {!open && !reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-emerald-400/25"
            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        {open ? (
          <X className="relative h-5 w-5" />
        ) : (
          <>
            {/* Avatar sits on a white disc: the artwork is line-drawn in gold
                and red, which disappears against the navy button. */}
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/40">
              <Image
                src="/brand/chat-avatar.png"
                alt=""
                width={192}
                height={192}
                className="h-full w-full object-contain p-0.5"
              />
            </span>
            <span className="relative hidden text-sm sm:inline">{pack.ui.launcher}</span>
          </>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={pack.ui.title}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.96 }}
            transition={
              reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }
            }
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-20 right-4 z-[60] flex h-[min(32rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-lg sm:right-5"
          >
            {/* Header */}
            <div className="surface-navy on-navy relative flex items-start justify-between gap-3 p-4">
              <div className="relative flex items-center gap-2.5">
                <motion.span
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/30"
                  animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
                  transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/brand/chat-avatar.png"
                    alt=""
                    width={192}
                    height={192}
                    className="h-full w-full object-contain p-0.5"
                  />
                </motion.span>
                <span>
                  <span className="block font-display text-sm font-bold text-white">
                    {pack.ui.title}
                  </span>
                  <span className="mt-0.5 block text-2xs text-slate-400">{pack.ui.subtitle}</span>
                </span>
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
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 30, mass: 0.6 }
                    }
                    className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
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
                        <motion.div
                          className="mt-2 flex flex-wrap gap-1.5"
                          initial={reduce ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={reduce ? undefined : { delay: 0.15 }}
                        >
                          {m.chips.map((c) => (
                            <motion.button
                              key={c}
                              type="button"
                              onClick={() => ask(c)}
                              whileHover={reduce ? undefined : { scale: 1.04 }}
                              whileTap={reduce ? undefined : { scale: 0.96 }}
                              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[0.7rem] font-medium text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-700"
                            >
                              {c}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {thinking && (
                <motion.div
                  className="flex justify-start"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3.5 py-3">
                    <span className="sr-only">{pack.ui.typing}</span>
                    <span className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-slate-400"
                          animate={reduce ? undefined : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={
                            reduce
                              ? undefined
                              : { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
                          }
                        />
                      ))}
                    </span>
                  </div>
                </motion.div>
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
                  maxLength={500}
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  aria-label={pack.ui.send}
                  whileHover={reduce ? undefined : { scale: 1.08 }}
                  whileTap={reduce ? undefined : { scale: 0.9 }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron-500 text-white transition-colors hover:bg-saffron-600 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="mt-2 text-[0.65rem] leading-relaxed text-slate-400">
                {pack.ui.disclaimer}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
