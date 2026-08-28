'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { ContentIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { ROUTES } from '@/lib/content';

/**
 * A corridor page: Taiwan and one other market.
 *
 * Three markets have one, out of seven. That is deliberate — India has a
 * registered branch, the United States and Germany have named people with a
 * defined remit, and the other four have a representative and little else to
 * say. A page whose only content is "we are also in Singapore" earns nothing
 * and makes the three that do have substance look like filler too.
 *
 * The people and practices are looked up from the existing dictionaries rather
 * than restated here, so a change to someone's role or a practice's name shows
 * up on the corridor page automatically instead of drifting out of step.
 */
export function MarketContent({ slug }: { slug: string }) {
  const { t } = useLang();

  const m = t.marketPages.items.find((x) => x.id === slug);
  if (!m) notFound();

  const practice = (id: string) => t.capabilities.items.find((c) => c.id === id);
  const everyone = [...t.leadership.people, ...t.regional.people];
  const person = (id: string) => everyone.find((p) => p.id === id);

  return (
    <>
      <PageHero
        crumb={m.market}
        eyebrow={t.marketPages.eyebrow}
        title={m.title}
        lead={m.lead}
        image="bridge"
        imagePosition="center 45%"
      />

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-5">
              {m.intro.map((para) => (
                <p key={para.slice(0, 32)} className="copy text-[1.02rem]">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Both directions, because a corridor that only runs one way is a
              sales channel, and the firm is not one. */}
          <Reveal delay={0.1}>
            <h2 className="mt-14 text-center font-display text-2xl font-bold tracking-tight text-navy-800">
              {t.marketPages.directionsHeading}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {m.directions.map((d, i) => (
              <Reveal key={d.heading} delay={0.15 + i * 0.08} as="article">
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-bridge-grad" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-emerald-300">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-navy-800">
                    {d.heading}
                  </h3>
                  <p className="copy mt-3 flex-1">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-saffron-600">{t.marketPages.practicesHeading}</p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {m.practices.map((id, i) => {
              const c = practice(id);
              if (!c) return null;
              return (
                <Reveal key={id} delay={i * 0.06}>
                  <Link
                    href={`${ROUTES.whatWeDo}/${c.id}`}
                    className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-card"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800/5 text-navy-700 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-600">
                      <ContentIcon name={c.icon} className="h-5 w-5" />
                    </span>
                    <span className="mt-4 font-display text-[0.95rem] font-bold leading-snug text-navy-800">
                      {c.short ?? c.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-[0.82rem] leading-relaxed text-slate-500">
                      {c.summary}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-saffron-600">{t.marketPages.peopleHeading}</p>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {m.people.map((id, i) => {
              const p = person(id);
              if (!p) return null;
              return (
                <Reveal key={id} delay={i * 0.08}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                    <Image
                      src={p.photo}
                      alt=""
                      width={200}
                      height={200}
                      className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div className="min-w-0">
                      <p className="font-display font-bold leading-snug text-navy-800">{p.name}</p>
                      <p className="mt-0.5 text-[0.82rem] font-medium text-emerald-700">{p.role}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                        {p.location}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <Link
              href={ROUTES.whereWeWork}
              className="group mt-10 inline-flex items-center gap-2 text-sm font-bold text-navy-800 transition-colors hover:text-emerald-700"
            >
              {t.nav.whereWeWork}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
