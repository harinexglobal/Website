/**
 * Notifies Bing and Yandex that the site's URLs are new or changed, via
 * IndexNow — an open protocol that needs no account and no API token, only a
 * key file hosted at the domain root proving you control the domain.
 *
 * Google does NOT participate. Google is reached through Search Console's
 * "Request indexing", which requires signing in to the property owner's Google
 * account and cannot be automated from here. This script is not a substitute
 * for that; it covers the engines that do accept an unauthenticated ping.
 *
 * The URL list is read from app/sitemap.ts's own output rather than hardcoded,
 * so a route added there is submitted here without anyone remembering to.
 *
 * Run with: node scripts/submit-indexnow.mjs
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const HOST = 'harinexglobal.com';
const SITE = `https://${HOST}`;

/** The key file is whatever 32-hex-character .txt sits in public/. */
async function findKey() {
  const files = await readdir(path.resolve('public'));
  const key = files.find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!key) throw new Error('no IndexNow key file in public/ — generate one first');
  const value = (await readFile(path.resolve('public', key), 'utf8')).trim();
  const stem = key.replace(/\.txt$/, '');
  if (value !== stem) {
    throw new Error(`key file ${key} must contain exactly its own name; it contains "${value}"`);
  }
  return stem;
}

/** Pull the live sitemap rather than re-deriving the route list. */
async function urlList() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) throw new Error('sitemap contained no <loc> entries');
  return urls;
}

const key = await findKey();

/* The key must be reachable before submitting — IndexNow fetches it to verify
   ownership, and a 404 there is rejected as an unverified request. */
const probe = await fetch(`${SITE}/${key}.txt`);
if (!probe.ok) {
  console.error(`key file is not live at ${SITE}/${key}.txt (HTTP ${probe.status}).`);
  console.error('Deploy first, then run this again.');
  process.exit(1);
}

const urlList_ = await urlList();
console.log(`submitting ${urlList_.length} URLs as ${key}`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList: urlList_,
  }),
});

/* 200 accepted, 202 accepted but key still being validated. Both are fine. */
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
