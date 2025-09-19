// src/pages/AboutPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const AboutPage = () => {
  useRevealOnScroll();

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="about-hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/inside-1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title anim-up">Our Story</h1>
          <p className="hero-subtitle anim-up d-1">A legacy of luxury and exceptional hospitality</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="ll-container">
          <div className="story-grid">
            <div className="story-content anim-up">
              <h2>Welcome to LuxeLounge</h2>
              <p>
                Founded in 2010, LuxeLounge emerged from a simple vision: to create a sanctuary 
                where luxury meets comfort, and every guest feels like royalty. Nestled in the 
                heart of the city, our hotel has become a symbol of elegance and exceptional service.
              </p>
              <p>
                Our journey began with the restoration of a historic building, preserving its 
                architectural beauty while infusing it with modern amenities. Today, we stand as 
                a testament to timeless luxury, where tradition and innovation harmoniously coexist.
              </p>
            </div>
            <div className="story-image anim-up d-1">
              <img src="/images/img-1.jpg" alt="LuxeLounge History" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="ll-container">
          <h2 className="section-title anim-up">Our Values</h2>
          <div className="values-grid">
            <div className="value-item anim-up">
              <div className="value-icon">⭐</div>
              <h3>Excellence</h3>
              <p>We strive for perfection in every detail, ensuring an unparalleled experience for our guests.</p>
            </div>
            <div className="value-item anim-up d-1">
              <div className="value-icon">❤️</div>
              <h3>Hospitality</h3>
              <p>Warm, personalized service is at the heart of everything we do at LuxeLounge.</p>
            </div>
            <div className="value-item anim-up d-2">
              <div className="value-icon">🌿</div>
              <h3>Sustainability</h3>
              <p>We're committed to environmentally responsible practices without compromising on luxury.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="ll-container">
          <h2 className="section-title anim-up">Meet Our Team</h2>
          <p className="section-subtitle anim-up d-1">The passionate individuals behind the LuxeLounge experience</p>
          
          <div className="team-grid">
            <div className="team-member anim-up">
              <img src="/images/profile2.jpeg" alt="General Manager" />
              <h3>Sarah Johnson</h3>
              <p>General Manager</p>
            </div>
            <div className="team-member anim-up d-1">
              <img src="/images/profile1.jpeg" alt="Head Chef" />
              <h3>Michael Chen</h3>
              <p>Executive Chef</p>
            </div>
            <div className="team-member anim-up d-2">
              <img src="/images/profile3.jpeg" alt="Guest Relations" />
              <h3>Emily Rodriguez</h3>
              <p>Guest Relations Manager</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;