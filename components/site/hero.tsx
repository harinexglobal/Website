'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarCheck, MapPin } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { BLUR } from '@/lib/blur';
import { ROUTES } from '@/lib/content';

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="on-navy relative isolate overflow-hidden bg-navy-900">
      {/* Artwork */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/brand/hero.webp"
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR.hero}
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
      </div>

      {/* Navy scrim — the artwork is busy on the left (Taipei 101, bridge), so the
          headline gets a dedicated gradient rather than relying on the photo. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/30 lg:via-navy-900/70 lg:to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-navy-900/25 sm:bg-transparent" aria-hidden="true" />
      {/* Blend into the navy stats bar below */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-900 to-transparent"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="flex min-h-[38rem] flex-col justify-center py-28 lg:min-h-[44rem] lg:py-32">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div {...rise(0.05)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tightest text-white sm:text-5xl lg:text-[3.4rem]">
              {t.hero.titleLines.map((line, i) => (
                <motion.span key={line} className="block" {...rise(0.12 + i * 0.09)}>
                  {i === 2 ? (
                    <span className="bg-gradient-to-r from-saffron-400 to-emerald-400 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
              {...rise(0.42)}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.52)}>
              <ButtonLink href={ROUTES.capabilities} size="lg">
                {t.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={`${ROUTES.contact}#inquiry`} variant="ghostLight" size="lg">
                <CalendarCheck className="h-4 w-4" />
                {t.hero.secondaryCta}
              </ButtonLink>
            </motion.div>

            {/* Bilateral connector */}
            <motion.div className="mt-12" {...rise(0.62)}>
              <BilateralConnector taipei={t.hero.taipei} india={t.hero.india} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Animated Taipei ↔ India link — the "bridge" motif in miniature. */
function BilateralConnector({ taipei, india }: { taipei: string; india: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Node label={taipei} tone="saffron" />

      <svg
        viewBox="0 0 160 40"
        className="h-10 w-24 shrink-0 sm:w-36"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M2 30 Q80 -2 158 30"
          stroke="url(#bridgeStroke)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          className="animate-dash-flow"
        />
        <circle r="2.5" fill="#10B981">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M2 30 Q80 -2 158 30" />
        </circle>
        <defs>
          <linearGradient id="bridgeStroke" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8821E" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      <Node label={india} tone="emerald" />
    </div>
  );
}

function Node({ label, tone }: { label: string; tone: 'saffron' | 'emerald' }) {
  const ring = tone === 'saffron' ? 'bg-saffron-500' : 'bg-emerald-500';
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className={`absolute inline-flex h-full w-full rounded-full ${ring} opacity-30 animate-pulse-node`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${ring}`} />
      </span>
      <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
        <MapPin className="h-3 w-3 text-slate-400" aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}
