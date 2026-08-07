'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Building2, Globe, PackageCheck } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

/**
 * The scroll-driven corridor.
 *
 * A pinned section where scroll progress carries a marker from the Taiwan side
 * of the bridge to the destination side, lighting each engagement stage as it
 * passes. The payload is `process.steps` — the six stages we actually run —
 * rather than freight, which keeps a decorative section honest: nothing here
 * asserts a capability the content layer cannot back up.
 *
 * Pinning is desktop-only. Below `lg` the container has natural height, the
 * apparatus is dropped and the stages render as a plain list: a 2.6-viewport
 * scroll hijack on a phone is a good way to lose the reader before the
 * articles below it.
 */
export function BridgeCorridor() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const hub = t.network.locations.find((l) => l.type === 'hq');
  const markets = t.network.locations.filter((l) => l.type !== 'hq');
  const steps = t.process.steps;

  /* Transforms are declared here, at the top level. The carrier travels the
     deck; the counter is a plain index derived from the same value. */
  const carrierX = useTransform(progress, [0.08, 0.92], ['0%', '100%']);
  const carrierGlow = useTransform(progress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const originDim = useTransform(progress, [0.05, 0.55], [1, 0.55]);
  const destLift = useTransform(progress, [0.45, 0.95], [0.55, 1]);

  if (!hub) return null;

  return (
    <div ref={ref} className="relative lg:h-[260vh]">
      <div className="surface-navy on-navy lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="container relative py-16 lg:py-0">
          <SectionHeading
            eyebrow={t.about.bridgeLabel}
            heading={t.about.corridorHeading}
            lead={t.about.corridorLead}
            invert
            className="mb-10 max-w-2xl lg:mb-12"
          />

          {/* ── Desktop apparatus ───────────────────────────────────────── */}
          <div className="hidden items-stretch gap-6 lg:flex">
            {/* Origin */}
            <motion.div
              style={reduce ? undefined : { opacity: originDim }}
              className="relative w-64 shrink-0 overflow-hidden rounded-2xl border border-saffron-500/30 bg-saffron-500/[0.07] p-6"
            >
              <span className="inline-flex items-center rounded-full bg-saffron-500/15 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-saffron-300">
                {t.about.bridgeOriginTag}
              </span>
              <span className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-saffron-300 ring-1 ring-saffron-400/25">
                <Building2 className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white">
                {hub.country}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{hub.city}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {hub.focus.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="rounded-md border border-saffron-400/20 bg-saffron-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-saffron-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Corridor */}
            <div className="relative flex flex-1 flex-col justify-center">
              {/* Stage markers */}
              <div className="mb-6 grid grid-cols-6 gap-2">
                {steps.map((s, i) => (
                  <StageChip
                    key={s.n}
                    progress={progress}
                    index={i}
                    total={steps.length}
                    n={s.n}
                    title={s.title}
                    reduce={!!reduce}
                  />
                ))}
              </div>

              {/* Deck */}
              <div className="relative">
                <svg
                  viewBox="0 0 500 40"
                  preserveAspectRatio="none"
                  className="h-10 w-full"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M0 4 Q250 40 500 4" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                  <path d="M0 4 Q125 26 250 4" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <path d="M250 4 Q375 26 500 4" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                </svg>

                <div className="relative h-1 w-full rounded-full bg-bridge-grad opacity-40" />

                {/* Carrier */}
                <motion.div
                  style={reduce ? undefined : { left: carrierX, opacity: carrierGlow }}
                  className="absolute -top-3 z-10 -translate-x-1/2"
                >
                  <span className="flex items-center gap-1.5 rounded-lg border border-emerald-400/40 bg-navy-900 px-2.5 py-1.5 text-emerald-300 shadow-glow">
                    <PackageCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    <ProgressReadout
                      progress={progress}
                      steps={steps.length}
                      stageLabel={t.about.corridorStageLabel}
                      ofLabel={t.about.corridorOfLabel}
                    />
                  </span>
                </motion.div>

                {/* Pillars */}
                <div className="mt-1 flex justify-around opacity-25" aria-hidden="true">
                  <span className="h-8 w-2 rounded-b bg-gradient-to-b from-slate-400 to-transparent" />
                  <span className="h-11 w-2.5 rounded-b bg-gradient-to-b from-slate-400 to-transparent" />
                  <span className="h-8 w-2 rounded-b bg-gradient-to-b from-slate-400 to-transparent" />
                </div>
              </div>

              <p className="mt-5 text-center text-2xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t.about.corridorHint}
              </p>
            </div>

            {/* Destination */}
            <motion.div
              style={reduce ? undefined : { opacity: destLift }}
              className="relative w-72 shrink-0 overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6"
            >
              <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                {t.about.bridgeDestTag}
              </span>
              <span className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-emerald-400/25">
                <Globe className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-white">
                {t.about.corridorMarketsLabel}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-1.5">
                {markets.map((m) => (
                  <span
                    key={m.id}
                    className="truncate rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[0.75rem] font-medium text-slate-300"
                  >
                    {m.country}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Mobile: same content, no pin, nothing moving ─────────────── */}
          <div className="lg:hidden">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-saffron-500/15 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-saffron-300">
                {hub.country}
              </span>
              <span className="h-px flex-1 bg-bridge-grad opacity-50" aria-hidden="true" />
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                {t.about.corridorMarketsLabel}
              </span>
            </div>

            <ol className="mt-6 space-y-3">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="font-display text-sm font-extrabold text-emerald-400">{s.n}</span>
                  <span className="text-[0.9rem] font-semibold leading-snug text-white">
                    {s.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One stage marker.
 *
 * This exists as its own component for a reason worth stating: `useTransform`
 * is a hook, so calling it inside `steps.map()` would break the rules of hooks
 * and fail the build. A component per item is the fix — each instance calls its
 * hooks once, at its own top level.
 */
function StageChip({
  progress,
  index,
  total,
  n,
  title,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  n: string;
  title: string;
  reduce: boolean;
}) {
  const start = (index / total) * 0.85;
  const end = start + 0.12;
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  return (
    <motion.div
      style={reduce ? undefined : { opacity, y }}
      className={cn(
        'rounded-xl border border-white/10 bg-white/[0.04] p-3',
        reduce && 'opacity-100',
      )}
    >
      <span className="font-display text-xs font-extrabold text-emerald-400">{n}</span>
      <p className="mt-1.5 text-[0.72rem] font-medium leading-snug text-slate-300">{title}</p>
    </motion.div>
  );
}

/** Live stage counter riding on the carrier. Reads the real step count. */
function ProgressReadout({
  progress,
  steps,
  stageLabel,
  ofLabel,
}: {
  progress: MotionValue<number>;
  steps: number;
  stageLabel: string;
  ofLabel: string;
}) {
  const current = useTransform(progress, (v) =>
    String(Math.min(steps, Math.max(1, Math.ceil(v * steps) || 1))).padStart(2, '0'),
  );

  return (
    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em]">
      {stageLabel} <motion.span>{current}</motion.span> {ofLabel} {String(steps).padStart(2, '0')}
    </span>
  );
}
