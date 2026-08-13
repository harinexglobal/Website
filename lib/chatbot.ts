/**
 * Chat assistant knowledge base and matcher.
 *
 * Deliberately rule-based rather than LLM-backed:
 *   - no API key, no per-message cost, no additional serverless function
 *     (which matters while deploys are metered)
 *   - it cannot invent an answer, which for a firm selling regulatory and
 *     technical due diligence is the more important property
 *
 * Everything it says is drawn from copy already published on the site. When it
 * cannot match a question it says so and offers the enquiry form rather than
 * guessing. The answer engine can be swapped for an LLM later without touching
 * the widget — see README.
 */

import type { Lang } from './content';

export type ChatIntent = {
  id: string;
  /** Lower-cased keywords. A match on any one scores; more matches rank higher. */
  keywords: string[];
  answer: string;
  /** Follow-up chips offered after this answer. */
  followUps?: string[];
  /** Optional link surfaced with the answer. */
  link?: { href: string; label: string };
};

type ChatPack = {
  ui: {
    launcher: string;
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    send: string;
    close: string;
    reset: string;
    suggestionsLabel: string;
    fallback: string;
    disclaimer: string;
    contactCta: string;
    typing: string;
  };
  starters: string[];
  intents: ChatIntent[];
};

/* ------------------------------------------------------------------ */

