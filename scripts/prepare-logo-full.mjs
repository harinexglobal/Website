/**
 * Builds public/brand/logo-full.png — the stacked lockup: mark over wordmark.
 *
 * Why this exists separately from prepare-logo.mjs: that script crops both the
 * mark and the wordmark out of Images/logo.png, and the supplied artwork reads
 * "HariNext Global" over "CONNECTING TAIWAN & INDIA" — the pre-rename name and
 * the bilateral positioning the firm moved away from. Re-running it would put
 * the wrong company name back.
 *
 * So the mark is taken from the artwork (it is just the squirrel, and correct)
 * and the wordmark is drawn as type, in the same colours the site renders it:
 * forest green with the "Nex" in saffron, matching the navbar and footer.
 *
 * No tagline. The old one was wrong and any replacement would be another thing
 * to keep in step with the positioning — a lockup with no strapline cannot go
 * stale.
 *
 * This is a functional replacement, not a designed logo. It is strictly better
 * than one spelling the company's name wrong, and it should be replaced by
 * proper artwork when a designer redraws the wordmark. At that point delete
 * this script and point prepare-logo.mjs at the new source.
 *
 * Run with: node scripts/prepare-logo-full.mjs
 */
import sharp from 'sharp';
import path from 'node:path';

const OUT = path.resolve('public/brand/logo-full.png');

/* Matches the navbar: text-forest-600 with text-saffron-500 on "Nex". */
const FOREST = '#1B5E20';
const SAFFRON = '#E8821E';

const W = 1200;
const MARK_H = 520;
const TYPE_H = 300;
const GAP = 60;
const H = MARK_H + GAP + TYPE_H;

const mark = await sharp('public/brand/logo-mark.png')
  .resize({ height: MARK_H, fit: 'inside' })
  .toBuffer();
const markMeta = await sharp(mark).metadata();

/* textLength pins the drawn width so the lockup centres predictably whatever
   font the rendering machine substitutes — the family list below is a
   preference, not a guarantee. */
const wordmark = Buffer.from(`
<svg width="${W}" height="${TYPE_H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .w { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
         font-weight: 800; font-size: 168px; letter-spacing: -4px; }
  </style>
  <text x="${W / 2}" y="200" class="w" text-anchor="middle" fill="${FOREST}"
    >Hari<tspan fill="${SAFFRON}">Nex</tspan><tspan dx="34">Global</tspan></text>
</svg>`);

await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: mark, top: 0, left: Math.round((W - (markMeta.width ?? 0)) / 2) },
    { input: wordmark, top: MARK_H + GAP, left: 0 },
  ])
  .png()
  .trim({ threshold: 0 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} (${meta.width}x${meta.height}, transparent)`);
