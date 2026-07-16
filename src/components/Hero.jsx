import React from 'react';
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-tagline">Prime Casa - Turning Dreams into Addresses</div>
      <div className="hero-badge"><i className="ti ti-map-pin"></i> Noida &amp; Greater Noida, UP</div>
      <h1>The prime casa Trusted Properties.<br /><em>Simplified Search.</em></h1>
      <p className="hero-sub">0% Brokerage. 100% Trust. Discover your perfect home or next big investment across Noida's best sectors.</p>
      <div className="hero-0brok">✦ 0% Brokerage &nbsp;·&nbsp; RERA Verified &nbsp;·&nbsp; End-to-End Support</div>
      <div className="search-wrap">
        <div className="search-row">
          <select id="s-cat"><option>All Categories</option><option>Apartments</option><option>Luxury Villas</option><option>Penthouses</option><option>Office Suites</option><option>Retail Space</option><option>Workspaces</option><option>Residential Plots</option><option>Farm Land</option></select>
          <select id="s-sector"><option>All Sectors</option><option>Sector 150</option><option>Sector 128</option><option>Sector 107</option><option>Sector 94</option><option>Sector 72</option><option>Sector 62</option><option>Noida Extension</option><option>Greater Noida West</option><option>Yamuna Expressway</option></select>
          <select id="s-status"><option>Any Status</option><option>New Launch</option><option>Under Construction</option><option>Ready to Move</option></select>
          <select id="s-budget"><option>Any Budget</option><option>Under ₹50L</option><option>₹50L – ₹1Cr</option><option>₹1Cr – ₹2Cr</option><option>₹2Cr – ₹5Cr</option><option>Above ₹5Cr</option></select>
          <button className="search-btn" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}><i className="ti ti-search"></i> Search</button>
        </div>
        <div className="search-more">
          <span className="tag-pill active">✦ Trending</span>
          <span className="tag-pill">➤ New Launch</span>
          <span className="tag-pill">★ Most Popular</span>
          <span className="tag-pill">♛ Ultra Luxury</span>
        </div>
      </div>
      <div className="localities">
        <span className="loc-chip"><i className="ti ti-map-pin" style={{fontSize:'13px'}}></i> Yamuna Expressway</span>
        <span className="loc-chip"><i className="ti ti-map-pin" style={{fontSize:'13px'}}></i> Noida Expressway</span>
        <span className="loc-chip"><i className="ti ti-map-pin" style={{fontSize:'13px'}}></i> Central Noida</span>
        <span className="loc-chip"><i className="ti ti-map-pin" style={{fontSize:'13px'}}></i> Noida Extension</span>
        <span className="loc-chip"><i className="ti ti-map-pin" style={{fontSize:'13px'}}></i> Greater Noida West</span>
      </div>
    </div>
  );
};
export default Hero;