import React from 'react';

const DomainServices = () => {
  const checkDomain = () => {
    const input = document.getElementById('domainInput');
    const domain = input.value.trim() || 'primecasa.com';
    alert(`🔍 Domain "${domain}"\n✅ Available (demo)\n💰 Estimated value: $2,800 USD`);
  };

  const estimateDomain = () => {
    const input = document.getElementById('domainInput');
    const domain = input.value.trim() || 'primecasa.com';
    alert(`📊 Valuation for "${domain}"\n💰 $2,800 – $4,200 USD\n📈 Based on length, keywords, and extension.`);
  };

  const backorderDomain = () => {
    const input = document.getElementById('domainInput');
    const domain = input.value.trim() || 'primecasa.com';
    alert(`⏳ Backorder placed for "${domain}" (demo).\nWe'll notify you if it becomes available.`);
  };

  return (
    <div className="section" id="domain" style={{background:'var(--bg1)'}}>
      <div className="section-header">
        <div className="section-label">Domain + Real Estate</div>
        <div className="section-title">Own Your Digital Address</div>
        <div className="section-sub">Search, value, and secure the perfect domain for your brand or project.</div>
      </div>
      <div className="domain-section">
        <div className="domain-text">
          <h2><span>Domain</span> Services</h2>
          <p>Find, estimate, and backorder premium domains that match your real estate ventures.</p>
        </div>
        <div className="domain-input-group">
          <input type="text" placeholder="Enter domain, e.g. primecasa.com" id="domainInput" />
          <div className="button-row">
            <button className="btn" onClick={checkDomain}><i className="ti ti-search"></i> Search</button>
            <button className="btn-outline-light" onClick={estimateDomain}><i className="ti ti-coin"></i> Valuation</button>
            <button className="btn-outline-light" onClick={backorderDomain}><i className="ti ti-clock"></i> Backorder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainServices;