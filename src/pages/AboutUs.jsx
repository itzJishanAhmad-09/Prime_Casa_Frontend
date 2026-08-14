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

      {/* ===== HERO BANNER ===== */}
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

      {/* ===== WELCOME SECTION ===== */}
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

      {/* ===== ABOUT SECTION (Image + Text) ===== */}
      <section className="about-details">
        <div className="container">
          <div className="about-details-grid">
            {/* Left: Image Grid */}
            <div className="about-details-images">
              <div className="about-details-img-main">
                <img
                  src="/assets/images/aboutus1.png"
                  alt="Prime Casa property"
                  loading="lazy"
                />
              </div>
              <div className="about-details-img-small">
                <img
                  src="/assets/images/aboutus2.jpg"
                  alt="Luxury home"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Text Content */}
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

      {/* ===== LEADERSHIP TEAM ===== */}
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
                name: 'JITENDRA KUMAR',
                role: 'FOUNDER & CEO',
                img: '',
                desc: 'Sachin Gupta is the Founder and CEO of Prime Casa. He has done B.A. in Economics from Delhi University before obtaining his masters in Marketing & Finance from IBS, Hyderabad. Prior to starting his own firm Prime Casa, Sachin has more than 15+ years of experience in leading banking firms including ICICI, HSBC, and Standard Chartered.'
              },
              {
                name: 'NARENDRA SINGH',
                role: 'DIRECTOR',
                img: '',
                desc: 'Himanshu is a Management Graduate from S.C.H.M.R.D. Pune. He comes with a rich 20+ years of experience across the Banking and Finance Industry. He has held various leadership roles in Sales & Product Management fields with companies like Godrej Capital, RBL Bank, Barclays Finance & ICICI Bank.'
              },
              {
                name: 'ADITYA SHARMA',
                role: 'DIRECTOR',
                img: '',
                desc: 'Nitin is a graduate in Engineering from IIT Roorkee. He has more than 20+ years of experience in IT Consulting. He has worked with Infosys, Cognizant in US, UK, India & Switzerland. He is also qualified with an Executive management Certification from IIM Bangalore, Diploma Holder in Finance from Brickwork Finance Academy & CFA level 1.'
              },
              {
                name: 'ROBIN SINGH',
                role: 'Director',
                img: '/assets/images/Robin_Singh.jpeg',
                desc: '10+ years in Sales across Hospitality, EdTech & Real Estate. Proven in streamlining operations, driving CX, and building teams across Singapore, Malaysian & Indian markets. Currently aligning strategy to execution for sustainable growth in NCR/Delhi Real Estate.'
              }
            ].map((member, idx) => (
              <div key={idx} className="about-leadership-card">
                <div className="about-leadership-card-img">
                  <img src={member.img} alt={member.name} loading="lazy" />
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

      {/* ===== NEW CTA SECTION ===== */}
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