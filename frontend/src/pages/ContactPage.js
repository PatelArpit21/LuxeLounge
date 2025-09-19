// src/pages/ContactPage.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const ContactPage = () => {
  useRevealOnScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="contact-hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/contact-1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title anim-up">Get In Touch</h1>
          <p className="hero-subtitle anim-up d-1">We're here to assist you with any inquiries</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="ll-container">
          <div className="info-grid">
            <div className="info-item anim-up">
              <div className="info-icon">📍</div>
              <h3>Address</h3>
              <p>123 Luxury Lane</p>
              <p>Ahmedabad, Gujarat 380001</p>
              <p>India</p>
            </div>
            
            <div className="info-item anim-up d-1">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>Reservations: +91 123 456 7890</p>
              <p>Front Desk: +91 123 456 7891</p>
              <p>Emergency: +91 123 456 7899</p>
            </div>
            
            <div className="info-item anim-up d-2">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>Reservations: reservations@luxelounge.com</p>
              <p>General: info@luxelounge.com</p>
              <p>Events: events@luxelounge.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="contact-main">
        <div className="ll-container">
          <div className="contact-grid">
            <div className="map-section anim-up">
              <h2>Find Us</h2>
              <div className="map-container">
                {/* This would be replaced with an actual map embed */}
                <div className="map-placeholder">
                  <img src="/images/hotel.png" alt="Hotel Location" />
                  {/* <p>Interactive map would be displayed here</p> */}
                </div>
              </div>
              
              <div className="business-hours">
                <h3>Business Hours</h3>
                <p>Front Desk: 24/7</p>
                <p>Reservations: 8:00 AM - 10:00 PM</p>
                <p>Restaurant: 7:00 AM - 11:00 PM</p>
              </div>
            </div>
            
            <div className="form-section anim-up d-1">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="ll-input"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="ll-input"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="ll-input"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="ll-input"
                    required
                  />
                </div>
                
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="ll-input"
                  required
                ></textarea>
                
                <button type="submit" className="ll-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;