/**
 * Prepares the chat assistant's avatar from Images/logo 2.png.
 *
 * The source is an illustrated emblem on an opaque white field. It sits on the
 * navy chat header and on the navy launcher button, so the white has to be
 * knocked out first — otherwise it reads as a white sticker on a dark chip.
 *
 * Run with: node scripts/prepare-chat-avatar.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('Images/logo 2.png');
const OUT = path.resolve('public/brand');

/** Knock out the white background, keeping soft edges. Same thresholds as prepare-logo.mjs. */
async function knockOutWhite(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const HI = 246; // above this luminance -> fully transparent
  const LO = 224; // below this luminance -> fully opaque

  for (let i = 0; i < data.length; i += channels) {
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let alpha;
    if (lum >= HI) alpha = 0;
    else if (lum <= LO) alpha = 255;
    else alpha = Math.round(255 * (1 - (lum - LO) / (HI - LO)));
    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  return sharp(data, { raw: { width, height, channels } }).png();
}

await mkdir(OUT, { recursive: true });

// trim() and extract() cannot share a pipeline in sharp, so the trim is its
// own pass — the same reason prepare-images.mjs splits its stages.
const knocked = await (await knockOutWhite(SRC)).toBuffer();
const trimmed = await sharp(knocked).trim().toBuffer();

await sharp(trimmed)
  .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'chat-avatar.png'));

const meta = await sharp(path.join(OUT, 'chat-avatar.png')).metadata();
console.log(`chat-avatar.png  ${meta.width}x${meta.height}  alpha=${meta.hasAlpha}`);
