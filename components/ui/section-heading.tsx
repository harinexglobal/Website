'use client';

import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

type Props = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  lead,
  align = 'left',
  invert = false,
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-4',
            align === 'center' && 'justify-center',
            invert ? 'text-emerald-400' : 'text-saffron-600',
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2 className={cn('h-section', invert ? 'text-white' : 'text-navy-800')}>{heading}</h2>

      <div className={cn('bridge-rule mt-5', align === 'center' && 'mx-auto')} />

      {lead && (
        <p className={cn('mt-5 text-base leading-relaxed', invert ? 'text-slate-300' : 'text-slate-600')}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
