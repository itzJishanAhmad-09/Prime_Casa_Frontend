// src/pages/TermsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
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
          Terms of Service
        </h1>
        <p style={{ color: 'var(--txt3)', fontSize: '14px', marginBottom: '32px' }}>
          Last updated: July 2026
        </p>

        <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--txt2)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '16px' }}>
            By using the Prime Casa website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            2. Description of Service
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Prime Casa provides real estate listing services, property information, and related tools to help users find, evaluate, and invest in properties across Noida and Greater Noida. We act as a platform connecting buyers with verified property listings.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            3. User Responsibilities
          </h2>
          <p style={{ marginBottom: '16px' }}>
            As a user of our platform, you agree to:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Provide accurate and truthful information when using our services</li>
            <li style={{ marginBottom: '8px' }}>Not misuse or abuse our platform for fraudulent or illegal purposes</li>
            <li style={{ marginBottom: '8px' }}>Respect the intellectual property rights of Prime Casa and third parties</li>
            <li style={{ marginBottom: '8px' }}>Not upload or transmit any harmful or malicious content</li>
          </ul>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            4. Property Listings and Accuracy
          </h2>
          <p style={{ marginBottom: '16px' }}>
            While we strive to ensure the accuracy of property listings, Prime Casa does not guarantee the completeness, accuracy, or reliability of any property information provided on our platform. All property details are provided for informational purposes and should be independently verified. We recommend consulting with qualified professionals before making any real estate decisions.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            5. Intellectual Property
          </h2>
          <p style={{ marginBottom: '16px' }}>
            All content, including text, graphics, logos, images, and software, is the property of Prime Casa and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without explicit written permission.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            6. Limitation of Liability
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Prime Casa is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or services. This includes, but is not limited to, loss of data, loss of profit, or business interruption. Our total liability is limited to the maximum extent permitted by law.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            7. Third-Party Links
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Our website may contain links to third-party websites. These links are provided for your convenience and do not imply endorsement. Prime Casa has no control over these external sites and is not responsible for their content or privacy practices.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            8. Modifications to Terms
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Prime Casa reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the updated terms.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            9. Governing Law
          </h2>
          <p style={{ marginBottom: '16px' }}>
            These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginTop: '24px', marginBottom: '12px', color: 'var(--txt)' }}>
            10. Contact Information
          </h2>
          <p style={{ marginBottom: '16px' }}>
            If you have any questions about these Terms of Service, please contact us:
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

export default TermsPage;