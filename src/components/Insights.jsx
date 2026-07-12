import React from 'react';

const Insights = ({ news }) => {
  return (
    <div className="section" id="insights">
      <div className="section-header">
        <div className="section-label">Latest Insights</div>
        <div className="section-title">Noida Real Estate News</div>
        <div className="section-sub">
          Stay ahead with the latest market developments, launches, and policy updates
        </div>
      </div>
      <div className="news-grid">
        {news.map((item, idx) => (
          <div className="news-card" key={idx}>
            <div className="news-img">{item.emoji}</div>
            <div className="news-body">
              <div className="news-tag">{item.tag} · {item.date}</div>
              <div className="news-title">{item.title}</div>
              <div className="news-excerpt">{item.excerpt}</div>
              <div className="news-link">Read More →</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center', marginTop:'30px'}}>
        <button style={{padding:'12px 34px', borderRadius:'8px', border:'1px solid var(--border-s)', background:'var(--bg1)', fontSize:'14px', cursor:'pointer', fontFamily:'Inter, sans-serif', color:'var(--txt)', fontWeight:'500'}}>
          Read All Insights ↗
        </button>
      </div>
    </div>
  );
};

export default Insights;