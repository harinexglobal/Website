'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { FieldError, FieldLabel, Input, Textarea } from '@/components/ui/field';
import { quickInquirySchema, type QuickInquiryInput } from '@/lib/inquiry-schema';

/**
 * Three-field enquiry form embedded at the foot of each capability page, so a
 * visitor never has to navigate to /contact to start a conversation.
 */
export function QuickInquiry({ source }: { source?: string }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickInquiryInput>({
    resolver: zodResolver(quickInquirySchema),
    defaultValues: { name: '', email: '', message: '', source, website: '' },
  });

  const msg = (key?: string) => {
    if (key === 'name') return t.quickForm.errorName;
    if (key === 'email') return t.quickForm.errorEmail;
    if (key === 'message') return t.quickForm.errorMessage;
    return undefined;
  };

  const onSubmit = async (data: QuickInquiryInput) => {
    setFailed(false);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setFailed(true);
        return;
      }
      setDone(true);
      reset();
    } catch {
      setFailed(true);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-6 sm:p-8">
        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
        </span>
        <h3 className="h-card text-navy-800">{t.contact.form.successTitle}</h3>
        <p className="copy mt-2">{t.quickForm.success}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <h3 className="h-card text-navy-800">{t.quickForm.heading}</h3>
      <p className="copy mt-2 text-sm">{t.quickForm.lead}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-4">
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor={`w-${source ?? 'x'}`}>Website</label>
          <input id={`w-${source ?? 'x'}`} tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor={`qn-${source}`}>{t.quickForm.name}</FieldLabel>
            <Input id={`qn-${source}`} autoComplete="name" invalid={!!errors.name} {...register('name')} />
            <FieldError>{msg(errors.name?.message)}</FieldError>
          </div>
          <div>
            <FieldLabel htmlFor={`qe-${source}`}>{t.quickForm.email}</FieldLabel>
            <Input
              id={`qe-${source}`}
              type="email"
              autoComplete="email"
              invalid={!!errors.email}
              {...register('email')}
            />
            <FieldError>{msg(errors.email?.message)}</FieldError>
          </div>
        </div>

        <div>
          <FieldLabel htmlFor={`qm-${source}`}>{t.quickForm.message}</FieldLabel>
          <Textarea
            id={`qm-${source}`}
            rows={4}
            placeholder={t.quickForm.messagePh}
            invalid={!!errors.message}
            {...register('message')}
          />
          <FieldError>{msg(errors.message?.message)}</FieldError>
        </div>

        {failed && (
          <p role="alert" className="text-sm text-red-600">
            Something went wrong. Please email us directly.
          </p>
        )}

        <div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t.quickForm.submitting : t.quickForm.submit}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
