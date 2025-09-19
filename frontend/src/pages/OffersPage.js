// src/pages/OffersPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const OffersPage = () => {
  useRevealOnScroll();

  const offers = [
    {
      id: 1,
      title: "Romantic Getaway",
      description: "Enjoy a luxurious stay with champagne and couple's massage",
      price: "$299",
      originalPrice: "$399",
      image: "/images/img-1-1.jpg",
      includes: ["Luxury Room", "Champagne on arrival", "60-minute couple's massage", "Breakfast in bed"]
    },
    {
      id: 2,
      title: "Family Escape",
      description: "Perfect for families with special amenities for children",
      price: "$349",
      originalPrice: "$449",
      image: "/images/img-2-1.jpg",
      includes: ["Family Suite", "Children's activity package", "Complimentary meals for kids under 12", "Late checkout"]
    },
    {
      id: 3,
      title: "Business Traveler",
      description: "Productivity meets comfort with our business package",
      price: "$279",
      originalPrice: "$359",
      image: "/images/img-3-1.jpg",
      includes: ["Executive Room", "Complimentary high-speed WiFi", "Access to business center", "Express breakfast"]
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="offers-hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/img-1-6.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title anim-up">Special Offers</h1>
          <p className="hero-subtitle anim-up d-1">Exclusive packages for unforgettable experiences</p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="offers-grid-section">
        <div className="ll-container">
          <h2 className="section-title anim-up">Current Promotions</h2>
          <p className="section-subtitle anim-up d-1">Take advantage of our limited-time offers</p>
          
          <div className="offers-grid">
            {offers.map((offer, index) => (
              <div key={offer.id} className={`offer-card anim-up d-${index}`}>
                <div className="offer-image">
                  <img src={offer.image} alt={offer.title} />
                  <div className="offer-badge">Save ${parseInt(offer.originalPrice.slice(1)) - parseInt(offer.price.slice(1))}</div>
                </div>
                <div className="offer-content">
                  <h3>{offer.title}</h3>
                  <p className="offer-description">{offer.description}</p>
                  
                  <div className="price-container">
                    <span className="original-price">{offer.originalPrice}</span>
                    <span className="current-price">{offer.price}/night</span>
                  </div>
                  
                  <div className="offer-includes">
                    <h4>Package Includes:</h4>
                    <ul>
                      {offer.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="ll-btn">Book This Offer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="ll-container">
          <div className="newsletter-content anim-up">
            <h2>Stay Informed</h2>
            <p>Subscribe to our newsletter to receive exclusive offers and updates</p>
            
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="ll-input"
                required
              />
              <button type="submit" className="ll-btn">Subscribe</button>
            </form>
            
            <p className="privacy-note">We respect your privacy and will never share your information</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OffersPage;