/**
 * Privacy Policy, Terms of Use and Disclaimer.
 *
 * Kept separate from content.ts because these are long, change on their own
 * schedule, and are the only copy on the site with legal consequence.
 *
 * IMPORTANT: these are drafts prepared to describe what this website actually
 * does — the contact form fields, the language preference in localStorage, the
 * hosting arrangement. They are not a substitute for review by a qualified
 * lawyer in Taiwan before the company relies on them. See README.md.
 */

import type { Lang } from './content';

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

const en = {
  updatedLabel: 'Last updated',
  updated: '3 August 2026',
  backToHome: 'Back to home',
  contactLine: 'Questions about this page? Write to',

  privacy: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what personal data HariNex Global Co., Ltd. collects through this website, why we collect it, and what rights you have over it. We have written it to describe what the site actually does rather than to cover every theoretical possibility.',
    sections: [
      {
        h: 'Who we are',
        p: [
          'HariNex Global Co., Ltd. (瀚瑞國際股份有限公司) is the data controller for personal data collected through this website. Our registered office is at 3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004, Taiwan (R.O.C.)',
          'You can reach us at harinexglobal@gmail.com for any question about this policy or about data we hold.',
        ],
      },
      {
        h: 'What we collect',
        p: [
          'When you submit an enquiry through this website, we collect the information you choose to enter: your name, email address, company name, region, the service areas you select, your project description, and — if you provide it — your telephone number.',
          'Our short enquiry forms on individual service pages collect only your name, email address and message, together with a record of which service page the enquiry came from.',
          'Our hosting provider automatically records standard technical information for every request, such as IP address, browser type and the pages requested. This is used to operate and secure the site.',
          'We do not collect special category data, and you should not send us sensitive personal information through the website forms.',
        ],
      },
      {
        h: 'Cookies and local storage',
        p: [
          'This website does not use advertising or tracking cookies, and it does not run third-party analytics.',
          'We store one item in your browser’s local storage: your choice of language (English or 繁體中文), saved under the key "harinex.lang". This exists solely so the site remembers your preference between pages. It contains no identifier and is not transmitted to us. You can clear it at any time through your browser settings.',
        ],
      },
      {
        h: 'Why we use your data and on what basis',
        p: [
          'We use enquiry data to respond to you, to assess whether we can help, and to carry out any engagement you subsequently ask us to perform. Where you have asked us to contact you, we rely on your consent and on our legitimate interest in responding to business enquiries.',
          'We use technical data to keep the website available and secure, relying on our legitimate interest in operating it safely.',
          'We do not use your data for automated decision-making or profiling, and we do not send marketing to people who have not asked for it.',
        ],
      },
      {
        h: 'Who we share it with',
        p: [
          'We share personal data only where it is necessary: with our hosting provider, which stores and serves this website; with an email delivery provider, where one is configured, so that enquiries reach us; and with professional advisers or regulatory experts where an engagement requires it and you have asked us to involve them.',
          'We do not sell personal data, and we do not share it with advertisers or data brokers.',
        ],
      },
      {
        h: 'International transfers',
        p: [
          'We are based in Taiwan and work with representatives in India, South Korea and the United States. Our hosting provider operates a global content delivery network, so data may be processed in countries outside your own.',
          'Where personal data is transferred internationally, we take reasonable steps to ensure it remains protected to a standard consistent with this policy.',
        ],
      },
      {
        h: 'How long we keep it',
        p: [
          'We keep enquiry correspondence for as long as needed to deal with your enquiry and any resulting engagement, and afterwards for as long as we have a legitimate business or legal reason to do so.',
          'If you ask us to delete your enquiry and we have no continuing obligation to retain it, we will.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'Under Taiwan’s Personal Data Protection Act you may ask us to confirm what personal data we hold about you, to give you a copy, to correct or supplement it, to stop collecting, processing or using it, and to delete it.',
          'If you are in a jurisdiction with additional rights — for example the EU or the United Kingdom — you may also have the right to object to processing, to restrict it, to data portability, and to complain to your local supervisory authority.',
          'To exercise any of these, write to harinexglobal@gmail.com. We will respond within the period required by applicable law.',
        ],
      },
      {
        h: 'Security',
        p: [
          'This website is served over HTTPS, and enquiry submissions are validated on our server before being processed. We restrict access to enquiry data to the people who need it.',
          'No transmission over the internet is entirely secure. Please do not send confidential technical information through the website forms — ask us for a non-disclosure agreement first, which we are glad to sign before any technical disclosure.',
        ],
      },
      {
        h: 'Children',
        p: [
          'This website is directed at businesses and is not intended for children. We do not knowingly collect personal data from children.',
        ],
      },
      {
        h: 'Changes to this policy',
        p: [
          'We may update this policy as the website or our practices change. The date at the top of this page shows when it was last revised.',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms of Use',
    intro:
      'These terms govern your use of this website. By using the site you accept them. They do not govern any advisory engagement you may enter into with us — that will be covered by a separate written agreement.',
    sections: [
      {
        h: 'Who these terms are with',
        p: [
          'This website is operated by HariNex Global Co., Ltd. (瀚瑞國際股份有限公司), a company registered in Taiwan with its office at 3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004, Taiwan (R.O.C.)',
        ],
      },
      {
        h: 'Using this website',
        p: [
          'You may view, download and print material from this site for your own business evaluation. You may not republish it commercially, present it as your own, use it to train an automated system, or attempt to interfere with the operation or security of the site.',
          'You may not use the enquiry forms to send unsolicited advertising, unlawful content, or material that infringes someone else’s rights.',
        ],
      },
      {
        h: 'Intellectual property',
        p: [
          'The content, design, wording, structure and code of this website belong to HariNex Global Co., Ltd. or to our licensors, and are protected by copyright and other rights.',
          'Company names, product names and trade marks referred to on this site belong to their respective owners. Mentioning them does not imply any endorsement, affiliation or partnership unless we say so explicitly.',
        ],
      },
      {
        h: 'No advice and no professional relationship',
        p: [
          'Everything on this website is general information about the services we offer. It is not advice, and it is not a recommendation to take or refrain from any particular course of action.',
          'Reading this site, submitting an enquiry, or receiving a reply does not create an advisory, consulting or professional relationship between us. That relationship begins only when we have both signed a written engagement agreement setting out scope and fees.',
        ],
      },
      {
        h: 'Enquiries and confidentiality',
        p: [
          'Information you send through the enquiry forms is not treated as confidential until a non-disclosure agreement is in place. We are glad to sign one — and prefer to — before you share any technical detail. Please ask before disclosing anything you would not want read without protection.',
        ],
      },
      {
        h: 'Availability',
        p: [
          'We aim to keep this website available, but we do not guarantee that it will be uninterrupted or error-free. We may change, suspend or withdraw any part of it without notice.',
        ],
      },
      {
        h: 'Links to other sites',
        p: [
          'Where we link to a third-party website, we do so for convenience. We do not control those sites and are not responsible for their content, accuracy or privacy practices.',
        ],
      },
      {
        h: 'Limitation of liability',
        p: [
          'To the fullest extent permitted by law, we are not liable for any loss of profit, business, contracts, goodwill, data or anticipated savings arising from your use of, or reliance on, this website.',
          'Nothing in these terms limits liability that cannot lawfully be limited, including liability for fraud or for death or personal injury caused by negligence.',
        ],
      },
      {
        h: 'Governing law',
        p: [
          'These terms are governed by the laws of the Republic of China (Taiwan). The Taoyuan District Court shall be the court of first instance for any dispute arising from them, without prejudice to any mandatory consumer protection rights you may have where you live.',
        ],
      },
      {
        h: 'Changes to these terms',
        p: [
          'We may revise these terms from time to time. The version published on this page at the time you use the site is the version that applies.',
        ],
      },
    ],
  },

  disclaimer: {
    title: 'Disclaimer',
    intro:
      'This page sets out the limits of what this website tells you, and what we are and are not. We would rather be plain about this in advance than have it come up later.',
    sections: [
      {
        h: 'General information only',
        p: [
          'The material on this website describes the services HariNex Global Co., Ltd. offers and the sectors we work in. It is general in nature and is not tailored to any particular company, technology, transaction or jurisdiction.',
          'You should not act on anything you read here without obtaining advice appropriate to your own circumstances.',
        ],
      },
      {
        h: 'We are not a law firm or a licensed financial adviser',
        p: [
          'We provide advisory, coordination, sourcing and localisation services. We do not provide legal, tax, accounting, investment or securities advice, and nothing on this site should be read as such.',
          'Where a matter requires those services, we coordinate with appropriately qualified and licensed professionals, and we will tell you when that is necessary.',
        ],
      },
      {
        h: 'Regulatory references',
        p: [
          'This website refers to regulatory frameworks and standards including TFDA, CDSCO, ISO 13485, REACH and ZDHC. These references describe areas in which we coordinate documentation and compliance support.',
          'They are not claims that HariNex Global holds any certification, accreditation, registration or approval under those frameworks, and they are not an assurance that any submission will be accepted. Regulatory outcomes are determined by the relevant authority, not by us.',
        ],
      },
      {
        h: 'No guarantee of outcome',
        p: [
          'Cross-border technology transfer, sourcing and market entry depend on many factors outside our control, including the conduct of counterparties, market conditions and regulatory decisions.',
          'We do not guarantee that a partner will be found, that a transfer will complete, that a supplier will perform, or that any commercial result will be achieved. Descriptions of our process explain how we work, not what will happen.',
        ],
      },
      {
        h: 'Third-party information',
        p: [
          'Where we refer to third-party organisations, technologies, statistics or publications, we do so in good faith but we do not warrant that the information is accurate, complete or current.',
          'Naming a company, standard, trade show or institution does not imply any partnership, endorsement or agency relationship unless stated explicitly.',
        ],
      },
      {
        h: 'Forward-looking statements',
        p: [
          'Statements about our plans — including offices, representatives or capabilities described as developing or forthcoming — reflect current intentions. They are not commitments and may change.',
        ],
      },
      {
        h: 'Accuracy and updates',
        p: [
          'We take reasonable care to keep this website accurate, but content may become out of date. We are under no obligation to update it, and we accept no liability for any loss arising from reliance on information that has changed.',
        ],
      },
    ],
  },
} as const;

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T extends string
      ? string
      : T;

export type LegalDict = DeepMutable<typeof en>;

const zh: LegalDict = {
  updatedLabel: '最後更新',
  updated: '2026 年 8 月 3 日',
  backToHome: '返回首頁',
  contactLine: '對本頁內容有疑問嗎？請來信',

  privacy: {
    title: '隱私權政策',
    intro:
      '本政策說明瀚瑞國際股份有限公司透過本網站蒐集哪些個人資料、蒐集目的，以及您就這些資料享有的權利。我們以本網站實際的運作方式撰寫本政策，而非涵蓋所有理論上的可能性。',
    sections: [
      {
        h: '我們是誰',
        p: [
          '瀚瑞國際股份有限公司（HariNex Global Co., Ltd.）為透過本網站所蒐集個人資料之管理者，登記營業處所為333004 台灣 桃園市龜山區文化七路10號3樓。',
          '如對本政策或我們所持有的資料有任何疑問，可透過 harinexglobal@gmail.com 與我們聯繫。',
        ],
      },
      {
        h: '我們蒐集哪些資料',
        p: [
          '當您透過本網站送出諮詢時，我們會蒐集您所填寫的資訊：姓名、電子郵件地址、公司名稱、所在地區、您所勾選的服務項目、專案說明，以及（若您提供）聯絡電話。',
          '各服務頁面上的簡易諮詢表單僅蒐集您的姓名、電子郵件與訊息內容，並記錄該諮詢來自哪一個服務頁面。',
          '我們的主機服務供應商會自動記錄每次請求的標準技術資訊，例如 IP 位址、瀏覽器類型與所請求的頁面，用於維運與確保網站安全。',
          '我們不蒐集特種個人資料；請勿透過本網站表單傳送敏感個人資訊。',
        ],
      },
      {
        h: 'Cookie 與本機儲存',
        p: [
          '本網站不使用廣告或追蹤用 Cookie，亦未安裝第三方分析工具。',
          '我們僅在您瀏覽器的本機儲存空間存放一項資料：您選擇的語言（English 或繁體中文），鍵名為「harinex.lang」。其唯一用途是讓網站在頁面之間記住您的偏好；其中不含任何識別碼，也不會傳送給我們。您可隨時透過瀏覽器設定清除。',
        ],
      },
      {
        h: '利用目的與法律依據',
        p: [
          '我們利用諮詢資料回覆您、評估我們能否提供協助，並執行您後續委任我們辦理的事項。在您要求我們與您聯繫的情形下，我們依據您的同意，以及回覆商務諮詢之正當利益進行處理。',
          '技術資料用於維持網站可用性與安全性，依據為安全營運網站之正當利益。',
          '我們不將您的資料用於自動化決策或側寫，亦不會向未主動要求者發送行銷訊息。',
        ],
      },
      {
        h: '資料分享對象',
        p: [
          '我們僅在必要範圍內分享個人資料：提供本網站儲存與傳輸服務的主機供應商；在已設定的情況下，用以將諮詢送達我們的電子郵件服務供應商；以及在委任事項有需要且經您要求時，協同辦理的專業顧問或法規專家。',
          '我們不販售個人資料，亦不會提供給廣告商或資料仲介。',
        ],
      },
      {
        h: '國際傳輸',
        p: [
          '我們設立於台灣，並在印度、南韓與美國設有代表。我們的主機供應商採用全球內容傳遞網路，因此資料可能於您所在國家以外的地區處理。',
          '個人資料涉及跨國傳輸時，我們會採取合理措施，確保其保護程度與本政策一致。',
        ],
      },
      {
        h: '保存期間',
        p: [
          '諮詢往來紀錄將保存至處理您的諮詢及後續委任所需之期間；其後在我們仍具正當商業或法律理由的期間內繼續保存。',
          '若您要求刪除諮詢資料，且我們無繼續保存之義務，我們將予以刪除。',
        ],
      },
      {
        h: '您的權利',
        p: [
          '依據台灣個人資料保護法，您得向我們請求查詢或閱覽您的個人資料、請求提供複製本、請求補充或更正、請求停止蒐集處理或利用，以及請求刪除。',
          '若您所在地區另賦予其他權利（例如歐盟或英國），您可能另享有反對處理、限制處理、資料可攜，以及向當地監管機關申訴之權利。',
          '欲行使上述任一權利，請來信 harinexglobal@gmail.com。我們將於適用法律所定期間內回覆。',
        ],
      },
      {
        h: '資料安全',
        p: [
          '本網站以 HTTPS 傳輸，諮詢內容於處理前會先在伺服器端完成驗證。我們將諮詢資料的存取權限限於必要人員。',
          '網際網路傳輸無法保證絕對安全。請勿透過本網站表單傳送機密技術資訊；請先向我們索取保密協議，我們樂於在任何技術揭露之前完成簽署。',
        ],
      },
      {
        h: '兒童',
        p: ['本網站以企業為對象，並非針對兒童設計。我們不會在知情的情況下蒐集兒童的個人資料。'],
      },
      {
        h: '政策變更',
        p: ['我們可能隨網站或作業方式調整而更新本政策。本頁上方日期即為最近一次修訂日期。'],
      },
    ],
  },

  terms: {
    title: '使用條款',
    intro:
      '本條款規範您對本網站的使用。使用本網站即表示您接受本條款。本條款不規範您與我們之間可能成立的顧問委任關係，該關係將另以書面協議約定。',
    sections: [
      {
        h: '契約相對人',
        p: ['本網站由瀚瑞國際股份有限公司（HariNex Global Co., Ltd.）營運，該公司登記於台灣，營業處所為333004 台灣 桃園市龜山區文化七路10號3樓。'],
      },
      {
        h: '網站使用',
        p: [
          '您可為自身商務評估之目的瀏覽、下載並列印本網站資料。您不得將其用於商業再發布、宣稱為自身著作、用以訓練自動化系統，或試圖干擾本網站之運作或安全性。',
          '您不得利用諮詢表單傳送未經請求之廣告、違法內容，或侵害他人權利之素材。',
        ],
      },
      {
        h: '智慧財產權',
        p: [
          '本網站之內容、設計、文字、架構與程式碼，均屬瀚瑞國際股份有限公司或其授權人所有，並受著作權及其他權利保護。',
          '本網站所提及之公司名稱、產品名稱與商標均屬其各自所有人。除非我們明確說明，否則提及並不表示任何背書、關聯或合作關係。',
        ],
      },
      {
        h: '非屬建議，亦不成立專業關係',
        p: [
          '本網站所有內容均為關於我們服務項目的一般性資訊，並非建議，亦非採取或不採取特定行動之推薦。',
          '瀏覽本網站、送出諮詢或收到回覆，均不構成您與我們之間的顧問、諮詢或專業關係。該關係僅於雙方簽署載明服務範疇與費用之書面委任協議時始行成立。',
        ],
      },
      {
        h: '諮詢與保密',
        p: [
          '在保密協議完成之前，您透過諮詢表單傳送的資訊不被視為機密資訊。我們樂於——且建議——在您分享任何技術細節之前完成簽署。若某項資訊您不希望在無保護的情況下被閱讀，請先與我們確認。',
        ],
      },
      {
        h: '服務可用性',
        p: ['我們致力維持本網站的可用性，但不保證其不中斷或無錯誤。我們得於未經通知的情況下變更、暫停或撤除其任何部分。'],
      },
      {
        h: '外部連結',
        p: ['本網站連結至第三方網站僅為便利之用。我們無法控制該等網站，對其內容、正確性或隱私作法不負責任。'],
      },
      {
        h: '責任限制',
        p: [
          '在法律允許的最大範圍內，就您使用本網站或信賴其內容所生之利潤、業務、契約、商譽、資料或預期節省之損失，我們不負賠償責任。',
          '本條款不限制依法不得限制之責任，包括詐欺，或因過失致人死亡或身體傷害之責任。',
        ],
      },
      {
        h: '準據法',
        p: [
          '本條款以中華民國（台灣）法律為準據法。因本條款所生之爭議，以台灣桃園地方法院為第一審管轄法院；但不影響您依所在地強行規定所享有之消費者保護權利。',
        ],
      },
      {
        h: '條款變更',
        p: ['我們得不定期修訂本條款。您使用本網站時，本頁所公布之版本即為適用之版本。'],
      },
    ],
  },

  disclaimer: {
    title: '免責聲明',
    intro:
      '本頁說明本網站所提供資訊的界限，以及我們是什麼、不是什麼。我們寧可事先把話講清楚，也不願日後才產生爭議。',
    sections: [
      {
        h: '僅供一般性參考',
        p: [
          '本網站內容說明瀚瑞國際股份有限公司所提供的服務及所涉產業，屬一般性質，並非針對任何特定公司、技術、交易或法域所量身撰寫。',
          '在未取得符合您自身情況之專業意見前，請勿逕依本網站內容採取行動。',
        ],
      },
      {
        h: '我們並非律師事務所或持照財務顧問',
        p: [
          '我們提供顧問、協調、採購與在地化服務，不提供法律、稅務、會計、投資或證券意見；本網站任何內容均不得被解讀為上述意見。',
          '若事項需要上述服務，我們會與具備適當資格及執照的專業人士協同辦理，並於必要時主動告知。',
        ],
      },
      {
        h: '法規相關指涉',
        p: [
          '本網站提及 TFDA、CDSCO、ISO 13485、REACH 與 ZDHC 等法規架構與標準，該等指涉係描述我們提供文件與合規協調支援的領域。',
          '此並非主張瀚瑞國際持有上述架構下之任何認證、認可、登錄或核准，亦非保證任何送件必獲受理。法規結果由主管機關認定，非由本公司決定。',
        ],
      },
      {
        h: '不保證成果',
        p: [
          '跨境技術移轉、採購與市場進入受制於諸多我們無法控制的因素，包括交易對象之行為、市場情勢與主管機關之決定。',
          '我們不保證必能找到合作夥伴、技術移轉必然完成、供應商必然履約，或必然達成任何商業成果。流程說明係描述我們的作業方式，而非結果之承諾。',
        ],
      },
      {
        h: '第三方資訊',
        p: [
          '本網站提及第三方組織、技術、統計數據或出版品時，均係本於善意，但不擔保該等資訊之正確性、完整性或即時性。',
          '除非明確載明，否則提及任何公司、標準、展覽或機構，並不表示存在任何合作、背書或代理關係。',
        ],
      },
      {
        h: '前瞻性陳述',
        p: ['關於我們規劃之陳述——包括描述為籌備中或即將設立之據點、代表或服務能力——反映目前意向，並非承諾，且可能變更。'],
      },
      {
        h: '正確性與更新',
        p: [
          '我們以合理注意維持本網站內容正確，惟內容仍可能過時。我們無更新之義務，且對因信賴已變更之資訊所生之任何損失不負責任。',
        ],
      },
    ],
  },
};

export const legalDictionaries: Record<Lang, LegalDict> = {
  en: en as unknown as LegalDict,
  zh,
};

export type LegalDocKey = 'privacy' | 'terms' | 'disclaimer';
