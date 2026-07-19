// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '100px 2rem 60px', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>
        ← Back to Home
      </Link>

      <div style={{
        background: 'var(--bg)',
        borderRadius: '20px',
        padding: '48px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '36px',
          marginBottom: '8px',
          color: 'var(--txt)'
        }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--txt3)', fontSize: '14px', marginBottom: '32px' }}>
          Last updated: July 2026
        </p>

        <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--txt2)' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong>Prime Casa</strong> is dedicated to maintaining the privacy and accuracy of all information on this website. We employ reasonable measures to safeguard your personal information from misuse, loss, or corruption within our environment.
          </p>

          <p style={{ marginBottom: '16px' }}>
            While we strive for accuracy on this website, Prime Casa does not accept responsibility for any loss incurred due to reliance on the information provided on this site. The information provided on this website is for general information purposes only and should not be relied upon for making financial or legal decisions. Users are encouraged to verify any information before acting upon it.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '32px', marginBottom: '12px', color: 'var(--txt)' }}>
            Scope of This Policy
          </h2>
          <p style={{ marginBottom: '16px' }}>
            This Policy applies to the collection, use, and sharing of personal information on this website and any app owned and operated by Prime Casa. It governs how we handle personal information of individuals who visit our website or use our apps.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Please note that this Policy does not extend to organizations not owned or controlled by us, or to individuals not employed or managed by us. It also does not cover information that we may be required to disclose to public or private authorities pursuant to law, court order, or another legal directive.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '32px', marginBottom: '12px', color: 'var(--txt)' }}>
            Information Collection and Use
          </h2>
          <p style={{ marginBottom: '16px' }}>
            By using our website or apps, you consent to the collection and use of your personal information as described in this Policy. We collect personal information when you:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Submit enquiry forms on our website</li>
            <li style={{ marginBottom: '8px' }}>Schedule a site visit</li>
            <li style={{ marginBottom: '8px' }}>Contact us via email or WhatsApp</li>
            <li style={{ marginBottom: '8px' }}>Subscribe to our newsletter</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>
            This information may include your name, email address, phone number, and preferred property details. This information is securely stored in our database and is not shared with any third party. We use this information solely to communicate with you about our products and services.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '32px', marginBottom: '12px', color: 'var(--txt)' }}>
            Information Sharing and Disclosure
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We do not sell, rent or share personal information with others except in the following circumstances:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>With your explicit consent</li>
            <li style={{ marginBottom: '8px' }}>To comply with legal standards, including court orders and legal procedures</li>
            <li style={{ marginBottom: '8px' }}>To enforce our Terms of Service or other agreements</li>
            <li style={{ marginBottom: '8px' }}>To respond to claims that content violates the rights of third parties</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '32px', marginBottom: '12px', color: 'var(--txt)' }}>
            Ownership and Use of Content
          </h2>
          <p style={{ marginBottom: '16px' }}>
            All content and design elements of this website, including images, logos, and the Prime Casa name, are the exclusive property of Prime Casa. Any unauthorized use or reproduction of any image or logo, including the name, is strictly prohibited without prior written consent from Prime Casa.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '32px', marginBottom: '12px', color: 'var(--txt)' }}>
            Policy Changes
          </h2>
          <p style={{ marginBottom: '16px' }}>
            This Privacy Policy is subject to change, and any updates will be posted here. We recommend periodically reviewing this Privacy Policy to stay informed about how we protect the personal data we collect. These updates are intended to enhance your security and privacy by ensuring transparency in how your data is handled and protected.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '32px', marginBottom: '12px', color: 'var(--txt)' }}>
            Contact Us
          </h2>
          <p style={{ marginBottom: '16px' }}>
            If you have any questions or concerns regarding our Privacy Policy, please contact us:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Email:</strong> hr@theprimecasa.in</li>
            <li style={{ marginBottom: '8px' }}><strong>Phone:</strong> +91 8130504183</li>
            <li style={{ marginBottom: '8px' }}><strong>Address:</strong> Noida, Uttar Pradesh</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;