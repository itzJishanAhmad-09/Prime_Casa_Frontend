// src/App.jsx
import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { IconBrandWhatsapp } from '@tabler/icons-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToolkitModal from './components/ToolkitModal';
import VisitModal from './components/VisitModal';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Contact from './components/Contact';

const Home           = lazy(() => import('./pages/Home'));
const AboutUs        = lazy(() => import('./pages/AboutUs'));
const ProjectDetail  = lazy(() => import('./pages/ProjectDetail'));
const BlogList       = lazy(() => import('./pages/BlogList'));
const BlogDetail     = lazy(() => import('./pages/BlogDetail'));
const PropertiesList = lazy(() => import('./pages/PropertiesList'));
const PrivacyPolicy  = lazy(() => import('./pages/PrivacyPolicy'));
const TermsPage      = lazy(() => import('./pages/TermsPage'));
const ContactPage    = lazy(() => import('./pages/ContactPage'));
const ServicePage    = lazy(() => import('./pages/ServicePage'));
const NotFound       = lazy(() => import('./pages/NotFound'));

import { projects } from './data/projects';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

// Pages that already have their own contact form
const HIDE_CONTACT_ON = ['/contact', '/schedule'];

function App() {
  const [modalOpen, setModalOpen]             = useState(false);
  const [modalContent, setModalContent]       = useState('');
  const [visitOpen, setVisitOpen]             = useState(false);
  const [visitProjectId, setVisitProjectId]   = useState(null);
  const location = useLocation();

  const openModal = useCallback((type) => {
    setModalContent(type);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Toolkit modal events (from footer, toolkit cards, etc.)
  React.useEffect(() => {
    const handler = (e) => openModal(e.detail);
    window.addEventListener('openTool', handler);
    return () => window.removeEventListener('openTool', handler);
  }, [openModal]);

  // Visit modal events (from navbar, property cards, footer, etc.)
  React.useEffect(() => {
    const handler = (e) => {
      setVisitProjectId(e.detail?.projectId ?? null);
      setVisitOpen(true);
    };
    window.addEventListener('openVisit', handler);
    return () => window.removeEventListener('openVisit', handler);
  }, []);

  const showContact = !HIDE_CONTACT_ON.some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <>
      <Navbar scrollTo={scrollTo} />

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner size={48} />}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  projects={projects}
                  news={news}
                  testimonials={testimonials}
                  openModal={openModal}
                  scrollTo={scrollTo}
                />
              }
            />
            <Route path="/about"          element={<AboutUs />} />
            <Route path="/properties"     element={<PropertiesList projects={projects} />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/blog"           element={<BlogList />} />
            <Route path="/blog/:slug"     element={<BlogDetail />} />
            <Route path="/schedule/:id"   element={<Navigate to="/contact" replace />} />
            <Route path="/schedule"       element={<Navigate to="/contact" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms"          element={<TermsPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/services"       element={<ServicePage />} />
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {/* ---------- Contact section on every page ---------- */}
      {showContact && (
        <Suspense fallback={<div style={{ height: '600px' }} />}>
          <Contact />
        </Suspense>
      )}

      <Footer />

      {/* Toolkits modal (ROI/EMI/NRI) */}
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />

      {/* Visit booking modal */}
      <VisitModal
        isOpen={visitOpen}
        onClose={() => setVisitOpen(false)}
        projectId={visitProjectId}
      />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/918130504183?text=Hi%20Prime%20Casa%2C%20I%27m%20interested%20in%20a%20property"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat with Prime Casa on WhatsApp"
      >
        <IconBrandWhatsapp size={28} />
      </a>
    </>
  );
}

export default App;