import type { MetadataRoute } from 'next';
import { dictionaries } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

/**
 * When each page's content actually last changed, as YYYY-MM-DD.
 *
 * This file previously stamped `new Date()` on all thirty URLs, so every page
 * claimed to have been modified at the moment of the last deploy — including
 * pages untouched for months. Google's documented response to a lastmod value
 * it finds unreliable is to ignore lastmod for the whole site, which costs the
 * pages that genuinely did change.
 *
 * Dates are seeded from the commit that last altered each page's source or its
 * content in lib/content.ts. Insight articles are not listed here: each article
 * carries its own `date`, which is the real one.
 *
 * Adding a page means adding a date. `assertComplete` below fails the build if
 * you forget, which is the only reason these stay honest.
 */
const LAST_MODIFIED: Record<string, string> = {
  /* Gained the insights section on this date. */
  '': '2026-09-16',

  '/who-we-are': '2026-08-13',
  '/who-we-are/team': '2026-08-13',
  '/what-we-do': '2026-08-13',
  '/what-we-do/industries': '2026-08-13',
  '/how-we-help': '2026-08-13',
  '/where-we-work': '2026-08-13',
  '/where-we-work/collaborators': '2026-08-13',
  '/insights': '2026-08-06',
  '/lets-connect': '2026-08-12',

  /* The eight practice pages render from the capabilities block. */
  '/what-we-do/technology-transfer': '2026-08-13',
  '/what-we-do/business-advisory': '2026-08-13',
  '/what-we-do/supplier-sourcing': '2026-08-13',
  '/what-we-do/technical-translation': '2026-08-13',
  '/what-we-do/digital-solutions': '2026-08-13',
  '/what-we-do/regulatory': '2026-08-13',
  '/what-we-do/project-management': '2026-08-13',
  '/what-we-do/industrial-automation': '2026-08-13',

  /* The three corridor pages, added together. */
  '/where-we-work/india': '2026-08-28',
  '/where-we-work/united-states': '2026-08-28',
  '/where-we-work/germany': '2026-08-28',

  '/privacy': '2026-08-13',
  '/terms': '2026-08-13',
  '/disclaimer': '2026-08-13',
};

const LEGAL_ROUTES = ['/privacy', '/terms', '/disclaimer'];

/**
 * Fail the build rather than ship a wrong date.
 *
 * A route added to the site but not to LAST_MODIFIED would otherwise fall back
 * to something — today's date, or the epoch — and a silent fallback is how the
 * original problem got in. Throwing here surfaces it during `next build`, while
 * whoever added the page is still looking at it.
 */
function assertComplete(routes: string[]) {
  const missing = routes.filter((r) => !LAST_MODIFIED[r]);
  if (missing.length) {
    throw new Error(
      `sitemap: no lastModified date for ${missing.join(', ')}. ` +
        'Add each route to LAST_MODIFIED in app/sitemap.ts with the date its content last changed.',
    );
  }

  const malformed = routes.filter((r) => !/^\d{4}-\d{2}-\d{2}$/.test(LAST_MODIFIED[r]));
  if (malformed.length) {
    throw new Error(`sitemap: lastModified must be YYYY-MM-DD for ${malformed.join(', ')}.`);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* The five sections and their children. Kept in the same order as the
     navigation so a route added to one and forgotten in the other is obvious. */
  const routes = [
    '',
    '/who-we-are',
    '/who-we-are/team',
    '/what-we-do',
    '/what-we-do/industries',
    '/how-we-help',
    '/where-we-work',
    '/where-we-work/collaborators',
    '/insights',
    '/lets-connect',
  ];
  const capabilityRoutes = dictionaries.en.capabilities.items.map((c) => `/what-we-do/${c.id}`);
  /* Only the markets that actually have a corridor page. */
  const marketRoutes = dictionaries.en.marketPages.items.map((m) => `/where-we-work/${m.id}`);

  const dated = [...routes, ...capabilityRoutes, ...marketRoutes, ...LEGAL_ROUTES];
  assertComplete(dated);

  const priority = (route: string) => {
    if (route === '') return 1;
    if (LEGAL_ROUTES.includes(route)) return 0.3;
    if (route.startsWith('/what-we-do/')) return 0.7;
    return 0.8;
  };

  type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

  const changeFrequency = (route: string): ChangeFrequency =>
    route === '' ? 'weekly' : LEGAL_ROUTES.includes(route) ? 'yearly' : 'monthly';

  const staticEntries = dated.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(`${LAST_MODIFIED[route]}T00:00:00Z`),
    changeFrequency: changeFrequency(route),
    priority: priority(route),
  }));

  /* Each article already records the date it was written or last revised. */
  const insightEntries = insightsDictionaries.en.articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.id}`,
    lastModified: new Date(`${a.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...insightEntries];
}
