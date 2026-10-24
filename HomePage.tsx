import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGES } from './assets/images';
import { 
  GROWTH_STRATEGY,
  STRATEGIC_GOALS,
  GLOBAL_VISIBILITY_PLAN,
  BLOG_POSTS,
  DIVISIONS,
  LEADERSHIP
} from './constants';
import { 
  CheckCircleIcon,
  GlobeAltIcon,
  MegaphoneIcon,
  SparklesIcon,
  LeafIcon,
  AcademicCapIcon,
  AiBotIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  HeartIcon,
  PaintBrushIcon
} from './components/IconComponents';
import { FadeIn } from './components/FadeIn';

const divisionIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  "ITECH AgriSolutions": LeafIcon,
  "ITECH Learn": AcademicCapIcon,
  "ITECH AI Labs": AiBotIcon,
  "ITECH Data Services": ChartBarIcon,
  "ITECH RealEstate Hub": BuildingOfficeIcon,
  "ITECH HealthConnect": HeartIcon,
  "ITECH Creative Studios": PaintBrushIcon,
};

const TimelineItem: React.FC<{ item: { phase: string; description: string }; index: number }> = ({ item, index }) => {
  const isLeft = index % 2 !== 0;
  return (
    <div className={`flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="w-5/12">
        <motion.div
          className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-sm hover:border-slate-900 transition-colors"
          initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded-full">
              {item.phase}
            </span>
          </div>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">{item.description}</p>
        </motion.div>
      </div>
      <div className="w-2/12 flex justify-center">
        <motion.div
          className="w-9 h-9 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white font-black text-xs z-10 shadow-md"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.15, type: 'spring' }}
        >
          {index + 1}
        </motion.div>
      </div>
      <div className="w-5/12"></div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0);
  const activeDivision = DIVISIONS[activeDivisionIndex];
  const ActiveIcon = divisionIconMap[activeDivision.name] || SparklesIcon;

  return (
    <div className="bg-[#f8fafc] text-slate-900">
      {/* ========================================================
          HERO SECTION: EXACT REPLICA OF THE LUXURY BENTO MOCKUP
         ======================================================== */}
      <section className="px-4 sm:px-8 pt-6 pb-14 max-w-7xl mx-auto">
        {/* Bento Grid (3 Columns Matching Reference Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* 1. LEFT COLUMN: Rounded Scoop Window + Pill + 7+ Metric */}
          <div className="lg:col-span-3 bg-white rounded-[28px] p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              {/* Architectural Scoop Window */}
              <div className="h-64 sm:h-72 w-full relative rounded-[22px] overflow-hidden bg-slate-100 shadow-inner group">
                <img 
                  src={HERO_IMAGES.leftPavilion} 
                  alt="ITECH High-Tech Innovation Pavilion"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                {/* Floating Bottom Pill Badge with Arrow Button */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md pl-3 pr-1.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                    SOVEREIGN TECH
                  </span>
                  <Link 
                    to="/divisions" 
                    className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs hover:bg-slate-800 transition-colors"
                    aria-label="View Divisions"
                  >
                    ↗
                  </Link>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase leading-snug mt-4">
                SELECTION AND DEPLOYMENT OF SOVEREIGN TECH SOLUTIONS ACROSS AFRICA.
              </p>
              <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                Empowering agro-systems, AI modeling, and enterprise data analytics for African markets.
              </p>
            </div>

            {/* Bold Metric matching "50+ HOMES SOLD" */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums">
                7+
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                SUBSIDIARIES SCALING IN AFRICA
              </div>
            </div>
          </div>

          {/* 2. CENTER COLUMN: Giant Architectural Hero with "YOUR HOME IS YOUR FUTURE." typography */}
          <div className="lg:col-span-6 bg-slate-950 rounded-[28px] overflow-hidden relative min-h-[500px] lg:min-h-[620px] flex flex-col justify-between p-6 sm:p-12 border border-slate-200/80 shadow-md group">
            {/* Background Image */}
            <img 
              src={HERO_IMAGES.campus} 
              alt="ITECH Groups Headquarters Atrium"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" 
              referrerPolicy="no-referrer"
            />
            {/* Dark Vignette Overlay for Crisp White Typography Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/40"></div>

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                AFRICAN TECHNOLOGY CONGLOMERATE
              </span>
            </div>

            {/* Center Big Bold Display Typography: Matching Mockup exactly */}
            <div className="relative z-10 max-w-md my-auto pt-6 pb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05] drop-shadow-lg">
                BUILDING<br />
                AFRICA’S<br />
                <span className="bg-amber-400 text-slate-950 px-3.5 py-1 rounded-xl inline-block mt-2 font-black shadow-xl">
                  FUTURE.
                </span>
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed drop-shadow">
                Sovereign artificial intelligence, data engineering, and agricultural systems built for Africa’s economic leapfrog.
              </p>
            </div>

            {/* Bottom Strip inside Hero */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/90 border-t border-white/20 pt-4">
              <span>HEADQUARTERS: LOKOJA, NIGERIA</span>
              <span>5 EXPANSION HUBS</span>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: Stacked Cards matching reference mockup */}
          <div className="lg:col-span-3 flex flex-col gap-5 justify-between">
            {/* Top Charcoal Card: Matching the dark box with EXPLORE MORE button */}
            <div className="bg-[#181d27] text-white rounded-[24px] p-6 flex flex-col justify-between border border-slate-800 shadow-sm relative overflow-hidden">
              <div>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-black">
                  --- ITECH ---
                </span>
                <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mt-2.5 leading-snug">
                  YOUR GUIDE TO AFRICA’S DIGITAL ECONOMY
                </h2>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-normal">
                  We engineer proprietary African language models, AgriSmart telemetry, and institutional data analytics to drive measurable growth.
                </p>
              </div>

              {/* White Pill Button matching EXPLORE MORE */}
              <div className="mt-5">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center bg-white text-slate-950 font-black px-6 py-2.5 rounded-full hover:bg-slate-100 transition-all text-[11px] tracking-widest uppercase shadow-sm"
                >
                  EXPLORE MORE
                </Link>
              </div>
            </div>

            {/* Bottom Card: Capsule window + vertical rotated stat matching "1.4K+ COMPLETED PROJECTS" */}
            <div className="bg-white rounded-[24px] p-2 flex items-stretch border border-slate-200/90 shadow-sm overflow-hidden h-52 sm:h-60 relative">
              {/* Vertical Rotated Text Strip */}
              <div className="w-14 flex items-center justify-center text-slate-950 font-black text-[11px] uppercase tracking-widest select-none transform -rotate-90 whitespace-nowrap">
                <span className="text-lg font-black mr-1 text-slate-950 tabular-nums">1M+</span> IMPACT TARGET
              </div>

              {/* Capsule Image Window */}
              <div className="rounded-[20px] overflow-hidden flex-1 relative bg-slate-100 group">
                <img 
                  src={HERO_IMAGES.capsule} 
                  alt="ITECH Research and Innovation Pod"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PARTNER & INSTITUTIONAL STRIP (MATCHING REFERENCE MOCKUP)
           ======================================================== */}
        <div className="mt-6 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center text-center">
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
            <span className="w-3 h-3 rounded-sm border-2 border-slate-900 inline-block"></span>
            <span className="text-xs font-black tracking-wider uppercase text-slate-900">3MTT NIGERIA</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
            <span className="text-xs font-black tracking-wider uppercase text-slate-900">AGRISMART AI</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
            <span className="w-3 h-3 border border-slate-900 rotate-45 inline-block"></span>
            <span className="text-xs font-black tracking-wider uppercase text-slate-900">CARA AI LABS</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
            <span className="w-3 h-3 rounded-sm bg-slate-900 inline-block"></span>
            <span className="text-xs font-black tracking-wider uppercase text-slate-900">PROPLINK HUB</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
            <span className="w-3 h-3 rounded-full border-2 border-slate-900 inline-block"></span>
            <span className="text-xs font-black tracking-wider uppercase text-slate-900">HEALTHCONNECT</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
            <span className="w-3 h-3 rounded-sm border border-slate-900 inline-block"></span>
            <span className="text-xs font-black tracking-wider uppercase text-slate-900">CREATIVE STUDIO</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          THE ITECH ECOSYSTEM (7 SUBSIDIARIES EXPLORER)
         ======================================================== */}
      <section id="ecosystem" className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                HOLDING PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
                The 7 ITECH Operating Subsidiaries
              </h2>
            </div>
            <Link
              to="/divisions"
              className="mt-4 md:mt-0 text-xs font-black uppercase tracking-wider text-slate-900 hover:text-amber-600 transition-colors"
            >
              View Full Subsidiary Dossier &rarr;
            </Link>
          </div>

          {/* Interactive Division Selector */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Division Tabs */}
            <div className="lg:col-span-5 space-y-2">
              {DIVISIONS.map((div, idx) => {
                const Icon = divisionIconMap[div.name] || SparklesIcon;
                const isSelected = idx === activeDivisionIndex;
                return (
                  <button
                    key={div.name}
                    onClick={() => setActiveDivisionIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white text-slate-700 border border-slate-200'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm tracking-wide">
                          {div.name}
                        </div>
                        <div className={`text-xs line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {div.focus}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'text-slate-400'}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Division Card */}
            <div className="lg:col-span-7 bg-[#181d27] text-white rounded-[28px] p-8 sm:p-10 shadow-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">{activeDivision.name}</h3>
                      <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-0.5">{activeDivision.focus}</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-700 px-3 py-1 rounded-full">
                    SUBSIDIARY 0{activeDivisionIndex + 1}
                  </span>
                </div>

                {activeDivision.product && (
                  <div className="mt-6 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                    <div className="text-[10px] uppercase tracking-widest font-black text-amber-400 mb-1">
                      Flagship Platform
                    </div>
                    <div className="text-lg font-black text-white">{activeDivision.product.name}</div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">{activeDivision.product.description}</p>
                  </div>
                )}

                {activeDivision.services && (
                  <div className="mt-6">
                    <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3">
                      Core Capabilities
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {activeDivision.services.map((svc) => (
                        <li key={svc} className="flex items-start text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          <CheckCircleIcon className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeDivision.goal && (
                  <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] uppercase tracking-widest font-black text-amber-400 mb-1">
                      Continental Objective
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeDivision.goal}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-8 mt-6 border-t border-slate-800">
                <Link
                  to="/divisions"
                  className="bg-white text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-100 transition-all shadow-sm"
                >
                  View Division Profile
                </Link>
                <Link
                  to="/contact"
                  className="border border-slate-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all"
                >
                  Initiate Partnership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          EXPANSION ROADMAP & CONTINENTAL TIMELINE
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              GROWTH STRATEGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
              5-Phase Continental & Global Roadmap
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium">
              From regional validation in Lokoja & Nigeria to continental data hubs and international offices.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {GROWTH_STRATEGY.map((item, idx) => (
              <div 
                key={item.phase} 
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start gap-5 hover:border-slate-900 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded-full">
                    {item.phase}
                  </span>
                  <p className="mt-2 text-sm sm:text-base font-semibold text-slate-800">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          LEADERSHIP & 3MTT SOVEREIGN TECH HERITAGE
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="bg-[#181d27] text-white p-8 rounded-[28px] border border-slate-800 shadow-xl relative">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center mb-6">
                OI
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">{LEADERSHIP.name}</h3>
              <p className="text-amber-400 font-bold text-xs uppercase tracking-wider mt-1">{LEADERSHIP.title}</p>
              <p className="text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed font-normal">{LEADERSHIP.bio}</p>

              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3">
                  Technical Domains & Specializations
                </div>
                <div className="flex flex-wrap gap-2">
                  {LEADERSHIP.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 text-[11px] font-bold bg-slate-900 border border-slate-700 rounded-full text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              GOVERNANCE & STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
              Engineering African Sovereign Digital Assets
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              ITECH Groups Nigeria was founded on a singular conviction: Africa must not merely consume digital technology from abroad, but engineer world-class, sovereign digital systems trained on African data and tailored for African growth.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <div className="text-slate-900 font-black text-xs uppercase tracking-wider mb-1">3MTT Program Heritage</div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Rooted in Nigeria’s landmark Three Million Technical Talent program, driving data-centered transformation.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <div className="text-slate-900 font-black text-xs uppercase tracking-wider mb-1">ISO & GDPR Ethics</div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Operating at international benchmarks for data privacy, algorithmic accountability, and sovereign security.
                </p>
              </div>
            </div>
            <div>
              <Link to="/about" className="text-xs font-black uppercase tracking-wider text-slate-900 hover:text-amber-600 inline-flex items-center">
                Learn more about our governance and mission &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTELLIGENCE & INSIGHTS PUBLICATIONS
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                THOUGHT LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-1">
                ITECH Intelligence & Publications
              </h2>
            </div>
            <Link
              to="/blog"
              className="mt-4 md:mt-0 text-xs font-black uppercase tracking-wider text-slate-900 hover:text-amber-600"
            >
              View all publications &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div 
                key={post.title}
                className="bg-white border border-slate-200/90 rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:border-slate-900 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    Research Brief
                  </span>
                  <h3 className="text-base font-black text-slate-900 leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
                    {post.summary}
                  </p>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-black uppercase tracking-wider text-slate-900 hover:text-amber-600 inline-flex items-center"
                >
                  Read full analysis &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          INVESTOR MEMORANDUM CALL TO ACTION
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-200 bg-white text-center">
        <div className="max-w-4xl mx-auto bg-[#181d27] text-white rounded-[32px] p-8 sm:p-14 border border-slate-800 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 inline-block mb-3">
            CAPITAL ALLOCATION & PARTNERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Build Africa’s Future With ITECH Groups
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
            We partner with venture funds, sovereign development finance institutions, and enterprise leaders expanding across African digital infrastructure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/investors" 
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-3 rounded-full transition-all shadow-md w-full sm:w-auto"
            >
              Request Investor Deck
            </Link>
            <Link 
              to="/contact" 
              className="border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full transition-all w-full sm:w-auto"
            >
              Contact Leadership Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};