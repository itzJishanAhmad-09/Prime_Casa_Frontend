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

const Hero = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  return (
    <div className="hero">
      <img
        src="/assets/videos/hero.png"
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

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="search-wrap" data-wmcp='{"name":"propertySearch","description":"Search and filter properties by category, sector, status, and budget","type":"search"}'>
          <div className="search-row">
            <div className="search-field">
              <IconBuilding size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select id="s-cat" data-wmcp='{"label":"Category","type":"select","options":["Apartments","Luxury Villas","Penthouses","Office Suites","Retail Space","Workspaces","Residential Plots","Farm Land"]}'>
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
              <IconMapPin size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select id="s-sector" data-wmcp='{"label":"Sector","type":"select","options":["Sector 150","Sector 128","Sector 107","Sector 94","Sector 72","Sector 62","Noida Extension","Greater Noida West","Yamuna Expressway"]}'>
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
              <IconClock size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select id="s-status" data-wmcp='{"label":"Status","type":"select","options":["New Launch","Under Construction","Ready to Move"]}'>
                <option value="">Any Status</option>
                <option>New Launch</option>
                <option>Under Construction</option>
                <option>Ready to Move</option>
              </select>
            </div>

            <div className="search-field">
              <IconCurrencyRupee size={18} color="var(--gold-l)" style={{ padding: '0 0.6rem', opacity: 0.7 }} />
              <select id="s-budget" data-wmcp='{"label":"Budget","type":"select","options":["Under ₹50L","₹50L – ₹1Cr","₹1Cr – ₹2Cr","₹2Cr – ₹5Cr","Above ₹5Cr"]}'>
                <option value="">Any Budget</option>
                <option>Under ₹50L</option>
                <option>₹50L – ₹1Cr</option>
                <option>₹1Cr – ₹2Cr</option>
                <option>₹2Cr – ₹5Cr</option>
                <option>Above ₹5Cr</option>
              </select>
            </div>

            <button className="search-btn" onClick={handleSearch}>
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

        <div className="localities">
          <span className="loc-chip" onClick={() => handleLocalityClick('Yamuna Expressway')}>
            <IconMapPin size={13} style={{ marginRight: '4px' }} /> Yamuna Expressway
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Noida Expressway')}>
            <IconMapPin size={13} style={{ marginRight: '4px' }} /> Noida Expressway
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Central Noida')}>
            <IconMapPin size={13} style={{ marginRight: '4px' }} /> Central Noida
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Noida Extension')}>
            <IconMapPin size={13} style={{ marginRight: '4px' }} /> Noida Extension
          </span>
          <span className="loc-chip" onClick={() => handleLocalityClick('Greater Noida West')}>
            <IconMapPin size={13} style={{ marginRight: '4px' }} /> Greater Noida West
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;