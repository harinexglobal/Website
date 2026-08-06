/**
 * Reorients the two India-specific insight articles to Taiwan → global.
 *
 * Both were written when India was positioned as the core corridor. The
 * arguments in them generalise almost entirely — the verification problem, the
 * three deal structures, the failure modes are the same wherever the
 * counterparty sits — so this widens the framing rather than discarding the
 * substance.
 *
 * Slugs change. Nothing breaks: these articles were written but never deployed
 * (Netlify has been credit-blocked since), so no live URL points at the old
 * ones.
 *
 * As before: no market statistics, growth figures or rankings. The firm cannot
 * substantiate them and its buyers check.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'lib/insights.ts';
const BOUNDARY = 'const zh: InsightsDict';

/** Replace the whole `{ ... }` article object carrying this id. */
function replaceArticle(src, id, replacement, from = 0) {
  const idAt = src.indexOf(`id: '${id}'`, from);
  if (idAt < 0) throw new Error(`article ${id} not found`);
  const start = src.lastIndexOf('    {\n', idAt);

  // Walk braces from the opening one to find this object's end.
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i += 1) {
    if (src[i] === '{') depth += 1;
    else if (src[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = src.indexOf('\n', i) + 1; // consume the trailing comma line
        break;
      }
    }
  }
  if (end < 0) throw new Error(`unbalanced braces in ${id}`);
  return src.slice(0, start) + replacement + src.slice(end);
}

/* ------------------------------------------------------------------ */

const OUTWARD_EN = `    {
      id: 'why-taiwanese-companies-should-look-outward',
      category: 'Market entry',
      title: 'Why Taiwanese companies should look outward',
      excerpt:
        'The commercial logic behind exporting capability, and the operational realities that decide whether an entry works.',
      minutes: 6,
      date: '2026-08-06',
      intro:
        'Most Taiwanese manufacturers we speak to have already concluded that they need a market beyond Taiwan. What they have not concluded is which one, or what to do about it. The gap between those two positions is where entries succeed or quietly stall, and it is rarely closed by another market report.',
      sections: [
        {
          h: 'The complementarity is structural, not fashionable',
          p: [
            'Taiwan is dense in process capability: precision manufacturing, materials, semiconductor and electronics supply chains, and an engineering workforce accustomed to tight tolerances and audit-ready documentation. What it is not dense in is domestic demand or low-cost volume production.',
            'The markets worth entering have the inverse profile, though they invert it differently. India and Southeast Asia have volume, expanding manufacturing and substantial domestic demand, but often lack access to the specific process technology that would move a plant up the value chain. Germany and the wider EU have the opposite pull: compliance requirements that create demand for chemistry and materials that meet them. Australia and North America bring research depth and regulated-market access.',
            'That is a genuine fit rather than a slogan. A Taiwanese firm with a proven process and no volume outlet, and a counterparty with demand and no process, are solving each other\\'s problem. The difficulty is never the logic. It is the execution.',
          ],
        },
        {
          h: 'What actually blocks entry',
          p: [
            'In our experience the obstacle is almost never opportunity. It is that neither side can efficiently verify the other. A Taiwanese supplier cannot easily tell which of twenty enquiries represents a serious counterparty with the capital and plant to execute. A foreign manufacturer cannot easily tell whether a licensing offer is a mature process or a laboratory result dressed up.',
            'Both then default to caution, which looks like slow email, requests for more documentation, and a deal that never quite reaches a term sheet. Nobody says no. The project simply loses momentum, and eighteen months later the file is closed.',
            'This is a verification problem, and it is solvable — but not by correspondence. It is solved by someone technically competent visiting both sites and reporting honestly on what they found.',
          ],
        },
        {
          h: 'Three structures worth considering',
          p: [
            'Licensing is the lowest-commitment route. The Taiwanese party licenses a defined process to a manufacturer in the target market, with a technology transfer package, training and a royalty. It preserves capital and tests the market, but it puts the outcome in someone else\\'s hands and requires the transfer package to be genuinely complete.',
            'A joint venture aligns incentives more tightly and gives more control over quality, but it is materially harder to structure, exit and govern. It should not be the default simply because it feels safer than licensing — often it is not.',
            'Supply into the market — exporting product or components rather than technology — is the most conservative option and frequently the right first step. It generates real market data, real customer relationships and real distribution learning before any technology leaves the building.',
          ],
        },
        {
          h: 'What to verify before committing',
          p: [
            'Whether the counterparty has actually operated a comparable process, rather than intending to. Ask what equipment is installed today and ask to see it running.',
            'Whether their quality system is real. Certification is a starting point, not evidence. Batch records, deviation handling and how they responded to their last customer complaint tell you far more.',
            'Whether the regulatory pathway for your product is understood by someone on their side, and whether the timeline they have quoted resembles the timeline the authority actually works to.',
            'Whether your intellectual property position survives the arrangement — field of use, territory, improvements, and what happens if the relationship ends.',
          ],
        },
        {
          h: 'The most common failure mode',
          p: [
            'Treating a technology transfer as a documentation exercise. A specification and a drawing package do not constitute a transfer. Process knowledge that lives in the heads of the people who run the line — why a parameter is held where it is, what the failure looks like when it drifts — has to move too, and that means people travelling in both directions.',
            'Transfers that budget for documents but not for time fail at pilot scale, and by then both parties have spent enough to be reluctant to admit it.',
          ],
        },
      ],
      takeaway:
        'The opportunity is real and the logic is sound. What decides the outcome is whether both parties can verify each other quickly enough to keep momentum — which is a fieldwork problem, not a research problem.',
    },
`;

