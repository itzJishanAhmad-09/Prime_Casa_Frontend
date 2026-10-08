// src/components/ToolkitModal.jsx
import React, { useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  Shared inline styles (kept DRY across the four calculators)        */
/* ------------------------------------------------------------------ */

const labelStyle = {
  fontSize: '13px',
  fontWeight: 500,
  marginBottom: '4px',
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  fontSize: '13px',
};

const resultBoxRed = {
  background: 'var(--ivory)',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '8px',
};

const resultBoxSand = {
  background: 'var(--sand)',
  padding: '12px',
  borderRadius: '8px',
};

const resultLabel = { fontSize: '12px', color: 'var(--muted-2)' };
const resultValueRed = {
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--red)',
};
const resultValueNeutral = {
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--txt)',
};

const titleStyle = {
  fontFamily: "'Playfair Display',serif",
  fontSize: '20px',
  marginBottom: '16px',
};

const rowBetween = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '4px',
};

/* ------------------------------------------------------------------ */
/*  Calculators                                                        */
/* ------------------------------------------------------------------ */

const ROICalculator = () => {
  const [investment, setInvestment] = React.useState('5000000');
  const [appreciation, setAppreciation] = React.useState('8');
  const [years, setYears] = React.useState('5');

  const inv = parseFloat(investment) || 0;
  const appr = parseFloat(appreciation) || 0;
  const yrs = parseFloat(years) || 0;
  const finalValue = inv * (1 + appr / 100) ** yrs;
  const roi = finalValue - inv;

  return (
    <div>
      <h3 style={titleStyle}>Realty ROI Calculator</h3>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>Investment (₹)</label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>Annual Appreciation (%)</label>
        <input
          type="number"
          value={appreciation}
          onChange={(e) => setAppreciation(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Years</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={resultBoxRed}>
        <div style={resultLabel}>Expected Gain</div>
        <div style={resultValueRed}>
          ₹{Math.round(roi).toLocaleString('en-IN')}
        </div>
      </div>

      <div style={resultBoxSand}>
        <div style={resultLabel}>Final Value</div>
        <div style={resultValueNeutral}>
          ₹{Math.round(finalValue).toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
};

const EMIPlanner = () => {
  const [principal, setPrincipal] = React.useState('3000000');
  const [rate, setRate] = React.useState('6.5');
  const [tenure, setTenure] = React.useState('20');

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(tenure) || 0;
  const monthlyRate = r / 12 / 100;
  const months = t * 12;
  const emi =
    months > 0 && monthlyRate > 0
      ? (p * monthlyRate * (1 + monthlyRate) ** months) /
        ((1 + monthlyRate) ** months - 1)
      : 0;
  const totalAmount = emi * months;
  const totalInterest = totalAmount - p;

  return (
    <div>
      <h3 style={titleStyle}>EMI Planner</h3>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>Loan Amount (₹)</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>Interest Rate (% p.a.)</label>
        <input
          type="number"
          value={rate}
          step="0.1"
          onChange={(e) => setRate(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Tenure (Years)</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={resultBoxRed}>
        <div style={resultLabel}>Monthly EMI</div>
        <div style={resultValueRed}>
          ₹{Math.round(emi).toLocaleString('en-IN')}
        </div>
      </div>

      <div style={{ ...resultBoxSand, fontSize: '13px' }}>
        <div style={rowBetween}>
          <span>Total Amount:</span>
          <span>₹{Math.round(totalAmount).toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Interest:</span>
          <span>₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

const NRIComponent = () => (
  <div>
    <h3 style={{ ...titleStyle, marginBottom: '12px' }}>NRI Realty Edge</h3>
    <p style={{ fontSize: '13px', lineHeight: 1.6 }}>
      Special guidance for NRI investors including FEMA regulations, tax
      implications, and property laws. Contact our NRI Investment Desk for a
      detailed consultation.
    </p>
    <p style={{ marginTop: '12px', fontSize: '13px' }}>
      📞 <strong>WhatsApp +91 8130504183</strong> for NRI support
    </p>
  </div>
);

const Valuation = () => {
  const [price, setPrice] = React.useState('10000000');
  const [rate, setRate] = React.useState('8');
  const [years, setYears] = React.useState('5');

  const p = parseFloat(price) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;
  const futureValue = p * (1 + r / 100) ** y;
  const gain = futureValue - p;
  const gainPercent = p !== 0 ? ((gain / p) * 100).toFixed(2) : 'N/A';

  return (
    <div>
      <h3 style={titleStyle}>Property Valuation Calculator</h3>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>Current Property Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={labelStyle}>Expected Annual Appreciation (%)</label>
        <input
          type="number"
          value={rate}
          step="0.1"
          onChange={(e) => setRate(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Holding Period (Years)</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={resultBoxRed}>
        <div style={resultLabel}>Estimated Future Value</div>
        <div style={resultValueRed}>
          ₹{Math.round(futureValue).toLocaleString('en-IN')}
        </div>
      </div>

      <div style={resultBoxSand}>
        <div style={rowBetween}>
          <span>Total Gain:</span>
          <span>₹{Math.round(gain).toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Gain Percentage:</span>
          <span>{gainPercent}%</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Modal shell                                                        */
/* ------------------------------------------------------------------ */

const ToolkitModal = ({ isOpen, onClose, content }) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '28px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        {content === 'roi'       && <ROICalculator />}
        {content === 'emi'       && <EMIPlanner />}
        {content === 'nri'       && <NRIComponent />}
        {content === 'valuation' && <Valuation />}
      </div>
    </div>
  );
};

export default ToolkitModal;