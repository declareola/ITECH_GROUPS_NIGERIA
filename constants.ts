export const CORE_VALUES: string[] = [
  "Innovation",
  "Excellence",
  "Integrity",
  "Impact",
  "Collaboration",
  "Global Thinking",
  "Continuous Learning",
];

export const DIVISIONS = [
  {
    name: "ITECH AgriSolutions",
    focus: "Data-driven agriculture and digital farming systems.",
    product: {
      name: "AgriSmart",
      description: "Delivers real-time weather, market insights, and farming best practices.",
    },
    goal: "Become Africa’s most advanced AgriTech intelligence network. Targets a 15% rise in yields and 10% drop in post-harvest losses.",
  },
  {
    name: "ITECH Learn",
    focus: "AI-based learning and professional development.",
    product: {
      name: "AI LearnHub",
      description: "A full learning platform for AI, Data, and Python, aligned with global partners like Google, Cisco, Coursera, and 3MTT.",
    },
    goal: "To train one million Africans in emerging tech within five years.",
  },
  {
    name: "ITECH AI Labs",
    focus: "Enterprise AI, automation, and research.",
    product: {
      name: "Cara",
      description: "An AI communication coach for global remote professionals.",
    },
    services: ["AI Automation for businesses", "AI-powered analytics dashboards", "Chatbot systems"],
    goal: "Lead Africa’s AI revolution by building proprietary African language models and locally relevant global AI products.",
  },
  {
    name: "ITECH Data Services",
    focus: "Predictive analytics, data intelligence, and visualization.",
    services: [
      "Predictive analytics for government and private organizations",
      "Interactive dashboards for business intelligence using Tableau, Power BI, SQL, Python, TensorFlow",
      "Enterprise-level training in data-driven decision-making",
    ],
  },
  {
    name: "ITECH RealEstate Hub",
    focus: "Real estate intelligence and smart property technology.",
    product: {
      name: "PropLink",
      description: "Connects realtors, buyers, and investors with verified listings and smart analytics.",
    },
    goal: "To introduce property valuation algorithms and investment forecasting tools.",
  },
  {
    name: "ITECH HealthConnect",
    focus: "Health data analytics and patient intelligence.",
    product: {
      name: "HealthConnect Analytics",
      description: "Transforms healthcare data into actionable insights.",
    },
    goal: "Partner with hospitals and health ministries to improve healthcare decisions through predictive analytics.",
  },
  {
    name: "ITECH Creative Studios",
    focus: "Brand design, web engineering, and digital media.",
    services: ["Web and mobile app design", "eCommerce solutions", "Digital identity creation"],
    goal: "Become Africa’s most trusted digital creative and marketing powerhouse.",
  },
];