const en: ChatPack = {
  ui: {
    launcher: 'Ask a question',
    title: 'Hari AI',
    subtitle: 'Assistant for HariNex Global',
    greeting:
      'Hello. I can answer questions about our services, industries, offices and how we work. What would you like to know?',
    placeholder: 'Type your question…',
    send: 'Send',
    close: 'Close chat',
    reset: 'Start over',
    suggestionsLabel: 'Try asking',
    fallback:
      'I do not have a reliable answer to that from the material on this site, and I would rather say so than guess. Send us the question directly and a person will answer it.',
    disclaimer:
      'Automated assistant. General information only — not legal, tax or regulatory advice.',
    contactCta: 'Ask us directly',
    typing: 'Typing…',
  },

  starters: [
    'What services do you offer?',
    'Where are your offices?',
    'Do you sign an NDA?',
    'How do you charge?',
    'Do you work in my industry?',
  ],

  intents: [
    {
      id: 'services',
      keywords: [
        'service', 'services', 'offer', 'do you do', 'what do you', 'capability',
        'capabilities', 'help with', 'provide',
      ],
      answer:
        'We work across eight practices: technology transfer and commercialisation; business advisory and cross-border matchmaking; strategic supplier sourcing; technical translation and localisation; website and AI digital solutions; regulatory coordination; trade mission and delegation support; and international project management. Each can be taken on its own or combined.',
      link: { href: '/what-we-do', label: 'See all capabilities' },
      followUps: ['Tell me about technology transfer', 'Do you do supplier sourcing?', 'How do you charge?'],
    },
    {
      id: 'technology-transfer',
      keywords: ['technology transfer', 'licence', 'license', 'licensing', 'commercialis', 'commercializ', 'ip transfer', 'know-how'],
      answer:
        'We scout, evaluate and structure the transfer of commercially viable technology between markets — including non-bisphenol textile chemistry, biotech intellectual property, pilot-plant scale-up and joint development agreements. Technical due diligence is done by chemists, so a technology is judged on its data rather than its pitch deck.',
      link: { href: '/what-we-do/technology-transfer', label: 'Technology transfer' },
      followUps: ['Who owns the IP?', 'How long does a transfer take?', 'Do you sign an NDA?'],
    },
    {
      id: 'sourcing',
      keywords: ['sourcing', 'supplier', 'manufacturer', 'factory', 'vendor', 'audit', 'find a supplier'],
      answer:
        'We identify candidate factories, evaluate them against your technical specification, visit sites in person, assess quality systems and support negotiation. We are paid for the evaluation rather than for placing a particular supplier, so there is no incentive to pass a factory that should not pass.',
      link: { href: '/what-we-do/supplier-sourcing', label: 'Supplier sourcing' },
      followUps: ['What if a supplier fails your evaluation?', 'How quickly can you arrange a factory visit?'],
    },
    {
      id: 'translation',
      keywords: ['translat', 'localis', 'localiz', 'chinese', 'language', 'interpret', 'patent translation', 'document'],
      answer:
        'Traditional Chinese to and from English, for documents where a mistranslation is a compliance event — patents, SOPs and GMP records, clinical protocols, safety data sheets and contracts. It is handled by people with laboratory and regulatory backgrounds, and we agree a terminology glossary with you before work starts.',
      link: { href: '/what-we-do/technical-translation', label: 'Technical translation' },
      followUps: ['Can you do certified translations?', 'How do you charge?'],
    },
    {
      id: 'regulatory',
      keywords: ['regulat', 'tfda', 'cdsco', 'iso 13485', 'reach', 'zdhc', 'compliance', 'submission', 'cmc', 'registration'],
      answer:
        'We coordinate documentation and compliance support across TFDA, CDSCO, ISO 13485, REACH and ZDHC, including CMC sections and technical files. To be clear: those references describe areas we work in, not certifications HariNex holds, and regulatory outcomes are decided by the authority rather than by us.',
      link: { href: '/what-we-do/regulatory', label: 'Regulatory coordination' },
      followUps: ['Can you do certified translations?', 'Are you a law firm?'],
    },
    {
      id: 'industries',
      keywords: ['industry', 'industries', 'sector', 'vertical', 'pharma', 'biotech', 'semiconductor', 'electronics', 'chemical', 'medical device', 'textile', 'my industry'],
      answer:
        'Seven verticals: non-bisphenol (BPA/BPS-free) technology; specialty and advanced materials; biotech, life sciences and pharmaceuticals; medical devices and cleanroom automation; electronics and semiconductor materials; sustainable technologies and renewable energy; and research institutes and universities.',
      link: { href: '/what-we-do/industries', label: 'See industries' },
      followUps: ['What services do you offer?', 'Where are your offices?'],
    },
    {
      id: 'offices',
      keywords: ['office', 'offices', 'located', 'location', 'where are you', 'address', 'based', 'taiwan', 'india', 'korea', 'usa', 'america', 'branch'],
      answer:
        'Our head office is in Taipei, Taiwan. The registered address is 3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004 — Guishan sits inside the Taipei metropolitan area, about 30 minutes from Taipei Main Station. We have a branch office in Bengaluru, India, and business development partners in South Korea, the United States, Germany, Singapore and Australia.',
      link: { href: '/where-we-work', label: 'Global markets' },
      followUps: ['Who is on the team?', 'Ask us directly'],
    },
    {
      id: 'team',
      keywords: ['team', 'who works', 'people', 'staff', 'founder', 'director', 'leadership', 'partner', 'advisor', 'adviser'],
      answer:
        'Leadership sits in Taiwan and India — Chia-Ling Shih as Founder and Chairman, Dr. Sivarasan Ganesan as Group CEO and Managing Partner, Dr. D. Ganesh Kumar as Chief Advisor, Morris S.S. Ma on Taiwan operations, and the India branch managing director and project management lead. The global team represents South Korea, North America, Germany, Singapore and Australia, plus a technical specialist in materials and polymers.',
      link: { href: '/who-we-are/team', label: 'Meet the team' },
      followUps: ['Where are your offices?', 'What services do you offer?'],
    },
    {
      id: 'nda',
      keywords: ['nda', 'confidential', 'non-disclosure', 'secret', 'disclosure', 'protect my'],
      answer:
        'Yes, and we prefer to. We will sign your NDA or provide a mutual one before you share any technical detail, and nothing technical is discussed with a third party until an agreement is in place. Please do not send confidential material through the website forms before that is done.',
      followUps: ['Who owns the IP?', 'Ask us directly'],
    },
    {
      id: 'ip',
      keywords: ['ip', 'intellectual property', 'patent', 'own the', 'ownership', 'rights'],
      answer:
        'The licensor does, unless the agreement says otherwise. Our role is to structure the transfer so ownership, field of use, territory and improvement rights are explicit before anything is signed. We coordinate with qualified IP counsel on the drafting itself — we are not a law firm.',
      followUps: ['Are you a law firm?', 'Tell me about technology transfer'],
    },
    {
      id: 'pricing',
      keywords: ['!charge', '!cost', '!price', '!pricing', '!fee', '!fees', 'rate', '!how much', 'budget', '!quote'],
      answer:
        'Advisory work is quoted as a fixed fee against a defined scope. Sourcing and transfer projects are milestone-based. Ongoing support is a monthly retainer. Every engagement is quoted in writing before it starts, and scope changes are quoted separately rather than appearing on an invoice. We do not publish a rate card, because a five-page brochure site and a multi-currency store have nothing in common.',
      link: { href: '/lets-connect', label: 'Request a quote' },
      followUps: ['What services do you offer?', 'Ask us directly'],
    },
    {
      id: 'supplier-fails',
      keywords: ['fails', 'fail', 'reject', 'not qualified', 'what if the supplier', 'bad supplier'],
      answer:
        'We tell you, with the evidence, and move to the next candidate. Because we are paid for the evaluation rather than for placing a supplier, there is no incentive to pass a factory that should not pass.',
      followUps: ['Do you do supplier sourcing?', 'How quickly can you arrange a factory visit?'],
    },
    {
      id: 'factory-visit',
      keywords: ['factory visit', 'site visit', 'visit', 'how quickly', 'how fast', 'how soon', 'lead time', 'timeline'],
      answer:
        'For a shortlisted Taiwanese supplier, typically two to three weeks including scheduling and preparation. Indian site visits are coordinated through our Bengaluru office. We prepare a briefing pack beforehand and provide interpretation on the day.',
      followUps: ['Do you do supplier sourcing?', 'Where are your offices?'],
    },
    {
      id: 'certified-translation',
      keywords: ['certified', 'notaris', 'notariz', 'sworn', 'official translation', 'attested'],
      answer:
        'We produce technical translations for regulatory documentation. Where a submission requires certification or notarisation, we coordinate that separately — tell us the receiving authority and we will confirm what is needed.',
      followUps: ['Tell me about translation', 'Ask us directly'],
    },
    {
      id: 'law-firm',
      keywords: ['law firm', 'lawyer', 'legal advice', 'attorney', 'accountant', 'financial advice', 'investment advice', 'licensed'],
      answer:
        'No. We provide advisory, coordination, sourcing and localisation services. We are not attorneys, not certified public accountants, and not a securities investment consulting enterprise. Where a matter requires those, we coordinate with appropriately qualified professionals and will tell you when that is necessary.',
      link: { href: '/disclaimer', label: 'Read the disclaimer' },
      followUps: ['Who owns the IP?', 'How do you charge?'],
    },
    {
      id: 'outside-markets',
      keywords: ['outside', 'other countries', 'europe', 'japan', 'vietnam', 'elsewhere', 'only taiwan', 'other market'],
      answer:
        'Seven markets: Taiwan, India, South Korea, the United States, Germany, Singapore and Australia. Each has a partner who lives there, and every engagement runs to the same model from the Taiwan head office. Ask about anywhere else and we will tell you honestly whether we can help.',
      link: { href: '/where-we-work', label: 'Global markets' },
      followUps: ['Where are your offices?', 'Ask us directly'],
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'phone', 'call', 'reach you', 'whatsapp', 'speak to', 'talk to', 'get in touch'],
      answer:
        'Email hello@harinexglobal.com, or call and WhatsApp +886 974 025 045. You can also send an enquiry through the contact form and we aim to reply to qualified enquiries within two working days.',
      link: { href: '/lets-connect', label: 'Contact page' },
      followUps: ['Where are your offices?', 'How do you charge?'],
    },
    {
      id: 'greeting',
      keywords: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'greetings'],
      answer:
        'Hello. Ask me about our services, industries, offices, fees or how we handle confidentiality, and I will answer from what is published on this site.',
      followUps: ['What services do you offer?', 'Where are your offices?'],
    },
    {
      id: 'thanks',
      keywords: ['thank', 'thanks', 'cheers', 'appreciate'],
      answer:
        'You are welcome. If you would like a person to pick this up, the contact form reaches us directly.',
      link: { href: '/lets-connect', label: 'Contact us' },
    },
  ],
};

