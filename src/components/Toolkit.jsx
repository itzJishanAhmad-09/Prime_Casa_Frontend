import React from 'react';
const Toolkit = ({ openModal }) => (
  <div className="section section-alt" id="toolkit" style={{background:'var(--dark)', border:'none'}}>
    <div className="section-header">
      <div className="section-label" style={{color:'var(--gold-l)'}}>Free Tools</div>
      <div className="section-title" style={{color:'#fff'}}>Prime Casa Realty Toolkit</div>
      <div className="section-sub" style={{color:'rgba(255,255,255,0.55)'}}>Smart tools to plan, calculate, and invest with confidence</div>
    </div>
    <div className="toolkit-grid">
      {[ 
        { key: 'roi', icon: 'ti-chart-bar', title: 'Realty ROI Calculator', desc: 'Estimate returns and forecast growth on your property investments.' },
        { key: 'emi', icon: 'ti-calculator', title: 'EMI Planner', desc: 'Calculate monthly EMIs and optimize loan tenure for better returns.' },
        { key: 'nri', icon: 'ti-world', title: 'NRI Realty Edge', desc: 'Navigate property laws, taxation & loans as an NRI investor.' },
        { key: 'iq', icon: 'ti-robot', title: 'AI Property Advisor', desc: 'Get instant answers for buying and investing in Noida real estate.' },
      ].map((t, i) => (
        <div className="toolkit-card" key={i} onClick={() => openModal(t.key)}>
          <div className="toolkit-icon"><i className={`ti ${t.icon}`}></i></div>
          <div className="toolkit-title">{t.title}</div>
          <div className="toolkit-desc">{t.desc}</div>
          <div className="toolkit-arrow">Open →</div>
        </div>
      ))}
    </div>
  </div>
);
export default Toolkit;