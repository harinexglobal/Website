'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/reveal';
import { BLUR } from '@/lib/blur';
import { cn } from '@/lib/utils';

/**
 * Full-bleed photographic band used to break up long pages.
 * Text sits on a navy scrim so contrast is independent of the artwork.
 */
export function ImageBanner({
  image,
  eyebrow,
  heading,
  body,
  imagePosition = 'center',
  align = 'left',
}: {
  image: keyof typeof BLUR;
  eyebrow?: string;
  heading: string;
  body?: string;
  imagePosition?: string;
  align?: 'left' | 'right';
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={`/brand/${image}.webp`}
        alt=""
        fill
        placeholder="blur"
        blurDataURL={BLUR[image]}
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />

      <div
        className={cn(
          'absolute inset-0 -z-10 from-navy-900/95 via-navy-800/80 to-navy-800/25',
          align === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l',
        )}
        aria-hidden="true"
      />

      <div className="container relative py-20 md:py-28">
        <Reveal className={align === 'right' ? 'ml-auto max-w-xl text-right' : 'max-w-xl'}>
          {eyebrow && <p className="eyebrow mb-4 text-emerald-400">{eyebrow}</p>}
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
            {heading}
          </h2>
          <div className={`bridge-rule mt-5 ${align === 'right' ? 'ml-auto' : ''}`} />
          {body && <p className="mt-5 text-base leading-relaxed text-slate-300">{body}</p>}
        </Reveal>
      </div>
    </section>
  );
}
