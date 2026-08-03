import type { MetadataRoute } from 'next';
import { dictionaries } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/capabilities', '/industries', '/why-taiwan-india', '/insights', '/contact'];
  const capabilityRoutes = dictionaries.en.capabilities.items.map((c) => `/capabilities/${c.id}`);
  const now = new Date();

  return [...routes, ...capabilityRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/capabilities/') ? 0.7 : 0.8,
  }));
}
