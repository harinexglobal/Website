/**
 * Prepares the capability photographs used by the home page service rail.
 *
 * Sources live in Images/Capability/ at up to 2.9MB each. The rail shows them
 * as tall narrow panels, so they are cropped to 4:5 portrait rather than
 * letterboxed: a 3:2 landscape source in a 200px-wide panel would show almost
 * nothing but the middle sliver anyway.
 *
 * Run with: node scripts/prepare-capability-images.mjs
 */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('public/brand/capabilities');
mkdirSync(OUT, { recursive: true });

/**
 * Keyed by capability id in lib/content.ts, so a panel can never show a photo
 * belonging to a different practice.
 *
 * business-advisory takes the trade-mission photograph deliberately: delegations
 * were folded into that practice, and the original advisory image is a 600x336
 * .jfif that falls apart at panel size.
 */
const IMAGES = [
  { id: 'technology-transfer', src: 'Technology Transfer & Commercialisation.jpeg' },
  { id: 'business-advisory', src: 'Trade Mission & Delegation Support.png' },
  { id: 'supplier-sourcing', src: 'Strategic Supplier Sourcing.png' },
  { id: 'technical-translation', src: 'Technical Translation & Localisation.png' },
  { id: 'regulatory', src: 'Regulatory Coordination and Documentation,.jpg' },
  { id: 'digital-solutions', src: 'Website & AI Digital Solutions.png' },
  { id: 'project-management', src: 'International Project Management.png' },
];

for (const { id, src } of IMAGES) {
  const from = path.resolve('Images/Capability', src);
  if (!existsSync(from)) {
    console.warn(`skip ${id}: ${src} not found`);
    continue;
  }

  await sharp(from)
    .resize(900, 1125, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 76, effort: 6 })
    .toFile(path.join(OUT, `${id}.webp`));

  const meta = await sharp(path.join(OUT, `${id}.webp`)).metadata();
  console.log(`${id}.webp`.padEnd(30), `${meta.width}x${meta.height}`);
}
