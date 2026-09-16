/**
 * Moves posts from draft to approved — the one gate the publisher respects.
 *
 * Separate from the publisher on purpose. Approving and sending are different
 * decisions taken at different moments, and a tool that did both would make it
 * possible to post something by approving it.
 *
 * Nothing here talks to a network.
 *
 *   node scripts/approve-social.mjs                     # show the queue
 *   node scripts/approve-social.mjs --week 1            # approve week 1
 *   node scripts/approve-social.mjs --id 2026-09-17-... # approve one
 *   node scripts/approve-social.mjs --id ... --revoke   # back to draft
 *   node scripts/approve-social.mjs --week 1 --only linkedin,facebook
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const QUEUE = path.resolve('social/queue.json');
const args = process.argv.slice(2);
const argOf = (n) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : null);

const WEEK = argOf('week') ? Number(argOf('week')) : null;
const ID = argOf('id');
const ONLY = argOf('only')?.split(',').map((s) => s.trim());
const REVOKE = args.includes('--revoke');

const queue = JSON.parse(readFileSync(QUEUE, 'utf8'));

/* Weeks are runs of three slots, matching how CALENDAR.md is grouped. */
const PER_WEEK = 3;
const weekOf = (i) => Math.floor(i / PER_WEEK) + 1;

if (!WEEK && !ID) {
  const byStatus = queue.reduce((acc, p) => ({ ...acc, [p.status]: (acc[p.status] ?? 0) + 1 }), {});
  console.log(`social/queue.json — ${queue.length} posts`);
  console.log(
    Object.entries(byStatus)
      .map(([k, v]) => `  ${k}: ${v}`)
      .join('\n'),
  );
  console.log('');
  queue.forEach((p, i) => {
    const mark = { draft: ' ', approved: '✓', posted: '●' }[p.status] ?? '?';
    console.log(`  [${mark}] w${weekOf(i)}  ${p.scheduled}  ${p.source.kind.padEnd(8)} ${p.id}`);
  });
  console.log('\nApprove with --week N or --id <id>. Nothing is posted by this tool.');
  process.exit(0);
}

let changed = 0;
queue.forEach((post, i) => {
  const match = ID ? post.id === ID : weekOf(i) === WEEK;
  if (!match) return;

  /* Never re-open something already sent: the post exists in the world, and
     flipping it back to approved would send it a second time. */
  if (post.status === 'posted') {
    console.log(`  skipped ${post.id}: already posted`);
    return;
  }

  post.status = REVOKE ? 'draft' : 'approved';
  if (ONLY && !REVOKE) post.platforms = ONLY;
  changed += 1;
  console.log(`  ${REVOKE ? 'revoked' : 'approved'} ${post.id}${ONLY && !REVOKE ? ` → ${ONLY.join(', ')}` : ''}`);
});

if (!changed) {
  console.log('Nothing matched.');
  process.exit(1);
}

writeFileSync(QUEUE, `${JSON.stringify(queue, null, 2)}\n`);
console.log(`\n${changed} post(s) updated. Commit and push to let the scheduled job pick them up.`);
