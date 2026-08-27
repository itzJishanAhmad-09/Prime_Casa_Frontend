// src/components/Services.jsx (the component, not the page)
import React from 'react';
import {
  IconShieldCheck,
  IconBuildingBank,
  IconPalette,
  IconHeadset,
  IconWorld,
  IconCertificate,
} from '@tabler/icons-react';

const Services = () => (
  <div className="section section-alt" id="services">
    <div className="section-header">
      <div className="section-label">Prime Casa Exclusives</div>
      <div className="section-title">Beyond Just Helping You Buy</div>
      <div className="section-sub">We offer exclusive services that make your real estate journey smooth, secure, and rewarding.</div>
    </div>
    <div className="services-grid">
      {[
        { icon: IconShieldCheck, title: 'Expert Home Inspection', desc: 'Detailed property checks to ensure quality, safety, and complete peace of mind before you invest.' },
        { icon: IconBuildingBank, title: 'Hassle-Free Home Loans', desc: 'End-to-end loan assistance with top banks and financial partners for seamless, fast approvals.' },
        { icon: IconPalette, title: 'Exclusive Interior Benefits', desc: 'Special deals on premium interior solutions to customize your new home affordably.' },
        { icon: IconHeadset, title: 'Dedicated Post-Sales Care', desc: 'Support that continues after purchase — from documentation to possession assistance.' },
        { icon: IconWorld, title: 'NRI Investment Desk', desc: 'Navigate property laws, FEMA regulations, taxation & NRI loans with expert guidance.' },
        { icon: IconCertificate, title: 'RERA Consultation', desc: 'Full compliance support — verify registrations, file complaints, and protect your investment legally.' }
      ].map((s, i) => {
        const IconComponent = s.icon;
        return (
          <div className="service-card" key={i}>
            <div className="service-icon">
              <IconComponent size={22} color="#fff" />
            </div>
            <div className="service-title">{s.title}</div>
            <div className="service-desc">{s.desc}</div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Services;