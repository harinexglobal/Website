/**
 * Generates a share card per article at public/brand/insights/og/<id>.jpg.
 *
 * Every article previously fell back to the site-wide public/brand/og.jpg, so
 * six different pieces posted to LinkedIn looked like the same link. The card
 * is the only part of an article most people on a feed ever see, and an
 * identical one tells them nothing about which piece they are being offered.
 *
 * Built on the article's own photograph, which already exists and is already
 * keyed by id — so the card and the on-site card cannot drift apart.
 *
 * 1200x630 and JPEG for the same reason as scripts/prepare-og-image.mjs:
 * it is the size every platform crops from, and LinkedIn's crawler has a long
 * history of ignoring WebP share images.
 *
 * Titles are read from lib/insights.ts rather than retyped, so a retitled
 * article regenerates correctly. English only — the article pages are
 * prerendered from the English dictionary, and that is what a crawler sees.
 *
 * Re-run with: node scripts/prepare-insight-og.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const W = 1200;
const H = 630;
const SRC = path.resolve('public/brand/insights');
const OUT = path.resolve('public/brand/insights/og');
mkdirSync(OUT, { recursive: true });

/**
 * Pull id/title/category straight out of the dictionary.
 *
 * lib/insights.ts is TypeScript with two language blocks, so it cannot simply
 * be imported from a plain .mjs script. Reading the English block by hand is
 * the smaller evil: the alternative is a second list of titles that goes stale
 * the first time someone edits one.
 */
function readArticles() {
  const src = readFileSync(path.resolve('lib/insights.ts'), 'utf8');
  /* Stop at the Chinese block so zh titles never leak into an English card. */
  const english = src.slice(0, src.indexOf('const zh'));

  const articles = [];
  const re = /id:\s*'([a-z0-9-]+)',\s*\n\s*category:\s*'([^']*)',\s*\n\s*title:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(english))) {
    articles.push({ id: m[1], category: m[2], title: m[3].replace(/\\'/g, "'") });
  }
  return articles;
}

/** SVG has no text wrapping, so lines are measured and broken here. */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s,;:.–—-]+$/, '')}…`;
    return kept;
  }
  return lines;
}

/** & < > in a title would otherwise break the SVG document. */
const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const scrim = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0A192F" stop-opacity="0.42"/>
      <stop offset="45%"  stop-color="#0A192F" stop-opacity="0.80"/>
      <stop offset="100%" stop-color="#0A192F" stop-opacity="0.97"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#047857"/>
</svg>`);

function typeLayer({ title, category }) {
  /* Longer titles drop a size rather than spilling off the card. */
  const size = title.length > 58 ? 52 : 60;
  const lines = wrap(title, title.length > 58 ? 30 : 27, 3);

  /* Bottom-anchored: the block grows upward, so a one-line and a three-line
     title sit on the same baseline instead of floating at different heights. */
  const baseline = H - 96;
  const leading = size + 14;
  const firstY = baseline - (lines.length - 1) * leading;

  const rendered = lines
    .map((l, i) => `<text x="80" y="${firstY + i * leading}" class="t" fill="#FFFFFF">${escapeXml(l)}</text>`)
    .join('\n  ');

  return Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .t { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 800; font-size: ${size}px; }
    .k { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 20px; letter-spacing: 3.5px; }
    .b { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 24px; letter-spacing: 1px; }
  </style>
  <text x="80" y="${firstY - 46}" class="k" fill="#34D399">${escapeXml(category.toUpperCase())}</text>
  ${rendered}
  <text x="80" y="${H - 44}" class="b" fill="#FFFFFF">HariNex<tspan fill="#F59E0B" dx="9">Global</tspan></text>
</svg>`);
}

const articles = readArticles();
if (!articles.length) throw new Error('no articles parsed from lib/insights.ts — check the regex');

for (const article of articles) {
  const from = path.join(SRC, `${article.id}.webp`);
  if (!existsSync(from)) {
    console.warn(`skip ${article.id}: no card photograph at ${from}`);
    continue;
  }

  const out = path.join(OUT, `${article.id}.jpg`);
  await sharp(from)
    .resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: typeLayer(article), top: 0, left: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);

  console.log(`${article.id}`.padEnd(50), `${Math.round(statSync(out).size / 1024)} KB`);
}