const TRADE_EN = `    {
      id: 'taiwan-global-trade-opportunities',
      category: 'Trade',
      title: 'Taiwan–global trade opportunities',
      excerpt:
        'Where Taiwan\\'s industrial strengths meet genuine demand in the markets we cover.',
      minutes: 5,
      date: '2026-08-06',
      intro:
        'Not every market where Taiwan is active represents an opportunity. The openings worth pursuing are where Taiwan holds capability the other side needs and cannot readily build, and where the commercial structure to exploit it is available.',
      sections: [
        {
          h: 'Specialty and performance chemicals',
          p: [
            'Taiwanese formulators hold process knowledge in textile auxiliaries, functional finishes and performance additives. Mills and converters across Asia face tightening restricted-substance requirements from international brands, and European buyers face them as regulation rather than preference. Both create demand for compliant chemistry rather than merely cheaper chemistry.',
            'This is one of the clearer opportunities we see: the requirement is externally imposed and dated, which concentrates minds on both sides.',
          ],
        },
        {
          h: 'Pharmaceutical inputs and contract development',
          p: [
            'Taiwan has strong analytical and development capability alongside a research base. India has substantial capacity in active ingredients and formulation; Australia and North America bring regulated-market access and clinical depth.',
            'The traffic runs both ways — foreign capacity serving Taiwanese development programmes, and Taiwanese process work supporting manufacturers moving into more complex molecules.',
          ],
        },
        {
          h: 'Electronics and materials for manufacturing scale-up',
          p: [
            'As electronics manufacturing expands across India and Southeast Asia, demand grows for the materials, precision components and process equipment that Taiwan\\'s supply base has spent decades refining. This is less about finished goods than about the inputs and tooling that make local assembly viable.',
          ],
        },
        {
          h: 'Machinery, automation and cleanroom equipment',
          p: [
            'Taiwanese machine builders occupy a useful position between the cheapest and most expensive options, with the service depth to support a plant through commissioning. For manufacturers upgrading capability rather than buying at the lowest price, this is often the practical fit — and it travels well into any market with an industrial base to upgrade.',
          ],
        },
        {
          h: 'Research collaboration and technology scouting',
          p: [
            'Germany and the wider EU run funded research programmes with real appetite for industrial partners, and Australian and North American institutions carry life-sciences depth. For a Taiwanese firm, the value is less in the funding than in access to a validated technology before it is broadly licensed.',
          ],
        },
        {
          h: 'The barriers that persist',
          p: [
            'Distance and unfamiliarity, which raise the perceived risk of any first transaction. Regulatory divergence, which means a product cleared in one market is not thereby cleared in another. Payment and contract enforcement concerns, which are usually manageable but rarely discussed early enough.',
            'And language — not conversational English, which is widely available, but technical and contractual precision, where a mistranslated specification becomes a rejected shipment.',
          ],
        },
        {
          h: 'Testing a hypothesis cheaply',
          p: [
            'Before committing to a structure, run a small transaction. A trial order, a paid technical evaluation, a joint booth at a trade event. It surfaces the operational realities — customs, documentation, response times, how the counterparty behaves when something goes wrong — at a fraction of the cost of discovering them inside a joint venture.',
          ],
        },
      ],
      takeaway:
        'The strongest openings are where compliance or capability requirements force a decision, rather than where a price advantage merely exists. Test with a small transaction before structuring a large one.',
    },
`;

