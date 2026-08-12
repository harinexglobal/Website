/**
 * One-off: give each capability a `short` label.
 *
 * The full titles are right on the capabilities page but unusable in a 200px
 * vertical panel — "Business Advisory, Matchmaking & Delegations" would wrap to
 * five lines. `short` is the two-word form for the home page rail; the long
 * title stays canonical everywhere else.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
let s = readFileSync(FILE, 'utf8');

const SHORT = {
  'technology-transfer': ['Technology Transfer', '技術移轉'],
  'business-advisory': ['Business Advisory', '商務顧問'],
  'supplier-sourcing': ['Supplier Sourcing', '供應商採購'],
  'technical-translation': ['Technical Translation', '技術翻譯'],
  'digital-solutions': ['Digital Solutions', '數位解決方案'],
  regulatory: ['Regulatory Coordination', '法規協調'],
  'project-management': ['Project Management', '專案管理'],
  'industrial-automation': ['Industrial Automation', '工業自動化'],
};

const zhStart = s.indexOf('const zh');
let added = 0;

for (const [id, [en, zh]] of Object.entries(SHORT)) {
  // Insert `short` directly after the id line, once per language tree.
  const pattern = new RegExp(`( {8}id: '${id}',\\n)`, 'g');
  let seen = 0;
  s = s.replace(pattern, (m, g, offset) => {
    // Only touch the capabilities blocks; industries reuse none of these ids.
    seen += 1;
    const isZh = offset > zhStart;
    added += 1;
    return `${g}        short: '${isZh ? zh : en}',\n`;
  });
  if (seen !== 2) throw new Error(`${id}: expected 2 occurrences, got ${seen}`);
}

writeFileSync(FILE, s);
console.log(`added ${added} short labels (${added / 2} capabilities x 2 languages)`);
