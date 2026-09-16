import { statSync } from 'node:fs';
import path from 'node:path';
import { insightsDictionaries } from '@/lib/insights';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harinexglobal.com';

/**
 * RSS 2.0 feed of the insight articles.
 *
 * Two jobs. It is how anyone following the firm's writing subscribes without
 * handing over an email address, and it is the input every social scheduler —
 * Buffer, Zapier, Make, IFTTT — reads to post a new article automatically. That
 * matters more than it sounds: it is the one route to automated distribution
 * that needs no platform credentials stored anywhere, so nothing to leak and
 * nothing to re-authorise when a token expires.
 *
 * English only, matching the prerendered HTML. A Chinese feed would need its
 * own URL and its own `language`, and inventing one nobody has asked for is how
 * a feed ends up half-maintained.
 *
 * Statically generated at build time — the article list only changes when the
 * site is rebuilt, so there is nothing to serve dynamically.
 */
export const dynamic = 'force-static';

const dict = insightsDictionaries.en;

/* Matches the lead on /insights. Held here rather than read from content.ts
   because the feed describes the channel, not the page, and the two are free
   to diverge. */
const FEED_DESCRIPTION = 'Practical notes on cross-border technology, sourcing and compliance.';

/** RSS requires RFC-822 dates; the articles carry plain YYYY-MM-DD. */
function rfc822(date: string) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

/**
 * Byte size of a share card, for the enclosure's `length`.
 *
 * The spec requires it and some readers use it to decide whether to prefetch.
 * Read from disk at build time rather than hardcoded; a missing file falls back
 * to 0, which readers treat as unknown rather than as an error.
 */
function cardBytes(id: string) {
  try {
    return statSync(path.join(process.cwd(), 'public', 'brand', 'insights', 'og', `${id}.jpg`)).size;
  } catch {
    return 0;
  }
}

/* Escaped rather than wrapped in CDATA: a title containing "]]>" would end a
   CDATA section early, and titles here already contain ampersands and dashes. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  /* Newest first — a reader that shows the feed in order should lead with the
     most recent piece, and the dictionary is not kept in date order. */
  const articles = [...dict.articles].sort((a, b) => b.date.localeCompare(a.date));

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/insights/${a.id}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(a.date)}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description>${escapeXml(a.excerpt)}</description>
      <enclosure url="${SITE_URL}/brand/insights/og/${a.id}.jpg" type="image/jpeg" length="${cardBytes(a.id)}" />
    </item>`;
    })
    .join('\n');

  /* lastBuildDate is the newest article, not the build clock. A feed that
     changes its timestamp on every deploy teaches pollers to ignore it, the
     same way a sitemap does. */
  const lastBuildDate = articles.length ? rfc822(articles[0].date) : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HariNex Global — Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
