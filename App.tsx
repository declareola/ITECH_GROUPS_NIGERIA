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
import { Chatbot } from './components/Chatbot';
import { ProjectScopingTool } from './components/ProjectScopingTool';
import { VantaBackground } from './components/VantaBackground';
import { CursorSpotlight } from './components/CursorSpotlight';
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
      setIsScrolled(window.scrollY > 50);
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
    <div className="text-slate-200 min-h-screen">
      <VantaBackground />
      <CursorSpotlight />
      <Header currentPage={location.pathname} isScrolled={isScrolled} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
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
  );
};

export default App;