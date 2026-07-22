// src/components/ToolkitModal.jsx
import React, { useState } from 'react';

const AIAdvisor = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setLoading(true);
    try {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Thanks for your question. Please contact our team on WhatsApp for real estate advice.' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Unable to fetch response. Please contact our team on WhatsApp.' 
      }]);
    }
    setLoading(false);
    setQuestion('');
  };

  return (
    <div>
      <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', marginBottom:'8px'}}>AI Property Advisor</h3>
      <p style={{fontSize:'13px', color:'var(--txt2)', marginBottom:'16px'}}>
        Ask anything about Noida real estate, investments, RERA, or property selection.
      </p>
      <div style={{height:'180px', overflowY:'auto', background:'var(--bg1)', borderRadius:'10px', padding:'12px', marginBottom:'12px', fontSize:'13px', lineHeight:'1.7'}}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.role === 'user' ? 'right' : 'left',
            marginBottom: '8px'
          }}>
            <span style={{
              background: msg.role === 'user' ? 'var(--red)' : 'var(--bg)',
              color: msg.role === 'user' ? '#fff' : 'var(--txt)',
              padding: msg.role === 'user' ? '6px 12px' : '8px 12px',
              borderRadius: msg.role === 'user' ? '10px 10px 2px 10px' : '2px 10px 10px 10px',
              display: 'inline-block',
              border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
              lineHeight: '1.5',
              maxWidth: '80%'
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div style={{color:'var(--txt3)', fontStyle:'italic'}}>Thinking…</div>}
      </div>
      <div style={{display:'flex', gap:'8px'}}>
        <input 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Best sector to invest in 2026?" 
          style={{flex:1, border:'1px solid var(--border)', borderRadius:'8px', padding:'10px 14px', fontSize:'14px', outline:'none'}}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          disabled={loading}
        />
        <button 
          onClick={handleAsk} 
          style={{background:'var(--red)', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 18px', fontSize:'13px', fontWeight:'600', cursor:'pointer'}}
          disabled={loading}
        >
          {loading ? '…' : 'Ask'}
        </button>
      </div>
    </div>
  );
};

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

// ✅ NEW: Property Valuation Component
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
        {content === 'iq' && <AIAdvisor />}
        {content === 'nri' && <div><h3 style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', marginBottom:'12px'}}>NRI Realty Edge</h3><p style={{fontSize:'13px', lineHeight:'1.6'}}>Special guidance for NRI investors including FEMA regulations, tax implications, and property laws. Contact our NRI Investment Desk for detailed consultation.</p><p style={{marginTop:'12px', fontSize:'13px'}}>📞 <strong>WhatsApp +91 8130504183</strong> for NRI support</p></div>}
        {content === 'valuation' && <Valuation />}
      </div>
    </div>
  );
};

export default ToolkitModal;