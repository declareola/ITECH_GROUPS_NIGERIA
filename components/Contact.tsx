import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { 
  CONTACT_INFO, 
  QUICK_CONTACT, 
  FAQS, 
  TESTIMONIAL, 
  OFFICES, 
  DEPARTMENTAL_CONTACTS,
} from '../constants';
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  TelegramIcon, 
  QuoteIcon,
  ChevronDownIcon, 
  ImpactIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  SparklesIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';

const FaqItem: React.FC<{ faq: { q: string; a: string }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200/90 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 text-left transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-amber-600 transition-colors">
          {faq.q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ml-4 ${
          isOpen ? 'bg-amber-400 text-slate-950 rotate-180' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
        }`}>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
          {faq.a}
        </p>
      </div>
    </div>
  );
};

const departmentIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  "General Inquiries & Partnerships": EnvelopeIcon,
  "Investor Relations": ImpactIcon,
  "Careers": UserGroupIcon,
};

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFaqClick = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contact" className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      {/* Page Header */}
      <section className="px-4 sm:px-8 pt-12 pb-14 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-xs">
            EXECUTIVE ENGAGEMENT & DESKS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.08]">
            Direct Institutional Access
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Connect directly with our headquarters in Lokoja, subsidiary leaders, and executive committee across Africa and global markets.
          </p>
        </FadeIn>

        {/* Primary Contact Bento (Form + Direct Channels) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Form: Architectural White Card */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200/90 shadow-sm">
            <div className="mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                EXECUTIVE INQUIRY FORM
              </span>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Send an Executive Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Our operations team reviews all incoming inquiries and guarantees a response within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto mb-4 font-black text-xl shadow-md">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Inquiry Received</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed font-normal">
                  Thank you for reaching out to ITECH Groups Nigeria. Your message has been routed to the appropriate corporate desk. We will respond promptly within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="full-name" 
                      id="full-name" 
                      required 
                      autoComplete="name" 
                      className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder-slate-400 font-medium" 
                      placeholder="e.g. Dr. Ngozi Adebayo" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Corporate Email</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      autoComplete="email" 
                      className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder-slate-400 font-medium" 
                      placeholder="name@organization.com" 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone" 
                      autoComplete="tel" 
                      className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder-slate-400 font-medium" 
                      placeholder="+234 ..." 
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      id="subject" 
                      required 
                      className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder-slate-400 font-medium" 
                      placeholder="e.g. Enterprise AI Deployment Partnership" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="block w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder-slate-400 font-medium" 
                    placeholder="Provide details about your project, timeline, or collaboration requirements..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full inline-flex items-center justify-center py-3.5 px-8 rounded-full text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all duration-200"
                  >
                    Send Executive Message &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Obsidian Luxury Headquarters & Rapid Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-[#181d27] text-white p-8 rounded-[32px] border border-slate-800 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-2">
                CORPORATE HEADQUARTERS
              </span>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                Lokoja Campus
              </h3>
              
              <div className="space-y-4 text-xs text-slate-300 font-normal">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Official Address</span>
                    <span className="text-slate-400 leading-relaxed">{CONTACT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Official Email</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-300 hover:text-white font-medium break-all">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Direct Line</span>
                    <span className="text-slate-300">{CONTACT_INFO.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-400">
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </div>

            {/* Quick Response Channels */}
            <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-slate-200/90 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                INSTANT EXECUTIVE CHANNELS
              </span>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4">
                Real-Time Messaging
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-3">
                <Tooltip content={QUICK_CONTACT.whatsapp.display} position="top">
                  <a 
                    href={QUICK_CONTACT.whatsapp.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 hover:border-slate-900 p-3.5 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                        <WhatsAppIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">WhatsApp</span>
                    </div>
                    <span className="text-slate-400 group-hover:text-slate-950 font-bold text-xs">↗</span>
                  </a>
                </Tooltip>

                <Tooltip content={QUICK_CONTACT.telegram.username} position="top">
                  <a 
                    href={QUICK_CONTACT.telegram.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 hover:border-slate-900 p-3.5 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center flex-shrink-0">
                        <TelegramIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">Telegram</span>
                    </div>
                    <span className="text-slate-400 group-hover:text-slate-950 font-bold text-xs">↗</span>
                  </a>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Departmental Desks Bento Grid */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              SPECIALIZED DIVISIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mt-1">
              Direct Departmental Desks
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEPARTMENTAL_CONTACTS.map((dept, index) => {
              const Icon = departmentIconMap[dept.name] || EnvelopeIcon;
              const isDark = index === 1;

              return (
                <div 
                  key={dept.name} 
                  className={`p-6 sm:p-7 rounded-[28px] border flex flex-col justify-between transition-all duration-300 shadow-sm min-w-0 overflow-hidden ${
                    isDark 
                      ? 'bg-[#181d27] text-white border-slate-800' 
                      : 'bg-white text-slate-900 border-slate-200/90 hover:border-slate-900'
                  }`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 font-bold ${
                      isDark ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-lg font-black uppercase tracking-tight mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {dept.name}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal mb-6 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {dept.description}
                    </p>
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'} w-full min-w-0 overflow-hidden`}>
                    <a 
                      href={`mailto:${dept.email}`} 
                      title={dept.email}
                      className={`group flex items-center justify-between gap-2 w-full min-w-0 py-2 px-3 rounded-xl border transition-all text-xs font-semibold ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 hover:bg-slate-900' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 hover:text-amber-600 hover:border-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate lowercase tracking-normal font-mono text-[11px] sm:text-xs">
                        {dept.email}
                      </span>
                      <span className="flex-shrink-0 font-bold text-xs transform group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial & FAQs Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Testimonial Card */}
          <div className="lg:col-span-5 bg-[#181d27] text-white p-8 sm:p-10 rounded-[32px] border border-slate-800 shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-6">
                <QuoteIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-2">
                EXECUTIVE ENDORSEMENT
              </span>
              <p className="text-base sm:text-lg text-slate-200 font-medium italic leading-relaxed mb-6">
                "{TESTIMONIAL.quote}"
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <span className="font-black text-sm uppercase text-white block">{TESTIMONIAL.author}</span>
              <span className="text-xs text-slate-400 font-medium">{TESTIMONIAL.title}</span>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200/90 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              CLARIFICATIONS
            </span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-slate-100">
              {FAQS.map((faq, index) => (
                <FaqItem 
                  key={faq.q} 
                  faq={faq} 
                  isOpen={openFaq === index} 
                  onClick={() => handleFaqClick(index)} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};