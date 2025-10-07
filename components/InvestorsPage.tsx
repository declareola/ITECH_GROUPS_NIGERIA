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
    <div id="investors" className="pt-24 bg-slate-900/80 backdrop-blur-sm text-slate-200">
      {/* Page Header */}
      <FadeIn>
        <section className="bg-slate-950/80 backdrop-blur-sm py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{header.title}</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">{header.overview}</p>
          <p className="mt-4 text-lg text-teal-300 font-semibold max-w-3xl mx-auto">{header.callToAction}</p>
        </section>
      </FadeIn>

      {/* Why Invest Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center">
            <h2 className="text-4xl font-bold mb-16">{whyInvest.title}</h2>
          </FadeIn>
          <StaggeredFadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {whyInvest.points.map(point => {
              const Icon = iconMap[point.icon];
              return (
                <FadeInItem key={point.title}>
                  <div className="bg-slate-800 p-8 rounded-lg text-center h-full transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex justify-center items-center mb-4">
                      {Icon && <Icon className="w-12 h-12 text-teal-400" />}
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

      {/* Opportunities & Financials */}
      <section className="py-20 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div>
              <h3 className="text-3xl font-bold mb-8 text-teal-400">{opportunities.title}</h3>
              <ul className="space-y-4">
                {opportunities.items.map(item => {
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
            <div className="bg-slate-800 p-8 rounded-lg sticky top-24 border border-teal-500/20 shadow-lg">
              <h3 className="text-3xl font-bold mb-4 text-teal-400 flex items-center"><DocumentTextIcon className="w-8 h-8 mr-3"/>{financials.title}</h3>
              <p className="text-sm font-semibold text-amber-400 mb-4">{financials.note}</p>
              <p className="text-slate-300">{financials.content}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* KPIs & Investment Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
              <FadeIn>
                  <div>
                      <h3 className="text-3xl font-bold mb-8 text-teal-400">{kpis.title}</h3>
                      <ul className="space-y-3">
                          {kpis.items.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-teal-500 flex-shrink-0"/>{item}</li>)}
                      </ul>
                  </div>
              </FadeIn>
              <FadeIn>
                  <div>
                      <h3 className="text-3xl font-bold mb-8 text-teal-400">{process.title}</h3>
                      <ol className="space-y-4">
                          {process.steps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-slate-900 font-bold rounded-full flex items-center justify-center mr-4">{index + 1}</span>
                                  <span className="text-slate-300 mt-1">{step}</span>
                              </li>
                          ))}
                      </ol>
                  </div>
              </FadeIn>
          </div>
        </div>
      </section>

      {/* Investor Contact & Form */}
      <section className="py-20 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center">
            <h2 className="text-4xl font-bold mb-16">Connect With Our Investor Relations Team</h2>
          </FadeIn>
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <FadeIn className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-teal-400 mb-4">Direct Contact</h3>
                  <div className="space-y-3 text-slate-300">
                    <p className="flex items-center">
                      <EnvelopeIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                      <a href={`mailto:${contact.email}`} className="hover:text-teal-300">{contact.email}</a>
                    </p>
                    <p className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                      {contact.phone}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg text-center">
                    <CheckBadgeIcon className="w-10 h-10 text-teal-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-teal-400 mb-2">Our Commitment</h3>
                    <p className="text-slate-400 text-sm italic">"{commitment}"</p>
                </div>
            </FadeIn>
            <FadeIn className="lg:col-span-3 bg-slate-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-teal-400 mb-6">Submit Your Interest</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-teal-400 mb-4">Thank You!</h3>
                  <p className="text-slate-300">Your interest has been registered. Our investor relations team will review your submission and contact you shortly to discuss potential synergies.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div><label htmlFor="investor-name" className="sr-only">Full name</label><input type="text" name="investor-name" id="investor-name" required autoComplete="name" className="block w-full py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Full Name" /></div>
                  <div><label htmlFor="investor-email" className="sr-only">Email</label><input id="investor-email" name="email" type="email" required autoComplete="email" className="block w-full py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Email Address" /></div>
                  <div><label htmlFor="investor-company" className="sr-only">Company / Organization</label><input type="text" name="investor-company" id="investor-company" className="block w-full py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Company / Organization" /></div>
                  <div><label htmlFor="investment-type" className="sr-only">Investment Type</label><select id="investment-type" name="investment-type" required className="block w-full py-3 px-4 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-300"><option>Investment Type</option><option>Equity Partnership</option><option>Strategic Partnership</option><option>Impact Investment</option><option>Venture Co-Building</option></select></div>
                  <div><label htmlFor="message" className="sr-only">Message</label><textarea id="message" name="message" rows={4} className="block w-full py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Message / Proposal (Optional)"></textarea></div>
                  <div className="flex items-start"><div className="flex-shrink-0"><input id="agreement" name="agreement" type="checkbox" required className="h-4 w-4 text-teal-600 border-slate-600 rounded focus:ring-teal-500"/></div><div className="ml-3 text-sm"><label htmlFor="agreement" className="font-medium text-slate-300">I confirm my interest in learning more about investment opportunities with ITECH Groups Nigeria.</label></div></div>
                  <div><button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors">Submit Interest</button></div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <FadeIn>
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-200">
              Trusted by Forward-Thinking Institutions
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              We are proud to partner with organizations committed to fostering technological growth and creating lasting impact in Africa.
            </p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4 items-center">
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl font-semibold tracking-wider text-slate-400">VENTURE INC.</span>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl font-semibold tracking-wider text-slate-400">IMPACT FUND</span>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl font-semibold tracking-wider text-slate-400">AFRICA TECH</span>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl font-semibold tracking-wider text-slate-400">INNOVA-HUB</span>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300 col-span-2 md:col-span-4 lg:col-span-1">
                <span className="text-xl font-semibold tracking-wider text-slate-400">GROWTH PARTNERS</span>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
};