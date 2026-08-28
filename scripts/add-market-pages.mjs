/**
 * One-off: add the corridor landing pages content.
 *
 * Three markets get a page — India, the United States and Germany. The other
 * four are listed on /where-we-work but do not get one, because a page whose
 * only content is "we are also in Singapore" says nothing and dilutes the three
 * that do have something to say.
 *
 * Everything here describes capability and presence. No outcomes, no client
 * names, no volumes — the firm publishes none of those anywhere else, and a
 * landing page written to rank is the worst place to start.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
let s = readFileSync(FILE, 'utf8');
const NL = s.includes('\r\n') ? '\r\n' : '\n';
const nl = (t) => t.replace(/\n/g, NL);

const EN = `  /* Corridor pages — see scripts/add-market-pages.mjs for why only three. */
  marketPages: {
    eyebrow: 'Corridor',
    directionsHeading: 'Which way the work goes',
    practicesHeading: 'The practices this corridor draws on',
    peopleHeading: 'Who is on the ground',
    ctaHeading: 'Working in this corridor?',
    ctaBody:
      'Tell us what you are moving and in which direction. A first conversation costs nothing and usually clarifies more than a month of email.',
    items: [
      {
        id: 'india',
        market: 'India',
        title: 'Taiwan and India: technology transfer, sourcing and market entry',
        lead: 'A registered branch office in Bengaluru with a resident Managing Director — not an agent, not a referral arrangement. That is what makes this corridor workable in both directions.',
        intro: [
          'Taiwan makes specialty materials, precision components and process technology that Indian manufacturers need. India has manufacturing capacity, a regulated life-sciences sector, and a market Taiwanese firms consistently underestimate. Most cross-border attempts do not stall on the commercial logic, which is usually obvious. They stall on qualification, on documentation, and on the fact that nobody has visited the floor.',
          'Our Bengaluru office exists to close that gap from the Indian side. It is a branch of the Taiwanese company rather than a partner firm, so the same team is accountable at both ends of a transaction.',
        ],
        directions: [
          {
            heading: 'Taiwan into India',
            body: 'Licensing a process to an Indian manufacturer, appointing distribution, or qualifying an Indian contract manufacturer. We shortlist counterparties against your technical specification, visit sites, and carry the technical material across languages so the version the other side reads means what yours does.',
          },
          {
            heading: 'India into Taiwan',
            body: 'Sourcing Taiwanese specialty machinery, cleanroom equipment, electronic materials or pharmaceutical inputs. We qualify suppliers on the ground in Taiwan, structure the arrangement, and coordinate the regulatory documentation a shipment has to travel with.',
          },
        ],
        practices: ['supplier-sourcing', 'business-advisory', 'technical-translation', 'project-management'],
        people: ['viney-g', 'lenin-nachimuthu', 'ariraman-mathivathanan'],
      },
      {
        id: 'united-states',
        market: 'United States',
        title: 'Taiwan and the United States: advanced materials and North America access',
        lead: 'Business development and partner access across North America, run from Michigan — close to the automotive and advanced-materials corridor where most of the demand sits.',
        intro: [
          'North American buyers evaluating a Taiwanese supplier face a specific problem. The technical case is usually sound; the qualification burden is where the deal dies. Audits, documentation, and a supply chain that has to be defensible to a customer two tiers further down.',
          'Our North America representation exists to make that qualification tractable — to put a real person between a US buyer and a Taiwanese plant, rather than a purchase order and a hope.',
        ],
        directions: [
          {
            heading: 'Taiwan into North America',
            body: 'Introducing Taiwanese advanced materials, components and process technology to North American buyers and distributors, and preparing the supplier for the qualification standard those buyers apply.',
          },
          {
            heading: 'North America into Taiwan',
            body: 'Identifying and qualifying Taiwanese suppliers for US manufacturers, with site visits, quality-system assessment, and the documentation an incoming inspection will ask for.',
          },
        ],
        practices: ['supplier-sourcing', 'technology-transfer', 'business-advisory', 'regulatory'],
        people: ['vadivalagan-chithravel'],
      },
      {
        id: 'germany',
        market: 'Germany',
        title: 'Taiwan and Germany: advanced materials and EU research collaboration',
        lead: 'Business development and research links across the European Union, run from Karlsruhe — in the middle of the German materials and engineering research corridor.',
        intro: [
          'This corridor is not primarily a volume trade. It is technology: materials developed in one place that solve a problem in the other, research groups whose work is complementary and who have never been introduced, and licensing arrangements that need structuring rather than selling.',
          'Germany also sets the compliance bar for much of the EU. A product that satisfies a German buyer usually satisfies the rest, which makes it the sensible place to start rather than the hardest place to finish.',
        ],
        directions: [
          {
            heading: 'Taiwan into the EU',
            body: 'Positioning Taiwanese materials and process technology for German and EU buyers, and scoping what EU regulatory expectations mean for a product designed for an Asian market.',
          },
          {
            heading: 'EU into Taiwan',
            body: 'Scouting Taiwanese technology and manufacturing capability for European companies and research groups, structuring licences and joint development agreements, and staying with the project through scale-up.',
          },
        ],
        practices: ['technology-transfer', 'regulatory', 'business-advisory', 'project-management'],
        people: ['muthu-kumar-thangavel'],
      },
    ],
  },