const OUTWARD_ZH = `    {
      id: 'why-taiwanese-companies-should-look-outward',
      category: '市場進入',
      title: '台灣企業為何應該向外布局',
      excerpt: '輸出自身能力背後的商業邏輯，以及決定市場進入成敗的營運現實。',
      minutes: 6,
      date: '2026-08-06',
      intro:
        '與我們往來的台灣製造業者，多半早已認定必須經營台灣以外的市場；他們尚未決定的，是要進入哪一個、以及該怎麼做。這兩者之間的落差，正是市場進入成功或悄然停滯的關鍵，而這道落差極少能靠再多一份市場報告來弭平。',
      sections: [
        {
          h: '互補性是結構性的，而非一時風潮',
          p: [
            '台灣的優勢密集於製程能力：精密製造、材料、半導體與電子供應鏈，以及一支習慣嚴格公差與可供稽核文件的工程人力。台灣不密集的，是內需規模與低成本量產。',
            '值得進入的市場條件正好相反，但相反的方式各有不同。印度與東南亞握有產量、持續擴張的製造業與可觀內需，卻往往缺乏能讓工廠往價值鏈上游移動的特定製程技術。德國與整個歐盟則是另一種拉力：法規要求創造出對合規化學品與材料的需求。澳洲與北美則帶來研究深度與受管制市場的進入管道。',
            '這是真實的互補，而非口號。一家擁有成熟製程卻缺乏出海口的台灣企業，與一個握有需求卻缺乏製程的對象，正好解決彼此的問題。困難從來不在邏輯，而在執行。',
          ],
        },
        {
          h: '真正卡住市場進入的是什麼',
          p: [
            '依我們的經驗，障礙幾乎從來不是機會不足，而是雙方都無法有效查證對方。台灣供應商難以分辨二十封詢價中，哪一封來自真正具備資金與廠房執行能力的對象；海外製造商也難以判斷一項授權提案究竟是成熟製程，還是包裝過的實驗室成果。',
            '於是雙方都退回謹慎，表現出來就是往返緩慢的郵件、不斷追加的文件要求，以及一樁始終走不到條件書的交易。沒有人說不，專案只是逐漸失去動能；十八個月後，檔案默默結案。',
            '這是一個查證問題，而且是可以解決的——但不是靠書信往返，而是靠具備技術判斷力的人親赴兩地，並據實回報所見。',
          ],
        },
        {
          h: '三種值得考慮的架構',
          p: [
            '技術授權是承諾最輕的路徑。台方將特定製程授權給目標市場的製造商，並提供技術移轉包、訓練與權利金。它保留資本、也能測試市場，但成敗掌握在他人手中，且要求技術移轉包必須真正完整。',
            '合資能讓雙方誘因更一致，對品質的掌控也更高，但在架構設計、退場與治理上都困難得多。不該僅因為「感覺比授權安全」就預設採用合資——實情往往並非如此。',
            '對該市場供貨——輸出產品或零組件而非技術——是最保守的選項，也經常是正確的第一步。它能在任何技術離開公司之前，先取得真實的市場數據、客戶關係與通路經驗。',
          ],
        },
        {
          h: '在承諾之前必須查證的事',
          p: [
            '對方是否真正執行過類似製程，而不只是「打算」。請詢問目前實際安裝了哪些設備，並要求實地看到運轉狀況。',
            '其品質系統是否真實運作。證書只是起點，而非佐證；批次紀錄、偏差處理，以及他們如何回應最近一次客訴，能告訴您的遠比證書更多。',
            '貴公司產品的法規路徑，對方是否有人真正理解，以及他們所提的時程，是否與主管機關實際的作業時程相符。',
            '在該安排下，貴公司的智慧財產地位是否仍然穩固——使用範圍、地域、改良技術歸屬，以及合作結束時的處理方式。',
          ],
        },
        {
          h: '最常見的失敗模式',
          p: [
            '把技術移轉當成文件作業。一份規格加上一套圖面並不構成移轉。真正存在於產線人員腦中的製程知識——為什麼某個參數要控制在該區間、參數漂移時故障長什麼樣子——同樣必須移動，而那意味著人員要雙向往返。',
            '只編列文件預算、卻不編列時間預算的移轉，會在試量產階段失敗；而到那時，雙方投入都已足夠多，多到不願承認。',
          ],
        },
      ],
      takeaway:
        '機會是真實的，邏輯也站得住腳。真正決定結果的，是雙方能否夠快地互相查證以維持動能——這是實地作業的問題，不是研究的問題。',
    },
`;

