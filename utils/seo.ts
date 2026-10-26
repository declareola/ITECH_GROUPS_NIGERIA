import { BLOG_POSTS, CONTACT_INFO, LEADERSHIP, SOCIAL_LINKS } from '../constants';
import { BLOG_POSTS_DATA, getBlogPostBySlug } from '../data/blogData';

export const PRODUCTION_DOMAIN = "https://itech-groups-nigeria-lime.vercel.app";

export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location.origin) {
    // If running in development or local, still return window.location.origin
    // If accessed through custom domain or Vercel, it uses the live origin
    return window.location.origin;
  }
  return PRODUCTION_DOMAIN;
};

export const SITE_NAME = "ITECH Groups Nigeria";

const METADATA: { [key: string]: { title: string; description: string; keywords: string } } = {
  home: {
    title: 'ITECH Groups Nigeria | Building Digital Solutions for Africa’s Future',
    description: 'Premier African technology holding company engineering sovereign AI, precision AgriTech telemetry, and public data infrastructure across 7 key sectors.',
    keywords: 'ITECH Groups Nigeria, African Tech, Sovereign AI, AgriTech Nigeria, EdTech Africa, HealthTech, PropTech, Olabode Ilesanmi, 3MTT, Data Analytics Nigeria',
  },
  about: {
    title: 'About Us & Leadership | ITECH Groups Nigeria',
    description: 'Discover ITECH Groups Nigeria’s mission, core values, continental expansion roadmap, and leadership team headed by Founder & AI Specialist Olabode Ilesanmi.',
    keywords: 'About ITECH, African tech conglomerate, Olabode Ilesanmi, 3MTT alumni, African innovation leadership, technology governance',
  },
  services: {
    title: 'Enterprise Digital Services & Scoping | ITECH Groups Nigeria',
    description: 'Explore our enterprise engineering capabilities: AI Automation, Predictive Analytics, Agricultural Telemetry, and Custom Architecture Scoping.',
    keywords: 'AI services Nigeria, data analytics consulting, enterprise automation, web engineering Africa, project scoping brief',
  },
  divisions: {
    title: '7 Operating Subsidiaries | ITECH Groups Nigeria',
    description: 'Explore the 7 specialized subsidiaries of ITECH Groups: AgriSolutions, Learn, AI Labs, Data Services, RealEstate Hub, HealthConnect, and Creative Studios.',
    keywords: 'ITECH subsidiaries, AgriSmart, AI LearnHub, Cara AI, PropLink, HealthConnect Analytics, African tech ecosystem',
  },
  partnerships: {
    title: 'Strategic Partnerships & Institutional Alliances | ITECH Groups Nigeria',
    description: 'Partner with ITECH Groups Nigeria. We collaborate with national governments, multilateral agencies, enterprises, and research universities.',
    keywords: 'African tech partnerships, government digital transformation, multilateral collaboration, tech investment Nigeria',
  },
  investors: {
    title: 'Investor Relations & Corporate Memorandums | ITECH Groups Nigeria',
    description: 'Explore investment opportunities with ITECH Groups Nigeria, a scalable technology holding company capturing Africa’s $700B digital economy.',
    keywords: 'Invest in African tech, ITECH Groups investors, venture capital Africa, African tech equity, tech holding company',
  },
  blog: {
    title: 'Research & Sovereign Insights | ITECH Groups Nigeria',
    description: 'Executive research briefings and empirical intelligence on African AgriTech, Sovereign AI infrastructure, Public Data Governance, and HealthTech.',
    keywords: 'African technology research, AgriTech whitepaper, AI in Africa, data governance Africa, HealthTech Nigeria, PropTech',
  },
  contact: {
    title: 'Executive Contact & Global Desks | ITECH Groups Nigeria',
    description: 'Get in touch with ITECH Groups Nigeria corporate headquarters in Lokoja, Kogi State. Direct lines for partnerships, investors, and media inquiries.',
    keywords: 'Contact ITECH Groups, Lokoja technology office, Nigerian tech headquarters, tech partnership inquiry',
  },
  sitemap: {
    title: 'Platform Index & Directory | ITECH Groups Nigeria',
    description: 'Comprehensive navigation directory of all corporate profiles, operating divisions, research briefs, and institutional contact desks.',
    keywords: 'ITECH sitemap, platform index, site directory, all research briefs',
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

const removeMetaTag = (attr: 'name' | 'property', value: string) => {
  const element = document.querySelector(`meta[${attr}="${value}"]`);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

const setCanonical = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
};

const updateStructuredData = (page: string, postSlug?: string, baseUrl: string = getBaseUrl()) => {
  const script = document.getElementById('structured-data');
  if (!script) return;

  const defaultImageUrl = `${baseUrl}/social_preview.png`;
  const logoUrl = `${baseUrl}/logo.jpg`;

  if (page === 'blog' && postSlug) {
    const post = getBlogPostBySlug(postSlug);
    if (post) {
      const articleUrl = `${baseUrl}/#/blog/${post.slug}`;
      const articleData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl
        },
        "headline": post.title,
        "alternativeHeadline": post.subtitle,
        "image": [
          defaultImageUrl,
          post.coverImage
        ],
        "datePublished": "2026-10-24T08:00:00+01:00",
        "dateModified": "2026-10-25T08:00:00+01:00",
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.role,
          "url": `${baseUrl}/#/about`
        },
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": logoUrl
          }
        },
        "description": post.summary,
        "articleSection": post.category,
        "inLanguage": "en-US",
        "keywords": `${post.category}, Africa Tech, Nigeria Technology, ${post.title}`,
        "wordCount": post.content.split(/\s+/).length
      };

      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/#/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Research & Insights",
            "item": `${baseUrl}/#/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": articleUrl
          }
        ]
      };

      script.textContent = JSON.stringify([articleData, breadcrumbData], null, 2);
      return;
    }
  }

  // Global Corporate Organization & WebSite Structured Data
  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "alternateName": "ITECH Groups",
    "url": `${baseUrl}/`,
    "logo": logoUrl,
    "image": defaultImageUrl,
    "description": "A premier technology and innovation holding company engineering sovereign AI, precision AgriTech telemetry, and public data infrastructure across Africa.",
    "founder": {
      "@type": "Person",
      "name": LEADERSHIP.name,
      "jobTitle": LEADERSHIP.title,
      "description": LEADERSHIP.bio
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opposite Poly Hospital, G.R.A",
      "addressLocality": "Lokoja",
      "addressRegion": "Kogi State",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone,
      "contactType": "customer service",
      "email": CONTACT_INFO.email,
      "areaServed": ["NG", "Africa", "Global"],
      "availableLanguage": ["English", "Hausa", "Yoruba", "Igbo"]
    },
    "sameAs": Object.values(SOCIAL_LINKS)
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": `${baseUrl}/`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  script.textContent = JSON.stringify([orgData, websiteData], null, 2);
};

export const updateMetadata = (pathname: string) => {
  const baseUrl = getBaseUrl();
  const pathSegments = pathname.split('/').filter(Boolean);
  const page = pathSegments[0] || 'home';
  const postSlug = page === 'blog' ? pathSegments[1] : undefined;

  const pageKey = page in METADATA ? page : 'home';
  const meta = METADATA[pageKey as keyof typeof METADATA];
  const post = postSlug ? getBlogPostBySlug(postSlug) : null;

  // Title: Specific, branded, and optimized for search snippets
  const title = post ? `${post.title} | ${SITE_NAME}` : meta.title;

  // Description: Under 160 characters for snippets
  const description = post ? post.summary : meta.description;

  // Keywords
  const keywords = post ? `${post.category}, Nigeria Tech, African AgriTech, AI, Data Analytics, ${meta.keywords}` : meta.keywords;

  // Hash Canonical URL (e.g. https://itech-groups-nigeria-lime.vercel.app/#/blog/the-digital-harvest-agritech-nigeria)
  const canonicalUrl = `${baseUrl}/#${pathname}`;

  // Preview Image
  const imageUrl = `${baseUrl}/social_preview.png`;

  // Update Page Title
  document.title = title;

  // Core Meta
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'keywords', keywords);
  setMetaTag('name', 'author', 'Olabode Ilesanmi, ITECH Groups Nigeria');

  // Search Engine Bot Directives: Guarantee Full Indexing and Large Snippets
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  setMetaTag('name', 'bingbot', 'index, follow, max-snippet:-1, max-image-preview:large');

  // Open Graph
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:site_name', SITE_NAME);
  setMetaTag('property', 'og:locale', 'en_US');

  if (post) {
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'article:published_time', '2026-10-24T08:00:00+01:00');
    setMetaTag('property', 'article:modified_time', '2026-10-25T08:00:00+01:00');
    setMetaTag('property', 'article:author', 'Olabode Ilesanmi');
    setMetaTag('property', 'article:section', post.category);
    setMetaTag('property', 'article:tag', `${post.category}, AgriTech, AI, Africa`);
  } else {
    setMetaTag('property', 'og:type', 'website');
    removeMetaTag('property', 'article:published_time');
    removeMetaTag('property', 'article:modified_time');
    removeMetaTag('property', 'article:author');
    removeMetaTag('property', 'article:section');
    removeMetaTag('property', 'article:tag');
  }

  // Twitter / X
  setMetaTag('property', 'twitter:card', 'summary_large_image');
  setMetaTag('property', 'twitter:title', title);
  setMetaTag('property', 'twitter:description', description);
  setMetaTag('property', 'twitter:url', canonicalUrl);
  setMetaTag('property', 'twitter:image', imageUrl);

  // Canonical Link Tag
  setCanonical(canonicalUrl);

  // Schema.org Structured Data
  updateStructuredData(page, postSlug, baseUrl);
};