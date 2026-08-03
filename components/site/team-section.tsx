'use client';

import { GraduationCap, MapPin } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function TeamSection() {
  const { t } = useLang();

  return (
    <section className="section" id="leadership">
      <div className="container">
        <SectionHeading
          eyebrow={t.leadership.eyebrow}
          heading={t.leadership.heading}
          lead={t.leadership.lead}
          className="mb-12"
        />

        {/* A single leader shouldn't stretch across a two-column grid */}
        <div
          className={
            t.leadership.people.length > 1
              ? 'grid gap-6 lg:grid-cols-2'
              : 'grid max-w-2xl gap-6'
          }
        >
          {t.leadership.people.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} as="article">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                {/* Header band */}
                <div className="surface-navy on-navy relative p-6 sm:p-7">
                  <div className="relative flex items-start gap-4">
                    <Monogram name={p.name} accent={i === 0 ? 'saffron' : 'emerald'} />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-white">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-400">{p.nameLocal}</p>

                      <p className="mt-3 inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                        {p.role}
                      </p>
                      <p className="mt-2 text-[0.82rem] leading-relaxed text-slate-400">{p.roleDetail}</p>
                    </div>
                  </div>

                  <p className="relative mt-5 flex items-center gap-1.5 border-t border-white/10 pt-4 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {p.location}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="copy">{p.bio}</p>
                  <p className="copy mt-3 text-[0.88rem] text-slate-500">{p.bioExtra}</p>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <p className="eyebrow mb-3 text-saffron-600">
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                    </p>
                    <ul className="space-y-2">
                      {p.creds.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-slate-600">
                          <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {p.focus.map((f) => (
                      <span key={f} className="pill text-[0.7rem]">
                        {f}
                      </span>
                    ))}
                  </div>
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
  // Works for both "Chia-Ling Shih" and "施佳玲"
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

  const ring =
    accent === 'saffron'
      ? 'ring-saffron-500/40 text-saffron-300'
      : 'ring-emerald-400/40 text-emerald-300';

  return (
    <span
      aria-hidden="true"
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/5 font-display text-xl font-extrabold ring-1 ${ring}`}
    >
      {initials}
    </span>
  );
}
