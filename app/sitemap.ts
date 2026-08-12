import type { MetadataRoute } from 'next';
import { dictionaries } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/about/team',
    '/capabilities',
    '/industries',
    '/markets',
    '/markets/collaborators',
    '/how-we-help',
    '/lets-connect',
    '/insights',
    '/contact',
  ];
  const capabilityRoutes = dictionaries.en.capabilities.items.map((c) => `/capabilities/${c.id}`);
  const insightRoutes = insightsDictionaries.en.articles.map((a) => `/insights/${a.id}`);
  const legalRoutes = ['/privacy', '/terms', '/disclaimer'];
  const now = new Date();

  const priority = (route: string) => {
    if (route === '') return 1;
    if (legalRoutes.includes(route)) return 0.3;
    if (route.startsWith('/capabilities/')) return 0.7;
    return 0.8;
  };

  return [...routes, ...capabilityRoutes, ...insightRoutes, ...legalRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : legalRoutes.includes(route) ? 'yearly' : 'monthly',
    priority: priority(route),
  }));
}
