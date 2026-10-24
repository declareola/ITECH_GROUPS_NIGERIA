import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../constants';
import {
  AiBotIcon, ChartBarIcon, CodeBracketIcon, LeafIcon, AcademicCapIcon,
  HeartIcon, BuildingOfficeIcon, PaintBrushIcon, CheckCircleIcon, SparklesIcon,
  DocumentTextIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  AiBotIcon, ChartBarIcon, CodeBracketIcon, LeafIcon, AcademicCapIcon,
  HeartIcon, BuildingOfficeIcon, PaintBrushIcon,
};

interface ServicesPageProps {
  onOpenScopingTool: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenScopingTool }) => {
  return (
    <div id="services" className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        {/* Page Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            ENTERPRISE DEPLOYMENTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
            Sovereign Digital Services
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            At ITECH Groups Nigeria, we engineer intelligent digital systems that power enterprise operations, agricultural yields, and government data pipelines across Africa.
          </p>
        </FadeIn>

        {/* Interactive Innovation Tools (Matching the Luxury Bento Style) */}
        <FadeIn>
          <div className="mb-16 grid md:grid-cols-2 gap-6">
            {/* Scoping Tool (Obsidian Luxury Card) */}
            <div className="bg-[#181d27] text-white rounded-[28px] p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-6 font-bold">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                  AI ARCHITECT
                </span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Project Scoping Assistant</h2>
                <p className="text-slate-300 mt-3 text-xs sm:text-sm leading-relaxed font-normal">
                  Plan your enterprise engineering roadmap. Generate a comprehensive preliminary requirements brief with cost and timeline projections in minutes.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800">
                <button 
                  onClick={onOpenScopingTool}
                  className="w-full inline-flex items-center justify-center bg-white text-slate-950 font-black py-3 px-6 rounded-full hover:bg-slate-100 transition-all text-xs uppercase tracking-wider shadow-sm"
                >
                  <SparklesIcon className="w-4 h-4 mr-2"/>
                  Launch Scoping Tool
                </button>
              </div>
            </div>

            {/* Research & Intelligence (White Luxury Card) */}
            <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
                  <DocumentTextIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  INTELLIGENCE DESK
                </span>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Institutional Research Briefs</h2>
                <p className="text-slate-600 mt-3 text-xs sm:text-sm leading-relaxed font-normal">
                  In-depth sector writeups and empirical research on African AgriTech, Sovereign AI infrastructure, Public Data Governance, and HealthTech.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to="/blog"
                  className="w-full inline-flex items-center justify-center bg-slate-900 text-white font-bold py-3 px-6 rounded-full hover:bg-slate-800 transition-all text-xs uppercase tracking-wider shadow-sm"
                >
                  <DocumentTextIcon className="w-4 h-4 mr-2"/>
                  Read Research Publications
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            CAPABILITY CATALOG
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-1">
            Complete Engineering & Sector Offerings
          </h2>
        </div>

        <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.icon] || SparklesIcon;
            return (
              <FadeInItem key={service.id}>
                <div className="bg-white rounded-[28px] border border-slate-200/90 p-8 flex flex-col h-full shadow-sm hover:border-slate-900 transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">SERVICE 0{service.id}</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug">{service.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-6 flex-grow">{service.description}</p>
                  
                  {service.flagshipProduct && (
                    <div className="mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-0.5">Flagship Product</span>
                      <div className="text-sm font-bold text-slate-900">{service.flagshipProduct.name}</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{service.flagshipProduct.description}</p>
                    </div>
                  )}

                  {service.offerings && (
                    <div className="mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Scope of Services</span>
                      <ul className="space-y-1.5">
                        {service.offerings.map(item => (
                          <li key={item} className="flex items-start text-xs text-slate-700 font-medium">
                            <CheckCircleIcon className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {service.features && (
                    <div className="mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Key Features</span>
                      <ul className="space-y-1.5">
                        {service.features.map(item => (
                          <li key={item} className="flex items-start text-xs text-slate-700 font-medium">
                            <CheckCircleIcon className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(service.value || service.impactGoal) && (
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-black uppercase tracking-wider text-slate-900">
                        {service.value ? "Direct Value:" : "Impact Target:"}
                      </span>
                      <span className="text-slate-600 font-semibold text-right max-w-[70%]">
                        {service.value || service.impactGoal}
                      </span>
                    </div>
                  )}
                </div>
              </FadeInItem>
            );
          })}
        </StaggeredFadeIn>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#181d27] text-white rounded-[32px] p-8 sm:p-12 border border-slate-800 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Need a Custom Enterprise Scope?</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            Our multi-disciplinary teams deploy integrated hardware telemetry, AI algorithms, and custom client interfaces.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={onOpenScopingTool}
              className="bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider px-7 py-3 rounded-full hover:bg-amber-300 transition-all shadow-md"
            >
              Start Scoping Brief
            </button>
            <Link
              to="/contact"
              className="border border-slate-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full hover:bg-slate-800 transition-all"
            >
              Speak to an Architect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};