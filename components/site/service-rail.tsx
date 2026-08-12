'use client';

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
 * Driven by `capabilities.items`, so a panel's title, photograph and link can
 * never drift from the practice it represents — the failure mode with a
 * hand-written strip like this is a panel that outlives the service it sells.
 *
 * Titles sit above the photographs rather than over them. Overlaid, a title's
 * legibility depended on whatever happened to be behind it in eight different
 * images; lifted onto the section's own navy, white text is simply always
 * readable, and the scrims are then free to be lighter so the photography shows.
 *
 * Contained rather than full-bleed, so the same component sits correctly in both
 * places it is used — the home page and the capabilities hero.
 *
 * The expansion is pure CSS (see .rail in globals.css) — flex-grow on hover and
 * focus-within, no state, no JS, and it keeps working for keyboard users and
 * with scripting unavailable.
 */

/** Share of the rail the hovered panel should occupy. */
const HOVER_SHARE = 0.3;

export function ServiceRail({ showHeading = true }: { showHeading?: boolean } = {}) {
  const { t } = useLang();

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
            className="rail grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-none"
            style={{ '--rail-grow': grow } as React.CSSProperties}
          >
            {panels.map((c) => (
              <Link
                key={c.id}
                href={`${ROUTES.capabilities}/${c.id}`}
                className="rail-panel group relative flex flex-col border-b border-r border-white/10 bg-navy-900/60 focus:outline-none"
              >
                {/* Title block, on the section's own navy — legible regardless of
                    what the photograph below happens to contain. */}
                <div className="relative z-10 px-4 pb-4 pt-5 sm:px-5">
                  <h3 className="font-display text-base font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300 group-focus-visible:text-emerald-300 lg:min-h-[2.6rem]">
                    {c.short}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-0.5 w-8 bg-bridge-grad transition-all duration-500 group-hover:w-16 group-focus-visible:w-16"
                  />
                </div>

                {/* Photograph takes whatever height the title leaves. */}
                <div className="relative min-h-[8rem] flex-1 overflow-hidden">
                  <Image
                    src={`/brand/capabilities/${c.id}.webp`}
                    alt=""
                    width={900}
                    height={1125}
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-navy-950/45 transition-colors duration-500 group-hover:bg-navy-950/15 group-focus-visible:bg-navy-950/15"
                  />

                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
