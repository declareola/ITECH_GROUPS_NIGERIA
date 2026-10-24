import React, { useState } from 'react';
import { INVESTORS_DATA } from '../constants';
import { 
  TrendingUpIcon, 
  BeakerIcon, 
  ScaleIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckBadgeIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';
import { BRAND_ASSETS } from '../assets/images';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  TrendingUpIcon,
  BeakerIcon,
  ScaleIcon,
  BriefcaseIcon,
};

export const InvestorsPage: React.FC = () => {
  const { header, whyInvest, opportunities, financials, kpis, process, contact, commitment } = INVESTORS_DATA;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="investors" className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      {/* Page Header */}
      <section className="px-4 sm:px-8 pt-12 pb-14 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            INSTITUTIONAL MEMORANDUM
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">{header.title}</h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">{header.overview}</p>
          <div className="mt-6">
            <span className="inline-block bg-white text-slate-900 border border-slate-200 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
              {header.callToAction}
            </span>
          </div>
        </FadeIn>

        {/* Visual Campus & Infrastructure Showcase */}
        <div className="mt-10 rounded-[28px] overflow-hidden border border-slate-200/90 shadow-sm relative group bg-slate-950">
          <div className="h-64 sm:h-80 md:h-96 w-full relative">
            <img 
              src={BRAND_ASSETS.atriumHeadquarters} 
              alt="ITECH Groups Headquarters Atrium" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 inline-block">
                  HEADQUARTERS & CONTINENTAL CAMPUS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-2">
                  Sovereign African Technology Infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
                  Headquartered in Lokoja, Nigeria, deploying high-throughput computing, AgriSmart IoT telemetry, and enterprise AI models across Africa.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  7 SUBSIDIARIES • 1 CONGLOMERATE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Invest Section */}
        <div className="mt-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              INVESTMENT THESIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-1">
              {whyInvest.title}
            </h2>
          </div>

          <StaggeredFadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
            {whyInvest.points.map(point => {
              const Icon = iconMap[point.icon] || TrendingUpIcon;
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

      {/* Opportunities & Financial Model Bento Grid */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          {/* Opportunities */}
          <div className="bg-slate-50 rounded-[32px] p-8 sm:p-10 border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              EXPANSION ASSETS
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">{opportunities.title}</h3>
            <ul className="space-y-4">
              {opportunities.items.map(item => {
                const [title, description] = item.split(': ');
                return (
                  <li key={title} className="flex items-start bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <CheckCircleIcon className="w-5 h-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900">{title}</h4>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed font-normal">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Financials & KPIs (Obsidian Card) */}
          <div className="bg-[#181d27] text-white rounded-[32px] p-8 sm:p-10 border border-slate-800 shadow-md">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
              PROJECTIONS & SCALE
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6">{financials.title}</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">{financials.content}</p>
            
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 mb-8 flex items-start">
              <DocumentTextIcon className="w-5 h-5 mr-3 mt-0.5 text-amber-400 flex-shrink-0" />
              <span className="text-xs text-amber-300 font-medium leading-relaxed">{financials.note}</span>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 mb-4">{kpis.title}</h4>
              <div className="grid grid-cols-2 gap-3">
                {kpis.items.map(kpi => (
                  <div key={kpi} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{kpi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process & Form Section */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              ALLOCATION PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-1">
              {process.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {process.steps.map((step, idx) => (
              <div key={step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xs mb-3">
                    0{idx + 1}
                  </span>
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form and Contact Information Bento Grid */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Contact details */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white p-8 rounded-[28px] border border-slate-200 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  OFFICIAL DESK
                </span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Direct Inquiries</h3>
                <div className="space-y-3 text-xs text-slate-700 font-medium">
                  <p className="flex items-center min-w-0">
                    <EnvelopeIcon className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                    <a href={`mailto:${contact.email}`} className="hover:text-slate-950 font-bold break-all">{contact.email}</a>
                  </p>
                  <p className="flex items-center">
                    <PhoneIcon className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                    <span>{contact.phone}</span>
                  </p>
                </div>
              </div>

              <div className="bg-[#181d27] text-white p-8 rounded-[28px] border border-slate-800 shadow-md text-center">
                <CheckBadgeIcon className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Our Commitment</h3>
                <p className="text-slate-300 text-xs italic font-normal">"{commitment}"</p>
              </div>
            </div>

            {/* Request Investor Deck / Get in Touch Form */}
            <div className="lg:col-span-3 bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-amber-400 px-3 py-1 rounded-full inline-block mb-2">
                  INSTITUTIONAL ACCESS
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Request Investor Deck / Get in Touch</h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 font-normal">
                  Access our confidential executive deck, financial projections, and schedule a private strategy briefing with our leadership.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                    ✓
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase">Deck Request Received</h4>
                  <p className="text-slate-600 text-xs max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you for your interest in ITECH Groups Nigeria. Our Investor Relations desk will send the confidential memorandum to your corporate email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="investor-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name</label>
                    <input type="text" name="investor-name" id="investor-name" required autoComplete="name" className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="e.g. Dr. Ngozi Adebayo" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="investor-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Institutional Email</label>
                      <input id="investor-email" name="email" type="email" required autoComplete="email" className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="partner@fund.com" />
                    </div>
                    <div>
                      <label htmlFor="investor-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Firm / Investment Entity</label>
                      <input type="text" name="investor-company" id="investor-company" required className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="Venture / Family Office" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="investment-type" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Inquiry Type</label>
                    <select id="investment-type" name="investment-type" required className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium">
                      <option value="Request Investor Deck">Request Full Pitch Deck & Financial Models</option>
                      <option value="Schedule Briefing">Schedule Private Executive Briefing</option>
                      <option value="Equity Partnership">Equity Investment ($250k - $2M+)</option>
                      <option value="Strategic Partnership">Strategic Institutional Partnership</option>
                      <option value="Impact Investment">Development / Impact Finance</option>
                      <option value="Venture Co-Building">Venture Co-Building</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Message / Mandate Focus</label>
                    <textarea id="message" name="message" rows={3} className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="Tell us about your mandate or preferred sectors (e.g. AgriTech, AI Labs)..."></textarea>
                  </div>
                  <div className="flex items-start pt-1">
                    <input id="agreement" name="agreement" type="checkbox" required className="h-4 w-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 mt-0.5"/>
                    <label htmlFor="agreement" className="ml-2.5 text-[11px] text-slate-500 font-medium leading-relaxed">
                      I confirm our entity's legitimate interest in reviewing investment materials for ITECH Groups Nigeria under standard confidentiality terms.
                    </label>
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all">
                      Request Investor Deck & Connect
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Social Proof Strip matching Mockup */}
      <section className="py-16 px-4 sm:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
            PARTNER NETWORK
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Trusted by Forward-Thinking Institutions
          </h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-black tracking-widest uppercase text-slate-800">
              VENTURE INC.
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-black tracking-widest uppercase text-slate-800">
              IMPACT FUND
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-black tracking-widest uppercase text-slate-800">
              AFRICA TECH
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-black tracking-widest uppercase text-slate-800">
              INNOVA-HUB
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-black tracking-widest uppercase text-slate-800 col-span-2 md:col-span-1">
              GROWTH PARTNERS
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};