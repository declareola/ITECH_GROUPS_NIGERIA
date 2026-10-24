import { BLOG_POSTS, CONTACT_INFO, LEADERSHIP, SOCIAL_LINKS } from '../constants';

const BASE_URL = "https://main--itech-groups-nigeria--me-aistudio-co.s-ul4-4200.proxy.google-testing.com";
const DEFAULT_IMAGE_URL = `${BASE_URL}/social_preview.png`;
const SITE_NAME = "ITECH Groups Nigeria";

const METADATA: { [key: string]: { title: string; description: string; keywords: string } } = {
  home: {
    title: 'Building Digital Solutions for Africa’s Future',
    description: 'A technology and innovation holding company focused on building digital solutions for Africa\'s future, specializing in AI, Data Analytics, AgriTech, and more.',
    keywords: 'ITECH, Nigeria, AI, Data Analytics, AgriTech, EdTech, Technology in Africa, Olabode Ilesanmi',
  },
  about: {
    title: 'About Us, Mission & Vision',
    description: 'Learn about ITECH Groups Nigeria, our mission to solve Africa’s challenges with technology, our vision for a digital future, and our core values.',
    keywords: 'About ITECH, African tech company, innovation, data leadership, technology mission',
  },
  services: {
    title: 'Our Services: AI, Data, Web Development & More',
    description: 'Explore our wide range of services, including AI and Automation, Data Analytics, Website Development, AgriTech, EdTech, and HealthTech solutions.',
    keywords: 'AI services, data analytics Nigeria, website development, AgriTech solutions, EdTech platforms',
  },
  divisions: {
    title: 'Our Divisions',
    description: 'Discover the innovative divisions within ITECH, from AgriSolutions and AI Labs to HealthConnect and Creative Studios, each tackling key sectors in Africa.',
    keywords: 'ITECH divisions, AgriTech, AI Labs, HealthTech, EdTech, Creative Studios',
  },
  partnerships: {
    title: 'Partnerships & Collaborations',
    description: 'Partner with us to drive innovation and create measurable impact across Africa. We collaborate with governments, corporations, startups, and NGOs.',
    keywords: 'Tech partnerships Africa, collaborate with ITECH, innovation partners, corporate partnerships',
  },
  investors: {
    title: 'Investor Relations',
    description: 'Explore investment opportunities with ITECH Groups Nigeria, a high-growth technology holding company building scalable digital solutions for Africa.',
    keywords: 'Invest in African tech, ITECH Groups investors, technology investment Nigeria, venture capital Africa',
  },
  blog: {
    title: 'ITECH Insights & Innovations Blog',
    description: 'Read our AI-generated articles on technology, innovation, and Africa\'s digital transformation. Explore topics from AgriTech to the future of AI in business.',
    keywords: 'Africa tech blog, AI articles, AgriTech insights, digital transformation Africa',
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with ITECH Groups Nigeria. Let\'s discuss how we can build the future together. Find our address, email, phone, and divisional contacts.',
    keywords: 'Contact ITECH, tech company in Lokoja, partnership inquiries, ITECH email',
  },
  sitemap: {
    title: 'Sitemap',
    description: 'Navigate through all the pages available on the ITECH Groups Nigeria website, including our main sections and blog topics.',
    keywords: 'sitemap, site navigation, ITECH pages, website map, all pages',
  },
};

const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
  let element = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setCanonical = (url: string) => {
    let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if(!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
    }
    element.setAttribute('href', url);
}

const updateStructuredData = (page: string, postSlug?: string) => {
    const script = document.getElementById('structured-data');
    if (!script) return;

    let data: object = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ITECH Groups Nigeria",
        "url": `${BASE_URL}/#/`,
        "logo": DEFAULT_IMAGE_URL,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": CONTACT_INFO.phone,
          "contactType": "customer service",
          "email": CONTACT_INFO.email
        },
        "sameAs": Object.values(SOCIAL_LINKS)
    };

    if (page === 'blog' && postSlug) {
        const post = BLOG_POSTS.find(p => p.slug === postSlug || (p as any).aliases?.includes(postSlug));
        if (post) {
            data = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": post.title,
                "author": {
                    "@type": "Person",
                    "name": LEADERSHIP.name
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "ITECH Groups Nigeria",
                    "logo": {
                        "@type": "ImageObject",
                        "url": DEFAULT_IMAGE_URL
                    }
                },
                "description": post.summary,
                "url": `${BASE_URL}/#/blog/${post.slug}`
            };
        }
    }

    script.textContent = JSON.stringify(data, null, 2);
};

export const updateMetadata = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const page = pathSegments[0] || 'home';
  const postSlug = page === 'blog' ? pathSegments[1] : undefined;

  const pageKey = page in METADATA ? page : 'home';
  const meta = METADATA[pageKey as keyof typeof METADATA];
  const post = postSlug ? BLOG_POSTS.find(p => p.slug === postSlug || (p as any).aliases?.includes(postSlug)) : null;
  
  const pageTitle = post ? post.title : meta.title;
  const title = page === 'home' ? `${SITE_NAME} | ${pageTitle}` : `${pageTitle} | ${SITE_NAME}`;
  
  const description = post ? post.summary : meta.description;
  const url = `${BASE_URL}/#${pathname}`;

  // Update Title
  document.title = title;

  // Update Meta Tags
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'keywords', meta.keywords);

  // Update Open Graph tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', url);
  setMetaTag('property', 'og:image', DEFAULT_IMAGE_URL);
  setMetaTag('property', 'og:site_name', SITE_NAME);

  // Update Twitter tags
  setMetaTag('property', 'twitter:title', title);
  setMetaTag('property', 'twitter:description', description);
  setMetaTag('property', 'twitter:url', url);
  setMetaTag('property', 'twitter:image', DEFAULT_IMAGE_URL);

  // Update Canonical URL
  setCanonical(url);

  // Update Structured Data
  updateStructuredData(page, postSlug);
};