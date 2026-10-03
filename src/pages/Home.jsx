// src/pages/Home.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const Hero                = lazy(() => import('../components/Hero'));
const Stats               = lazy(() => import('../components/Stats'));
const PropertiesSlider  = lazy(() => import('../components/PropertiesSlider'));
const Services            = lazy(() => import('../components/Services'));
const HowItWorks          = lazy(() => import('../components/HowItWorks'));
const Toolkit             = lazy(() => import('../components/Toolkit'));
const Quote               = lazy(() => import('../components/Quote'));
const Blog                = lazy(() => import('../components/Blog'));
const TestimonialsSlider  = lazy(() => import('../components/TestimonialsSlider'));
const WhyUs               = lazy(() => import('../components/WhyUs'));

const Home = ({ projects, news, testimonials, openModal, scrollTo }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => scrollTo(location.state.scrollTo), 150);
    }
  }, [location.state, scrollTo]);

  return (
    <>
      <Seo title="Home" description="Find your dream home or investment property in Noida. Zero brokerage, RERA verified projects, and expert guidance." />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1A0A08' }} />}><Hero /></Suspense>
      <Suspense fallback={<div style={{ height: '120px', background: '#F5F0E8' }} />}><Stats /></Suspense>
      <Suspense fallback={<div style={{ height: '700px', background: '#FBF8F3' }} />}><PropertiesSlider projects={projects} /></Suspense>
      <Suspense fallback={<div style={{ height: '400px' }} />}><Services /></Suspense>
      <Suspense fallback={<div style={{ height: '300px' }} />}><HowItWorks /></Suspense>
      <Suspense fallback={<div style={{ height: '300px' }} />}><Toolkit openModal={openModal} /></Suspense>
      <Suspense fallback={<div style={{ height: '100px' }} />}><Quote /></Suspense>
      <Suspense fallback={<div style={{ height: '400px' }} />}><Blog news={news} /></Suspense>
      <Suspense fallback={<div style={{ height: '400px' }} />}><TestimonialsSlider testimonials={testimonials} /></Suspense>
      <Suspense fallback={<div style={{ height: '300px' }} />}><WhyUs /></Suspense>
    </>
  );
};

export default Home;

