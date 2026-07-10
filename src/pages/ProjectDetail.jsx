// src/pages/ProjectDetail.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id);
  const project = projects[projectIndex];

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

  // Get next and previous projects for navigation
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div style={{ padding: '60px 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>
        ← Back to Home
      </Link>

      <div style={{ 
        background: 'var(--bg)', 
        borderRadius: '20px', 
        padding: '40px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>{project.emoji}</div>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {project.tag === 'popular' && <span className="proj-badge badge-popular">Popular</span>}
          {project.tag === 'new' && <span className="proj-badge badge-new">New Launch</span>}
          {project.type === 'luxury' && <span className="proj-badge badge-luxury">Luxury</span>}
          <span className="proj-badge badge-rera">RERA Verified ✓</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '8px' }}>
          {project.title}
        </h1>
        <p style={{ color: 'var(--red)', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
          {project.builder}
        </p>
        <p style={{ color: 'var(--txt2)', fontSize: '16px', marginBottom: '20px' }}>
          <i className="ti ti-map-pin"></i> {project.loc}
        </p>

        <div style={{ 
          background: 'var(--bg1)', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '24px' 
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--red)' }}>
            {project.price}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--txt3)' }}>{project.psf}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <strong>Status:</strong> {project.status}
          </div>
          <div>
            <strong>Type:</strong> {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
          </div>
          <div>
            <strong>Beds:</strong> {project.beds}
          </div>
          <div>
            <strong>Amenities:</strong> {project.amenities}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn-red" style={{ padding: '14px 32px' }}>
            <i className="ti ti-phone"></i> Enquire Now
          </button>
          <button className="btn-outline-w" style={{ borderColor: 'var(--border-s)', color: 'var(--txt)' }}>
            <i className="ti ti-calendar"></i> Schedule Visit
          </button>
          <a 
            href="https://wa.me/8130504006" 
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
            <i className="ti ti-brand-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Navigation between projects */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        {prevProject && (
          <Link 
            to={`/project/${projectIndex - 1}`}
            style={{ color: 'var(--red)', textDecoration: 'none' }}
          >
            ← {prevProject.title}
          </Link>
        )}
        {nextProject && (
          <Link 
            to={`/project/${projectIndex + 1}`}
            style={{ color: 'var(--red)', textDecoration: 'none', marginLeft: 'auto' }}
          >
            {nextProject.title} →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;