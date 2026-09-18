// src/components/Hero.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconBuilding,
  IconMapPin,
  IconClock,
  IconCurrencyRupee,
  IconSearch,
} from '@tabler/icons-react';

const CATEGORIES = ['Apartments', 'Luxury Villas', 'Penthouses', 'Office Suites', 'Retail Space', 'Workspaces', 'Residential Plots', 'Farm Land'];
const SECTORS    = ['Sector 150', 'Sector 128', 'Sector 107', 'Sector 94', 'Sector 72', 'Sector 62', 'Noida Extension', 'Greater Noida West', 'Yamuna Expressway'];
const STATUSES   = ['New Launch', 'Under Construction', 'Ready to Move'];
const BUDGETS    = ['Under ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹2Cr', '₹2Cr – ₹5Cr', 'Above ₹5Cr'];
const LOCALITIES = ['Yamuna Expressway', 'Noida Expressway', 'Central Noida', 'Noida Extension', 'Greater Noida West'];

const Hero = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Controlled state — React-idiomatic, no DOM access needed
  const [filters, setFilters] = useState({ cat: '', sector: '', status: '', budget: '' });

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

  const handleLocalityClick = (sector) => {
    navigate(`/properties?sector=${encodeURIComponent(sector)}`);
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
        <div
          className="search-wrap"
          data-wmcp='{"name":"propertySearch","description":"Search and filter properties by category, sector, status, and budget","type":"search"}'
        >
          <div className="search-row">
            {/* Category */}
            <div className="search-field">
              <IconBuilding size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select
                name="cat"
                value={filters.cat}
                onChange={handleFilterChange}
                aria-label="Property category"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Sector */}
            <div className="search-field">
              <IconMapPin size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select
                name="sector"
                value={filters.sector}
                onChange={handleFilterChange}
                aria-label="Property sector"
              >
                <option value="">All Sectors</option>
                {SECTORS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Status */}
            <div className="search-field">
              <IconClock size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                aria-label="Property status"
              >
                <option value="">Any Status</option>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Budget */}
            <div className="search-field">
              <IconCurrencyRupee size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select
                name="budget"
                value={filters.budget}
                onChange={handleFilterChange}
                aria-label="Property budget"
              >
                <option value="">Any Budget</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>

            <button className="search-btn" onClick={handleSearch} type="button">
              <IconSearch size={20} /> Search
            </button>
          </div>

          <div className="search-more">
            <span className="tag-pill">✦ Trending</span>
            <span className="tag-pill">➤ New Launch</span>
            <span className="tag-pill">★ Most Popular</span>
            <span className="tag-pill">♛ Ultra Luxury</span>
          </div>
        </div>

        {/* Locality chips — using <button> for accessibility */}
        <div className="localities">
          {LOCALITIES.map((loc) => (
            <button
              key={loc}
              type="button"
              className="loc-chip"
              onClick={() => handleLocalityClick(loc)}
            >
              <IconMapPin size={13} style={{ marginRight: '4px' }} />
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;