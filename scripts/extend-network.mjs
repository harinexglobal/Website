/**
 * One-off follow-on to the team restructure.
 *
 * Adding partners for Australia, Singapore and Germany made the site
 * contradict itself: the team page showed seven markets while the homepage
 * stat, the network map and the markets page all still said four. This
 * updates the count everywhere and adds the three markets to the network map
 * so the map matches the roster.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
const BOUNDARY = 'const zh: Dict = {';

const NEW_EN = `      {
        id: 'germany',
        city: 'Karlsruhe',
        country: 'Germany',
        role: 'Germany Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and research links across the EU',
        address: '',
        focus: ['Germany market access', 'EU research collaboration', 'Advanced materials', 'Technology scouting'],
      },
      {
        id: 'singapore',
        city: 'Singapore',
        country: 'Singapore',
        role: 'Singapore Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and partner access across ASEAN',
        address: '',
        focus: ['Singapore market access', 'ASEAN partnerships', 'Industrial & automation', 'Supplier qualification'],
      },
      {
        id: 'australia',
        city: 'Australia',
        country: 'Australia',
        role: 'Australia Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and life sciences partner access',
        address: '',
        focus: ['Australia market entry', 'Life sciences partnerships', 'Pharmaceutical development', 'Technology scouting'],
      },
`;

const NEW_ZH = `      {
        id: 'germany',
        city: '卡爾斯魯厄',
        country: '德國',
        role: '德國業務開發',
        type: 'rep',
        core: false,
        detail: '負責德國市場的業務開發與歐盟research連結',
        address: '',
        focus: ['德國市場准入', '歐盟研究合作', '先進材料', '技術發掘'],
      },
      {
        id: 'singapore',
        city: '新加坡',
        country: '新加坡',
        role: '新加坡業務開發',
        type: 'rep',
        core: false,
        detail: '負責東協市場的業務開發與夥伴對接',
        address: '',
        focus: ['新加坡市場准入', '東協夥伴關係', '工業與自動化', '供應商資格認定'],
      },
      {
        id: 'australia',
        city: '澳洲',
        country: '澳洲',
        role: '澳洲業務開發',
        type: 'rep',
        core: false,
        detail: '負責澳洲市場的業務開發與生命科學夥伴對接',
        address: '',
        focus: ['澳洲市場進入', '生命科學合作', '製藥開發', '技術發掘'],
      },
`;

/** Text replacements, applied per language half. */
const EN_EDITS = [
  ["value: '4',\n        suffix: '',\n        label: 'Markets, one team',\n        detail: 'Taiwan, India, South Korea and the United States — a single accountable team.',",
   "value: '7',\n        suffix: '',\n        label: 'Markets, one team',\n        detail: 'Taiwan, India, South Korea, the United States, Germany, Singapore and Australia — a single accountable team.',"],

  ["heading: 'One firm, four markets',",
   "heading: 'One firm, seven markets',"],

  ["lead: 'Headquartered in Taiwan, with business development representatives on the ground in India, South Korea and the United States. Every market has someone who lives there, speaks the language and can visit a factory this week.',",
   "lead: 'Headquartered in Taiwan, with a branch office in India and business development partners on the ground in South Korea, the United States, Germany, Singapore and Australia. Every market has someone who lives there, speaks the language and can visit a factory this week.',"],

  ["Korea and the United States extend the same model into further markets.",
   "Korea, the United States, Germany, Singapore and Australia extend the same model into further markets."],

  ["lead: 'We work across four markets. Taiwan–India is the core corridor and the majority of our work — the pages below explain why those two economies fit together, and where Korea and North America extend the same model.',",
   "lead: 'We work across seven markets. Taiwan–India is the core corridor and the majority of our work — the pages below explain why those two economies fit together, and where Korea, North America, Germany, Singapore and Australia extend the same model.',"],
];

const ZH_EDITS = [
  ["value: '4',\n        suffix: '',\n        label: '四個市場，同一團隊',\n        detail: '台灣、印度、南韓與美國——同一支負責到底的團隊。',",
   "value: '7',\n        suffix: '',\n        label: '七個市場，同一團隊',\n        detail: '台灣、印度、南韓、美國、德國、新加坡與澳洲——同一支負責到底的團隊。',"],

  ["heading: '一家公司，四個市場',", "heading: '一家公司，七個市場',"],

  ["lead: '總部設於台灣，並在印度、南韓與美國派駐業務開發代表。每個市場都有常駐當地、通曉當地語言，且本週就能實地訪廠的人。',",
   "lead: '總部設於台灣，於印度設有分公司，並在南韓、美國、德國、新加坡與澳洲派駐業務開發夥伴。每個市場都有常駐當地、通曉當地語言，且本週就能實地訪廠的人。',"],

  ["韓國與美國則將同一套模式延伸至更多市場。",
   "韓國、美國、德國、新加坡與澳洲則將同一套模式延伸至更多市場。"],

  ["lead: '我們橫跨四個市場。台灣—印度是核心走廊，也是業務量最大的一環；以下說明這兩個經濟體為何互補，以及韓國與北美如何延伸同一套模式。',",
   "lead: '我們橫跨七個市場。台灣—印度是核心走廊，也是業務量最大的一環；以下說明這兩個經濟體為何互補，以及韓國、北美、德國、新加坡與澳洲如何延伸同一套模式。',"],
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

function apply(half, edits, block, label) {
  let out = half;
  let hits = 0;
  for (const [from, to] of edits) {
    if (out.includes(from)) {
      out = out.replace(from, to);
      hits += 1;
    } else {
      console.warn(`  ${label}: NOT FOUND -> ${from.slice(0, 60)}...`);
    }
  }

  // Append the three markets to network.locations
  const netAt = out.indexOf('  network: {');
  const open = out.indexOf('locations: [', netAt) + 'locations: '.length;
  const close = matchBracket(out, open);
  const insertAt = out.lastIndexOf('\n', close) + 1;
  out = out.slice(0, insertAt) + block + out.slice(insertAt);

  console.log(`${label}: ${hits}/${edits.length} text edits, +3 locations`);
  return out;
}

const src = readFileSync(FILE, 'utf8');
const at = src.indexOf(BOUNDARY);

const head = apply(src.slice(0, at), EN_EDITS, NEW_EN, 'en');
const tail = apply(src.slice(at), ZH_EDITS, NEW_ZH, 'zh');

writeFileSync(FILE, head + tail);
