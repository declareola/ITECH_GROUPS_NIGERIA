import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CORE_VALUES, 
  TARGET_MARKET, 
  COMPETITIVE_ADVANTAGE, 
  REVENUE_STREAMS, 
  LEADERSHIP 
} from '../constants';
import { BRAND_ASSETS } from '../assets/images';
import { 
  InnovationIcon, 
  ExcellenceIcon, 
  IntegrityIcon, 
  ImpactIcon, 
  CollaborationIcon,
  GlobalThinkingIcon,
  ContinuousLearningIcon,
  CheckCircleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BeakerIcon,
  AiBotIcon,
  Squares2X2Icon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';

const valueIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Innovation: InnovationIcon,
  Excellence: ExcellenceIcon,
  Integrity: IntegrityIcon,
  Impact: ImpactIcon,
  Collaboration: CollaborationIcon,
  "Global Thinking": GlobalThinkingIcon,
  "Continuous Learning": ContinuousLearningIcon,
};

const advantageIcons = [
  Squares2X2Icon,
  AiBotIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ChartBarIcon,
  BeakerIcon,
];

export const AboutPage: React.FC = () => (
  <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
    {/* Page Header */}
    <section className="px-4 sm:px-8 pt-12 pb-14 max-w-7xl mx-auto">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
          INSTITUTIONAL PROFILE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
          Building Africa’s Sovereign Digital Future
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          Founded in Lokoja, Kogi State, ITECH Groups Nigeria is a pan-African technology conglomerate engineering sovereign AI, precision AgriTech, and scalable data intelligence across 7 high-impact sectors.
        </p>
      </FadeIn>

      {/* Overview, Mission, Vision Bento Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Overview */}
        <div className="bg-white rounded-[28px] p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              CONGLOMERATE OVERVIEW
            </span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Overview
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              A multi-disciplinary innovation holding company delivering sovereign African artificial intelligence, agricultural telemetry, and enterprise automation infrastructure to accelerate continental growth.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>7 SUBSIDIARIES</span>
            <span>100% AFRICAN</span>
          </div>
        </div>

        {/* Mission (Obsidian Luxury Card) */}
        <div className="bg-[#181d27] text-white rounded-[28px] p-8 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-2">
              CORE PURPOSE
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Our Mission
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              To create intelligent, scalable, and data-driven solutions that solve Africa’s most pressing challenges while operating at international standards of data ethics, ISO, and GDPR governance.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-400">
            <span>MEASURABLE IMPACT</span>
            <span>GLOBAL STANDARDS</span>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-[28px] p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              CONTINENTAL AMBITION
            </span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Our Vision
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              To position ITECH Groups Nigeria as the leading global technology powerhouse from Africa, recognized globally for data leadership, indigenous models, and human-centered innovation.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>5-PHASE ROADMAP</span>
            <span>DATA HUBS</span>
          </div>
        </div>
      </div>
    </section>

    {/* The ITECH Advantage Section */}
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            STRATEGIC MOAT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
            The ITECH Advantage
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-4 font-normal">
            At ITECH, our strength lies in our holistic, multi-sector approach. We don't just build isolated software; we engineer sovereign ecosystems where advances in AI telemetry directly power crop yield intelligence and enterprise platforms.
          </p>
          <div className="mt-8">
            <Link
              to="/divisions"
              className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all inline-flex items-center shadow-sm"
            >
              Explore Our Operating Ecosystem &rarr;
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {COMPETITIVE_ADVANTAGE.map((advantage, index) => {
            const Icon = advantageIcons[index] || CheckCircleIcon;
            return (
              <div key={advantage} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-start gap-4 hover:border-slate-900 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 text-slate-900" />
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">{advantage}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            ETHICAL ANCHOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {CORE_VALUES.map((value) => {
            const Icon = valueIcons[value] || CheckCircleIcon;
            return (
              <div key={value} className="bg-white rounded-2xl p-5 border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs hover:border-slate-900 transition-colors">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">{value}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Business Fundamentals: Market, Edge, Revenue */}
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            COMMERCIAL BLUEPRINT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
            Market Architecture & Economics
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Target Market */}
          <div className="bg-slate-50 rounded-[28px] p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <UserGroupIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Target Market</h3>
              <ul className="space-y-2.5">
                {TARGET_MARKET.map(item => (
                  <li key={item} className="flex items-center text-xs font-medium text-slate-700">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6 pt-4 border-t border-slate-200">
              Institutional Reach
            </span>
          </div>

          {/* Revenue Streams (Obsidian Card) */}
          <div className="bg-[#181d27] text-white rounded-[28px] p-8 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center mb-4 font-bold">
                <ChartBarIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Revenue Streams</h3>
              <ul className="space-y-2.5">
                {REVENUE_STREAMS.map(item => (
                  <li key={item} className="flex items-start text-xs font-medium text-slate-300">
                    <CheckCircleIcon className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mt-6 pt-4 border-t border-slate-800">
              Diversified SaaS & Consulting
            </span>
          </div>

          {/* Strategic Moats */}
          <div className="bg-slate-50 rounded-[28px] p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <AcademicCapIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Strategic Moats</h3>
              <ul className="space-y-2.5">
                {COMPETITIVE_ADVANTAGE.slice(0, 5).map(item => (
                  <li key={item} className="flex items-start text-xs font-medium text-slate-700">
                    <CheckCircleIcon className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6 pt-4 border-t border-slate-200">
              Proprietary African Assets
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* Sovereign Infrastructure & Campus Facilities */}
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            SOVEREIGN CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
            Physical & Research Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
            State-of-the-art facilities designed for pan-African AI compute, agricultural hardware telemetry, and enterprise technology acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Headquarters Atrium */}
          <div className="bg-[#f8fafc] rounded-[28px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col group">
            <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-950">
              <img 
                src={BRAND_ASSETS.atriumHeadquarters} 
                alt="iTech Groups Corporate Headquarters Atrium" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 border border-slate-100">
                LOKOJA, NIGERIA
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                  Corporate Headquarters Atrium
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Central executive operations, sovereign data vault management, and continental corporate governance offices.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>Executive Operations</span>
                <span>Tier-3 Compliance</span>
              </div>
            </div>
          </div>

          {/* Card 2: Innovation Campus & Pavilion */}
          <div className="bg-[#f8fafc] rounded-[28px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col group">
            <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-950">
              <img 
                src={BRAND_ASSETS.campusExterior} 
                alt="iTech High-Tech Innovation Campus Pavilion" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 border border-slate-100">
                EXPANSION HUBS
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                  High-Tech Innovation Pavilion
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Architecturally integrated campus with research labs, 3MTT training suites, and institutional venture incubators.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>R&D Clusters</span>
                <span>Talent Incubators</span>
              </div>
            </div>
          </div>

          {/* Card 3: Research & Telemetry Pod */}
          <div className="bg-[#f8fafc] rounded-[28px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col group">
            <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-950">
              <img 
                src={BRAND_ASSETS.capsulePavilion} 
                alt="iTech Research and Telemetry Innovation Pod" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 border border-slate-100">
                EDGE RESEARCH
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                  Advanced Telemetry Pod
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Rapid deployment modular research chambers validating AgriSmart field telemetry, satellite links, and sovereign IoT sensors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>Field IoT Hardware</span>
                <span>Edge Telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Leadership Spotlight */}
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-8">
          <div className="w-36 h-36 rounded-[24px] overflow-hidden bg-slate-100 border-2 border-slate-900 flex-shrink-0 shadow-md">
            <img 
              src="https://i.ibb.co/NdqKCSsW/profile-picture-edited.png"
              alt="Olabode Ilesanmi, Founder of ITECH Groups Nigeria" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              FOUNDER & CHIEF EXECUTIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-2">{LEADERSHIP.name}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">{LEADERSHIP.title}</p>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed font-normal">{LEADERSHIP.bio}</p>
            
            <div className="flex flex-wrap gap-1.5 mt-4">
              {LEADERSHIP.skills.map(skill => (
                <span key={skill} className="bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
              <Link to="/contact" className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-full hover:bg-slate-800 transition-all shadow-xs">
                Contact Founder Desk
              </Link>
              <Link to="/investors" className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900">
                View Investor Pitch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);