import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { SOCIAL_LINKS, ACCESSIBILITY_EMAIL } from '../constants';
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon } from './IconComponents';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle the API call here
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // Reset after 5 seconds
    }
  };

  return (
    <footer className="bg-slate-950/80 backdrop-blur-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-teal-400 mb-2">ITECH Groups Nigeria</h3>
            <p className="text-slate-400 mb-4">Lokoja, Kogi State, Nigeria</p>
            <div className="flex justify-center md:justify-start space-x-6">
              <Tooltip content="Twitter">
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <TwitterIcon className="w-6 h-6" />
                </a>
              </Tooltip>
              <Tooltip content="LinkedIn">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <LinkedInIcon className="w-6 h-6" />
                </a>
              </Tooltip>
              <Tooltip content="Facebook">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <FacebookIcon className="w-6 h-6" />
                </a>
              </Tooltip>
              <Tooltip content="Instagram">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-teal-400 transition-colors">
                  <InstagramIcon className="w-6 h-6" />
                </a>
              </Tooltip>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-center md:text-left mb-3">Stay Updated with ITECH Innovations</h4>
            {subscribed ? (
              <p className="text-center md:text-left text-teal-400">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="footer-email-address"
                  name="footer-email-address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p className="mb-2">
            We are committed to making our digital platforms accessible. If you experience difficulty, please email <a href={`mailto:${ACCESSIBILITY_EMAIL}`} className="text-teal-400 hover:underline">{ACCESSIBILITY_EMAIL}</a>.
          </p>
          <p>&copy; {new Date().getFullYear()} ITECH Groups Nigeria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};