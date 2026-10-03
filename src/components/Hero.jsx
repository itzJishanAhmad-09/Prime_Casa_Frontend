// src/components/Hero.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';

const CATEGORIES = ['Apartments', 'Luxury Villas', 'Penthouses', 'Office Suites', 'Retail Space', 'Workspaces', 'Residential Plots', 'Farm Land'];
const SECTORS    = ['Sector 150', 'Sector 128', 'Sector 107', 'Sector 94', 'Sector 72', 'Sector 62', 'Noida Extension', 'Greater Noida West', 'Yamuna Expressway'];
const BUDGETS    = ['Under ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹2Cr', '₹2Cr – ₹5Cr', 'Above ₹5Cr'];

const Hero = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [filters, setFilters] = useState({ cat: '', sector: '', budget: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([, v]) => v)
    );
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="hero">
      {/* LCP placeholder image — shown while video loads */}
      <img
        src="/assets/videos/hero.webp"
        alt="Noida skyline"
        fetchpriority="high"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          willChange: 'transform',
        }}
      />

      <video
        className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
          background: 'transparent',
          willChange: 'opacity, transform',
        }}
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/assets/videos/noida-drone.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        {/* ================================================ */}
        {/* TITLE + SUBTITLE                                 */}
        {/* ================================================ */}
        <h1 className="hero-title">
          <span>Turning dreams</span>
          <span>
            into <em>addresses.</em>
          </span>
        </h1>

        <p className="hero-sub">
          Zero-brokerage advisory on RERA-verified properties across Noida.
        </p>

        {/* ================================================ */}
        {/* SEARCH BAR                                       */}
        {/* ================================================ */}
        <div className="hero-search-bar" role="search">
          {/* Category */}
          <div className="hsb-field">
            <label className="hsb-label" htmlFor="hsb-cat">Category</label>
            <select
              id="hsb-cat"
              name="cat"
              value={filters.cat}
              onChange={handleFilterChange}
              className="hsb-select"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div className="hsb-field">
            <label className="hsb-label" htmlFor="hsb-sector">Sector</label>
            <select
              id="hsb-sector"
              name="sector"
              value={filters.sector}
              onChange={handleFilterChange}
              className="hsb-select"
            >
              <option value="">All sectors</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="hsb-field">
            <label className="hsb-label" htmlFor="hsb-budget">Budget</label>
            <select
              id="hsb-budget"
              name="budget"
              value={filters.budget}
              onChange={handleFilterChange}
              className="hsb-select"
            >
              <option value="">Any budget</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Search button */}
          <button
            type="button"
            className="hsb-btn"
            onClick={handleSearch}
            aria-label="Search properties"
          >
            <IconSearch size={20} stroke={2.2} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;