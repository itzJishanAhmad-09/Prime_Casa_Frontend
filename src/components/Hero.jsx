// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // IntersectionObserver – load video only when hero enters viewport
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  
  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    const video = videoRef.current;
    video.preload = 'auto';
    video.load();

    const onLoaded = () => {
      setVideoLoaded(true);
      video.play().catch(() => { /* autoplay may be blocked */ });
    };

    video.addEventListener('loadeddata', onLoaded);

    return () => {
      video.removeEventListener('loadeddata', onLoaded);
    };
  }, [shouldLoad]);

  // Search handlers (unchanged)
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
      <video
        ref={videoRef}
        className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // ❌ poster removed – no 404 error
      >
        {/* Video files should be in public/assets/videos/ */}
        <source src="/assets/videos/noida-drone.mp4" type="video/mp4" />
        <source src="/assets/videos/noida-drone.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        {/* Search bar and localities – unchanged */}
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