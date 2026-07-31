'use client';

import { useLang } from '@/components/providers/language-provider';
import { ContentIcon } from '@/components/ui/icon';
import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export function IndustriesGrid({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();

  return (
    <section className="section" id="industries">
      <div className="container">
        {showHeading && (
          <SectionHeading
            eyebrow={t.industries.eyebrow}
            heading={t.industries.heading}
            lead={t.industries.lead}
            className="mb-12"
          />
        )}

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.items.map((ind) => (
            <RevealItem key={ind.id}>
              <article className="card-base card-hover group h-full">
                {/* accent bar */}
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-t-xl bg-bridge-grad transition-transform duration-500 group-hover:scale-x-100" />

                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 text-emerald-400 transition-colors group-hover:bg-navy-700">
                  <ContentIcon name={ind.icon} className="h-5 w-5" />
                </span>

                <h3 className="h-card text-navy-800">{ind.title}</h3>
                <p className="copy mt-2.5 text-[0.9rem]">{ind.body}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {ind.pills.map((p) => (
                    <span key={p} className="pill text-[0.7rem]">
                      {p}
                    </span>
                  ))}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
