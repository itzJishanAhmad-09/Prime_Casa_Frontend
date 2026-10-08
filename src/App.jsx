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

import useScrollReveal from './hooks/useScrollReveal';

// Named lazy loaders — required for @vitejs/plugin-react-swc
const loadHomepage       = () => import('./pages/Homepage');
const loadAboutUs        = () => import('./pages/AboutUs');
const loadProjectDetail  = () => import('./pages/ProjectDetail');
const loadBlogList       = () => import('./pages/BlogList');
const loadBlogDetail     = () => import('./pages/BlogDetail');
const loadPropertiesList = () => import('./pages/PropertiesList');
const loadPrivacyPolicy  = () => import('./pages/PrivacyPolicy');
const loadTermsPage      = () => import('./pages/TermsPage');
const loadContactPage    = () => import('./pages/ContactPage');
const loadServicePage    = () => import('./pages/ServicePage');
const loadNotFound       = () => import('./pages/NotFound');

const Homepage       = lazy(loadHomepage);
const AboutUs        = lazy(loadAboutUs);
const ProjectDetail  = lazy(loadProjectDetail);
const BlogList       = lazy(loadBlogList);
const BlogDetail     = lazy(loadBlogDetail);
const PropertiesList = lazy(loadPropertiesList);
const PrivacyPolicy  = lazy(loadPrivacyPolicy);
const TermsPage      = lazy(loadTermsPage);
const ContactPage    = lazy(loadContactPage);
const ServicePage    = lazy(loadServicePage);
const NotFound       = lazy(loadNotFound);

import { projects } from './data/projects';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

// Pages that already have their own contact form
const HIDE_CONTACT_ON = ['/contact', '/schedule'];

function App() {
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalContent, setModalContent]     = useState('');
  const [visitOpen, setVisitOpen]           = useState(false);
  const [visitProjectId, setVisitProjectId] = useState(null);

  const location = useLocation();

  // Global scroll-reveal system
  useScrollReveal();

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

      {/* Page wrapper — key forces remount so the .page fade-in replays */}
      <main className="page" key={location.pathname}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size={48} />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Homepage
                    projects={projects}
                    news={news}
                    testimonials={testimonials}
                    openModal={openModal}
                    scrollTo={scrollTo}
                  />
                }
              />
              <Route path="/about"              element={<AboutUs />} />
              <Route path="/properties"         element={<PropertiesList projects={projects} />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/blog"               element={<BlogList />} />
              <Route path="/blog/:slug"         element={<BlogDetail />} />
              <Route path="/schedule/:id"       element={<Navigate to="/contact" replace />} />
              <Route path="/schedule"           element={<Navigate to="/contact" replace />} />
              <Route path="/privacy-policy"     element={<PrivacyPolicy />} />
              <Route path="/terms"              element={<TermsPage />} />
              <Route path="/contact"            element={<ContactPage />} />
              <Route path="/services"           element={<ServicePage />} />
              <Route path="*"                   element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Contact section on every page except /contact and /schedule */}
      {showContact && (
        <Suspense fallback={<div style={{ height: '600px' }} />}>
          <Contact />
        </Suspense>
      )}

      <Footer />

      {/* Toolkits modal (ROI / EMI / NRI) */}
      <ToolkitModal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
      />

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