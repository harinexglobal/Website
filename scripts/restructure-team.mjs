/**
 * One-off: restructure the team.
 *
 *   - Viney G moves from the global team into Leadership.
 *   - Dr. Sivarasan Ganesan joins Leadership as Group CEO & Managing Partner.
 *   - Three new market partners join the global team: Australia, Singapore,
 *     Germany.
 *
 * Roles and locations are exactly as supplied, except Dr. Sivarasan Ganesan's
 * location, which was not given — 'Taiwan' is deliberately country-level rather
 * than a guessed city. LinkedIn blocks automated reads (HTTP 999), so the
 * expertise tags below are written to the same company-scope pattern as the
 * rest of the roster rather than transcribed from a profile.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
const BOUNDARY = 'const zh: Dict = {';

/** Index of the `]` matching the `[` at `open`. */
function matchBracket(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i += 1) {
    if (s[i] === '[') depth += 1;
    else if (s[i] === ']') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error('unbalanced bracket');
}

/** Locate the `people: [ ... ]` array belonging to `section` within `s`. */
function peopleArray(s, section) {
  const secAt = s.indexOf(`  ${section}: {`);
  if (secAt < 0) throw new Error(`section ${section} not found`);
  const open = s.indexOf('people: [', secAt) + 'people: '.length;
  return { open, close: matchBracket(s, open) };
}

/** Cut the `{ ... }` object whose `id: '<id>'` sits inside `people`. */
function cutMember(s, section, id) {
  const { open, close } = peopleArray(s, section);
  const idAt = s.indexOf(`id: '${id}',`, open);
  if (idAt < 0 || idAt > close) return { text: s, block: null };

  const start = s.lastIndexOf('      {\n', idAt);
  const end = s.indexOf('\n      },\n', idAt) + '\n      },\n'.length;
  return { text: s.slice(0, start) + s.slice(end), block: s.slice(start, end) };
}

/** Append entries just before the array's closing bracket. */
function appendMembers(s, section, entries) {
  const { close } = peopleArray(s, section);
  const insertAt = s.lastIndexOf('\n', close) + 1;
  return s.slice(0, insertAt) + entries.join('') + s.slice(insertAt);
}

/** Insert entries immediately after the member with the given id. */
function insertAfter(s, section, id, entries) {
  const { open, close } = peopleArray(s, section);
  const idAt = s.indexOf(`id: '${id}',`, open);
  if (idAt < 0 || idAt > close) throw new Error(`${id} not found in ${section}`);
  const end = s.indexOf('\n      },\n', idAt) + '\n      },\n'.length;
  return s.slice(0, end) + entries.join('') + s.slice(end);
}

/* ------------------------------------------------------------------ */

const EN = {
  sivarasan: `      {
        id: 'sivarasan-ganesan',
        name: 'Dr. Sivarasan Ganesan',
        role: 'Group CEO & Managing Partner',
        location: 'Taiwan',
        photo: '/brand/team/sivarasan-ganesan.webp',
        focus: [
          'Group strategy',
          'Technology commercialisation',
          'Environmental & water technology',
          'Green technology',
        ],
      },
`,
  manas: `      {
        id: 'manas-chakraborty',
        name: 'Dr. Manas Chakraborty',
        role: 'Business Development Partner — Australia',
        location: 'Australia',
        photo: '/brand/team/manas-chakraborty.webp',
        focus: [
          'Australia market entry',
          'Life sciences partnerships',
          'Pharmaceutical development',
          'Technology scouting',
        ],
      },
`,
  puru: `      {
        id: 'purusothaman-manogaran',
        name: 'Purusothaman Manogaran',
        role: 'Business Development Partner — Singapore',
        location: 'Singapore',
        photo: '/brand/team/purusothaman-manogaran.webp',
        focus: [
          'Singapore market access',
          'ASEAN partnerships',
          'Industrial & automation',
          'Supplier qualification',
        ],
      },
`,
  muthu: `      {
        id: 'muthu-kumar-thangavel',
        name: 'Dr. Muthu Kumar Thangavel',
        role: 'Business Development Partner — Germany',
        location: 'Karlsruhe, Germany',
        photo: '/brand/team/muthu-kumar-thangavel.webp',
        focus: [
          'Germany market access',
          'EU research collaboration',
          'Advanced materials',
          'Technology scouting',
        ],
      },
`,
};

const ZH = {
  sivarasan: `      {
        id: 'sivarasan-ganesan',
        name: 'Dr. Sivarasan Ganesan',
        role: '集團執行長暨管理合夥人',
        location: '台灣',
        photo: '/brand/team/sivarasan-ganesan.webp',
        focus: ['集團策略', '技術商品化', '環境與水處理技術', '綠色科技'],
      },
`,
  manas: `      {
        id: 'manas-chakraborty',
        name: 'Dr. Manas Chakraborty',
        role: '業務開發合夥人 — 澳洲',
        location: '澳洲',
        photo: '/brand/team/manas-chakraborty.webp',
        focus: ['澳洲市場進入', '生命科學合作', '製藥開發', '技術發掘'],
      },
`,
  puru: `      {
        id: 'purusothaman-manogaran',
        name: 'Purusothaman Manogaran',
        role: '業務開發合夥人 — 新加坡',
        location: '新加坡',
        photo: '/brand/team/purusothaman-manogaran.webp',
        focus: ['新加坡市場准入', '東協夥伴關係', '工業與自動化', '供應商資格認定'],
      },
`,
  muthu: `      {
        id: 'muthu-kumar-thangavel',
        name: 'Dr. Muthu Kumar Thangavel',
        role: '業務開發合夥人 — 德國',
        location: '德國，卡爾斯魯厄',
        photo: '/brand/team/muthu-kumar-thangavel.webp',
        focus: ['德國市場准入', '歐盟研究合作', '先進材料', '技術發掘'],
      },
`,
};

const src = readFileSync(FILE, 'utf8');
const at = src.indexOf(BOUNDARY);
if (at < 0) throw new Error('zh dictionary not found');

function restructure(half, entries, label) {
  // 1. Lift Viney G out of the global team.
  const cut = cutMember(half, 'regional', 'viney-g');
  if (!cut.block) throw new Error(`viney-g not found in ${label} regional`);
  let out = cut.text;

  // 2. Land him in Leadership, after the Chief Advisor.
  out = insertAfter(out, 'leadership', 'ganesh-kumar', [cut.block]);

  // 3. Group CEO sits directly below the Founder & Chairperson.
  out = insertAfter(out, 'leadership', 'chia-ling-shih', [entries.sivarasan]);

  // 4. Three new markets join the global team.
  out = appendMembers(out, 'regional', [entries.manas, entries.puru, entries.muthu]);

  console.log(`${label}: viney-g moved, +4 members`);
  return out;
}

const head = restructure(src.slice(0, at), EN, 'en');
const tail = restructure(src.slice(at), ZH, 'zh');

writeFileSync(FILE, head + tail);
