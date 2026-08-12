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
    shortTagline: 'Connecting Innovation & Trusted Partnerships Worldwide',
    description:
      'International technology transfer, corporate trade advisory and specialised technical localisation. Headquartered in Taiwan, with representatives in India, South Korea and the United States.',
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
    bridge: 'Global Markets',
    team: 'Our Team',
    insights: 'Insights',
    contact: 'Contact',
    capabilitiesIntro: 'Seven practices, delivered end to end across both markets.',
  },

  hero: {
    badge: 'Headquartered in Taiwan · Operating worldwide',
    title: 'Connecting Innovation and Trusted Partnerships Across the Globe',
    titleLines: ['Connecting Innovation', 'and Trusted Partnerships', 'Across the Globe'],
    subtitle:
      'HariNex Global helps businesses connect, collaborate and grow internationally through technology transfer, business advisory, supplier sourcing, technical translation, digital solutions and international project management.',
    primaryCta: 'Book a Free Consultation',
    secondaryCta: 'Explore Our Services',
    /* Hero flow connector: Taiwan -> Global */
    flowVia: 'Taiwan',
    flowTo: 'Global',
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
        value: '7',
        suffix: '',
        label: 'Markets, one team',
        detail: 'Taiwan, India, South Korea, the United States, Germany, Singapore and Australia — a single accountable team.',
      },
      {
        value: '',
        suffix: '',
        label: 'Advanced Materials & Sustainable Solutions',
        detail: 'Specialty chemicals, composites and sustainable formulation for regulated industries.',
      },
      {
        value: '',
        suffix: '',
        label: 'End-to-end regulatory & localisation support',
        detail: 'Documentation, compliance coordination and technical translation in one scope.',
      },
    ],
  },

  welcome: {
    eyebrow: 'Welcome',
    heading: 'Your Trusted Global Business Partner',
    body: [
      'HariNex Global is an international business and technology advisory firm dedicated to helping companies establish meaningful partnerships worldwide.',
      "We simplify international business by combining technical expertise, cultural understanding and global market knowledge. Whether you're looking for a technology partner, manufacturing supplier, research collaboration or digital transformation, we help you move projects from concept to execution.",
    ],
  },

  about: {
    eyebrow: 'About Us',
    heading: 'Building Stronger Business Connections Worldwide',
    lead: 'HariNex Global was established with a vision to bridge the gap between regional innovations and global opportunities.',
    body: [
      'Our team combines scientific knowledge, international project experience and business development expertise to help organisations identify partners, evaluate technologies, coordinate projects and build long-term collaborations.',
      'We believe successful international business depends on trust, technical understanding and effective communication.',
    ],
    visionTitle: 'Our Vision',
    vision:
      'To become a leading global technology and business bridge for innovation, manufacturing and international collaboration.',
    missionTitle: 'Our Mission',
    mission:
      'To simplify cross-border business by providing trusted advisory services, technology partnerships, supplier networks and digital solutions that create long-term value.',
    bridgeOrigin: 'Taiwan',
    bridgeOriginRole: 'R&D, technology origin, precision manufacturing',
    bridgeDest: 'Destination markets',
    bridgeDestRole:
      'Industrial scale-up, market entry and distribution, run to the same model in every market we operate in.',
    bridgeLabel: 'Technology Bridge',
    bridgeHeading: 'One origin. Seven markets. One accountable team.',
    bridgeLead:
      'Taiwan is where the technology, the manufacturing capacity and the contracting entity sit. Everywhere else is a destination market with a resident partner. Select a market to see who is there and what they cover.',
    bridgeRoleLabel: 'On the ground',
    bridgeFocusLabel: 'What this market covers',
    bridgeHint: 'Select a market',
    bridgeOriginTag: 'Origin',
    bridgeDestTag: 'Destination',
    corridorHeading: 'What actually crosses the bridge',
    corridorLead:
      'Not freight — a process. Scroll to follow an engagement from the Taiwan side through to a signed, supported relationship in a destination market.',
    corridorStageLabel: 'Stage',
    corridorOfLabel: 'of',
    corridorHint: 'Scroll to advance',
    corridorMarketsLabel: 'Destination markets',
    whyUs: {
      heading: 'Why Choose HariNex Global',
      items: [
        { title: 'Technical expertise', body: 'Deep domain knowledge across high-tech and regulated sectors.' },
        { title: 'International experience', body: 'Cross-border track record in technology and commercialisation.' },
        { title: 'Global network', body: 'Extensive network of industrial, academic and business partners.' },
        { title: 'End-to-end support', body: 'Comprehensive guidance from initial scoping through to execution.' },
        { title: 'Multilingual capability', body: 'Seamless communication across languages and business cultures.' },
      ],
    },
  },

  capabilities: {
    eyebrow: 'Capabilities',
    heading: 'Eight practices, one accountable team',
    lead: 'Each capability stands alone. Together they cover the full arc from identifying a technology to executing it in a second market.',
    items: [
      {
        id: 'technology-transfer',
        short: 'Technology Transfer',
        icon: 'atom',
        title: 'Technology Transfer & Commercialisation',
        summary:
          'Moving proven technology from the lab bench into licensed, scaled industrial production.',
        description:
          'We scout, evaluate and structure the transfer of commercially viable technology between organisations in different markets. That includes non-bisphenol (BPA/BPS-free) textile chemical licensing, biotech intellectual property, pilot-plant scale-up protocols and joint development agreements. Technical due diligence is performed by chemists, so a technology is assessed on its data rather than its pitch deck.',
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
        short: 'Business Advisory',
        icon: 'handshake',
        title: 'Business Advisory, Matchmaking & Delegations',
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
        tags: ['Market entry', 'JV & FDI', 'Delegations', 'Due diligence'],
      },
      {
        id: 'supplier-sourcing',
        short: 'Supplier Sourcing',
        icon: 'factory',
        title: 'Strategic Supplier Sourcing',
        summary:
          'Qualified manufacturing partners across our markets, verified in person.',
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
        short: 'Technical Translation',
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
        short: 'Digital Solutions',
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
        short: 'Regulatory Coordination',
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
        id: 'project-management',
        short: 'Project Management',
        icon: 'clipboard',
        title: 'International Project Management',
        summary:
          'One accountable owner for a project that spans several countries, languages and time zones.',
        description:
          'Cross-border projects fail in the gaps between parties, not inside them. We take the coordinating role — schedule, scope, documentation, escalation and the follow-through between meetings — so that a programme involving a Taiwanese supplier, an Indian plant and an American customer has a single owner rather than three parties each assuming someone else is handling it.',
        deliverables: [
          'Project planning & milestone tracking',
          'Multi-party coordination across time zones',
          'Documentation control & version management',
          'Risk and escalation management',
          'Progress reporting in both languages',
          'Post-delivery review & handover',
        ],
        tags: ['Coordination', 'Milestones', 'Reporting', 'Handover'],
      },
      {
        id: 'industrial-automation',
        short: 'Industrial Automation',
        icon: 'cpu',
        title: 'Industrial Automation & Control Systems',
        summary:
          'Commissioning the control system once the equipment lands — SCADA, DCS and PLC engineering, delivered with our automation partner in India.',
        description:
          'Sourcing a machine and running it are two different problems, and cross-border equipment projects usually stall on the second. This practice covers the control system: configuring, programming and commissioning it so imported plant works on the floor it was bought for. The engineering is performed by RAA Tech Engineering Pvt Ltd, our automation partner in India. We scope the requirement, carry the technical brief across languages, and either introduce them to the client directly or coordinate their delivery alongside the sourcing and regulatory work. Their engineers are theirs, and we say so rather than presenting them as ours.',
        deliverables: [
          'SCADA & DCS configuration and commissioning',
          'PLC programming and commissioning',
          'Industrial networking & protocol integration',
          'Control system scoping against the client requirement',
          'Bilingual technical briefing and vendor liaison',
          'Commissioning schedule coordination',
        ],
        tags: ['SCADA / DCS', 'PLC', 'Commissioning', 'India'],
      },
    ],
  },

  industries: {
    eyebrow: 'Industry Verticals',
    heading: 'Sectors where technical depth decides the outcome',
    lead: 'We concentrate where our scientific background is a genuine advantage rather than a claim on a slide.',
    items: [
      {
        id: 'bp-free',
        icon: 'test-tube',
        title: 'Non-Bisphenol (BPA/BPS-Free) Technology',
        body: 'BPA- and BPS-free textile auxiliaries and functional finishes — licensed, transferred and scaled for mills and brands facing tightening restricted-substance requirements.',
        pills: ['BPA-free', 'BPS-free', 'Textile auxiliaries', 'ZDHC Level 3', 'RSL compliance'],
      },
      {
        id: 'chemicals',
        icon: 'flask',
        title: 'Specialty & Advanced Materials',
        body: 'Functional finishes, composites, adhesives, sustainable formulation and industrial process chemistry.',
        pills: ['Functional finishes', 'Composites & adhesives', 'Textile chemicals', 'Sustainable formulation'],
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
    eyebrow: 'Global Markets',
    heading: 'Where we operate, and why',
    lead: 'Taiwan is our home and our anchor. From it we run the same model into seven markets across Asia, Europe, North America and Oceania — each with someone on the ground who lives there.',
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
    indiaTitle: 'Why go global from Taiwan',
    indiaLead: 'A dense industrial base is only worth what it can reach.',
    indiaPoints: [
      'Seven markets, each with a resident partner',
      'Asia, Europe, North America and Oceania',
      'Local language and local business culture',
      'Site visits without a long-haul wait',
      'One accountable team, not a referral chain',
      'Technical evaluation run centrally from Taiwan',
    ],
    closing:
      'What is usually missing is not opportunity but a counterparty who understands both the technology and the business cultures involved well enough to keep a project moving. That is the role we play.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'How an engagement runs',
    lead: 'Six stages, each with a defined output. You always know what has been done and what happens next.',
    steps: [
      { n: '01', title: 'Understand your business needs', body: 'A working session on objectives, constraints, technical requirements and the commercial outcome the project is judged against.' },
      { n: '02', title: 'Identify partners', body: 'Structured scouting across our global network, producing a shortlist rather than a directory.' },
      { n: '03', title: 'Evaluate opportunities', body: 'Technical and commercial due diligence — capability, quality systems, IP position and financial standing.' },
      { n: '04', title: 'Coordinate meetings', body: 'Introductions, site visits and negotiations, with professional interpretation and prepared briefing material.' },
      { n: '05', title: 'Negotiate & execute', body: 'Support through term sheets, licensing structures, supply agreements and the documentation that makes them operable.' },
      { n: '06', title: 'Long-term project support', body: 'Ongoing coordination, regulatory and translation support, and periodic review as the relationship matures.' },
    ],
  },

  leadership: {
    eyebrow: 'Leadership & Governance',
    heading: 'Leadership',
    lead: 'Company leadership and legal representation sit in Taiwan, alongside the India branch, project delivery, and a chief advisor who is a working scientist.',
    people: [
      {
        id: 'chia-ling-shih',
        name: 'Chia-Ling Shih',
        nameLocal: '施佳玲',
        role: 'Founder & Chairman',
        location: 'New Taipei City, Taiwan',
        photo: '/brand/team/chia-ling-shih.webp',
        focus: ['Corporate governance', 'Regional operations', 'Government liaison', 'Process chemistry'],
      },
      {
        id: 'sivarasan-ganesan',
        name: 'Dr. Sivarasan Ganesan',
        role: 'Group CEO & Managing Partner',
        location: 'Taiwan',
        photo: '/brand/team/sivarasan-ganesan.webp',
        focus: [
          'Group strategy',
          'Technology commercialisation',
          'Environmental & water technology',
          'Green technology',
        ],
      },
      {
        id: 'morris-ma',
        name: 'Morris S.S. Ma',
        nameLocal: '馬士軒',
        role: 'Managing Partner — Taiwan Operations',
        location: 'Kaohsiung, Taiwan',
        photo: '/brand/team/morris-ma.webp',
        focus: ['Taiwan operations', 'Supplier qualification', 'Factory & safety audits', 'Advanced materials', 'Green technology'],
      },
      {
        id: 'andy-kao',
        name: 'Andy Kao',
        role: 'Managing Partner — IT Service, Taiwan',
        location: 'Hsinchu, Taiwan',
        photo: '/brand/team/andy-kao.webp',
        focus: [
          'IT service delivery',
          'Server & directory infrastructure',
          'Virtualisation',
          'Containerisation',
        ],
      },
      {
        id: 'ganesh-kumar',
        name: 'Dr. D. Ganesh Kumar',
        nameLocal: '甘納緒 博士',
        role: 'Chief Advisor',
        location: 'New Taipei City, Taiwan',
        photo: '/brand/team/ganesh-kumar.webp',
        focus: [
          'Technology commercialisation',
          'Business development',
          'Technology transfer',
          'Regulatory strategy',
          'International collaboration',
        ],
      },
      {
        id: 'viney-g',
        name: 'Viney G',
        role: 'Managing Director — India Branch',
        location: 'Bengaluru, Karnataka, India',
        photo: '/brand/team/viney-g.webp',
        focus: ['India market entry', 'Manufacturing partners', 'Supplier qualification', 'Site visits'],
      },
      {
        id: 'lenin-nachimuthu',
        name: 'Lenin Nachimuthu',
        role: 'Project Management Lead — India Branch',
        location: 'Vellore, Tamil Nadu, India',
        photo: '/brand/team/lenin-nachimuthu.webp',
        focus: [
          'Sample validation gates',
          'Vendor risk mitigation plans',
          'Entity setup tracking',
          'SLA integration schedules',
        ],
      },
    ],
  },

  team: {
    eyebrow: 'Our Team',
    heading: 'The people who actually do the work',
    lead: 'Two tiers, and we are explicit about which is which: the officers of the company, and the global team who represent it in each market and discipline.',
    leadershipTier: 'Leadership',
    regionalTier: 'Global Team',
    contactLabel: 'Contact',
    openRoleLabel: 'Appointment in progress',
    openRoleBody:
      'We are finalising the appointment for this market. In the meantime, enquiries are handled directly from the Taiwan head office.',
  },

  regional: {
    eyebrow: 'Global Team',
    heading: 'Someone on the ground in each market',
    lead: 'Each member of the global team is the first point of contact for their market or discipline, and can be in front of a counterparty in person rather than on a call at an inconvenient hour.',
    people: [
      {
        id: 'vadivalagan-chithravel',
        name: 'Dr. Vadivalagan Chithravel',
        role: 'Business Development Partner — North America',
        location: 'Ann Arbor, Michigan, United States',
        photo: '/brand/team/vadivalagan-chithravel.webp',
        email: '',
        phone: '',
        phoneHref: '',
        focus: ['North America market entry', 'Life sciences partnerships', 'Technology scouting', 'Research collaboration'],
      },
      {
        id: 'kanagaraj-naveen',
        name: 'Dr. Kanagaraj Naveen',
        role: 'Business Development Partner — South Korea',
        location: 'Seoul, South Korea',
        photo: '/brand/team/kanagaraj-naveen.webp',
        email: '',
        phone: '',
        phoneHref: '',
        focus: ['Korea market access', 'Electronics & materials sourcing', 'Technical due diligence', 'Process scale-up'],
      },
      {
        id: 'ariraman-mathivathanan',
        name: 'Dr. Ariraman Mathivathanan',
        role: 'Technical Specialist — Materials & Polymers',
        location: 'Hosur, Tamil Nadu, India',
        photo: '/brand/team/ariraman-mathivathanan.webp',
        email: '',
        phone: '',
        phoneHref: '',
        focus: ['Specialty chemicals sourcing', 'Textile & coating technology', 'Formulation due diligence', 'Technology transfer support'],
      },
      {
        id: 'manas-chakraborty',
        name: 'Dr. Manas Chakraborty',
        role: 'Business Development Partner — Australia',
        location: 'Perth, Australia',
        photo: '/brand/team/manas-chakraborty.webp',
        focus: [
          'Australia market entry',
          'Life sciences partnerships',
          'Pharmaceutical development',
          'Technology scouting',
        ],
      },
      {
        id: 'purusothaman-manogaran',
        name: 'Purusothaman Manogaran',
        role: 'Business Development Partner — Singapore',
        location: 'Singapore',
        photo: '/brand/team/purusothaman-manogaran.webp',
        focus: [
          'Singapore market access',
          'ASEAN partnerships',
          'Industrial & automation',
          'Supplier qualification',
        ],
      },
      {
        id: 'muthu-kumar-thangavel',
        name: 'Dr. Muthu Kumar Thangavel',
        role: 'Business Development Partner — Germany',
        location: 'Karlsruhe, Germany',
        photo: '/brand/team/muthu-kumar-thangavel.webp',
        focus: [
          'Germany market access',
          'EU research collaboration',
          'Advanced materials',
          'Technology scouting',
        ],
      },
    ],
  },

  network: {
    eyebrow: 'Global Network',
    heading: 'One firm, seven markets',
    lead: 'Headquartered in Taiwan, with a branch office in India and business development partners on the ground in South Korea, the United States, Germany, Singapore and Australia. Every market has someone who lives there, speaks the language and can visit a factory this week.',
    hqLabel: 'Headquarters',
    repLabel: 'Business Development Representative',
    coreLabel: 'Office',
    coverageNote:
      'Taiwan is the head office and the legal entity, with a branch in India. Everywhere else, a resident partner is the first point of contact for their region. Technical evaluation, contracting and delivery are run centrally from Taiwan, so you get local access without a fragmented engagement — one team accountable for the whole project, wherever it runs.',
    locations: [
      {
        id: 'taipei',
        city: 'Taipei',
        country: 'Taiwan',
        role: 'Headquarters & legal entity',
        type: 'hq',
        core: true,
        detail: 'HariNex Global Co., Ltd. (瀚瑞國際股份有限公司)',
        address: '3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004, Taiwan (R.O.C.)',
        focus: ['Technology sourcing', 'Supplier qualification', 'Contracting', 'Regulatory coordination'],
      },
      {
        id: 'bengaluru',
        city: 'Bengaluru',
        country: 'India',
        role: 'India Branch Office',
        type: 'branch',
        core: true,
        detail: 'Registered branch operation led by a resident Managing Director',
        address: 'No 6, 3rd Floor, 5th Main, 1st Cross, Tata Nagar, Bengaluru 560092, Karnataka, India',
        focus: ['Market entry', 'Manufacturing partners', 'Life sciences', 'Site visits'],
      },
      {
        id: 'michigan',
        city: 'Michigan',
        country: 'United States',
        role: 'North America Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and partner access across North America',
        address: '',
        focus: ['North America entry', 'Advanced materials', 'Mobility & automotive', 'Distribution'],
      },
      {
        id: 'seoul',
        city: 'Seoul',
        country: 'South Korea',
        role: 'Korea Representative',
        type: 'rep',
        core: false,
        detail: 'Business development and partner access across the Korean market',
        address: '',
        focus: ['Market access', 'Electronics & materials', 'Partner sourcing', 'Trade missions'],
      },
      {
        id: 'germany',
        city: 'Karlsruhe',
        country: 'Germany',
        role: 'Germany Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and research links across the EU',
        address: '',
        focus: ['Germany market access', 'EU research collaboration', 'Advanced materials', 'Technology scouting'],
      },
      {
        id: 'singapore',
        city: 'Singapore',
        country: 'Singapore',
        role: 'Singapore Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and partner access across ASEAN',
        address: '',
        focus: ['Singapore market access', 'ASEAN partnerships', 'Industrial & automation', 'Supplier qualification'],
      },
      {
        id: 'australia',
        city: 'Australia',
        country: 'Australia',
        role: 'Australia Business Development',
        type: 'rep',
        core: false,
        detail: 'Business development and life sciences partner access',
        address: '',
        focus: ['Australia market entry', 'Life sciences partnerships', 'Pharmaceutical development', 'Technology scouting'],
      },
    ],
  },

  engagements: {
    eyebrow: 'Selected Engagements',
    heading: 'Work we are running now',
    lead: 'Two mandates currently in progress. Both run in the direction the model is built for: a specific technical or commercial requirement on one side, matched to a counterparty we have verified on the other.',
    statusLabel: 'In progress',
    sectorLabel: 'Sector',
    items: [
      {
        id: 'd2p-biosolutions',
        client: 'D2P Biosolutions',
        clientMeta: 'Bengaluru, India',
        sector: 'Biotech & life sciences',
        from: 'Taiwan',
        to: 'India',
        title: 'Monoclonal antibody sourcing from Taiwan',
        body: 'Identifying and qualifying Taiwanese suppliers of monoclonal antibodies against the client’s technical specification, then structuring the supply arrangement — supplier evaluation, sample validation and the documentation the shipment has to travel with.',
      },
      {
        id: 'algafit-nutrition',
        client: 'Algafit Nutrition Private Limited',
        clientMeta: 'India',
        sector: 'Food & agricultural exports',
        from: 'India',
        to: 'Taiwan',
        title: 'Taiwanese buyers for organic dry fruit exports',
        body: 'Buyer identification and introduction in Taiwan for organic dry fruit exports — mapping importers and distributors, making the approach in the local language, and supporting the commercial conversation through to terms.',
      },
    ],
  },

  collaborators: {
    eyebrow: 'Collaborators',
    heading: 'Organisations we work with',
    lead: 'The companies currently working with us, and what each engagement involves. The list is short because it is real rather than illustrative — every name here is a live piece of work.',
    marketLabel: 'Market',
    sectorLabel: 'Sector',
    workLabel: 'Engagement',
    statusLabel: 'In progress',
    note: 'We do not list outcomes until there are outcomes to list, and we do not name an organisation without asking first.',
    partnersHeading: 'Delivery partners',
    partnersLead:
      'Engineering capability we do not hold in-house. Named here because the work is theirs rather than ours: where a project needs it we either introduce the client directly, or hold the relationship and coordinate their delivery alongside our own.',
    partnersProvidesLabel: 'Provides',
    partnersModelLabel: 'How we work together',
    partners: [
      {
        id: 'raa-tech',
        name: 'RAA Tech Engineering Pvt Ltd',
        country: 'India',
        sector: 'Industrial automation & control systems',
        provides: [
          'SCADA & DCS configuration and commissioning',
          'PLC programming and commissioning',
          'Industrial networking & protocol integration',
        ],
        model:
          'Closes the gap between sourcing equipment and running it. Where a client buys a control system abroad and needs it commissioned in India, RAA Tech performs the engineering; depending on the project we either introduce them to the client directly or coordinate their work alongside our sourcing, translation and regulatory support.',
      },
    ],
    items: [
      {
        id: 'algafit-nutrition',
        name: 'Algafit Nutrition Private Limited',
        country: 'India',
        sector: 'Food & agricultural exports',
        from: 'India',
        to: 'Taiwan',
        work: 'Buyer identification and introduction in Taiwan for organic dry fruit exports — mapping importers and distributors, making the approach in the local language, and supporting the commercial conversation through to terms.',
      },
      {
        id: 'd2p-biosolutions',
        name: 'D2P Biosolutions',
        country: 'India',
        sector: 'Biotech & life sciences',
        from: 'Taiwan',
        to: 'India',
        work: 'Identifying and qualifying Taiwanese suppliers of monoclonal antibodies against the client’s technical specification, then structuring the supply arrangement — supplier evaluation, sample validation and the documentation the shipment has to travel with.',
      },
    ],
  },

  insights: {
    eyebrow: 'Case Studies & Insights',
    heading: 'Perspectives on cross-border technology transfer',
    lead: 'Practical notes on cross-border technology, sourcing and compliance.',
    comingSoon: 'Article coming soon',
    items: [
      { id: 'taiwan-outward', category: 'Market entry', title: 'Why Taiwanese companies should look outward', excerpt: 'The commercial logic behind exporting capability, and the operational realities that decide whether an entry works.' },
      { id: 'tech-transfer', category: 'Technology transfer', title: 'Technology transfer best practices', excerpt: 'What separates a transfer that reaches production from one that stalls at pilot scale.' },
      { id: 'supplier-checklist', category: 'Sourcing', title: 'Supplier qualification checklist', excerpt: 'The structured evaluation we run before recommending any manufacturing partner.' },
      { id: 'doing-business-taiwan', category: 'Market entry', title: 'Doing business in Taiwan', excerpt: 'Company structures, regulatory posture and the cultural conventions that matter in practice.' },
      { id: 'trade-opportunities', category: 'Trade', title: 'Taiwan–global trade opportunities', excerpt: "Where Taiwan's industrial strengths meet genuine demand in the markets we cover." },
      { id: 'localisation', category: 'Localisation', title: 'Website localisation for international companies', excerpt: 'Why literal translation fails, and what a properly localised bilingual presence requires.' },
    ],
  },

  faq: {
    eyebrow: 'Common Questions',
    heading: 'Questions we get asked before the first call',
    lead: 'If your question is not here, ask it directly — we answer plainly rather than routing you to a brochure.',
    items: [
      {
        q: 'Do you sign an NDA before any technical disclosure?',
        a: 'Yes, and we prefer to. We will sign your NDA or provide a mutual one before you share any technical detail. Nothing technical is discussed with a third party until an agreement is in place.',
      },
      {
        q: 'Who owns the intellectual property in a technology transfer?',
        a: 'The licensor does, unless the agreement says otherwise. Our role is to structure the transfer so ownership, field of use, territory and improvement rights are explicit before anything is signed. We coordinate with qualified IP counsel on the drafting itself — we are not a law firm.',
      },
      {
        q: 'Can you provide translations for regulatory submissions?',
        a: 'We produce technical translations between Traditional Chinese and English for regulatory documentation, including CMC sections, technical files and safety data sheets. Where a submission requires certification or notarisation, we coordinate that separately — tell us the receiving authority and we will confirm what is needed.',
      },
      {
        q: 'How do you charge?',
        a: 'Consultation and advisory work is quoted as a fixed fee against a defined scope. Sourcing and transfer projects are milestone-based. Ongoing support is a monthly retainer. Every engagement is quoted in writing before it starts, and scope changes are quoted separately rather than appearing on an invoice.',
      },
      {
        q: 'Which markets do you work in?',
        a: 'Seven: Taiwan, India, South Korea, the United States, Germany, Singapore and Australia. Each has a partner who lives there, and every engagement is run to the same model from the Taiwan head office. Ask about anywhere else and we will tell you honestly whether we can help.',
      },
      {
        q: 'What happens if a supplier fails your evaluation?',
        a: 'We tell you, with the evidence, and move to the next candidate. We are paid for the evaluation, not for placing a particular supplier, so there is no incentive to pass a factory that should not pass.',
      },
      {
        q: 'How quickly can you arrange a factory visit?',
        a: 'For a shortlisted Taiwanese supplier, typically within two to three weeks including scheduling and preparation. Indian site visits are coordinated through our Bangalore representative. We prepare a briefing pack and provide interpretation for the visit itself.',
      },
      {
        q: 'Are you a law firm or a licensed financial adviser?',
        a: 'No. We provide advisory, coordination and localisation services. We do not give legal, tax, investment or accounting advice, and we coordinate with appropriately qualified professionals where a matter requires it.',
      },
    ],
  },

  quickForm: {
    heading: 'Ask about this service',
    lead: 'A short message is enough to start. We reply to qualified enquiries within two working days.',
    name: 'Your name',
    email: 'Work email',
    message: 'What do you need?',
    messagePh: 'A sentence or two about the technology, market or problem.',
    submit: 'Send enquiry',
    submitting: 'Sending…',
    success: 'Thank you — your enquiry has been received.',
    errorName: 'Please enter your name.',
    errorEmail: 'Please enter a valid email address.',
    errorMessage: 'Please add a little more detail (at least 10 characters).',
  },

  capabilityPage: {
    backToAll: 'All capabilities',
    overview: 'Overview',
    relatedHeading: 'Other capabilities',
    talkHeading: 'Talk to us about this',
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
    infoHeading: 'Offices & representatives',
    offices: [
      {
        city: 'Taipei, Taiwan',
        role: 'Headquarters & legal entity',
        detail: '3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004',
      },
      {
        city: 'Bengaluru, India',
        role: 'India Branch Office',
        detail: 'No 6, 3rd Floor, 5th Main, 1st Cross, Tata Nagar, Bengaluru 560092, Karnataka',
      },
      {
        city: 'Michigan, United States',
        role: 'North America Business Development',
        detail: 'Business development & partner access',
      },
      {
        city: 'Seoul, South Korea',
        role: 'Korea Representative',
        detail: 'Business development & partner access',
      },
    ],
    directHeading: 'Direct',
    emailLabel: 'Email',
    mobileLabel: 'Mobile',
    whatsappLabel: 'WhatsApp',
    whatsappCta: 'Message us on WhatsApp',
    sameLineNote: 'Mobile and WhatsApp are the same number.',
    responseNote: 'We aim to respond to qualified inquiries within two working days.',
  },

  careers: {
    eyebrow: 'Careers',
    heading: 'Join our global network',
    lead: 'We work with a distributed network of specialists across both markets.',
    roles: ['Technical Consultants', 'Business Advisors', 'Translators & Interpreters', 'Web Developers', 'Industry Experts'],
    cta: 'Introduce yourself',
  },

  cookies: {
    title: 'Storage on this site',
    body: 'We do not use advertising or analytics cookies, and we do not track you across other websites. Two things are kept in your browser, and nothing is sent to us:',
    items: [
      'Your language choice (English or 繁體中文), so pages remember it',
      'This acknowledgement, so the notice does not reappear',
    ],
    accept: 'Accept',
    decline: 'Decline',
    policy: 'Privacy Policy',
  },

  footer: {
    blurb: 'Connecting Taiwan with the world through technology, innovation and trusted partnerships.',
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
    shortTagline: '連結全球創新與值得信賴的夥伴關係',
    description:
      '提供國際技術移轉、企業貿易顧問與專業技術在地化服務。總部設於台灣，並在印度、南韓與美國派駐代表。',
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
    bridge: '全球市場',
    team: '團隊成員',
    insights: '洞察觀點',
    contact: '聯絡我們',
    capabilitiesIntro: '七大專業服務，於兩地市場完整交付。',
  },

  hero: {
    badge: '總部設於台灣 · 服務遍及全球',
    title: '連結全球創新與值得信賴的夥伴關係',
    titleLines: ['連結全球創新', '與值得信賴的', '夥伴關係'],
    subtitle:
      '瀚瑞國際協助企業透過技術移轉、商務顧問、供應商採購、技術翻譯、數位解決方案與國際專案管理，在全球市場建立連結、展開合作並持續成長。',
    primaryCta: '預約免費諮詢',
    secondaryCta: '瀏覽服務項目',
    flowVia: '台灣',
    flowTo: '全球',
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
        value: '7',
        suffix: '',
        label: '七個市場，同一團隊',
        detail: '台灣、印度、南韓、美國、德國、新加坡與澳洲，由單一負責團隊統籌執行。',
      },
      {
        value: '',
        suffix: '',
        label: '先進材料與永續解決方案',
        detail: '特用化學、複合材料與永續配方，服務受管制產業。',
      },
      {
        value: '',
        suffix: '',
        label: '法規與在地化一站式支援',
        detail: '文件製作、法規協調與技術翻譯納入同一服務範圍。',
      },
    ],
  },

  welcome: {
    eyebrow: '歡迎',
    heading: '值得信賴的全球商務夥伴',
    body: [
      '瀚瑞國際是一家國際商務與技術顧問公司，致力於協助企業在全球建立具實質意義的合作夥伴關係。',
      '我們結合技術專業、文化理解與全球市場知識，讓國際商務變得單純。無論您需要的是技術夥伴、製造供應商、研究合作或數位轉型，我們都能協助專案從概念走向落地執行。',
    ],
  },

  about: {
    eyebrow: '關於我們',
    heading: '在全球建立更穩固的商務連結',
    lead: '瀚瑞國際成立的願景，是弭平區域創新與全球機會之間的落差。',
    body: [
      '我們的團隊結合科學知識、國際專案經驗與業務開發專業，協助組織尋找夥伴、評估技術、協調專案，並建立長期合作關係。',
      '我們相信，成功的國際商務仰賴信任、技術上的相互理解，以及有效的溝通。',
    ],
    visionTitle: '我們的願景',
    vision: '成為創新、製造與國際合作領域中，全球領先的技術與商務橋樑。',
    missionTitle: '我們的使命',
    mission:
      '透過值得信賴的顧問服務、技術合作夥伴、供應商網絡與數位解決方案，簡化跨境商務並創造長期價值。',
    bridgeOrigin: '台灣',
    bridgeOriginRole: '研發、技術源頭、精密製造',
    bridgeDest: '目標市場',
    bridgeDestRole:
      '產業放大、市場進入與通路布建；在我們營運的每一個市場，皆採行相同模式。',
    bridgeLabel: '技術橋樑',
    bridgeHeading: '一個源頭、七個市場、一個負責到底的團隊。',
    bridgeLead:
      '技術、製造產能與簽約主體都在台灣，其他每一個市場則由當地常駐夥伴負責。點選市場即可查看當地負責人與其涵蓋範圍。',
    bridgeRoleLabel: '當地據點',
    bridgeFocusLabel: '該市場涵蓋範圍',
    bridgeHint: '請選擇市場',
    bridgeOriginTag: '源頭',
    bridgeDestTag: '目標市場',
    corridorHeading: '這座橋樑實際運送的是什麼',
    corridorLead:
      '運送的不是貨物，而是一套流程。向下捲動，即可跟隨一件委託案從台灣端一路走到目標市場中已簽約並持續支援的合作關係。',
    corridorStageLabel: '階段',
    corridorOfLabel: '／共',
    corridorHint: '捲動以前進',
    corridorMarketsLabel: '目標市場',
    whyUs: {
      heading: '選擇瀚瑞國際的理由',
      items: [
        { title: '技術專業', body: '在高科技與受管制產業具備深厚的專業知識。' },
        { title: '國際經驗', body: '在技術與商品化領域擁有跨境實務成績。' },
        { title: '全球網絡', body: '擁有廣泛的產業、學術與商務夥伴網絡。' },
        { title: '全程支援', body: '從初期範疇界定到落地執行，提供完整指引。' },
        { title: '多語溝通能力', body: '跨越語言與商業文化的順暢溝通。' },
      ],
    },
  },

  capabilities: {
    eyebrow: '服務能力',
    heading: '八大專業服務，單一負責團隊',
    lead: '每項服務均可獨立委託；整合運用時，可涵蓋從技術發掘到在第二市場落地執行的完整流程。',
    items: [
      {
        id: 'technology-transfer',
        short: '技術移轉',
        icon: 'atom',
        title: '技術移轉與商品化',
        summary: '將已驗證的技術，從實驗室推進到具授權基礎的規模化工業生產。',
        description:
          '我們負責發掘、評估並建構跨市場組織之間具商業可行性的技術移轉，包括不含雙酚（BPA/BPS-free）的紡織化學品授權、生技智慧財產、試量產放大流程與共同開發協議。技術實地查核由化學專業人員執行，因此技術是依據數據被評估，而非依據簡報。',
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
        short: '商務顧問',
        icon: 'handshake',
        title: '商務顧問、媒合與商務團',
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
        tags: ['市場進入', '合資與外商投資', '商務團', '實地查核'],
      },
      {
        id: 'supplier-sourcing',
        short: '供應商採購',
        icon: 'factory',
        title: '策略性供應商採購',
        summary: '橫跨我們各市場、且經實地驗證的合格製造夥伴。',
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
        short: '技術翻譯',
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
        short: '數位解決方案',
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
        short: '法規協調',
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
        id: 'project-management',
        short: '專案管理',
        icon: 'clipboard',
        title: '國際專案管理',
        summary: '橫跨多國、多語言與多時區的專案，由單一窗口全權負責。',
        description:
          '跨境專案的失敗，往往發生在各方之間的縫隙，而非任何一方內部。我們承擔統籌角色，負責時程、範疇、文件、問題升級與會議之間的後續追蹤，讓一個同時牽涉台灣供應商、印度廠區與美國客戶的專案，有單一負責人，而不是三方各自以為別人會處理。',
        deliverables: [
          '專案規劃與里程碑追蹤',
          '跨時區多方協調',
          '文件管控與版本管理',
          '風險與問題升級管理',
          '雙語進度報告',
          '交付後檢討與移交',
        ],
        tags: ['統籌協調', '里程碑', '進度報告', '移交'],
      },
      {
        id: 'industrial-automation',
        short: '工業自動化',
        icon: 'cpu',
        title: '工業自動化與控制系統',
        summary:
          '設備到廠之後的控制系統整合 — SCADA、DCS 與 PLC 工程，由本公司於印度的自動化夥伴執行。',
        description:
          '採購設備與讓設備順利運轉是兩個不同的問題，跨境設備專案通常卡在後者。本項服務涵蓋控制系統：完成組態、程式撰寫與試車，讓進口設備能在目標廠區實際運作。工程作業由本公司印度自動化夥伴 RAA Tech Engineering Pvt Ltd 執行。本公司負責釐清需求、跨語言傳遞技術規格，並視專案需要直接為客戶引薦，或協調其交付並搭配採購與法規作業。對方的工程團隊屬於對方，本公司據實說明，不會將其呈現為本公司人員。',
        deliverables: [
          'SCADA 與 DCS 組態及試車',
          'PLC 程式撰寫及試車',
          '工業網路與通訊協定整合',
          '依客戶需求界定控制系統範疇',
          '雙語技術簡報與供應商聯繫',
          '試車時程協調',
        ],
        tags: ['SCADA / DCS', 'PLC', '試車', '印度'],
      },
    ],
  },

  industries: {
    eyebrow: '產業領域',
    heading: '技術深度足以決定成敗的產業',
    lead: '我們專注於科學背景能構成真正優勢的領域，而非僅是簡報上的宣稱。',
    items: [
      {
        id: 'bp-free',
        icon: 'test-tube',
        title: '無雙酚（BPA/BPS-Free）技術',
        body: '不含 BPA 與 BPS 的紡織助劑與機能性後整理技術，為面臨限用物質規範日益嚴格的紡織廠與品牌提供授權、移轉與量產放大。',
        pills: ['無 BPA', '無 BPS', '紡織助劑', 'ZDHC Level 3', 'RSL 合規'],
      },
      {
        id: 'chemicals',
        icon: 'flask',
        title: '特用化學與先進材料',
        body: '機能性後整理、複合材料、接著劑、永續配方與工業用製程化學。',
        pills: ['機能性後整理', '複合材料與接著劑', '紡織化學品', '永續配方'],
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
    eyebrow: '全球市場',
    heading: '我們在哪裡營運，以及為什麼',
    lead: '台灣是我們的根據地與支點。我們以台灣為起點，將同一套模式推展至橫跨亞洲、歐洲、北美與大洋洲的七個市場，每一個市場都有常駐當地的夥伴。',
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
    indiaTitle: '為什麼從台灣走向全球',
    indiaLead: '深厚的產業基礎，價值取決於它能觸及多遠。',
    indiaPoints: [
      '七個市場，各有常駐夥伴',
      '橫跨亞洲、歐洲、北美與大洋洲',
      '在地語言與在地商業文化',
      '實地訪廠無須長途等待',
      '同一支負責團隊，而非轉介鏈',
      '技術評估由台灣統一執行',
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
      { n: '02', title: '發掘合作夥伴', body: '在我們的全球網絡中進行結構化搜尋，產出的是精選名單而非通訊錄。' },
      { n: '03', title: '評估機會', body: '技術與商務實地查核，涵蓋能力、品質系統、智財地位與財務狀況。' },
      { n: '04', title: '安排會議', body: '引薦、實地參訪與談判，並提供專業口譯與事前準備的簡報資料。' },
      { n: '05', title: '談判與執行', body: '協助處理條件書、授權架構、供應協議，以及使其得以實際運作的文件。' },
      { n: '06', title: '長期專案支援', body: '持續協調、法規與翻譯支援，並隨合作關係成熟進行定期檢視。' },
    ],
  },

  leadership: {
    eyebrow: '經營團隊與治理',
    heading: '經營團隊',
    lead: '公司經營與法定代表設於台灣，並涵蓋印度分公司、專案交付，以及具現職科學家背景的首席顧問。',
    people: [
      {
        id: 'chia-ling-shih',
        name: '施佳玲',
        nameLocal: 'Chia-Ling Shih',
        role: '創辦人暨董事長',
        location: '台灣，新北市',
        photo: '/brand/team/chia-ling-shih.webp',
        focus: ['公司治理', '區域營運', '政府聯繫', '製程化學'],
      },
      {
        id: 'sivarasan-ganesan',
        name: 'Dr. Sivarasan Ganesan',
        role: '集團執行長暨管理合夥人',
        location: '台灣',
        photo: '/brand/team/sivarasan-ganesan.webp',
        focus: ['集團策略', '技術商品化', '環境與水處理技術', '綠色科技'],
      },
      {
        id: 'morris-ma',
        name: '馬士軒',
        nameLocal: 'Morris S.S. Ma',
        role: '管理合夥人 — 台灣營運',
        location: '台灣，高雄',
        photo: '/brand/team/morris-ma.webp',
        focus: ['台灣營運', '供應商資格認定', '工廠與工安稽核', '先進材料', '綠色科技'],
      },
      {
        id: 'andy-kao',
        name: 'Andy Kao',
        role: '管理合夥人 — 台灣資訊服務',
        location: '台灣，新竹',
        photo: '/brand/team/andy-kao.webp',
        focus: ['資訊服務交付', '伺服器與目錄架構', '虛擬化', '容器化'],
      },
      {
        id: 'ganesh-kumar',
        name: '甘納緒 博士',
        nameLocal: 'Dr. D. Ganesh Kumar',
        role: '首席顧問',
        location: '台灣，新北市',
        photo: '/brand/team/ganesh-kumar.webp',
        focus: ['技術商品化', '業務開發', '技術移轉', '法規策略', '國際合作'],
      },
      {
        id: 'viney-g',
        name: 'Viney G',
        role: '印度分公司 總經理',
        location: '印度 卡納塔卡邦 班加羅爾',
        photo: '/brand/team/viney-g.webp',
        focus: ['印度市場進入', '製造夥伴', '供應商資格認定', '實地訪廠'],
      },
      {
        id: 'lenin-nachimuthu',
        name: 'Lenin Nachimuthu',
        role: '專案管理主管 — 印度分公司',
        location: '印度 坦米爾納杜邦 維洛爾',
        photo: '/brand/team/lenin-nachimuthu.webp',
        focus: ['樣品驗證關卡', '供應商風險緩解計畫', '法人設立進度追蹤', 'SLA 整合時程'],
      },
    ],
  },

  team: {
    eyebrow: '團隊成員',
    heading: '實際執行工作的人',
    lead: '兩個層級，我們明確區分：公司的經營幹部，以及代表公司在各市場與各專業領域的全球團隊。',
    leadershipTier: '經營團隊',
    regionalTier: '全球團隊',
    contactLabel: '聯絡方式',
    openRoleLabel: '人選確認中',
    openRoleBody: '本市場的人選正在確認中。在此之前，相關諮詢由台灣總部直接處理。',
  },

  regional: {
    eyebrow: '全球團隊',
    heading: '每個市場都有在地負責人',
    lead: '全球團隊的每位成員都是該市場或該專業領域的第一線窗口，能夠親自與對方當面會談，而不是在不方便的時段透過電話溝通。',
    people: [
      {
        id: 'vadivalagan-chithravel',
        name: 'Dr. Vadivalagan Chithravel',
        role: '北美業務開發夥伴',
        location: '美國 密西根州 安娜堡',
        photo: '/brand/team/vadivalagan-chithravel.webp',
        email: '',
        phone: '',
        phoneHref: '',
        focus: ['北美市場進入', '生命科學合作', '技術發掘', '研究合作'],
      },
      {
        id: 'kanagaraj-naveen',
        name: 'Dr. Kanagaraj Naveen',
        role: '南韓業務開發夥伴',
        location: '南韓 首爾',
        photo: '/brand/team/kanagaraj-naveen.webp',
        email: '',
        phone: '',
        phoneHref: '',
        focus: ['韓國市場准入', '電子與材料採購', '技術實地查核', '製程放大'],
      },
      {
        id: 'ariraman-mathivathanan',
        name: 'Dr. Ariraman Mathivathanan',
        role: '技術專家 — 材料與高分子',
        location: '印度，坦米爾納杜邦，霍蘇爾',
        photo: '/brand/team/ariraman-mathivathanan.webp',
        email: '',
        phone: '',
        phoneHref: '',
        focus: ['特用化學採購', '紡織與塗層技術', '配方實地查核', '技術移轉支援'],
      },
      {
        id: 'manas-chakraborty',
        name: 'Dr. Manas Chakraborty',
        role: '業務開發合夥人 — 澳洲',
        location: '澳洲，伯斯',
        photo: '/brand/team/manas-chakraborty.webp',
        focus: ['澳洲市場進入', '生命科學合作', '製藥開發', '技術發掘'],
      },
      {
        id: 'purusothaman-manogaran',
        name: 'Purusothaman Manogaran',
        role: '業務開發合夥人 — 新加坡',
        location: '新加坡',
        photo: '/brand/team/purusothaman-manogaran.webp',
        focus: ['新加坡市場准入', '東協夥伴關係', '工業與自動化', '供應商資格認定'],
      },
      {
        id: 'muthu-kumar-thangavel',
        name: 'Dr. Muthu Kumar Thangavel',
        role: '業務開發合夥人 — 德國',
        location: '德國，卡爾斯魯厄',
        photo: '/brand/team/muthu-kumar-thangavel.webp',
        focus: ['德國市場准入', '歐盟研究合作', '先進材料', '技術發掘'],
      },
    ],
  },

  network: {
    eyebrow: '全球網絡',
    heading: '一家公司，七個市場',
    lead: '總部設於台灣，於印度設有分公司，並在南韓、美國、德國、新加坡與澳洲派駐業務開發夥伴。每個市場都有長駐當地、通曉語言、本週就能前往工廠實地拜訪的人。',
    hqLabel: '總部',
    repLabel: '業務開發代表',
    coreLabel: '據點',
    coverageNote:
      '台灣是總部所在與法律主體，印度設有分公司。其餘地區皆由常駐當地的夥伴擔任該區域的第一線窗口。技術評估、合約與交付統一由台灣執行，讓您在獲得在地服務的同時，不必面對分散的專案窗口——無論專案在何處進行，都由同一支團隊負責到底。',
    locations: [
      {
        id: 'taipei',
        city: '台北',
        country: '台灣',
        role: '總部與法人登記地',
        type: 'hq',
        core: true,
        detail: '瀚瑞國際股份有限公司（HariNex Global Co., Ltd.）',
        address: '333004 台灣 桃園市龜山區文化七路10號3樓',
        focus: ['技術發掘', '供應商資格認定', '合約簽訂', '法規協調'],
      },
      {
        id: 'bengaluru',
        city: '班加羅爾',
        country: '印度',
        role: '印度分公司',
        type: 'branch',
        core: true,
        detail: '由常駐總經理負責之登記分公司',
        address: 'No 6, 3rd Floor, 5th Main, 1st Cross, Tata Nagar, Bengaluru 560092, Karnataka, India',
        focus: ['市場進入', '製造夥伴', '生命科學', '實地訪廠'],
      },
      {
        id: 'michigan',
        city: '密西根州',
        country: '美國',
        role: '北美業務開發',
        type: 'rep',
        core: false,
        detail: '負責北美市場的業務開發與夥伴對接',
        address: '',
        focus: ['北美市場進入', '先進材料', '移動與車輛產業', '通路布建'],
      },
      {
        id: 'seoul',
        city: '首爾',
        country: '南韓',
        role: '韓國代表',
        type: 'rep',
        core: false,
        detail: '負責韓國市場的業務開發與夥伴對接',
        address: '',
        focus: ['市場准入', '電子與材料', '夥伴發掘', '商務考察'],
      },
      {
        id: 'germany',
        city: '卡爾斯魯厄',
        country: '德國',
        role: '德國業務開發',
        type: 'rep',
        core: false,
        detail: '負責德國市場的業務開發與歐盟研究連結',
        address: '',
        focus: ['德國市場准入', '歐盟研究合作', '先進材料', '技術發掘'],
      },
      {
        id: 'singapore',
        city: '新加坡',
        country: '新加坡',
        role: '新加坡業務開發',
        type: 'rep',
        core: false,
        detail: '負責東協市場的業務開發與夥伴對接',
        address: '',
        focus: ['新加坡市場准入', '東協夥伴關係', '工業與自動化', '供應商資格認定'],
      },
      {
        id: 'australia',
        city: '澳洲',
        country: '澳洲',
        role: '澳洲業務開發',
        type: 'rep',
        core: false,
        detail: '負責澳洲市場的業務開發與生命科學夥伴對接',
        address: '',
        focus: ['澳洲市場進入', '生命科學合作', '製藥開發', '技術發掘'],
      },
    ],
  },

  engagements: {
    eyebrow: '精選委任案例',
    heading: '我們正在執行的專案',
    lead: '目前有兩件進行中的委任。兩者都循著本公司模式所設計的方向推進：一端是明確的技術或商務需求，另一端則是經我們實地查核的合作對象。',
    statusLabel: '進行中',
    sectorLabel: '產業',
    items: [
      {
        id: 'd2p-biosolutions',
        client: 'D2P Biosolutions',
        clientMeta: '印度，班加羅爾',
        sector: '生技與生命科學',
        from: '台灣',
        to: '印度',
        title: '自台灣採購單株抗體',
        body: '依客戶技術規格發掘並評估台灣的單株抗體供應商，進而建構供應架構——包含供應商評估、樣品驗證，以及貨物出運所須隨附的文件。',
      },
      {
        id: 'algafit-nutrition',
        client: 'Algafit Nutrition Private Limited',
        clientMeta: '印度',
        sector: '食品與農產出口',
        from: '印度',
        to: '台灣',
        title: '為有機乾果出口尋找台灣買主',
        body: '為有機乾果出口在台灣進行買主發掘與引薦——盤點進口商與通路商、以在地語言進行接觸，並支援商務洽談直至議定條件。',
      },
    ],
  },

  collaborators: {
    eyebrow: '合作夥伴',
    heading: '與我們合作的企業',
    lead: '目前與我們合作的企業，以及各項委任的具體內容。名單簡短，是因為它真實而非示意——此處每一個名稱都是進行中的實際工作。',
    marketLabel: '市場',
    sectorLabel: '產業',
    workLabel: '委任內容',
    statusLabel: '進行中',
    note: '在尚未產生成果之前，我們不會列出成果；未事先徵詢同意，我們也不會具名任何一家企業。',
    partnersHeading: '交付夥伴',
    partnersLead:
      '本公司不自行具備的工程能力。之所以在此具名，是因為該項工作由對方執行而非本公司：視專案需要，我們或直接為客戶引薦，或由本公司維繫客戶關係並協調其交付。',
    partnersProvidesLabel: '提供項目',
    partnersModelLabel: '合作方式',
    partners: [
      {
        id: 'raa-tech',
        name: 'RAA Tech Engineering Pvt Ltd',
        country: '印度',
        sector: '工業自動化與控制系統',
        provides: ['SCADA 與 DCS 組態及試車', 'PLC 程式撰寫及試車', '工業網路與通訊協定整合'],
        model:
          '銜接「採購設備」與「設備上線」之間的落差。當客戶於海外採購控制系統並需在印度完成試車時，工程作業由 RAA Tech 執行；視專案需要，我們或直接為客戶引薦，或由本公司協調其作業，並搭配本公司的採購、翻譯與法規支援。',
      },
    ],
    items: [
      {
        id: 'algafit-nutrition',
        name: 'Algafit Nutrition Private Limited',
        country: '印度',
        sector: '食品與農產出口',
        from: '印度',
        to: '台灣',
        work: '為有機乾果出口在台灣進行買主發掘與引薦——盤點進口商與通路商、以在地語言進行接觸，並支援商務洽談直至議定條件。',
      },
      {
        id: 'd2p-biosolutions',
        name: 'D2P Biosolutions',
        country: '印度',
        sector: '生技與生命科學',
        from: '台灣',
        to: '印度',
        work: '依客戶技術規格發掘並評估台灣的單株抗體供應商，進而建構供應架構——包含供應商評估、樣品驗證，以及貨物出運所須隨附的文件。',
      },
    ],
  },

  insights: {
    eyebrow: '案例與洞察',
    heading: '跨境技術移轉的觀察與觀點',
    lead: '關於跨境技術、採購與法規合規的實務筆記。',
    comingSoon: '文章即將上線',
    items: [
      { id: 'taiwan-outward', category: '市場進入', title: '台灣企業為何應該向外布局', excerpt: '輸出自身能力背後的商業邏輯，以及決定市場進入成敗的營運現實。' },
      { id: 'tech-transfer', category: '技術移轉', title: '技術移轉最佳實務', excerpt: '能推進到量產的技術移轉，與停滯在試量產階段者，差別何在。' },
      { id: 'supplier-checklist', category: '供應鏈', title: '供應商資格認定檢核表', excerpt: '在推薦任何製造夥伴之前，我們所執行的結構化評估流程。' },
      { id: 'doing-business-taiwan', category: '市場進入', title: '在台灣經商', excerpt: '公司架構、法規態勢，以及實務上真正重要的文化慣例。' },
      { id: 'trade-opportunities', category: '貿易', title: '台灣與全球的貿易機會', excerpt: '台灣的產業優勢，在我們所涵蓋的市場中與真實需求交會之處。' },
      { id: 'localisation', category: '在地化', title: '國際企業的網站在地化', excerpt: '為何逐字翻譯必然失敗，以及真正到位的雙語形象需要什麼。' },
    ],
  },

  faq: {
    eyebrow: '常見問題',
    heading: '第一次通話前，客戶最常問我們的問題',
    lead: '若這裡沒有您的問題，歡迎直接詢問——我們會據實回答，而不是把您導向一份型錄。',
    items: [
      {
        q: '在進行任何技術揭露之前，貴公司會簽署保密協議嗎？',
        a: '會，而且我們主動建議這麼做。在您分享任何技術細節之前，我們可以簽署貴公司的保密協議，或提供雙方互簽的版本。在協議完成之前，我們不會與任何第三方討論技術內容。',
      },
      {
        q: '技術移轉中的智慧財產權歸屬於誰？',
        a: '除非協議另有約定，否則歸屬於授權方。我們的角色是在簽署之前，把所有權、使用範圍、地域與改良技術的權利明確界定清楚。文件的實際撰擬則與具資格的智財律師協同進行——本公司並非律師事務所。',
      },
      {
        q: '貴公司能提供法規送件所需的翻譯嗎？',
        a: '我們提供繁體中文與英文之間的法規文件技術翻譯，包括 CMC 章節、技術文件與安全資料表。若送件需要認證或公證，我們會另行協調；請告知受理機關，我們會確認所需文件。',
      },
      {
        q: '貴公司如何收費？',
        a: '顧問與諮詢工作依明確範疇報價，採固定費用；採購與技術移轉專案採里程碑計費；持續性支援則為月費制。每一項委任都會在開始前提供書面報價，範疇如有變動亦會另行報價，不會直接出現在帳單上。',
      },
      {
        q: '貴公司服務哪些市場？',
        a: '共七個：台灣、印度、南韓、美國、德國、新加坡與澳洲。每個市場都有常駐當地的夥伴，所有委任皆由台灣總部依同一套模式執行。若是其他地區，請直接詢問，我們會據實告知能否協助。',
      },
      {
        q: '如果供應商未通過貴公司的評估，會如何處理？',
        a: '我們會據實告知並提供評估佐證，接著評估下一個候選對象。我們的報酬來自評估工作本身，而非促成特定供應商，因此沒有讓不合格工廠過關的誘因。',
      },
      {
        q: '安排訪廠需要多久？',
        a: '已列入候選名單的台灣供應商，通常在兩到三週內可完成安排與前置準備。印度的實地拜訪則由班加羅爾代表協調。我們會準備行前簡報資料，並於拜訪當日提供口譯。',
      },
      {
        q: '貴公司是律師事務所或持照財務顧問嗎？',
        a: '不是。我們提供顧問、協調與在地化服務，不提供法律、稅務、投資或會計意見；若事項有此需要，我們會與具備適當資格的專業人士協同辦理。',
      },
    ],
  },

  quickForm: {
    heading: '詢問這項服務',
    lead: '簡短訊息即可開始。我們會在兩個工作天內回覆有效諮詢。',
    name: '您的姓名',
    email: '公司電子郵件',
    message: '您需要什麼協助？',
    messagePh: '請用一兩句話說明相關技術、目標市場或您想解決的問題。',
    submit: '送出諮詢',
    submitting: '傳送中…',
    success: '感謝您，我們已收到您的諮詢。',
    errorName: '請輸入您的姓名。',
    errorEmail: '請輸入有效的電子郵件地址。',
    errorMessage: '請再補充一些細節（至少 10 個字元）。',
  },

  capabilityPage: {
    backToAll: '所有服務能力',
    overview: '服務概述',
    relatedHeading: '其他服務能力',
    talkHeading: '與我們討論這項服務',
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
    infoHeading: '據點與代表',
    offices: [
      {
        city: '台灣 台北',
        role: '總部與法人登記地',
        detail: '333004 桃園市龜山區文化七路10號3樓',
      },
      {
        city: '印度 班加羅爾',
        role: '印度分公司',
        detail: 'No 6, 3rd Floor, 5th Main, 1st Cross, Tata Nagar, Bengaluru 560092, Karnataka',
      },
      {
        city: '美國 密西根州',
        role: '北美業務開發',
        detail: '業務開發與夥伴對接',
      },
      {
        city: '南韓 首爾',
        role: '韓國代表',
        detail: '業務開發與夥伴對接',
      },
    ],
    directHeading: '直接聯繫',
    emailLabel: '電子郵件',
    mobileLabel: '行動電話',
    whatsappLabel: 'WhatsApp',
    whatsappCta: '透過 WhatsApp 與我們聯繫',
    sameLineNote: '行動電話與 WhatsApp 為同一號碼。',
    responseNote: '我們力求於兩個工作天內回覆有效諮詢。',
  },

  careers: {
    eyebrow: '人才招募',
    heading: '加入我們的全球網絡',
    lead: '我們與橫跨兩地市場的專業人才網絡協同合作。',
    roles: ['技術顧問', '商務顧問', '筆譯與口譯人員', '網站開發人員', '產業專家'],
    cta: '自我介紹',
  },

  cookies: {
    title: '本網站的瀏覽器儲存',
    body: '本網站不使用廣告或分析用 Cookie，也不會跨網站追蹤您。僅有兩項資料存放於您的瀏覽器，且不會傳送給我們：',
    items: ['您選擇的語言（English 或繁體中文），供頁面之間記憶使用', '本則告知的確認狀態，以免重複顯示'],
    accept: '接受',
    decline: '拒絕',
    policy: '隱私權政策',
  },

  footer: {
    blurb: '以技術、創新與值得信賴的夥伴關係，連結台灣與世界。',
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
   Contact details. Confirmed by the company 2026-08-03.
   Mobile and WhatsApp are the same line.
-------------------------------------------------------------------*/
export const CONTACT = {
  email: 'hello@harinexglobal.com',
  phone: '+886 974 025 045',
  phoneHref: '+886974025045',
  /* wa.me requires the number with no '+', spaces or dashes. */
  whatsapp: '886974025045',
  whatsappUrl: 'https://wa.me/886974025045',
  taipei: 'Taipei, Taiwan',
  india: 'Chennai, India',
  linkedin: '#',
} as const;

/* ------------------------------------------------------------------
   Social profiles. An empty href hides the icon entirely, so a profile
   that does not exist yet simply does not render — LinkedIn is waiting
   on a company page URL.
-------------------------------------------------------------------*/
export const SOCIAL = [
  { id: 'whatsapp', label: 'WhatsApp', href: CONTACT.whatsappUrl },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61592438056685',
  },
  { id: 'x', label: 'X', href: 'https://x.com/HariNexGlobal' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/harinexglobal/' },
  // Public company page. The admin dashboard URL supplied
  // (/company/143089961/admin/dashboard/) is not usable here — it sends anyone
  // who is not an administrator of the page to a login wall.
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/143089961/' },
] as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  capabilities: '/capabilities',
  industries: '/industries',
  bridge: '/markets',
  collaborators: '/markets/collaborators',
  team: '/about/team',
  insights: '/insights',
  contact: '/contact',
} as const;
