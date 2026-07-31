'use client';

import { Check } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

export function WhyTaiwanIndia() {
  const { t } = useLang();

  return (
    <section className="section" id="why">
      <div className="container">
        <SectionHeading
          eyebrow={t.bridge.eyebrow}
          heading={t.bridge.heading}
          lead={t.bridge.lead}
          className="mb-12"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Column
            tone="saffron"
            title={t.bridge.taiwanTitle}
            lead={t.bridge.taiwanLead}
            points={t.bridge.taiwanPoints}
            delay={0}
          />
          <Column
            tone="emerald"
            title={t.bridge.indiaTitle}
            lead={t.bridge.indiaLead}
            points={t.bridge.indiaPoints}
            delay={0.1}
          />
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-700 sm:text-lg">
              {t.bridge.closing}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Column({
  tone,
  title,
  lead,
  points,
  delay,
}: {
  tone: 'saffron' | 'emerald';
  title: string;
  lead: string;
  points: string[];
  delay: number;
}) {
  const isSaffron = tone === 'saffron';

  return (
    <Reveal delay={delay} as="article">
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <span
          className={cn(
            'absolute inset-x-0 top-0 h-1',
            isSaffron ? 'bg-saffron-500' : 'bg-emerald-500',
          )}
          aria-hidden="true"
        />

        <h3 className="font-display text-2xl font-bold tracking-tight text-navy-800">{title}</h3>
        <p className={cn('mt-2 text-sm font-semibold', isSaffron ? 'text-saffron-600' : 'text-emerald-700')}>
          {lead}
        </p>

        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[0.925rem] text-slate-700">
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  isSaffron ? 'bg-saffron-50 text-saffron-600' : 'bg-emerald-50 text-emerald-600',
                )}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
