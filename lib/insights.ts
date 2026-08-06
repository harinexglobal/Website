/**
 * Insight articles.
 *
 * Kept separate from content.ts for the same reason as legal.ts — long, and
 * revised on its own schedule.
 *
 * Written from practice rather than research: process knowledge about how
 * transfers, sourcing and market entry actually go wrong. Deliberately no
 * numeric market statistics, growth figures or rankings — the firm cannot
 * substantiate them, and a buyer doing technical due diligence will check.
 * Qualitative claims about the two economies only.
 */

import type { Lang } from './content';

const en = {
  meta: {
    readingTime: 'min read',
    published: 'Published',
    backToAll: 'All insights',
    relatedHeading: 'More insights',
    takeawayHeading: 'The short version',
    ctaHeading: 'Working on something like this?',
    ctaBody:
      'If this is close to a problem you are facing, describe it in a couple of sentences and we will tell you plainly whether we can help.',
  },

  articles: [
    /* ------------------------------------------------------------------ */
    {
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
            'That is a genuine fit rather than a slogan. A Taiwanese firm with a proven process and no volume outlet, and a counterparty with demand and no process, are solving each other\'s problem. The difficulty is never the logic. It is the execution.',
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
            'Licensing is the lowest-commitment route. The Taiwanese party licenses a defined process to a manufacturer in the target market, with a technology transfer package, training and a royalty. It preserves capital and tests the market, but it puts the outcome in someone else\'s hands and requires the transfer package to be genuinely complete.',
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

    /* ------------------------------------------------------------------ */
    {
      id: 'technology-transfer-best-practices',
      category: 'Technology transfer',
      title: 'Technology transfer best practices',
      excerpt:
        'What separates a transfer that reaches production from one that stalls at pilot scale.',
      minutes: 7,
      date: '2026-08-05',
      intro:
        'A technology transfer is not a document handover. It is the reconstruction of a working process inside an organisation that has never run it, using different equipment, different raw material sources and different people. Treating it as a shipping exercise is the single most reliable way to fail.',
      sections: [
        {
          h: 'Define the transfer package before you negotiate the fee',
          p: [
            'Most disputes we see trace back to an agreement that priced a transfer without defining it. The package should be listed explicitly: process description, parameter ranges and their justification, raw material specifications with acceptable suppliers, analytical methods with validation data, equipment requirements, safety and handling documentation, and troubleshooting guidance for known failure modes.',
            'If the licensor cannot produce that list, the technology is less mature than it is being presented as. That is a finding worth having before money changes hands, not after.',
          ],
        },
        {
          h: 'Parameter ranges matter more than set points',
          p: [
            'A recipe states that a reaction runs at 80°C. A transferable process states that it runs between 78 and 84°C, that below 76°C conversion falls away, that above 88°C a specific impurity forms, and how that impurity is detected.',
            'The receiving site has different heat transfer characteristics, different agitation and different thermal lag. Without the ranges and the reasons behind them, their first deviation becomes a crisis instead of an adjustment.',
          ],
        },
        {
          h: 'Pilot before you scale, and define acceptance in advance',
          p: [
            'Run the process at the receiving site at reduced scale with the licensor present, and agree beforehand what constitutes success — yield, purity, cycle time, and how many consecutive batches must meet it.',
            'Agreeing acceptance criteria after a disappointing batch is a negotiation. Agreeing them beforehand is engineering. The difference in cost is considerable.',
          ],
        },
        {
          h: 'People carry what documents cannot',
          p: [
            'The most valuable content of any transfer is undocumented: the operator who knows the vessel needs an extra ten minutes in humid weather, the chemist who recognises a colour change that precedes a bad batch.',
            'Budget for engineers from the receiving site to spend time at the origin plant, and for the licensor\'s people to be present during the first production campaigns. Transfers that skip this to save travel cost routinely spend the saving several times over in failed batches.',
          ],
        },
        {
          h: 'Raw materials are the most underestimated variable',
          p: [
            'A process qualified on one supplier\'s input will often behave differently on another\'s, even where both meet the written specification. Trace impurity profiles, particle size distribution and moisture content vary in ways specifications do not always capture.',
            'Either qualify the receiving site\'s local supply during the transfer, or plan to import the original input until local qualification is complete. Discovering this after commercial launch is expensive and damages confidence on both sides.',
          ],
        },
        {
          h: 'Structure payments around milestones, not calendar dates',
          p: [
            'Tie payments to demonstrated outcomes — successful pilot batches, acceptance criteria met at scale, regulatory milestone achieved. It keeps both parties invested in the technical result rather than the schedule, and it surfaces problems while they are still cheap to fix.',
          ],
        },
      ],
      takeaway:
        'Transfers fail at pilot scale for predictable reasons: an incomplete package, set points without ranges, unqualified raw materials, and no budget for people to travel. All four are cheaper to prevent than to diagnose.',
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'supplier-qualification-checklist',
      category: 'Sourcing',
      title: 'Supplier qualification checklist',
      excerpt:
        'The structured evaluation we run before recommending any manufacturing partner.',
      minutes: 6,
      date: '2026-08-05',
      intro:
        'Finding a supplier is easy. Qualifying one is not. A quotation tells you what a company is willing to promise; it tells you nothing about whether they can deliver it repeatedly. This is the sequence we work through, and roughly what it costs in time.',
      sections: [
        {
          h: 'Stage one — desk review',
          p: [
            'Company registration and how long the entity has actually traded under its current name. Shareholding and whether the operating company is the one you would contract with. Certifications, with expiry dates and the scope statement, which is frequently narrower than the certificate implies.',
            'Financial standing to whatever extent the jurisdiction discloses it. A supplier that cannot fund raw material for your order is a schedule risk regardless of technical competence.',
            'This stage removes a surprising proportion of candidates and costs almost nothing.',
          ],
        },
        {
          h: 'Stage two — technical questionnaire',
          p: [
            'Installed equipment with capacity and age. Which processes are performed in-house and which are subcontracted, because subcontracted steps are where traceability usually breaks. Analytical capability on site versus sent out.',
            'Ask for a process flow for a product similar to yours. A supplier who cannot produce one quickly is telling you something about how the plant is actually run.',
          ],
        },
        {
          h: 'Stage three — the site visit',
          p: [
            'This is not optional, and it is not a tour. Look at the housekeeping in areas nobody prepared for you. Look at whether calibration labels are current. Look at whether the batch records being written now match the format you were shown.',
            'Talk to a line supervisor rather than only the sales manager. Ask what went wrong most recently and what they changed. A plant that can answer that specifically is a plant with a functioning quality culture; one that claims nothing goes wrong is either not measuring or not telling you.',
            'Check storage of incoming materials and finished goods. It is one of the fastest reads on whether a quality system is lived or laminated.',
          ],
        },
        {
          h: 'Stage four — samples, then a trial order',
          p: [
            'Sample material is made under supervision by the best operator on the best day. It establishes capability, not consistency. A paid trial order at meaningful volume, run through normal scheduling, establishes consistency.',
            'Specify how the trial will be judged before it runs, and inspect against your specification rather than theirs.',
          ],
        },
        {
          h: 'Stage five — commercial and continuity',
          p: [
            'Payment terms, incoterms, lead time and what happens when they slip. Capacity headroom, because a supplier running at full capacity has no room for your growth or their own recovery from a problem.',
            'Single points of failure: one qualified operator, one piece of equipment with no backup, one upstream supplier for a critical input. Ask what their plan is when that fails, because eventually it does.',
          ],
        },
        {
          h: 'Red flags worth stopping for',
          p: [
            'Reluctance to permit an unannounced or minimally announced visit. Certificates that cannot be verified with the issuing body. A quotation materially below the market with no explainable structural reason. Unwillingness to name any existing customer, even without disclosing volumes.',
            'None of these is proof of a problem. All of them justify slowing down.',
          ],
        },
      ],
      takeaway:
        'Qualification is a sequence, not a judgement call. Most unsuitable suppliers are removed in the first two stages at almost no cost; the site visit is where the remaining ones are separated.',
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'doing-business-in-taiwan',
      category: 'Market entry',
      title: 'Doing business in Taiwan',
      excerpt:
        'Company structures, regulatory posture and the cultural conventions that matter in practice.',
      minutes: 6,
      date: '2026-08-05',
      intro:
        'Taiwan is a straightforward place to do business by regional standards, but the details of how a foreign company establishes itself have practical consequences that are easier to get right at the start than to correct later.',
      sections: [
        {
          h: 'Three ways to be present',
          p: [
            'A representative office is the lightest footprint. It can conduct liaison, market research and procurement support, but it cannot conduct profit-making business. It suits an early presence while you assess the market.',
            'A branch of a foreign company can trade, and profits are attributed to the parent. It is often simpler to establish than a subsidiary and is frequently the right structure for a trading or service operation.',
            'A limited company or company limited by shares is a separate Taiwanese legal person. It gives the cleanest liability separation and the most credibility with local counterparties, which matters more than it should when a buyer is deciding whether you will still be here in three years.',
          ],
        },
        {
          h: 'The responsible person is a real obligation',
          p: [
            'Taiwanese entities require a designated responsible person, who carries genuine legal duties rather than a nominal title. This is not a formality to be assigned casually to whoever is available.',
            'Choose someone who is actually present in Taiwan, who understands what they are accepting, and who will still be in the role next year. Changing it later is administratively possible but disruptive.',
          ],
        },
        {
          h: 'Invoicing runs on the government uniform invoice',
          p: [
            'Taiwan operates a government uniform invoice system, and your accounting has to accommodate it from day one. It is not equivalent to issuing your own invoices and reconciling later.',
            'Budget for local bookkeeping support rather than assuming your existing finance function can absorb it remotely. This is one of the more common sources of early friction for foreign entrants.',
          ],
        },
        {
          h: 'Regulated sectors have their own gate',
          p: [
            'Pharmaceuticals, medical devices, food and cosmetics fall under TFDA oversight, and chemical substances carry their own registration and restricted-substance requirements. Company registration says nothing about product registration; they are separate exercises on separate timelines.',
            'Plan the product pathway in parallel with the corporate one. Entrants who complete incorporation and then discover the registration timeline lose a great deal of momentum.',
          ],
        },
        {
          h: 'Conventions that matter more than they appear to',
          p: [
            'Business here is relationship-led and reputation-sensitive. A referral from a known counterparty opens doors that cold approaches do not, and the market is small enough that behaviour is remembered.',
            'Meetings tend to be preparatory rather than decisive; the decision is usually made afterwards, internally. Do not read the absence of a commitment in the room as a lack of interest.',
            'Punctuality, prepared materials and a bilingual one-page summary are disproportionately effective. So is having documentation available in Traditional Chinese — not because English is not understood, but because it signals that you intend to stay.',
          ],
        },
      ],
      takeaway:
        'Get the entity type and the responsible person right at the start, plan product registration in parallel with incorporation, and assume relationships take a quarter longer to form and last considerably longer once formed.',
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'taiwan-global-trade-opportunities',
      category: 'Trade',
      title: 'Taiwan–global trade opportunities',
      excerpt:
        'Where Taiwan\'s industrial strengths meet genuine demand in the markets we cover.',
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
            'As electronics manufacturing expands across India and Southeast Asia, demand grows for the materials, precision components and process equipment that Taiwan\'s supply base has spent decades refining. This is less about finished goods than about the inputs and tooling that make local assembly viable.',
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

    /* ------------------------------------------------------------------ */
    {
      id: 'website-localisation-for-international-companies',
      category: 'Localisation',
      title: 'Website localisation for international companies',
      excerpt:
        'Why literal translation fails, and what a properly localised bilingual presence requires.',
      minutes: 6,
      date: '2026-08-05',
      intro:
        'A translated website and a localised one are different products. The first converts words; the second makes a company legible to a buyer who did not grow up with its assumptions. For technical and regulated businesses the gap between them is commercially significant.',
      sections: [
        {
          h: 'What literal translation breaks',
          p: [
            'Marketing copy translated word-for-word reads as foreign at best and unserious at worst. Claims that are ordinary in one market — superlatives, guarantees, comparative statements — can be unfamiliar or regulated in another.',
            'Technical terminology is where the real damage occurs. A term rendered inconsistently across a product page, a datasheet and a regulatory submission creates doubt about whether the company understands its own product. In a regulated sector that doubt is expensive.',
          ],
        },
        {
          h: 'Terminology governance comes first',
          p: [
            'Agree a glossary before translation starts: product names, process terms, regulatory vocabulary, and anything that will appear in both marketing and technical documentation. Fix the decisions there and apply them everywhere.',
            'Where a term genuinely has no clean equivalent, that should be flagged and decided deliberately, not resolved silently by whoever is translating that page. The wrong choice, applied consistently, is still wrong.',
          ],
        },
        {
          h: 'Traditional and Simplified are not interchangeable',
          p: [
            'Traditional Chinese for Taiwan and Hong Kong, Simplified for mainland China. Beyond the characters, vocabulary and technical conventions differ, and converting one to the other mechanically produces text that reads as though it was aimed at somewhere else.',
            'For a company positioning itself in Taiwan, publishing converted Simplified text undercuts precisely the local commitment the site is meant to demonstrate.',
          ],
        },
        {
          h: 'The layout has to survive the language',
          p: [
            'Chinese text typically occupies less horizontal space than English, while German or Tamil may occupy considerably more. Navigation built to fit one language wraps, truncates or overflows in another.',
            'Line height, font selection and character rendering all need attention — a font that looks correct in Latin script may render Chinese characters poorly or fall back to a system face that does not match the design.',
          ],
        },
        {
          h: 'Search behaves differently in each language',
          p: [
            'Buyers search in their own language using their own terminology, which is often not the direct translation of your English keywords. Keyword research has to be done natively rather than translated.',
            'Technically, the site needs correct language attributes so search engines and screen readers know what they are reading. A site that declares itself English while serving Chinese content is handicapping itself for no reason.',
          ],
        },
        {
          h: 'Decide who owns it after launch',
          p: [
            'Localisation is not a project that finishes. Every new page, product and announcement needs the same treatment, and the most common failure is a second language that is complete at launch and six months stale a year later.',
            'A half-maintained second language is worse than none: it signals that the market it addresses is not important enough to keep current.',
          ],
        },
      ],
      takeaway:
        'Fix terminology before translating, use Traditional Chinese for Taiwan rather than converted text, build layout that tolerates length changes, research keywords natively, and decide who maintains it before launch.',
    },
  ],
} as const;

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T extends string
      ? string
      : T;

export type InsightsDict = DeepMutable<typeof en>;
export type Article = InsightsDict['articles'][number];

const zh: InsightsDict = {
  meta: {
    readingTime: '分鐘閱讀',
    published: '發布日期',
    backToAll: '所有洞察',
    relatedHeading: '更多洞察',
    takeawayHeading: '重點摘要',
    ctaHeading: '您也正面對類似的課題嗎？',
    ctaBody: '若這與您正面臨的問題相近，請用一兩句話說明，我們會據實告訴您能否提供協助。',
  },

  articles: [
    {
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

    {
      id: 'technology-transfer-best-practices',
      category: '技術移轉',
      title: '技術移轉最佳實務',
      excerpt: '能推進到量產的技術移轉，與停滯在試量產階段者，差別何在。',
      minutes: 7,
      date: '2026-08-05',
      intro:
        '技術移轉不是文件交付，而是在一個從未執行過該製程的組織內，使用不同設備、不同原料來源與不同人員，重新建立一套可運作的製程。把它當成寄送作業，是最可靠的失敗方式。',
      sections: [
        {
          h: '先定義移轉包，再談費用',
          p: [
            '我們見到的多數爭議，都可回溯到一份「定了價卻沒定義內容」的協議。移轉包應逐項明列：製程說明、參數區間及其依據、原料規格與可接受供應商、分析方法及其確效資料、設備需求、安全與操作文件，以及已知故障模式的排除指引。',
            '若授權方無法提出這份清單，代表該技術的成熟度低於其呈現的程度。這是應該在付款之前、而非之後取得的發現。',
          ],
        },
        {
          h: '參數區間比設定點更重要',
          p: [
            '配方會寫「反應於 80°C 進行」；可移轉的製程則會寫明它在 78 至 84°C 之間運作、低於 76°C 轉化率會下降、高於 88°C 會生成特定雜質，以及該雜質如何被偵測。',
            '接收廠的熱傳特性、攪拌條件與熱滯後皆不相同。若缺少區間與其背後原因，他們第一次遇到偏差時，那會是一場危機，而不是一次調整。',
          ],
        },
        {
          h: '先試量產，並事先定義驗收標準',
          p: [
            '在授權方在場的情況下，於接收廠以縮小規模執行製程，並事先議定何謂成功——產率、純度、週期時間，以及需連續幾批達標。',
            '在一批不理想之後才談驗收標準，那是談判；事先議定，那是工程。兩者的成本差距相當可觀。',
          ],
        },
        {
          h: '文件承載不了的，由人承載',
          p: [
            '任何移轉中最有價值的內容都是未被文件化的：知道潮濕天氣下反應槽需要多留十分鐘的操作員、能認出壞批次前兆顏色變化的化學師。',
            '請編列預算，讓接收廠的工程師到原廠駐點，也讓授權方人員參與最初幾次量產。為了省下差旅而略過此環節的移轉，通常會在失敗批次上付出數倍代價。',
          ],
        },
        {
          h: '原料是最被低估的變數',
          p: [
            '以某一供應商原料完成確效的製程，換用另一家時往往表現不同，即使兩者都符合書面規格。微量雜質分布、粒徑分布與含水量的差異，並非規格書總能涵蓋。',
            '請在移轉期間即確效接收廠的在地供應，或規劃在在地確效完成前持續進口原始原料。在商業量產後才發現此事，代價高昂，並會損及雙方信心。',
          ],
        },
        {
          h: '付款依里程碑，而非日曆日期',
          p: [
            '將付款繫於已驗證的成果——試量產批次成功、量產階段達成驗收標準、法規里程碑完成。這能讓雙方持續聚焦於技術結果而非進度表，也能在問題仍便宜可修時將其浮現。',
          ],
        },
      ],
      takeaway:
        '技術移轉在試量產階段失敗，原因是可預測的：移轉包不完整、只有設定點沒有區間、原料未確效，以及沒有編列人員往返的預算。這四者的預防成本，都低於事後診斷。',
    },

    {
      id: 'supplier-qualification-checklist',
      category: '供應鏈',
      title: '供應商資格認定檢核表',
      excerpt: '在推薦任何製造夥伴之前，我們所執行的結構化評估流程。',
      minutes: 6,
      date: '2026-08-05',
      intro:
        '找到供應商很容易，完成資格認定則不然。報價告訴您一家公司願意承諾什麼，卻完全無法說明他們能否穩定重現。以下是我們實際執行的順序，以及各階段大致所需的時間成本。',
      sections: [
        {
          h: '第一階段——書面審查',
          p: [
            '公司登記資料，以及該法人以現有名稱實際營運了多久。股權結構，以及您將簽約的對象是否即為實際營運公司。各項證書，含有效期限與範圍聲明——後者的涵蓋範圍經常比證書表面看來狹窄。',
            '在該法域可揭露的範圍內查核財務狀況。一家無力墊付您訂單原料的供應商，無論技術能力如何，都是交期風險。',
            '此階段能篩除相當比例的候選對象，而成本幾近於零。',
          ],
        },
        {
          h: '第二階段——技術問卷',
          p: [
            '已安裝設備及其產能與機齡。哪些製程自製、哪些外包——外包工段正是可追溯性最常斷裂之處。廠內分析能力與外送檢測的分野。',
            '請對方提供一份與貴公司產品相近的製程流程圖。無法迅速提出者，等於在告訴您該廠實際的管理方式。',
          ],
        },
        {
          h: '第三階段——實地訪廠',
          p: [
            '這不是選配項目，也不是參觀行程。請觀察沒有人為您預先整理過的區域之整潔狀況；查看校驗標籤是否在效期內；確認此刻正在填寫的批次紀錄，格式是否與您先前被展示的一致。',
            '請與線上主管交談，而不只是業務經理。詢問最近一次出了什麼問題、他們改了什麼。能具體回答的工廠，代表品質文化確實在運作；宣稱從未出過問題的，若非沒有在量測，就是沒有告訴您。',
            '檢查進料與成品的儲存狀況。這是判斷品質系統究竟是被實踐還是被護貝的最快指標之一。',
          ],
        },
        {
          h: '第四階段——樣品，然後試單',
          p: [
            '樣品是在監督下、由最好的操作員、在狀況最好的一天做出來的。它證明的是能力，而非一致性。以具意義的量、走正常排程的付費試單，證明的才是一致性。',
            '請在試單執行前就明定評判方式，並依貴公司規格而非對方規格進行檢驗。',
          ],
        },
        {
          h: '第五階段——商務條件與供應連續性',
          p: [
            '付款條件、貿易條件、交期，以及交期延誤時的處理方式。產能餘裕——一家滿載運轉的供應商，既無空間支應您的成長，也無空間從自身的問題中恢復。',
            '單點失效風險：只有一位合格操作員、只有一台無備援設備、關鍵原料只有一家上游供應商。請詢問這些失效時他們的因應計畫，因為終究會發生。',
          ],
        },
        {
          h: '值得停下來的警訊',
          p: [
            '不願接受未預告或僅極短預告的訪廠。無法向發證機構查證的證書。明顯低於市場行情、且無法以結構性原因解釋的報價。即使不揭露數量，也不願具名任何一家現有客戶。',
            '以上任何一項都不構成問題的證明，但每一項都足以構成放慢腳步的理由。',
          ],
        },
      ],
      takeaway:
        '資格認定是一套順序，而非一次判斷。多數不合適的供應商在前兩階段即以極低成本被篩除；實地訪廠，則是分辨其餘者的關鍵。',
    },

    {
      id: 'doing-business-in-taiwan',
      category: '市場進入',
      title: '在台灣經商',
      excerpt: '公司架構、法規態勢，以及實務上真正重要的文化慣例。',
      minutes: 6,
      date: '2026-08-05',
      intro:
        '以區域標準而言，台灣是相當容易經商的地方；但外國公司設立方式的細節，具有實質的後續影響——這些事在一開始做對，遠比日後修正容易。',
      sections: [
        {
          h: '三種在地存在方式',
          p: [
            '辦事處的據點規模最輕。它可從事聯絡、市場調查與採購支援，但不得從事營利業務。適合在評估市場期間先建立初步據點。',
            '外國公司分公司可以營業，盈餘歸屬母公司。設立程序通常比子公司單純，對貿易或服務型營運而言，往往是正確的架構。',
            '有限公司或股份有限公司則是獨立的台灣法人，能提供最清晰的責任區隔，以及在地交易對象最高的信任度——當買方在評估「三年後你們是否還在」時，這一點的重要性超乎其應有的程度。',
          ],
        },
        {
          h: '負責人是實質義務，不是頭銜',
          p: [
            '台灣法人須設置負責人，該職位承擔真實的法律義務，而非名義上的職稱。這不是可以隨意指派給「剛好有空的人」的形式要件。',
            '請選擇實際常駐台灣、清楚理解自身所承擔責任，且明年仍會在任的人選。日後變更雖然行政上可行，但過程具有干擾性。',
          ],
        },
        {
          h: '發票制度採統一發票',
          p: [
            '台灣採行政府統一發票制度，貴公司的會計作業必須自第一天起即配合此制度。它並不等同於自行開立發票、事後再行對帳。',
            '請編列在地記帳支援的預算，而非假設既有財務團隊能遠端吸收此工作。這是外商初期最常見的摩擦來源之一。',
          ],
        },
        {
          h: '受管制產業另有一道關卡',
          p: [
            '藥品、醫療器材、食品與化粧品受 TFDA 監理，化學物質另有登錄與限用物質規範。公司登記完全不代表產品登記——兩者是分開的作業，且時程各自獨立。',
            '請將產品法規路徑與公司設立平行規劃。先完成設立、才發現法規時程的進入者，會流失大量動能。',
          ],
        },
        {
          h: '看似細節、實則關鍵的慣例',
          p: [
            '此地商務以關係為導向，且對聲譽高度敏感。來自已知交易對象的引薦，能打開陌生開發打不開的門；而市場規模夠小，行為會被記住。',
            '會議多半是準備性質而非決策性質，決定通常在會後於內部作成。請勿將「當場沒有承諾」解讀為缺乏興趣。',
            '準時、備妥資料，以及一頁式雙語摘要，效果好得不成比例。備有繁體中文文件亦然——不是因為對方不懂英文，而是因為這傳達出您打算長期經營的訊號。',
          ],
        },
      ],
      takeaway:
        '一開始就把法人型態與負責人選對，將產品登記與公司設立平行規劃，並預期關係的建立會多花一季時間，但一旦建立則能維繫得長久得多。',
    },

    {
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

    {
      id: 'website-localisation-for-international-companies',
      category: '在地化',
      title: '國際企業的網站在地化',
      excerpt: '為何逐字翻譯必然失敗，以及真正到位的雙語形象需要什麼。',
      minutes: 6,
      date: '2026-08-05',
      intro:
        '翻譯過的網站與在地化的網站，是兩種不同的產品。前者轉換文字，後者則讓一家公司能被不熟悉其預設前提的買方所理解。對技術型與受管制的企業而言，兩者的落差具有實質商業意義。',
      sections: [
        {
          h: '逐字翻譯會破壞什麼',
          p: [
            '逐字翻譯的行銷文案，最好的情況是讀來像外來品，最壞則顯得不夠嚴肅。在某個市場屬於常態的宣稱——最高級用語、保證、比較性陳述——在另一個市場可能陌生，甚至受法規規範。',
            '真正的損害發生在技術術語。同一術語在產品頁、規格書與法規送件中譯法不一致，會讓人懷疑這家公司是否理解自己的產品。在受管制產業裡，這種懷疑代價高昂。',
          ],
        },
        {
          h: '術語治理必須擺在最前面',
          p: [
            '在翻譯開始前先議定術語對照表：產品名稱、製程用語、法規詞彙，以及任何會同時出現在行銷與技術文件中的字詞。在此定案，然後全站一致套用。',
            '若某個術語確實沒有精確對應，應予標示並審慎決定，而不是由當下負責該頁的譯者悄悄處理掉。一個錯誤的選擇，即使一致地套用，仍然是錯的。',
          ],
        },
        {
          h: '繁體與簡體不可互換',
          p: [
            '台灣與香港使用繁體中文，中國大陸使用簡體。除了字形之外，詞彙與技術慣例亦有差異；機械式轉換所產生的文字，讀來像是寫給別處看的。',
            '對於定位在台灣市場的公司而言，發布由簡體轉換而來的文字，恰恰削弱了網站原本要展現的在地承諾。',
          ],
        },
        {
          h: '版面必須撐得住語言變化',
          p: [
            '中文文字所佔的水平空間通常少於英文，而德文或坦米爾文可能多出不少。依單一語言排定的導覽列，換一種語言就會換行、截斷或溢出。',
            '行高、字體選擇與字符渲染都需要留意——在拉丁字母下看來正確的字體，可能無法妥善呈現中文字，或退回與設計不符的系統字體。',
          ],
        },
        {
          h: '搜尋行為因語言而異',
          p: [
            '買方會以自己的語言、用自己的術語搜尋，而那往往不是您英文關鍵字的直譯。關鍵字研究必須以原生語言進行，而非翻譯而來。',
            '技術上，網站需要正確的語言標記，讓搜尋引擎與螢幕閱讀器知道它們正在讀什麼。一個宣稱自己是英文、卻提供中文內容的網站，等於毫無理由地自我設限。',
          ],
        },
        {
          h: '上線後由誰維護，必須先決定',
          p: [
            '在地化不是會結束的專案。每一個新頁面、新產品與新公告都需要相同處理；最常見的失敗，是第二語言在上線時完整，一年後卻停留在六個月前。',
            '維護不良的第二語言比沒有更糟：它等於宣告那個市場不夠重要，不值得保持更新。',
          ],
        },
      ],
      takeaway:
        '先固定術語再翻譯、台灣使用繁體中文而非轉換文字、版面設計要能容納長度變化、以原生語言研究關鍵字，並在上線前決定由誰維護。',
    },
  ],
};

export const insightsDictionaries: Record<Lang, InsightsDict> = {
  en: en as unknown as InsightsDict,
  zh,
};
