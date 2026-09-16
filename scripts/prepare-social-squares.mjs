/**
 * Square (1080x1080) versions of the article share cards, for Instagram.
 *
 * The 1200x630 cards in public/brand/insights/og are shaped for the link
 * previews LinkedIn, Facebook and X render. Instagram is a square-first feed
 * and crops a 1.91:1 image to its centre, which on those cards removes the
 * wordmark at the bottom and usually a line of the title with it.
 *
 * Built from the same photograph and the same title text rather than by
 * letterboxing the landscape card, so the type is laid out for the shape it
 * ends up in instead of being scaled down inside grey bars.
 *
 * Run with: node scripts/prepare-social-squares.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const S = 1080;
const SRC = path.resolve('public/brand/insights');
const OUT = path.resolve('public/brand/insights/square');
mkdirSync(OUT, { recursive: true });

function readArticles() {
  const src = readFileSync(path.resolve('lib/insights.ts'), 'utf8');
  const english = src.slice(0, src.indexOf('const zh'));
  const re = /id:\s*'([a-z0-9-]+)',\s*\n\s*category:\s*'([^']*)',\s*\n\s*title:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(english))) out.push({ id: m[1], category: m[2], title: m[3].replace(/\\'/g, "'") });
  return out;
}

function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s,;:.–—-]+$/, '')}…`;
    return kept;
  }
  return lines;
}

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Heavier at the foot than the landscape card: a square crops less predictably
   in-feed, so the type sits well inside the safe area. */
const scrim = Buffer.from(`
<svg width="${S}" height="${S}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0A192F" stop-opacity="0.34"/>
      <stop offset="42%"  stop-color="#0A192F" stop-opacity="0.74"/>
      <stop offset="100%" stop-color="#0A192F" stop-opacity="0.97"/>
    </linearGradient>
  </defs>
  <rect width="${S}" height="${S}" fill="url(#g)"/>
  <rect x="0" y="${S - 10}" width="${S}" height="10" fill="#047857"/>
</svg>`);

function typeLayer({ title, category }) {
  const size = title.length > 58 ? 64 : 74;
  const lines = wrap(title, title.length > 58 ? 24 : 21, 4);
  const baseline = S - 150;
  const leading = size + 18;
  const firstY = baseline - (lines.length - 1) * leading;

  const rendered = lines
    .map((l, i) => `<text x="84" y="${firstY + i * leading}" class="t" fill="#FFFFFF">${escapeXml(l)}</text>`)
    .join('\n  ');

  return Buffer.from(`
<svg width="${S}" height="${S}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .t { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 800; font-size: ${size}px; }
    .k { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 25px; letter-spacing: 4px; }
    .b { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 30px; letter-spacing: 1px; }
  </style>
  <text x="84" y="${firstY - 58}" class="k" fill="#34D399">${escapeXml(category.toUpperCase())}</text>
  ${rendered}
  <text x="84" y="${S - 66}" class="b" fill="#FFFFFF">HariNex<tspan fill="#F59E0B" dx="11">Global</tspan></text>
</svg>`);
}

const articles = readArticles();
if (!articles.length) throw new Error('no articles parsed from lib/insights.ts');

for (const article of articles) {
  const from = path.join(SRC, `${article.id}.webp`);
  if (!existsSync(from)) {
    console.warn(`skip ${article.id}: no photograph at ${from}`);
    continue;
  }
  const out = path.join(OUT, `${article.id}.jpg`);
  await sharp(from)
    .resize(S, S, { fit: 'cover', position: sharp.strategy.attention })
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: typeLayer(article), top: 0, left: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log(`${article.id}`.padEnd(50), `${Math.round(statSync(out).size / 1024)} KB`);
}
