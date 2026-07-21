// src/pages/ProjectDetail.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import PriceChart from '../components/PriceChart';

// Helper to detect if a string is an image path
const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id);
  const project = projects[projectIndex];
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) {
    return (
      <div style={{ padding: '60px 2rem', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Get price history (if available)
  const getPriceHistory = () => {
    const data = project.priceHistory || [];
    const maxPrice = data.length ? Math.max(...data.map(d => d.price)) : 0;
    return { data, maxPrice };
  };

  const { data: priceData, maxPrice } = getPriceHistory();

  // Similar projects
  const similarProjects = projects.filter(p =>
    p.id !== project.id && (p.type === project.type || p.loc.includes(project.loc.split(',')[0]))
  ).slice(0, 4);

  const handleScheduleVisit = () => {
    navigate(`/schedule/${projectIndex}`);
  };

  return (
    <div style={{ padding: '40px 2rem 60px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--txt3)' }}>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/#projects" style={{ color: 'var(--red)', textDecoration: 'none' }}>Projects</Link>
        <span>/</span>
        <span>{project.title}</span>
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A08 0%, #3D1710 55%, #1A0A08 100%)',
        borderRadius: '20px',
        padding: '40px 48px',
        marginBottom: '32px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Image or Emoji */}
          {isImagePath(project.emoji) ? (
            <img 
              src={project.emoji} 
              alt={project.title}
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }}
            />
          ) : (
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>{project.emoji || '🏠'}</div>
          )}
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {project.tag === 'popular' && <span className="proj-badge badge-popular" style={{ fontSize: '12px', padding: '4px 14px' }}>Popular</span>}
            {project.tag === 'new' && <span className="proj-badge badge-new" style={{ fontSize: '12px', padding: '4px 14px' }}>New Launch</span>}
            {project.type === 'luxury' && <span className="proj-badge badge-luxury" style={{ fontSize: '12px', padding: '4px 14px' }}>Luxury</span>}
            <span className="proj-badge badge-rera" style={{ fontSize: '12px', padding: '4px 14px' }}>RERA ✓</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', marginBottom: '4px' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
            {project.builder} · {project.loc}
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#F0C040' }}>
              {project.price}
            </div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>
              {project.psf}
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              <i className="ti ti-clock" style={{ marginRight: '4px' }}></i> {project.status}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - unchanged */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Left Column - unchanged */}
        <div>
          <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--border)', marginBottom: '24px', overflowX: 'auto' }}>
            {['overview', 'features', 'location', 'price-trends', 'rera'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid var(--red)' : '3px solid transparent',
                  color: activeTab === tab ? 'var(--red)' : 'var(--txt2)',
                  fontWeight: activeTab === tab ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'features' && 'Features'}
                {tab === 'location' && 'Location'}
                {tab === 'price-trends' && 'Price Trends'}
                {tab === 'rera' && 'RERA Details'}
              </button>
            ))}
          </div>

          {/* Tab Content - unchanged */}
          <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)' }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* ... all overview content unchanged ... */}
                {/* Same as before – no changes needed */}
              </div>
            )}
            {/* Other tabs unchanged */}
          </div>
        </div>

        {/* Right Column – Sidebar - unchanged */}
        <div>
          {/* ... */}
        </div>
      </div>

      {/* Similar Projects */}
      {similarProjects.length > 0 && (
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '24px' }}>
            Similar Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {similarProjects.map((similar, idx) => {
              const similarIndex = projects.indexOf(similar);
              return (
                <Link
                  key={idx}
                  to={`/project/${similarIndex}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '20px',
                    transition: 'box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(192,57,43,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Image or emoji */}
                  {isImagePath(similar.emoji) ? (
                    <img 
                      src={similar.emoji} 
                      alt={similar.title}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                    />
                  ) : (
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{similar.emoji || '🏠'}</div>
                  )}
                  <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>{similar.builder}</div>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginTop: '4px' }}>{similar.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--txt2)', marginTop: '4px' }}>{similar.loc}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--red)', marginTop: '8px' }}>
                    {similar.price}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;