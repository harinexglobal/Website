'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * "Email us directly" that works even with no mail client installed.
 *
 * A bare `mailto:` looks broken on any machine without a registered handler:
 * the browser has nothing to hand the click to, so nothing happens at all — no
 * error, no feedback. That is most people reading mail in a browser tab, which
 * is how this was first noticed on the firm's own laptop.
 *
 * So the click does two things. The href stays a real `mailto:`, so a desktop
 * client still opens as before; and the address is copied to the clipboard with
 * visible confirmation, so when nothing opens the visitor is holding the
 * address rather than wondering what happened.
 *
 * The label is the address itself rather than "Email us directly" — it answers
 * the question before the click, which no amount of fallback can beat.
 */
export function EmailButton({
  email,
  copiedLabel,
  className,
  variant = 'ghostLight',
  size = 'lg',
}: {
  email: string;
  copiedLabel: string;
  className?: string;
} & VariantProps<typeof buttonVariants>) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    /* Best-effort. Clipboard access can be denied, and if it is the mailto is
       still doing its job — so a failure here is silent rather than an error
       the visitor can do nothing about. */
    navigator.clipboard?.writeText(email).then(
      () => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 2600);
      },
      () => {},
    );
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={copy}
      className={cn(buttonVariants({ variant, size }), 'whitespace-nowrap', className)}
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Mail className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : email}</span>
    </a>
  );
}
