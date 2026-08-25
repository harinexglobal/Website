import { CONTACT, dictionaries } from '@/lib/content';

/**
 * JSON-LD builders for the pages that describe a single thing.
 *
 * The root layout already emits Organization for every page, and the article
 * pages emit Article. What was missing is the layer in between: a practice page
 * said "here is a company" but never "here is a service that company offers",
 * and no page told a crawler where it sat in the site.
 *
 * Written in English only, deliberately. These pages are statically prerendered
 * from the English dictionary — the visible copy swaps at runtime via the
 * language toggle, but the HTML a crawler receives is English, and structured
 * data that disagreed with the rendered text would be worse than none.
 *
 * Nothing here claims anything the page does not already say. No ratings, no
 * review counts, no invented price ranges — the markup that most often earns a
 * manual action is the markup describing things that are not on the page.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

const PROVIDER = {
  '@type': 'Organization',
  name: 'HariNex Global Co., Ltd.',
  url: SITE_URL,
} as const;

/** The seven markets, named as the site names them. */
function areaServed() {
  return dictionaries.en.network.locations.map((m) => ({
    '@type': 'Country',
    name: m.country,
  }));
}

/**
 * Service, for a single practice page.
 *
 * `hasOfferCatalog` lists the deliverables the page already sets out, which is
 * the part a search engine can actually use to match an enquiry to the page.
 */
export function serviceSchema(slug: string) {
  const cap = dictionaries.en.capabilities.items.find((c) => c.id === slug);
  if (!cap) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cap.title,
    serviceType: cap.short ?? cap.title,
    description: cap.summary,
    provider: PROVIDER,
    areaServed: areaServed(),
    url: `${SITE_URL}/what-we-do/${cap.id}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: cap.title,
      itemListElement: cap.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
  };
}

/**
 * BreadcrumbList. Google renders this as the path shown under a result instead
 * of a bare URL, and it is the only way a crawler learns the hierarchy — the
 * mega menu is client-rendered on hover, so it is not in the HTML at all.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

/** The FAQ block that already renders on several pages. */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dictionaries.en.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Convenience: the props for a <script type="application/ld+json"> tag. */
export function jsonLd(data: unknown) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}

export { CONTACT };
