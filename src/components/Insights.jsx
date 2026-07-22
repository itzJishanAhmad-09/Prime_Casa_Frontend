// src/components/Insights.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Helper to check if a string is an image path
const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const Insights = ({ news }) => {
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY = 3; // change this to control how many appear initially

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

  const displayed = showAll ? news : news.slice(0, INITIAL_DISPLAY);
  const showToggle = news.length > INITIAL_DISPLAY;

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
        {displayed.map((item, index) => (
          <div className="news-card" key={index}>
            <div className="news-img">
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

      {showToggle && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            style={{
              padding: '12px 34px',
              borderRadius: '8px',
              border: '1px solid var(--border-s)',
              background: 'var(--bg1)',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--txt)',
              fontWeight: '500',
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Read All Insights ↗'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Insights;