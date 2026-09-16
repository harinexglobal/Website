/**
 * Prepares a lightweight mobile cut of the hero film.
 *
 * Source: Video/2.mp4 (1280x720, 24fps, 10s)
 * Output: public/brand/hero-mobile.webm, hero-mobile.mp4
 *
 * The desktop film is ~1.6 MB. `preload="none"` does not hold it back, because
 * `autoPlay` makes the browser fetch it regardless, so every phone paid for the
 * full-size film before first paint. This cut exists so mobile still gets
 * motion at a weight a phone on mobile data can absorb.
 *
 * How the weight comes down, in order of how much each contributes:
 *   - 640px wide instead of 1280. It is a full-bleed background behind a
 *     wordmark knockout, not something anyone inspects.
 *   - 6 seconds instead of 10. It loops; nobody watches a background for its
 *     narrative, and the loop point is not noticeable on a drifting shot.
 *   - 20fps instead of 24, and a hard bitrate cap rather than pure CRF, so the
 *     output size is predictable instead of whatever the content happens to
 *     encode to.
 *
 * Run with: node scripts/prepare-video-mobile.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('Video/2.mp4');
const OUT = path.resolve('public/brand');
mkdirSync(OUT, { recursive: true });

const run = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
const kb = (p) => (statSync(p).size / 1024).toFixed(0);

/* Shared shaping: first 6 seconds, half width, 20fps, no audio. */
const SHAPE = ['-t', '6', '-an', '-vf', 'scale=640:-2,fps=20'];

// WebM (VP9) — what Chrome and Firefox on Android will take.
const webm = path.join(OUT, 'hero-mobile.webm');
run([
  '-i', SRC,
  ...SHAPE,
  '-c:v', 'libvpx-vp9',
  '-b:v', '220k',
  '-maxrate', '300k',
  '-bufsize', '600k',
  '-crf', '40',
  '-row-mt', '1',
  '-deadline', 'good',
  '-cpu-used', '2',
  webm,
]);
console.log(`hero-mobile.webm  ${kb(webm)} KB`);

// MP4 (h264) — iOS Safari, which does not take VP9 in a <video> reliably.
const mp4 = path.join(OUT, 'hero-mobile.mp4');
run([
  '-i', SRC,
  ...SHAPE,
  '-c:v', 'libx264',
  '-crf', '32',
  '-preset', 'slow',
  '-profile:v', 'main',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  mp4,
]);
console.log(`hero-mobile.mp4   ${kb(mp4)} KB`);
