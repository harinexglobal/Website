import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/capabilities', '/industries', '/why-taiwan-india', '/insights', '/contact'];
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
