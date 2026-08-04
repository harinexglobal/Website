/**
 * One-off: point each person's `photo` field at their processed headshot.
 * Matches on the `id` so both the English and Chinese trees are updated.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const IDS = [
  'chia-ling-shih',
  'ganesh-kumar',
  'vadivalagan-chithravel',
  'kanagaraj-naveen',
  'ariraman-mathivathanan',
];

let src = readFileSync('lib/content.ts', 'utf8');
let count = 0;

for (const id of IDS) {
  const re = new RegExp(`(id: '${id}',[\\s\\S]{0,400}?photo: )'[^']*'`, 'g');
  src = src.replace(re, (_m, head) => {
    count += 1;
    return `${head}'/brand/team/${id}.webp'`;
  });
}

writeFileSync('lib/content.ts', src);
console.log('photo paths set:', count);
