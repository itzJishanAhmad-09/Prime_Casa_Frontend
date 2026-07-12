import React, { useState } from 'react';

const DomainServices = () => {
  const [domain, setDomain] = useState('');

  const checkDomain = () => {
    alert(`🔍 Searching for "${domain}" ... (demo)`);
  };

  const estimateDomain = () => {
    alert(`📊 Estimating value for "${domain}" ... (demo)`);
  };

  const backorderDomain = () => {
    alert(`⏳ Backorder request placed for "${domain}" ... (demo)`);
  };

  return (
    <div className="section" id="domain" style={{ background: 'var(--bg1)' }}>
      <div className="section-header">
        <div className="section-label">Domain + Real Estate</div>
        <div className="section-title">Own Your Digital Address</div>
        <div className="section-sub">Search, value, and secure the perfect domain for your brand or project.</div>
      </div>
      <div className="domain-section">
        <div>
          <h2><span>Domain</span> Services</h2>
          <p>Find, estimate, and backorder premium domains that match your real estate ventures.</p>
        </div>
        <div className="domain-input-group">
          <input
            type="text"
            placeholder="Enter domain, e.g. primecasa.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button className="btn" onClick={checkDomain}><i className="ti ti-search"></i> Search</button>
          <button className="btn-outline-light" onClick={estimateDomain}>Valuation</button>
          <button className="btn-outline-light" onClick={backorderDomain}>Backorder</button>
        </div>
      </div>
    </div>
  );
};

export default DomainServices;