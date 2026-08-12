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
import Image from 'next/image';
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
     deck; the counter is a plain index derived from the same value.
     Opacity never drops below 0.85 — a marker that fades out mid-span reads as
     broken rather than atmospheric. */
  const carrierX = useTransform(progress, [0.06, 0.94], ['0%', '100%']);
  const trailWidth = useTransform(progress, [0.06, 0.94], ['0%', '100%']);
  const originDim = useTransform(progress, [0.05, 0.55], [1, 0.7]);
  const destLift = useTransform(progress, [0.4, 0.9], [0.7, 1]);

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
              className="relative w-64 shrink-0 overflow-hidden rounded-2xl border border-saffron-500/30 bg-saffron-500/[0.07]"
            >
              {/* Photograph as the card head, matching the Technology Bridge —
                  the two sections describe the same corridor, so they should not
                  look like they come from different sites. */}
              <div className="relative h-40">
                <Image
                  src={`/brand/markets/${hub.id}.webp`}
                  alt=""
                  width={720}
                  height={432}
                  sizes="16rem"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/10"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/70 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-saffron-300 ring-1 ring-saffron-400/40 backdrop-blur-sm">
                  <Building2 className="h-3 w-3" strokeWidth={2.5} />
                  {t.about.bridgeOriginTag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    {hub.country}
                  </h3>
                  <p className="text-xs text-slate-300">{hub.city}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 p-4">
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

                {/* Deck rail — full strength, with a light running it on a CSS
                    loop so the bridge is alive whether or not anyone scrolls */}
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-0 rounded-full bg-bridge-grad opacity-70" />
                  {/* Travelled portion burns brighter than the rest */}
                  <motion.div
                    style={reduce ? { width: '100%' } : { width: trailWidth }}
                    className="absolute inset-y-0 left-0 rounded-full bg-bridge-grad shadow-[0_0_18px_2px_rgba(16,185,129,0.55)]"
                  />
                  {!reduce && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-20 animate-beam-sweep rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-[1px]"
                    />
                  )}
                </div>

                {/* Carrier.
                    Positioning and centring are split across two elements on
                    purpose: `left` is animated by Motion on the outer node while
                    Tailwind's -translate-x-1/2 sits on the inner one, so the two
                    never contend for the same `transform`. */}
                <motion.div
                  style={reduce ? { left: '50%' } : { left: carrierX }}
                  className="absolute -top-4 z-20"
                >
                  <div className="relative -translate-x-1/2">
                    {/* Halo */}
                    {!reduce && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-halo-pulse rounded-xl bg-emerald-400/40 blur-md"
                      />
                    )}
                    <span className="relative flex items-center gap-2 rounded-xl border border-emerald-300/60 bg-gradient-to-r from-emerald-500 to-emerald-400 px-3 py-2 font-semibold text-navy-950 shadow-[0_0_28px_-2px_rgba(16,185,129,0.9)]">
                      <PackageCheck className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                      <ProgressReadout
                        progress={progress}
                        steps={steps.length}
                        stageLabel={t.about.corridorStageLabel}
                        ofLabel={t.about.corridorOfLabel}
                      />
                    </span>
                    {/* Sparks lifting off the deck as it passes */}
                    {!reduce &&
                      [0, 1, 2].map((i) => (
                        <span
                          key={i}
                          aria-hidden="true"
                          className="absolute -bottom-1 left-1/2 h-1 w-1 animate-spark-rise rounded-full bg-emerald-200"
                          style={{
                            marginLeft: `${(i - 1) * 9}px`,
                            animationDelay: `${i * 0.45}s`,
                          }}
                        />
                      ))}
                  </div>
                </motion.div>

                {/* Pillars */}
                <div className="mt-1 flex justify-around opacity-30" aria-hidden="true">
                  <span className="h-8 w-2 rounded-b bg-gradient-to-b from-slate-300 to-transparent" />
                  <span className="h-11 w-2.5 rounded-b bg-gradient-to-b from-slate-300 to-transparent" />
                  <span className="h-8 w-2 rounded-b bg-gradient-to-b from-slate-300 to-transparent" />
                </div>
              </div>

              <p className="mt-5 text-center text-2xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t.about.corridorHint}
              </p>
            </div>

            {/* Destination */}
            <motion.div
              style={reduce ? undefined : { opacity: destLift }}
              className="relative w-72 shrink-0 overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/25 text-emerald-200 ring-1 ring-emerald-400/50">
                  {!reduce && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 animate-halo-pulse rounded-lg bg-emerald-400/40"
                    />
                  )}
                  <Globe className="relative h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    {t.about.bridgeDestTag}
                  </p>
                  <h3 className="font-display text-base font-bold tracking-tight text-white">
                    {t.about.corridorMarketsLabel}
                  </h3>
                </div>
              </div>

              {/* Photo tiles rather than text pills. Six country names in a
                  bordered box is a list; six photographs is the point being
                  made — that there is somewhere real at the other end. */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {markets.map((m) => (
                  <div key={m.id} className="relative h-16 overflow-hidden rounded-lg">
                    <Image
                      src={`/brand/markets/${m.id}.webp`}
                      alt=""
                      width={720}
                      height={432}
                      sizes="8rem"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-navy-950/25"
                    />
                    <span className="absolute inset-x-0 bottom-0 truncate px-2 pb-1.5 text-[0.7rem] font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {m.country}
                    </span>
                  </div>
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

  /* Floor of 0.4, not 0.25 — a stage that has not been reached yet should still
     be legible, otherwise the row reads as half-broken on first sight. */
  const opacity = useTransform(progress, [start, end], [0.4, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const scale = useTransform(progress, [start, end, end + 0.06], [0.96, 1.05, 1]);
  const border = useTransform(
    progress,
    [start, end],
    ['rgba(255,255,255,0.10)', 'rgba(52,211,153,0.65)'],
  );
  const glow = useTransform(
    progress,
    [start, end],
    ['0 0 0px rgba(16,185,129,0)', '0 0 24px -4px rgba(16,185,129,0.75)'],
  );
  const bg = useTransform(
    progress,
    [start, end],
    ['rgba(255,255,255,0.04)', 'rgba(16,185,129,0.13)'],
  );

  return (
    <motion.div
      style={
        reduce
          ? undefined
          : { opacity, y, scale, borderColor: border, boxShadow: glow, backgroundColor: bg }
      }
      className={cn(
        'rounded-xl border border-white/10 bg-white/[0.04] p-3',
        reduce && 'opacity-100',
      )}
    >
      <span className="font-display text-xs font-extrabold text-emerald-300">{n}</span>
      <p className="mt-1.5 text-[0.72rem] font-medium leading-snug text-slate-200">{title}</p>
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
    <span className="whitespace-nowrap text-[0.72rem] font-bold uppercase tracking-[0.1em]">
      {stageLabel} <motion.span className="tabular-nums">{current}</motion.span> {ofLabel}{' '}
      {String(steps).padStart(2, '0')}
    </span>
  );
}
