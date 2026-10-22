// src/App.jsx
import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';

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
const loadOurTeam        = () => import('./pages/OurTeam');       // ✅ NEW
const loadProjectDetail  = () => import('./pages/ProjectDetail');
const loadBlogList       = () => import('./pages/BlogList');
const loadBlogDetail     = () => import('./pages/BlogDetail');
const loadPropertiesList = () => import('./pages/PropertiesList');
const loadCategoryPage   = () => import('./pages/CategoryPage');
const loadPrivacyPolicy  = () => import('./pages/PrivacyPolicy');
const loadTermsPage      = () => import('./pages/TermsPage');
const loadContactPage    = () => import('./pages/ContactPage');
const loadServicePage    = () => import('./pages/ServicePage');
const loadCareer         = () => import('./pages/Career');
const loadRewards        = () => import('./pages/Rewards');
const loadNotFound       = () => import('./pages/NotFound');

const Homepage       = lazy(loadHomepage);
const AboutUs        = lazy(loadAboutUs);
const OurTeam        = lazy(loadOurTeam);                          // ✅ NEW
const ProjectDetail  = lazy(loadProjectDetail);
const BlogList       = lazy(loadBlogList);
const BlogDetail     = lazy(loadBlogDetail);
const PropertiesList = lazy(loadPropertiesList);
const CategoryPage   = lazy(loadCategoryPage);
const PrivacyPolicy  = lazy(loadPrivacyPolicy);
const TermsPage      = lazy(loadTermsPage);
const ContactPage    = lazy(loadContactPage);
const ServicePage    = lazy(loadServicePage);
const Career         = lazy(loadCareer);
const Rewards        = lazy(loadRewards);
const NotFound       = lazy(loadNotFound);

import { projects } from './data/projects';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

// Global <Contact /> is hidden on these routes.
const HIDE_CONTACT_ON = ['/contact', '/schedule', '/career'];

function App() {
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalContent, setModalContent]     = useState('');
  const [visitOpen, setVisitOpen]           = useState(false);
  const [visitProjectId, setVisitProjectId] = useState(null);

  const location = useLocation();

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

  React.useEffect(() => {
    const handler = (e) => openModal(e.detail);
    window.addEventListener('openTool', handler);
    return () => window.removeEventListener('openTool', handler);
  }, [openModal]);

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
              <Route path="/our-team"           element={<OurTeam />} />   
              <Route path="/career"             element={<Career />} />
              <Route path="/rewards"            element={<Rewards />} />
              <Route path="/properties"         element={<PropertiesList projects={projects} />} />
              <Route path="/residential"        element={<CategoryPage category="residential" />} />
              <Route path="/commercial"         element={<CategoryPage category="commercial" />} />
              <Route path="/new-launch"         element={<CategoryPage category="new-launch" />} />
              <Route path="/premium"            element={<CategoryPage category="premium" />} />
              <Route path="/plots"              element={<CategoryPage category="plots" />} />
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

      {showContact && (
        <Suspense fallback={<div style={{ height: '600px' }} />}>
          <Contact />
        </Suspense>
      )}

      <Footer />

      <ToolkitModal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
      />

      <VisitModal
        isOpen={visitOpen}
        onClose={() => setVisitOpen(false)}
        projectId={visitProjectId}
      />

      {/* Floating social stack — WhatsApp · Instagram · Facebook · LinkedIn · YouTube */}
      <div className="social-float-stack">
        <a
          href="https://wa.me/918130504183?text=Hi%20Prime%20Casa%2C%20I%27m%20interested%20in%20a%20property"
          target="_blank"
          rel="noopener noreferrer"
          className="social-float social-float--wa"
          aria-label="Chat with Prime Casa on WhatsApp"
        >
          <IconBrandWhatsapp size={26} />
        </a>

        <a
          href="https://www.instagram.com/theprimecasa"
          target="_blank"
          rel="noopener noreferrer"
          className="social-float social-float--ig"
          aria-label="Follow Prime Casa on Instagram"
        >
          <IconBrandInstagram size={24} />
        </a>

        <a
          href="https://www.facebook.com/theprimecasa"
          target="_blank"
          rel="noopener noreferrer"
          className="social-float social-float--fb"
          aria-label="Follow Prime Casa on Facebook"
        >
          <IconBrandFacebook size={24} />
        </a>

        <a
          href="https://www.linkedin.com/company/the-prime-casa-realty-pvt-ltd"
          target="_blank"
          rel="noopener noreferrer"
          className="social-float social-float--li"
          aria-label="Follow Prime Casa on LinkedIn"
        >
          <IconBrandLinkedin size={24} />
        </a>

        <a
          href="https://www.youtube.com/@theprimecasa"
          target="_blank"
          rel="noopener noreferrer"
          className="social-float social-float--yt"
          aria-label="Subscribe to Prime Casa on YouTube"
        >
          <IconBrandYoutube size={26} />
        </a>
      </div>
    </>
  );
}

export default App;