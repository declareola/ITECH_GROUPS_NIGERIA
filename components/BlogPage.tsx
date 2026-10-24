import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BLOG_POSTS_DATA, BlogPost, getBlogPostBySlug } from '../data/blogData';
import { trackEvent } from '../utils/analytics';
import {
  LeafIcon,
  AcademicCapIcon,
  AiBotIcon,
  ChartBarIcon,
  HeartIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  SparklesIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  LeafIcon,
  AcademicCapIcon,
  AiBotIcon,
  ChartBarIcon,
  HeartIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
};

// Markdown inline parser for bold, italic, and inline code
const parseInlineMarkdown = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('***') && part.endsWith('***')) {
      return (
        <strong key={i}>
          <em className="font-semibold text-slate-900">{part.slice(3, -3)}</em>
        </strong>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

// Robust Markdown to React blocks parser including tables, blockquotes, lists, and headings
const renderMarkdownContent = (content: string) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let isOrdered = false;
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      if (isOrdered) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal list-outside pl-6 space-y-2.5 my-6 text-slate-700 font-normal leading-relaxed text-sm sm:text-base">
            {currentListItems}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-outside pl-6 space-y-2.5 my-6 text-slate-700 font-normal leading-relaxed text-sm sm:text-base">
            {currentListItems}
          </ul>
        );
      }
      currentListItems = [];
    }
  };

  const flushTable = () => {
    if (inTable && (tableHeader.length > 0 || tableRows.length > 0)) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-8 overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            {tableHeader.length > 0 && (
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-black tracking-wider">
                <tr>
                  {tableHeader.map((th, i) => (
                    <th key={i} className="py-3.5 px-4 font-black border-b border-slate-800">
                      {parseInlineMarkdown(th)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-slate-50/80 transition-colors' : 'bg-slate-50/50 hover:bg-slate-50 transition-colors'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-3 px-4 leading-relaxed font-normal">
                      {parseInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table handling
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map(c => c.trim());

      // Check if separator line (| :--- | :--- |)
      const isSeparator = cells.every(c => /^:?-+:?$/.test(c));
      if (isSeparator) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      flushList();
      elements.push(
        <div key={`hr-${idx}`} className="my-10 flex items-center justify-center">
          <div className="w-full border-t border-slate-200" />
          <div className="mx-4 text-slate-300 font-mono text-xs">◆ ◆ ◆</div>
          <div className="w-full border-t border-slate-200" />
        </div>
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${idx}`} className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-10 mb-4 pt-2">
          {parseInlineMarkdown(trimmed.replace('### ', ''))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${idx}`} className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-12 mb-5 pb-3 border-b border-slate-200/80">
          {parseInlineMarkdown(trimmed.replace('## ', ''))}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${idx}`} className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight mt-10 mb-6">
          {parseInlineMarkdown(trimmed.replace('# ', ''))}
        </h1>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`bq-${idx}`} className="my-6 pl-5 py-3 border-l-4 border-amber-400 bg-amber-50/60 rounded-r-2xl text-slate-800 italic text-sm sm:text-base">
          {parseInlineMarkdown(trimmed.replace(/^>\s*/, ''))}
        </blockquote>
      );
      continue;
    }

    // Lists
    const isUnordered = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const isOrderedMatch = /^\d+\.\s/.test(trimmed);

    if (isUnordered || isOrderedMatch) {
      if (currentListItems.length === 0) {
        isOrdered = isOrderedMatch;
      }
      const itemText = isUnordered ? trimmed.slice(2) : trimmed.replace(/^\d+\.\s/, '');
      currentListItems.push(
        <li key={`li-${idx}`} className="pl-1">
          {parseInlineMarkdown(itemText)}
        </li>
      );
      continue;
    } else {
      flushList();
    }

    // Regular Paragraph
    elements.push(
      <p key={`p-${idx}`} className="my-4 text-slate-600 font-normal leading-relaxed text-sm sm:text-base">
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  }

  flushList();
  flushTable();
  return elements;
};

export const BlogPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top when postSlug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [postSlug]);

  // Current Post lookup
  const currentPost = useMemo(() => {
    if (!postSlug) return null;
    return getBlogPostBySlug(postSlug) || null;
  }, [postSlug]);

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS_DATA.map(p => p.category)));
    return ['All', ...cats];
  }, []);

  // Filtered posts for directory view
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // =========================================================================
  // VIEW: SINGLE ARTICLE DEEP-DIVE
  // =========================================================================
  if (currentPost) {
    const Icon = iconMap[currentPost.icon] || DocumentTextIcon;
    const currentIndex = BLOG_POSTS_DATA.findIndex(p => p.id === currentPost.id);
    const prevPost = currentIndex > 0 ? BLOG_POSTS_DATA[currentIndex - 1] : null;
    const nextPost = currentIndex < BLOG_POSTS_DATA.length - 1 ? BLOG_POSTS_DATA[currentIndex + 1] : null;

    const relatedPosts = BLOG_POSTS_DATA.filter(p =>
      currentPost.relatedSlugs.includes(p.slug) || (p.aliases && p.aliases.some(a => currentPost.relatedSlugs.includes(a)))
    ).slice(0, 3);

    return (
      <article className="bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
        {/* Sticky Sub-Header with Back Navigation & Quick Actions */}
        <div className="sticky top-16 md:top-20 z-40 bg-[#f8fafc]/95 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link
              to="/blog"
              onClick={() => trackEvent('blog_back_to_index', { from_post: currentPost.slug })}
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-950 py-1.5 px-3 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <span className="mr-1.5 text-base leading-none">←</span>
              <span>All Research Briefs</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
                {currentPost.readTime}
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-slate-900 text-slate-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all shadow-xs"
              >
                <span>{copiedLink ? '✓ Link Copied' : 'Share Brief'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Article Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <Link to="/" className="hover:text-slate-800">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-slate-800">Research & Insights</Link>
            <span>/</span>
            <span className="text-slate-700 truncate max-w-[200px] sm:max-w-xs">{currentPost.category}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs">
                {currentPost.category}
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Research Updated: {currentPost.updatedDate}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold">
                {currentPost.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-[1.1] mb-5">
              {currentPost.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
              {currentPost.subtitle}
            </p>

            {/* Author Byline Card */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-950 border border-slate-900/10 shadow-xs flex-shrink-0">
                  <img
                    src={currentPost.author.image}
                    alt={currentPost.author.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {currentPost.author.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {currentPost.author.role}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3.5 py-1.5 rounded-full">
                ITECH Intelligence Desk
              </div>
            </div>
          </header>

          {/* Hero Image Framed in Luxury Architectural Bento Style */}
          <div className="mb-12 rounded-[32px] overflow-hidden border border-slate-200/90 shadow-md relative group bg-slate-950">
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
              <img
                src={currentPost.coverImage}
                alt={currentPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white text-xs font-bold">
                <span className="uppercase tracking-widest text-[10px] text-amber-400">
                  Sovereign Research Series
                </span>
                <span className="opacity-75 hidden sm:inline">
                  ITECH Holding Company Research & Development
                </span>
              </div>
            </div>
          </div>

          {/* Executive Key Takeaways Box (Obsidian Luxury Card) */}
          <div className="mb-12 bg-[#181d27] text-white rounded-[28px] p-7 sm:p-9 border border-slate-800 shadow-md">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  EXECUTIVE SUMMARY
                </span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  Core Research Findings & Strategic Takeaways
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5">
              {currentPost.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold text-[10px] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rendered Full Article Body */}
          <div className="prose prose-slate max-w-none">
            {renderMarkdownContent(currentPost.content)}
          </div>

          {/* Structured Sources & References Card (Strictly NO external hyperlinks) */}
          <div className="mt-16 bg-white rounded-[28px] p-7 sm:p-9 border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                <DocumentTextIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  BIBLIOGRAPHIC CITATIONS
                </span>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  Institutional Sources & Data References
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-normal">
              This research brief synthesizes verified institutional documentation, government regulatory publications, and multilateral agency assessments. In accordance with platform distribution standards, sources are presented below as verified textual citations:
            </p>

            <ul className="space-y-3">
              {currentPost.sources.map((source, i) => (
                <li key={i} className="flex items-start text-xs sm:text-sm text-slate-700 font-medium bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-amber-500 font-bold mr-2.5 mt-0.5 flex-shrink-0">[{i + 1}]</span>
                  <span className="leading-relaxed">{source}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Author Institutional Credentials Box */}
          <div className="mt-12 bg-slate-100/70 rounded-[28px] p-7 sm:p-9 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 shadow-xs flex-shrink-0">
              <img
                src={currentPost.author.image}
                alt={currentPost.author.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h4 className="text-base font-black text-slate-900 uppercase tracking-wider">
                  {currentPost.author.name}
                </h4>
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  FOUNDER
                </span>
              </div>
              <p className="text-xs text-slate-600 font-bold mb-3">
                {currentPost.author.role}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                {currentPost.author.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  to="/contact"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors shadow-xs"
                >
                  Discuss Enterprise Partnership
                </Link>
                <Link
                  to="/about"
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
                >
                  Corporate Profile & Governance
                </Link>
              </div>
            </div>
          </div>

          {/* Next / Prev Navigation */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-900 transition-all text-left group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  ← PREVIOUS RESEARCH BRIEF
                </span>
                <span className="text-sm font-black text-slate-900 group-hover:text-amber-500 transition-colors uppercase tracking-tight line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-900 transition-all text-right group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  NEXT RESEARCH BRIEF →
                </span>
                <span className="text-sm font-black text-slate-900 group-hover:text-amber-500 transition-colors uppercase tracking-tight line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Related Research Briefs */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  RECOMMENDED INTELLIGENCE
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Related Research Publications
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPosts.map(post => {
                  const PostIcon = iconMap[post.icon] || DocumentTextIcon;
                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                            <PostIcon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {post.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-amber-500 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 font-normal leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>{post.readTime}</span>
                        <span className="text-slate-900 font-black group-hover:translate-x-1 transition-transform">
                          Read ↗
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  // =========================================================================
  // VIEW: RESEARCH DIRECTORY & PUBLICATIONS CATALOG
  // =========================================================================
  return (
    <div id="blog" className="bg-[#f8fafc] text-slate-900 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        {/* Page Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            RESEARCH & SOVEREIGN INSIGHTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
            ITECH Insights & Intelligence
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            In-depth empirical research and executive briefs exploring African technological sovereignty, artificial intelligence deployments, precision agricultural data, and civic governance.
          </p>
        </FadeIn>

        {/* Filter Bar: Category Pills + Live Search */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 sm:p-4 rounded-[28px] border border-slate-200/90 shadow-xs">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 flex-shrink-0">
            <label htmlFor="search-blog" className="sr-only">Search publications</label>
            <input
              type="text"
              id="search-blog"
              placeholder="Search research briefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
            />
          </div>
        </div>

        {/* Featured First Publication (Obsidian Luxury Bento Hero) */}
        {selectedCategory === 'All' && searchQuery === '' && BLOG_POSTS_DATA.length > 0 && (
          <FadeIn className="mb-12">
            <div className="bg-[#181d27] text-white rounded-[32px] overflow-hidden border border-slate-800 shadow-xl grid lg:grid-cols-12 gap-0 items-stretch">
              {/* Left Column: Content */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      FEATURED RESEARCH
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {BLOG_POSTS_DATA[0].date}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {BLOG_POSTS_DATA[0].readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                    {BLOG_POSTS_DATA[0].title}
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal mb-6 line-clamp-3">
                    {BLOG_POSTS_DATA[0].summary}
                  </p>

                  <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                      Key Takeaway
                    </span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {BLOG_POSTS_DATA[0].keyTakeaways[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img
                        src={BLOG_POSTS_DATA[0].author.image}
                        alt={BLOG_POSTS_DATA[0].author.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        {BLOG_POSTS_DATA[0].author.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {BLOG_POSTS_DATA[0].author.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${BLOG_POSTS_DATA[0].slug}`}
                    className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all shadow-md"
                  >
                    Read Full Analysis ↗
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Cover */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  src={BLOG_POSTS_DATA[0].coverImage}
                  alt={BLOG_POSTS_DATA[0].title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#181d27] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-slate-800">
                  AgriTech Telemetry
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Bento Grid of All Filtered Research Briefs */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
              CATALOG DIRECTORY
            </span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Published Intelligence Briefs ({filteredPosts.length})
            </h2>
          </div>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-[28px] p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">No research briefs found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <StaggeredFadeIn className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {filteredPosts.map((post) => {
              const Icon = iconMap[post.icon] || DocumentTextIcon;

              return (
                <FadeInItem key={post.id}>
                  <div className="bg-white rounded-[28px] border border-slate-200/90 hover:border-slate-900 transition-all duration-300 flex flex-col justify-between h-full shadow-sm hover:shadow-md overflow-hidden group">
                    {/* Card Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-md text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-4 text-white text-[10px] font-bold uppercase tracking-wider">
                        {post.readTime}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {post.date}
                          </span>
                        </div>

                        <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-slate-900 group-hover:text-amber-500 transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 line-clamp-3">
                          {post.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-900">
                            <img
                              src={post.author.image}
                              alt={post.author.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          onClick={() => trackEvent('blog_click_read', { post_slug: post.slug })}
                          className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-900 hover:text-amber-500 transition-colors group-hover:translate-x-0.5"
                        >
                          <span>Read</span>
                          <span className="ml-1 text-sm font-black">↗</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </StaggeredFadeIn>
        )}

        {/* Research Desk Callout */}
        <div className="mt-20 bg-slate-900 text-white rounded-[32px] p-8 sm:p-12 border border-slate-800 text-center">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            POLICY & ENTERPRISE COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Commission Custom Research or Strategic Telemetry
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            ITECH Intelligence Desk partners with state ministries, multilateral agencies, and venture funds to produce bespoke data audits, satellite feasibility studies, and AI readiness evaluations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-7 py-3 rounded-full hover:bg-amber-300 transition-all shadow-md"
            >
              Contact Intelligence Desk
            </Link>
            <Link
              to="/investors"
              className="border border-slate-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full hover:bg-slate-800 transition-all"
            >
              Investor Relations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};