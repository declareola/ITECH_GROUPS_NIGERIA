import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from './IconComponents';
import { BRAND_ASSETS } from '../assets/images';

interface HeaderProps {
  currentPage: string;
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'divisions' | 'more' | null>(null);
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(true);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(true);

  const headerRef = useRef<HTMLElement>(null);
  const divisionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Normalize path
  const normalizedPath = currentPage.startsWith('/blog/') ? '/blog' : currentPage;

  // Active state checkers
  const isAboutActive = normalizedPath === '/about';
  const isDivisionsActive = normalizedPath === '/divisions' || normalizedPath === '/services';
  const isMoreActive = normalizedPath === '/partnerships' || normalizedPath === '/blog';
  const isInvestorsActive = normalizedPath === '/investors';

  // Handle clicking outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle Escape key to close dropdowns
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Desktop hover helpers with debounce
  const handleMouseEnter = (menu: 'divisions' | 'more') => {
    if (menu === 'divisions') {
      if (divisionsTimeoutRef.current) clearTimeout(divisionsTimeoutRef.current);
      setOpenDropdown('divisions');
    } else {
      if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
      setOpenDropdown('more');
    }
  };

  const handleMouseLeave = (menu: 'divisions' | 'more') => {
    if (menu === 'divisions') {
      divisionsTimeoutRef.current = setTimeout(() => {
        setOpenDropdown((prev) => (prev === 'divisions' ? null : prev));
      }, 150);
    } else {
      moreTimeoutRef.current = setTimeout(() => {
        setOpenDropdown((prev) => (prev === 'more' ? null : prev));
      }, 150);
    }
  };

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#f8fafc]/95 backdrop-blur-xl border-slate-200/90 shadow-sm'
          : 'bg-[#f8fafc]/80 backdrop-blur-md border-slate-200/60'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8" aria-label="Main Navigation">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo (links to Home /#/) - Featuring official corporate logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={closeAllMenus}
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-lg py-1 transition-transform transform hover:scale-[1.02]"
              aria-label="ITECH Groups Nigeria Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-slate-900/10 shadow-xs flex-shrink-0 bg-slate-950">
                <img 
                  src={BRAND_ASSETS.logo} 
                  alt="ITECH Groups Logo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-slate-900 font-black text-base sm:text-lg tracking-wider uppercase">
                  ITECH<span className="text-amber-500">.</span>GROUPS
                </span>
                <span className="text-[9px] tracking-widest font-black text-slate-400 uppercase mt-0.5 hidden sm:block">
                  NIGERIA
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (4 items + Logo) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {/* 1. About Link */}
            <Link
              to="/about"
              onClick={closeAllMenus}
              className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                isAboutActive
                  ? 'text-slate-950 bg-slate-200/70 font-extrabold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/40'
              }`}
            >
              About
            </Link>

            {/* 2. Divisions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('divisions')}
              onMouseLeave={() => handleMouseLeave('divisions')}
            >
              <div className="flex items-center">
                <Link
                  to="/divisions"
                  onClick={closeAllMenus}
                  className={`pl-4 pr-1.5 py-2 rounded-l-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    isDivisionsActive
                      ? 'text-slate-950 bg-slate-200/70 font-extrabold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/40'
                  }`}
                >
                  Divisions
                </Link>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === 'divisions'}
                  aria-controls="divisions-dropdown-menu"
                  aria-label="Toggle Divisions submenu"
                  onClick={() => setOpenDropdown(openDropdown === 'divisions' ? null : 'divisions')}
                  className={`pr-3 pl-1 py-2 rounded-r-full text-xs transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    isDivisionsActive
                      ? 'text-slate-950 bg-slate-200/70'
                      : 'text-slate-400 hover:text-slate-950 hover:bg-slate-200/40'
                  }`}
                >
                  <ChevronDownIcon
                    className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                      openDropdown === 'divisions' ? 'rotate-180 text-slate-950' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Divisions Dropdown Menu */}
              <AnimatePresence>
                {openDropdown === 'divisions' && (
                  <motion.div
                    id="divisions-dropdown-menu"
                    role="menu"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-2 z-50"
                  >
                    <Link
                      to="/divisions"
                      role="menuitem"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2.5 rounded-xl text-xs transition-colors ${
                        normalizedPath === '/divisions'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <div className="font-bold uppercase tracking-wider">7 Subsidiaries</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 normal-case font-normal">Agri, AI Labs, Data, PropTech, Health</div>
                    </Link>

                    <Link
                      to="/services"
                      role="menuitem"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2.5 rounded-xl text-xs transition-colors mt-1 ${
                        normalizedPath === '/services'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <div className="font-bold uppercase tracking-wider">Enterprise Services</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 normal-case font-normal">Engineering & solution scoping</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={() => handleMouseLeave('more')}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openDropdown === 'more'}
                aria-controls="more-dropdown-menu"
                onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  isMoreActive
                    ? 'text-slate-950 bg-slate-200/70 font-extrabold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/40'
                }`}
              >
                <span>More</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                    openDropdown === 'more' ? 'rotate-180 text-slate-950' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* More Dropdown Menu */}
              <AnimatePresence>
                {openDropdown === 'more' && (
                  <motion.div
                    id="more-dropdown-menu"
                    role="menu"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-2 z-50"
                  >
                    <Link
                      to="/partnerships"
                      role="menuitem"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2.5 rounded-xl text-xs transition-colors mt-1 ${
                        normalizedPath === '/partnerships'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <div className="font-bold uppercase tracking-wider">Partnerships</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 normal-case font-normal">Government & Institutional Alliances</div>
                    </Link>

                    <Link
                      to="/blog"
                      role="menuitem"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2.5 rounded-xl text-xs transition-colors mt-1 ${
                        normalizedPath === '/blog'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <div className="font-bold uppercase tracking-wider">Blog & Insights</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 normal-case font-normal">Africa Tech Intelligence & Reports</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Far Right: Investors Pill Button - Matching [SIGN UP] in reference mockup */}
          <div className="hidden md:flex items-center pl-4">
            <Link
              to="/investors"
              onClick={closeAllMenus}
              className={`inline-flex items-center justify-center font-black text-xs uppercase tracking-widest px-7 py-2.5 rounded-full transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 ${
                isInvestorsActive
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              Investors
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="bg-white border border-slate-200 inline-flex items-center justify-center p-2.5 rounded-full text-slate-800 hover:text-slate-950 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-controls="mobile-navigation-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <div className="w-5 h-5 flex flex-col justify-around items-center">
                <span
                  className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-6 pt-4 pb-8 max-h-[85vh] overflow-y-auto"
          >
            {/* Prominent Investors Button at top of mobile menu */}
            <div className="mb-5 pt-1">
              <Link
                to="/investors"
                onClick={closeAllMenus}
                className="w-full inline-flex items-center justify-center font-black text-xs uppercase tracking-widest py-3 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors"
              >
                Investor Portal & Pitch Deck
              </Link>
            </div>

            <div className="space-y-4">
              {/* About */}
              <div>
                <Link
                  to="/about"
                  onClick={closeAllMenus}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${
                    isAboutActive
                      ? 'bg-slate-100 text-slate-950 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  About Us
                </Link>
              </div>

              {/* Divisions Group */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between px-4 py-1.5 text-xs uppercase tracking-wider font-bold text-slate-400">
                  <span>Divisions & Services</span>
                  <button
                    type="button"
                    onClick={() => setMobileDivisionsOpen(!mobileDivisionsOpen)}
                    className="p-1 text-slate-400 hover:text-slate-950"
                    aria-label="Toggle Divisions group"
                  >
                    <ChevronDownIcon
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        mobileDivisionsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileDivisionsOpen && (
                  <div className="mt-1 space-y-1 pl-3">
                    <Link
                      to="/divisions"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        normalizedPath === '/divisions'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      7 Operating Divisions
                    </Link>
                    <Link
                      to="/services"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        normalizedPath === '/services'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      Enterprise Services & Scoping
                    </Link>
                  </div>
                )}
              </div>

              {/* More Group */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between px-4 py-1.5 text-xs uppercase tracking-wider font-bold text-slate-400">
                  <span>More Resources</span>
                  <button
                    type="button"
                    onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                    className="p-1 text-slate-400 hover:text-slate-950"
                    aria-label="Toggle More group"
                  >
                    <ChevronDownIcon
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        mobileMoreOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileMoreOpen && (
                  <div className="mt-1 space-y-1 pl-3">
                    <Link
                      to="/partnerships"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        normalizedPath === '/partnerships'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      Strategic Partnerships
                    </Link>
                    <Link
                      to="/blog"
                      onClick={closeAllMenus}
                      className={`block px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        normalizedPath === '/blog'
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      Blog & Research Insights
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};