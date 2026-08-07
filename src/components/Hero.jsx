// src/components/Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const category = document.getElementById('s-cat')?.value || '';
    const sector = document.getElementById('s-sector')?.value || '';
    const status = document.getElementById('s-status')?.value || '';
    const budget = document.getElementById('s-budget')?.value || '';

    const params = new URLSearchParams();
    if (category) params.append('cat', category);
    if (sector) params.append('sector', sector);
    if (status) params.append('status', status);
    if (budget) params.append('budget', budget);

    navigate(`/properties?${params.toString()}`);
  };

  const handleLocalityClick = (sector) => {
    navigate(`/properties?sector=${encodeURIComponent(sector)}`);
  };

  const posterPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231A0A08' /%3E%3Cstop offset='55%25' style='stop-color:%233D1710' /%3E%3Cstop offset='100%25' style='stop-color:%231A0A08' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23g)'/%3E%3Ctext x='960' y='540' font-family='Playfair Display, serif' font-size='72' fill='%23F0C040' text-anchor='middle' dominant-baseline='central'%3EPRIME CASA%3C/text%3E%3Ctext x='960' y='620' font-family='Inter, sans-serif' font-size='28' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='central' opacity='0.7'%3ETrusted Properties. Simplified Search.%3C/text%3E%3C/svg%3E";

  return (
    <div className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterPlaceholder}
      >
        <source src="/assets/videos/noida-drone.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        {/* ---- SEARCH BAR ---- */}
        <div className="search-wrap">
          <div className="search-row">
            <div className="search-field">
              <i className="ti ti-building"></i>
              <select id="s-cat">
                <option value="">All Categories</option>
                <option>Apartments</option>
                <option>Luxury Villas</option>
                <option>Penthouses</option>
                <option>Office Suites</option>
                <option>Retail Space</option>
                <option>Workspaces</option>
                <option>Residential Plots</option>
                <option>Farm Land</option>
              </select>
            </div>

            <div className="search-field">
              <i className="ti ti-map-pin"></i>
              <select id="s-sector">
                <option value="">All Sectors</option>
                <option>Sector 150</option>
                <option>Sector 128</option>
                <option>Sector 107</option>
                <option>Sector 94</option>
                <option>Sector 72</option>
                <option>Sector 62</option>
                <option>Noida Extension</option>
                <option>Greater Noida West</option>
                <option>Yamuna Expressway</option>
              </select>
            </div>

            <div className="search-field">
              <i className="ti ti-clock"></i>
              <select id="s-status">
                <option value="">Any Status</option>
                <option>New Launch</option>
                <option>Under Construction</option>
                <option>Ready to Move</option>
              </select>
            </div>

            <div className="search-field">
              <i className="ti ti-currency-rupee"></i>
              <select id="s-budget">
                <option value="">Any Budget</option>
                <option>Under ₹50L</option>
                <option>₹50L – ₹1Cr</option>
                <option>₹1Cr – ₹2Cr</option>
                <option>₹2Cr – ₹5Cr</option>
                <option>Above ₹5Cr</option>
              </select>
            </div>

            <button className="search-btn" onClick={handleSearch}>
              <i className="ti ti-search"></i> Search
            </button>
          </div>

          <div className="search-more">
            <span className="tag-pill">✦ Trending</span>
            <span className="tag-pill">➤ New Launch</span>
            <span className="tag-pill">★ Most Popular</span>
            <span className="tag-pill">♛ Ultra Luxury</span>
          </div>
        </div>

        <div className="localities">
          <span className="loc-chip" onClick={() => handleLocalityClick('Yamuna Expressway')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Yamuna Expressway
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Noida Expressway')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Noida Expressway
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Central Noida')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Central Noida
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Noida Extension')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Noida Extension
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Greater Noida West')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Greater Noida West
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;