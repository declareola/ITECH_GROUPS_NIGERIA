import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';
import { HomePage } from './HomePage';
import { DivisionsPage } from './components/DivisionsPage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { PartnershipsPage } from './components/PartnershipsPage';
import { BlogPage } from './components/BlogPage';
import { InvestorsPage } from './components/InvestorsPage';
import { Sitemap } from './components/Sitemap';
import { Chatbot } from './components/Chatbot';
import { ProjectScopingTool } from './components/ProjectScopingTool';
import { updateMetadata } from './utils/seo';
import { initAnalytics, trackPageView } from './utils/analytics';

const App: React.FC = () => {
  const location = useLocation();
  const [isScopingToolOpen, setIsScopingToolOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    initAnalytics();
  }, []);
  
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Update metadata and track page views on route change
  useEffect(() => {
    updateMetadata(location.pathname);
    trackPageView(location.pathname);
  }, [location.pathname]);

  const pageKey = location.pathname + location.search;

  return (
    <div className="bg-[#cbd5e1] sm:bg-[#94a3b8]/70 min-h-screen py-0 sm:py-4 px-0 sm:px-4 md:px-6 lg:px-8 text-slate-900 transition-colors duration-300">
      <div className="max-w-[1540px] mx-auto bg-[#f8fafc] text-slate-900 rounded-none sm:rounded-[32px] md:rounded-[38px] shadow-2xl overflow-hidden border border-slate-300/80 min-h-screen flex flex-col relative">
        <Header currentPage={location.pathname} isScrolled={isScrolled} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage onOpenScopingTool={() => setIsScopingToolOpen(true)} />} />
                <Route path="/divisions" element={<DivisionsPage />} />
                <Route path="/partnerships" element={<PartnershipsPage />} />
                <Route path="/investors" element={<InvestorsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:postSlug" element={<BlogPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="*" element={<HomePage />} /> {/* Fallback route */}
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <Chatbot />
        <ProjectScopingTool 
          isOpen={isScopingToolOpen}
          onClose={() => setIsScopingToolOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;