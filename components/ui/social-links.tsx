'use client';

import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SOCIAL } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Social icons for the header and footer.
 *
 * Entries with an empty `href` are skipped, so a profile that does not exist
 * yet simply does not render rather than linking nowhere.
 *
 * X ships as an inline SVG — Lucide still only has the old Twitter bird.
 */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const ICONS: Record<string, (p: { className?: string }) => React.ReactNode> = {
  facebook: ({ className }) => <Facebook className={className} strokeWidth={1.9} aria-hidden="true" />,
  instagram: ({ className }) => <Instagram className={className} strokeWidth={1.9} aria-hidden="true" />,
  linkedin: ({ className }) => <Linkedin className={className} strokeWidth={1.9} aria-hidden="true" />,
  x: ({ className }) => <XIcon className={className} />,
};

export function SocialLinks({
  variant = 'light',
  className,
  size = 'sm',
}: {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md';
}) {
  const links = SOCIAL.filter((s) => s.href);
  if (!links.length) return null;

  const box = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const icon = size === 'sm' ? 'h-[0.9rem] w-[0.9rem]' : 'h-4 w-4';

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {links.map((s) => {
        const Icon = ICONS[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={s.label}
              title={s.label}
              className={cn(
                'flex items-center justify-center rounded-lg transition-colors',
                box,
                variant === 'dark'
                  ? 'border border-white/15 text-slate-300 hover:border-emerald-400/40 hover:text-emerald-400'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-navy-800',
              )}
            >
              {Icon ? Icon({ className: icon }) : s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
