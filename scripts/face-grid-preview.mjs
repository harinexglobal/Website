/**
 * Throwaway helper: renders each source headshot at a known size with a
 * percentage grid burned in, so face bounds can be read off by eye and turned
 * into exact crop numbers.
 *
 * Not part of the build. Run with: node scripts/face-grid-preview.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('.tmp-face');
mkdirSync(OUT, { recursive: true });

const SRC = process.argv.slice(2);
if (SRC.length === 0) throw new Error('pass one or more source image paths');

const W = 500;

for (const src of SRC) {
  const meta = await sharp(src).metadata();
  const h = Math.round((W * meta.height) / meta.width);

  // 10% grid, labelled every 20%
  let lines = '';
  for (let p = 10; p < 100; p += 10) {
    const x = (W * p) / 100;
    const y = (h * p) / 100;
    const bold = p % 20 === 0;
    const stroke = bold ? 'rgba(255,0,0,0.85)' : 'rgba(0,180,255,0.45)';
    const sw = bold ? 1.4 : 0.8;
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${stroke}" stroke-width="${sw}"/>`;
    lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${stroke}" stroke-width="${sw}"/>`;
    if (bold) {
      lines += `<text x="${x + 2}" y="11" font-size="10" fill="red" font-family="monospace">${p}</text>`;
      lines += `<text x="2" y="${y - 2}" font-size="10" fill="red" font-family="monospace">${p}</text>`;
    }
  }

  const svg = Buffer.from(`<svg width="${W}" height="${h}">${lines}</svg>`);
  const name = path.basename(src).replace(/\.[^.]+$/, '');

  await sharp(src)
    .resize(W, h, { fit: 'fill' })
    .composite([{ input: svg, top: 0, left: 0 }])
    .png()
    .toFile(path.join(OUT, `${name}.png`));

  console.log(`${name}  source ${meta.width}x${meta.height}  preview ${W}x${h}`);
}
