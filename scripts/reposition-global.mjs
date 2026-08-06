/**
 * Repositions the site from "Taiwan–India corridor" to "Taiwan to the world".
 *
 * The corridor framing was correct when the roster was Taiwan + India + two
 * representatives. It now reads as a contradiction: the team covers seven
 * markets, so copy calling India "the core corridor and the majority of our
 * work" tells a German or Singaporean visitor they are a footnote.
 *
 * What changes is positioning, not claims. Every market named here has a named
 * person behind it on the team page — nothing is asserted that the roster does
 * not already support.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const BOUNDARY = 'const zh: Dict = {';

/* ------------------------------------------------------------------ */
/* lib/content.ts                                                       */
/* ------------------------------------------------------------------ */

const EN = [
  // Hero badge — a list of four countries becomes a posture.
  [`badge: 'Taiwan · India · South Korea · United States',`,
   `badge: 'Headquartered in Taiwan · Operating worldwide',`],

  // Stats
  [`value: '4',\n        suffix: '',\n        label: 'Markets, one team',\n        detail: 'Taiwan, India, South Korea and the United States — a single accountable team.',`,
   `value: '7',\n        suffix: '',\n        label: 'Markets, one team',\n        detail: 'Taiwan, India, South Korea, the United States, Germany, Singapore and Australia — a single accountable team.',`],

  // Capability summaries
  [`'Industrial scale-up, market entry and distribution. India is the core corridor and the majority of our work; South Korea and North America run the same model.',`,
   `'Industrial scale-up, market entry and distribution, run to the same model in every market we operate in.',`],
  [`'Qualified manufacturing partners across Taiwan and India, verified in person.',`,
   `'Qualified manufacturing partners across our markets, verified in person.',`],

  // Markets page
  [`lead: 'We work across four markets. Taiwan–India is the core corridor and the majority of our work — the pages below explain why those two economies fit together, and where Korea and North America extend the same model.',`,
   `lead: 'Taiwan is our home and our anchor. From it we run the same model into seven markets across Asia, Europe, North America and Oceania — each with someone on the ground who lives there.',`],
  [`indiaTitle: 'Why India',`, `indiaTitle: 'Why go global from Taiwan',`],
  [`indiaLead: "One of the world's fastest-growing markets.",`,
   `indiaLead: 'A dense industrial base is only worth what it can reach.',`],
  [`    indiaPoints: [
      'Large and expanding manufacturing base',
      'Rapidly growing healthcare and pharma sector',
      'Major infrastructure investment underway',
      'Competitive production economics',
      'Deep engineering talent pool',
      'Substantial domestic demand',
    ],`,
   `    indiaPoints: [
      'Seven markets, each with a resident partner',
      'Asia, Europe, North America and Oceania',
      'Local language and local business culture',
      'Site visits without a long-haul wait',
      'One accountable team, not a referral chain',
      'Technical evaluation run centrally from Taiwan',
    ],`],
  [`'What is usually missing is not opportunity but a counterparty who understands both the technology and both business cultures well enough to keep a project moving. That is the role we play.',`,
   `'What is usually missing is not opportunity but a counterparty who understands both the technology and the business cultures involved well enough to keep a project moving. That is the role we play.',`],

  // Process
  [`'Structured scouting across our Taiwanese and Indian networks, producing a shortlist rather than a directory.'`,
   `'Structured scouting across our global network, producing a shortlist rather than a directory.'`],

  // Network
  [`heading: 'One firm, four markets',`, `heading: 'One firm, seven markets',`],
  [`lead: 'Headquartered in Taiwan, with business development representatives on the ground in India, South Korea and the United States. Every market has someone who lives there, speaks the language and can visit a factory this week.',`,
   `lead: 'Headquartered in Taiwan, with a branch office in India and business development partners on the ground in South Korea, the United States, Germany, Singapore and Australia. Every market has someone who lives there, speaks the language and can visit a factory this week.',`],
  [`coreLabel: 'Core corridor',`, `coreLabel: 'Office',`],
  [`'The Taiwan–India corridor remains our core business and the majority of our work — it is where our own technical and operating experience runs deepest. Korea and the United States extend the same model into further markets. Representatives are the first point of contact for their region, while technical evaluation, contracting and delivery are run centrally from the Taiwan head office, so you get local access without a fragmented engagement.',`,
   `'Taiwan is the head office and the legal entity, with a branch in India. Everywhere else, a resident partner is the first point of contact for their region. Technical evaluation, contracting and delivery are run centrally from Taiwan, so you get local access without a fragmented engagement — one team accountable for the whole project, wherever it runs.',`],

  // Insights
  [`heading: 'Perspectives on the Taiwan–India corridor',`,
   `heading: 'Perspectives on cross-border technology transfer',`],

  // FAQ
  [`q: 'Do you work outside Taiwan and India?',`, `q: 'Which markets do you work in?',`],
  [`a: 'Yes. The Taiwan–India corridor is our core business and where our own experience runs deepest, but we have business development representatives in South Korea and the United States and can support projects into those markets under the same model.',`,
   `a: 'Seven: Taiwan, India, South Korea, the United States, Germany, Singapore and Australia. Each has a partner who lives there, and every engagement is run to the same model from the Taiwan head office. Ask about anywhere else and we will tell you honestly whether we can help.',`],

  // Footer
  [`blurb: 'Connecting Taiwan and India through technology, innovation and trusted partnerships.',`,
   `blurb: 'Connecting Taiwan with the world through technology, innovation and trusted partnerships.',`],
];

