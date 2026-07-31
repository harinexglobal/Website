'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const baseField =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.95rem] text-navy-800 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ className, invalid, ...props }, ref) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        baseField,
        invalid ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-emerald-500',
        className,
      )}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ className, invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        baseField,
        'min-h-[8rem] resize-y',
        invalid ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-emerald-500',
        className,
      )}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(function Select({ className, invalid, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        baseField,
        'appearance-none bg-[length:1rem] bg-[right_0.85rem_center] bg-no-repeat pr-10',
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
        invalid ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-emerald-500',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2">
      <span className="text-sm font-semibold text-navy-800">{children}</span>
      {hint && <span className="text-2xs uppercase tracking-wider text-slate-400">{hint}</span>}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}