export const SERVICES_DATA = [
  {
    id: 1,
    title: 'AI and Automation Solutions',
    description: 'We develop AI-driven systems that automate repetitive processes, increase efficiency, and cut costs.',
    offerings: [
      'AI chatbots and virtual assistants for businesses',
      'Workflow automation and predictive analytics',
      'Natural Language Processing for data interpretation',
      'Machine learning model deployment',
      'Business intelligence dashboards',
    ],
    value: 'You save time, reduce errors, and make data-based decisions faster.',
    icon: 'AiBotIcon',
  },
  {
    id: 2,
    title: 'Data Analytics and Visualization',
    description: 'We transform raw data into clear, actionable insights using modern tools.',
    offerings: [
      'Data cleaning and preprocessing',
      'Predictive modeling and forecasting',
      'Dashboard design with Tableau, Power BI, and Python',
      'SQL and Python-based business reporting',
      'Analytics training for teams',
    ],
    value: 'You understand trends, improve operations, and plan smarter.',
    icon: 'ChartBarIcon',
  },
  {
    id: 3,
    title: 'Professional Portfolio and Website Development',
    description: 'We design and build professional portfolios and websites that position you for success.',
    offerings: [
      'Personal and business portfolio websites',
      'Corporate, eCommerce, and institutional websites',
      'Integration with analytics, contact forms, and social media',
      'SEO optimization for visibility',
      'Brand identity, logo design, and content layout',
    ],
    value: 'You get a fast, mobile-friendly, and professional website that builds trust and credibility.',
    process: [
      'Consultation to understand your goals',
      'UI/UX design using modern frameworks',
      'Web development and testing',
      'Launch and optimization',
      'Ongoing maintenance',
    ],
    idealFor: 'Entrepreneurs, freelancers, professionals, startups, and SMEs.',
    icon: 'CodeBracketIcon',
  },
  {
    id: 4,
    title: 'AgriTech Solutions',
    description: 'We empower farmers and agricultural businesses with digital tools.',
    flagshipProduct: {
      name: 'AgriSmart',
      description: 'A mobile platform for real-time weather, market prices, and best practices.',
    },
    offerings: [
      'Farm data analytics',
      'Weather and crop monitoring',
      'Market linkage systems',
      'Agricultural training platforms',
    ],
    impactGoal: 'Increase yields by 15% and reduce post-harvest losses by 10%.',
    icon: 'LeafIcon',
  },
  {
    id: 5,
    title: 'EdTech and AI Learning Platforms',
    description: 'We build smart learning tools that prepare Africans for digital jobs.',
    flagshipProduct: {
      name: 'AI LearnHub',
      description: 'An AI-driven platform for learning data analytics, AI, Python, and machine learning.',
    },
    features: [
      'Video-based and interactive learning',
      'Skill tracking dashboards',
      'Integrated certification from Google, Cisco, and Coursera',
    ],
    value: 'You gain globally relevant skills for the future of work.',
    icon: 'AcademicCapIcon',
  },
  {
    id: 6,
    title: 'HealthTech and Data Solutions',
    description: 'We provide analytics-driven health solutions that improve performance and patient outcomes.',
    flagshipProduct: {
      name: 'HealthConnect Analytics',
      description: 'Analyzes patient data for better hospital management.',
    },
    offerings: [
      'Healthcare data analysis',
      'Performance dashboards',
      'Predictive tools for a early disease detection',
    ],
    value: 'Hospitals make faster and smarter medical decisions.',
    icon: 'HeartIcon',
  },
  {
    id: 7,
    title: 'Real Estate Digital Platforms',
    description: 'We connect realtors, buyers, and investors through technology.',
    flagshipProduct: {
      name: 'PropLink',
      description: 'A real estate marketplace for property listings and buyer matching.',
    },
    offerings: [
      'Property data dashboards',
      'Market trend analysis',
      'API integrations for real estate companies',
    ],
    value: 'You access real-time insights and verified opportunities.',
    icon: 'BuildingOfficeIcon',
  },
  {
    id: 8,
    title: 'Branding and Creative Solutions',
    description: 'We help businesses establish a strong online identity.',
    offerings: [
      'Brand strategy and identity design',
      'Logo creation and motion graphics',
      'Digital marketing and content strategy',
      'UI/UX design and animation',
    ],
    value: 'You build a consistent and trusted brand image.',
    icon: 'PaintBrushIcon',
  },
];

export const BLOG_POSTS = [
  {
    title: "The Digital Harvest: How AgriTech Is Cultivating Nigeria’s Future",
    slug: "the-digital-harvest-agritech-nigeria",
    aliases: ["digital-harvest-agritech-nigeria"],
    summary: "From satellite telemetry to localized climate forecasts: transforming agricultural yield, post-harvest logistics, and rural food security in Nigeria.",
    date: "24 October 2026",
    icon: "LeafIcon",
    category: "AgriTech",
  },
  {
    title: "Data-Driven Governance: A New Era for Public Services in Africa",
    slug: "data-driven-governance-africa",
    aliases: ["data-driven-governance-africa"],
    summary: "Harnessing administrative data, geospatial registries, and predictive analytics to modernize civic delivery, revenue mobilization, and social welfare.",
    date: "24 October 2026",
    icon: "ChartBarIcon",
    category: "Governance",
  },
  {
    title: "The Pulse of Progress: HealthTech's Impact on Patient Care",
    slug: "healthtech-data-analytics-patient-care-nigeria",
    aliases: ["healthtech-impact-patient-care"],
    summary: "Deploying electronic medical records, predictive clinical analytics, and supply-chain IoT to transform Nigerian healthcare delivery.",
    date: "24 October 2026",
    icon: "HeartIcon",
    category: "HealthTech",
  },
  {
    title: "PropTech in Africa: Building Smarter Real Estate Markets",
    slug: "proptech-africa-smarter-real-estate-markets",
    aliases: ["proptech-africa-real-estate"],
    summary: "Overcoming title fraud, valuation opacity, and liquidity constraints with cadastral GIS mapping, verified property networks, and algorithmic valuation.",
    date: "24 October 2026",
    icon: "BuildingOfficeIcon",
    category: "PropTech",
  },
  {
    title: "Upskilling for Tomorrow: The Role of AI in African Education",
    slug: "ai-education-skills-development-africa",
    aliases: ["ai-in-african-education"],
    summary: "Harnessing personalized learning algorithms, automated tutoring, and localized AI curricula to prepare Africa’s youth for the global knowledge economy.",
    date: "24 October 2026",
    icon: "AcademicCapIcon",
    category: "EdTech",
  },
  {
    title: "Beyond the Hype: Practical AI Applications for African Businesses",
    slug: "practical-ai-applications-african-businesses",
    aliases: ["practical-ai-for-african-businesses"],
    summary: "From predictive supply-chain buffers to indigenous voice customer agents: deploying artificial intelligence that drives real commercial ROI.",
    date: "24 October 2026",
    icon: "AiBotIcon",
    category: "Enterprise AI",
  }
];


