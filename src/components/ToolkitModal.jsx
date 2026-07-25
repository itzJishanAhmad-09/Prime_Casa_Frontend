// src/components/ToolkitModal.jsx
import React, { useState } from 'react';

const ROICalculator = () => {
  const [investment, setInvestment] = React.useState('5000000');
  const [appreciation, setAppreciation] = React.useState('8');
  const [years, setYears] = React.useState('5');
  
  const roi = (investment * ((1 + appreciation/100) ** years) - investment).toFixed(0);
  const finalValue = (investment * ((1 + appreciation/100) ** years)).toFixed(0);
  
  return (
    <div>
      <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', marginBottom:'16px'}}>Realty ROI Calculator</h3>
      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Investment (₹)</label>
        <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Annual Appreciation (%)</label>
        <input type="number" value={appreciation} onChange={(e) => setAppreciation(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{marginBottom:'16px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Years</label>
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{background:'var(--accent-bg)', padding:'12px', borderRadius:'8px', marginBottom:'8px'}}>
        <div style={{fontSize:'12px', color:'var(--text)'}}>Expected Gain</div>
        <div style={{fontSize:'18px', fontWeight:'700', color:'var(--accent)'}}>₹{parseInt(roi).toLocaleString('en-IN')}</div>
      </div>
      <div style={{background:'var(--code-bg)', padding:'12px', borderRadius:'8px'}}>
        <div style={{fontSize:'12px', color:'var(--text)'}}>Final Value</div>
        <div style={{fontSize:'18px', fontWeight:'700', color:'var(--text-h)'}}>₹{parseInt(finalValue).toLocaleString('en-IN')}</div>
      </div>
    </div>
  );
};

const EMIPlanner = () => {
  const [principal, setPrincipal] = React.useState('3000000');
  const [rate, setRate] = React.useState('6.5');
  const [tenure, setTenure] = React.useState('20');
  
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)).toFixed(0);
  const totalAmount = (emi * months).toFixed(0);
  const totalInterest = (totalAmount - principal).toFixed(0);
  
  return (
    <div>
      <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', marginBottom:'16px'}}>EMI Planner</h3>
      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Loan Amount (₹)</label>
        <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Interest Rate (% p.a.)</label>
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{marginBottom:'16px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Tenure (Years)</label>
        <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{background:'var(--accent-bg)', padding:'12px', borderRadius:'8px', marginBottom:'8px'}}>
        <div style={{fontSize:'12px', color:'var(--text)'}}>Monthly EMI</div>
        <div style={{fontSize:'18px', fontWeight:'700', color:'var(--accent)'}}>₹{parseInt(emi).toLocaleString('en-IN')}</div>
      </div>
      <div style={{background:'var(--code-bg)', padding:'12px', borderRadius:'8px', marginBottom:'8px', fontSize:'13px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'4px'}}>
          <span>Total Amount:</span>
          <span>₹{parseInt(totalAmount).toLocaleString('en-IN')}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Total Interest:</span>
          <span>₹{parseInt(totalInterest).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

const NRIComponent = () => (
  <div>
    <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', marginBottom:'12px'}}>NRI Realty Edge</h3>
    <p style={{fontSize:'13px', lineHeight:'1.6'}}>
      Special guidance for NRI investors including FEMA regulations, tax implications, and property laws. 
      Contact our NRI Investment Desk for detailed consultation.
    </p>
    <p style={{marginTop:'12px', fontSize:'13px'}}>
      📞 <strong>WhatsApp +91 8130504183</strong> for NRI support
    </p>
  </div>
);

const Valuation = () => {
  const [price, setPrice] = React.useState('10000000');
  const [rate, setRate] = React.useState('8');
  const [years, setYears] = React.useState('5');

  const futureValue = (price * ((1 + rate/100) ** years)).toFixed(0);
  const gain = (futureValue - price).toFixed(0);
  const gainPercent = ((gain / price) * 100).toFixed(2);

  return (
    <div>
      <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', marginBottom:'16px'}}>Property Valuation Calculator</h3>
      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Current Property Price (₹)</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Expected Annual Appreciation (%)</label>
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{marginBottom:'16px'}}>
        <label style={{fontSize:'13px', fontWeight:'500', marginBottom:'4px', display:'block'}}>Holding Period (Years)</label>
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={{width:'100%', padding:'8px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'13px'}} />
      </div>
      <div style={{background:'var(--accent-bg)', padding:'12px', borderRadius:'8px', marginBottom:'8px'}}>
        <div style={{fontSize:'12px', color:'var(--text)'}}>Estimated Future Value</div>
        <div style={{fontSize:'18px', fontWeight:'700', color:'var(--accent)'}}>₹{parseInt(futureValue).toLocaleString('en-IN')}</div>
      </div>
      <div style={{background:'var(--code-bg)', padding:'12px', borderRadius:'8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'4px'}}>
          <span>Total Gain:</span>
          <span>₹{parseInt(gain).toLocaleString('en-IN')}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Gain Percentage:</span>
          <span>{gainPercent}%</span>
        </div>
      </div>
    </div>
  );
};

const ToolkitModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '28px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        {content === 'roi' && <ROICalculator />}
        {content === 'emi' && <EMIPlanner />}
        {content === 'nri' && <NRIComponent />}
        {content === 'valuation' && <Valuation />}
        {/* ✅ 'iq' case removed */}
      </div>
    </div>
  );
};

export default ToolkitModal;