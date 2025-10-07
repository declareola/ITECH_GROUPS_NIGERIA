import React from 'react';
import { SERVICES_DATA } from '../constants';
import {
  AiBotIcon, ChartBarIcon, CodeBracketIcon, LeafIcon, AcademicCapIcon,
  HeartIcon, BuildingOfficeIcon, PaintBrushIcon, CheckCircleIcon, SparklesIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';
import { InteractiveCard } from './InteractiveCard';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  AiBotIcon, ChartBarIcon, CodeBracketIcon, LeafIcon, AcademicCapIcon,
  HeartIcon, BuildingOfficeIcon, PaintBrushIcon,
};

interface ServicesPageProps {
  onOpenScopingTool: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenScopingTool }) => {
  return (
    <section id="services" className="py-20 bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <FadeIn className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            At ITECH Groups Nigeria, we build intelligent digital solutions that help people, businesses, and governments achieve measurable growth. Our services cut across multiple sectors, with each division focusing on innovation, impact, and scalability.
          </p>
        </FadeIn>

        {/* AI Project Scoping Tool CTA */}
        <FadeIn>
          <div className="mb-20 bg-slate-800/50 rounded-2xl border border-teal-500/30 p-8 md:p-12 text-center shadow-2xl overflow-hidden relative">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-teal-500/20 to-transparent rounded-full animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <SparklesIcon className="w-12 h-12 text-teal-300" />
              </div>
              <h2 className="text-3xl font-bold text-teal-300">Have a Project in Mind?</h2>
              <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">
                Don't just wonder about the possibilities. Use our AI-Powered Project Scoping Tool to get a personalized preliminary brief in minutes.
              </p>
              <button 
                onClick={onOpenScopingTool}
                className="mt-8 inline-flex items-center bg-teal-600 text-white font-medium py-3 px-8 rounded-md hover:bg-teal-500 transition-all duration-300 text-lg transform hover:scale-105 shadow-lg shadow-teal-600/30"
              >
                <SparklesIcon className="w-5 h-5 mr-3"/>
                Scope Your Project with AI
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 gap-10" stagger={0.1}>
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <FadeInItem key={service.id}>
                <InteractiveCard>
                  <div className="bg-slate-800 rounded-lg shadow-lg p-8 flex flex-col h-full border border-transparent hover:border-teal-500/50 transition-colors duration-300">
                    <div className="flex items-center mb-4">
                      {Icon && <Icon className="w-10 h-10 text-teal-400 mr-4" />}
                      <h2 className="text-2xl font-bold text-teal-400">{service.title}</h2>
                    </div>
                    <p className="text-slate-400 mb-6 flex-grow">{service.description}</p>
                    
                    {service.flagshipProduct && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-200">Flagship Product: <span className="text-teal-300">{service.flagshipProduct.name}</span></h4>
                        <p className="text-slate-400 text-sm mt-1">{service.flagshipProduct.description}</p>
                      </div>
                    )}

                    {service.offerings && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-200 mb-2">Services:</h4>
                        <ul className="space-y-2">
                          {service.offerings.map(item => <li key={item} className="flex items-start text-slate-400"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
                        </ul>
                      </div>
                    )}
                    
                    {service.features && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-200 mb-2">Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map(item => <li key={item} className="flex items-start text-slate-400"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
                        </ul>
                      </div>
                    )}
                    
                    {service.process && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-200 mb-2">Our Process:</h4>
                        <ol className="list-decimal list-inside text-slate-400 space-y-1">
                          {service.process.map(step => <li key={step}>{step}</li>)}
                        </ol>
                      </div>
                    )}

                    {(service.value || service.impactGoal) && (
                      <div className="mt-auto pt-4 border-t border-slate-700">
                        <p className="text-teal-300">
                          <span className="font-bold text-teal-200">{service.value ? "Value:" : "Impact Goal:"}</span> {service.value || service.impactGoal}
                        </p>
                      </div>
                    )}
                  </div>
                </InteractiveCard>
              </FadeInItem>
            );
          })}
        </StaggeredFadeIn>
      </div>
    </section>
  );
};