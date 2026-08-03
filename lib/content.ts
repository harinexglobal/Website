/**
 * Single source of truth for every string on the site.
 *
 * `en` defines the shape; `zh` (繁體中文) must satisfy the same type, so the
 * compiler catches any key that is added to one language but not the other.
 *
 * Content is derived from the client's own material:
 *  - "website content.docx" (site structure, service list, vision/mission)
 *  - the leadership CVs (biographies, credentials)
 *  - the supplied homepage mockup (Images/1.png) for contact details + nav
 */

export type Lang = 'en' | 'zh';

/* ------------------------------------------------------------------ */
/*  ENGLISH — source of truth                                          */
/* ------------------------------------------------------------------ */

const en = {
  site: {
    name: 'HariNex Global',
    legalName: 'HariNex Global Co., Ltd.',
    legalNameAlt: '瀚瑞國際股份有限公司',
    tagline: 'Technology • Advisory • Global Commerce',
    shortTagline: 'Connecting Taiwan, India & Global Innovation',
    description:
      'Cross-border technology transfer, corporate trade advisory and specialised technical localisation between Taiwan, India and global markets.',
  },

  common: {
    requestConsultation: 'Request Consultation',
    getInTouch: 'Get in Touch',
    exploreCapabilities: 'Explore Capabilities',
    scheduleScouting: 'Schedule Technology Scouting',
    learnMore: 'Learn more',
    viewAll: 'View all',
    backToTop: 'Back to top',
    readArticle: 'Read article',
    ourServices: 'Our Services',
    contactUs: 'Contact Us',
    deliverables: 'Deliverables',
    focusAreas: 'Focus areas',
    langLabel: 'Language',
  },

  nav: {
    home: 'Home',
    about: 'About Us',
    capabilities: 'Capabilities',
    industries: 'Industries',
    bridge: 'Why Taiwan & India',
    insights: 'Insights',
    contact: 'Contact',
    capabilitiesIntro: 'Seven practices, delivered end to end across both markets.',
  },

  hero: {
    badge: 'Taiwan ↔ India Bilateral Gateway',
    title: 'Connecting Ideas. Building Partnerships. Commercialising Innovation.',
    titleLines: ['Connecting Ideas.', 'Building Partnerships.', 'Commercialising Innovation.'],
    subtitle:
      'The bilateral gateway for technology transfer, strategic sourcing, and industrial execution between Taiwan, India and global markets.',
    primaryCta: 'Explore Capabilities',
    secondaryCta: 'Schedule Technology Scouting',
    taipei: 'Taipei',
    india: 'India Desk',
  },

  stats: {
    heading: 'Where we operate',
    items: [
      {
        value: '10',
        suffix: '+',
        label: 'Target industrial sectors',
        detail: 'From specialty chemicals and biotech to semiconductors and green technology.',
      },
      {
        value: '2',
        suffix: '',
        label: 'Markets, one team',
        detail: 'A single accountable team operating across Taiwan and India.',
      },
      {
        value: '',
        suffix: '',
        label: 'Zero-bisphenol & green chemistry focus',
        detail: 'BPA/BPS-free auxiliaries and sustainable formulation technology.',
      },
      {
        value: '',
        suffix: '',
        label: 'End-to-end regulatory & localisation support',
        detail: 'Documentation, compliance coordination and technical translation in one scope.',
      },
    ],
  },

  about: {
    eyebrow: 'The Bilateral Bridge',
    heading: 'Taiwanese innovation, Indian opportunity — engineered into one working channel',
    lead: 'HariNex Global was established to close the gap between where advanced technology is developed and where it can be built at scale.',
    body: [
      'We are an international business and technology advisory firm helping organisations identify partners, evaluate technologies, coordinate projects and build collaborations that survive first contact with reality.',
      'What makes the channel work is technical fluency on both ends. Our technical evaluation is led by Dr. D. Ganesh Kumar, a Ph.D. medicinal chemist with more than a decade across drug development, CMC documentation and pilot-scale technology transfer. Taiwan operations, legal representation and government liaison sit with founder Chia-Ling Shih.',
      'We believe successful international business rests on three things: trust, technical understanding, and communication that survives translation. That is the whole of our method.',
    ],
    visionTitle: 'Our Vision',
    vision:
      'To become the leading Taiwan–India technology and business bridge for innovation, manufacturing and international collaboration.',
    missionTitle: 'Our Mission',
    mission:
      'To simplify cross-border business by providing trusted advisory services, technology partnerships, supplier networks and digital solutions that create long-term value.',
    bridgeOrigin: 'Taiwan',
    bridgeOriginRole: 'R&D, technology origin, precision manufacturing',
    bridgeDest: 'India',
    bridgeDestRole: 'Industrial scale-up, market entry, cost-competitive production',
    bridgeLabel: 'Technology Bridge',
    whyUs: {
      heading: 'Why organisations work with us',
      items: [
        { title: 'Technical expertise', body: 'Ph.D.-level scientific evaluation, not sales-led matchmaking.' },
        { title: 'International experience', body: 'Careers built across Taiwanese and Indian research and industry.' },
        { title: 'Taiwan local network', body: 'On-the-ground presence, language and legal representation in Taipei.' },
        { title: 'India business network', body: 'Direct access to Indian manufacturing and life-science ecosystems.' },
        { title: 'End-to-end project support', body: 'From first scouting call through to signed agreement and delivery.' },
        { title: 'Professional translation', body: 'Technical 繁體中文 ⇄ English handled by people who understand the science.' },
      ],
    },
  },

  capabilities: {
    eyebrow: 'Capabilities',
    heading: 'Seven practices, one accountable team',
    lead: 'Each capability stands alone. Together they cover the full arc from identifying a technology to executing it in a second market.',
    items: [
      {
        id: 'technology-transfer',
        icon: 'atom',
        title: 'Technology Transfer & Commercialisation',
        summary:
          'Moving proven technology from the lab bench into licensed, scaled industrial production.',
        description:
          'We scout, evaluate and structure the transfer of commercially viable technology between Taiwanese and Indian organisations. That includes non-bisphenol (BPA/BPS-free) textile chemical licensing, biotech intellectual property, pilot-plant scale-up protocols and joint development agreements. Technical due diligence is performed by chemists, so a technology is assessed on its data rather than its pitch deck.',
        deliverables: [
          'Technology scouting & landscape mapping',
          'Licensing structure and negotiation support',
          'Technical due diligence reports',
          'Research collaboration agreements',
          'Manufacturing transfer coordination',
          'Pilot project & scale-up coordination',
        ],
        tags: ['Licensing', 'IP', 'Pilot scale-up', 'JDA'],
      },
      {
        id: 'business-advisory',
        icon: 'handshake',
        title: 'Business Advisory & Cross-Border Matchmaking',
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
        tags: ['Market entry', 'JV', 'FDI', 'Due diligence'],
      },
      {
        id: 'supplier-sourcing',
        icon: 'factory',
        title: 'Strategic Supplier Sourcing',
        summary:
          'Qualified manufacturing partners across Taiwan and India, verified in person.',
        description:
          'Finding a supplier is easy; qualifying one is not. We identify candidate factories, run structured evaluations against your technical specification, visit sites, assess quality systems and support commercial negotiation. Particular depth in Taiwanese specialty machinery, cleanroom equipment, pharmaceutical inputs and automation systems.',
        deliverables: [
          'Factory identification & shortlisting',
          'Structured supplier evaluation',
          'On-site factory visits & audits',
          'Quality system assessment',
          'Negotiation & contracting support',
          'Ongoing supply relationship management',
        ],
        tags: ['Sourcing', 'Audits', 'Cleanroom', 'Automation'],
      },
      {
        id: 'technical-translation',
        icon: 'languages',
        title: 'Technical Translation & Localisation',
        summary:
          'Traditional Chinese ⇄ English for documents where a mistranslation is a compliance event.',
        description:
          'Most translation vendors can handle marketing copy. Very few can handle a patent claim, a GMP batch record or a chemical safety data sheet without introducing error. Our translation practice is run by scientists: the person rendering your SOP into 繁體中文 understands what the process actually does.',
        deliverables: [
          'Patents & intellectual property filings',
          'SOPs, GMP and batch documentation',
          'Clinical protocols & regulatory dossiers',
          'Safety data sheets (MSDS/SDS)',
          'Commercial contracts & agreements',
          'Website & product catalogue localisation',
          'Live business interpretation',
        ],
        tags: ['繁體中文 ⇄ EN', 'Patents', 'GMP', 'MSDS'],
      },
      {
        id: 'digital-solutions',
        icon: 'monitor',
        title: 'Website & AI Digital Solutions',
        summary:
          'The digital layer that makes a cross-border operation legible to its customers.',
        description:
          'Corporate and e-commerce websites, bilingual digital presence, workflow automation and cross-border project management systems. Built so that a company operating in two languages and two time zones does not need two separate sets of tooling.',
        deliverables: [
          'Corporate & e-commerce websites',
          'Bilingual digital presence (EN / 繁中)',
          'SEO & digital branding',
          'AI chatbots & customer automation',
          'Business process automation',
          'Cross-border project management systems',
        ],
        tags: ['Web', 'AI', 'Automation', 'SEO'],
      },
      {
        id: 'regulatory',
        icon: 'shield-check',
        title: 'Regulatory Coordination',
        summary:
          'Documentation, submission readiness and compliance coordination for regulated industries.',
        description:
          'We coordinate with qualified regulatory experts and help organise the documentation and communication that regulated projects depend on — CMC sections, technical files, compliance mapping and health-authority correspondence. Our General Manager has direct experience of IND-enabling documentation and Asia-Pacific regulatory strategy.',
        deliverables: [
          'TFDA & CDSCO submission coordination',
          'ISO 13485 documentation support',
          'REACH & ZDHC Level 3 chemical compliance',
          'CMC documentation & regulatory writing',
          'Technical file preparation',
          'Compliance gap assessment',
        ],
        tags: ['TFDA', 'CDSCO', 'ISO 13485', 'REACH', 'ZDHC'],
      },
      {
        id: 'trade-mission',
        icon: 'plane',
        title: 'Trade Mission & Delegation Support',
        summary:
          'Delegations that come back with signed follow-ups rather than a folder of brochures.',
        description:
          'End-to-end support for business delegations, trade shows and site visits — COMPUTEX, BioAsia Taiwan, TIMTOS and industry-specific exhibitions. We handle meeting curation, interpretation, factory visits and the follow-through that usually decides whether a mission was worth the airfare.',
        deliverables: [
          'Business delegation planning',
          'Trade show representation & booth support',
          'Curated B2B meeting scheduling',
          'Factory visits & site audits',
          'Professional meeting interpretation',
          'Travel & logistics coordination',
        ],
        tags: ['COMPUTEX', 'BioAsia', 'TIMTOS', 'Interpretation'],
      },
    ],
  },

  industries: {
    eyebrow: 'Industry Verticals',
    heading: 'Sectors where technical depth decides the outcome',
    lead: 'We concentrate where our scientific background is a genuine advantage rather than a claim on a slide.',
    items: [
      {
        id: 'chemicals',
        icon: 'flask',
        title: 'Specialty & Green Chemicals',
        body: 'Non-bisphenol (BPA/BPS-free) textile auxiliaries, functional finishes, sustainable formulation and process chemistry.',
        pills: ['BP-free auxiliaries', 'Functional finishes', 'Textile chemicals', 'Green chemistry'],
      },
      {
        id: 'biotech',
        icon: 'dna',
        title: 'Biotech, Life Sciences & Pharmaceuticals',
        body: 'Drug development, API and intermediate supply, oligonucleotide and gene therapy platforms, CRO/CDMO partnerships.',
        pills: ['API & intermediates', 'CRO / CDMO', 'Oligonucleotides', 'Clinical supply'],
      },
      {
        id: 'medical-devices',
        icon: 'stethoscope',
        title: 'Medical Devices & Cleanroom Automation',
        body: 'Device manufacturing partnerships, cleanroom equipment sourcing, ISO 13485 documentation and quality systems.',
        pills: ['ISO 13485', 'Cleanroom', 'Device OEM', 'Quality systems'],
      },
      {
        id: 'electronics',
        icon: 'cpu',
        title: 'Electronics & Semiconductor Materials',
        body: 'Semiconductor materials, precision components, industrial machinery and automation systems from the Taiwanese supply base.',
        pills: ['Semiconductor materials', 'Precision components', 'Industrial machinery', 'Automation'],
      },
      {
        id: 'green-tech',
        icon: 'leaf',
        title: 'Sustainable Technologies & Renewable Energy',
        body: 'Renewable energy technology, energy materials, environmental processes and sustainability-driven industrial transitions.',
        pills: ['Renewables', 'Energy materials', 'Environmental process', 'Circularity'],
      },
      {
        id: 'research',
        icon: 'graduation-cap',
        title: 'Research Institutes & Universities',
        body: 'Academic–industry collaboration, sponsored research agreements, and commercialisation pathways for university IP.',
        pills: ['Academic partnerships', 'Sponsored research', 'IP commercialisation', 'Joint labs'],
      },
    ],
  },

  translation: {
    eyebrow: 'Dedicated Module',
    heading: 'Bridging the technical language gap',
    lead: 'A dedicated technical translation and localisation practice for documents that carry regulatory, legal or safety weight.',
    body: 'Traditional Chinese (繁體中文) ⇄ English, handled by people with laboratory and regulatory backgrounds. Where a general translation vendor guesses at terminology, we know it — and where a term genuinely has no clean equivalent, we flag it rather than quietly choosing one.',
    docTypesHeading: 'Document types',
    docTypes: [
      { title: 'Patents & IP filings', body: 'Claim-accurate rendering with terminology consistency across a family.' },
      { title: 'SOPs & GMP records', body: 'Manufacturing procedures, batch records and validation documentation.' },
      { title: 'Clinical protocols', body: 'Study protocols, investigator brochures and regulatory dossiers.' },
      { title: 'Safety data sheets', body: 'MSDS/SDS with correct hazard classification language.' },
      { title: 'Commercial contracts', body: 'Agreements where an ambiguous clause becomes a dispute.' },
      { title: 'Technical catalogues', body: 'Product specifications, manuals and localised marketing material.' },
    ],
    qualityHeading: 'How we protect accuracy',
    quality: [
      'Subject-matter translator with a science or regulatory background',
      'Terminology glossary agreed with you before work starts',
      'Second-pass technical review against the source document',
      'Ambiguities flagged for your decision, never silently resolved',
    ],
  },

  bridge: {
    eyebrow: 'Why Taiwan & India',
    heading: 'Two economies that fit together',
    lead: 'The bilateral case is not sentimental. Taiwan and India have complementary strengths, and the gap between them is mostly an execution problem.',
    taiwanTitle: 'Why Taiwan',
    taiwanLead: "One of Asia's leading innovation hubs.",
    taiwanPoints: [
      'Strong, dense manufacturing ecosystem',
      'World-class semiconductor industry',
      'Advanced biotechnology and pharmaceutical research',
      'Reliable, audit-ready suppliers',
      'Mature global export capability',
      'Highly skilled technical workforce',
    ],
    indiaTitle: 'Why India',
    indiaLead: "One of the world's fastest-growing markets.",
    indiaPoints: [
      'Large and expanding manufacturing base',
      'Rapidly growing healthcare and pharma sector',
      'Major infrastructure investment underway',
      'Competitive production economics',
      'Deep engineering talent pool',
      'Substantial domestic demand',
    ],
    closing:
      'What is usually missing is not opportunity but a counterparty who understands both the technology and both business cultures well enough to keep a project moving. That is the role we play.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'How an engagement runs',
    lead: 'Six stages, each with a defined output. You always know what has been done and what happens next.',
    steps: [
      { n: '01', title: 'Understand your business needs', body: 'A working session on objectives, constraints, technical requirements and the commercial outcome the project is judged against.' },
      { n: '02', title: 'Identify partners', body: 'Structured scouting across our Taiwanese and Indian networks, producing a shortlist rather than a directory.' },
      { n: '03', title: 'Evaluate opportunities', body: 'Technical and commercial due diligence — capability, quality systems, IP position and financial standing.' },
      { n: '04', title: 'Coordinate meetings', body: 'Introductions, site visits and negotiations, with professional interpretation and prepared briefing material.' },
      { n: '05', title: 'Negotiate & execute', body: 'Support through term sheets, licensing structures, supply agreements and the documentation that makes them operable.' },
      { n: '06', title: 'Long-term project support', body: 'Ongoing coordination, regulatory and translation support, and periodic review as the relationship matures.' },
    ],
  },

  leadership: {
    eyebrow: 'Leadership & Governance',
    heading: 'Bilateral leadership',
    lead: 'A Taiwan-based legal and operational lead, paired with technical direction from a working research scientist.',
    people: [
      {
        id: 'chia-ling-shih',
        name: 'Chia-Ling Shih',
        nameLocal: '施佳玲',
        role: 'Founder & Chairperson',
        roleDetail: 'Responsible Person for Taiwan operations · Government & legal liaison',
        location: 'New Taipei City, Taiwan',
        bio: 'Founder of HariNex Global and the company\'s legal representative in Taiwan, with responsibility for corporate governance, government liaison and local operations. A synthetic and medicinal chemist by training, with hands-on experience across small-molecule organic synthesis, PET radiochemistry and API/ADC process development.',
        bioExtra:
          'Currently delivering small-molecule and linker–payload synthesis for antibody-drug conjugate programmes at a global cGMP CDMO, applying continuous-flow (Advanced Flow Reactor) and tangential-flow filtration technologies with full structural characterisation by NMR, MS, HPLC and LC-MS. Co-author of three peer-reviewed papers, two of them in ACS journals.',
        creds: [
          'M.Sc. Medicinal Chemistry — National Taiwan University',
          'B.Sc. Medicinal & Applied Chemistry — Kaohsiung Medical University',
          'R&D Chemist, ADC Division — Formosa Laboratories (台耀化學)',
          'Research Assistant, School of Pharmacy — National Taiwan University',
        ],
        focus: ['Corporate governance', 'Taiwan legal representation', 'Government liaison', 'Process chemistry'],
      },
      {
        id: 'ganesh-kumar',
        name: 'Dr. D. Ganesh Kumar',
        nameLocal: '甘納緒 博士',
        role: 'General Manager & Technical Lead',
        roleDetail: 'R&D evaluation · Technical due diligence · Market execution',
        location: 'Linkou, New Taipei City, Taiwan',
        bio: 'General Manager of HariNex Global, leading technical evaluation, technology transfer and market execution. A Ph.D. medicinal chemist with over a decade of experience spanning drug discovery, product development, IND-enabling studies, CMC documentation and regulatory strategy in highly regulated environments.',
        bioExtra:
          'Currently Manager of New Drug Development at Bo Hui Biotech, leading drug R&D, clinical development and process optimisation. Previously a postdoctoral researcher at National Taiwan University and Chang Gung University, and a Research Associate at Syngene International (Biocon Group, India), where he scaled laboratory processes to kilogram pilot-plant production and supported CMC sections for IND applications. Author or co-author of nineteen peer-reviewed publications.',
        creds: [
          'Ph.D. Organic & Medicinal Chemistry — Kaohsiung Medical University, Taiwan',
          'M.Sc. Chemistry — University of Madras, India',
          'Manager, New Drug Development — Bo Hui Biotech Co., Ltd.',
          'Postdoctoral Researcher — National Taiwan University & Chang Gung University',
          'Research Associate — Syngene International (Biocon Group), India',
        ],
        focus: ['Technology transfer', 'Technical due diligence', 'Regulatory strategy', 'Commercialisation'],
      },
    ],
  },

  insights: {
    eyebrow: 'Case Studies & Insights',
    heading: 'Perspectives on the Taiwan–India corridor',
    lead: 'Practical notes on cross-border technology, sourcing and compliance.',
    comingSoon: 'Article coming soon',
    items: [
      { id: 'taiwan-india', category: 'Market entry', title: 'Why Taiwanese companies should explore India', excerpt: 'The commercial logic behind the corridor, and the operational realities that decide whether an entry works.' },
      { id: 'tech-transfer', category: 'Technology transfer', title: 'Technology transfer best practices', excerpt: 'What separates a transfer that reaches production from one that stalls at pilot scale.' },
      { id: 'supplier-checklist', category: 'Sourcing', title: 'Supplier qualification checklist', excerpt: 'The structured evaluation we run before recommending any manufacturing partner.' },
      { id: 'doing-business-taiwan', category: 'Market entry', title: 'Doing business in Taiwan', excerpt: 'Company structures, regulatory posture and the cultural conventions that matter in practice.' },
      { id: 'trade-opportunities', category: 'Trade', title: 'Taiwan–India trade opportunities', excerpt: 'Where the complementary strengths of the two economies create genuine openings.' },
      { id: 'localisation', category: 'Localisation', title: 'Website localisation for international companies', excerpt: 'Why literal translation fails, and what a properly localised bilingual presence requires.' },
    ],
  },

  contact: {
    eyebrow: 'Project Inquiry',
    heading: 'Start a conversation',
    lead: 'Tell us what you are trying to achieve. We will tell you honestly whether we are the right firm for it — and if we are not, who might be.',
    form: {
      name: 'Full name',
      namePh: 'Your name',
      email: 'Corporate email',
      emailPh: 'you@company.com',
      phone: 'Phone',
      phonePh: '+886 / +91 / other',
      company: 'Company name',
      companyPh: 'Your organisation',
      region: 'Region',
      regionPh: 'Select a region',
      regions: ['Taiwan', 'India', 'Other'],
      service: 'Service focus',
      services: [
        'Technology Transfer',
        'Strategic Sourcing',
        'Technical Translation',
        'Market Entry',
        'Regulatory Support',
      ],
      brief: 'Project description',
      briefPh: 'Describe the technology, the market, or the problem you are trying to solve. A few sentences is enough to start.',
      submit: 'Send inquiry',
      submitting: 'Sending…',
      successTitle: 'Inquiry received',
      successBody:
        'Thank you — your inquiry has been prepared. We aim to respond to every qualified inquiry within two working days.',
      successClose: 'Close',
      optional: 'optional',
      required: 'required',
    },
    errors: {
      name: 'Please enter your name (at least 2 characters).',
      email: 'Please enter a valid corporate email address.',
      company: 'Please enter your company name.',
      region: 'Please select a region.',
      service: 'Please select at least one service focus.',
      brief: 'Please describe your project in at least 20 characters.',
    },
    infoHeading: 'Offices',
    offices: [
      { city: 'Taipei, Taiwan', role: 'Headquarters & legal entity', detail: 'HariNex Global Co., Ltd. (瀚瑞國際股份有限公司)' },
      { city: 'Chennai, India', role: 'India Desk', detail: 'Representative office — opening soon' },
    ],
    directHeading: 'Direct',
    responseNote: 'We aim to respond to qualified inquiries within two working days.',
  },

  careers: {
    eyebrow: 'Careers',
    heading: 'Join our global network',
    lead: 'We work with a distributed network of specialists across both markets.',
    roles: ['Technical Consultants', 'Business Advisors', 'Translators & Interpreters', 'Web Developers', 'Industry Experts'],
    cta: 'Introduce yourself',
  },

  footer: {
    blurb: 'Connecting Taiwan and India through technology, innovation and trusted partnerships.',
    capabilitiesHeading: 'Capabilities',
    companyHeading: 'Company',
    contactHeading: 'Contact',
    legalHeading: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    disclaimer: 'Disclaimer',
    rights: 'All rights reserved.',
    disclaimerBody:
      'HariNex Global provides advisory, coordination and localisation services. We are not a law firm, and we do not provide legal, tax, investment or accounting advice. Regulatory submissions are coordinated with appropriately qualified professionals.',
  },

  cta: {
    heading: 'Have a technology, a supplier need, or a market to enter?',
    body: 'A first conversation costs nothing and usually clarifies more than a month of email.',
    primary: 'Request Consultation',
    secondary: 'Email us directly',
  },
} as const satisfies Record<string, unknown>;

