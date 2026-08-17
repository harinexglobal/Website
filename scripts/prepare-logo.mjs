/**
 * One-off asset prep.
 * Takes the supplied Images/logo.png (opaque white background) and produces:
 *   public/brand/logo-full.png  — full stacked lockup, transparent, trimmed
 *   public/brand/logo-mark.png  — squirrel mark only, transparent, trimmed
 * Run with: node scripts/prepare-logo.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('Images/logo.png');
const OUT = path.resolve('public/brand');

/** Knock out the white background, keeping soft edges. */
async function knockOutWhite(input) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const HI = 246; // above this luminance -> fully transparent
  const LO = 224; // below this luminance -> fully opaque

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = (r + g + b) / 3;

    let alpha;
    if (lum >= HI) alpha = 0;
    else if (lum <= LO) alpha = 255;
    else alpha = Math.round(255 * (1 - (lum - LO) / (HI - LO)));

    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  return sharp(data, { raw: { width, height, channels } }).png();
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // 1. Knock out the white and trim. This buffer is the source for the mark
  //    below — it is NOT written out as logo-full.png any more.
  //
  //    Images/logo.png reads "HariNext Global" over "CONNECTING TAIWAN &
  //    INDIA": the pre-rename name and the bilateral positioning the firm has
  //    moved away from. Writing it out would put the wrong company name back
  //    into public/brand every time this script ran, which is exactly what it
  //    used to do. The squirrel is unaffected, so the mark is still taken from
  //    here; the lockup is composed by scripts/prepare-logo-full.mjs, which
  //    draws the wordmark as type in the site's own colours.
  //
  //    When a designer redraws the artwork, drop it in as Images/logo.png,
  //    restore the write below, and delete prepare-logo-full.mjs.
  const knocked = await knockOutWhite(SRC);
  const trimmedBuf = await knocked.trim({ threshold: 1 }).toBuffer();

  const meta = await sharp(trimmedBuf).metadata();
  console.log(`source lockup: ${meta.width}x${meta.height} (not written — stale wordmark)`);

  // 2. Mark only — the squirrel sits in the upper ~68% of the lockup.
  // extract and trim must be separate passes: sharp applies trim before
  // extract within a single pipeline, which invalidates the extract area.
  const markHeight = Math.round(meta.height * 0.68);
  const markBuf = await sharp(trimmedBuf)
    .extract({ left: 0, top: 0, width: meta.width, height: markHeight })
    .toBuffer();

  await sharp(markBuf)
    .trim({ threshold: 1 })
    .resize({ width: 400, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'logo-mark.png'));

  const markMeta = await sharp(path.join(OUT, 'logo-mark.png')).metadata();
  console.log(`logo-mark: ${markMeta.width}x${markMeta.height}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
