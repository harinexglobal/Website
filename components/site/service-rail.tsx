'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * The service rail: every capability as a panel that expands under the pointer.
 *
 * At rest the whole strip is one continuous photograph behind translucent
 * columns, so it reads as a single scene rather than eight tiles. Pointing at a
 * panel widens it, lifts its scrim, and fades that practice's own photograph in
 * over the shared one — the strip only becomes eight separate pictures when
 * somebody asks it to.
 *
 * Driven by `capabilities.items`, so a panel's title, photograph and link can
 * never drift from the practice it represents.
 *
 * The expansion is pure CSS (see .rail in globals.css) — flex-grow on hover and
 * focus-within, no state, no JS, and it keeps working for keyboard users and
 * with scripting unavailable. Titles sit over a scrim heavy enough to hold
 * contrast whatever the photography is doing beneath.
 */

/** Share of the rail the hovered panel should occupy. */
const HOVER_SHARE = 0.3;

/** Rotating backdrops behind the resting strip. */
const BACKDROPS = ['services-1', 'services-2', 'services-3', 'services-4'] as const;
const ROTATE_MS = 5000;

export function ServiceRail({ showHeading = true }: { showHeading?: boolean } = {}) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(0);

  /* One backdrop every five seconds. Held still under reduced-motion, where a
     cross-fade on a loop is exactly the kind of thing the preference is for. */
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFrame((i) => (i + 1) % BACKDROPS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const panels = t.capabilities.items;
  if (panels.length === 0) return null;

  /* Solve the flex factor for the panel count rather than hardcoding it, so the
     hovered panel keeps its ~30% whether there are six panels or nine. */
  const grow = (HOVER_SHARE * (panels.length - 1)) / (1 - HOVER_SHARE);

  return (
    <section
      className={cn('surface-navy on-navy', showHeading ? 'section' : 'pb-14 pt-2')}
      id="services"
    >
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow={t.capabilities.eyebrow}
            heading={t.capabilities.heading}
            lead={t.capabilities.lead}
            invert
            className="mb-8 max-w-3xl"
          />
        )}

        <Reveal>
          <div
            className="rail relative grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-none"
            style={{ '--rail-grow': grow } as React.CSSProperties}
          >
            {/* One photograph across the whole strip. The panels sit over it, so
                at rest the row is a single scene rather than eight tiles. */}
            {/* All frames are mounted and cross-faded by opacity rather than
                swapped by src. Swapping the source would show a blank frame on
                every rotation until the next file decodes; stacked, the outgoing
                image is still painted underneath while the incoming one arrives.

                Eager, not lazy: this is the resting state of the whole strip, so
                a late arrival renders the section as eight empty navy columns —
                indistinguishable from broken. */}
            {BACKDROPS.map((name, i) => (
              <Image
                key={name}
                src={`/brand/${name}.webp`}
                alt=""
                fill
                sizes="100vw"
                loading="eager"
                className={cn(
                  'pointer-events-none absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out',
                  i === frame ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}

            {panels.map((c) => (
              <Link
                key={c.id}
                href={`${ROUTES.capabilities}/${c.id}`}
                className="rail-panel group relative flex min-h-[8.5rem] flex-col items-center overflow-hidden border-b border-r border-white/20 px-3 py-7 text-center focus:outline-none sm:min-h-[10rem]"
              >
                {/* This practice's own photograph, hidden until asked for. */}
                <Image
                  src={`/brand/capabilities/${c.id}.webp`}
                  alt=""
                  width={900}
                  height={1125}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                {/* Scrim: heavy at rest so titles hold contrast over the shared
                    photograph, lifting on hover to let the panel's own show. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy-950/70 transition-colors duration-500 group-hover:bg-navy-950/35 group-focus-visible:bg-navy-950/35"
                />

                <h3 className="relative font-display text-sm font-bold leading-snug tracking-tight text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.75)] sm:text-[0.95rem]">
                  {c.short}
                </h3>

                <span
                  aria-hidden="true"
                  className="relative mt-3 block h-0.5 w-8 bg-bridge-grad opacity-70 transition-all duration-500 group-hover:w-16 group-hover:opacity-100 group-focus-visible:w-16"
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
