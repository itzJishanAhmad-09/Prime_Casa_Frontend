// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components (these are small – keep as normal imports)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToolkitModal from './components/ToolkitModal';

// Lazy‑load pages (they are larger and not always needed immediately)
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const SectorDetail = lazy(() => import('./pages/SectorDetail'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const ScheduleVisit = lazy(() => import('./pages/ScheduleVisit'));
const ScheduleVisitGeneric = lazy(() => import('./pages/ScheduleVisitGeneric'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

// Data
import { projects } from './data/projects';
import { sectors } from './data/sectors';
import { marketData } from './data/marketData';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = (type) => {
    setModalContent(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handler = (e) => {
      openModal(e.detail);
    };
    window.addEventListener('openTool', handler);
    return () => window.removeEventListener('openTool', handler);
  }, []);

  return (
    <>
      <Navbar scrollTo={scrollTo} />

      {/* Suspense wraps all routes – shows a fallback while loading */}
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                projects={projects}
                sectors={sectors}
                marketData={marketData}
                news={news}
                testimonials={testimonials}
                openModal={openModal}
                scrollTo={scrollTo}
              />
            }
          />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/sector/:name" element={<SectorDetail />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/schedule/:id" element={<ScheduleVisit />} />
          <Route path="/schedule" element={<ScheduleVisitGeneric />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </Suspense>

      <Footer />
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default App;