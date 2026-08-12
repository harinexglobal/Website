'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Building2, MapPin } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ContentIcon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

/**
 * The Technology Bridge.
 *
 * Replaces the old boxed diagram, which had stopped working as the firm grew:
 * a hardcoded three-column connector under six destinations, sat inside a card,
 * inside a narrow column, next to two more cards. Six bordered rectangles in a
 * five-column rail is why it read as dated — nothing to do with the palette.
 *
 * Two changes carry the redesign. It is full-bleed dark, so the section owns the
 * viewport instead of being a widget beside the copy. And it is selectable, so
 * one market is presented properly rather than six being presented badly.
 *
 * Everything on screen comes from `network.locations` — role, detail and focus
 * are already written there. Adding a market to the network adds it here, and
 * nothing here asserts a capability that the content layer cannot back up.
 */
export function TechnologyBridge() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const hub = t.network.locations.find((l) => l.type === 'hq');
  const markets = t.network.locations.filter((l) => l.type !== 'hq');

  const [active, setActive] = useState(0);
  /* Auto-advance is an invitation, not a carousel. The first deliberate
     interaction ends it for good — nothing worse than a panel that moves while
     you are reading it. */
  const [engaged, setEngaged] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (engaged || reduce || markets.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % markets.length), 4200);
    return () => window.clearInterval(id);
  }, [engaged, reduce, markets.length]);

  const select = useCallback((i: number) => {
    setEngaged(true);
    setActive(i);
  }, []);

  /* Roving tabindex — arrow keys move between markets, which is what a
     tablist is expected to do and what a grid of divs never does. */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const last = markets.length - 1;
      let next: number | null = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = last;
      if (next === null) return;
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    },
    [active, markets.length, select],
  );

  const current = markets[active];
  if (!hub || !current) return null;

  return (
    <section className="surface-navy on-navy section" id="technology-bridge">
      <div className="container relative">
        <SectionHeading
          eyebrow={t.about.bridgeLabel}
          heading={t.about.bridgeHeading}
          lead={t.about.bridgeLead}
          invert
          className="mb-12 max-w-3xl"
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Origin — persistent, saffron, never competes for selection */}
          <div className="lg:col-span-4">
            <div className="relative h-full overflow-hidden rounded-2xl border border-saffron-500/25 bg-saffron-500/[0.07] p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-saffron-500/20 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/15 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-saffron-300">
                  {t.about.bridgeOriginTag}
                </span>

                <div className="relative mt-5 h-52 overflow-hidden rounded-xl">
                  <Image
                    src={`/brand/markets/${hub.id}.webp`}
                    alt=""
                    width={720}
                    height={432}
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"
                  />
                  <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy-950/70 text-saffron-300 ring-1 ring-saffron-400/40 backdrop-blur-sm">
                    <Building2 className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">
                  {hub.country}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{hub.city}</p>

                <p className="mt-3 text-[0.82rem] leading-relaxed text-slate-300">{t.about.bridgeOriginRole}</p>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                  {hub.focus.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.76rem] text-slate-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-saffron-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Corridor — the only moving part, and it points somewhere.
              Absolutely positioned on purpose: a viewBox of 8x200 with
              preserveAspectRatio="none" has a 1:25 intrinsic ratio, so an
              in-flow `h-full w-full` SVG resolves its height from its own width
              and drags the grid row to ~2000px. Out of flow, the row is sized by
              the two cards and this just fills whatever they leave. */}
          <div className="relative hidden lg:col-span-1 lg:block" aria-hidden="true">
            <svg
              viewBox="0 0 8 200"
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="tb-flow" x1="4" y1="0" x2="4" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E8821E" />
                  <stop offset="1" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path d="M4 0 V200" stroke="url(#tb-flow)" strokeWidth="1" opacity="0.25" />
              <path
                d="M4 0 V200"
                stroke="url(#tb-flow)"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                className={reduce ? undefined : 'animate-dash-flow'}
              />
            </svg>

            {/* A single bright pulse running origin to destination — the one
                thing that says which way the corridor flows. */}
            {!reduce && (
              <span className="bridge-pulse absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(16,185,129,0.85)]" />
            )}
          </div>

          {/* Destination — one market, presented properly */}
          <div className="lg:col-span-7">
            <div
              role="tabpanel"
              id={`tb-panel-${current.id}`}
              aria-labelledby={`tb-tab-${current.id}`}
              className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl"
              />

              {/* Keyed so the panel re-animates on every change */}
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    {t.about.bridgeDestTag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                    {current.core ? t.network.coreLabel : t.network.repLabel}
                  </span>
                </div>

                {/* The photograph carries a light sweep across it on every
                    change. Keyed on the market id like the panel itself, so the
                    animation restarts naturally on each swap — no forced reflow,
                    no imperative class toggling. */}
                <div className="relative mt-5 h-52 overflow-hidden rounded-xl sm:h-64">
                  <Image
                    src={`/brand/markets/${current.id}.webp`}
                    alt=""
                    width={720}
                    height={432}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent"
                  />
                  {!reduce && (
                    <span
                      aria-hidden="true"
                      className="bridge-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    />
                  )}
                </div>

                <div className="mt-5 flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-emerald-400/25">
                    <ContentIcon
                      name={current.core ? 'factory' : 'handshake'}
                      className="h-5 w-5"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                      {current.country}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      {current.city === current.country ? current.role : current.city}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="eyebrow mb-2.5 text-slate-500">{t.about.bridgeRoleLabel}</p>
                  <p className="text-[0.82rem] leading-relaxed text-slate-300">{current.detail}</p>
                </div>

                <div className="mt-5">
                  <p className="eyebrow mb-3 text-emerald-400">{t.about.bridgeFocusLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {current.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[0.72rem] font-medium text-slate-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Market rail */}
        <div className="mt-8">
          <p className="eyebrow mb-4 text-slate-500">{t.about.bridgeHint}</p>

          <div
            role="tablist"
            aria-label={t.about.bridgeDest}
            onKeyDown={onKeyDown}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
          >
            {markets.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tb-tab-${m.id}`}
                  type="button"
                  aria-selected={on}
                  aria-controls={`tb-panel-${m.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onMouseEnter={() => select(i)}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300',
                    on
                      ? 'border-emerald-400/40 bg-white/[0.09]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 top-0 h-0.5 origin-left bg-bridge-grad transition-transform duration-500',
                      on ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                  <span
                    className={cn(
                      'block font-display text-sm font-bold leading-tight tracking-tight transition-colors',
                      on ? 'text-white' : 'text-slate-300 group-hover:text-white',
                    )}
                  >
                    {m.country}
                  </span>
                  {/* Singapore and Australia carry the country as their city,
                      so the second line is dropped rather than repeated — same
                      collapse the network map does. */}
                  {m.city !== m.country && (
                    <span className="mt-0.5 block truncate text-xs text-slate-500">{m.city}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-[0.9rem] leading-relaxed text-slate-400">
          {t.about.bridgeDestRole}
        </p>
      </div>
    </section>
  );
}
