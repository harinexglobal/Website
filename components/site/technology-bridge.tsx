'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ContentIcon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

/**
 * The Technology Bridge.
 *
 * One wide cinematic panel showing the selected market, with the market rail
 * beneath it. The earlier two-card split gave half the width to an origin card
 * that never changes, and the destination — the part that actually responds to
 * the reader — got the smaller half and a thumbnail. Taiwan is now a single line
 * above the panel, which is all a fixed fact needs, and the destination gets the
 * full width.
 *
 * Everything on screen comes from `network.locations` — role, detail and focus
 * are already written there. Adding a market to the network adds it here, and
 * nothing here asserts a capability the content layer cannot back up.
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
    const id = window.setInterval(() => setActive((i) => (i + 1) % markets.length), 5000);
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
          className="mb-8 max-w-3xl"
        />

        {/* Origin, in one line. It never changes, so it does not need half the
            section — it needs to be stated once and stay stated. */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-saffron-500/25 bg-saffron-500/[0.07] px-4 py-3">
          <span className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.14em] text-saffron-300">
            <Building2 className="h-3.5 w-3.5" strokeWidth={2.5} />
            {t.about.bridgeOriginTag}
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white">
            {hub.country}
          </span>
          <span className="text-xs text-slate-400">{hub.city}</span>
          <span className="hidden text-[0.8rem] text-slate-300 sm:inline">
            {t.about.bridgeOriginRole}
          </span>
        </div>

        {/* The destination, full width. */}
        <div
          role="tabpanel"
          id={`tb-panel-${current.id}`}
          aria-labelledby={`tb-tab-${current.id}`}
          className="relative min-h-[26rem] overflow-hidden rounded-2xl border border-white/10 lg:min-h-[30rem]"
        >
          {/* Keyed on the market, so the photograph and its sweep restart
              together on every change without any imperative reset. */}
          <Image
            key={current.id}
            src={`/brand/markets/${current.id}.webp`}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="absolute inset-0 object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/20 to-transparent"
          />
          {!reduce && (
            <span
              key={`sweep-${current.id}`}
              aria-hidden="true"
              className="bridge-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          )}

          <div className="relative flex h-full min-h-[26rem] flex-col justify-between p-6 sm:p-8 lg:min-h-[30rem] lg:p-10">
            {/* Direction of travel — the bridge, said in one line. */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-950/70 px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.14em] text-saffron-300 ring-1 ring-saffron-400/40 backdrop-blur-sm">
                {hub.country}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-950/70 px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.14em] text-emerald-300 ring-1 ring-emerald-400/40 backdrop-blur-sm">
                {current.core ? t.network.coreLabel : t.network.repLabel}
              </span>
            </div>

            <div className="max-w-2xl">
              <div className="flex items-end gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950/70 text-emerald-300 ring-1 ring-emerald-400/40 backdrop-blur-sm">
                  <ContentIcon name={current.core ? 'factory' : 'handshake'} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-5xl">
                    {current.country}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-300">
                    <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    {current.city === current.country ? current.role : current.city}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[0.92rem] leading-relaxed text-slate-200">{current.detail}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {current.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-lg bg-navy-950/60 px-2.5 py-1.5 text-[0.78rem] font-medium text-slate-200 ring-1 ring-white/15 backdrop-blur-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market rail */}
        <div className="mt-6">
          <p className="eyebrow mb-3 text-slate-500">{t.about.bridgeHint}</p>

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
                    'group relative overflow-hidden rounded-xl border p-3.5 text-left transition-all duration-300',
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
                  {/* Singapore and Australia carry the country as their city, so
                      the second line is dropped rather than repeated. */}
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
