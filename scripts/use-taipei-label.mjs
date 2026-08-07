/**
 * Present the head office as Taipei rather than Taoyuan.
 *
 * The office itself has not moved: it is in Guishan District, Taoyuan City,
 * which sits inside the Taipei metropolitan area. Taipei is the name a foreign
 * counterparty recognises, so it is the better label on a map pin or a location
 * line — but only as a label.
 *
 * Deliberately NOT changed:
 *   - the full postal address, in either language
 *   - the JSON-LD addressLocality, which has to match the postal address or the
 *     structured data is simply wrong
 *   - anything in lib/legal.ts: the registered office and the Taoyuan District
 *     Court venue clause follow the registered address, not the marketing label
 */
import { readFileSync, writeFileSync } from 'node:fs';

const edits = [
  {
    file: 'lib/content.ts',
    subs: [
      // network.locations[hq].city — the map pin and location lines
      ["        city: 'Taoyuan',", "        city: 'Taipei',"],
      ["        city: '桃園',", "        city: '台北',"],
      // contact office card
      ["        city: 'Taoyuan City, Taiwan',", "        city: 'Taipei, Taiwan',"],
      ["        city: '台灣 桃園市',", "        city: '台灣 台北',"],
      // footer / short location string
      ["  taipei: 'Taoyuan City, Taiwan',", "  taipei: 'Taipei, Taiwan',"],
    ],
  },
  {
    file: 'lib/chatbot.ts',
    subs: [
      [
        'Our head office is in Taoyuan City, Taiwan, at 3F, No. 10, Wenhua 7th Rd., Guishan District.',
        'Our head office is in Taipei, Taiwan. The registered address is 3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004 — Guishan sits inside the Taipei metropolitan area, about 30 minutes from Taipei Main Station.',
      ],
      [
        '總部位於台灣桃園市龜山區文化七路 10 號 3 樓。',
        '總部位於台灣台北都會區，登記地址為桃園市龜山區文化七路 10 號 3 樓（龜山區屬大台北都會區，距台北車站約 30 分鐘）。',
      ],
    ],
  },
  {
    file: 'components/site/network-map.tsx',
    subs: [
      ["  taipei: { lon: 121.3, lat: 24.99 }, // Taoyuan", "  taipei: { lon: 121.3, lat: 24.99 }, // Guishan, labelled Taipei"],
      ["'Taoyuan, Taiwan'", "'Taipei, Taiwan'"],
    ],
  },
  {
    file: 'app/contact/page.tsx',
    subs: [['Head office in Taoyuan City, Taiwan,', 'Head office in Taipei, Taiwan,']],
  },
];

let total = 0;
for (const { file, subs } of edits) {
  let s = readFileSync(file, 'utf8');
  for (const [from, to] of subs) {
    if (!s.includes(from)) {
      console.log(`  MISS ${file}: ${from.slice(0, 56)}`);
      continue;
    }
    s = s.split(from).join(to);
    total++;
  }
  writeFileSync(file, s);
  console.log(`  ok   ${file}`);
}
console.log(`\n${total} replacements`);