export const TARGET_MARKET: string[] = [
  "Governments",
  "Enterprises",
  "Startups",
  "NGOs",
  "Development Partners",
  "Educational Institutions",
  "Individual Professionals",
];

export const COMPETITIVE_ADVANTAGE: string[] = [
  "Multi-sector expertise across AI, agriculture, education, and healthcare.",
  "Integration of advanced automation and data systems.",
  "Cloud-based, globally scalable solutions.",
  "Workforce trained through global certification programs.",
  "Deep impact measurement through real data metrics.",
  "Research partnerships with universities and innovation hubs.",
];

export const REVENUE_STREAMS: string[] = [
  "SaaS subscriptions for Cara, AgriSmart, LearnHub, and PropLink.",
  "AI and data consulting services for governments and corporations.",
  "Software development contracts.",
  "Corporate upskilling programs and fellowships.",
  "Cloud hosting and data analytics products.",
  "Advertising and paid integrations on digital platforms.",
];

export const GROWTH_STRATEGY = [
  {
    phase: "Phase 1",
    description: "Strengthen core products and validate through real user impact.",
  },
  {
    phase: "Phase 2",
    description: "Launch ITECH Academy to train and recruit top African tech talent.",
  },
  {
    phase: "Phase 3",
    description: "Expand across Africa with data centers in Nigeria, Kenya, and Ghana.",
  },
  {
    phase: "Phase 4",
    description: "Open offices in Dubai, London, and San Francisco.",
  },
  {
    phase: "Phase 5",
    description: "Establish ITECH Foundation to fund local innovators and startups.",
  },
];

export const STRATEGIC_GOALS: string[] = [
    "Develop products that dominate global niche markets.",
    "Build proprietary AI systems trained on African data.",
    "Create partnerships with leading global firms such as Google, Microsoft, OpenAI, and AWS.",
    "Establish regional innovation hubs across Africa.",
    "Operate at international standards of data ethics, security, and compliance (ISO, GDPR).",
];

export const GLOBAL_VISIBILITY_PLAN: string[] = [
    "Publish quarterly Africa Tech Intelligence Reports.",
    "Sponsor and speak at global tech summits (Web Summit, AI Expo Africa, Google for Africa).",
    "Collaborate with universities for AI research and talent pipelines.",
    "Build a strong online identity with thought leadership articles and success stories.",
];

export const LEADERSHIP = {
  name: "Olabode Ilesanmi",
  title: "Founder | Data Analyst and AI Specialist",
  bio: "Graduate of the 3MTT Data Analysis and Visualization Program, committed to transforming Africa through intelligent technology.",
  skills: ["SQL", "Python", "Tableau", "Power BI", "AI Automation", "TensorFlow", "React", "Machine Learning"],
};

export const CONTACT_INFO = {
  address: "Opposite Poly Hospital, G.R.A, Lokoja, Kogi State, Nigeria",
  email: "info@itechgroupsnigeria.online",
  phone: "+234 810 757 0878",
  hours: "Monday – Friday, 9:00 AM – 5:00 PM (WAT)",
};

