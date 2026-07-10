// src/pages/Home.jsx
import React from 'react';
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

const Home = ({ openModal }) => {
  return (
    <>
      <Hero />
      <Stats />
      <Projects />
      <Sectors />
      <MarketTable />
      <Services />
      <HowItWorks />
      <Toolkit openModal={openModal} />
      <Testimonials />
      <Quote />
      <Insights />
      <WhyUs />
      <Contact />
      <CTA />
    </>
  );
};

export default Home;