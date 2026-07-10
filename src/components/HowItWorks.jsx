import React from 'react';
const HowItWorks = () => (
  <div className="section" id="how-it-works">
    <div className="section-header">
      <div className="section-label">Process</div>
      <div className="section-title">How It Works</div>
    </div>
    <div className="steps-grid">
      {[ 'Tell Us Your Needs', 'Get Verified Options', 'Site Visit & Assistance', 'Book & Grow Wealth' ].map((t, i) => (
        <div className="step-card" key={i}>
          <div className="step-num">{i+1}</div>
          <div className="step-title">{t}</div>
          <div className="step-desc">{['Share your budget, preferred location, and property type with our team.','We shortlist RERA-approved projects tailored specifically to your requirements.','Schedule visits, compare deals, and get complete financing help.','Secure your investment with full support right through to possession and beyond.'][i]}</div>
        </div>
      ))}
    </div>
  </div>
);
export default HowItWorks;