import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CapabilityDetail } from '@/components/pages/capability-detail';
import { dictionaries } from '@/lib/content';
import { breadcrumbSchema, jsonLd, serviceSchema } from '@/lib/schema';

/**
 * One statically generated page per capability. Metadata is built from the
 * English dictionary because that is what the prerendered HTML ships with;
 * the visible copy still switches with the language toggle at runtime.
 */

const caps = dictionaries.en.capabilities.items;

export function generateStaticParams() {
  return caps.map((c) => ({ slug: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cap = caps.find((c) => c.id === slug);
  if (!cap) return {};

  return {
    title: cap.title,
    description: `${cap.summary} ${cap.description}`.slice(0, 200),
    keywords: cap.tags,
    alternates: { canonical: `/what-we-do/${cap.id}` },
    openGraph: {
      title: `${cap.title} | HariNex Global`,
      description: cap.summary,
      type: 'article',
    },
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = caps.find((c) => c.id === slug);
  if (!cap) notFound();

  /* Service says what this page offers; BreadcrumbList says where it sits.
     The mega menu is client-rendered on hover, so the hierarchy appears
     nowhere in the HTML a crawler receives — this is the only place it does. */
  return (
    <>
      <script {...jsonLd(serviceSchema(slug))} />
      <script
        {...jsonLd(
          breadcrumbSchema([
            { name: 'What We Do', path: '/what-we-do' },
            { name: cap.title, path: `/what-we-do/${cap.id}` },
          ]),
        )}
      />
      <CapabilityDetail slug={slug} />
    </>
  );
}
