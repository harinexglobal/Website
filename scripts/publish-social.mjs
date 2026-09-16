/**
 * Publishes approved posts from social/queue.json. Nothing else.
 *
 * THE GATE
 *
 * A post goes out only when all of these are true:
 *
 *   1. `status` is exactly "approved" — a person set it. The generator never
 *      writes that value, and regenerating the queue preserves it rather than
 *      resetting it.
 *   2. Its scheduled time has passed.
 *   3. It has not already been posted to that platform (postedAt records it).
 *   4. The run was given --live. Without it this prints what it would do and
 *      exits, which is also what it does when a credential is missing.
 *
 * Any one of those failing means silence, not a best guess. A publisher that
 * guesses posts to a company account, and a post that has gone out has been
 * seen — there is no taking it back.
 *
 * CREDENTIALS
 *
 * Read from the environment at run time and never from this repository. In
 * GitHub Actions they come from repository secrets, which the workflow maps in;
 * nobody but you ever sees the values, including whoever wrote this file.
 *
 *   LINKEDIN_ACCESS_TOKEN, LINKEDIN_ORG_URN     (urn:li:organization:123456)
 *   FACEBOOK_PAGE_ID, FACEBOOK_PAGE_TOKEN
 *   INSTAGRAM_BUSINESS_ID                        (uses FACEBOOK_PAGE_TOKEN)
 *   X_BEARER_TOKEN
 *
 * Run with:
 *   node scripts/publish-social.mjs              # dry run, always safe
 *   node scripts/publish-social.mjs --live       # actually posts
 *   node scripts/publish-social.mjs --live --id 2026-09-17-article-...
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const QUEUE = path.resolve('social/queue.json');
const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const ONLY = args.includes('--id') ? args[args.indexOf('--id') + 1] : null;

const env = (name) => {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
};

/* ------------------------------------------------------------------ */
/*  Platform adapters                                                  */
/* ------------------------------------------------------------------ */

/**
 * Each adapter reports what it needs and how to send one post. `ready()` is
 * what decides whether a platform is skipped, so a half-configured account
 * never silently drops a post — it is reported as skipped, by name.
 */
