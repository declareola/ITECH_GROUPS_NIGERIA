import React from 'react';
import { DIVISIONS } from '../constants';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';
import { InteractiveCard } from './InteractiveCard';

export const DivisionsPage: React.FC = () => (
  <section id="divisions" className="py-20 bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-32 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">Our Divisions & Innovations</h2>
        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
          Each division at ITECH builds measurable impact, applying world-class engineering standards and global best practices to solve Africa's challenges.
        </p>
      </FadeIn>
      <StaggeredFadeIn className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
        {DIVISIONS.map((division) => (
          <FadeInItem key={division.name}>
            <InteractiveCard>
              <div className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col h-full border border-transparent hover:border-teal-500/50 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-teal-400 mb-3">{division.name}</h3>
                <p className="text-slate-400 mb-4"><span className="font-semibold text-slate-300">Focus:</span> {division.focus}</p>
                {division.product && (
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-200">Flagship Product: <span className="text-teal-300 font-semibold">{division.product.name}</span></h4>
                    <p className="text-slate-400 text-sm mt-1">{division.product.description}</p>
                  </div>
                )}
                {division.services && (
                  <div className="mb-4">
                     <h4 className="font-bold text-slate-200">Services:</h4>
                     <ul className="list-disc list-inside text-slate-400 text-sm mt-1 space-y-1">
                        {division.services.map(service => <li key={service}>{service}</li>)}
                     </ul>
                  </div>
                )}
                {division.goal && (
                  <p className="mt-auto pt-4 text-sm text-teal-400 border-t border-slate-700">
                    <span className="font-semibold text-teal-200">Ambition:</span> {division.goal}
                  </p>
                )}
              </div>
            </InteractiveCard>
          </FadeInItem>
        ))}
      </StaggeredFadeIn>
    </div>
  </section>
);