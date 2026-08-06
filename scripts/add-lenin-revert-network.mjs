/**
 * Two changes:
 *
 * 1. Lenin Nachimuthu joins Leadership as Project Management Lead. Role,
 *    location and focus areas are exactly as supplied (LinkedIn again answered
 *    automated reads with HTTP 999).
 *
 * 2. Reverts the seven-markets change. Extending the network map and market
 *    counts to cover Australia, Singapore and Germany was a positioning change
 *    that was not asked for; the site returns to four markets. The team roster
 *    keeps all its members — only the market count, the network map entries
 *    and the copy naming the markets go back.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
const BOUNDARY = 'const zh: Dict = {';

const LENIN_EN = `      {
        id: 'lenin-nachimuthu',
        name: 'Lenin Nachimuthu',
        role: 'Project Management Lead',
        location: 'Vellore, India',
        photo: '/brand/team/lenin-nachimuthu.webp',
        focus: [
          'Sample validation gates',
          'Vendor risk mitigation plans',
          'Entity setup tracking',
          'SLA integration schedules',
        ],
      },
`;

const LENIN_ZH = `      {
        id: 'lenin-nachimuthu',
        name: 'Lenin Nachimuthu',
        role: '專案管理主管',
        location: '印度，維洛爾',
        photo: '/brand/team/lenin-nachimuthu.webp',
        focus: ['樣品驗證關卡', '供應商風險緩解計畫', '法人設立進度追蹤', 'SLA 整合時程'],
      },
`;

/** Reverse of the seven-markets edits: [current, restore-to]. */
const EN_REVERT = [
  ["value: '7',\n        suffix: '',\n        label: 'Markets, one team',\n        detail: 'Taiwan, India, South Korea, the United States, Germany, Singapore and Australia — a single accountable team.',",
   "value: '4',\n        suffix: '',\n        label: 'Markets, one team',\n        detail: 'Taiwan, India, South Korea and the United States — a single accountable team.',"],

  ["heading: 'One firm, seven markets',", "heading: 'One firm, four markets',"],

  ["lead: 'Headquartered in Taiwan, with a branch office in India and business development partners on the ground in South Korea, the United States, Germany, Singapore and Australia. Every market has someone who lives there, speaks the language and can visit a factory this week.',",
   "lead: 'Headquartered in Taiwan, with business development representatives on the ground in India, South Korea and the United States. Every market has someone who lives there, speaks the language and can visit a factory this week.',"],

  ["Korea, the United States, Germany, Singapore and Australia extend the same model into further markets.",
   "Korea and the United States extend the same model into further markets."],

  ["lead: 'We work across seven markets. Taiwan–India is the core corridor and the majority of our work — the pages below explain why those two economies fit together, and where Korea, North America, Germany, Singapore and Australia extend the same model.',",
   "lead: 'We work across four markets. Taiwan–India is the core corridor and the majority of our work — the pages below explain why those two economies fit together, and where Korea and North America extend the same model.',"],
];

const ZH_REVERT = [
  ["value: '7',\n        suffix: '',\n        label: '七個市場，同一團隊',\n        detail: '台灣、印度、南韓、美國、德國、新加坡與澳洲，由單一負責團隊統籌執行。',",
   "value: '4',\n        suffix: '',\n        label: '四個市場，同一團隊',\n        detail: '台灣、印度、南韓與美國，由單一負責團隊統籌執行。',"],

  ["heading: '一家公司，七個市場',", "heading: '一家公司，四個市場',"],

  ["lead: '總部設於台灣，於印度設有分公司，並在南韓、美國、德國、新加坡與澳洲派駐業務開發夥伴。每個市場都有長駐當地、通曉語言、本週就能前往工廠實地拜訪的人。',",
   "lead: '總部設於台灣，並在印度、南韓與美國派駐業務開發代表。每個市場都有長駐當地、通曉語言、本週就能前往工廠實地拜訪的人。',"],

  ["韓國、美國、德國、新加坡與澳洲則是將同一套模式延伸至更多市場。",
   "韓國與美國則是將同一套模式延伸至更多市場。"],

  ["lead: '我們橫跨七個市場。台灣—印度是核心走廊，也是業務量最大的一環；以下說明這兩個經濟體為何互補，以及韓國、北美、德國、新加坡與澳洲如何延伸同一套模式。',",
   "lead: '我們橫跨四個市場。台灣—印度是核心走廊，也是業務量最大的一環；以下說明這兩個經濟體為何互補，以及韓國與北美如何延伸同一套模式。',"],
];

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

function peopleArray(s, section) {
  const secAt = s.indexOf(`  ${section}: {`);
  const open = s.indexOf('people: [', secAt) + 'people: '.length;
  return { open, close: matchBracket(s, open) };
}

/** Drop a location object from network.locations by id. */
function dropLocation(s, id) {
  const netAt = s.indexOf('  network: {');
  const open = s.indexOf('locations: [', netAt) + 'locations: '.length;
  const close = matchBracket(s, open);
  const idAt = s.indexOf(`id: '${id}',`, open);
  if (idAt < 0 || idAt > close) {
    console.warn(`  location ${id} not found`);
    return s;
  }
  const start = s.lastIndexOf('      {\n', idAt);
  const end = s.indexOf('\n      },\n', idAt) + '\n      },\n'.length;
  return s.slice(0, start) + s.slice(end);
}

function process(half, lenin, reverts, label) {
  let out = half;

  // 1. Lenin joins Leadership, appended after the existing members.
  const { close } = peopleArray(out, 'leadership');
  const insertAt = out.lastIndexOf('\n', close) + 1;
  out = out.slice(0, insertAt) + lenin + out.slice(insertAt);

  // 2. Restore the four-markets copy.
  let hits = 0;
  for (const [from, to] of reverts) {
    if (out.includes(from)) {
      out = out.replace(from, to);
      hits += 1;
    } else {
      console.warn(`  ${label}: revert MISS -> ${from.slice(0, 55)}...`);
    }
  }

  // 3. Remove the three added map pins.
  for (const id of ['germany', 'singapore', 'australia']) out = dropLocation(out, id);

  console.log(`${label}: +Lenin, ${hits}/${reverts.length} reverts, -3 locations`);
  return out;
}

const src = readFileSync(FILE, 'utf8');
const at = src.indexOf(BOUNDARY);

const head = process(src.slice(0, at), LENIN_EN, EN_REVERT, 'en');
const tail = process(src.slice(at), LENIN_ZH, ZH_REVERT, 'zh');

writeFileSync(FILE, head + tail);