const ZH = [
  [`badge: '台灣 · 印度 · 南韓 · 美國',`, `badge: '總部設於台灣 · 服務遍及全球',`],

  [`value: '4',\n        suffix: '',\n        label: '四個市場，同一團隊',\n        detail: '台灣、印度、南韓與美國，由單一負責團隊統籌執行。',`,
   `value: '7',\n        suffix: '',\n        label: '七個市場，同一團隊',\n        detail: '台灣、印度、南韓、美國、德國、新加坡與澳洲，由單一負責團隊統籌執行。',`],

  [`'產業放大、市場進入與通路布建。印度為核心走廊，也是業務量最大的一環；南韓與北美則採行相同模式。',`,
   `'產業放大、市場進入與通路布建；在我們營運的每一個市場，皆採行相同模式。',`],
  [`summary: '橫跨台灣與印度、且經實地驗證的合格製造夥伴。',`,
   `summary: '橫跨我們各市場、且經實地驗證的合格製造夥伴。',`],

  [`lead: '我們橫跨四個市場。台灣—印度是核心走廊，也是業務量最大的一環；以下說明這兩個經濟體為何互補，以及韓國與北美如何延伸同一套模式。',`,
   `lead: '台灣是我們的根據地與支點。我們以台灣為起點，將同一套模式推展至橫跨亞洲、歐洲、北美與大洋洲的七個市場，每一個市場都有常駐當地的夥伴。',`],
  [`indiaTitle: '為什麼是印度',`, `indiaTitle: '為什麼從台灣走向全球',`],
  [`indiaLead: '全球成長最快速的市場之一。',`, `indiaLead: '深厚的產業基礎，價值取決於它能觸及多遠。',`],

  [`'在台灣與印度網絡中進行結構化搜尋，產出的是精選名單而非通訊錄。'`,
   `'在我們的全球網絡中進行結構化搜尋，產出的是精選名單而非通訊錄。'`],

  [`heading: '一家公司，四個市場',`, `heading: '一家公司，七個市場',`],
  [`lead: '總部設於台灣，並在印度、南韓與美國派駐業務開發代表。每個市場都有長駐當地、通曉語言、本週就能前往工廠實地拜訪的人。',`,
   `lead: '總部設於台灣，於印度設有分公司，並在南韓、美國、德國、新加坡與澳洲派駐業務開發夥伴。每個市場都有長駐當地、通曉語言、本週就能前往工廠實地拜訪的人。',`],
  [`coreLabel: '核心走廊',`, `coreLabel: '據點',`],
  [`'台灣—印度走廊仍是我們的核心業務，也是業務量最大的一環——這是我們自身技術與營運經驗最深厚的領域。韓國與美國則是將同一套模式延伸至更多市場。各地代表是該區域的第一線窗口；技術評估、合約與交付則由台灣總部統一執行，讓您在獲得在地服務的同時，不必面對分散的專案窗口。',`,
   `'台灣是總部所在與法律主體，印度設有分公司。其餘地區皆由常駐當地的夥伴擔任該區域的第一線窗口。技術評估、合約與交付統一由台灣執行，讓您在獲得在地服務的同時，不必面對分散的專案窗口——無論專案在何處進行，都由同一支團隊負責到底。',`],

  [`heading: '台印走廊的觀察與觀點',`, `heading: '跨境技術移轉的觀察與觀點',`],

  [`q: '台灣與印度以外的市場，貴公司也承接嗎？',`, `q: '貴公司服務哪些市場？',`],
  [`a: '是的。台灣—印度走廊是我們的核心業務，也是我們經驗最深厚的領域；同時我們在南韓與美國設有業務開發代表，可依相同模式支援進入這些市場的專案。',`,
   `a: '共七個：台灣、印度、南韓、美國、德國、新加坡與澳洲。每個市場都有常駐當地的夥伴，所有委任皆由台灣總部依同一套模式執行。若是其他地區，請直接詢問，我們會據實告知能否協助。',`],

  [`blurb: '以技術、創新與值得信賴的夥伴關係，連結台灣與印度。',`,
   `blurb: '以技術、創新與值得信賴的夥伴關係，連結台灣與世界。',`],
];

const ZH_POINTS = [
  [`    indiaPoints: [`, `    indiaPoints: [`], // marker only; replaced below
];

