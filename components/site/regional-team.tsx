'use client';

import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Regional directors — the person who represents the firm in each market.
 * Modelled on the pattern that makes competitor team pages credible: a name
 * and a title carrying the geography, not an anonymous "regional office".
 */
export function RegionalTeam({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();

  return (
    <section className="section bg-slate-50" id="regional">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow={t.regional.eyebrow}
            heading={t.regional.heading}
            lead={t.regional.lead}
            className="mb-12"
          />
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {t.regional.people.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} as="article">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg sm:p-7">
                <div className="flex items-start gap-4">
                  <Monogram name={p.name} accent={i % 2 === 0 ? 'saffron' : 'emerald'} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-navy-800">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 inline-flex rounded-full bg-navy-800/5 px-2.5 py-1 text-xs font-semibold text-navy-700">
                      {p.role}
                    </p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                  {p.currentPosition && (
                    <Row icon={<Briefcase className="h-4 w-4" strokeWidth={1.75} />}>
                      <span className="text-sm text-slate-700">{p.currentPosition}</span>
                    </Row>
                  )}

                  <Row icon={<MapPin className="h-4 w-4" strokeWidth={1.75} />}>
                    <span className="text-sm text-slate-700">{p.location}</span>
                  </Row>

                  {p.email && (
                    <Row icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}>
                      <a
                        href={`mailto:${p.email}`}
                        className="text-sm font-medium text-navy-800 transition-colors hover:text-emerald-700"
                      >
                        {p.email}
                      </a>
                    </Row>
                  )}

                  {p.phone && (
                    <Row icon={<Phone className="h-4 w-4" strokeWidth={1.75} />}>
                      <a
                        href={`tel:${p.phoneHref}`}
                        className="text-sm font-medium text-navy-800 transition-colors hover:text-emerald-700"
                      >
                        {p.phone}
                      </a>
                    </Row>
                  )}
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

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <dt className="mt-0.5 shrink-0 text-slate-400">{icon}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

function Monogram({ name, accent }: { name: string; accent: 'saffron' | 'emerald' }) {
  const initials = name
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
