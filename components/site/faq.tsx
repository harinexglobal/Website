'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { SectionHeading } from '@/components/ui/section-heading';
import { dictionaries } from '@/lib/content';

/**
 * FAQ accordion. Emits FAQPage JSON-LD so the questions are eligible for rich
 * results — the structured data always uses the English copy, since that is
 * what the statically rendered page ships with.
 */
export function Faq({ limit }: { limit?: number }) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const items = limit ? t.faq.items.slice(0, limit) : t.faq.items;
  const enItems = limit ? dictionaries.en.faq.items.slice(0, limit) : dictionaries.en.faq.items;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: enItems.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <section className="section" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={t.faq.eyebrow} heading={t.faq.heading} lead={t.faq.lead} />
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-emerald-700"
                      >
                        <span className="text-[1.02rem] font-semibold leading-snug text-navy-800">
                          {item.q}
                        </span>
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isOpen
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 text-slate-500'
                          }`}
                        >
                          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="copy max-w-3xl pb-6 pr-12">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
