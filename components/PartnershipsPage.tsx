import React from 'react';
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
    <div className="pt-24 bg-slate-900/80 backdrop-blur-sm text-slate-200">
      {/* Page Header */}
      <FadeIn>
        <section className="bg-slate-950/80 backdrop-blur-sm py-16 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{header.title}</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">{header.overview}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {header.partners.map(p => <span key={p} className="bg-slate-800 text-teal-300 text-sm font-semibold px-4 py-1 rounded-full capitalize">{p}</span>)}
          </div>
        </section>
      </FadeIn>

      {/* Why Partner With Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center">
            <h2 className="text-4xl font-bold mb-16">{whyPartner.title}</h2>
          </FadeIn>
          <StaggeredFadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {whyPartner.points.map(point => {
              const Icon = iconMap[point.icon];
              return (
                <FadeInItem key={point.title}>
                  <div className="group bg-slate-800 p-8 rounded-lg text-center h-full transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex justify-center items-center mb-4">
                      {Icon && <Icon className="w-12 h-12 text-teal-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />}
                    </div>
                    <h3 className="text-2xl font-bold text-teal-400 mb-3">{point.title}</h3>
                    <p className="text-slate-400">{point.description}</p>
                  </div>
                </FadeInItem>
              );
            })}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Areas of Partnership & Opportunities */}
      <section className="py-20 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div>
              <h3 className="text-3xl font-bold mb-8 text-teal-400">{areas.title}</h3>
              <ul className="space-y-4">
                {areas.items.map(item => {
                  const [title, description] = item.split(': ');
                  return (
                    <li key={title} className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 mr-3 mt-1 text-teal-500 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-200">{title}:</span>
                        <span className="text-slate-400 ml-1">{description}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-slate-800 p-8 rounded-lg sticky top-24">
              <h3 className="text-3xl font-bold mb-8 text-teal-400">{opportunities.title}</h3>
              <ul className="space-y-3">
                {opportunities.items.map(item => (
                  <li key={item} className="flex items-start">
                    <span className="text-teal-400 font-bold mr-2">›</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How to Partner & Contact */}
      <FadeIn>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 bg-slate-800/50 p-10 rounded-lg items-center">
              <div>
                  <h3 className="text-3xl font-bold mb-6 text-teal-300">{howToPartner.title}</h3>
                  <p className="text-slate-300 mb-4">{howToPartner.description}</p>
                  <ul className="space-y-2">
                      {howToPartner.criteria.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0"/>{item}</li>)}
                  </ul>
              </div>
               <div>
                  <h4 className="text-xl font-bold text-teal-400 mb-4">{contact.title}</h4>
                  <div className="space-y-3 text-slate-300">
                      <p className="flex items-center">
                          <EnvelopeIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                          <a href={`mailto:${contact.email}`} className="hover:text-teal-300">{contact.email}</a>
                      </p>
                      <p className="flex items-center">
                          <PhoneIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                          {contact.phone}
                      </p>
                      <p className="flex items-start">
                          <GlobeAltIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0 mt-1" />
                          <a href={`http://${contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300">{contact.website}</a>
                      </p>
                  </div>
              </div>
          </div>
        </section>
      </FadeIn>
      
      {/* Commitment */}
      <section className="bg-slate-950/80 backdrop-blur-sm py-12 text-center px-4">
        <FadeIn className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-teal-300">Our Commitment</h3>
            <p className="mt-3 text-lg text-slate-300 italic">"{commitment}"</p>
        </FadeIn>
      </section>
    </div>
  );
};