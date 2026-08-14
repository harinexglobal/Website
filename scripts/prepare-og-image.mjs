/**
 * Generates the Open Graph share card at public/brand/og.jpg.
 *
 * The site had no og:image at all, so every share on LinkedIn, Facebook, X or
 * WhatsApp rendered as a bare text card. For a firm whose first contact with
 * most people is a link posted somewhere, that is the first impression.
 *
 * 1200x630 is the size every platform crops from. JPEG rather than WebP
 * deliberately: LinkedIn's crawler has a long history of ignoring WebP share
 * images, and a share card that silently fails is worse than a larger file.
 *
 * The wordmark is drawn as SVG text rather than composited from
 * public/brand/logo-full.png, because that file still reads "HariNext Global"
 * and "Connecting Taiwan & India" — the old name and the superseded bilateral
 * positioning. Drawing the type here means the card carries the right name
 * without waiting for the logo to be redrawn.
 *
 * Re-run with: node scripts/prepare-og-image.mjs
 */
import sharp from 'sharp';
import path from 'node:path';

const W = 1200;
const H = 630;
const OUT = path.resolve('public/brand/og.jpg');

/* Navy scrim, heavier on the left where the type sits. Without it the
   photograph competes with the wordmark at thumbnail size. */
const scrim = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0A192F" stop-opacity="0.97"/>
      <stop offset="55%"  stop-color="#0A192F" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#0A192F" stop-opacity="0.62"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#047857"/>
</svg>`);

/* Type. Font families are named with generous fallbacks — this renders on
   whatever machine runs the script, and a missing family silently drops the
   text rather than erroring, so the output is checked by eye afterwards. */
const type = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .name  { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 800; font-size: 78px; }
    .lede  { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 31px; }
    .kicker{ font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 21px; letter-spacing: 3.5px; }
  </style>
  <text x="96" y="250" class="kicker" fill="#34D399">HEADQUARTERED IN TAIWAN</text>
  <!-- dx rather than a leading space: SVG collapses whitespace, which ran
       the wordmark together as "HariNexGlobal". -->
  <text x="96" y="345" class="name" fill="#FFFFFF">HariNex<tspan fill="#F59E0B" dx="20">Global</tspan></text>
  <text x="96" y="410" class="lede" fill="#CBD5E1">Technology transfer, sourcing and market entry</text>
  <text x="96" y="455" class="lede" fill="#CBD5E1">across seven markets.</text>
</svg>`);

const mark = await sharp('public/brand/logo-mark.png')
  .resize({ height: 96 })
  .toBuffer();

await sharp('public/brand/hero.webp')
  .resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
  .composite([
    { input: scrim, top: 0, left: 0 },
    { input: mark, top: 96, left: 96 },
    { input: type, top: 0, left: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

const { size } = await sharp(OUT).metadata();
console.log(`wrote ${OUT} (${W}x${H}, ${Math.round((size ?? 0) / 1024)} KB)`);
