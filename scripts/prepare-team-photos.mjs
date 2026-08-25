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

/**
 * `crop` is an explicit square in SOURCE pixels: { left, top, size }.
 *
 * Why by hand rather than by algorithm: the cards render circles, and a circle
 * makes any difference in head size between neighbours obvious in a way a
 * rectangle hides. `attention` finds *a* salient region but does not normalise
 * how much of the frame the head fills, so portraits shot at different
 * distances came out with visibly different head sizes side by side.
 *
 * Each box below was measured off a percentage grid (scripts/face-grid-preview.mjs)
 * and solved so that, in the finished square:
 *
 *   head height (hair line to chin) ≈ 54% of the frame
 *   eye line                        ≈ 38% from the top
 *
 * Those two numbers are the whole contract. To reframe a photo, re-measure and
 * re-solve for them rather than nudging the box until it looks right.
 *
 * Photos with no `crop` fall back to `attention`.
 */
const PHOTOS = [
  { src: 'Team/photos/Chia Ling Shih.png', name: 'chia-ling-shih', crop: { left: 27, top: 0, size: 437 } },
  { src: 'Team/photos/Dr. Sivarasan Ganesan.png', name: 'sivarasan-ganesan', crop: { left: 71, top: 99, size: 658 } },
  { src: 'Team/Viney G.jpeg', name: 'viney-g', crop: { left: 1, top: 94, size: 912 } },
  { src: 'Team/photos/Lenin Nachimuthu.jpeg', name: 'lenin-nachimuthu', crop: { left: 4, top: 42, size: 889 } },
  { src: 'Team/photos/VADIVALAGAN Chithravel.png', name: 'vadivalagan-chithravel', crop: { left: 21, top: 0, size: 704 } },
  { src: 'Images/Team members/Dr. Manas.png', name: 'manas-chakraborty', crop: { left: 141, top: 118, size: 853 } },

  /* These three cannot reach the target and are framed as close as their source
     allows. Each is a tight passport crop where the head already fills the frame,
     so there is no wider square to take — the head reads 62-72% instead of 54%.
     Padding the canvas would fix the ratio and show an obvious seam. They need
     new photographs, not new numbers. */
  { src: 'Team/photos/Dr. ARIRAMAN MATHIVATHANAN.png', name: 'ariraman-mathivathanan', crop: { left: 0, top: 0, size: 800 } },
  { src: 'Team/photos/Purusothaman Manogaran.png', name: 'purusothaman-manogaran', crop: { left: 0, top: 0, size: 355 } },
  { src: 'Team/photos/Dr. MUTHU KUMAR THANGAVEL.png', name: 'muthu-kumar-thangavel', crop: { left: 0, top: 0, size: 800 } },
  /* Same constraint. Source is 1023x1537 with the head spanning y 55-930, so
     the widest square the frame allows is its own width — the head reads far
     tighter than 54% and the eye line sits near the middle rather than at
     38%. Framed as close as the source permits. */
  { src: 'Team/photos/Dr. Thangaraji Vasudevan.png', name: 'thangaraji-vasudevan', crop: { left: 0, top: 0, size: 1023 } },

  /* Restyled studio portraits, 2026-08-10. The generator stamps a sparkle mark
     into the bottom-right corner of every one; each box below stops well above
     it, so the mark never reaches the published crop. */
  { src: 'Images/Team members/andy.png', name: 'andy-kao', crop: { left: 197, top: 0, size: 1655 } },
  { src: 'Images/Team members/Morris S.S. Ma.png', name: 'morris-ma', crop: { left: 213, top: 115, size: 1317 } },
  { src: 'Images/Team members/Dr. Kanagaraj Naveen.png', name: 'kanagaraj-naveen', crop: { left: 162, top: 178, size: 1458 } },
  { src: 'Images/Team members/Dr. Ganesh Kumar.png', name: 'ganesh-kumar', crop: { left: 226, top: 144, size: 1241 } },
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
  if (p.crop) {
    const { width, height } = await sharp(src).metadata();
    const { left, top, size } = p.crop;
    if (left < 0 || top < 0 || left + size > width || top + size > height) {
      throw new Error(
        `${p.name}: crop ${left},${top} ${size}px falls outside the ${width}x${height} source`,
      );
    }
    await sharp(src)
      .extract({ left, top, width: size, height: size })
      .resize(800, 800)
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(OUT, `${p.name}.webp`));
  } else {
    // 'attention' picks the salient region per photo rather than assuming the
    // face sits at the top: sources range from passport crops to landscape
    // snapshots, and a fixed rule mis-frames one or the other.
    await sharp(src)
      .resize(800, 800, { fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(OUT, `${p.name}.webp`));
  }

  const meta = await sharp(path.join(OUT, `${p.name}.webp`)).metadata();
  console.log(`${p.name}.webp  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
}
