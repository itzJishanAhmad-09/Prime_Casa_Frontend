// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Projects from '../components/Projects';
import Sectors from '../components/Sectors';
import MarketTable from '../components/MarketTable';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Toolkit from '../components/Toolkit';
import Testimonials from '../components/Testimonials';
import Quote from '../components/Quote';
import Insights from '../components/Insights';
import WhyUs from '../components/WhyUs';
import Contact from '../components/Contact';
import CTA from '../components/CTA';

const Home = ({
  projects,
  sectors,
  marketData,
  news,
  testimonials,
  openModal,
  scrollTo
}) => {
  const location = useLocation();

  // Handle navigation from detail pages (navbar clicks)
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        scrollTo(location.state.scrollTo);
      }, 150);
    }
  }, [location.state, scrollTo]);

  return (
    <>
      <Hero />
      <Stats />
      <Projects projects={projects} />
      <Sectors sectors={sectors} />
      <MarketTable marketData={marketData} />
      <Services />
      <HowItWorks />
      <Toolkit openModal={openModal} />
      <Testimonials testimonials={testimonials} />
      <Quote />
      <Insights news={news} />
      <WhyUs />
      <Contact />
      <CTA />
    </>
  );
};

export default Home;