/**
 * Prepares team headshots for the website.
 *
 * Sources live in Team/ (gitignored — that folder holds CVs with personal
 * addresses and phone numbers). Only the cropped, resized headshot is written
 * into public/, which is what actually belongs on a public team page.
 *
 * Run with: node scripts/prepare-team-photos.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('public/brand/team');
mkdirSync(OUT, { recursive: true });

const PHOTOS = [
  { src: 'Team/photos/naveen.png', name: 'kanagaraj-naveen' },
];

for (const p of PHOTOS) {
  const src = path.resolve(p.src);
  if (!existsSync(src)) {
    console.warn(`skip ${p.name}: ${p.src} not found`);
    continue;
  }

  // Square crop biased to the top — headshots put the face above centre, so a
  // straight centre crop cuts the forehead.
  await sharp(src)
    .resize(400, 400, { fit: 'cover', position: 'top' })
    .webp({ quality: 86, effort: 6 })
    .toFile(path.join(OUT, `${p.name}.webp`));

  const meta = await sharp(path.join(OUT, `${p.name}.webp`)).metadata();
  console.log(`${p.name}.webp  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
}
