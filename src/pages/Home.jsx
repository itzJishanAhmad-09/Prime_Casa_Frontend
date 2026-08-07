// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PropertiesSlider from '../components/PropertiesSlider';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Toolkit from '../components/Toolkit';
import Quote from '../components/Quote';
import Blog from '../components/Blog';
import TestimonialsSlider from '../components/TestimonialsSlider';
import WhyUs from '../components/WhyUs';
import Contact from '../components/Contact';

const Home = ({
  projects,
  news,
  testimonials,
  openModal,
  scrollTo
}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollTo(location.state.scrollTo);
      }, 150);
    }
  }, [location.state, scrollTo]);

  return (
    <>
      <Seo
        title="Home"
        description="Find your dream home or investment property in Noida. Zero brokerage, RERA verified projects, and expert guidance."
      />
      <Hero />
      <Stats />
      <PropertiesSlider 
        projects={projects} 
        title="Trending Properties in Noida"
        subtitle="Handpicked RERA-verified projects with the highest buyer interest & market confidence"
      />
      <Services />
      <HowItWorks />
      <Toolkit openModal={openModal} />
      <Quote />
      <Blog news={news} />
      <TestimonialsSlider testimonials={testimonials} />
      <WhyUs />
      <Contact />
    </>
  );
};

export default Home;