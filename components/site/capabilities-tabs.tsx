'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { ContentIcon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';
import { cn } from '@/lib/utils';

export function CapabilitiesTabs({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  // Deep-link support: /capabilities#technical-translation
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;
      const idx = t.capabilities.items.findIndex((c) => c.id === id);
      if (idx >= 0) setActive(idx);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [t.capabilities.items]);

  const current = t.capabilities.items[active];

  return (
    <section className="section bg-slate-50" id="capabilities">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow={t.capabilities.eyebrow}
            heading={t.capabilities.heading}
            lead={t.capabilities.lead}
            className="mb-12"
          />
        )}

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Tab list — min-w-0 lets the scroller actually scroll instead of
              stretching the grid past the viewport */}
          <div className="min-w-0 lg:col-span-5 xl:col-span-4">
            <div
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
              role="tablist"
              aria-label={t.capabilities.eyebrow}
            >
              {t.capabilities.items.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.id}
                    id={`tab-${c.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`panel-${c.id}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      'group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all lg:w-full',
                      isActive
                        ? 'border-navy-700 bg-navy-800 text-white shadow-card'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-white',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                        isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-100 text-navy-700',
                      )}
                    >
                      <ContentIcon name={c.icon} className="h-[1.15rem] w-[1.15rem]" />
                    </span>

                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block text-2xs font-semibold uppercase tracking-[0.14em]',
                          isActive ? 'text-emerald-400' : 'text-slate-400',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="block whitespace-nowrap text-sm font-semibold leading-tight lg:whitespace-normal">
                        {c.title}
                      </span>
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="cap-indicator"
                        className="absolute inset-y-2 -left-px hidden w-0.5 rounded-full bg-emerald-400 lg:block"
                        transition={{ duration: reduce ? 0 : 0.3 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                id={`panel-${current.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${current.id}`}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-emerald-400">
                    <ContentIcon name={current.icon} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-navy-800 sm:text-2xl">
                      {current.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-emerald-700">{current.summary}</p>
                  </div>
                </div>

                <p className="copy mt-6">{current.description}</p>

                <div className="mt-7">
                  <p className="eyebrow mb-4 text-saffron-600">{t.common.deliverables}</p>
                  <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {current.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-[0.9rem] text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
                  {current.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                  <ButtonLink href={ROUTES.contact} variant="link" className="ml-auto text-sm font-semibold">
                    {t.common.requestConsultation}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </ButtonLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
