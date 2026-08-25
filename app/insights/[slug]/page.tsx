import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightDetail } from '@/components/pages/insight-detail';
import { insightsDictionaries } from '@/lib/insights';
import { breadcrumbSchema } from '@/lib/schema';

const articles = insightsDictionaries.en.articles;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.id === slug);
  if (!a) return {};

  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/insights/${a.id}` },
    openGraph: {
      type: 'article',
      title: `${a.title} | HariNex Global`,
      description: a.excerpt,
      publishedTime: a.date,
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) notFound();

  // Article structured data uses the English copy, matching the prerendered HTML.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    articleSection: article.category,
    author: { '@type': 'Organization', name: 'HariNex Global Co., Ltd.' },
    publisher: { '@type': 'Organization', name: 'HariNex Global Co., Ltd.' },
    /* Both added because the article now has its own hero photograph and a
       canonical of its own — an Article without mainEntityOfPage leaves the
       crawler to guess which URL the markup describes. */
    mainEntityOfPage: `${SITE_URL}/insights/${article.id}`,
    image: `${SITE_URL}/brand/insights/${article.id}.webp`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Insights', path: '/insights' },
              { name: article.title, path: `/insights/${article.id}` },
            ]),
          ),
        }}
      />
      <InsightDetail slug={slug} />
    </>
  );
}