export const QUICK_CONTACT = {
    whatsapp: {
        number: "+2348107570878",
        display: "+234 810 757 0878",
        link: "https://wa.me/2348107570878"
    },
    telegram: {
        username: "@itechgroupsnigeria",
        link: "https://t.me/itechgroupsnigeria"
    }
};

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/itechgroupsng",
  linkedin: "https://www.linkedin.com/company/itech-groups-nigeria/",
  facebook: "https://web.facebook.com/itechgroupsnig",
  instagram: "https://instagram.com/itechgroupsng",
};

export const DEPARTMENTAL_CONTACTS = [
    { name: "General Inquiries & Partnerships", description: "For general questions, collaborations, service inquiries, or media requests.", email: "info@itechgroupsnigeria.online" },
    { name: "Investor Relations", description: "For investment discussions, funding collaborations, or partnerships.", email: "investors@itechgroupsnigeria.online" },
    { name: "Careers", description: "Send your CV and portfolio to join our team.", email: "careers@itechgroupsnigeria.online" },
];

export const FAQS = [
    { q: "How soon do you respond to messages?", a: "Our team is committed to responding to all inquiries within 24 business hours." },
    { q: "Do you offer free consultations?", a: "Yes, we offer complimentary initial consultations to discuss your project needs and how our solutions can help you achieve your goals." },
    { q: "Can I request a demo of your products?", a: "Absolutely. Please use the contact form to specify which product you're interested in, and we will schedule a personalized demo for you." },
];

export const TESTIMONIAL = {
    quote: "ITECH helped us automate our data systems in record time. Their team is professional, reliable, and deeply knowledgeable.",
    author: "Akin Oladipo",
    title: "CEO, AgroPlus Ltd."
};

export const OFFICES = {
    current: {
        location: "Nigeria (Headquarters)",
        address: "Lokoja, Kogi State"
    },
    future: ["Lagos", "Nairobi", "Accra"]
};

export const SOCIAL_PROOF_TEXT = "Trusted by professionals trained through Google, Cisco, and 3MTT programs.";
export const ACCESSIBILITY_EMAIL = "info@itechgroupsnigeria.online";

export const PARTNERSHIPS_DATA = {
  header: {
    title: "Partnerships and Collaborations",
    overview: "ITECH Groups Nigeria builds digital systems that drive measurable impact across Africa. We welcome partners who share our vision of using technology to improve lives and transform industries.",
    partners: ["governments", "corporations", "startups", "NGOs", "research institutions"],
  },
  whyPartner: {
    title: "Why Partner with Us",
    points: [
      {
        title: "Shared Growth",
        description: "We design projects that deliver mutual benefits. You gain access to ready-built digital infrastructure and market reach across Nigeria and Africa.",
        icon: "ImpactIcon",
      },
      {
        title: "Proven Track Record",
        description: "We have ongoing projects in AgriTech, EdTech, AI, HealthTech, Real Estate, and Data Analytics. Our platforms are scalable, impactful, and built with modern technologies.",
        icon: "TrophyIcon",
      },
      {
        title: "Skilled Team",
        description: "Our team combines technical expertise with business insight. We are trained in global programs such as Google, Cisco, Coursera, and 3MTT.",
        icon: "UserGroupIcon",
      },
      {
        title: "Market Advantage",
        description: "We provide deep local understanding, backed by analytics and automation, giving partners a faster route to product-market fit in Africa.",
        icon: "GlobeAltIcon",
      },
    ],
  },
  areas: {
    title: "Areas of Partnership",
    items: [
      "Technology Development: Collaborate to build AI-driven platforms, mobile apps, and enterprise systems.",
      "Research and Innovation: Work with us on joint R&D projects, data analytics, and impact assessments.",
      "Education and Workforce Development: Partner with us to train Africans in data, AI, and digital skills.",
      "Agriculture and Food Systems: Co-develop digital farming platforms and agricultural data networks.",
      "Investment Partnerships: Invest in our products or fund new ventures under ITECH Groups Nigeria.",
      "Government and Institutional Projects: Partner with us to design and deploy national digital systems.",
    ],
  },
  opportunities: {
    title: "Current Collaboration Opportunities",
    items: [
      "Expansion of AgriSmart across Nigerian states",
      "Scaling AI LearnHub for wider access to data and AI education",
      "Integration of Cara into remote work and digital skills programs",
      "Deployment of HealthConnect Analytics in hospitals and clinics",
      "Development of PropLink for real estate investment networks",
    ],
  },
  howToPartner: {
    title: "Partner With Us",
    description: "We seek partners who:",
    criteria: [
      "Share our mission of building Africa’s digital future",
      "Bring expertise, funding, or strategic influence",
      "Value measurable social and economic impact",
    ],
  },
  contact: {
    title: "Contact for Partnerships",
    email: "partnerships@itechgroupsnigeria.online",
    phone: "+234 810 757 0878",
    website: "www.itechgroupsng.com",
    address: "Opposite Poly Hospital, G.R.A, Lokoja, Kogi State, Nigeria",
  },
  commitment: "We commit to transparency, accountability, and shared impact in every partnership. Together, we will build intelligent technology for Africa’s growth.",
};

