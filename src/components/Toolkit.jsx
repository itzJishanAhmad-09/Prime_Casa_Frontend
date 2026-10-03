// src/components/Toolkit.jsx
import React, { useState } from 'react';

/* ---------- Helpers ---------- */
const inrCr = (cr) => {
  if (cr >= 1) return `₹${cr.toFixed(2)} Cr`;
  return `₹${(cr * 100).toFixed(0)} L`;
};
const inrFull = (n) => {
  return '₹' + Math.round(n).toLocaleString('en-IN');
};

const TABS = [
  { key: 'roi', label: 'ROI Calculator' },
  { key: 'emi', label: 'EMI Planner' },
  { key: 'nri', label: 'NRI Edge' },
];

const Toolkit = () => {
  const [tab, setTab] = useState('roi');

  /* ---------- ROI State ---------- */
  const [roiPrice, setRoiPrice] = useState(1.5);  // Cr
  const [roiAppr, setRoiAppr] = useState(8.0);    // %
  const [roiYield, setRoiYield] = useState(3.9);  // %
  const [roiYears, setRoiYears] = useState(5);

  /* ---------- EMI State ---------- */
  const [emiLoan, setEmiLoan] = useState(1.2);    // Cr
  const [emiRate, setEmiRate] = useState(8.5);    // %
  const [emiTenure, setEmiTenure] = useState(20); // years

  /* ---------- ROI Computations ---------- */
  const futureVal = roiPrice * Math.pow(1 + roiAppr / 100, roiYears);
  const capGain = futureVal - roiPrice;
  const avgVal = (roiPrice + futureVal) / 2;
  const totalRent = (avgVal * roiYield / 100) * roiYears;
  const totalReturn = capGain + totalRent;
  const totalPct = (totalReturn / roiPrice) * 100;

  // Bar chart values (year 0 → year N)
  const barCount = Math.min(roiYears, 6);
  const bars = Array.from({ length: barCount + 1 }, (_, i) => {
    const year = Math.round((i / barCount) * roiYears);
    const v = roiPrice * Math.pow(1 + roiAppr / 100, year);
    return { year, value: v };
  });
  const maxBar = Math.max(...bars.map((b) => b.value));

  /* ---------- EMI Computations ---------- */
  const P = emiLoan * 10000000;
  const r = (emiRate / 12) / 100;
  const n = emiTenure * 12;
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  const principalPct = Math.round((P / totalPayment) * 100);

  return (
    <section className="tk-section" id="toolkit">
      <div className="tk-inner">

        {/* ---------- Header + Tabs ---------- */}
        <div className="tk-header">
          <div className="tk-header-left">
            <div className="tk-eyebrow">
              <span className="tk-eyebrow-dot" aria-hidden="true" />
              Free Tools
            </div>
            <h2 className="tk-title">
              The Prime Casa <em>realty toolkit.</em>
            </h2>
            <p className="tk-sub">
              Plan, calculate and invest with institutional confidence.
              Figures are conservative estimates confirmed during consultation.
            </p>
          </div>

          <div className="tk-tabs" role="tablist" aria-label="Toolkit">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                className={`tk-tab ${tab === t.key ? 'is-active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* TAB 1 — ROI                                        */}
        {/* ================================================== */}
        {tab === 'roi' && (
          <div className="tk-panel">
            {/* Controls */}
            <div className="tk-controls">
              <div className="tk-controls-head">
                <h3 className="tk-controls-title">Realty ROI parameters</h3>
                <span className="tk-controls-badge">Dynamic Modeler</span>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="roi-price">Purchase price</label>
                  <span className="tk-field-value">{inrCr(roiPrice)}</span>
                </div>
                <input
                  id="roi-price"
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.25"
                  value={roiPrice}
                  onChange={(e) => setRoiPrice(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>₹50 L</span>
                  <span>₹10 Cr</span>
                </div>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="roi-appr">Expected appreciation (p.a.)</label>
                  <span className="tk-field-value">{roiAppr.toFixed(1)}%</span>
                </div>
                <input
                  id="roi-appr"
                  type="range"
                  min="4"
                  max="18"
                  step="0.5"
                  value={roiAppr}
                  onChange={(e) => setRoiAppr(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>4.0%</span>
                  <span>18.0%</span>
                </div>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="roi-yield">Rental yield (p.a.)</label>
                  <span className="tk-field-value">{roiYield.toFixed(1)}%</span>
                </div>
                <input
                  id="roi-yield"
                  type="range"
                  min="2"
                  max="7"
                  step="0.1"
                  value={roiYield}
                  onChange={(e) => setRoiYield(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>2.0%</span>
                  <span>7.0%</span>
                </div>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="roi-years">Holding period</label>
                  <span className="tk-field-value">
                    {roiYears} {roiYears === 1 ? 'year' : 'years'}
                  </span>
                </div>
                <input
                  id="roi-years"
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={roiYears}
                  onChange={(e) => setRoiYears(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>1 year</span>
                  <span>15 years</span>
                </div>
              </div>

              <p className="tk-disclaimer">
                Indicative model based on historical Noida Expressway capital
                trajectories. Returns subject to market dynamics.
              </p>
            </div>

            {/* Display */}
            <div className="tk-display">
              <div className="tk-display-head">
                <span className="tk-display-label">
                  Estimated value after {roiYears} {roiYears === 1 ? 'year' : 'years'}
                </span>
                <span className="tk-display-badge">COMPOUNDED</span>
              </div>

              <div className="tk-display-value">{inrCr(futureVal)}</div>

              <div className="tk-bars" aria-hidden="true">
                {bars.map((b) => (
                  <div
                    key={b.year}
                    className="tk-bar"
                    style={{ height: `${(b.value / maxBar) * 100}%` }}
                  />
                ))}
              </div>

              <div className="tk-breakdown">
                <div className="tk-breakdown-item">
                  <span className="tk-breakdown-label">Capital gain</span>
                  <span className="tk-breakdown-value">{inrCr(capGain)}</span>
                </div>
                <div className="tk-breakdown-item">
                  <span className="tk-breakdown-label">Rental income</span>
                  <span className="tk-breakdown-value">{inrCr(totalRent)}</span>
                </div>
                <div className="tk-breakdown-item">
                  <span className="tk-breakdown-label">Total ROI</span>
                  <span className="tk-breakdown-value is-accent">
                    {totalPct.toFixed(1)}%
                  </span>
                </div>
              </div>

              <a href="/contact" className="tk-cta-dark">
                <span>Request Verified Asset Allocation Report</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 2 — EMI                                        */}
        {/* ================================================== */}
        {tab === 'emi' && (
          <div className="tk-panel">
            <div className="tk-controls">
              <div className="tk-controls-head">
                <h3 className="tk-controls-title">Home Loan EMI Planner</h3>
                <span className="tk-controls-badge">Bank Slabs</span>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="emi-loan">Loan amount</label>
                  <span className="tk-field-value">{inrCr(emiLoan)}</span>
                </div>
                <input
                  id="emi-loan"
                  type="range"
                  min="0.2"
                  max="8"
                  step="0.1"
                  value={emiLoan}
                  onChange={(e) => setEmiLoan(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>₹20 L</span>
                  <span>₹8 Cr</span>
                </div>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="emi-rate">Interest rate (p.a.)</label>
                  <span className="tk-field-value">{emiRate.toFixed(1)}%</span>
                </div>
                <input
                  id="emi-rate"
                  type="range"
                  min="6.5"
                  max="12"
                  step="0.1"
                  value={emiRate}
                  onChange={(e) => setEmiRate(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>6.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              <div className="tk-field">
                <div className="tk-field-row">
                  <label htmlFor="emi-tenure">Loan tenure</label>
                  <span className="tk-field-value">{emiTenure} years</span>
                </div>
                <input
                  id="emi-tenure"
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={emiTenure}
                  onChange={(e) => setEmiTenure(+e.target.value)}
                  className="tk-range"
                />
                <div className="tk-field-range">
                  <span>5 years</span>
                  <span>30 years</span>
                </div>
              </div>

              <p className="tk-disclaimer">
                Tie-ups with HDFC, ICICI, SBI & Axis Bank guarantee preferred
                interest slabs with zero file preparation charges.
              </p>
            </div>

            <div className="tk-display">
              <span className="tk-display-label">Estimated monthly commitment</span>
              <div className="tk-display-value is-accent">
                {inrFull(emi)}
                <span className="tk-display-unit"> / month</span>
              </div>

              <div className="tk-breakdown is-emi">
                <div className="tk-breakdown-item">
                  <span className="tk-breakdown-label">Principal</span>
                  <span className="tk-breakdown-value">{inrCr(emiLoan)}</span>
                </div>
                <div className="tk-breakdown-item">
                  <span className="tk-breakdown-label">Total interest</span>
                  <span className="tk-breakdown-value">
                    {inrCr(totalInterest / 10000000)}
                  </span>
                </div>
                <div className="tk-breakdown-item">
                  <span className="tk-breakdown-label">Total repaid</span>
                  <span className="tk-breakdown-value">
                    {inrCr(totalPayment / 10000000)}
                  </span>
                </div>
              </div>

              <div className="tk-bar-split" aria-hidden="true">
                <div className="tk-bar-split-fill" style={{ width: `${principalPct}%` }} />
              </div>
              <div className="tk-bar-split-labels">
                <span>Principal {principalPct}%</span>
                <span>Interest {100 - principalPct}%</span>
              </div>

              <a href="/contact" className="tk-cta-dark">
                <span>Get Pre-Approved Loan Assistance</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* TAB 3 — NRI                                        */}
        {/* ================================================== */}
        {tab === 'nri' && (
          <div className="tk-panel is-nri">
            {/* Left — intro */}
            <div className="tk-nri-intro">
              <div className="tk-nri-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                </svg>
                <span>FEMA & RBI Regulatory Adherence</span>
              </div>

              <h3 className="tk-nri-title">NRI Realty Advisory Desk</h3>

              <p className="tk-nri-desc">
                Navigate property acquisitions across India without geographic
                constraints. Our dedicated desk represents overseas clients in
                the UAE, United States, UK and Singapore, orchestrating end-to-end
                execution.
              </p>

              <div className="tk-nri-cards">
                <div className="tk-nri-card">
                  <span className="tk-nri-card-title">NRE / NRO Repatriation</span>
                  <span className="tk-nri-card-desc">
                    Clear guidance on 15CA/15CB documentation and safe capital transfers.
                  </span>
                </div>
                <div className="tk-nri-card">
                  <span className="tk-nri-card-title">Remote Power of Attorney</span>
                  <span className="tk-nri-card-desc">
                    Consulate notarization and local registrar adjudication
                    handled on-site.
                  </span>
                </div>
              </div>

              <a href="tel:+918130504183" className="tk-cta-red">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                     strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                <span>Talk to NRI Desk Head (+91 81305 04183)</span>
              </a>
            </div>

            {/* Right — checklist */}
            <div className="tk-nri-side">
              <span className="tk-nri-side-label">Foreign Exchange Dividend</span>
              <h4 className="tk-nri-side-title">
                Why NRIs are investing heavily in Noida
              </h4>

              <ul className="tk-nri-list">
                {[
                  'Jewar International Airport (Phase 1 operational 2025–26) creating 15–20% annualized perimeter growth.',
                  'Institutional MNC offices moving to Sector 142 and Noida Expressway.',
                  'UP-RERA provides strict escrow security on developer funds.',
                ].map((t, i) => (
                  <li key={i} className="tk-nri-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                         strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Toolkit;