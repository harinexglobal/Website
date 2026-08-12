'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Reveal } from '@/components/ui/reveal';

/**
 * The About film.
 *
 * Autoplays muted and looping, which browsers allow and which keeps it as
 * ambient texture rather than something demanding attention. A control sits over
 * it regardless: an animation that cannot be stopped fails WCAG 2.2.2 once it
 * runs past five seconds, and this one loops indefinitely.
 *
 * Under prefers-reduced-motion it starts paused. The reader can still play it —
 * the preference is about what moves without being asked, not about withholding
 * content.
 */
export function AboutVideo() {
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

  return (
    <section className="section-sm pb-16 md:pb-20">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-navy-950 shadow-card-lg">
            <video
              ref={videoRef}
              className="aspect-video h-full w-full object-cover"
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/brand/about.mp4" type="video/mp4" />
            </video>

            {/* Bottom-weighted only, so the film is not dimmed for the sake of
                one control sitting in a corner. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/80 to-transparent"
            />

            <button
              type="button"
              onClick={toggle}
              aria-pressed={playing}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-navy-950/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-navy-950/90"
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <Play className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              )}
              {playing ? t.common.pause : t.common.play}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
