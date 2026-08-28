import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketContent } from '@/components/pages/market-content';
import { dictionaries } from '@/lib/content';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

/**
 * One statically generated corridor page per market that has one.
 *
 * `dynamicParams = false` matters more here than elsewhere: /where-we-work
 * already lists all seven markets, and without this a request for
 * /where-we-work/singapore would be rendered on demand rather than 404ing,
 * producing a real URL for a page with no content behind it.
 */

const markets = dictionaries.en.marketPages.items;

export function generateStaticParams() {
  return markets.map((m) => ({ market: m.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}): Promise<Metadata> {
  const { market } = await params;
  const m = markets.find((x) => x.id === market);
  if (!m) return {};

  return {
    title: m.title,
    description: `${m.lead} ${m.intro[0]}`.slice(0, 200),
    alternates: { canonical: `/where-we-work/${m.id}` },
    openGraph: {
      title: `${m.title} | HariNex Global`,
      description: m.lead,
      type: 'article',
    },
  };
}

export default async function MarketPage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const m = markets.find((x) => x.id === market);
  if (!m) notFound();

  return (
    <>
      <script
        {...jsonLd(
          breadcrumbSchema([
            { name: 'Where We Work', path: '/where-we-work' },
            { name: m.market, path: `/where-we-work/${m.id}` },
          ]),
        )}
      />
      <MarketContent slug={market} />
    </>
  );
}