const TRADE_ZH = `    {
      id: 'taiwan-global-trade-opportunities',
      category: '貿易',
      title: '台灣與全球的貿易機會',
      excerpt: '台灣的產業優勢，在我們所涵蓋的市場中與真實需求交會之處。',
      minutes: 5,
      date: '2026-08-06',
      intro:
        '並非每個台灣活躍其中的市場都代表機會。真正值得投入的切口，是台灣握有對方需要、且短期內難以自建的能力，同時具備可資運用的商業架構。',
      sections: [
        {
          h: '特用與機能性化學品',
          p: [
            '台灣配方業者在紡織助劑、機能性後整理與性能添加劑上握有製程知識。亞洲各地的紡織廠與加工廠正面對國際品牌日益嚴格的限用物質要求，歐洲買方則是以法規而非偏好的形式面對同樣要求。兩者都創造出對「合規化學品」而非僅是「更便宜化學品」的需求。',
            '這是我們所見較明確的機會之一：需求由外部強制、且訂有期限，這使雙方都必須認真面對。',
          ],
        },
        {
          h: '製藥原料與委託開發',
          p: [
            '台灣在分析與開發能力及研究基礎上具優勢。印度在原料藥與製劑上具備可觀產能；澳洲與北美則帶來受管制市場的進入管道與臨床深度。',
            '流動是雙向的——海外產能服務台灣的開發專案，台灣的製程開發則支援各地廠商切入更複雜的分子。',
          ],
        },
        {
          h: '支持製造放大的電子與材料',
          p: [
            '隨著印度與東南亞的電子製造擴張，對台灣供應鏈數十年來精進的材料、精密零組件與製程設備需求隨之成長。重點不在成品，而在使在地組裝得以成立的原料與治具。',
          ],
        },
        {
          h: '機械、自動化與無塵室設備',
          p: [
            '台灣機械業者位於「最便宜」與「最昂貴」之間的實用區間，並具備支援工廠走完試車階段的服務深度。對於追求能力升級而非最低價格的製造商而言，這通常是務實的選擇——而且能順利延伸到任何具備產業基礎、有意升級的市場。',
          ],
        },
        {
          h: '研究合作與技術發掘',
          p: [
            '德國與整個歐盟推動有資金挹注的研究計畫，且確實有意尋找產業夥伴；澳洲與北美的機構則具備生命科學的深度。對台灣企業而言，價值與其說在於資金，不如說在於能在技術被廣泛授權之前先取得經驗證的成果。',
          ],
        },
        {
          h: '仍然存在的障礙',
          p: [
            '距離與不熟悉，這會提高任何第一筆交易的風險認知。法規分歧——在一個市場取得許可，並不因此在另一個市場取得許可。付款與契約執行的疑慮，通常可以管理，但很少被夠早提出討論。',
            '還有語言——不是日常英語（普及程度已高），而是技術與契約層面的精確度；一份誤譯的規格，會變成一批被退的貨。',
          ],
        },
        {
          h: '用低成本驗證假設',
          p: [
            '在投入特定架構之前，先跑一筆小額交易：一張試單、一次付費技術評估、一個聯合展位。這能以合資架構內部發現同樣問題的一小部分成本，先行揭露實際的營運現實——通關、文件、回應速度，以及出狀況時對方的行為模式。',
          ],
        },
      ],
      takeaway:
        '最強的切入點，出現在合規或能力要求迫使對方必須做決定之處，而非僅僅存在價格優勢之處。在架構一筆大交易之前，先用一筆小交易驗證。',
    },
`;

