/**
 * Helpers for the metadata that search engines and social cards read.
 *
 * Kept separate from lib/schema.ts: that file builds JSON-LD, this one shapes
 * the plain <meta> strings. They fail in different ways and are edited for
 * different reasons.
 */

/** Google truncates a description around 155–160 characters on desktop and
 *  less on mobile, so anything past that is written for nobody. */
const DEFAULT_LIMIT = 160;

/**
 * Trim a description to `limit` characters without cutting a word in half.
 *
 * The practice and corridor pages built their descriptions by concatenating a
 * lead and a paragraph and slicing at a fixed count, which landed mid-word often
 * enough to be visible in the SERP — "...technical specification, visit si". A
 * snippet that ends in a fragment reads as a broken page before anyone clicks.
 *
 * Cuts at the last word boundary inside the limit, drops any trailing comma or
 * similar, and adds an ellipsis only when something was actually removed.
 */
export function metaDescription(text: string, limit: number = DEFAULT_LIMIT): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;

  /* One character of headroom so the ellipsis itself stays inside the limit. */
  const window = clean.slice(0, limit - 1);
  const lastSpace = window.lastIndexOf(' ');

  /* A single word longer than the limit has no boundary to cut at; a hard slice
     is the only option left, and it is better than returning the whole string. */
  const cut = lastSpace > 0 ? window.slice(0, lastSpace) : window;

  return `${cut.replace(/[\s,;:.!?—–-]+$/, '')}…`;
}
