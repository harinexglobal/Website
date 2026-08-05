/**
 * One-off: restate team expertise tags in terms of what each person does for
 * clients, rather than their academic speciality.
 *
 * A visitor evaluating an advisory firm cannot tell what "extracellular
 * vesicles" buys them. "Life sciences partnerships" they can act on. Chia-Ling
 * Shih's tags already read this way and are the model.
 *
 * Left unchanged: chia-ling-shih, ganesh-kumar, viney-g — already company scope.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const EN = {
  'morris-ma': [
    'Taiwan operations',
    'Supplier qualification',
    'Factory & safety audits',
    'Advanced materials',
    'Green technology',
  ],
  'vadivalagan-chithravel': [
    'North America market entry',
    'Life sciences partnerships',
    'Technology scouting',
    'Research collaboration',
  ],
  'kanagaraj-naveen': [
    'Korea market access',
    'Electronics & materials sourcing',
    'Technical due diligence',
    'Process scale-up',
  ],
  'ariraman-mathivathanan': [
    'Specialty chemicals sourcing',
    'Textile & coating technology',
    'Formulation due diligence',
    'Technology transfer support',
  ],
};

const ZH = {
  'morris-ma': ['台灣營運', '供應商資格認定', '工廠與工安稽核', '先進材料', '綠色科技'],
  'vadivalagan-chithravel': ['北美市場進入', '生命科學合作', '技術發掘', '研究合作'],
  'kanagaraj-naveen': ['韓國市場准入', '電子與材料採購', '技術實地查核', '製程放大'],
  'ariraman-mathivathanan': ['特用化學採購', '紡織與塗層技術', '配方實地查核', '技術移轉支援'],
};

const file = 'lib/content.ts';
let src = readFileSync(file, 'utf8');

// The same ids appear in both language trees, so split on the zh declaration
// and apply each map to its own half.
const BOUNDARY = 'const zh: Dict = {';
const idx = src.indexOf(BOUNDARY);
if (idx < 0) throw new Error('could not locate the zh dictionary');

let head = src.slice(0, idx);
let tail = src.slice(idx);

function apply(section, map, label) {
  let count = 0;
  for (const [id, tags] of Object.entries(map)) {
    const re = new RegExp(`(id: '${id}',[\\s\\S]*?focus: )\\[[\\s\\S]*?\\]`);
    if (!re.test(section)) {
      console.warn(`  ${label}: ${id} NOT FOUND`);
      continue;
    }
    const body = tags.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(', ');
    section = section.replace(re, (_m, prefix) => `${prefix}[${body}]`);
    count += 1;
  }
  console.log(`${label}: rewrote ${count}`);
  return section;
}

head = apply(head, EN, 'en');
tail = apply(tail, ZH, 'zh');

writeFileSync(file, head + tail);
