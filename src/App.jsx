import React, { useState, useEffect } from 'react';  // ← useState & useEffect
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Sectors from './components/Sectors';
import MarketTable from './components/MarketTable';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Toolkit from './components/Toolkit';
import DomainServices from './components/DomainServices';
import Testimonials from './components/Testimonials';
import Quote from './components/Quote';
import Insights from './components/Insights';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ToolkitModal from './components/ToolkitModal';

// Import static data
import { projects } from './data/projects';
import { sectors } from './data/sectors';
import { marketData } from './data/marketData';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

function App() {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Scroll function (used by Navbar and other components)
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Open modal (used by Toolkit and other components)
  const openModal = (type) => {
    setModalContent(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // 👇 Listen for custom event from Footer (and any other component)
  useEffect(() => {
    const handler = (e) => {
      openModal(e.detail);  // e.detail = tool key (e.g. 'roi', 'emi', etc.)
    };
    window.addEventListener('openTool', handler);
    return () => window.removeEventListener('openTool', handler);
  }, []); // empty dependency array – runs only once

  return (
    <>
      {/* Pass scrollTo to Navbar */}
      <Navbar scrollTo={scrollTo} />

      <Hero />
      <Stats />

      {/* Pass static data directly */}
      <Projects projects={projects} />
      <Sectors sectors={sectors} />
      <MarketTable marketData={marketData} />
      <Services />
      <HowItWorks />

      {/* Pass openModal to Toolkit */}
      <Toolkit openModal={openModal} />

      <DomainServices />
      <Testimonials testimonials={testimonials} />
      <Quote />
      <Insights news={news} />
      <WhyUs />
      <Contact />
      <CTA />

      {/* Footer uses scrollTo internally (already defined) */}
      <Footer />

      {/* Modal */}
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default App;