// src/components/DomainServices.jsx
import React, { useState } from 'react';
import { searchDomain, valuateDomain, backorderDomain } from '../services/api';

const DomainServices = () => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const data = await searchDomain(domain);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error searching domain');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleValuation = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const data = await valuateDomain(domain);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error during valuation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackorder = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    const email = prompt('Enter your email for backorder notification:');
    if (!email) return;
    setError('');
    setLoading(true);
    try {
      await backorderDomain(domain, email);
      alert(`✅ Backorder placed for "${domain}". We'll notify you at ${email}.`);
      setResult({ message: 'Backorder placed successfully', domain, email });
    } catch (err) {
      setError(err.message || 'Backorder failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="domain" style={{ background: 'var(--bg1)' }}>
      <div className="section-header">
        <div className="section-label">Domain + Real Estate</div>
        <div className="section-title">Own Your Digital Address</div>
        <div className="section-sub">
          Search, value, and secure the perfect domain for your brand or project.
        </div>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={loading}
          />
          <button className="btn" onClick={handleSearch} disabled={loading}>
            <i className="ti ti-search"></i> {loading ? 'Searching...' : 'Search'}
          </button>
          <button className="btn-outline-light" onClick={handleValuation} disabled={loading}>
            Valuation
          </button>
          <button className="btn-outline-light" onClick={handleBackorder} disabled={loading}>
            Backorder
          </button>
        </div>

        {error && (
          <div style={{ marginTop: '15px', color: '#E74C3C', fontWeight: '500' }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(192,57,43,0.3)',
              color: '#e2e8f0',
              textAlign: 'left',
            }}
          >
            <h4 style={{ color: '#60a5fa', marginBottom: '12px' }}>
              Results for <span style={{ color: '#fff' }}>{result.domain || domain}</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {result.available !== undefined && (
                <div>
                  <strong>Status:</strong> {result.available ? '✅ Available' : '❌ Taken'}
                </div>
              )}
              {result.estimatedValue && (
                <div>
                  <strong>Value:</strong> ${result.estimatedValue.min} – ${result.estimatedValue.max}{' '}
                  {result.estimatedValue.currency}
                </div>
              )}
              {result.registrar && <div><strong>Registrar:</strong> {result.registrar}</div>}
              {result.status && <div><strong>Status:</strong> {result.status}</div>}
              {result.message && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Message:</strong> {result.message}
                </div>
              )}
              {result.suggestions && result.suggestions.length > 0 && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Suggestions:</strong>
                  <ul style={{ marginTop: '5px', listStyle: 'none', padding: 0 }}>
                    {result.suggestions.map((sug, idx) => (
                      <li key={idx} style={{ padding: '4px 0', color: '#94a3b8' }}>
                        • {sug}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.factors && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Valuation Factors:</strong>
                  <ul style={{ marginTop: '5px', listStyle: 'none', padding: 0 }}>
                    <li style={{ color: '#94a3b8' }}>• Length: {result.factors.length} chars</li>
                    <li style={{ color: '#94a3b8' }}>• Keywords: {result.factors.keywords?.join(', ')}</li>
                    <li style={{ color: '#94a3b8' }}>• Extension: {result.factors.extension}</li>
                    <li style={{ color: '#94a3b8' }}>• Search Volume: {result.factors.searchVolume}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DomainServices;