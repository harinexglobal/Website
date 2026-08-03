'use client';

import { Briefcase, MapPin } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Advisory board. Deliberately brief — current position and location only,
 * no biographies. Personal contact details from the source CVs are never
 * published here.
 */
export function AdvisoryBoard() {
  const { t } = useLang();

  return (
    <section className="section bg-slate-50" id="advisory">
      <div className="container">
        <SectionHeading
          eyebrow={t.advisory.eyebrow}
          heading={t.advisory.heading}
          lead={t.advisory.lead}
          className="mb-12"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {t.advisory.people.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} as="article">
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg sm:p-7">
                <div className="flex items-start gap-4">
                  <Monogram name={p.name} accent={i % 2 === 0 ? 'emerald' : 'saffron'} />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-navy-800">
                      {p.name}
                    </h3>
                    {p.nameLocal && <p className="mt-0.5 text-sm text-slate-500">{p.nameLocal}</p>}
                  </div>
                </div>

                <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                  <div className="flex items-start gap-3">
                    <dt className="mt-0.5">
                      <Briefcase className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                      <span className="sr-only">{t.advisory.currentRole}</span>
                    </dt>
                    <dd className="min-w-0">
                      <span className="block text-sm font-semibold text-navy-800">{p.role}</span>
                      <span className="block text-sm text-emerald-700">{p.org}</span>
                    </dd>
                  </div>

                  <div className="flex items-start gap-3">
                    <dt className="mt-0.5">
                      <MapPin className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
                      <span className="sr-only">Location</span>
                    </dt>
                    <dd className="text-sm text-slate-600">{p.location}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.focus.map((f) => (
                    <span key={f} className="pill text-[0.7rem]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Initials plate — used in place of a photograph. */
function Monogram({ name, accent }: { name: string; accent: 'saffron' | 'emerald' }) {
  const isCJK = /[一-鿿]/.test(name);
  const initials = isCJK
    ? name.slice(0, 2)
    : name
        .replace(/^Dr\.?\s+/i, '')
        .split(/[\s-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

  const tone =
    accent === 'saffron'
      ? 'bg-saffron-50 text-saffron-600 ring-saffron-500/25'
      : 'bg-emerald-50 text-emerald-700 ring-emerald-500/25';

  return (
    <span
      aria-hidden="true"
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-base font-extrabold ring-1 ${tone}`}
    >
      {initials}
    </span>
  );
}