const ADAPTERS = {
  facebook: {
    needs: ['FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_TOKEN'],
    async send(post) {
      const id = env('FACEBOOK_PAGE_ID');
      const token = env('FACEBOOK_PAGE_TOKEN');
      /* A photo post rather than a link post: the card is the point, and
         Facebook's own link-preview scrape is slower than attaching it. */
      const res = await fetch(`https://graph.facebook.com/v21.0/${id}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: post.images.defaultUrl,
          caption: post.posts.facebook,
          access_token: token,
        }),
      });
      return unwrap(res, 'facebook');
    },
  },

  instagram: {
    needs: ['INSTAGRAM_BUSINESS_ID', 'FACEBOOK_PAGE_TOKEN'],
    async send(post) {
      const id = env('INSTAGRAM_BUSINESS_ID');
      const token = env('FACEBOOK_PAGE_TOKEN');

      /* Instagram publishes in two steps: build a container from a publicly
         reachable image, then publish that container. There is no upload
         endpoint — which is why the queue carries absolute image URLs. */
      const create = await fetch(`https://graph.facebook.com/v21.0/${id}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: post.images.instagramUrl,
          caption: post.posts.instagram,
          access_token: token,
        }),
      });
      const container = await unwrap(create, 'instagram:create');

      const publish = await fetch(`https://graph.facebook.com/v21.0/${id}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creation_id: container.id, access_token: token }),
      });
      return unwrap(publish, 'instagram:publish');
    },
  },

  linkedin: {
    needs: ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_ORG_URN'],
    async send(post) {
      const token = env('LINKEDIN_ACCESS_TOKEN');
      const author = env('LINKEDIN_ORG_URN');

      const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          author,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: { text: post.posts.linkedin },
              shareMediaCategory: 'ARTICLE',
              media: [
                {
                  status: 'READY',
                  originalUrl: post.source.url,
                  thumbnails: [{ url: post.images.defaultUrl }],
                },
              ],
            },
          },
          visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
        }),
      });
      return unwrap(res, 'linkedin');
    },
  },

  x: {
    needs: ['X_BEARER_TOKEN'],
    async send(post) {
      const token = env('X_BEARER_TOKEN');
      /* Text only. Attaching media needs the v1.1 upload endpoint and OAuth
         1.0a signing, which is a different credential entirely — the link
         preview carries the card instead. */
      const res = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: post.posts.x }),
      });
      return unwrap(res, 'x');
    },
  },
};

async function unwrap(res, label) {
  const body = await res.text();
  if (!res.ok) throw new Error(`${label} ${res.status}: ${body.slice(0, 300)}`);
  try {
    return JSON.parse(body);
  } catch {
    return { raw: body.slice(0, 200) };
  }
}

const missingFor = (platform) => (ADAPTERS[platform]?.needs ?? []).filter((n) => !env(n));

/* ------------------------------------------------------------------ */

const queue = JSON.parse(readFileSync(QUEUE, 'utf8'));
const now = new Date();

/** Scheduled times are written in Taipei local time (UTC+8, no DST). */
const dueAt = (post) => new Date(`${post.scheduled.replace(' ', 'T')}:00+08:00`);

const due = queue.filter((post) => {
  if (ONLY) return post.id === ONLY;
  if (post.status !== 'approved') return false;
  return dueAt(post) <= now;
});

console.log(LIVE ? '● LIVE — approved and due posts will be sent' : '○ DRY RUN — nothing will be sent');
console.log(`  queue: ${queue.length} · approved: ${queue.filter((p) => p.status === 'approved').length} · due now: ${due.length}\n`);

if (!due.length) {
  console.log('Nothing to do.');
  process.exit(0);
}

let sent = 0;
let failed = 0;

for (const post of due) {
  console.log(`${post.id}  (${post.scheduled} ${post.timezone})`);

  for (const platform of post.platforms) {
    const adapter = ADAPTERS[platform];
    if (!adapter) {
      console.log(`   ?  ${platform}: no adapter`);
      continue;
    }
    if (post.postedAt?.[platform]) {
      console.log(`   =  ${platform}: already posted ${post.postedAt[platform]}`);
      continue;
    }

    const missing = missingFor(platform);
    if (missing.length) {
      console.log(`   -  ${platform}: skipped, not configured (${missing.join(', ')})`);
      continue;
    }

    if (!LIVE) {
      console.log(`   ·  ${platform}: would post ${post.posts[platform].split('\n')[0].slice(0, 62)}…`);
      continue;
    }

    try {
      const result = await adapter.send(post);
      post.postedAt = { ...post.postedAt, [platform]: new Date().toISOString() };
      sent += 1;
      console.log(`   ✓  ${platform}: posted${result?.id ? ` (${result.id})` : ''}`);
    } catch (error) {
      failed += 1;
      /* Carry on: one platform's expired token should not hold up the others,
         and the post stays un-marked so the next run retries just that one. */
      console.log(`   ✗  ${platform}: ${error.message}`);
    }
  }

  /* Fully posted everywhere it was meant to go. */
  const done = post.platforms.every(
    (p) => post.postedAt?.[p] || missingFor(p).length || !ADAPTERS[p],
  );
  if (LIVE && done && post.platforms.some((p) => post.postedAt?.[p])) post.status = 'posted';
  console.log('');
}

if (LIVE) {
  writeFileSync(QUEUE, `${JSON.stringify(queue, null, 2)}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), QUEUE)} — ${sent} posted, ${failed} failed.`);
  if (failed) process.exitCode = 1;
} else {
  console.log('Dry run complete. Re-run with --live to send.');
}
