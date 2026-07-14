// src/components/Insights.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Insights = ({ news }) => {
  // If news is empty or undefined, show a message
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
            <div className="news-img">{item.emoji || '📰'}</div>
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
      </div>
    </section>
  );
};

export default Insights;