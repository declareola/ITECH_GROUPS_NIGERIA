import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { 
  CONTACT_INFO, 
  QUICK_CONTACT, 
  FAQS, 
  TESTIMONIAL, 
  OFFICES, 
  SOCIAL_PROOF_TEXT,
  DIVISIONAL_CONTACTS,
  OTHER_CONTACTS,
} from '../constants';
import { 
  EnvelopeIcon, MapPinIcon, PhoneIcon, WhatsAppIcon, TelegramIcon, QuoteIcon,
  ChevronDownIcon, LeafIcon, HeartIcon, PaintBrushIcon, BuildingOfficeIcon,
  AcademicCapIcon, InnovationIcon, ChartBarIcon, ImpactIcon, UserGroupIcon, MegaphoneIcon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';

const FaqItem: React.FC<{ faq: { q: string; a: string }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-200">{faq.q}</span>
        <ChevronDownIcon className={`w-5 h-5 text-teal-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pb-4 text-slate-400">
          <p>{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

const allContacts = [...DIVISIONAL_CONTACTS, ...OTHER_CONTACTS];
const contactIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    "AgriSolutions (AgriSmart)": LeafIcon,
    "Learn (AI LearnHub)": AcademicCapIcon,
    "AI Labs (Cara & Enterprise Automation)": InnovationIcon,
    "Data Services": ChartBarIcon,
    "HealthConnect": HeartIcon,
    "Creative Studios": PaintBrushIcon,
    "RealEstate Hub": BuildingOfficeIcon,
    "Investor Relations": ImpactIcon,
    "Work With Us": UserGroupIcon,
    "Media & Press": MegaphoneIcon,
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
    <section className="py-20 bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Let’s Build the Future Together</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            ITECH Groups Nigeria connects with innovators and partners who share our vision. Whether you want to collaborate, request a demo, or learn more, we're ready to talk.
          </p>
        </FadeIn>
        
        <div className="mt-20 grid lg:grid-cols-5 gap-12 items-start">
          <FadeIn className="lg:col-span-3 bg-slate-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-teal-400 mb-6">Send us a Message</h3>
            {submitted ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-teal-400 mb-4">Thank You!</h3>
                <p className="text-slate-300">Your message has been sent. We respond to every inquiry with the professionalism and speed that define our brand. Expect a reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div><label htmlFor="full-name" className="sr-only">Full name</label><input type="text" name="full-name" id="full-name" required autoComplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Full name" /></div>
                 <div><label htmlFor="email" className="sr-only">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Email Address" /></div>
                 <div><label htmlFor="phone" className="sr-only">Phone Number</label><input type="tel" name="phone" id="phone" autoComplete="tel" className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Phone Number (Optional)" /></div>
                 <div><label htmlFor="subject" className="sr-only">Subject</label><input type="text" name="subject" id="subject" required className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Subject" /></div>
                 <div><label htmlFor="message" className="sr-only">Message</label><textarea id="message" name="message" rows={5} required className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Your Message"></textarea></div>
                 <div><button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors">Send Message</button></div>
              </form>
            )}
          </FadeIn>

          <FadeIn className="lg:col-span-2 space-y-10">
            <div>
                <h3 className="text-xl font-bold text-teal-400 mb-4">Need a quick response?</h3>
                <div className="flex flex-col space-y-3">
                    <Tooltip content={QUICK_CONTACT.whatsapp.display} position="right">
                      <a href={QUICK_CONTACT.whatsapp.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition-colors" aria-label={`Chat on WhatsApp: ${QUICK_CONTACT.whatsapp.display}`}>
                        <WhatsAppIcon className="w-6 h-6 text-green-400 mr-4"/><span>Chat on WhatsApp</span>
                      </a>
                    </Tooltip>
                    <Tooltip content={QUICK_CONTACT.telegram.username} position="right">
                      <a href={QUICK_CONTACT.telegram.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition-colors" aria-label={`Contact on Telegram: ${QUICK_CONTACT.telegram.username}`}>
                        <TelegramIcon className="w-6 h-6 text-sky-400 mr-4"/><span>Contact on Telegram</span>
                      </a>
                    </Tooltip>
                </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-teal-400 mb-4">Head Office</h3>
              <div className="space-y-3 text-slate-300"><p className="flex items-start"><MapPinIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0 mt-1" />{CONTACT_INFO.address}</p><p className="flex items-center"><EnvelopeIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" /><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-teal-300">{CONTACT_INFO.email}</a></p><p className="flex items-center"><PhoneIcon className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />{CONTACT_INFO.phone}</p></div>
            </div>
             <div>
                <h3 className="text-xl font-bold text-teal-400 mb-4">Our Offices</h3>
                <div className="bg-slate-800 p-4 rounded-lg"><p><span className="font-semibold">{OFFICES.current.location}:</span> {OFFICES.current.address}</p><p className="text-sm text-slate-400 mt-2"><span className="font-semibold">Coming Soon:</span> {OFFICES.future.join(', ')}</p></div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-24 pt-16 border-t border-slate-800">
            <h3 className="text-3xl font-bold text-center mb-12">Divisional & Department Contacts</h3>
            <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
                {allContacts.map((contact) => {
                    const Icon = contactIconMap[contact.name] || EnvelopeIcon;
                    return (
                        <FadeInItem key={contact.name}>
                            <div className="bg-slate-800 p-6 rounded-lg flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="flex items-center mb-3">
                                    <Icon className="w-7 h-7 text-teal-400 mr-4"/>
                                    <h4 className="text-xl font-bold">{contact.name}</h4>
                                </div>
                                <p className="text-slate-400 mb-4 flex-grow">{contact.description}</p>
                                <a href={`mailto:${contact.email}`} className="font-medium text-teal-400 hover:text-teal-300 flex items-center mt-auto">
                                    <EnvelopeIcon className="w-5 h-5 mr-2"/>
                                    {contact.email}
                                </a>
                            </div>
                        </FadeInItem>
                    );
                })}
            </StaggeredFadeIn>
        </FadeIn>

        <div className="mt-24 pt-16 border-t border-slate-800 grid md:grid-cols-5 gap-16 items-start">
            <FadeIn className="md:col-span-3">
              <h3 className="text-3xl font-bold mb-8">Frequently Asked Questions</h3>
              <div className="space-y-2">
                  {FAQS.map((faq, index) => (
                      <FaqItem key={index} faq={faq} isOpen={openFaq === index} onClick={() => handleFaqClick(index)} />
                  ))}
              </div>
            </FadeIn>
            <FadeIn className="md:col-span-2">
                <div className="bg-slate-800 p-8 rounded-lg text-center sticky top-24">
                  <h3 className="text-2xl font-bold mb-6">A Word From Our Partners</h3>
                  <QuoteIcon className="w-12 h-12 text-teal-500 mx-auto mb-4"/>
                  <blockquote className="text-slate-300 italic text-lg">"{TESTIMONIAL.quote}"</blockquote>
                  <cite className="block mt-6 not-italic font-semibold text-teal-300">{TESTIMONIAL.author}, <span className="text-slate-400 font-normal">{TESTIMONIAL.title}</span></cite>
                </div>
            </FadeIn>
        </div>

        <FadeIn className="mt-24 pt-16 border-t border-slate-800">
            <h3 className="text-3xl font-bold text-center mb-8">Find Us</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl border-4 border-slate-800">
                <iframe title="ITECH Groups Nigeria Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.518629737874!2d6.726919!3d7.801869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104f5e0e0f0f0f0f%3A0x8f0f0f0f0f0f0f0f!2sKogi%20State%20Polytechnic!5e0!3m2!1sen!2sng" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </FadeIn>

        <FadeIn className="mt-24 pt-16 border-t border-slate-800 text-center bg-slate-800/50 p-10 rounded-lg">
            <h3 className="text-3xl font-bold text-teal-300">Partner with ITECH</h3>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">Drive innovation across Africa. Let's build the future together.</p>
            <button onClick={() => document.getElementById('full-name')?.focus()} className="mt-6 bg-teal-600 text-white font-medium py-3 px-8 rounded-md hover:bg-teal-700 transition-colors text-lg transform hover:scale-105">Become a Partner</button>
        </FadeIn>
      </div>
    </section>
  );
};