/* Locations to restore on the network map. */
const LOC_EN = `      {
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

const LOC_ZH = `      {
        id: 'germany',
        city: '卡爾斯魯厄',
        country: '德國',
        role: '德國業務開發',
        type: 'rep',
        core: false,
        detail: '負責德國市場的業務開發與歐盟研究連結',
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

function apply(half, pairs, label) {
  let out = half;
  let hits = 0;
  for (const [from, to] of pairs) {
    if (out.includes(from)) {
      out = out.replace(from, to);
      hits += 1;
    } else {
      console.warn(`  ${label}: MISS -> ${from.slice(0, 58).replace(/\n/g, ' ')}...`);
    }
  }
  console.log(`${label}: ${hits}/${pairs.length}`);
  return out;
}

function addLocations(half, block, label) {
  const netAt = half.indexOf('  network: {');
  const open = half.indexOf('locations: [', netAt) + 'locations: '.length;
  const close = matchBracket(half, open);
  if (half.slice(open, close).includes("id: 'germany'")) {
    console.log(`  ${label}: locations already present`);
    return half;
  }
  const at = half.lastIndexOf('\n', close) + 1;
  console.log(`  ${label}: +3 locations`);
  return half.slice(0, at) + block + half.slice(at);
}

const F = 'lib/content.ts';
const src = readFileSync(F, 'utf8');
const at = src.indexOf(BOUNDARY);

let head = apply(src.slice(0, at), EN, 'content en');
let tail = apply(src.slice(at), ZH, 'content zh');

// Chinese indiaPoints — replaced positionally since the list has no unique anchor.
const zhPointsFrom = tail.slice(tail.indexOf('    indiaPoints: ['), tail.indexOf('],', tail.indexOf('    indiaPoints: [')) + 2);
const zhPointsTo = `    indiaPoints: [
      '七個市場，各有常駐夥伴',
      '橫跨亞洲、歐洲、北美與大洋洲',
      '在地語言與在地商業文化',
      '實地訪廠無須長途等待',
      '同一支負責團隊，而非轉介鏈',
      '技術評估由台灣統一執行',
    ],`;
tail = tail.replace(zhPointsFrom, zhPointsTo);
console.log('content zh: indiaPoints rewritten');

head = addLocations(head, LOC_EN, 'en');
tail = addLocations(tail, LOC_ZH, 'zh');

writeFileSync(F, head + tail);

/* ------------------------------------------------------------------ */
/* Everything else                                                      */
/* ------------------------------------------------------------------ */

const OTHERS = [
  ['lib/chatbot.ts', [
    [`'The Taiwan–India corridor is our core business and where our own experience runs deepest, but we have representatives in South Korea and the United States and can support projects into those markets under the same model. Ask about anywhere else and we will tell you honestly whether we can help.',`,
     `'Seven markets: Taiwan, India, South Korea, the United States, Germany, Singapore and Australia. Each has a partner who lives there, and every engagement runs to the same model from the Taiwan head office. Ask about anywhere else and we will tell you honestly whether we can help.',`],
    [`'台灣—印度走廊是我們的核心業務，也是經驗最深厚的領域；同時我們在南韓與美國設有代表，可依相同模式支援進入這些市場的專案。若是其他地區，請直接詢問，我們會據實告知能否協助。',`,
     `'共七個市場：台灣、印度、南韓、美國、德國、新加坡與澳洲。每個市場都有常駐當地的夥伴，所有委任皆由台灣總部依同一套模式執行。若是其他地區，請直接詢問，我們會據實告知能否協助。',`],
  ]],
  ['app/layout.tsx', [
    [`'Connecting innovation and trusted partnerships across the globe. Technology transfer, sourcing, localisation and project management, anchored in the Taiwan–India corridor.'`,
     `'Connecting innovation and trusted partnerships across the globe. Technology transfer, sourcing, localisation and project management, run from Taiwan into seven markets.'`],
  ]],
  ['app/insights/page.tsx', [
    [`'Practical notes on cross-border technology transfer, supplier qualification, market entry and technical localisation across the Taiwan–India corridor.'`,
     `'Practical notes on cross-border technology transfer, supplier qualification, market entry and technical localisation across our markets.'`],
  ]],
  ['app/markets/page.tsx', [
    [`'Where HariNex Global operates and why. The Taiwan–India corridor is our core business and the majority of our work, extended into South Korea and North America under the same model.'`,
     `'Where HariNex Global operates and why. Headquartered in Taiwan, running the same model into seven markets across Asia, Europe, North America and Oceania.'`],
  ]],
  ['components/site/network-map.tsx', [
    [`  /** Emphasised: the Taiwan–India corridor is the core business. */`,
     `  /** Emphasised: an office rather than a resident partner. */`],
  ]],
];

for (const [file, pairs] of OTHERS) {
  let s = readFileSync(file, 'utf8');
  let hits = 0;
  for (const [from, to] of pairs) {
    // layout.tsx carries the same string twice (openGraph + twitter).
    if (s.includes(from)) {
      s = s.split(from).join(to);
      hits += 1;
    } else {
      console.warn(`  ${file}: MISS -> ${from.slice(0, 50)}...`);
    }
  }
  writeFileSync(file, s);
  console.log(`${file}: ${hits}/${pairs.length}`);
}
