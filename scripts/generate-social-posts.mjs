/**
 * Builds a reviewable social posting queue from the site's own content.
 *
 * What this does and does not do, deliberately:
 *
 *   It writes drafts. It does not post. Nothing here holds a credential, calls
 *   a platform API, or publishes anything — publishing as the company is a
 *   decision a person makes, and a queue that posts by itself is a queue that
 *   eventually posts something nobody read.
 *
 * Every post is assembled from text that is already on the site: an article's
 * own excerpt, a practice's own summary, a corridor's own lead. Nothing is
 * invented. That is not a stylistic preference — lib/insights.ts says the firm
 * publishes no market statistics, growth figures or rankings because it cannot
 * substantiate them, and a social post inventing one would be the same claim
 * with a wider audience and no reviewer.
 *
 * Output: social/queue.json  (machine-readable, for a scheduler import)
 *         social/CALENDAR.md (what a person actually reads and approves)
 *
 * Run with: node scripts/generate-social-posts.mjs [--weeks 8] [--start YYYY-MM-DD]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const SITE = 'https://harinexglobal.com';
const OUT = path.resolve('social');
mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const WEEKS = Number(argOf('weeks', 8));
const START = argOf('start', null);

/* ------------------------------------------------------------------ */
/*  Reading the dictionaries                                           */
/* ------------------------------------------------------------------ */

/** The English block only. The zh block repeats every key, and a Chinese
 *  headline on an English-language post is the kind of error nobody catches
 *  until it is live. */
function englishBlock(file) {
  const src = readFileSync(path.resolve(file), 'utf8');
  const zh = src.indexOf('const zh');
  return zh === -1 ? src : src.slice(0, zh);
}

