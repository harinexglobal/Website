/**
 * One-off: fold "Trade Mission & Delegation Support" into
 * "Business Advisory & Cross-Border Matchmaking".
 *
 * They were one practice split across two cards. Advisory found the counterparty
 * and structured the deal; the trade-mission entry was how that same matchmaking
 * got executed in person — curated meetings, factory visits, interpretation. A
 * visitor reading both saw the same promise twice.
 *
 * The COMPUTEX / BioAsia / TIMTOS names move into the description rather than
 * being dropped; they are the most concrete detail either card had.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/content.ts';
let s = readFileSync(FILE, 'utf8');

const swap = (from, to, label) => {
  if (!s.includes(from)) throw new Error(`no match: ${label}`);
  if (s.split(from).length - 1 !== 1) throw new Error(`expected exactly one: ${label}`);
  s = s.replace(from, to);
};

/* ---- English ------------------------------------------------------------ */
swap(
  `        title: 'Business Advisory & Cross-Border Matchmaking',
        summary:
          'Market entry, partner identification and the structuring work that makes a deal hold.',
        description:
          'We support companies entering an unfamiliar market with the groundwork that determines whether an entry succeeds: who the credible counterparties are, how a joint venture should be structured, what the regulatory and tax posture looks like, and whether the partner in front of you is what they claim to be.',
        deliverables: [
          'Market entry strategy',
          'Business matchmaking & partner shortlists',
          'Joint venture structuring',
          'OEM / ODM partnership development',
          'Foreign direct investment facilitation',
          'Background checks & commercial due diligence',
        ],
        tags: ['Market entry', 'JV', 'FDI', 'Due diligence'],`,
  `        title: 'Business Advisory, Matchmaking & Delegations',
        summary:
          'Finding the right counterparty, getting you in the room with them, and structuring what follows.',
        description:
          'We support companies entering an unfamiliar market with the groundwork that determines whether an entry succeeds: who the credible counterparties are, how a joint venture should be structured, what the regulatory and tax posture looks like, and whether the partner in front of you is what they claim to be. That carries through to the meeting itself — delegations, trade shows and factory visits at COMPUTEX, BioAsia Taiwan, TIMTOS and industry exhibitions, with curated meetings, interpretation, and the follow-through that usually decides whether a mission was worth the airfare.',
        deliverables: [
          'Market entry strategy',
          'Business matchmaking & partner shortlists',
          'Curated B2B meetings, delegations & trade shows',
          'Factory visits & site audits',
          'Joint venture structuring & OEM / ODM development',
          'Foreign direct investment facilitation',
          'Background checks & commercial due diligence',
        ],
        tags: ['Market entry', 'JV & FDI', 'Delegations', 'Due diligence'],`,
  'en business-advisory',
);

/* ---- Chinese ------------------------------------------------------------ */
swap(
  `        title: '商務顧問與跨境媒合',
        summary: '市場進入、夥伴發掘，以及讓交易站得住腳的架構設計。',
        description:
          '我們協助企業進入陌生市場時，完成真正決定成敗的前置作業：誰是可信的交易對象、合資架構應如何設計、法規與稅務態勢為何，以及眼前的夥伴是否真如其所宣稱。',
        deliverables: [
          '市場進入策略',
          '商務媒合與夥伴名單',
          '合資架構規劃',
          'OEM / ODM 合作開發',
          '外商投資協助',
          '背景查核與商務實地查核',
        ],
        tags: ['市場進入', '合資', '外商投資', '實地查核'],`,
  `        title: '商務顧問、媒合與商務團',
        summary: '找到對的交易對象、安排雙方見面，並把後續架構談定。',
        description:
          '我們協助企業進入陌生市場時，完成真正決定成敗的前置作業：誰是可信的交易對象、合資架構應如何設計、法規與稅務態勢為何，以及眼前的夥伴是否真如其所宣稱。此一支援延續至實際會面：於 COMPUTEX、BioAsia Taiwan、TIMTOS 及各產業展會安排商務團、參展與實地訪廠，並提供精選會議安排、口譯，以及決定此行是否值回票價的後續追蹤。',
        deliverables: [
          '市場進入策略',
          '商務媒合與夥伴名單',
          '精選 B2B 會議、商務團與參展',
          '實地訪廠與現場稽核',
          '合資架構規劃與 OEM / ODM 開發',
          '外商投資協助',
          '背景查核與商務實地查核',
        ],
        tags: ['市場進入', '合資與外商投資', '商務團', '實地查核'],`,
  'zh business-advisory',
);

/* ---- Drop the standalone card from both trees ---------------------------- */
let removed = 0;
s = s.replace(/ {6}\{\n {8}id: 'trade-mission',[\s\S]*?\n {6}\},\n/g, () => {
  removed += 1;
  return '';
});
if (removed !== 2) throw new Error(`trade-mission removal: expected 2, got ${removed}`);

/* ---- Nine back down to eight -------------------------------------------- */
swap(
  "heading: 'Nine practices, one accountable team'",
  "heading: 'Eight practices, one accountable team'",
  'en heading',
);
swap("heading: '九大專業服務，單一負責團隊'", "heading: '八大專業服務，單一負責團隊'", 'zh heading');

writeFileSync(FILE, s);
console.log('merged trade-mission into business-advisory; heading now eight');
