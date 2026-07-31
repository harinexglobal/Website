'use client';

import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-saffron-500 text-white shadow-sm hover:bg-saffron-600 hover:shadow-md active:scale-[0.985]',
        emerald:
          'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md active:scale-[0.985]',
        navy: 'bg-navy-700 text-white shadow-sm hover:bg-navy-600 hover:shadow-md active:scale-[0.985]',
        outline:
          'border border-slate-300 bg-white text-navy-800 hover:border-navy-600 hover:bg-slate-50',
        ghostLight:
          'border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10',
        link: 'text-azure-500 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type BaseProps = VariantProps<typeof buttonVariants> & { className?: string };

export type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonLinkProps = BaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & { href: string };

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, href, ...props }: ButtonLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a href={href} className={cn(buttonVariants({ variant, size }), className)} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }

  return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
