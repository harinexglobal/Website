/**
 * Extracts the globe-and-arrow logo from the supplied banner artwork.
 *
 * The banner has the lockup sitting on a pale blue gradient rather than a flat
 * colour, so the background is removed by luminance rather than an exact colour
 * match — the mark itself is deep navy and orange, both far darker than any
 * part of the backdrop.
 *
 * Outputs (candidates only — nothing is wired into the site until chosen):
 *   public/brand/globe-mark.png  — globe symbol alone, for navbar and favicon
 *   public/brand/globe-full.png  — full lockup with wordmark
 *
 * Run with: node scripts/prepare-globe-logo.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('Images/Gemini_Generated_Image_okhudwokhudwokhu.png');
const OUT = path.resolve('public/brand');
mkdirSync(OUT, { recursive: true });

/** Knock out the pale backdrop, keeping soft edges. */
async function knockOut(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const HI = 228; // above this luminance -> fully transparent
  const LO = 196; // below this -> fully opaque

  for (let i = 0; i < data.length; i += info.channels) {
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let a;
    if (lum >= HI) a = 0;
    else if (lum <= LO) a = 255;
    else a = Math.round(255 * (1 - (lum - LO) / (HI - LO)));
    data[i + 3] = Math.min(data[i + 3], a);
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toBuffer();
}

// Full lockup
const lockup = await sharp(SRC).extract({ left: 270, top: 240, width: 850, height: 160 }).toBuffer();
const lockupClean = await knockOut(lockup);
await sharp(lockupClean)
  .trim({ threshold: 1 })
  .resize({ width: 900, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'globe-full.png'));

// Globe symbol only
const mark = await sharp(SRC).extract({ left: 282, top: 245, width: 150, height: 150 }).toBuffer();
const markClean = await knockOut(mark);
await sharp(markClean)
  .trim({ threshold: 1 })
  .resize({ width: 400, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'globe-mark.png'));

for (const f of ['globe-full.png', 'globe-mark.png']) {
  const m = await sharp(path.join(OUT, f)).metadata();
  console.log(`${f}  ${m.width}x${m.height}`);
}
