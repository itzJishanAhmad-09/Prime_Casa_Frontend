// src/pages/SectorDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sectors } from '../data/sectors';
import { marketData } from '../data/marketData';
import { projects } from '../data/projects';

const SectorDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const sector = sectors.find(s => s.name === decodedName);

  if (!sector) {
    return (
      <div style={{ padding: '60px 2rem', textAlign: 'center' }}>
        <h2>Sector not found</h2>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Find market data for this sector
  const marketInfo = marketData.find(m => m.name === sector.name);
  
  // Find projects in this sector
  const sectorProjects = projects.filter(p => p.loc.includes(sector.name));

  // Get color based on tier
  const getTierColor = (tier) => {
    switch(tier) {
      case 'premium': return '#C0392B';
      case 'mid': return '#1E40AF';
      case 'affordable': return '#065F46';
      case 'commercial': return '#7C3AED';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ padding: '60px 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>
        ← Back to Sectors
      </Link>

      <div style={{ 
        background: 'var(--bg)', 
        borderRadius: '20px', 
        padding: '40px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', margin: 0 }}>
            {sector.name}
          </h1>
          <span className={`sector-badge badge-${sector.badge}`} style={{ fontSize: '14px', padding: '6px 16px' }}>
            {sector.badgeLabel}
          </span>
        </div>

        <div style={{ 
          background: 'var(--bg1)', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '24px' 
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700' }}>
            {sector.price} <span style={{ fontSize: '16px', fontWeight: '400', color: 'var(--txt3)' }}>/sq ft</span>
          </div>
          <div style={{ fontSize: '18px', color: '#059669', fontWeight: '600' }}>
            <i className="ti ti-trending-up"></i> {sector.growth} YoY Growth
          </div>
          <div style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '8px' }}>
            {sector.type}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <strong>Category:</strong> {sector.tier.charAt(0).toUpperCase() + sector.tier.slice(1)}
          </div>
          <div>
            <strong>Status:</strong> {sector.badge === 'hot' ? '🔥 High Demand' : '📈 Stable Growth'}
          </div>
          {marketInfo && (
            <>
              <div>
                <strong>Flat Rate:</strong> {marketInfo.flat}
              </div>
              <div>
                <strong>Plot Rate:</strong> {marketInfo.plot}
              </div>
              <div>
                <strong>1 BHK Range:</strong> {marketInfo.bhk1}
              </div>
              <div>
                <strong>2 BHK Range:</strong> {marketInfo.bhk2}
              </div>
            </>
          )}
        </div>

        <div style={{ 
          padding: '16px', 
          background: `linear-gradient(135deg, ${getTierColor(sector.tier)}20, transparent)`,
          borderRadius: '12px',
          border: `1px solid ${getTierColor(sector.tier)}30`,
          marginBottom: '24px'
        }}>
          <strong style={{ color: getTierColor(sector.tier) }}>Market Analysis:</strong>
          <span style={{ color: 'var(--txt2)', marginLeft: '8px' }}>
            {sector.tier === 'premium' && 'Premium sector with high-end developments and excellent infrastructure.'}
            {sector.tier === 'mid' && 'Mid-range sector with balanced growth and good connectivity.'}
            {sector.tier === 'affordable' && 'Affordable sector with high appreciation potential and growing demand.'}
            {sector.tier === 'commercial' && 'Commercial hub with excellent business and retail opportunities.'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/#projects">
            <button className="btn-red" style={{ padding: '14px 32px' }}>
              <i className="ti ti-building"></i> View Properties in {sector.name}
            </button>
          </Link>
          <a 
            href="https://wa.me/918130504183" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              background: '#25D366', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '9px', 
              padding: '14px 28px', 
              fontSize: '14px', 
              fontWeight: '600', 
              textDecoration: 'none' 
            }}
          >
            <i className="ti ti-brand-whatsapp"></i> Get Expert Advice
          </a>
        </div>
      </div>

      {/* Projects in this sector */}
      {sectorProjects.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '20px' }}>
            Projects in {sector.name}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {sectorProjects.map((project, index) => (
              <Link 
                key={index}
                to={`/project/${projects.indexOf(project)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '20px',
                  transition: 'box-shadow 0.2s'
                }}>
                  <div style={{ fontSize: '32px' }}>{project.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', marginTop: '8px' }}>
                    {project.title}
                  </h3>
                  <div style={{ fontSize: '14px', color: 'var(--txt2)' }}>{project.builder}</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--red)', marginTop: '8px' }}>
                    {project.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorDetail;