/**
 * Throwaway helper: lays the finished headshots out as circles, the way the
 * team cards render them, with the target eye line and head-top/chin guides
 * drawn across. Head-size drift between neighbours becomes measurable instead
 * of a matter of opinion.
 *
 * Not part of the build. Run with:
 *   node scripts/face-contact-sheet.mjs andy-kao morris-ma ...
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('.tmp-face', { recursive: true });

const names = process.argv.slice(2);
const S = 240;

const mask = Buffer.from(
  `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="#fff"/></svg>`,
);

const tiles = await Promise.all(
  names.map(async (n, i) => ({
    input: await sharp(`public/brand/team/${n}.webp`)
      .resize(S, S)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer(),
    left: i * S,
    top: 0,
  })),
);

const W = S * names.length;
// Red = target eye line (38%). Green = where a 54%-tall head should start and end.
const guides = [
  { y: 0.38, c: 'red', w: 1.6 },
  { y: 0.11, c: '#00e000', w: 1.2 },
  { y: 0.65, c: '#00e000', w: 1.2 },
]
  .map((g) => `<line x1="0" y1="${S * g.y}" x2="${W}" y2="${S * g.y}" stroke="${g.c}" stroke-width="${g.w}"/>`)
  .join('');

await sharp({ create: { width: W, height: S, channels: 4, background: '#eef2f7' } })
  .composite([...tiles, { input: Buffer.from(`<svg width="${W}" height="${S}">${guides}</svg>`), top: 0, left: 0 }])
  .png()
  .toFile('.tmp-face/sheet.png');

console.log(`.tmp-face/sheet.png  ${names.join('  ')}`);
