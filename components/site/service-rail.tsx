'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';

/**
 * The service rail: six capability panels that expand under the pointer.
 *
 * Driven by `capabilities.items`, so a panel's title, photograph and link can
 * never drift from the practice it represents — the failure mode with a
 * hand-written strip like this is a panel that outlives the service it sells.
 *
 * Six of the eight practices appear. Project management and industrial
 * automation are left to the capabilities page: the rail is a shop window, not
 * the catalogue, and the closing link says as much. Add an id here and it
 * appears, provided a photograph exists at the matching path.
 *
 * The expansion itself is pure CSS (see .rail in globals.css) — flex-basis on
 * hover and focus-within, no state, no JS, and it keeps working for keyboard
 * users and with scripting unavailable.
 */
const PANELS = [
  'technology-transfer',
  'business-advisory',
  'supplier-sourcing',
  'technical-translation',
  'regulatory',
  'digital-solutions',
] as const;

export function ServiceRail() {
  const { t } = useLang();

  const panels = PANELS.map((id) => t.capabilities.items.find((c) => c.id === id)).filter(
    (c): c is (typeof t.capabilities.items)[number] => Boolean(c),
  );

  if (panels.length === 0) return null;

  return (
    <section className="surface-navy on-navy section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow={t.capabilities.eyebrow}
          heading={t.capabilities.heading}
          lead={t.capabilities.lead}
          invert
          className="mb-10 max-w-3xl"
        />
      </div>

      {/* Full-bleed: the strip runs edge to edge so it reads as one continuous
          scene rather than a widget sitting inside the page gutters. */}
      <Reveal>
        <div className="rail grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-none">
          {panels.map((c) => (
            <Link
              key={c.id}
              href={`${ROUTES.capabilities}/${c.id}`}
              className="rail-panel group relative block min-h-[9.5rem] overflow-hidden focus:outline-none sm:min-h-[13rem]"
            >
              <Image
                src={`/brand/capabilities/${c.id}.webp`}
                alt=""
                width={900}
                height={1125}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 34vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
              />

              {/* Two layers: a flat wash for legibility everywhere, and a
                  bottom-weighted gradient so the title always has contrast
                  regardless of what the photograph is doing behind it. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-navy-950/65 transition-colors duration-500 group-hover:bg-navy-950/45 group-focus-visible:bg-navy-950/45"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/85 to-transparent"
              />

              {/* Hairline separators, not borders — the strip should look cut
                  from one image, not assembled from six. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 right-0 hidden w-px bg-white/15 lg:block"
              />

              <div className="relative flex h-full flex-col justify-end p-5 sm:p-6 lg:justify-start lg:pt-10">
                <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-white sm:text-xl lg:text-2xl">
                  {c.short}
                </h3>

                {/* Accent rule grows on hover — the one flourish, kept to a
                    width change rather than anything that moves the text. */}
                <span
                  aria-hidden="true"
                  className="mt-3 block h-0.5 w-8 bg-bridge-grad transition-all duration-500 group-hover:w-16 group-focus-visible:w-16"
                />

                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 opacity-100 transition-all duration-500 group-hover:text-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                  {t.common.learnMore}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <div className="container">
        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-slate-400">
            <Link
              href={ROUTES.capabilities}
              className="font-semibold text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
            >
              {t.capabilities.heading}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
