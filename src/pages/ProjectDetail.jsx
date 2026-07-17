// src/pages/ProjectDetail.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import PriceChart from '../components/PriceChart';  // 👈 IMPORT THE CHART

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
          <div style={{ fontSize: '56px', marginBottom: '12px' }}>{project.emoji}</div>
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

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Left Column */}
        <div>
          {/* Tabs */}
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

          {/* Tab Content */}
          <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)' }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '16px' }}>
                  About {project.title}
                </h2>
                <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--txt2)' }}>
                  {project.fullDescription || project.description}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  marginTop: '24px',
                  padding: '20px',
                  background: 'var(--bg1)',
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Status</div>
                    <div style={{ fontWeight: '600' }}>{project.status}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Base Price</div>
                    <div style={{ fontWeight: '600' }}>{project.basePrice || project.price}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Possession</div>
                    <div style={{ fontWeight: '600' }}>{project.possession || 'Contact for details'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Configurations</div>
                    <div style={{ fontWeight: '600' }}>{project.configurations?.join(', ') || project.beds}</div>
                  </div>
                </div>

                {/* Price Chart in Overview */}
                {priceData.length > 0 && (
                  <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                      Price Appreciation in {project.loc.split(',')[0]}
                    </h3>
                    <PriceChart data={priceData} label={`Price in ${project.loc.split(',')[0]}`} />
                  </div>
                )}

                {/* Price Statistics */}
                {project.priceStats && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginTop: '24px',
                    padding: '20px',
                    background: 'var(--bg1)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--txt2)' }}>
                        {project.priceStats.startingPrice}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Starting Price</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--txt2)' }}>
                        {project.priceStats.currentPrice}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Current Price</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#4ADE80' }}>
                        {project.priceStats.appreciation}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>Total Appreciation</div>
                    </div>
                  </div>
                )}

                {/* Key Highlights */}
                {project.keyHighlights && project.keyHighlights.length > 0 && (
                  <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Key Highlights</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {project.keyHighlights.map((highlight, idx) => (
                        <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'var(--red)', fontSize: '18px' }}>✦</span>
                          <span style={{ color: 'var(--txt2)' }}>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '16px' }}>
                  Features & Amenities
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {(project.features || []).map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      background: 'var(--bg1)',
                      borderRadius: '8px',
                      border: '1px solid var(--border)'
                    }}>
                      <span style={{ color: 'var(--red)' }}>✓</span>
                      <span style={{ fontSize: '14px', color: 'var(--txt2)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '16px' }}>
                  Location
                </h2>
                <div style={{
                  height: '300px',
                  background: 'var(--bg1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  marginBottom: '16px'
                }}>
                  <div style={{ textAlign: 'center', color: 'var(--txt3)' }}>
                    <i className="ti ti-map" style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}></i>
                    <div>{project.loc}</div>
                    <div style={{ fontSize: '12px' }}>📍 Google Maps integration coming soon</div>
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg1)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>Address:</div>
                  <div style={{ color: 'var(--txt2)' }}>{project.loc}</div>
                  <div style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '8px' }}>
                    <i className="ti ti-navigation"></i> Near Noida Expressway, well-connected to Delhi and other NCR cities
                  </div>
                </div>
              </div>
            )}

            {/* Price Trends Tab */}
            {activeTab === 'price-trends' && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '16px' }}>
                  Price Trends
                </h2>
                {priceData.length > 0 ? (
                  <PriceChart data={priceData} label={`${project.loc.split(',')[0]} Price`} />
                ) : (
                  <p style={{ color: 'var(--txt3)', textAlign: 'center', padding: '40px 0' }}>
                    No price history available for this project.
                  </p>
                )}
              </div>
            )}

            {/* RERA Tab */}
            {activeTab === 'rera' && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '16px' }}>
                  RERA Details
                </h2>
                <div style={{
                  display: 'grid',
                  gap: '16px',
                  padding: '20px',
                  background: 'var(--bg1)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>RERA ID</div>
                    <div style={{ fontWeight: '600', wordBreak: 'break-all' }}>{project.reraId || 'Contact for details'}</div>
                  </div>
                  {project.reraLink && (
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--txt3)' }}>RERA Link</div>
                      <a href={project.reraLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)', textDecoration: 'none' }}>
                        {project.reraLink} →
                      </a>
                    </div>
                  )}
                  <div style={{
                    padding: '12px',
                    background: '#D1FAE5',
                    borderRadius: '8px',
                    color: '#065F46',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '20px' }}>✓</span>
                    <span>This project is RERA verified and registered with UP-RERA</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column – Sidebar */}
        <div>
          <div style={{
            background: 'var(--bg)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '80px'
          }}>
            <div style={{ fontSize: '14px', color: 'var(--txt3)', marginBottom: '8px' }}>Need advisory?</div>
            <button
              onClick={handleScheduleVisit}
              className="btn-red"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <i className="ti ti-calendar-event"></i> Book Site Visit
            </button>

            <a
              href="https://wa.me/918130504183"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '9px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              <i className="ti ti-brand-whatsapp"></i> Chat with us
            </a>

            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'var(--bg1)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--txt2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <i className="ti ti-phone" style={{ color: 'var(--red)' }}></i>
                <span>+91 8130504183</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="ti ti-mail" style={{ color: 'var(--red)' }}></i>
                <span>hr@theprimecasa.in</span>
              </div>
            </div>
          </div>
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
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{similar.emoji}</div>
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