function readArticles() {
  const src = englishBlock('lib/insights.ts');
  const re =
    /id:\s*'([a-z0-9-]+)',\s*\n\s*category:\s*'([^']*)',\s*\n\s*title:\s*\n?\s*'((?:[^'\\]|\\.)*)',\s*\n\s*excerpt:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    out.push({
      kind: 'article',
      id: m[1],
      category: m[2],
      title: unescape_(m[3]),
      text: unescape_(m[4]),
      url: `${SITE}/insights/${m[1]}`,
      /* Instagram crops to square and would cut the wordmark off the landscape
         card, so it gets a card laid out for that shape. */
      image: `public/brand/insights/og/${m[1]}.jpg`,
      imageSquare: `public/brand/insights/square/${m[1]}.jpg`,
    });
  }
  return out;
}

function readCapabilities() {
  const src = englishBlock('lib/content.ts');
  /* The capabilities block only — `summary` appears in other sections too. */
  const start = src.indexOf('  capabilities: {');
  const end = src.indexOf('  industries: {', start);
  const block = src.slice(start, end);

  const re =
    /id:\s*'([a-z0-9-]+)',\s*\n(?:\s*[a-zA-Z]+:\s*'[^']*',\s*\n)*?\s*title:\s*'((?:[^'\\]|\\.)*)',\s*\n\s*summary:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(block))) {
    out.push({
      kind: 'practice',
      id: m[1],
      category: 'Practice',
      title: unescape_(m[2]),
      text: unescape_(m[3]),
      url: `${SITE}/what-we-do/${m[1]}`,
      image: `public/brand/capabilities/${m[1]}.webp`,
    });
  }
  return out;
}

/** Corridor pages are keyed by market, but their photographs are named after
 *  the hub the people are actually in — so the two cannot be derived from each
 *  other and the mapping has to be written down. */
const CORRIDOR_IMAGE = {
  india: 'bengaluru',
  'united-states': 'michigan',
  germany: 'germany',
};

function readCorridors() {
  const src = englishBlock('lib/content.ts');
  const start = src.indexOf('  marketPages: {');
  const block = src.slice(start);
  const re =
    /id:\s*'([a-z0-9-]+)',\s*\n\s*market:\s*'([^']*)',\s*\n\s*title:\s*\n?\s*'((?:[^'\\]|\\.)*)',\s*\n\s*lead:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(block))) {
    out.push({
      kind: 'corridor',
      id: m[1],
      category: `${unescape_(m[2])} corridor`,
      title: unescape_(m[3]),
      text: unescape_(m[4]),
      url: `${SITE}/where-we-work/${m[1]}`,
      image: `public/brand/markets/${CORRIDOR_IMAGE[m[1]] ?? m[1]}.webp`,
    });
  }
  return out;
}

/**
 * Hand-written posts from social/original.json.
 *
 * The other three sources reshare a page: here is a thing we published, go and
 * read it. These stand on their own — an observation that is worth something to
 * someone who never clicks — which is what actually earns reach on LinkedIn and
 * what a company feed made only of link cards never does.
 *
 * Written by hand and edited by hand. The generator only schedules them; it
 * does not compose or rewrite the copy, so an edit made here survives every
 * regeneration.
 */
function readOriginals() {
  const file = path.resolve('social/original.json');
  if (!existsSync(file)) return [];
  return JSON.parse(readFileSync(file, 'utf8')).map((o) => ({
    kind: 'original',
    id: o.id,
    category: o.theme,
    title: o.theme,
    authored: o,
    url: `${SITE}${o.link}`,
    image: o.image,
  }));
}

const unescape_ = (s) => s.replace(/\\'/g, "'").replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();

/* ------------------------------------------------------------------ */
/*  Per-platform copy                                                  */
/* ------------------------------------------------------------------ */

/** Campaign tagging, so the site analytics can tell these apart from organic. */
const tagged = (url, platform) =>
  `${url}?utm_source=${platform}&utm_medium=social&utm_campaign=evergreen`;

/** Trim to a hard character budget on a word boundary. */
function fit(text, budget) {
  if (text.length <= budget) return text;
  const cut = text.slice(0, budget - 1);
  const sp = cut.lastIndexOf(' ');
  return `${(sp > 0 ? cut.slice(0, sp) : cut).replace(/[\s,;:.—–-]+$/, '')}…`;
}

/**
 * Hashtags, kept few and literal.
 *
 * Drawn from what the item actually is. No trend-chasing tags, no #business
 * #success filler — a B2B advisory post with fifteen hashtags reads as spam to
 * exactly the buyers this is aimed at.
 */
function hashtags(item) {
  const base = {
    article: ['#TechnologyTransfer', '#CrossBorderTrade'],
    practice: ['#TechnologyTransfer', '#Manufacturing'],
    corridor: ['#MarketEntry', '#SupplyChain'],
    original: ['#TechnologyTransfer', '#CrossBorderTrade'],
  }[item.kind];
  const place = /india/i.test(item.id)
    ? '#India'
    : /germany/i.test(item.id)
      ? '#Germany'
      : /united-states/i.test(item.id)
        ? '#USA'
        : '#Taiwan';
  return [...base, place].join(' ');
}

function compose(item) {
  const ht = hashtags(item);

  /* Authored posts are used verbatim. The only thing added is the link and the
     tags, appended rather than woven in, so nothing rewrites a sentence
     somebody chose. */
  if (item.authored) {
    const a = item.authored;
    return {
      linkedin: `${a.linkedin}

${tagged(item.url, 'linkedin')}

${ht}`,
      x: `${a.x}
${tagged(item.url, 'x')}`,
      facebook: `${a.linkedin}

${tagged(item.url, 'facebook')}`,
      instagram: `${a.linkedin}

More via the link in our bio.

${ht}`,
    };
  }

  return {
    /* LinkedIn: the audience that actually buys this. Room to make the point
       before the link, which is also where LinkedIn's own reach is kindest. */
    linkedin: `${item.title}\n\n${item.text}\n\n${tagged(item.url, 'linkedin')}\n\n${ht}`,

    /* X: 280 total. A t.co link always counts as 23, whatever its real length,
       so the text budget is fixed at 280 − 23 − separators. */
    x: `${fit(`${item.title} — ${item.text}`, 280 - 23 - 2)}\n${tagged(item.url, 'x')}`,

    /* Facebook: shorter than LinkedIn, no hashtag wall. */
    facebook: `${item.title}\n\n${fit(item.text, 400)}\n\n${tagged(item.url, 'facebook')}`,

    /* Instagram: the link in a caption is not clickable, so the caption has to
       stand alone and send people to the profile link instead. */
    instagram: `${item.title}\n\n${fit(item.text, 500)}\n\nFull piece via the link in our bio.\n\n${ht}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Scheduling                                                         */
/* ------------------------------------------------------------------ */

/** Tuesday, Wednesday and Thursday: the days a B2B audience is at a desk.
 *  Times are Taipei local, which is where the company posts from. */
const SLOTS = [
  { day: 2, time: '09:30' },
  { day: 3, time: '14:00' },
  { day: 4, time: '09:30' },
];

function nextSlots(count, startDate) {
  const out = [];
  const d = startDate ? new Date(`${startDate}T00:00:00Z`) : new Date();
  d.setUTCDate(d.getUTCDate() + 1); // never schedule something for today

  while (out.length < count) {
    const slot = SLOTS.find((s) => s.day === d.getUTCDay());
    if (slot) out.push({ date: d.toISOString().slice(0, 10), time: slot.time });
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

/**
 * Interleave the three kinds rather than posting seven articles in a row.
 *
 * A feed that is all one kind reads as a content dump; alternating what the
 * firm thinks, what it does, and where it works is what a real editorial
 * calendar looks like.
 */
function interleave(groups) {
  const out = [];
  const queues = groups.map((g) => [...g]);
  while (queues.some((q) => q.length)) {
    for (const q of queues) if (q.length) out.push(q.shift());
  }
  return out;
}

/* ------------------------------------------------------------------ */

const articles = readArticles();
const practices = readCapabilities();
const corridors = readCorridors();

if (!articles.length) throw new Error('no articles parsed from lib/insights.ts');
if (!practices.length) throw new Error('no capabilities parsed from lib/content.ts');
if (!corridors.length) throw new Error('no corridors parsed from lib/content.ts');

const originals = readOriginals();

/* Originals first in each cycle: they carry the most and reshare the least. */
const items = interleave([originals, articles, practices, corridors]);
const wanted = WEEKS * SLOTS.length;
const slots = nextSlots(wanted, START);

/**
 * Approvals already given are never thrown away by a regeneration.
 *
 * The queue is regenerated whenever new content is published, and a run that
 * reset every `approved` back to `draft` would quietly un-approve a week
 * somebody had already read — or worse, re-post something already sent. Posts
 * are matched on a stable id derived from the slot and the item, and anything
 * already approved or posted carries that state forward untouched.
 */
const QUEUE_PATH = path.join(OUT, 'queue.json');
const previous = new Map();
if (existsSync(QUEUE_PATH)) {
  for (const post of JSON.parse(readFileSync(QUEUE_PATH, 'utf8'))) previous.set(post.id, post);
}

const queue = slots.map((slot, i) => {
  const item = items[i % items.length]; // rotates once the library is exhausted
  const id = `${slot.date}-${item.kind}-${item.id}`;
  const prior = previous.get(id);

  return {
    id,
    scheduled: `${slot.date} ${slot.time}`,
    timezone: 'Asia/Taipei',

    /* 'draft' → 'approved' is the only gate that matters. The publisher will
       not touch anything that is not exactly 'approved', and sets 'posted'
       itself once a platform has accepted it. */
    status: prior?.status ?? 'draft',
    postedAt: prior?.postedAt ?? {},

    /* Which accounts this one goes to. Trim per post when something suits
       LinkedIn but not Instagram. */
    platforms: prior?.platforms ?? ['linkedin', 'facebook', 'x', 'instagram'],

    source: { kind: item.kind, id: item.id, url: item.url },

    /* Instagram takes the square where one exists; the practice and corridor
       photographs are landscape originals with no type on them, so they crop
       acceptably and there is nothing to lay out differently.
       `url` is what the platforms fetch — Instagram in particular can only be
       given a publicly reachable image, never an upload from disk. */
    images: {
      default: item.image,
      instagram: item.imageSquare ?? item.image,
      defaultUrl: `${SITE}/${item.image.replace(/^public\//, '')}`,
      instagramUrl: `${SITE}/${(item.imageSquare ?? item.image).replace(/^public\//, '')}`,
    },

    /* Edits survive regeneration too: once a post has been reworded by hand,
       the generator stops overwriting it. */
    posts: prior?.edited ? prior.posts : compose(item),
    edited: prior?.edited ?? false,
  };
});

writeFileSync(path.join(OUT, 'queue.json'), `${JSON.stringify(queue, null, 2)}\n`);

/* The human-readable half. This is the artefact that gets approved. */
const md = [
  '# Social posting calendar',
  '',
  `Generated ${new Date().toISOString().slice(0, 10)} from the site's own content by`,
  '`scripts/generate-social-posts.mjs`. Every line below is a **draft**. Nothing here',
  'has been posted, and nothing posts itself.',
  '',
  `${queue.length} posts across ${WEEKS} weeks · ${articles.length} articles, ${practices.length} practices, ${corridors.length} corridors.`,
  '',
  '## How to use it',
  '',
  '1. Read a week. Edit anything that does not sound like us.',
  '2. Delete what you do not want to go out.',
  '3. Paste the approved week into Buffer/Make, or post by hand.',
  '',
  '---',
  '',
];

let week = 0;
queue.forEach((q, i) => {
  if (i % SLOTS.length === 0) md.push(`## Week ${++week}`, '');
  md.push(
    `### ${q.scheduled} (${q.timezone}) — ${q.source.kind}: \`${q.source.id}\``,
    '',
    `Image: \`${q.images.default}\`${q.images.instagram !== q.images.default ? ` · Instagram: \`${q.images.instagram}\`` : ''}`,
    '',
    '**LinkedIn**',
    '',
    '```',
    q.posts.linkedin,
    '```',
    '',
    /* X counts any link as 23 characters whatever its real length, so this is
       everything but the final line, plus the link's fixed cost. */
    `**X** (${q.posts.x.split('\n').slice(0, -1).join('\n').length + 24} of 280)`,
    '',
    '```',
    q.posts.x,
    '```',
    '',
    '**Facebook**',
    '',
    '```',
    q.posts.facebook,
    '```',
    '',
    '**Instagram**',
    '',
    '```',
    q.posts.instagram,
    '```',
    '',
    '---',
    '',
  );
});

writeFileSync(path.join(OUT, 'CALENDAR.md'), md.join('\n'));

console.log(`social/queue.json    ${queue.length} drafts`);
console.log(`social/CALENDAR.md   ${WEEKS} weeks, first slot ${queue[0].scheduled}`);
console.log(`sources: ${originals.length} original, ${articles.length} articles, ${practices.length} practices, ${corridors.length} corridors`);
