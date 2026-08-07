'use client';

import { useLang } from '@/components/providers/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { InsightsGrid } from '@/components/site/insights-grid';
import { BridgeCorridor } from '@/components/site/bridge-corridor';
import { CtaBand } from '@/components/site/cta-band';
import { Reveal } from '@/components/ui/reveal';
import { ButtonLink } from '@/components/ui/button';
import { ROUTES } from '@/lib/content';

export function InsightsContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        crumb={t.nav.insights}
        eyebrow={t.insights.eyebrow}
        title={t.insights.heading}
        lead={t.insights.lead}
      />

      <InsightsGrid showHeading={false} />

      {/* Sits below the articles on purpose: this page exists to get people
          into the writing, and a pinned 2.6-viewport section above the grid
          would put a scroll wall between the reader and the thing they came
          for. */}
      <BridgeCorridor />

      {/* Careers */}
      <section className="section-sm pb-20">
        <div className="container">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-10">
              <p className="eyebrow mb-4 text-saffron-600">{t.careers.eyebrow}</p>
              <h2 className="h-section text-navy-800">{t.careers.heading}</h2>
              <p className="copy mt-4 max-w-2xl">{t.careers.lead}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {t.careers.roles.map((r) => (
                  <li key={r} className="pill">
                    {r}
                  </li>
                ))}
              </ul>

              <ButtonLink href={ROUTES.contact} variant="navy" className="mt-8">
                {t.careers.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