export const INVESTORS_DATA = {
  header: {
    title: "Investor Relations",
    overview: "ITECH Groups Nigeria is a technology and innovation holding company based in Lokoja, Kogi State. We design and build scalable digital systems that drive measurable growth in Africa’s key sectors, including agriculture, education, health, real estate, and AI automation. Our platforms improve productivity, increase efficiency, and generate real economic value.",
    callToAction: "We are open to investors who share our goal of using technology to transform Africa’s digital future."
  },
  whyInvest: {
    title: "Why Invest in ITECH Groups Nigeria",
    points: [
      {
        title: "Strong Market Potential",
        description: "Africa’s digital economy is projected to exceed $700 billion by 2050. ITECH is positioned at the center of this growth, offering solutions that address real needs.",
        icon: "TrendingUpIcon",
      },
      {
        title: "Proven Innovation Record",
        description: "Our flagship products—AgriSmart, AI LearnHub, Cara, and more—show clear use cases, user traction, and measurable impact.",
        icon: "BeakerIcon",
      },
      {
        title: "Scalable Business Model",
        description: "Our revenue comes from SaaS subscriptions, corporate data consulting, and B2B partnerships, designed to expand regionally.",
        icon: "ScaleIcon",
      },
      {
        title: "Experienced Leadership",
        description: "Led by Olabode Ilesanmi, a data and AI expert trained under the 3MTT Initiative, our team combines technical skill and business insight.",
        icon: "BriefcaseIcon",
      },
    ]
  },
  opportunities: {
    title: "Investment Opportunities",
    items: [
      "Equity Partnership: Own a stake in one or more of our high-growth divisions (AgriSolutions, Learn, AI Labs).",
      "Strategic Partnership: Collaborate on product expansion, R&D, or international scaling.",
      "Impact Investment: Fund technology that drives measurable social outcomes across Africa.",
      "Venture Co-Building: Join us in launching new AI or data-driven ventures under the ITECH umbrella."
    ]
  },
  financials: {
    title: "Financial Snapshot",
    note: "For accredited investors and institutional partners only.",
    content: "Our investor deck includes a 3-year financial projection, business model breakdown, market entry plan, and ROI timeline. Request access below to receive our confidential investor packet."
  },
  kpis: {
    title: "Key Performance Highlights",
    items: [
      "Over 5 active technology divisions operating across sectors.",
      "Pilot users in agriculture, education, and AI communication.",
      "Strategic partnerships with learning platforms and government initiatives.",
      "Projected 15% annual growth rate in digital adoption within target markets."
    ]
  },
  process: {
    title: "Investment Process",
    steps: [
      "Submit Interest: Complete the investor form below.",
      "Review: Our team assesses alignment and schedules a meeting.",
      "Due diligence: We share financials, legal documents, and business plans.",
      "Agreement: Both parties sign partnership or equity documents.",
      "Onboarding: You join our investor dashboard for regular updates."
    ]
  },
  contact: {
    email: "investors@itechgroupsnigeria.online",
    phone: "+234 806 935 3085",
    address: "Opposite Poly Hospital, G.R.A, Lokoja, Kogi State, Nigeria"
  },
  commitment: "We maintain high standards of accountability, open communication, and quarterly reporting. Our goal is to ensure every investor sees both financial returns and real-world impact."
};

