import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightDetail } from '@/components/pages/insight-detail';
import { insightsDictionaries } from '@/lib/insights';

const articles = insightsDictionaries.en.articles;

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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InsightDetail slug={slug} />
    </>
  );
}
