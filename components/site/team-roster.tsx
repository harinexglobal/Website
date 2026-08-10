'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

/**
 * The whole roster, in one uniform card format across all three tiers.
 *
 * Every card shows the same four things: name, the person's role at HariNex,
 * location, and areas of expertise. Deliberately no employer and no biography —
 * listing an outside employer alongside a HariNex title reads as a conflict and
 * implies an endorsement none of those organisations have given.
 */

type Person = {
  id: string;
  name: string;
  nameLocal?: string;
  role: string;
  location: string;
  photo?: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
  focus: string[];
};

export function TeamRoster() {
  const { t } = useLang();

  type Tier = {
    key: string;
    label: string;
    heading: string;
    lead: string;
    people: Person[];
    tone: 'navy' | 'saffron' | 'emerald';
  };

  // Tiers with no members are dropped, so removing everyone from a tier
  // removes its heading too rather than leaving an empty section.
  const tiers: Tier[] = ([
    {
      key: 'leadership',
      label: t.team.leadershipTier,
      heading: t.leadership.heading,
      lead: t.leadership.lead,
      people: t.leadership.people,
      tone: 'navy',
    },
    {
      key: 'regional',
      label: t.team.regionalTier,
      heading: t.regional.heading,
      lead: t.regional.lead,
      people: t.regional.people,
      tone: 'saffron',
    },
  ] as Tier[]).filter((tier) => tier.people.length > 0);

  return (
    <>
      {tiers.map((tier, tierIndex) => (
        <section
          key={tier.key}
          id={tier.key}
          className={cn('section', tierIndex % 2 === 1 ? 'bg-slate-50' : 'bg-white')}
        >
          <div className="container">
            <SectionHeading
              eyebrow={tier.label}
              heading={tier.heading}
              lead={tier.lead}
              className="mb-10"
            />

            {/* Four across at most. Five fitted but read as crowded, and the
                longer role titles started wrapping hard. */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tier.people.map((p, i) => (
                <PersonCard key={p.id} person={p} tone={tier.tone} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function PersonCard({
  person,
  tone,
  delay,
}: {
  person: Person;
  tone: 'navy' | 'saffron' | 'emerald';
  delay: number;
}) {
  const { t } = useLang();

  const ring =
    tone === 'navy'
      ? 'bg-navy-800/5 text-navy-700 ring-navy-800/15'
      : tone === 'saffron'
        ? 'bg-saffron-50 text-saffron-600 ring-saffron-500/25'
        : 'bg-emerald-50 text-emerald-700 ring-emerald-500/25';

  const bar = tone === 'navy' ? 'bg-navy-700' : tone === 'saffron' ? 'bg-saffron-500' : 'bg-emerald-500';

  return (
    <Reveal delay={delay} as="article">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-lg">
        <span className={cn('absolute inset-x-0 top-0 z-10 h-0.5', bar)} aria-hidden="true" />

        {/* Circular portrait on a gradient ring.
            These are passport photos on flat white backgrounds — full-bleed
            square crops made every card look like an ID badge, and the seam
            where the photo's white met the card's white was the ugly part. A
            disc throws away the corners, which is exactly where that white sat,
            and the ring supplies the edge the photo never had. */}
        <div className="flex justify-center px-5 pt-8">
          <span className="relative block h-32 w-32 shrink-0 rounded-full bg-bridge-grad p-[3px] shadow-[0_10px_28px_-10px_rgba(10,25,47,0.45)] transition-transform duration-500 group-hover:scale-[1.04]">
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-bridge-grad opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60"
            />
            <span className="relative block h-full w-full overflow-hidden rounded-full bg-white p-[3px]">
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={800}
                  height={800}
                  sizes="128px"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-full w-full items-center justify-center rounded-full font-display text-3xl font-extrabold',
                    ring,
                  )}
                >
                  {initials(person.name)}
                </span>
              )}
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 text-center">

          {/* Each row below reserves its space whether or not it has content,
              so name, role and location sit at the same height on every card in
              a row. Only some people have a local-script name and only some
              roles wrap to two lines — left to size themselves, those two
              differences knocked every following line out of alignment with the
              card beside it. */}
          <h3 className="min-h-[2.8rem] font-display text-lg font-bold leading-tight tracking-tight text-navy-800">
            {person.name}
          </h3>
          <p className="min-h-[1.25rem] text-sm leading-tight text-slate-500">
            {person.nameLocal ?? ' '}
          </p>

          <p className="mt-2.5 min-h-[2.5rem] text-sm font-semibold leading-tight text-emerald-700">
            {person.role}
          </p>

          <p className="mt-2 flex min-h-[1.25rem] items-center justify-center gap-1.5 text-[0.85rem] text-slate-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.75} />
            {person.location}
          </p>

        {(person.email || person.phone) && (
          <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
            {person.email && (
              <li>
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center justify-center gap-2 text-[0.82rem] text-slate-600 transition-colors hover:text-emerald-700"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.75} />
                  {person.email}
                </a>
              </li>
            )}
            {person.phone && (
              <li>
                <a
                  href={`tel:${person.phoneHref}`}
                  className="flex items-center justify-center gap-2 text-[0.82rem] text-slate-600 transition-colors hover:text-emerald-700"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={1.75} />
                  {person.phone}
                </a>
              </li>
            )}
          </ul>
        )}

          {/* Top-aligned, not bottom-pinned. Pinning was there to absorb roles
              and locations of different lengths; those are fixed heights now, so
              pinning only pushed this rule out of line whenever two cards had a
              different number of focus pills. Aligning the rule matters more
              than levelling the last row of pills — the rule is a drawn line
              across the row, the pills are not. */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2.5 text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              {t.common.focusAreas}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {person.focus.map((f) => (
                <span key={f} className="pill text-[0.7rem]">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function initials(name: string) {
  if (/[一-鿿]/.test(name)) return name.slice(0, 2);
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}
