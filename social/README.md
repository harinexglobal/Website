# Social posting

Drafts are generated from the site. **You approve.** Approved posts publish
themselves on schedule, and nothing else ever does.

No token is stored in this repository.

## The loop

```
generate  →  review  →  approve  →  scheduled job posts it
 (script)     (you)      (you)        (GitHub Actions)
```

Once a post is approved it goes out at its scheduled time without anyone
touching it again. Approval is the only thing that is manual, because it is the
only step where a person decides something.

### 1. Generate

```bash
node scripts/generate-social-posts.mjs --weeks 8
```

Writes `CALENDAR.md` (read this) and `queue.json` (the machine's copy).

Safe to re-run whenever new content is published: posts already approved, posted
or hand-edited keep that state. It will not un-approve your week or re-queue
something already sent.

### 2. Review

Read `CALENDAR.md`. Edit any wording in `queue.json` that does not sound like
us — set `"edited": true` on a post you have reworded and the generator will
stop overwriting it.

### 3. Approve

```bash
node scripts/approve-social.mjs                      # see the whole queue
node scripts/approve-social.mjs --week 1             # approve a week
node scripts/approve-social.mjs --id 2026-09-17-...  # approve one post
node scripts/approve-social.mjs --week 1 --only linkedin,facebook
node scripts/approve-social.mjs --id ... --revoke    # change your mind
```

Then commit and push. Approval lives in git, so there is a record of what was
approved and when.

### 4. It posts itself

`.github/workflows/social-publish.yml` runs hourly, sends anything approved
whose time has come, and writes back when each one went out. A post already sent
is never sent twice.

## Setting it up once

Add these in **GitHub → Settings → Secrets and variables → Actions**. GitHub
stores them write-only — nobody can read them back afterwards, including me.
Any platform you leave unset is skipped and named in the run log.

| Secret | For |
|---|---|
| `FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_TOKEN` | Facebook Page. A long-lived **Page** token, not a user token. |
| `INSTAGRAM_BUSINESS_ID` | Instagram. Must be a Business account linked to that Page; uses the Page token. |
| `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORG_URN` | LinkedIn company page. Needs an app with the Community Management API. |
| `X_BEARER_TOKEN` | X. Write access is a paid tier — leave unset to keep X manual. |

Start with Facebook and Instagram: one token covers both, and it is the only
pair that works without an app review.

Check it before trusting it:

```bash
node scripts/publish-social.mjs        # dry run — prints what it would send
```

Or run the workflow manually from the Actions tab with the "live" box
unticked. It is a dry run unless told otherwise.

## Why it is built this way

The publisher sends a post only when **all** of these hold:

1. `status` is exactly `approved` — a value only a person writes.
2. Its scheduled time has passed.
3. It has not already gone to that platform.
4. The run was given `--live`.

Any of those failing means it does nothing and says why. It never guesses,
because a guess here posts to the company's account and a post that has gone out
has been seen — there is no taking it back.

The drafts themselves are assembled from the site's own words: an article's
excerpt, a practice's summary, a corridor's lead. `lib/insights.ts` records that
this firm publishes no market statistics or rankings it cannot substantiate. A
generated post inventing one would be that same claim with a wider audience and
no reviewer, so the generator cannot produce them.

## Articles post themselves already

`https://harinexglobal.com/feed.xml` is a live RSS feed of every insight
article, newest first, with its share card attached. Point Buffer, Zapier or
Make at it once and publishing an article is what posts it — no key, no queue,
no approval step, because the only thing it can publish is something you already
chose to publish.

That covers new writing. The queue here covers the practices, the corridors and
the back catalogue, which have no publish event to fire on.

## Images

```bash
node scripts/prepare-insight-og.mjs        # 1200x630, link previews
node scripts/prepare-social-squares.mjs    # 1080x1080, Instagram
```

Instagram can only be handed a **publicly reachable URL** — there is no upload
endpoint — so the square cards must be deployed to the live site before a post
referencing one can go out.

## Worth doing by hand

Put `harinexglobal.com` in the bio of all four profiles. They outrank the site
for the company's own name; those links are the fastest way to close that gap.
Five minutes, more effect than anything in this queue.
