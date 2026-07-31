/**
 * Optimises the supplied hero artwork for the web.
 * Images/hero image.png (1.6 MB PNG) -> public/brand/hero.webp + hero.jpg
 * Run with: node scripts/prepare-hero.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('Images/hero image.png');
const OUT = path.resolve('public/brand');

async function main() {
  await mkdir(OUT, { recursive: true });

  const meta = await sharp(SRC).metadata();
  console.log(`source: ${meta.width}x${meta.height} ${(meta.size / 1024 / 1024).toFixed(2)} MB`);

  const base = sharp(SRC).resize({ width: 2200, withoutEnlargement: true });

  await base.clone().webp({ quality: 82, effort: 5 }).toFile(path.join(OUT, 'hero.webp'));
  await base.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, 'hero.jpg'));

  // Tiny blurred placeholder for next/image blurDataURL
  const blur = await sharp(SRC).resize(20).webp({ quality: 40 }).toBuffer();
  console.log(`blurDataURL length: ${blur.toString('base64').length}`);
  console.log(`data:image/webp;base64,${blur.toString('base64')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
