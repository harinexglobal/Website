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
 * The token is public by design — it ships in the page source of every site
 * using this product and identifies the site, not a visitor. NEXT_PUBLIC_ is
 * therefore correct here and is not a leaked secret.
 *
 * Renders nothing when the token is unset, so local development and preview
 * builds do not pollute the production figures.
 *
 * Note for whoever changes this: NEXT_PUBLIC_ values are inlined at build time,
 * not read at runtime. Setting the variable in Netlify does nothing until the
 * site is rebuilt.
 */
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
