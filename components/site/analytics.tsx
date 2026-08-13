/**
 * Cloudflare Web Analytics.
 *
 * Chosen over Google Analytics deliberately. The storage notice on this site
 * promises that nothing but the language preference and the acknowledgement is
 * kept in the browser, and GA would make that promise false — it writes _ga
 * cookies and would need a consent gate before it could fire at all. Cloudflare
 * Web Analytics sets no cookies, writes nothing to localStorage and does not
 * fingerprint the device, so the promise stands and the measurement is complete
 * rather than limited to visitors who happened to click Accept.
 *
 * The token is checked in on purpose. It is not a secret: it ships in the HTML
 * of every page on every site using this product, and it names the site rather
 * than a visitor. Keeping it here means a deploy is all that is needed — an
 * environment variable would have to be set in Netlify AND the site rebuilt,
 * because NEXT_PUBLIC_ values are inlined at build time rather than read at
 * runtime. That gap has already cost this project an hour once.
 *
 * NEXT_PUBLIC_CF_BEACON_TOKEN still overrides it, for a staging property.
 *
 * `type="module"` mirrors Cloudflare's own snippet. The bundle they serve today
 * has no module syntax and would run as a classic script, but matching what
 * they publish means a change on their side cannot silently break the beacon.
 * Module scripts are deferred by definition, so this never blocks rendering.
 */
const DEFAULT_TOKEN = 'fe0db6e6f75943d7b99ef33b99879c19';

export function Analytics() {
  // Keep local `npm run dev` out of the production figures.
  if (process.env.NODE_ENV !== 'production') return null;

  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? DEFAULT_TOKEN;
  if (!token) return null;

  return (
    // no-sync-scripts wants a defer/async attribute and does not know that a
    // module script is deferred by definition. Adding one would be a no-op the
    // HTML spec ignores, and would stop this matching Cloudflare's snippet.
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