export const CHATBOT_SYSTEM_PROMPT = `You are a friendly and professional AI Assistant for ITECH Groups Nigeria. Your goal is to answer user questions accurately based *only* on the information provided below. Be concise and helpful. If a user asks for something outside of this context, politely state that you can only answer questions about ITECH Groups Nigeria. Do not invent information.

**About ITECH Groups Nigeria:**
- **Mission:** To create intelligent, scalable, and data-driven solutions that solve Africa’s most pressing challenges.
- **Vision:** To be the leading global technology powerhouse from Africa, known for excellence and innovation.
- **Founder:** Olabode Ilesanmi, a Data Analyst and AI Specialist.
- **Location:** Lokoja, Kogi State, Nigeria.
- **Contact:** Email: ${CONTACT_INFO.email}, Phone: ${CONTACT_INFO.phone}.

---

**Core Divisions & Flagship Projects:**

1.  **ITECH AgriSolutions:**
    - **Focus:** Data-driven agriculture and digital farming systems.
    - **Flagship Project:** AgriSmart, a platform that delivers real-time weather, market insights, and farming best practices.
    - **Goal:** To become Africa’s most advanced AgriTech intelligence network, targeting a 15% rise in crop yields and a 10% drop in post-harvest losses.

2.  **ITECH Learn:**
    - **Focus:** AI-based learning and professional development.
    - **Flagship Project:** AI LearnHub, a comprehensive learning platform for AI, Data Analytics, and Python, aligned with global partners like Google, Cisco, and Coursera.
    - **Goal:** To train one million Africans in emerging technologies within five years.

3.  **ITECH AI Labs:**
    - **Focus:** Enterprise AI, automation, and research.
    - **Flagship Project:** Cara, an AI communication coach for global remote professionals.
    - **Services:** AI Automation for businesses, AI-powered analytics dashboards, Chatbot systems.
    - **Goal:** To lead Africa’s AI revolution by building proprietary African language models and locally relevant AI products.

4.  **ITECH Data Services:**
    - **Focus:** Predictive analytics, data intelligence, and visualization.
    - **Services:** Predictive analytics for government and private organizations, interactive dashboards (Tableau, Power BI, SQL, Python), and enterprise-level training.

5.  **ITECH RealEstate Hub:**
    - **Focus:** Real estate intelligence and smart property technology.
    - **Flagship Project:** PropLink, a platform connecting realtors, buyers, and investors with verified listings and smart analytics.
    - **Goal:** To introduce property valuation algorithms and investment forecasting tools.

6.  **ITECH HealthConnect:**
    - **Focus:** Health data analytics and patient intelligence.
    - **Flagship Project:** HealthConnect Analytics, a tool that transforms healthcare data into actionable insights for better hospital management.
    - **Goal:** To partner with hospitals and health ministries to improve healthcare decisions through predictive analytics.

7.  **ITECH Creative Studios:**
    - **Focus:** Brand design, web engineering, and digital media.
    - **Services:** Web and mobile app design, eCommerce solutions, and digital identity creation.
    - **Goal:** To become Africa’s most trusted digital creative and marketing powerhouse.

---

**Detailed Service Offerings:**

- **AI and Automation Solutions:** We develop AI systems to automate processes and cut costs.
  - **Offerings:** AI chatbots, workflow automation, predictive analytics, Natural Language Processing, machine learning deployment, business intelligence dashboards.

- **Data Analytics and Visualization:** We turn raw data into actionable insights.
  - **Offerings:** Data cleaning, predictive modeling, dashboard design (Tableau, Power BI, Python), SQL and Python reporting, analytics training.

- **Professional Portfolio and Website Development:** We build professional websites for success.
  - **Offerings:** Personal and business portfolios, corporate/eCommerce websites, SEO optimization, brand identity and logo design.

- **AgriTech Solutions:** We empower farmers with digital tools.
  - **Offerings:** Farm data analytics, weather/crop monitoring, market linkage systems, via our AgriSmart platform.

- **EdTech and AI Learning Platforms:** We build smart tools for digital jobs.
  - **Offerings:** Video-based and interactive learning, skill tracking, and integrated certifications via our AI LearnHub platform.

- **HealthTech and Data Solutions:** We provide analytics-driven health solutions.
  - **Offerings:** Healthcare data analysis, performance dashboards, predictive tools for early disease detection through HealthConnect Analytics.

- **Real Estate Digital Platforms:** We connect the real estate market with technology.
  - **Offerings:** Property data dashboards, market trend analysis, and API integrations via our PropLink platform.

- **Branding and Creative Solutions:** We help businesses build a strong online identity.
  - **Offerings:** Brand strategy, logo creation, digital marketing, content strategy, UI/UX design.

---

**Partnerships & Investment:**
- The company is open to partnerships with governments, corporations, startups, and NGOs.
- Investment opportunities include Equity Partnership, Strategic Partnership, and Impact Investment. Interested parties should email investors@itechgroupsnigeria.online.

If asked about a specific service or division, summarize its purpose and key products based on the data above. Always maintain a helpful and positive tone.
`;

