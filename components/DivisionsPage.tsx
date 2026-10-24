import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DIVISIONS } from '../constants';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';
import { 
  LeafIcon, 
  AcademicCapIcon, 
  AiBotIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  HeartIcon, 
  PaintBrushIcon, 
  CheckCircleIcon,
  SparklesIcon
} from './IconComponents';

const divisionIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  "ITECH AgriSolutions": LeafIcon,
  "ITECH Learn": AcademicCapIcon,
  "ITECH AI Labs": AiBotIcon,
  "ITECH Data Services": ChartBarIcon,
  "ITECH RealEstate Hub": BuildingOfficeIcon,
  "ITECH HealthConnect": HeartIcon,
  "ITECH Creative Studios": PaintBrushIcon,
};

const divisionCategories: { [key: string]: string } = {
  "ITECH AgriSolutions": "AgriTech",
  "ITECH Learn": "EdTech & Skills",
  "ITECH AI Labs": "Artificial Intelligence",
  "ITECH Data Services": "Data Intelligence",
  "ITECH RealEstate Hub": "PropTech",
  "ITECH HealthConnect": "HealthTech",
  "ITECH Creative Studios": "Digital Media",
};

export const DivisionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Artificial Intelligence', 'Data Intelligence', 'AgriTech', 'EdTech & Skills', 'HealthTech', 'PropTech', 'Digital Media'];

  const filteredDivisions = selectedCategory === 'All' 
    ? DIVISIONS 
    : DIVISIONS.filter(div => divisionCategories[div.name] === selectedCategory);

  return (
    <div id="divisions" className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            CONGLOMERATE PORTFOLIO
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
            7 Operating Subsidiaries
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Each operating company at ITECH Groups Nigeria targets a systemic bottleneck in African development, applying rigorous data engineering, sovereign AI, and scalable digital systems.
          </p>
        </FadeIn>

        {/* Category Filter Pills (Matching Mockup Pill Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-900 hover:text-slate-950 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Divisions Presentation */}
        <StaggeredFadeIn className="space-y-6" stagger={0.1}>
          {filteredDivisions.map((division, index) => {
            const Icon = divisionIconMap[division.name] || SparklesIcon;
            const category = divisionCategories[division.name] || 'Technology';
            const isAlternate = index % 2 === 1;

            return (
              <FadeInItem key={division.name}>
                <div className={`rounded-[32px] p-8 sm:p-10 border transition-all duration-300 grid lg:grid-cols-12 gap-8 items-start shadow-sm ${
                  isAlternate 
                    ? 'bg-[#181d27] text-white border-slate-800' 
                    : 'bg-white text-slate-900 border-slate-200/90'
                }`}>
                  {/* Left Column: Subsidiary Profile */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 ${
                        isAlternate 
                          ? 'bg-amber-400 text-slate-950' 
                          : 'bg-slate-900 text-white'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full ${
                          isAlternate 
                            ? 'bg-slate-800 text-amber-400 border border-slate-700' 
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}>
                          {category}
                        </span>
                        <h2 className="text-2xl font-black uppercase tracking-tight mt-1">{division.name}</h2>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed font-normal pt-2 ${
                      isAlternate ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {division.focus}
                    </p>

                    {division.goal && (
                      <div className={`p-4 rounded-2xl border ${
                        isAlternate 
                          ? 'bg-slate-950/50 border-slate-800' 
                          : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`text-[10px] uppercase tracking-widest font-black block mb-1 ${
                          isAlternate ? 'text-amber-400' : 'text-slate-900'
                        }`}>
                          Strategic Ambition
                        </span>
                        <p className={`text-xs leading-relaxed ${
                          isAlternate ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {division.goal}
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className={`inline-flex items-center text-xs font-black uppercase tracking-wider ${
                          isAlternate ? 'text-amber-400 hover:text-amber-300' : 'text-slate-900 hover:text-amber-600'
                        }`}
                      >
                        Partner With {division.name} &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Flagship Product or Services */}
                  <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 space-y-6 border ${
                    isAlternate 
                      ? 'bg-slate-950/50 border-slate-800' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    {division.product && (
                      <div>
                        <span className={`text-[10px] uppercase tracking-widest font-black mb-1 block ${
                          isAlternate ? 'text-amber-400' : 'text-slate-500'
                        }`}>
                          Flagship Solution
                        </span>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2">{division.product.name}</h3>
                        <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                          isAlternate ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {division.product.description}
                        </p>
                      </div>
                    )}

                    {division.services && (
                      <div className="pt-2">
                        <span className={`text-[10px] uppercase tracking-widest font-black mb-3 block ${
                          isAlternate ? 'text-slate-400' : 'text-slate-400'
                        }`}>
                          Core Capabilities
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {division.services.map((service) => (
                            <div key={service} className={`flex items-start text-xs p-3 rounded-xl border font-medium ${
                              isAlternate 
                                ? 'bg-slate-950/70 text-slate-200 border-slate-800' 
                                : 'bg-white text-slate-800 border-slate-200 shadow-xs'
                            }`}>
                              <CheckCircleIcon className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${
                      isAlternate ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-400'
                    }`}>
                      <span>SUBSIDIARY OF ITECH GROUPS NIGERIA</span>
                      <span className="text-amber-500">GOVERNMENT & ENTERPRISE READY</span>
                    </div>
                  </div>
                </div>
              </FadeInItem>
            );
          })}
        </StaggeredFadeIn>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white border border-slate-200 p-10 rounded-[32px] shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Need a Cross-Disciplinary Solution?</h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-xs sm:text-sm font-medium">
            Our 7 divisions collaborate seamlessly to deploy end-to-end ecosystems spanning AI, hardware telemetry, data analytics, and user interfaces.
          </p>
          <div className="mt-6">
            <Link to="/contact" className="bg-slate-900 text-white font-black text-xs uppercase tracking-wider px-8 py-3 rounded-full hover:bg-slate-800 transition-all shadow-sm">
              Schedule an Executive Briefing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};