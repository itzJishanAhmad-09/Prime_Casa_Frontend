// src/components/HowItWorks.jsx
import React from 'react';

const steps = [
  {
    title: 'Tell Us Your Needs',
    desc: 'Share your budget, preferred location, and property type with our team.'
  },
  {
    title: 'Get Verified Options',
    desc: 'We shortlist RERA-approved projects tailored specifically to your requirements.'
  },
  {
    title: 'Site Visit & Assistance',
    desc: 'Schedule visits, compare deals, and get complete financing help.'
  },
  {
    title: 'Book & Grow Wealth',
    desc: 'Secure your investment with full support right through to possession and beyond.'
  }
];

const HowItWorks = () => (
  <div className="section" id="how-it-works">
    <div className="section-header">
      <div className="section-label">Process</div>
      <div className="section-title">How It Works</div>
    </div>
    <div className="steps-grid">
      {steps.map((step, i) => (
        <div className="step-card" key={i}>
          <div className="step-num">{i+1}</div>
          <div className="step-title">{step.title}</div>
          <div className="step-desc">{step.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export default HowItWorks;