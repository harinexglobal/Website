'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT, ROUTES } from '@/lib/content';

export function CtaBand() {
  const { t } = useLang();

  return (
    <section className="surface-navy on-navy">
      <div className="container relative py-16 md:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
              {t.cta.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">{t.cta.body}</p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={ROUTES.letsConnect} size="lg">
              {t.cta.primary}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={`mailto:${CONTACT.email}`} variant="ghostLight" size="lg">
              <Mail className="h-4 w-4" />
              {t.cta.secondary}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