let src = readFileSync(FILE, 'utf8');

// English half first — replacing changes offsets, so re-find the boundary each time.
src = replaceArticle(src, 'why-taiwanese-companies-should-explore-india', OUTWARD_EN);
src = replaceArticle(src, 'taiwan-india-trade-opportunities', TRADE_EN);

const zhAt = src.indexOf(BOUNDARY);
src = replaceArticle(src, 'why-taiwanese-companies-should-explore-india', OUTWARD_ZH, zhAt);
src = replaceArticle(src, 'taiwan-india-trade-opportunities', TRADE_ZH, src.indexOf(BOUNDARY));

writeFileSync(FILE, src);
console.log('insights: both articles reoriented in both languages');

/* The cards mirrored in content.ts. */
const C = 'lib/content.ts';
let c = readFileSync(C, 'utf8');
const cardEdits = [
  [`{ id: 'taiwan-india', category: 'Market entry', title: 'Why Taiwanese companies should explore India', excerpt: 'The commercial logic behind the corridor, and the operational realities that decide whether an entry works.' }`,
   `{ id: 'taiwan-outward', category: 'Market entry', title: 'Why Taiwanese companies should look outward', excerpt: 'The commercial logic behind exporting capability, and the operational realities that decide whether an entry works.' }`],
  [`{ id: 'trade-opportunities', category: 'Trade', title: 'Taiwan–India trade opportunities', excerpt: 'Where the complementary strengths of the two economies create genuine openings.' }`,
   `{ id: 'trade-opportunities', category: 'Trade', title: 'Taiwan–global trade opportunities', excerpt: "Where Taiwan's industrial strengths meet genuine demand in the markets we cover." }`],
  [`{ id: 'taiwan-india', category: '市場進入', title: '台灣企業為何應該布局印度', excerpt: '這條走廊背後的商業邏輯，以及決定市場進入成敗的營運現實。' }`,
   `{ id: 'taiwan-outward', category: '市場進入', title: '台灣企業為何應該向外布局', excerpt: '輸出自身能力背後的商業邏輯，以及決定市場進入成敗的營運現實。' }`],
];
let n = 0;
for (const [a, b] of cardEdits) {
  if (c.includes(a)) {
    c = c.replace(a, b);
    n += 1;
  } else {
    console.warn(`  content.ts MISS -> ${a.slice(0, 60)}...`);
  }
}
writeFileSync(C, c);
console.log(`content.ts cards: ${n}/${cardEdits.length}`);
