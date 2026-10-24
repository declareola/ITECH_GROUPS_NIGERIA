import React from 'react';
import { Link } from 'react-router-dom';
import { PARTNERSHIPS_DATA } from '../constants';
import { 
  CheckCircleIcon, 
  EnvelopeIcon,
  GlobeAltIcon,
  ImpactIcon,
  PhoneIcon,
  TrophyIcon,
  UserGroupIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  ImpactIcon,
  TrophyIcon,
  UserGroupIcon,
  GlobeAltIcon,
};

export const PartnershipsPage: React.FC = () => {
  const { header, whyPartner, areas, opportunities, howToPartner, contact, commitment } = PARTNERSHIPS_DATA;

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      {/* Page Header */}
      <section className="px-4 sm:px-8 pt-12 pb-14 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            INSTITUTIONAL ALLIANCES
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">{header.title}</h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">{header.overview}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {header.partners.map(p => (
              <span key={p} className="bg-white border border-slate-200 text-slate-900 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-xs">
                {p}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Why Partner With Us */}
        <div className="mt-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              MUTUAL VALUE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-1">
              {whyPartner.title}
            </h2>
          </div>

          <StaggeredFadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
            {whyPartner.points.map(point => {
              const Icon = iconMap[point.icon] || ImpactIcon;
              return (
                <FadeInItem key={point.title}>
                  <div className="bg-white p-7 rounded-[28px] border border-slate-200/90 shadow-sm h-full flex flex-col justify-between hover:border-slate-900 transition-colors">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mb-5 font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">{point.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{point.description}</p>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Strategic Focus Areas (Obsidian Luxury Card + Bento) */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              SECTOR MANDATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
              {areas.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {areas.items.map((item, idx) => {
              const isDark = idx === 0 || idx === 3;
              const [itemTitle, ...descParts] = item.split(': ');
              const itemDesc = descParts.join(': ');
              return (
                <div 
                  key={itemTitle} 
                  className={`p-8 rounded-[28px] border flex flex-col justify-between transition-all ${
                    isDark 
                      ? 'bg-[#181d27] text-white border-slate-800 shadow-md' 
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${
                      isDark ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      FOCUS 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-3">{itemTitle}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal mb-6 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {itemDesc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-700/50 flex items-center text-xs font-semibold">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                    <span>Sovereign Impact & High-Velocity Deployment</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opportunities & Engagement Protocol */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Partnership Opportunities */}
          <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              ENGAGEMENT MODELS
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">{opportunities.title}</h3>
            <div className="space-y-4">
              {opportunities.items.map(opp => (
                <div key={opp} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 leading-relaxed">{opp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Partner Protocol */}
          <div className="bg-[#181d27] text-white rounded-[32px] p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                ONBOARDING ROADMAP
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">{howToPartner.title}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">{howToPartner.description}</p>
              <div className="space-y-4">
                {howToPartner.criteria.map((criterion, idx) => (
                  <div key={criterion} className="flex items-start gap-4 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-slate-200 font-semibold leading-relaxed mt-1">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Direct Contact</span>
                <a href={`mailto:${contact.email}`} className="text-xs font-bold text-amber-400 hover:underline break-all">{contact.email}</a>
              </div>
              <Link 
                to="/contact" 
                className="bg-white text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-100 transition-all shadow-sm text-center flex-shrink-0"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};