'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftRight, Building2, Factory } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';

/**
 * The Taiwan ↔ India technology bridge.
 * R&D / technology origin on the left, industrial scale-up + market entry
 * on the right, with a live bidirectional channel between them.
 */
export function BridgeDiagram() {
  const { t } = useLang();
  const reduce = useReducedMotion();

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

      <div className="relative grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
        <Pillar
          tone="saffron"
          icon={<Building2 className="h-5 w-5" strokeWidth={1.75} />}
          title={t.about.bridgeOrigin}
          body={t.about.bridgeOriginRole}
          delay={0}
        />

        {/* Connector */}
        <div className="relative flex items-center justify-center py-2 sm:py-0">
          <svg
            viewBox="0 0 120 40"
            className="h-10 w-full max-w-[7rem] rotate-90 sm:rotate-0"
            fill="none"
            aria-hidden="true"
          >
            <line
              x1="4"
              y1="20"
              x2="116"
              y2="20"
              stroke="url(#bd-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={reduce ? undefined : 'animate-dash-flow'}
            />
            <defs>
              <linearGradient id="bd-grad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8821E" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          <span className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-700 shadow-sm">
            <ArrowLeftRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>

        <Pillar
          tone="emerald"
          icon={<Factory className="h-5 w-5" strokeWidth={1.75} />}
          title={t.about.bridgeDest}
          body={t.about.bridgeDestRole}
          delay={0.12}
        />
      </div>
    </div>
  );
}

function Pillar({
  tone,
  icon,
  title,
  body,
  delay,
}: {
  tone: 'saffron' | 'emerald';
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) {
  const accent =
    tone === 'saffron'
      ? 'bg-saffron-50 text-saffron-600 ring-saffron-500/20'
      : 'bg-emerald-50 text-emerald-600 ring-emerald-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-slate-200 bg-white/80 p-5 backdrop-blur-sm"
    >
      <span className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${accent}`}>
        {icon}
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight text-navy-800">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
    </motion.div>
  );
}
