import React, { useState } from 'react';

const Sectors = ({ sectors }) => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? sectors
    : sectors.filter(s => s.tier === filter);

  return (
    <section className="section section-alt" id="sectors">
      <div className="section-header">
        <div className="section-label">Sector Guide</div>
        <div className="section-title">All Noida Sectors at a Glance</div>
        <div className="section-sub">
          Live rates sourced from NoBroker, 99acres &amp; ground research — June 2026
        </div>
      </div>
      <div className="filters" id="sector-filters">
        {['all', 'premium', 'mid', 'affordable', 'commercial'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Sectors' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="sector-grid">
        {filtered.map((s, idx) => (
          <div className={`sector-card ${s.badge === 'hot' ? 'hot' : ''}`} key={idx}>
            <div className="sector-top">
              <div className="sector-name">{s.name}</div>
              <span className={`sector-badge badge-${s.badge}`}>{s.badgeLabel}</span>
            </div>
            <div className="sector-price">{s.price} <span>/sq ft</span></div>
            <div className="sector-growth"><i className="ti ti-trending-up"></i> {s.growth} YoY</div>
            <div className="sector-type">{s.type}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sectors;