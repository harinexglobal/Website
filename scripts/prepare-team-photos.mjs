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
  { src: 'Team/photos/Chia Ling Shih.png', name: 'chia-ling-shih' },
  { src: 'Team/photos/Dr. Ganesh Kumar.png', name: 'ganesh-kumar' },
  { src: 'Team/photos/VADIVALAGAN Chithravel.png', name: 'vadivalagan-chithravel' },
  { src: 'Team/photos/naveen.png', name: 'kanagaraj-naveen' },
  { src: 'Team/photos/Dr. ARIRAMAN MATHIVATHANAN.png', name: 'ariraman-mathivathanan' },
  { src: 'Images/Team members/Morris s.s. Ma.jpg', name: 'morris-ma' },
  { src: 'Team/Viney G.jpeg', name: 'viney-g' },
  { src: 'Team/photos/Dr. Sivarasan Ganesan.png', name: 'sivarasan-ganesan' },
  { src: 'Team/photos/Dr. Manas Chakraborty.png', name: 'manas-chakraborty' },
  { src: 'Team/photos/Purusothaman Manogaran.png', name: 'purusothaman-manogaran' },
  { src: 'Team/photos/Dr. MUTHU KUMAR THANGAVEL.png', name: 'muthu-kumar-thangavel' },
  { src: 'Team/photos/Lenin Nachimuthu.jpeg', name: 'lenin-nachimuthu' },
  { src: 'Team/photos/Andy Kao Hsin-Wei.jpeg', name: 'andy-kao' },
];

for (const p of PHOTOS) {
  const src = path.resolve(p.src);
  if (!existsSync(src)) {
    console.warn(`skip ${p.name}: ${p.src} not found`);
    continue;
  }

  // Square, not landscape. Several sources are passport photos where the face
  // already fills the frame — a 4:3 landscape box has to remove a quarter of
  // the height, which cut two faces off at the eyes. Portraits get portrait
  // framing; the cards control size by column width instead.
  //
  // 'attention' picks the salient region per photo rather than assuming the
  // face sits at the top: sources range from passport crops to landscape
  // snapshots, and a fixed rule mis-frames one or the other.
  await sharp(src)
    .resize(800, 800, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(OUT, `${p.name}.webp`));

  const meta = await sharp(path.join(OUT, `${p.name}.webp`)).metadata();
  console.log(`${p.name}.webp  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
}
