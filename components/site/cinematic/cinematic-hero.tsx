'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { ROUTES } from '@/lib/content';
import { MaterialsCanvas } from './materials-canvas';

/**
 * Scroll-triggered typographic reveal.
 *
 * The wordmark is a genuine knockout: an SVG rect the colour of the page, with
 * "HariNex / Global" cut out of it by a mask. Whatever sits behind that rect is
 * what you see through the letterforms.
 *
 * Layer order, back to front:
 *   1. the materials scene (canvas) — visible through the glyphs in Act 1
 *   2. the hero video — cross-fades in behind the glyphs during Act 2
 *   3. the knockout rect — warm off-white, bleeding to black
 *
 * Scrolling scales the *mask text* to 55×. As the glyphs grow, their counters
 * open until the rect is entirely hole and the video is full-bleed — the
 * viewer passes through the letters rather than watching them fade.
 *
 * The <text> is real SVG text, so it stays selectable and readable to a screen
 * reader; the <h1> above it carries the page heading.
 */
export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // static composition below is already the reduced state

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-cine="stage"]',
          start: 'top top',
          end: '+=240%', // the scroll room the reveal plays out over
          scrub: 1.1, // lag behind the wheel so it reads as film, not a slider
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: 'power4.out' },
      });

      // The reveal. Non-linear on purpose: slow to open, then it runs away.
      tl.to('[data-cine="cut"]', { scale: 55, svgOrigin: '50 50', duration: 2, ease: 'power3.in' }, 0)
        // Page bleeds to black behind the growing letters.
        .to('[data-cine="plate"]', { attr: { fill: '#000000' }, duration: 1.2 }, 0.1)
        // Materials scene hands over to the film.
        .to('[data-cine="scene"]', { opacity: 0, duration: 0.9 }, 0.45)
        .fromTo('[data-cine="film"]', { opacity: 0, scale: 1.18 }, { opacity: 1, scale: 1, duration: 1.4 }, 0.5)
        .to('[data-cine="drift"]', { opacity: 0, duration: 0.6 }, 0)
        // Once the plate is entirely hole it only occludes — drop it.
        .to('[data-cine="overlay"]', { autoAlpha: 0, duration: 0.35 }, 1.85)
        // Copy rises into the film.
        .fromTo(
          '[data-cine="line"]',
          { yPercent: 130, opacity: 0, filter: 'blur(14px)' },
          { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.16 },
          1.75,
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section
        data-cine="stage"
        className="relative h-dvh w-full overflow-hidden bg-[#F8F7F3]"
      >
        <h1 className="sr-only">HariNex Global — {t.hero.title}</h1>

        {/* 1. What shows through the letterforms in Act 1 */}
        <div data-cine="scene" className="absolute inset-0" aria-hidden="true">
          <MaterialsCanvas className="h-full w-full" />
        </div>

        {/* 2. The film, revealed as the glyphs open */}
        <div data-cine="film" className="absolute inset-0 opacity-0" aria-hidden="true">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/brand/hero-poster.webp"
          >
            <source src="/brand/hero.webm" type="video/webm" />
            <source src="/brand/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />
        </div>

        {/* 3. The knockout plate */}
        <svg
          data-cine="overlay"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="HariNex Global"
        >
          <defs>
            <mask id="cine-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              {/* white keeps the plate, black punches the hole */}
              <rect x="0" y="0" width="100" height="100" fill="#fff" />
              <g data-cine="cut">
                <text
                  x="50"
                  y="43.5"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="cine-type"
                >
                  HariNex
                </text>
                <text
                  x="50"
                  y="58.5"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="cine-type"
                >
                  Global
                </text>
              </g>
            </mask>
          </defs>
          <rect
            data-cine="plate"
            x="0"
            y="0"
            width="100"
            height="100"
            fill="#F8F7F3"
            mask="url(#cine-cut)"
          />
        </svg>

        {/* Motes drifting over the plate */}
        <div data-cine="drift" aria-hidden="true" className="pointer-events-none absolute inset-0">
          {DRIFT.map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-navy-800/15"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.s,
                height: d.s,
                animation: `cine-drift ${d.dur}s ease-in-out ${d.delay}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Act 3 copy */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
          <div className="max-w-3xl text-center">
            <h2
              data-cine="line"
              className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white opacity-0 sm:text-5xl"
            >
              {t.hero.titleLines[0]} {t.hero.titleLines[1]}{' '}
              <span className="text-saffron-400">{t.hero.titleLines[2]}</span>
            </h2>
            <p
              data-cine="line"
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 opacity-0 sm:text-lg"
            >
              {t.hero.subtitle}
            </p>
            <div
              data-cine="line"
              className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0"
            >
              <ButtonLink href={ROUTES.contact} size="lg">
                <CalendarCheck className="h-4 w-4" />
                {t.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={ROUTES.capabilities} size="lg" variant="ghostLight">
                {t.hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          data-cine="drift"
          className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-2xs font-semibold uppercase tracking-[0.28em] text-navy-800/45"
        >
          {t.common.learnMore}
        </div>
      </section>
    </div>
  );
}

const DRIFT = [
  { x: 8, y: 22, s: 6, dur: 9, delay: 0 },
  { x: 18, y: 68, s: 4, dur: 11, delay: 1.2 },
  { x: 31, y: 14, s: 5, dur: 10, delay: 0.6 },
  { x: 46, y: 82, s: 3, dur: 13, delay: 2.1 },
  { x: 63, y: 26, s: 5, dur: 9.5, delay: 1.7 },
  { x: 74, y: 71, s: 4, dur: 12, delay: 0.3 },
  { x: 88, y: 36, s: 6, dur: 10.5, delay: 2.6 },
  { x: 93, y: 78, s: 3, dur: 14, delay: 1 },
];
