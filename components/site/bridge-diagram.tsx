'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftRight, Building2 } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ContentIcon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

/**
 * The technology bridge: Taiwan as the technology origin, feeding every market
 * where we have someone on the ground.
 *
 * Earlier this was a two-pillar Taiwan ↔ India diagram. It now fans out to all
 * destination markets, driven by `network.locations` so adding a market to the
 * network adds it here automatically rather than needing a second edit.
 */
export function BridgeDiagram() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const hub = t.network.locations.find((l) => l.type === 'hq');
  const destinations = t.network.locations.filter((l) => l.type !== 'hq');

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10,25,47,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,25,47,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <p className="eyebrow relative mb-6 text-saffron-600">{t.about.bridgeLabel}</p>

      <div className="relative">
        {/* Origin */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-saffron-500/25 bg-saffron-50/60 p-5"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-saffron-600 ring-1 ring-saffron-500/20">
              <Building2 className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold tracking-tight text-navy-800">
                {t.about.bridgeOrigin}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.about.bridgeOriginRole}</p>
              {hub && <p className="mt-1.5 text-xs text-slate-500">{hub.city}, {hub.country}</p>}
            </div>
          </div>
        </motion.div>

        {/* Connector: one trunk fanning out to each destination */}
        <div className="relative flex h-14 items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 240 56" className="h-full w-full" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bd-grad" x1="0" y1="0" x2="0" y2="56" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8821E" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <path
              d="M120,0 V20 M120,20 H26 V56 M120,20 H120 V56 M120,20 H214 V56"
              stroke="url(#bd-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={reduce ? undefined : 'animate-dash-flow'}
            />
          </svg>

          <span className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-700 shadow-sm">
            <ArrowLeftRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>

        {/* Destination markets */}
        <div className="grid gap-3 sm:grid-cols-3">
          {destinations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
              className={cn(
                'rounded-xl border p-4',
                loc.core
                  ? 'border-emerald-500/30 bg-emerald-50/60'
                  : 'border-slate-200 bg-slate-50',
              )}
            >
              <span
                className={cn(
                  'mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1',
                  loc.core ? 'text-emerald-600 ring-emerald-500/20' : 'text-navy-700 ring-slate-200',
                )}
              >
                <ContentIcon name={loc.core ? 'factory' : 'handshake'} className="h-4 w-4" />
              </span>

              <h4 className="font-display text-base font-bold leading-tight tracking-tight text-navy-800">
                {loc.country}
              </h4>
              <p className="mt-0.5 text-xs text-slate-500">{loc.city}</p>

              {loc.core && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  {t.network.coreLabel}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{t.about.bridgeDestRole}</p>
      </div>
    </div>
  );
}