/* ------------------------------------------------------------------ */
/*  Shape derived from the English tree                                */
/* ------------------------------------------------------------------ */

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T extends string
      ? string
      : T;

export type Dict = DeepMutable<typeof en>;

/* ------------------------------------------------------------------ */
/*  繁體中文                                                            */
/* ------------------------------------------------------------------ */

const zh: Dict = {
  site: {
    name: 'HariNex Global',
    legalName: '瀚瑞國際股份有限公司',
    legalNameAlt: 'HariNex Global Co., Ltd.',
    tagline: '技術移轉 • 商務顧問 • 全球貿易',
    shortTagline: '連結台灣、印度與全球創新',
    description:
      '專注於台灣、印度與全球市場之間的跨境技術移轉、企業貿易顧問與專業技術在地化服務。',
  },

  common: {
    requestConsultation: '預約諮詢',
    getInTouch: '與我們聯繫',
    exploreCapabilities: '瀏覽服務能力',
    scheduleScouting: '預約技術媒合',
    learnMore: '了解更多',
    viewAll: '查看全部',
    backToTop: '回到頂端',
    readArticle: '閱讀文章',
    ourServices: '服務項目',
    contactUs: '聯絡我們',
    deliverables: '交付項目',
    focusAreas: '專業領域',
    langLabel: '語言',
  },

  nav: {
    home: '首頁',
    about: '關於我們',
    capabilities: '服務能力',
    industries: '產業領域',
    bridge: '為什麼是台灣與印度',
    insights: '洞察觀點',
    contact: '聯絡我們',
    capabilitiesIntro: '七大專業服務，於兩地市場完整交付。',
  },

  hero: {
    badge: '台灣 ↔ 印度 雙向樞紐',
    title: '連結創意．建立夥伴．實現創新價值',
    titleLines: ['連結創意。', '建立夥伴。', '實現創新價值。'],
    subtitle:
      '銜接台灣、印度與全球市場的雙向樞紐，提供技術移轉、策略採購與產業落地執行服務。',
    primaryCta: '瀏覽服務能力',
    secondaryCta: '預約技術媒合',
    taipei: '台北',
    india: '印度據點',
  },

  stats: {
    heading: '我們的營運範疇',
    items: [
      {
        value: '10',
        suffix: '+',
        label: '重點產業領域',
        detail: '涵蓋特用化學、生技醫藥、半導體到綠色科技。',
      },
      {
        value: '2',
        suffix: '',
        label: '兩地市場，同一團隊',
        detail: '由單一負責團隊橫跨台灣與印度執行專案。',
      },
      {
        value: '',
        suffix: '',
        label: '無雙酚與綠色化學專長',
        detail: '不含 BPA/BPS 助劑與永續配方技術。',
      },
      {
        value: '',
        suffix: '',
        label: '法規與在地化一站式支援',
        detail: '文件製作、法規協調與技術翻譯納入同一服務範圍。',
      },
    ],
  },

  about: {
    eyebrow: '雙向橋樑',
    heading: '台灣的創新，印度的機會，打造成一條可運作的通道',
    lead: '瀚瑞國際成立的目的，是弭平「先進技術研發之地」與「能夠規模化生產之地」之間的落差。',
    body: [
      '我們是一家國際商務與技術顧問公司，協助企業尋找夥伴、評估技術、協調專案，並建立能夠禁得起實務考驗的合作關係。',
      '這條通道之所以能運作，關鍵在於兩端都具備技術理解力。技術評估由甘納緒博士主導，他是藥物化學博士，在新藥開發、CMC 文件與試量產技術移轉領域擁有十餘年經驗。台灣營運、法定代表與政府聯繫則由創辦人施佳玲負責。',
      '我們相信成功的國際商務仰賴三件事：信任、技術上的相互理解，以及能夠跨越語言隔閡的溝通。這就是我們方法論的全部。',
    ],
    visionTitle: '我們的願景',
    vision: '成為台灣與印度之間在創新、製造與國際合作領域最重要的技術與商務橋樑。',
    missionTitle: '我們的使命',
    mission:
      '透過值得信賴的顧問服務、技術合作夥伴、供應商網絡與數位解決方案，簡化跨境商務並創造長期價值。',
    bridgeOrigin: '台灣',
    bridgeOriginRole: '研發、技術源頭、精密製造',
    bridgeDest: '印度',
    bridgeDestRole: '產業放大、市場進入、具成本競爭力的生產',
    bridgeLabel: '技術橋樑',
    whyUs: {
      heading: '企業選擇我們的理由',
      items: [
        { title: '技術專業', body: '具博士級科學評估能力，而非僅以業務導向進行媒合。' },
        { title: '國際經驗', body: '職涯橫跨台灣與印度的研究機構與產業界。' },
        { title: '台灣在地網絡', body: '在台北具備實地據點、語言能力與法定代表資格。' },
        { title: '印度商務網絡', body: '直接對接印度製造業與生命科學生態系。' },
        { title: '全程專案支援', body: '從初次媒合到簽約與交付，全程陪同。' },
        { title: '專業技術翻譯', body: '繁體中文 ⇄ 英文，由真正理解技術內容的人員處理。' },
      ],
    },
  },

  capabilities: {
    eyebrow: '服務能力',
    heading: '七大專業服務，單一負責團隊',
    lead: '每項服務均可獨立委託；整合運用時，可涵蓋從技術發掘到在第二市場落地執行的完整流程。',
    items: [
      {
        id: 'technology-transfer',
        icon: 'atom',
        title: '技術移轉與商品化',
        summary: '將已驗證的技術，從實驗室推進到具授權基礎的規模化工業生產。',
        description:
          '我們負責發掘、評估並建構台灣與印度組織之間具商業可行性的技術移轉，包括不含雙酚（BPA/BPS-free）的紡織化學品授權、生技智慧財產、試量產放大流程與共同開發協議。技術實地查核由化學專業人員執行，因此技術是依據數據被評估，而非依據簡報。',
        deliverables: [
          '技術發掘與技術地圖分析',
          '授權架構規劃與談判支援',
          '技術實地查核報告',
          '研究合作協議',
          '製造移轉協調',
          '試量產專案協調',
        ],
        tags: ['技術授權', '智財', '試量產', '共同開發'],
      },
      {
        id: 'business-advisory',
        icon: 'handshake',
        title: '商務顧問與跨境媒合',
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
        tags: ['市場進入', '合資', '外商投資', '實地查核'],
      },
      {
        id: 'supplier-sourcing',
        icon: 'factory',
        title: '策略性供應商採購',
        summary: '橫跨台灣與印度、且經實地驗證的合格製造夥伴。',
        description:
          '找到供應商並不難，難的是完成資格認定。我們負責篩選候選工廠、依貴公司技術規格進行結構化評估、實地訪廠、評估品質系統，並支援商務談判。在台灣特用機械、無塵室設備、製藥原料與自動化系統領域具備深度。',
        deliverables: [
          '工廠發掘與名單篩選',
          '結構化供應商評估',
          '實地訪廠與稽核',
          '品質系統評估',
          '談判與簽約支援',
          '供應關係長期管理',
        ],
        tags: ['採購', '稽核', '無塵室', '自動化'],
      },
      {
        id: 'technical-translation',
        icon: 'languages',
        title: '技術翻譯與在地化',
        summary: '繁體中文 ⇄ 英文，專為「誤譯即等同法規事件」的文件而設。',
        description:
          '多數翻譯供應商能處理行銷文案，但極少能在不引入錯誤的前提下處理專利請求項、GMP 批次紀錄或化學品安全資料表。我們的翻譯業務由科學背景人員主導：將貴公司 SOP 翻譯成繁體中文的人，理解該製程實際在做什麼。',
        deliverables: [
          '專利與智慧財產申請文件',
          'SOP、GMP 與批次文件',
          '臨床試驗計畫書與法規卷宗',
          '安全資料表（MSDS/SDS）',
          '商務契約與協議',
          '網站與產品型錄在地化',
          '商務口譯',
        ],
        tags: ['繁中 ⇄ 英文', '專利', 'GMP', 'MSDS'],
      },
      {
        id: 'digital-solutions',
        icon: 'monitor',
        title: '網站與 AI 數位解決方案',
        summary: '讓跨境營運能被客戶清楚理解的數位層。',
        description:
          '企業與電商網站、雙語數位形象、工作流程自動化，以及跨境專案管理系統。設計目標是：讓一家使用兩種語言、橫跨兩個時區營運的公司，不必維護兩套工具。',
        deliverables: [
          '企業與電子商務網站',
          '雙語數位形象（英文 / 繁中）',
          'SEO 與數位品牌',
          'AI 客服機器人與自動化',
          '商業流程自動化',
          '跨境專案管理系統',
        ],
        tags: ['網站', 'AI', '自動化', 'SEO'],
      },
      {
        id: 'regulatory',
        icon: 'shield-check',
        title: '法規協調',
        summary: '為受管制產業提供文件、送件準備與法規協調支援。',
        description:
          '我們與具資格的法規專家協作，協助整理受管制專案所依賴的文件與溝通流程，包括 CMC 章節、技術文件、法規對照與與主管機關的往來文件。本公司總經理具備 IND 前置文件與亞太法規策略的第一線經驗。',
        deliverables: [
          'TFDA 與 CDSCO 送件協調',
          'ISO 13485 文件支援',
          'REACH 與 ZDHC Level 3 化學品合規',
          'CMC 文件與法規撰寫',
          '技術文件建置',
          '合規落差評估',
        ],
        tags: ['TFDA', 'CDSCO', 'ISO 13485', 'REACH', 'ZDHC'],
      },
      {
        id: 'trade-mission',
        icon: 'plane',
        title: '商務考察團與代表團支援',
        summary: '讓考察團帶回已簽署的後續事項，而不是一疊型錄。',
        description:
          '為商務代表團、展覽與實地參訪提供全程支援，包括 COMPUTEX、亞洲生技大會、TIMTOS 及各產業專業展。我們負責會議安排、口譯、訪廠，以及通常真正決定此行是否值回票價的後續追蹤。',
        deliverables: [
          '商務代表團規劃',
          '展覽代表與攤位支援',
          '精選 B2B 會議安排',
          '訪廠與實地稽核',
          '專業會議口譯',
          '差旅與後勤協調',
        ],
        tags: ['COMPUTEX', '亞洲生技大會', 'TIMTOS', '口譯'],
      },
    ],
  },

  industries: {
    eyebrow: '產業領域',
    heading: '技術深度足以決定成敗的產業',
    lead: '我們專注於科學背景能構成真正優勢的領域，而非僅是簡報上的宣稱。',
    items: [
      {
        id: 'chemicals',
        icon: 'flask',
        title: '特用化學與綠色化學',
        body: '不含雙酚（BPA/BPS-free）之紡織助劑、機能性後整理、永續配方與製程化學。',
        pills: ['無雙酚助劑', '機能性後整理', '紡織化學品', '綠色化學'],
      },
      {
        id: 'biotech',
        icon: 'dna',
        title: '生技、生命科學與製藥',
        body: '新藥開發、原料藥與中間體供應、寡核苷酸與基因治療平台、CRO／CDMO 合作。',
        pills: ['原料藥與中間體', 'CRO / CDMO', '寡核苷酸', '臨床供應'],
      },
      {
        id: 'medical-devices',
        icon: 'stethoscope',
        title: '醫療器材與無塵室自動化',
        body: '器材製造合作、無塵室設備採購、ISO 13485 文件與品質系統。',
        pills: ['ISO 13485', '無塵室', '器材代工', '品質系統'],
      },
      {
        id: 'electronics',
        icon: 'cpu',
        title: '電子與半導體材料',
        body: '半導體材料、精密零組件、工業機械與來自台灣供應鏈的自動化系統。',
        pills: ['半導體材料', '精密零組件', '工業機械', '自動化'],
      },
      {
        id: 'green-tech',
        icon: 'leaf',
        title: '永續科技與再生能源',
        body: '再生能源技術、能源材料、環境製程，以及以永續為導向的產業轉型。',
        pills: ['再生能源', '能源材料', '環境製程', '循環經濟'],
      },
      {
        id: 'research',
        icon: 'graduation-cap',
        title: '研究機構與大學',
        body: '產學合作、委託研究協議，以及大學智慧財產的商品化路徑。',
        pills: ['產學合作', '委託研究', '智財商品化', '聯合實驗室'],
      },
    ],
  },

  translation: {
    eyebrow: '專屬服務模組',
    heading: '跨越技術語言的落差',
    lead: '專為具法規、法律或安全份量之文件所設立的技術翻譯與在地化服務。',
    body: '繁體中文 ⇄ 英文，由具備實驗室與法規背景的人員處理。一般翻譯供應商只能猜測術語，我們則確知其意；而當某個術語確實沒有精確對應時，我們會明確標示，而非悄悄自行決定。',
    docTypesHeading: '文件類型',
    docTypes: [
      { title: '專利與智財文件', body: '請求項精確翻譯，並維持同一專利家族的術語一致性。' },
      { title: 'SOP 與 GMP 紀錄', body: '製造程序、批次紀錄與確效文件。' },
      { title: '臨床試驗計畫書', body: '試驗計畫書、主持人手冊與法規卷宗。' },
      { title: '安全資料表', body: 'MSDS/SDS，並採用正確的危害分類用語。' },
      { title: '商務契約', body: '條款一旦語意含糊，即可能演變為爭議的文件。' },
      { title: '技術型錄', body: '產品規格、操作手冊與在地化行銷素材。' },
    ],
    qualityHeading: '我們如何確保準確性',
    quality: [
      '由具科學或法規背景的專業譯者執行',
      '開始作業前與貴公司確認術語對照表',
      '對照原文進行第二階段技術審閱',
      '語意疑義一律標示交由貴公司決定，絕不逕行處理',
    ],
  },

  bridge: {
    eyebrow: '為什麼是台灣與印度',
    heading: '兩個互補的經濟體',
    lead: '這項雙邊主張並非情感訴求。台灣與印度具備互補優勢，兩者之間的落差，主要是執行問題。',
    taiwanTitle: '為什麼是台灣',
    taiwanLead: '亞洲最重要的創新樞紐之一。',
    taiwanPoints: [
      '緊密而強韌的製造生態系',
      '世界級的半導體產業',
      '先進的生技與製藥研究',
      '可靠且具稽核能力的供應商',
      '成熟的全球出口能力',
      '高度熟練的技術人力',
    ],
    indiaTitle: '為什麼是印度',
    indiaLead: '全球成長最快速的市場之一。',
    indiaPoints: [
      '龐大且持續擴張的製造基礎',
      '快速成長的醫療與製藥產業',
      '大規模基礎建設投資進行中',
      '具競爭力的生產成本結構',
      '深厚的工程人才庫',
      '可觀的內需市場規模',
    ],
    closing:
      '真正欠缺的通常不是機會，而是一個同時理解技術與兩地商業文化、足以推動專案持續前進的對口。這正是我們扮演的角色。',
  },

  process: {
    eyebrow: '服務流程',
    heading: '專案如何進行',
    lead: '六個階段，每階段皆有明確產出。您隨時清楚已完成什麼、下一步是什麼。',
    steps: [
      { n: '01', title: '了解您的業務需求', body: '就目標、限制條件、技術需求與此專案最終被檢視的商業成果進行工作會議。' },
      { n: '02', title: '發掘合作夥伴', body: '在台灣與印度網絡中進行結構化搜尋，產出的是精選名單而非通訊錄。' },
      { n: '03', title: '評估機會', body: '技術與商務實地查核，涵蓋能力、品質系統、智財地位與財務狀況。' },
      { n: '04', title: '安排會議', body: '引薦、實地參訪與談判，並提供專業口譯與事前準備的簡報資料。' },
      { n: '05', title: '談判與執行', body: '協助處理條件書、授權架構、供應協議，以及使其得以實際運作的文件。' },
      { n: '06', title: '長期專案支援', body: '持續協調、法規與翻譯支援，並隨合作關係成熟進行定期檢視。' },
    ],
  },

  leadership: {
    eyebrow: '經營團隊與治理',
    heading: '雙邊領導團隊',
    lead: '由台灣在地的法務與營運負責人，搭配現職研究科學家提供技術指導。',
    people: [
      {
        id: 'chia-ling-shih',
        name: '施佳玲',
        nameLocal: 'Chia-Ling Shih',
        role: '創辦人暨董事長',
        roleDetail: '台灣營運負責人 · 政府與法務聯繫窗口',
        location: '台灣，新北市',
        bio: '瀚瑞國際創辦人暨台灣法定代表人，負責公司治理、政府聯繫與在地營運。學術訓練為合成與藥物化學，於小分子有機合成、PET 放射化學及原料藥／ADC 製程開發領域具實務經驗。',
        bioExtra:
          '現於國際 cGMP CDMO 執行抗體藥物複合體（ADC）計畫之小分子與 linker–payload 合成，運用連續流動化學（Advanced Flow Reactor）與切向流過濾技術，並以 NMR、MS、HPLC 與 LC-MS 進行完整結構鑑定。合著三篇同儕審查論文，其中兩篇刊登於 ACS 期刊。',
        creds: [
          '國立臺灣大學 藥學系 藥物化學 碩士',
          '高雄醫學大學 藥學暨應用化學系 學士',
          '台耀化學 ADC 部門 研發化學師',
          '國立臺灣大學 藥學院 研究助理',
        ],
        focus: ['公司治理', '台灣法定代表', '政府聯繫', '製程化學'],
      },
      {
        id: 'ganesh-kumar',
        name: '甘納緒 博士',
        nameLocal: 'Dr. D. Ganesh Kumar',
        role: '總經理暨技術長',
        roleDetail: '研發評估 · 技術實地查核 · 市場執行',
        location: '台灣，新北市林口',
        bio: '瀚瑞國際總經理，負責技術評估、技術移轉與市場執行。藥物化學博士，於藥物探索、產品開發、IND 前置研究、CMC 文件與高度受管制環境下的法規策略領域擁有十餘年經驗。',
        bioExtra:
          '現任博惠生技新藥開發經理，負責新藥研發、臨床開發與製程優化。曾任國立臺灣大學與長庚大學博士後研究員，並於印度 Syngene International（Biocon 集團）擔任研究員，負責將實驗室製程放大至公斤級試量產，並支援 IND 申請之 CMC 章節。發表或共同發表十九篇同儕審查論文。',
        creds: [
          '高雄醫學大學 有機暨藥物化學 博士',
          '印度馬德拉斯大學 化學 碩士',
          '博惠生技 新藥開發經理',
          '國立臺灣大學、長庚大學 博士後研究員',
          'Syngene International（Biocon 集團，印度）研究員',
        ],
        focus: ['技術移轉', '技術實地查核', '法規策略', '商品化'],
      },
    ],
  },

  insights: {
    eyebrow: '案例與洞察',
    heading: '台印走廊的觀察與觀點',
    lead: '關於跨境技術、採購與法規合規的實務筆記。',
    comingSoon: '文章即將上線',
    items: [
      { id: 'taiwan-india', category: '市場進入', title: '台灣企業為何應該布局印度', excerpt: '這條走廊背後的商業邏輯，以及決定市場進入成敗的營運現實。' },
      { id: 'tech-transfer', category: '技術移轉', title: '技術移轉最佳實務', excerpt: '能推進到量產的技術移轉，與停滯在試量產階段者，差別何在。' },
      { id: 'supplier-checklist', category: '供應鏈', title: '供應商資格認定檢核表', excerpt: '在推薦任何製造夥伴之前，我們所執行的結構化評估流程。' },
      { id: 'doing-business-taiwan', category: '市場進入', title: '在台灣經商', excerpt: '公司架構、法規態勢，以及實務上真正重要的文化慣例。' },
      { id: 'trade-opportunities', category: '貿易', title: '台印貿易機會', excerpt: '兩個經濟體的互補優勢，在哪些地方創造出真正的切入點。' },
      { id: 'localisation', category: '在地化', title: '國際企業的網站在地化', excerpt: '為何逐字翻譯必然失敗，以及真正到位的雙語形象需要什麼。' },
    ],
  },

  contact: {
    eyebrow: '專案諮詢',
    heading: '開始一段對話',
    lead: '告訴我們您想達成什麼。我們會誠實告知我們是否為適合的合作對象；若不是，也會告訴您誰可能是。',
    form: {
      name: '姓名',
      namePh: '您的姓名',
      email: '公司電子郵件',
      emailPh: 'you@company.com',
      phone: '聯絡電話',
      phonePh: '+886 / +91 / 其他',
      company: '公司名稱',
      companyPh: '您的組織名稱',
      region: '所在地區',
      regionPh: '請選擇地區',
      regions: ['台灣', '印度', '其他'],
      service: '需求服務',
      services: ['技術移轉', '策略採購', '技術翻譯', '市場進入', '法規支援'],
      brief: '專案說明',
      briefPh: '請描述相關技術、目標市場，或您希望解決的問題。幾句話即可開始。',
      submit: '送出諮詢',
      submitting: '傳送中…',
      successTitle: '已收到您的諮詢',
      successBody: '感謝您，您的諮詢內容已備妥。我們力求於兩個工作天內回覆每一則有效諮詢。',
      successClose: '關閉',
      optional: '選填',
      required: '必填',
    },
    errors: {
      name: '請輸入您的姓名（至少 2 個字元）。',
      email: '請輸入有效的公司電子郵件地址。',
      company: '請輸入您的公司名稱。',
      region: '請選擇所在地區。',
      service: '請至少選擇一項需求服務。',
      brief: '請以至少 20 個字元描述您的專案。',
    },
    infoHeading: '據點',
    offices: [
      { city: '台灣 台北', role: '總部與法人登記地', detail: '瀚瑞國際股份有限公司（HariNex Global Co., Ltd.）' },
      { city: '印度 清奈', role: '印度據點', detail: '代表處 — 即將設立' },
    ],
    directHeading: '直接聯繫',
    responseNote: '我們力求於兩個工作天內回覆有效諮詢。',
  },

  careers: {
    eyebrow: '人才招募',
    heading: '加入我們的全球網絡',
    lead: '我們與橫跨兩地市場的專業人才網絡協同合作。',
    roles: ['技術顧問', '商務顧問', '筆譯與口譯人員', '網站開發人員', '產業專家'],
    cta: '自我介紹',
  },

  footer: {
    blurb: '以技術、創新與值得信賴的夥伴關係，連結台灣與印度。',
    capabilitiesHeading: '服務能力',
    companyHeading: '公司',
    contactHeading: '聯絡方式',
    legalHeading: '法律資訊',
    privacy: '隱私權政策',
    terms: '使用條款',
    disclaimer: '免責聲明',
    rights: '版權所有。',
    disclaimerBody:
      '瀚瑞國際提供顧問、協調與在地化服務。本公司並非律師事務所，亦不提供法律、稅務、投資或會計意見。法規送件均與具備適當資格之專業人士協同辦理。',
  },

  cta: {
    heading: '有技術、有供應商需求，或有想進入的市場？',
    body: '第一次對話不需任何費用，而且通常比一個月的往返郵件更能釐清方向。',
    primary: '預約諮詢',
    secondary: '直接寫信給我們',
  },
};

/* ------------------------------------------------------------------ */

export const dictionaries: Record<Lang, Dict> = {
  en: en as unknown as Dict,
  zh,
};

/* ------------------------------------------------------------------
   Contact details.
   NOTE: phone number and email are taken from the supplied homepage
   mockup (Images/1.png). Replace with the live company details before
   the site goes to production.
-------------------------------------------------------------------*/
export const CONTACT = {
  email: 'info@harinexglobal.com',
  phone: '+886 987 654 321',
  phoneHref: '+886987654321',
  taipei: 'Taipei, Taiwan',
  india: 'Chennai, India',
  linkedin: '#',
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  capabilities: '/capabilities',
  industries: '/industries',
  bridge: '/why-taiwan-india',
  insights: '/insights',
  contact: '/contact',
} as const;