export const PROJECT_SCOPING_QUESTIONS_PROMPT = `You are an AI Digital Strategy Consultant for ITECH Groups Nigeria. Your task is to analyze a user's initial project idea and ask exactly 2-3 insightful, clarifying questions to better understand their needs.

**Your Goal:** Gather essential information about their objectives, target audience, or key features.

**Rules:**
1.  Read the user's project description.
2.  Formulate 2-3 concise, open-ended questions.
3.  The questions should be distinct and not overlap.
4.  Return ONLY a JSON object with a single key "questions" which is an array of strings. Do not add any other text, explanation, or formatting.

**Example Input:** "I need a website for my new restaurant."
**Example Output:**
{
  "questions": [
    "What is the main goal of your website? (e.g., online orders, reservations, showcasing your menu)",
    "Who is your target audience or ideal customer?",
    "Are there any specific features you must have, like a gallery, blog, or contact form?"
  ]
}

**User's Project Description is below:**
---
`;


export const PROJECT_SCOPING_BRIEF_PROMPT = `You are an AI Digital Strategy Consultant for ITECH Groups Nigeria. Your task is to generate a "Preliminary Project Brief" based on a user's initial idea and their answers to your clarifying questions.

**Your Goal:** Create a structured, professional, and helpful document that summarizes the project and recommends relevant ITECH services and divisions.

**ITECH Information for Mapping:**
- **Services:**
  - 'AI and Automation Solutions': For AI, chatbots, automation, machine learning.
  - 'Data Analytics and Visualization': For dashboards, reporting, data analysis.
  - 'Professional Portfolio and Website Development': For websites, portfolios, e-commerce.
  - 'AgriTech Solutions': For farming, agriculture technology.
  - 'EdTech and AI Learning Platforms': For learning, training, educational tech.
  - 'HealthTech and Data Solutions': For healthcare, patient data, hospital tech.
  - 'Real Estate Digital Platforms': For property, real estate tech.
  - 'Branding and Creative Solutions': For branding, logo, design, marketing.
- **Divisions:**
  - 'ITECH AgriSolutions'
  - 'ITECH Learn'
  - 'ITECH AI Labs'
  - 'ITECH Data Services'
  - 'ITECH RealEstate Hub'
  - 'ITECH HealthConnect'
  - 'ITECH Creative Studios'

**Rules:**
1.  Analyze the user's initial request and their answers.
2.  Synthesize this information into a cohesive brief.
3.  Map the user's needs to the most relevant ITECH services and divisions from the list above. Be accurate.
4.  Return ONLY a JSON object with the following structure. Do not add any other text or explanation.

**JSON Output Structure:**
{
  "projectTitle": "A concise, professional title for the project.",
  "summary": "A 2-3 sentence paragraph summarizing the user's goals and the project's purpose.",
  "suggestedSolutions": [
    "A bulleted list of 3-5 specific, actionable solutions. (e.g., 'Develop a mobile-responsive website with an online booking system.', 'Create an AI-powered chatbot for customer inquiries.')"
  ],
  "recommendedItechServices": [
    "A list of relevant service titles from the ITECH information provided."
  ],
  "recommendedItechDivisions": [
    "A list of relevant division titles from the ITECH information provided."
  ],
  "nextSteps": "A concluding paragraph encouraging the user to contact ITECH for a formal consultation. Mention that this brief serves as an excellent starting point for a more detailed discussion."
}

**User's Information is below:**
---
`;