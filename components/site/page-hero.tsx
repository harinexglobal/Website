'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/components/providers/language-provider';
import { BLUR } from '@/lib/blur';
import { ROUTES } from '@/lib/content';

/**
 * Navy hero used at the top of every inner page. When `image` is supplied the
 * photograph sits behind a navy scrim so headline contrast stays well clear of
 * the WCAG AA threshold regardless of how light the artwork is.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
  image,
  imagePosition = 'center',
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumb: string;
  image?: keyof typeof BLUR;
  imagePosition?: string;
}) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="surface-navy on-navy relative overflow-hidden">
      {image && (
        <>
          <Image
            src={`/brand/${image}.webp`}
            alt=""
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR[image]}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          {/* Navy scrim — keeps the artwork readable underneath the type */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-900/97 via-navy-800/90 to-navy-800/70"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-navy-900/35" aria-hidden="true" />
        </>
      )}

      {/* emerald glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.35), transparent 68%)' }}
        aria-hidden="true"
      />

      <div className="container relative pb-14 pt-32 md:pb-20 md:pt-40">
        <motion.nav aria-label="Breadcrumb" className="mb-6" {...rise(0)}>
          <ol className="flex items-center gap-1.5 text-xs text-slate-400">
            <li>
              <Link href={ROUTES.home} className="transition-colors hover:text-white">
                {t.nav.home}
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <li className="font-medium text-slate-300">{crumb}</li>
          </ol>
        </motion.nav>

        <motion.p className="eyebrow mb-4 text-emerald-400" {...rise(0.06)}>
          {eyebrow}
        </motion.p>

        <motion.h1
          className="max-w-4xl font-display text-3xl font-extrabold leading-[1.08] tracking-tightest text-white sm:text-4xl lg:text-[3.1rem]"
          {...rise(0.12)}
        >
          {title}
        </motion.h1>

        <motion.div className="bridge-rule mt-6" {...rise(0.18)} />

        {lead && (
          <motion.p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300" {...rise(0.24)}>
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
