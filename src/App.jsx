// src/App.jsx
import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToolkitModal from './components/ToolkitModal';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const Home           = lazy(() => import('./pages/Home'));
const AboutUs        = lazy(() => import('./pages/AboutUs'));
const ProjectDetail  = lazy(() => import('./pages/ProjectDetail'));
const BlogList       = lazy(() => import('./pages/BlogList'));
const BlogDetail     = lazy(() => import('./pages/BlogDetail'));
const PropertiesList = lazy(() => import('./pages/PropertiesList'));
const ScheduleVisit  = lazy(() => import('./pages/ScheduleVisit'));
const PrivacyPolicy  = lazy(() => import('./pages/PrivacyPolicy'));
const TermsPage      = lazy(() => import('./pages/TermsPage'));
const ContactPage    = lazy(() => import('./pages/ContactPage'));
const ServicePage    = lazy(() => import('./pages/ServicePage'));
const NotFound       = lazy(() => import('./pages/NotFound'));

import { projects } from './data/projects';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

function App() {
  const [modalOpen, setModalOpen]       = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Stable references — safe to use inside useEffect with [] deps
  const openModal = useCallback((type) => {
    setModalContent(type);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Listen for custom events dispatched by other components (e.g., Toolkit buttons)
  React.useEffect(() => {
    const handler = (e) => openModal(e.detail);
    window.addEventListener('openTool', handler);
    return () => window.removeEventListener('openTool', handler);
  }, [openModal]);

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
            <Route path="/schedule/:id"   element={<ScheduleVisit />} />
            <Route path="/schedule"       element={<ScheduleVisit />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms"          element={<TermsPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/services"       element={<ServicePage />} />
            {/* Catch-all 404 */}
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default App;