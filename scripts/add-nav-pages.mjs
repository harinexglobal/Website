/**
 * One-off: add the How We Help and Let's Connect content blocks.
 *
 * How We Help is a route in, not a ninth service. Every journey below names the
 * practices that actually do the work and links to them — the failure mode for a
 * page like this is becoming a second capabilities page that drifts out of step
 * with the first.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
let s = readFileSync(FILE, 'utf8');

const en = `  howWeHelp: {
    eyebrow: 'How We Help',
    heading: 'Three ways a project usually starts',
    lead: 'Almost every engagement begins as one of these. They are routes into the same eight practices rather than services of their own — what changes is where you are standing when you call.',
    problemLabel: 'The situation',
    practicesLabel: 'Practices this draws on',
    items: [
      {
        id: 'market-entry',
        icon: 'plane',
        title: 'Entering a new market',
        problem:
          'The product works at home. Abroad, you do not know who the credible counterparties are, what the regulator will ask for, or whether the partner in front of you is what they claim to be.',
        body: 'We do the groundwork that decides whether an entry succeeds: shortlisting counterparties rather than listing them, checking who they actually are, structuring the arrangement, and carrying the technical material across languages so nothing is lost in the version the other side reads.',
        practices: ['business-advisory', 'regulatory', 'technical-translation'],
      },
      {
        id: 'technology-transfer',
        icon: 'atom',
        title: 'Moving a technology',
        problem:
          'A process works at lab or pilot scale and needs to reach production somewhere else — under licence, with a partner, or inside your own plant in another country.',
        body: 'We scout and evaluate on the data rather than the pitch, structure the licence or joint development agreement, and stay on the project through scale-up. Where the equipment needs commissioning at the far end, that is covered too.',
        practices: ['technology-transfer', 'project-management', 'industrial-automation'],
      },
      {
        id: 'partnerships',
        icon: 'handshake',
        title: 'Finding a partner or supplier',
        problem:
          'Finding a supplier is easy. Qualifying one is the work — and doing it from another country, in another language, without visiting the floor, is where sourcing usually goes wrong.',
        body: 'Structured evaluation against your technical specification, site visits by someone who lives there, quality system assessment, and support through negotiation and contracting. You get a shortlist you can defend, not a directory.',
        practices: ['supplier-sourcing', 'business-advisory', 'project-management'],
      },
    ],
  },

  letsConnect: {
    eyebrow: "Let's Connect",
    heading: 'Tell us which conversation this is',
    lead: 'Three different questions reach us, and they need three different people. Saying which one yours is gets you to the right one faster.',
    routeLabel: 'Goes to',
    items: [
      {
        id: 'business',
        icon: 'handshake',
        title: 'Business enquiry',
        body: 'You have a technology, a supplier need, or a market to enter. This is the one most people want.',
        route: 'Taiwan head office, within two working days',
        cta: 'Start a business enquiry',
      },
      {
        id: 'partner',
        icon: 'factory',
        title: 'Partner enquiry',
        body: 'You deliver something we do not — engineering, testing, logistics, regional representation — and want to work alongside us on projects.',
        route: 'Managing Partner, Taiwan operations',
        cta: 'Start a partner enquiry',
      },
      {
        id: 'investor',
        icon: 'clipboard',
        title: 'Investor enquiry',
        body: 'You want to understand the business. We do not publish financials or make any offer through this website; this simply opens a conversation with the board.',
        route: 'Chairman and Group CEO',
        cta: 'Start an investor enquiry',
      },
    ],
  },

`;

const zh = `  howWeHelp: {
    eyebrow: '合作方式',
    heading: '專案通常由這三種情境開始',
    lead: '幾乎每一件委任都始於其中之一。這些是進入同樣八大專業服務的入口，而非另外的服務項目；不同的只是您提出需求時所處的位置。',
    problemLabel: '情境',
    practicesLabel: '涉及的專業服務',
    items: [
      {
        id: 'market-entry',
        icon: 'plane',
        title: '進入新市場',
        problem:
          '產品在本地行得通，但到了海外，您不知道誰是可信的往來對象、主管機關會要求什麼，也無法確認眼前的夥伴是否名副其實。',
        body: '我們負責決定成敗的前置作業：篩選出可用的名單而非羅列名冊、查核對方的真實身分、設計合作架構，並將技術資料完整跨語言傳達，確保對方讀到的版本沒有遺漏。',
        practices: ['business-advisory', 'regulatory', 'technical-translation'],
      },
      {
        id: 'technology-transfer',
        icon: 'atom',
        title: '技術移轉',
        problem:
          '製程在實驗室或試量產階段已可運作，需要在他地進入量產 — 以授權方式、與夥伴合作，或於貴公司在他國的廠區內進行。',
        body: '我們依據數據而非簡報進行發掘與評估，設計授權或共同開發架構，並持續參與至放大量產。若設備需在當地完成試車，此部分亦一併涵蓋。',
        practices: ['technology-transfer', 'project-management', 'industrial-automation'],
      },
      {
        id: 'partnerships',
        icon: 'handshake',
        title: '尋找夥伴或供應商',
        problem:
          '找到供應商並不難，難的是完成資格認定 — 而跨國、跨語言、未曾親臨產線就要完成這件事，正是採購最容易出錯之處。',
        body: '依貴公司技術規格進行結構化評估、由當地常駐人員實地訪廠、評估品質系統，並支援談判與簽約。您得到的是一份站得住腳的名單，而非一份名冊。',
        practices: ['supplier-sourcing', 'business-advisory', 'project-management'],
      },
    ],
  },

  letsConnect: {
    eyebrow: '與我們聯繫',
    heading: '請告訴我們這是哪一類洽談',
    lead: '我們收到的問題大致分為三類，各由不同的人負責。先說明屬於哪一類，能更快接洽到對的人。',
    routeLabel: '受理單位',
    items: [
      {
        id: 'business',
        icon: 'handshake',
        title: '業務洽詢',
        body: '您有一項技術、一項供應需求，或一個想進入的市場。多數來訪者屬於這一類。',
        route: '台灣總部，兩個工作天內回覆',
        cta: '開始業務洽詢',
      },
      {
        id: 'partner',
        icon: 'factory',
        title: '合作夥伴洽詢',
        body: '您提供本公司所沒有的能力 — 工程、檢測、物流或區域代表 — 並希望在專案上與我們並肩合作。',
        route: '管理合夥人（台灣營運）',
        cta: '開始合作洽詢',
      },
      {
        id: 'investor',
        icon: 'clipboard',
        title: '投資人洽詢',
        body: '您希望了解本公司的業務。本網站不揭露財務資訊，亦不透過本網站提出任何要約；此處僅為與董事會展開對話的起點。',
        route: '董事長與集團執行長',
        cta: '開始投資人洽詢',
      },
    ],
  },

`;

/* The file is CRLF on this machine, so every pattern here has to tolerate \r —
   a bare \n silently matches nothing and the script reports success having done
   none of the work. */
const NL = s.includes('\r\n') ? '\r\n' : '\n';
const nl = (text) => text.replace(/\n/g, NL);

let n = 0;
s = s.replace(/^ {2}cta: \{\r?\n/gm, (m) => {
  n += 1;
  return nl(n === 1 ? en : zh) + m;
});
if (n !== 2) throw new Error(`expected 2 insertions, got ${n}`);

const routesFrom = nl("  contact: '/contact',\n} as const;");
if (!s.includes(routesFrom)) throw new Error('ROUTES anchor not found');
s = s.replace(
  routesFrom,
  nl("  howWeHelp: '/how-we-help',\n  letsConnect: '/lets-connect',\n  contact: '/contact',\n} as const;"),
);

writeFileSync(FILE, s);
console.log('howWeHelp + letsConnect added to both trees; routes registered');