`;

const ZH = `  marketPages: {
    eyebrow: '跨境廊道',
    directionsHeading: '工作的方向',
    practicesHeading: '本廊道涉及的專業服務',
    peopleHeading: '當地負責人',
    ctaHeading: '您正在這條廊道上嗎？',
    ctaBody:
      '請告訴我們您要移轉的標的與方向。第一次洽談不需任何費用，且通常比一個月的電子郵件更能釐清問題。',
    items: [
      {
        id: 'india',
        market: '印度',
        title: '台灣與印度：技術移轉、採購與市場進入',
        lead: '於班加羅爾設有登記分公司，並由常駐總經理主持 — 非代理商，亦非介紹合作。這是本廊道得以雙向運作的前提。',
        intro: [
          '台灣生產印度製造業所需的特用材料、精密零組件與製程技術；印度則擁有製造產能、受規範的生命科學產業，以及一個台灣企業普遍低估的市場。大多數跨境嘗試並非卡在商業邏輯，而是卡在資格認定、文件，以及沒有人真正到過現場。',
          '本公司班加羅爾辦公室就是為了從印度端補上這個缺口。它是台灣公司的分公司而非合作伙伴，因此同一支團隊對交易兩端都負責。',
        ],
        directions: [
          {
            heading: '台灣進入印度',
            body: '將製程授權給印度製造商、建立通路，或認定印度代工廠。我們依貴公司技術規格篩選名單、實地訪廠，並將技術資料完整跨語言傳達。',
          },
          {
            heading: '印度進入台灣',
            body: '採購台灣特用機械、無塵室設備、電子材料或製藥原料。我們在台灣實地認定供應商、設計合作架構，並協調出貨所需的法規文件。',
          },
        ],
        practices: ['supplier-sourcing', 'business-advisory', 'technical-translation', 'project-management'],
        people: ['viney-g', 'lenin-nachimuthu', 'ariraman-mathivathanan'],
      },
      {
        id: 'united-states',
        market: '美國',
        title: '台灣與美國：先進材料與北美市場進入',
        lead: '由密歇根州負責北美地區的業務發展與夥伴對接 — 靈近需求最集中的汽車與先進材料產業帶。',
        intro: [
          '北美買主在評估台灣供應商時面對一個具體問題：技術面通常沒有異議，真正讓案子停止的是資格認定的負擔 — 稽核、文件，以及一條必須向下游客戶交代得過去的供應鏈。',
          '本公司的北美代表就是為了讓這項認定工作可以執行 — 在美國買主與台灣工廠之間，放一個真正的人，而不是一張訂單和一份期待。',
        ],
        directions: [
          {
            heading: '台灣進入北美',
            body: '將台灣先進材料、零組件與製程技術引介給北美買主與通路商，並協助供應商達到對方套用的資格認定標準。',
          },
          {
            heading: '北美進入台灣',
            body: '為美國製造商尋找並認定台灣供應商，包含實地訪廠、品質系統評估，以及進料檢驗會要求的文件。',
          },
        ],
        practices: ['supplier-sourcing', 'technology-transfer', 'business-advisory', 'regulatory'],
        people: ['vadivalagan-chithravel'],
      },
      {
        id: 'germany',
        market: '德國',
        title: '台灣與德國：先進材料與歐盟研究合作',
        lead: '由卡爾斯魯與負責歐盟地區的業務發展與研究連結 — 位於德國材料與工程研究廊道的中心。',
        intro: [
          '本廊道主要不是量產貿易，而是技術：在一地開發、在另一地解決問題的材料；彼此互補卻從未被引見的研究團隊；以及需要被設計而非被推銷的授權安排。',
          '德國也設定了歐盟大部分的法規門檻。能滿足德國買主的產品，通常也能滿足其餘市場 — 因此它是合理的起點，而非最難的終點。',
        ],
        directions: [
          {
            heading: '台灣進入歐盟',
            body: '將台灣材料與製程技術定位給德國與歐盟買主，並釐清歐盟法規要求對一項為亞洲市場設計之產品的實際影響。',
          },
          {
            heading: '歐盟進入台灣',
            body: '為歐洲企業與研究團隊發掘台灣技術與製造能量，設計授權與共同開發架構，並持續參與至放大量產。',
          },
        ],
        practices: ['technology-transfer', 'regulatory', 'business-advisory', 'project-management'],
        people: ['muthu-kumar-thangavel'],
      },
    ],
  },

`;

let n = 0;
s = s.replace(/^  cta: \{\r?\n/gm, (m) => {
  n += 1;
  return nl(n === 1 ? EN : ZH) + m;
});
if (n !== 2) throw new Error(`expected 2 insertions, got ${n}`);

/* Register the route. */
const from = nl("  letsConnect: '/lets-connect',");
if (!s.includes(from)) throw new Error('ROUTES anchor not found');
s = s.replace(from, nl("  letsConnect: '/lets-connect',\n  market: (id: string) => `/where-we-work/${id}`,"));

writeFileSync(FILE, s);
console.log('marketPages added to both trees; ROUTES.market registered');
