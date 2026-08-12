/**
 * Prepares the market photographs used by the Technology Bridge cards.
 *
 * Keyed by the location ids in `network.locations`, so a card can never show a
 * photograph belonging to a different market.
 *
 * 720x432 rather than anything larger: three of the sources are small
 * (America 554px, Germany 635px, Korea 468px wide) and the cards display these
 * at roughly 380px, so a bigger target would only upscale further for no
 * visible gain.
 *
 * Run with: node scripts/prepare-market-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('public/brand/markets');
mkdirSync(OUT, { recursive: true });

const IMAGES = [
  { id: 'taipei', src: 'taiwan.png' },
  { id: 'bengaluru', src: 'India.webp' },
  { id: 'michigan', src: 'America.jfif' },
  { id: 'seoul', src: 'Korea.jfif' },
  { id: 'germany', src: 'Germany.jfif' },
  { id: 'singapore', src: 'singapore.webp' },
  { id: 'australia', src: 'Australia.jpg' },
];

for (const { id, src } of IMAGES) {
  const from = path.resolve('Images/country', src);
  if (!existsSync(from)) {
    console.warn(`skip ${id}: ${src} not found`);
    continue;
  }

  await sharp(from)
    .resize(720, 432, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(OUT, `${id}.webp`));

  const meta = await sharp(path.join(OUT, `${id}.webp`)).metadata();
  console.log(`${id}.webp`.padEnd(20), `${meta.width}x${meta.height}`);
}
