import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';
import { Squares2X2Icon, DocumentTextIcon } from './IconComponents';

const NAV_LINKS = [
  { to: '/', label: 'Home (Institutional Overview)' },
  { to: '/about', label: 'About Us & Governance' },
  { to: '/services', label: 'Enterprise & Sovereign Services' },
  { to: '/divisions', label: '7 Operating Subsidiaries' },
  { to: '/partnerships', label: 'Strategic Partnerships' },
  { to: '/investors', label: 'Investor Relations & Memorandums' },
  { to: '/blog', label: 'Research & Intelligence Briefs' },
  { to: '/contact', label: 'Executive Contact & Global Desks' },
];

export const Sitemap: React.FC = () => (
  <div id="sitemap" className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12">
      <FadeIn className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
          PLATFORM INDEX & DIRECTORY
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
          Complete Platform Sitemap
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          Comprehensive navigation index across all corporate profiles, operating subsidiaries, venture studio tools, and strategic memorandums.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Main Platform Pages (Architectural White Card) */}
        <FadeIn>
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200/90 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  <Squares2X2Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    DIRECTORY 01
                  </span>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    Corporate & Platform Pages
                  </h2>
                </div>
              </div>

              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-slate-700 hover:text-slate-950 hover:bg-slate-50 px-4 py-2.5 rounded-2xl transition-all text-xs sm:text-sm font-bold flex items-center justify-between group border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors"></span>
                        <span>{link.label}</span>
                      </div>
                      <span className="text-slate-400 group-hover:text-slate-900 transition-colors text-xs font-black">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {NAV_LINKS.length} Primary Destinations
            </div>
          </div>
        </FadeIn>
        
        {/* Research Briefs (Obsidian Luxury Card) */}
        <FadeIn>
          <div className="bg-[#181d27] text-white p-8 sm:p-10 rounded-[32px] border border-slate-800 shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <DocumentTextIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                    DIRECTORY 02
                  </span>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">
                    Research Briefs & Intelligence
                  </h2>
                </div>
              </div>

              <ul className="space-y-3">
                {BLOG_POSTS.map(post => (
                  <li key={post.slug}>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-slate-300 hover:text-white hover:bg-slate-900/60 px-4 py-2.5 rounded-2xl transition-all text-xs sm:text-sm font-medium flex items-center justify-between group border border-transparent hover:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors"></span>
                        <span className="line-clamp-1">{post.title}</span>
                      </div>
                      <span className="text-slate-500 group-hover:text-amber-400 transition-colors text-xs font-black">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-bold uppercase tracking-wider text-amber-400">
              {BLOG_POSTS.length} Published Memorandums
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </div>
);