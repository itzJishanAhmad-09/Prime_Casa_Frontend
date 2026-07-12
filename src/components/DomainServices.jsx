import React, { useState } from 'react';

const DomainServices = () => {
  const [domain, setDomain] = useState('');

  const handleDomainSearch = (e) => {
    e.preventDefault();
    alert(`Searching for domain: ${domain || 'primecasa.com'} (demo)`);
  };

  const handleValuation = () => {
    alert(`Valuating domain: ${domain || 'primecasa.com'} (demo)`);
  };

  const handleBackorder = () => {
    alert(`Backordering domain: ${domain || 'primecasa.com'} (demo)`);
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
        <form className="domain-input-group" onSubmit={handleDomainSearch}>
          <input
            type="text"
            placeholder="Enter domain, e.g. primecasa.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button type="submit" className="btn"><i className="ti ti-search"></i> Search</button>
          <button type="button" className="btn-outline-light" onClick={handleValuation}>Valuation</button>
          <button type="button" className="btn-outline-light" onClick={handleBackorder}>Backorder</button>
        </form>
      </div>
    </div>
  );
};

export default DomainServices;