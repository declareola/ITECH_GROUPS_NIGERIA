import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/divisions', label: 'Divisions' },
  { to: '/partnerships', label: 'Partnerships' },
  { to: '/investors', label: 'Investors' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

interface HeaderProps {
  currentPage: string;
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const getPageFromPath = (path: string) => {
    if (path.startsWith('/blog/')) return '/blog';
    return path;
  }

  const activePage = getPageFromPath(currentPage);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-700/50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/90 backdrop-blur-lg shadow-lg' : 'bg-slate-900/70 backdrop-blur-lg'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          <div className="flex-shrink-0">
            <Link to="/" onClick={handleLinkClick} className="text-white font-bold text-xl transition-transform transform hover:scale-105">
              ITECH<span className="text-teal-400">Groups</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    activePage === link.to
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                   {activePage === link.to && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-teal-400 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-around items-center">
                <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
               <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  activePage === link.to
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};