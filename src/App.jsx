// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // ← Remove BrowserRouter from here

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToolkitModal from './components/ToolkitModal';

// Pages
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import SectorDetail from './pages/SectorDetail';
import BlogDetail from "./pages/BlogDetail.jsx";

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
    // ✅ NO BrowserRouter here – it's already in main.jsx
    <>
      <Navbar scrollTo={scrollTo} />

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
      </Routes>

      <Footer />
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default App;