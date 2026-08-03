/**
 * Prepares the hero background video.
 *
 * Source: Video/2.mp4 (1280x720, 24fps, ~10s, h264 + aac)
 * Output: public/brand/hero.mp4, hero.webm, hero-poster.webp
 *
 * The audio track is stripped — the video plays muted as a background loop, so
 * shipping audio is pure weight. `+faststart` moves the moov atom to the front
 * so playback can begin before the file has fully downloaded.
 *
 * Run with: node scripts/prepare-video.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('Video/2.mp4');
const OUT = path.resolve('public/brand');

mkdirSync(OUT, { recursive: true });

const run = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2);

// 1. MP4 (h264) — broadest support
const mp4 = path.join(OUT, 'hero.mp4');
run([
  '-i', SRC,
  '-an',
  '-c:v', 'libx264',
  '-crf', '27',
  '-preset', 'slow',
  '-profile:v', 'main',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  mp4,
]);
console.log(`hero.mp4   ${mb(mp4)} MB`);

// 2. WebM (VP9) — smaller where supported
const webm = path.join(OUT, 'hero.webm');
run([
  '-i', SRC,
  '-an',
  '-c:v', 'libvpx-vp9',
  '-crf', '36',
  '-b:v', '0',
  '-row-mt', '1',
  '-deadline', 'good',
  webm,
]);
console.log(`hero.webm  ${mb(webm)} MB`);

// 3. Poster frame — shown before playback starts and when motion is reduced
const poster = path.join(OUT, 'hero-poster.webp');
run(['-i', SRC, '-ss', '00:00:01.5', '-frames:v', '1', '-q:v', '72', poster]);
console.log(`hero-poster.webp ${mb(poster)} MB`);
