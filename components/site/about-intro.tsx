'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Pause, Play } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ROUTES } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * `variant` picks which copy block to render: the homepage uses the shorter
 * "Welcome" text, the About page uses the fuller About narrative.
 *
 * `video` puts a film behind the section. The scrim is deliberately light —
 * 55% rather than the hero's 95% — because here the film is the point rather
 * than a texture under a headline. The copy takes a text-shadow instead of
 * hiding behind a heavier wash.
 */
export function AboutIntro({
  variant = 'about',
  video,
  crumb,
}: {
  variant?: 'home' | 'about';
  video?: string;
  /** Set when this section opens the page and there is no hero above it. */
  crumb?: string;
}) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(!reduce);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  const copy =
    variant === 'home'
      ? { eyebrow: t.welcome.eyebrow, heading: t.welcome.heading, lead: undefined, body: t.welcome.body }
      : { eyebrow: t.about.eyebrow, heading: t.about.heading, lead: t.about.lead, body: t.about.body };

  return (
    <section
      className={cn(
        'section relative overflow-hidden',
        video && 'on-navy bg-navy-950',
        /* Clears the fixed navbar when this section opens the page. */
        crumb && 'pt-32 md:pt-40',
      )}
      id="about"
    >
      {video && (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={`/brand/${video}.mp4`} type="video/mp4" />
          </video>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-navy-950/55"
          />
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-navy-950/70 px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-navy-950/90"
          >
            {playing ? (
              <Pause className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <Play className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
            )}
            {playing ? t.common.pause : t.common.play}
          </button>
        </>
      )}

      <div className="container relative">
        {crumb && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-slate-400">
              <li>
                <Link href={ROUTES.home} className="transition-colors hover:text-white">
                  {t.nav.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-slate-200">{crumb}</li>
            </ol>
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Narrative leads now that the bridge diagram has its own full-width
              section — the copy no longer has to share the fold with a widget. */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={copy.eyebrow}
              heading={copy.heading}
              lead={copy.lead}
              invert={!!video}
            />

            <Reveal delay={0.1} className="mt-6 space-y-4">
              {copy.body.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className={cn(
                    video ? 'text-[0.975rem] leading-relaxed text-slate-100' : 'copy',
                  )}
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.16} className="mt-8">
              <ButtonLink href={ROUTES.about} variant={video ? 'ghostLight' : 'outline'}>
                {t.common.learnMore}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>

          {/* Vision & mission */}
          <div className="lg:col-span-5">
            <Reveal className="space-y-4">
              <div
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-6',
                  video
                    ? 'border-white/15 bg-navy-950/60 backdrop-blur-sm'
                    : 'border-slate-200 bg-slate-50',
                )}
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-saffron-500" />
                <p className={cn('eyebrow mb-3', video ? 'text-saffron-300' : 'text-saffron-600')}>
                  {t.about.visionTitle}
                </p>
                <p
                  className={cn(
                    'text-[0.95rem] leading-relaxed',
                    video ? 'text-slate-100' : 'text-slate-700',
                  )}
                >
                  {t.about.vision}
                </p>
              </div>
              <div
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-6',
                  video
                    ? 'border-white/15 bg-navy-950/60 backdrop-blur-sm'
                    : 'border-slate-200 bg-slate-50',
                )}
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-emerald-500" />
                <p className={cn('eyebrow mb-3', video ? 'text-emerald-300' : 'text-emerald-700')}>
                  {t.about.missionTitle}
                </p>
                <p
                  className={cn(
                    'text-[0.95rem] leading-relaxed',
                    video ? 'text-slate-100' : 'text-slate-700',
                  )}
                >
                  {t.about.mission}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Why organisations work with us" — six short proof points. */
export function WhyUsGrid() {
  const { t } = useLang();

  return (
    <section className="section-sm pb-16 md:pb-20">
      <div className="container">
        <Reveal>
          <h2 className="h-section mb-8 text-navy-800">{t.about.whyUs.heading}</h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.whyUs.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full bg-white p-6 transition-colors hover:bg-slate-50">
                <span className="font-display text-sm font-extrabold text-emerald-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-base font-bold tracking-tight text-navy-800">{item.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-slate-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
