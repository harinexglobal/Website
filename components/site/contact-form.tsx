'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Paperclip, X as XIcon, CheckCircle2, Mail, X } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { Button, ButtonLink } from '@/components/ui/button';
import { FieldError, FieldLabel, Input, Select, Textarea } from '@/components/ui/field';
import { CONTACT } from '@/lib/content';
import {
  ATTACHMENT_ACCEPT,
  checkAttachment,
  formatBytes,
  type AttachmentRejection,
} from '@/lib/attachment';
import { inquirySchema, REGION_VALUES, SERVICE_VALUES, type InquiryInput } from '@/lib/inquiry-schema';
import { cn } from '@/lib/utils';

type ErrorKey = keyof typeof errorKeyMap;
const errorKeyMap = {
  name: 'name',
  email: 'email',
  company: 'company',
  region: 'region',
  service: 'service',
  brief: 'brief',
} as const;

/**
 * `enquiry` comes from the selector above the form on Let's Connect. It is
 * carried in the payload rather than only in the UI so the enquiry type
 * reaches the inbox — routing the recipient cannot see is decoration.
 */
export function ContactForm({ enquiry }: { enquiry?: InquiryInput['enquiry'] } = {}) {
  const { t } = useLang();
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [delivered, setDelivered] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<AttachmentRejection | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      region: undefined,
      services: [],
      brief: '',
      website: '',
      enquiry,
    },
  });

  /* The selector can change after mount, so defaultValues alone is not enough. */
  useEffect(() => {
    setValue('enquiry', enquiry);
  }, [enquiry, setValue]);

  /** Maps a Zod message key to the localised sentence. */
  const msg = (key?: string) =>
    key && key in errorKeyMap ? t.contact.errors[errorKeyMap[key as ErrorKey]] : undefined;

  const onSubmit = async (data: InquiryInput) => {
    setServerError(null);
    try {
      /* multipart rather than JSON: a file cannot travel in a JSON body
         without base64, which inflates it by a third for no benefit. The
         Content-Type header is deliberately not set — the browser must add
         its own multipart boundary. */
      const form = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) value.forEach((v) => form.append(key, String(v)));
        else form.append(key, String(value));
      }
      if (file) form.append('attachment', file);

      const res = await fetch('/api/inquiry', { method: 'POST', body: form });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setServerError('Something went wrong. Please email us directly.');
        return;
      }

      setDelivered(Boolean(json.delivered));
      setStatus('success');
      reset();
      setFile(null);
      setFileError(null);
      if (fileInput.current) fileInput.current.value = '';
    } catch {
      setServerError('Network error. Please email us directly.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5" id="inquiry">
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="name" hint={t.contact.form.required}>
              {t.contact.form.name}
            </FieldLabel>
            <Input
              id="name"
              autoComplete="name"
              placeholder={t.contact.form.namePh}
              invalid={!!errors.name}
              {...register('name')}
            />
            <FieldError>{msg(errors.name?.message)}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="company" hint={t.contact.form.required}>
              {t.contact.form.company}
            </FieldLabel>
            <Input
              id="company"
              autoComplete="organization"
              placeholder={t.contact.form.companyPh}
              invalid={!!errors.company}
              {...register('company')}
            />
            <FieldError>{msg(errors.company?.message)}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="email" hint={t.contact.form.required}>
              {t.contact.form.email}
            </FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t.contact.form.emailPh}
              invalid={!!errors.email}
              {...register('email')}
            />
            <FieldError>{msg(errors.email?.message)}</FieldError>
          </div>

          <div>
            <FieldLabel htmlFor="phone" hint={t.contact.form.optional}>
              {t.contact.form.phone}
            </FieldLabel>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t.contact.form.phonePh}
              {...register('phone')}
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="region" hint={t.contact.form.required}>
            {t.contact.form.region}
          </FieldLabel>
          <Select id="region" defaultValue="" invalid={!!errors.region} {...register('region')}>
            <option value="" disabled>
              {t.contact.form.regionPh}
            </option>
            {REGION_VALUES.map((value, i) => (
              <option key={value} value={value}>
                {t.contact.form.regions[i]}
              </option>
            ))}
          </Select>
          <FieldError>{msg(errors.region?.message)}</FieldError>
        </div>

        {/* Service focus — multi-select chips */}
        <div>
          <FieldLabel hint={t.contact.form.required}>{t.contact.form.service}</FieldLabel>
          <Controller
            control={control}
            name="services"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.contact.form.service}>
                {SERVICE_VALUES.map((value, i) => {
                  const checked = field.value?.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={checked}
                      onClick={() =>
                        field.onChange(
                          checked
                            ? field.value.filter((v) => v !== value)
                            : [...(field.value ?? []), value],
                        )
                      }
                      className={cn(
                        'rounded-full border px-3.5 py-2 text-sm font-medium transition-all',
                        checked
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400',
                      )}
                    >
                      {t.contact.form.services[i]}
                    </button>
                  );
                })}
              </div>
            )}
          />
          <FieldError>{msg(errors.services?.message)}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="brief" hint={t.contact.form.required}>
            {t.contact.form.brief}
          </FieldLabel>
          <Textarea
            id="brief"
            rows={6}
            placeholder={t.contact.form.briefPh}
            invalid={!!errors.brief}
            {...register('brief')}
          />
          <FieldError>{msg(errors.brief?.message)}</FieldError>
        </div>

        {/* Attachment. Optional, and deliberately quiet — most enquiries do
            not need one, and a prominent upload box invites a CV. */}
        <div>
          <FieldLabel htmlFor="attachment" hint={t.contact.form.optional}>
            {t.contact.form.attachment}
          </FieldLabel>

          {file ? (
            <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
              <Paperclip className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.75} />
              <span className="min-w-0 flex-1 truncate text-sm text-navy-800">{file.name}</span>
              <span className="shrink-0 text-xs text-slate-500">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setFileError(null);
                  if (fileInput.current) fileInput.current.value = '';
                }}
                aria-label={t.contact.form.attachmentRemove}
                className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:text-red-600"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="attachment"
              className="mt-1.5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-emerald-500 hover:text-emerald-700"
            >
              <Paperclip className="h-4 w-4" strokeWidth={1.75} />
              {t.contact.form.attachmentChoose}
            </label>
          )}

          <input
            ref={fileInput}
            id="attachment"
            type="file"
            accept={ATTACHMENT_ACCEPT}
            className="sr-only"
            onChange={(e) => {
              const picked = e.target.files?.[0] ?? null;
              if (!picked) {
                setFile(null);
                setFileError(null);
                return;
              }
              /* Checked here so the visitor gets a sentence rather than a
                 rejected request. The server checks again — this one is a
                 courtesy, not a control. */
              const rejection = checkAttachment(picked);
              if (rejection) {
                setFile(null);
                setFileError(rejection);
                e.target.value = '';
                return;
              }
              setFile(picked);
              setFileError(null);
            }}
          />

          {fileError ? (
            <FieldError>
              {fileError === 'size'
                ? t.contact.form.attachmentTooBig
                : t.contact.form.attachmentBadType}
            </FieldError>
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">{t.contact.form.attachmentHint}</p>
          )}
        </div>

        {serverError && (
          <p role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
          <p className="text-xs text-slate-500">{t.contact.responseNote}</p>
        </div>
      </form>

      {/* Success modal, rendered into <body>.
          It has to be: the form sits inside a Reveal, whose motion transform
          makes it the containing block for any position:fixed descendant — so
          `fixed inset-0` resolved against that wrapper rather than the viewport
          and the confirmation appeared somewhere off-screen. Submitting looked
          like nothing happened. A portal escapes every containing block on the
          way up, which no amount of z-index can do. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {status === 'success' && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
              onClick={() => setStatus('idle')}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-card-lg"
            >
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="absolute right-4 top-4 rounded-md p-1 text-slate-400 transition-colors hover:text-navy-800"
                aria-label={t.contact.form.successClose}
              >
                <X className="h-4 w-4" />
              </button>

              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
              </span>

              <h2 id="success-title" className="font-display text-xl font-bold tracking-tight text-navy-800">
                {t.contact.form.successTitle}
              </h2>
              <p className="copy mt-2.5 text-sm">{t.contact.form.successBody}</p>

              {!delivered && (
                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3.5">
                  <p className="text-xs leading-relaxed text-amber-900">
                    {t.contact.form.undeliveredNote}
                  </p>
                  <ButtonLink
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Project inquiry — HariNex Global')}`}
                    variant="outline"
                    size="sm"
                    className="mt-3"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {CONTACT.email}
                  </ButtonLink>
                </div>
              )}

              <Button onClick={() => setStatus('idle')} variant="navy" className="mt-6 w-full">
                {t.contact.form.successClose}
              </Button>
            </motion.div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
