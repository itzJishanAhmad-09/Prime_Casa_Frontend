// src/App.jsx
import React from 'react';
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

// Import static data (these arrays are already defined)
import { projects } from './data/projects';
import { sectors } from './data/sectors';
import { marketData } from './data/marketData';
import { news } from './data/news';
import { testimonials } from './data/testimonials';

function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const openModal = (type) => {
    setModalContent(type);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      {/* Pass static data directly – no loading */}
      <Projects projects={projects} />
      <Sectors sectors={sectors} />
      <MarketTable marketData={marketData} />
      <Services />
      <HowItWorks />
      <Toolkit openModal={openModal} />
      <DomainServices />
      <Testimonials testimonials={testimonials} />
      <Quote />
      <Insights news={news} />
      <WhyUs />
      <Contact />
      <CTA />
      <Footer />
      <ToolkitModal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
}

export default App;