import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Keeps preview deployments out of Google.
 *
 * Search Console reported the homepage as "Duplicate, Google chose different
 * canonical than user" and named a port-prefixed dev preview host as the
 * canonical. Those preview URLs are publicly crawlable by default, so a preview
 * of this site was indexed and the real homepage was consolidated onto it —
 * which is why harinexglobal.com/ was absent from results for the brand name
 * while its own subpages ranked normally.
 *
 * An X-Robots-Tag on those hosts stops a preview from ever competing with
 * production again. It does not fix an existing consolidation — that needs
 * Request Indexing in Search Console once the duplicate stops being served.
 *
 * Deliberately an allowlist of known ephemeral hosts rather than "anything that
 * is not harinexglobal.com". A host check that is too broad would noindex the
 * production site the first time a proxy or platform passed an unexpected Host
 * header, and silently deindexing the whole site is far worse than missing one
 * preview. Add a pattern here if a new preview platform appears.
 */
const PREVIEW_HOST_PATTERNS = [
  /\.cloudworkstations\.dev$/i, // Firebase Studio / Cloud Workstations (port-prefixed, e.g. 8888-…)
  /\.netlify\.app$/i, // Netlify branch deploys and deploy previews
  /\.vercel\.app$/i,
  /\.ngrok(-free)?\.(io|app|dev)$/i,
  /\.trycloudflare\.com$/i,
  /\.gitpod\.io$/i,
  /\.github\.dev$/i,
  /\.repl\.co$/i,
];

function isPreviewHost(host: string) {
  /* Strip the port: preview platforms encode it in the hostname, not here. */
  const bare = host.split(':')[0].toLowerCase();
  return PREVIEW_HOST_PATTERNS.some((pattern) => pattern.test(bare));
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get('host') ?? '';

  if (isPreviewHost(host)) {
    /* noindex keeps it out of the index; nofollow stops the preview's own links
       being followed back into a second crawlable copy of the site. */
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

/**
 * Runs on pages, not on assets. The header only matters for documents a crawler
 * would index, and keeping static files out of the matcher keeps the middleware
 * off the hot path for every image the site serves.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|brand|favicon.ico|icon.png|robots.txt|sitemap.xml).*)'],
};
