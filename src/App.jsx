import React, { useState, useEffect } from 'react';
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

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (type) => {
    setModalContent(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Listen for openTool events from Footer
  useEffect(() => {
    const handleOpenTool = (event) => {
      openModal(event.detail);
    };

    window.addEventListener('openTool', handleOpenTool);

    // Cleanup
    return () => {
      window.removeEventListener('openTool', handleOpenTool);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <Sectors />
      <MarketTable />
      <Services />
      <HowItWorks />
      <Toolkit openModal={openModal} />
      <DomainServices />
      <Testimonials />
      <Quote />
      <Insights />
      <WhyUs />
      <Contact />
      <CTA />
      <Footer />
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default App;