/* ------------------------------------------------------------------ */

const zh: ChatPack = {
  ui: {
    launcher: '線上諮詢',
    title: 'Hari AI',
    subtitle: '瀚瑞國際智能助理',
    greeting: '您好。我可以回答關於本公司服務、產業領域、據點與合作方式的問題。請問您想了解什麼？',
    placeholder: '請輸入您的問題…',
    send: '送出',
    close: '關閉對話',
    reset: '重新開始',
    suggestionsLabel: '您可以問',
    fallback:
      '就本網站現有資料，我無法給您可靠的答覆；與其臆測，我寧可據實告知。請直接將問題傳給我們，將由專人回覆。',
    disclaimer: '自動客服。僅供一般性參考，不構成法律、稅務或法規意見。',
    contactCta: '直接詢問我們',
    typing: '輸入中…',
  },

  starters: ['你們提供哪些服務？', '據點在哪裡？', '會簽保密協議嗎？', '如何收費？', '有服務我的產業嗎？'],

  intents: [
    {
      id: 'services',
      keywords: ['服務', '業務', '能做什麼', '提供什麼', '項目', '能力'],
      answer:
        '我們提供八大服務：技術移轉與商品化、商務顧問與跨境媒合、策略性供應商採購、技術翻譯與在地化、網站與 AI 數位解決方案、法規協調、商務考察團支援，以及國際專案管理。每一項均可單獨委託，也可整合運用。',
      link: { href: '/what-we-do', label: '查看所有服務' },
      followUps: ['技術移轉是什麼？', '你們做供應商採購嗎？', '如何收費？'],
    },
    {
      id: 'technology-transfer',
      keywords: ['技術移轉', '授權', '技轉', '商品化', '技術轉移'],
      answer:
        '我們負責發掘、評估並建構跨市場的技術移轉，包括不含雙酚的紡織化學品、生技智財、試量產放大與共同開發協議。技術實地查核由化學專業人員執行，因此技術是依據數據被評估，而非依據簡報。',
      link: { href: '/what-we-do/technology-transfer', label: '技術移轉' },
      followUps: ['智慧財產權歸誰？', '會簽保密協議嗎？'],
    },
    {
      id: 'sourcing',
      keywords: ['採購', '供應商', '製造商', '工廠', '訪廠', '稽核', '找工廠'],
      answer:
        '我們負責篩選候選工廠、依貴公司技術規格進行評估、實地訪廠、評估品質系統並支援談判。我們的報酬來自評估工作本身，而非促成特定供應商，因此沒有讓不合格工廠過關的誘因。',
      link: { href: '/what-we-do/supplier-sourcing', label: '供應商採購' },
      followUps: ['供應商沒通過怎麼辦？', '安排訪廠要多久？'],
    },
    {
      id: 'translation',
      keywords: ['翻譯', '在地化', '中文', '語言', '口譯', '專利翻譯', '文件'],
      answer:
        '提供繁體中文與英文互譯，專為誤譯即等同法規事件的文件而設——專利、SOP 與 GMP 紀錄、臨床試驗計畫書、安全資料表與契約。由具實驗室與法規背景的人員處理，並於作業前與貴公司確認術語對照表。',
      link: { href: '/what-we-do/technical-translation', label: '技術翻譯' },
      followUps: ['可以做認證翻譯嗎？', '如何收費？'],
    },
    {
      id: 'regulatory',
      keywords: ['法規', 'tfda', 'cdsco', 'iso', 'reach', 'zdhc', '合規', '送件', 'cmc', '登記', '查驗登記'],
      answer:
        '我們就 TFDA、CDSCO、ISO 13485、REACH 與 ZDHC 提供文件與合規協調支援，包括 CMC 章節與技術文件。須說明的是：上述指涉係描述我們提供支援的領域，而非本公司持有之認證；法規結果由主管機關認定，非由本公司決定。',
      link: { href: '/what-we-do/regulatory', label: '法規協調' },
      followUps: ['可以做認證翻譯嗎？', '你們是律師事務所嗎？'],
    },
    {
      id: 'industries',
      keywords: ['產業', '領域', '行業', '製藥', '生技', '半導體', '電子', '化學', '醫材', '紡織'],
      answer:
        '七大產業領域：無雙酚（BPA/BPS-Free）技術、特用化學與先進材料、生技與生命科學及製藥、醫療器材與無塵室自動化、電子與半導體材料、永續科技與再生能源，以及研究機構與大學。',
      link: { href: '/what-we-do/industries', label: '查看產業領域' },
      followUps: ['你們提供哪些服務？', '據點在哪裡？'],
    },
    {
      id: 'offices',
      keywords: ['據點', '辦公室', '地址', '在哪', '位置', '分公司', '台灣', '印度', '韓國', '美國'],
      answer:
        '總部位於台灣台北都會區，登記地址為桃園市龜山區文化七路 10 號 3 樓（龜山區屬大台北都會區，距台北車站約 30 分鐘）。印度班加羅爾設有分公司，並在南韓、美國、德國、新加坡與澳洲派駐業務開發夥伴。',
      link: { href: '/where-we-work', label: '全球市場' },
      followUps: ['團隊有哪些人？', '直接詢問我們'],
    },
    {
      id: 'team',
      keywords: ['團隊', '成員', '人員', '創辦人', '總經理', '負責人', '顧問', '合夥人'],
      answer:
        '經營團隊分布於台灣與印度——施佳玲擔任創辦人暨董事長、Dr. Sivarasan Ganesan 擔任集團執行長暨管理合夥人、甘納緒博士擔任首席顧問、馬士軒負責台灣營運，另有印度分公司總經理與專案管理主管。全球團隊代表南韓、北美、德國、新加坡與澳洲，另有材料與高分子領域的技術專家。',
      link: { href: '/who-we-are/team', label: '認識團隊' },
      followUps: ['據點在哪裡？', '你們提供哪些服務？'],
    },
    {
      id: 'nda',
      keywords: ['保密', 'nda', '機密', '保密協議', '不揭露'],
      answer:
        '會，而且我們主動建議這麼做。在您分享任何技術細節之前，我們可以簽署貴公司的保密協議或提供互簽版本；在協議完成之前，不會與任何第三方討論技術內容。請勿在簽署前透過網站表單傳送機密資料。',
      followUps: ['智慧財產權歸誰？', '直接詢問我們'],
    },
    {
      id: 'ip',
      keywords: ['智慧財產', '智財', '專利權', '所有權', '歸屬', '權利'],
      answer:
        '除非協議另有約定，否則歸屬於授權方。我們的角色是在簽署之前，把所有權、使用範圍、地域與改良技術的權利明確界定清楚。文件實際撰擬則與具資格的智財律師協同進行——本公司並非律師事務所。',
      followUps: ['你們是律師事務所嗎？', '技術移轉是什麼？'],
    },
    {
      id: 'pricing',
      keywords: ['!收費', '!費用', '!價格', '!報價', '!多少錢', '預算', '!計費'],
      answer:
        '顧問工作依明確範疇報價，採固定費用；採購與技術移轉專案採里程碑計費；持續性支援為月費制。每一項委任都會在開始前提供書面報價，範疇變動亦另行報價，不會直接出現在帳單上。我們不公布價目表，因為五頁式形象網站與多幣別電商並無可比性。',
      link: { href: '/lets-connect', label: '索取報價' },
      followUps: ['你們提供哪些服務？', '直接詢問我們'],
    },
    {
      id: 'supplier-fails',
      keywords: ['沒通過', '不合格', '未通過', '評估失敗'],
      answer:
        '我們會據實告知並提供評估佐證，接著評估下一個候選對象。由於報酬來自評估工作本身而非促成特定供應商，我們沒有讓不合格工廠過關的誘因。',
      followUps: ['你們做供應商採購嗎？', '安排訪廠要多久？'],
    },
    {
      id: 'factory-visit',
      keywords: ['訪廠要多久', '多快', '多久', '時程', '安排訪廠'],
      answer:
        '已列入候選名單的台灣供應商，通常兩到三週內可完成安排與前置準備。印度的實地拜訪由班加羅爾據點協調。我們會事先準備行前簡報資料，並於當日提供口譯。',
      followUps: ['你們做供應商採購嗎？', '據點在哪裡？'],
    },
    {
      id: 'certified-translation',
      keywords: ['認證翻譯', '公證', '認證', 'official'],
      answer:
        '我們提供法規文件的技術翻譯。若送件需要認證或公證，我們會另行協調；請告知受理機關，我們會確認所需文件。',
      followUps: ['翻譯服務內容？', '直接詢問我們'],
    },
    {
      id: 'law-firm',
      keywords: ['律師', '法律意見', '會計師', '投資建議', '持照'],
      answer:
        '不是。我們提供顧問、協調、採購與在地化服務。本公司並非律師、並非會計師，亦非證券投資顧問事業。若事項需要上述服務，我們會與具備適當資格的專業人士協同辦理，並於必要時主動告知。',
      link: { href: '/disclaimer', label: '閱讀免責聲明' },
      followUps: ['智慧財產權歸誰？', '如何收費？'],
    },
    {
      id: 'outside-markets',
      keywords: ['其他國家', '歐洲', '日本', '越南', '別的市場', '只有台灣'],
      answer:
        '共七個市場：台灣、印度、南韓、美國、德國、新加坡與澳洲。每個市場都有常駐當地的夥伴，所有委任皆由台灣總部依同一套模式執行。若是其他地區，請直接詢問，我們會據實告知能否協助。',
      link: { href: '/where-we-work', label: '全球市場' },
      followUps: ['據點在哪裡？', '直接詢問我們'],
    },
    {
      id: 'contact',
      keywords: ['聯絡', '電子郵件', '電話', 'email', 'whatsapp', '怎麼聯繫', '找誰'],
      answer:
        '電子郵件 hello@harinexglobal.com，電話與 WhatsApp 皆為 +886 974 025 045。您也可以透過聯絡表單送出諮詢，我們力求於兩個工作天內回覆有效諮詢。',
      link: { href: '/lets-connect', label: '聯絡我們' },
      followUps: ['據點在哪裡？', '如何收費？'],
    },
    {
      id: 'greeting',
      keywords: ['你好', '您好', '哈囉', '嗨', '早安', '午安'],
      answer:
        '您好。您可以詢問本公司的服務、產業領域、據點、收費方式或保密作法，我會依本網站所公布的內容回覆。',
      followUps: ['你們提供哪些服務？', '據點在哪裡？'],
    },
    {
      id: 'thanks',
      keywords: ['謝謝', '感謝', '多謝'],
      answer: '不客氣。若希望由專人接手處理，聯絡表單會直接送達我們。',
      link: { href: '/lets-connect', label: '聯絡我們' },
    },
  ],
};

export const chatPacks: Record<Lang, ChatPack> = { en, zh };

/**
 * Scores each intent by how many of its keywords appear in the question, with
 * longer keyword matches weighted higher so "technology transfer" beats a
 * stray "transfer".
 *
 * A keyword prefixed with "!" is decisive and scores triple. This exists
 * because subject words otherwise drown out the actual question: "how much
 * does supplier sourcing cost" contains both "supplier" and "sourcing", which
 * together outweighed "cost" and returned the sourcing answer to someone who
 * asked about price.
 *
 * Returns null below the threshold so the caller shows the fallback rather
 * than a confidently wrong match.
 */
export function matchIntent(question: string, lang: Lang): ChatIntent | null {
  const q = question.toLowerCase().trim();
  if (!q) return null;

  let best: { intent: ChatIntent; score: number } | null = null;

  for (const intent of chatPacks[lang].intents) {
    let score = 0;
    for (const raw of intent.keywords) {
      const decisive = raw.startsWith('!');
      const kw = decisive ? raw.slice(1) : raw;
      if (q.includes(kw)) score += kw.length * (decisive ? 3 : 1);
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  // A single very short accidental match is not enough to answer on.
  return best && best.score >= 3 ? best.intent : null;
}
