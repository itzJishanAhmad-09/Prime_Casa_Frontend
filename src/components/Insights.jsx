// src/components/Insights.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Helper to check if a string is an image path
const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const Insights = ({ news }) => {
  if (!news || news.length === 0) {
    return (
      <section className="section" id="insights">
        <div className="section-header">
          <div className="section-label">Latest Insights</div>
          <div className="section-title">Noida Real Estate News</div>
          <div className="section-sub">Stay ahead with the latest market developments</div>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--txt3)' }}>No insights available.</p>
      </section>
    );
  }

  return (
    <section className="section" id="insights">
      <div className="section-header">
        <div className="section-label">Latest Insights</div>
        <div className="section-title">Noida Real Estate News</div>
        <div className="section-sub">
          Stay ahead with the latest market developments, launches, and policy updates
        </div>
      </div>
      <div className="news-grid">
        {news.map((item, index) => (
          <div className="news-card" key={index}>
            <div className="news-img">
              {/* Check for image path (image field or emoji) */}
              {isImagePath(item.image || item.emoji) ? (
                <img 
                  src={item.image || item.emoji} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '48px' }}>{item.emoji || '📰'}</span>
              )}
            </div>
            <div className="news-body">
              <div className="news-tag">{item.tag} · {item.date}</div>
              <div className="news-title">{item.title}</div>
              <div className="news-excerpt">{item.excerpt}</div>
              <Link to={`/blog/${item.slug}`} className="news-link">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/insights">
          <button style={{
            padding: '12px 34px',
            borderRadius: '8px',
            border: '1px solid var(--border-s)',
            background: 'var(--bg1)',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--txt)',
            fontWeight: '500'
          }}>
            Read All Insights ↗
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Insights;