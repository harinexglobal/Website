/**
 * One-off: remove the automation partner's name from the public site.
 *
 * The agreement is not signed and the partner has not been asked whether they
 * may be named. The capability stays — it is a real gap the firm intends to
 * cover — but it now describes an unnamed partner, and the Delivery partners
 * block comes off the Collaborators page entirely, since a partner card with no
 * partner on it is not a card.
 *
 * Put the name back by reverting this commit once the agreement lands and they
 * have agreed in writing.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
let s = readFileSync(FILE, 'utf8');
const NL = s.includes('\r\n') ? '\r\n' : '\n';
const nl = (t) => t.replace(/\n/g, NL);

const swap = (from, to, label) => {
  const f = nl(from);
  if (!s.includes(f)) throw new Error(`no match: ${label}`);
  s = s.replace(f, nl(to));
};

/* ---- Capability description: drop the name, keep the honesty ---- */
swap(
  'The engineering is performed by RAA Tech Engineering Pvt Ltd, our automation partner in India. We scope the requirement',
  'The engineering is performed by our automation partner in India rather than in-house. We scope the requirement',
  'en capability',
);
swap(
  '工程作業由本公司印度自動化夥伴 RAA Tech Engineering Pvt Ltd 執行。本公司負責釐清需求',
  '工程作業由本公司印度自動化夥伴執行，而非由本公司自行承作。本公司負責釐清需求',
  'zh capability',
);

/* ---- Delivery partners block: remove entirely from both trees ---- */
let removed = 0;
s = s.replace(
  /^ {4}partnersHeading: [\s\S]*?^ {4}\],\r?\n/gm,
  () => {
    removed += 1;
    return '';
  },
);
if (removed !== 2) throw new Error(`partners block removal: expected 2, got ${removed}`);

writeFileSync(FILE, s);
console.log('automation partner unnamed; Delivery partners block removed from both trees');
