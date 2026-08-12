/**
 * Prepares the article photographs for the Insights grid.
 *
 * Keyed by article id in lib/insights.ts, so a card cannot show a photograph
 * belonging to a different piece.
 *
 * 1200x750 (16:10) — the cards render these as a banner across the top at
 * roughly 400px, and the largest source is an 8MB PNG that has no business
 * being served at native size.
 *
 * Run with: node scripts/prepare-insight-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('public/brand/insights');
mkdirSync(OUT, { recursive: true });

const IMAGES = [
  { id: 'why-taiwanese-companies-should-look-outward', src: 'why taiwan.png' },
  { id: 'technology-transfer-best-practices', src: 'market entry.png' },
  { id: 'supplier-qualification-checklist', src: 'sourcing.jpg' },
  { id: 'doing-business-in-taiwan', src: 'doing bussiness in taiwan.jpg' },
  { id: 'taiwan-global-trade-opportunities', src: 'trade opportunities.jpeg' },
  { id: 'website-localisation-for-international-companies', src: 'localization.webp' },
];

for (const { id, src } of IMAGES) {
  const from = path.resolve('Images/insights', src);
  if (!existsSync(from)) {
    console.warn(`skip ${id}: ${src} not found`);
    continue;
  }

  await sharp(from)
    .resize(1200, 750, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 76, effort: 6 })
    .toFile(path.join(OUT, `${id}.webp`));

  const meta = await sharp(path.join(OUT, `${id}.webp`)).metadata();
  console.log(`${id}`.padEnd(50), `${meta.width}x${meta.height}`);
}
