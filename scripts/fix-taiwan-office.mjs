/**
 * One-off: the head office is in Taoyuan City, not Taipei.
 *
 * "Taipei, Taiwan" throughout the site came from the original design mockup,
 * which had no real address on it. The company's actual registered address is
 * in Guishan District, Taoyuan City — so every user-facing reference to Taipei
 * as the office location is wrong and is corrected here.
 *
 * Left alone deliberately:
 *   - "New Taipei City" — where two leadership members are based; a different
 *     municipality and unrelated to the office address.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const ADDRESS_EN = '3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004, Taiwan (R.O.C.)';
const ADDRESS_ZH = '333004 台灣 桃園市龜山區文化七路10號3樓';

const edits = [
  // --- lib/content.ts -------------------------------------------------
  {
    file: 'lib/content.ts',
    subs: [
      // Hero node label + CONTACT constant
      ["    taipei: 'Taipei',", "    taipei: 'Taoyuan',"],
      ["    taipei: '台北',", "    taipei: '桃園',"],
      ["  taipei: 'Taipei, Taiwan',", "  taipei: 'Taoyuan City, Taiwan',"],

      // Network location card
      ["        city: 'Taipei',", "        city: 'Taoyuan',"],
      ["        address: 'Taipei, Taiwan',", `        address: '${ADDRESS_EN}',`],
      ["        city: '台北',", "        city: '桃園',"],
      ["        address: '台灣 台北',", `        address: '${ADDRESS_ZH}',`],

      // Contact page office list
      ["        city: 'Taipei, Taiwan',", "        city: 'Taoyuan City, Taiwan',"],
      ["        city: '台灣 台北',", "        city: '台灣 桃園市',"],

      // Copy that names the head office
      [
        'enquiries are handled directly from Taipei.',
        'enquiries are handled directly from the Taiwan head office.',
      ],
      ['相關諮詢由台北總部直接處理。', '相關諮詢由台灣總部直接處理。'],
      [
        'contracting and delivery are run centrally from Taipei',
        'contracting and delivery are run centrally from the Taiwan head office',
      ],
      ['則由台北總部統一執行', '則由台灣總部統一執行'],
    ],
  },

  // --- lib/legal.ts ---------------------------------------------------
  {
    file: 'lib/legal.ts',
    subs: [
      ['Our registered office is in Taipei, Taiwan.', `Our registered office is at ${ADDRESS_EN}`],
      [
        'a company registered in Taiwan with its office in Taipei.',
        `a company registered in Taiwan with its office at ${ADDRESS_EN}`,
      ],
      ['登記營業處所位於台灣台北。', `登記營業處所為${ADDRESS_ZH}。`],
      ['營業處所位於台北。', `營業處所為${ADDRESS_ZH}。`],
      // Venue follows the registered office: Guishan is under Taoyuan District Court.
      ['The Taipei District Court shall be', 'The Taoyuan District Court shall be'],
      ['以台灣台北地方法院為第一審管轄法院', '以台灣桃園地方法院為第一審管轄法院'],
    ],
  },

  // --- metadata -------------------------------------------------------
  {
    file: 'app/about/team/page.tsx',
    subs: [['company leadership in Taipei', 'company leadership in Taiwan']],
  },
  {
    file: 'app/contact/page.tsx',
    subs: [
      [
        'Offices in Taipei, Taiwan and a representative desk in Chennai, India.',
        'Head office in Taoyuan City, Taiwan, with a branch office in Bengaluru, India.',
      ],
    ],
  },
  {
    file: 'README.md',
    subs: [['ROC law, Taipei District Court', 'ROC law, Taoyuan District Court']],
  },
];

let total = 0;
const missed = [];

for (const { file, subs } of edits) {
  let src = readFileSync(file, 'utf8');
  for (const [from, to] of subs) {
    if (!src.includes(from)) {
      missed.push(`${file}: ${from.slice(0, 60)}`);
      continue;
    }
    src = src.split(from).join(to);
    total += 1;
  }
  writeFileSync(file, src);
}

console.log(`applied ${total} substitutions`);
if (missed.length) {
  console.log('NOT FOUND:');
  missed.forEach((m) => console.log('  ' + m));
}
