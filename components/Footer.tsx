import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from './Tooltip';
import { SOCIAL_LINKS, ACCESSIBILITY_EMAIL } from '../constants';
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon } from './IconComponents';
import { BRAND_ASSETS } from '../assets/images';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#181d27] border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 text-left">
            <Link to="/" className="flex items-center gap-3 group" aria-label="ITECH Groups Home">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-700/80 shadow-xs flex-shrink-0 bg-slate-950">
                <img 
                  src={BRAND_ASSETS.logo} 
                  alt="ITECH Groups Logo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-white tracking-widest uppercase">
                  ITECH<span className="text-amber-400">.</span>GROUPS
                </span>
                <span className="text-[9px] text-slate-400 tracking-widest uppercase font-semibold mt-0.5">
                  NIGERIA
                </span>
              </div>
            </Link>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              A premier technology holding company engineering sovereign African artificial intelligence, agricultural telemetry, and data infrastructure across 7 key sectors.
            </p>
            <div className="mt-4 text-xs text-slate-400 font-medium">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">Corporate Headquarters</span>
              Opposite Poly Hospital, G.R.A, Lokoja, Kogi State, Nigeria
            </div>

            <div className="mt-6 flex items-center space-x-5">
              <Tooltip content="Twitter">
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <TwitterIcon className="w-5 h-5" />
                </a>
              </Tooltip>
              <Tooltip content="LinkedIn">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </Tooltip>
              <Tooltip content="Facebook">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </Tooltip>
              <Tooltip content="Instagram">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </Tooltip>
            </div>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/divisions" className="text-slate-400 hover:text-amber-400 transition-colors">7 Subsidiaries</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-amber-400 transition-colors">Enterprise Services</Link></li>
              <li><Link to="/partnerships" className="text-slate-400 hover:text-amber-400 transition-colors">Strategic Partnerships</Link></li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4">Corporate</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/about" className="text-slate-400 hover:text-amber-400 transition-colors">About & Leadership</Link></li>
              <li><Link to="/investors" className="text-slate-400 hover:text-amber-400 transition-colors">Investor Relations</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-amber-400 transition-colors">Research & Insights</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-amber-400 transition-colors">Contact & Offices</Link></li>
              <li><Link to="/sitemap" className="text-slate-400 hover:text-amber-400 transition-colors">Platform Sitemap</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4">Africa Tech Intelligence</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed font-normal">
              Quarterly executive briefs on African AI and digital transformation.
            </p>
            {subscribed ? (
              <p className="text-amber-400 text-xs font-bold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label htmlFor="footer-email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="footer-email-address"
                  name="footer-email-address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-full py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                  placeholder="Enter executive email"
                />
                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2.5 px-4 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 font-normal">
          <p>&copy; {new Date().getFullYear()} ITECH Groups Nigeria. All rights reserved.</p>
          <p>
            Digital accessibility desk: <a href={`mailto:${ACCESSIBILITY_EMAIL}`} className="text-amber-400 hover:underline">{ACCESSIBILITY_EMAIL}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};