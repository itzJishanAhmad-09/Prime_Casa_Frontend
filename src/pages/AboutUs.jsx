// src/pages/AboutUs.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-page">
      <Seo
        title="About Us"
        description="Learn about Prime Casa – our story, core values, leadership team, and commitment to excellence in Noida real estate."
      />

      <section className="about-hero-banner">
        <div className="about-hero-bg"></div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <ul className="about-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>About Us</li>
            </ul>
            <h1 className="about-hero-title">About Us</h1>
          </div>
        </div>
      </section>

      <section className="about-welcome">
        <div className="container">
          <div className="about-welcome-content">
            <h2 className="about-welcome-title">Welcome to Prime Casa Realty Pvt. Ltd.</h2>
            <p className="about-welcome-text">
              Welcome to Prime Casa, a renowned market leader in the industry specializing in the sale of residential and commercial real estate projects. Our industry experience speaks for itself, and we are dedicated to delivering top-notch service and knowledgeable investment guidance to our clients.
            </p>
          </div>
        </div>
      </section>

      <section className="about-details">
        <div className="container">
          <div className="about-details-grid">
            <div className="about-details-images">
              <div className="about-details-img-main">
                <img
                  src="/assets/images/aboutus1.webp"
                  alt="Prime Casa property"
                  loading="lazy"
                  width="600"
                  height="420"
                  onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
                />
              </div>
              <div className="about-details-img-small">
                <img
                  src="/assets/images/aboutus2.webp"
                  alt="Luxury home"
                  loading="lazy"
                  width="280"
                  height="200"
                  onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
                />
              </div>
            </div>

            <div className="about-details-text">
              <span className="about-details-label">About Us</span>
              <h3 className="about-details-title">About Prime Casa Wealth Management</h3>
              <p className="about-details-desc">
                At Prime Casa Wealth Management, we are dedicated to helping individuals, families, and businesses build and preserve wealth for the long term. With a client-first approach and a team of seasoned financial professionals, we provide personalized wealth management solutions tailored to meet your unique goals and financial aspirations.
              </p>
              <p className="about-details-desc">
                Our expertise spans diverse areas, including investment management, retirement planning, real estate planning, tax strategies, and risk management. Whether you are planning for the future, looking to grow your investments, or seeking to protect your legacy, we offer comprehensive strategies to guide you at every stage.
              </p>
              <p className="about-details-desc">
                At Prime Casa Wealth Management, we succeed when you do. Our commitment is to building lasting relationships founded on trust, transparency, and outstanding service.
              </p>
              <p className="about-details-desc">
                Our agency is the industry's top luxury producer with over 10 years of experience in marketing India's most prestigious properties. Choosing the right real estate agency is crucial for a successful and stress-free property transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-leadership">
        <div className="container">
          <div className="about-leadership-header">
            <span className="about-leadership-label">Our Leaders</span>
            <h3 className="about-leadership-title">Leaders Behind the Wheel</h3>
            <p className="about-leadership-desc">
              Leadership is the backbone of any successful organization, and our leaders exemplify vision, dedication, and excellence. With years of experience and a commitment to innovation, they guide us toward growth and success. Each leader in our team brings unique expertise and a deep understanding of our mission. Their strategic thinking and passion for excellence inspire every member of our organization to strive for the best.
            </p>
            <p className="about-leadership-desc">
              Through integrity, hard work, and a people-first approach, our leaders ensure that we continue to grow while maintaining our core values. They believe in teamwork, transparency, and making a lasting impact on our industry and community. Under their leadership, we are not just achieving milestones—we are setting new benchmarks for success.
            </p>
          </div>

          <div className="about-leadership-grid">
            {[
              {
                name: 'MAM',
                role: 'FOUNDER & CEO',
                img: '',
                desc: 'Sachin Gupta is the Founder and CEO of Prime Casa. He has done B.A. in Economics from Delhi University before obtaining his masters in Marketing & Finance from IBS, Hyderabad. Prior to starting his own firm Prime Casa, Sachin has more than 15+ years of experience in leading banking firms including ICICI, HSBC, and Standard Chartered.'
              },
              {
                name: 'ROBIN SINGH',
                role: 'Director',
                img: '/assets/images/Robin_Singh.webp',
                desc: 'With 14 years of experience across Hospitality, Education, and Real Estate, including professional exposure in Singapore, Malaysia, Hong Kong, and India, I bring a global perspective to business, leadership, and client relationships. I focus on building strong relationships, creating opportunities, and delivering results.'
              },
              {
                name: 'Surbhi Khullar',
                role: 'Director',
                img: '/assets/images/Shurbhi_Khullar.webp',
                desc: 'Surbhi Khullar is an MBA in Marketing from Chandigarh University with 5 years of experience in real estate. She combines strong market understanding with expertise in client relationships, negotiation, and team handling to deliver strategic, client-focused solutions in the real estate industry.'
              },
              {
                name: 'SAJAL GUPTA',
                role: 'SENIOR SALES MANAGER',
                img: '/assets/images/Sajal_Gupta.webp',
                desc: 'Sajal Gupta is a  BSc Economics graduate with 4 years of business ownership experience and 3 years in real estate. He combines economic understanding with practical market exposure to deliver strategic, client-focused solutions in business and property.'
              },
              {
                name: 'ABHISHEK GUPTA',
                role: 'ASSISSTANT SALES MANAGER',
                img: '/assets/images/Abhishek_Gupta.webp',
                desc: 'Assistant Sales Manager specialising in commercial and residential real estate across Delhi NCR and Noida. With over 2 years of industry experience and an MBA from Galgotias University, I help clients make informed property decisions while driving sales growth.'
              }
            ].map((member, idx) => (
              <div key={idx} className="about-leadership-card">
                <div className="about-leadership-card-img">
                  <img
                    src={member.img || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23eee"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em" x="100" y="100"%3ENo Image%3C/text%3E%3C/svg%3E'}
                    alt={member.name}
                    loading="lazy"
                    width="200"
                    height="200"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23eee"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em" x="100" y="100"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="about-leadership-card-content">
                  <span className="about-leadership-card-role">{member.role}</span>
                  <h5 className="about-leadership-card-name">{member.name}</h5>
                  <p className="about-leadership-card-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="about-cta-content">
          <div className="section-title">Ready to Begin Your Legacy?</div>
          <div className="section-sub">
            Connect with our executive advisors today to discuss your vision and discover how Prime Casa can turn your dreams into a prestigious address.
          </div>
          <div className="about-cta-buttons">
            <Link to="/" state={{ scrollTo: 'contact' }} className="btn-red">
              Connect With Us
            </Link>
            <Link to="/properties" className="about-cta-outline">
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;