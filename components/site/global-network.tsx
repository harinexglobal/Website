'use client';

import { Building2, MapPin } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { NetworkMap } from '@/components/site/network-map';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

/** Headquarters plus the business development representatives. */
export function GlobalNetwork() {
  const { t } = useLang();

  return (
    <section className="surface-navy on-navy section" id="network">
      <div className="container relative">
        <SectionHeading
          eyebrow={t.network.eyebrow}
          heading={t.network.heading}
          lead={t.network.lead}
          invert
          className="mb-10"
        />

        <Reveal className="mb-10">
          <NetworkMap />
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.network.locations.map((loc) => {
            const isHq = loc.type === 'hq';
            return (
              <RevealItem key={loc.id}>
                {/* id is the anchor the Where We Work menu jumps to. */}
                <article
                  id={loc.id}
                  className={cn(
                    'group relative h-full scroll-mt-28 overflow-hidden rounded-xl border p-6 transition-colors',
                    isHq
                      ? 'border-emerald-400/35 bg-emerald-400/[0.07]'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em]',
                      isHq
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-saffron-500/15 text-saffron-300',
                    )}
                  >
                    {isHq ? (
                      <Building2 className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <MapPin className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                    )}
                    {isHq ? t.network.hqLabel : t.network.repLabel}
                  </span>

                  <h3 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight text-white">
                    {loc.city}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-400">{loc.country}</p>

                  {loc.core && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      {t.network.coreLabel}
                    </p>
                  )}

                  <p className="mt-4 text-sm font-semibold text-white">{loc.role}</p>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-400">{loc.detail}</p>

                  {loc.address && loc.address.includes(',') && (
                    <p className="mt-2.5 border-l border-white/15 pl-3 text-[0.78rem] leading-relaxed text-slate-500">
                      {loc.address}
                    </p>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {loc.focus.map((f) => (
                      <li key={f} className="pill pill-navy text-[0.68rem]">
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-8">
          <p className="max-w-3xl text-sm leading-relaxed text-slate-400">{t.network.coverageNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
