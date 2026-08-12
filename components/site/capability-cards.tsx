'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';

/**
 * The capabilities grid: one card per practice, photograph on top.
 *
 * Replaces the tab interface. Tabs showed one practice at a time and hid seven,
 * which is the wrong trade on a page whose whole job is to show the range —
 * a visitor had to click seven times to learn what the firm does.
 *
 * Hover behaviour is borrowed from the reference layout but recoloured: the
 * accent is the brand emerald rather than the reference's green, and the card
 * lifts on the project's existing shadow tokens rather than a new set. Every
 * moving part is a CSS transition on the card's own :hover — no state, and the
 * whole card is one link so keyboard users get the same target.
 */
export function CapabilityCards({ showHeading = true }: { showHeading?: boolean } = {}) {
  const { t } = useLang();

  return (
    <section className="section bg-slate-50" id="capabilities">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow={t.capabilities.eyebrow}
            heading={t.capabilities.heading}
            lead={t.capabilities.lead}
            className="mb-10"
          />
        )}

        <RevealGroup className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {t.capabilities.items.map((c) => (
            <RevealItem key={c.id}>
              <Link
                href={`${ROUTES.capabilities}/${c.id}`}
                className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-card-lg"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={`/brand/capabilities/${c.id}.webp`}
                    alt=""
                    width={900}
                    height={1125}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* The short label doubles as the category line — it is the
                      practice's own name, so it can never fall out of step. */}
                  <p className="mb-3 text-2xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    {c.short}
                  </p>

                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-navy-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {c.title}
                  </h3>

                  <p className="copy mt-3 flex-1">{c.summary}</p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {t.common.learnMore}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
