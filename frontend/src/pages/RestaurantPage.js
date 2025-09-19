// src/pages/RestaurantPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const RestaurantPage = () => {
  useRevealOnScroll();

  const menuItems = [
    {
      category: "Starters",
      items: [
        { name: "Truffle Arancini", description: "Crispy risotto balls with black truffle and parmesan", price: "$16" },
        { name: "Seared Scallops", description: "With cauliflower purée and caviar", price: "$24" },
        { name: "Beef Tartare", description: "Hand-cut beef with quail egg and capers", price: "$22" }
      ]
    },
    {
      category: "Main Courses",
      items: [
        { name: "Filet Mignon", description: "8oz grass-fed beef with red wine reduction", price: "$42" },
        { name: "Lobster Thermidor", description: "Maine lobster with brandy cream sauce", price: "$48" },
        { name: "Wild Mushroom Risotto", description: "Arborio rice with seasonal wild mushrooms", price: "$28" }
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Chocolate Soufflé", description: "With vanilla bean ice cream", price: "$14" },
        { name: "Crème Brûlée", description: "Classic vanilla with caramelized sugar", price: "$12" },
        { name: "Seasonal Fruit Tart", description: "With crème pâtissière", price: "$13" }
      ]
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="restaurant-hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/restaurant-1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title anim-up">The Luxe Dining Experience</h1>
          <p className="hero-subtitle anim-up d-1">Where culinary artistry meets exceptional ambiance</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="restaurant-intro">
        <div className="ll-container">
          <div className="intro-grid">
            <div className="intro-content anim-up">
              <h2>Epicurean Excellence</h2>
              <p>
                Our award-winning restaurant offers a sophisticated dining experience that 
                celebrates local ingredients with global inspiration. Under the guidance of 
                Executive Chef Michael Chen, our culinary team creates dishes that are both 
                visually stunning and exceptionally flavorful.
              </p>
              <p>
                We source the finest ingredients from local farmers and producers, ensuring 
                that every dish tells a story of quality, sustainability, and passion for 
                exceptional cuisine.
              </p>
            </div>
            <div className="intro-image anim-up d-1">
              <img src="/images/restaurant-2.jpg" alt="Restaurant Interior" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="restaurant-menu">
        <div className="ll-container">
          <h2 className="section-title anim-up">Signature Menu</h2>
          <p className="section-subtitle anim-up d-1">A culinary journey of exquisite flavors</p>
          
          <div className="menu-categories">
            {menuItems.map((category, index) => (
              <div key={index} className={`menu-category anim-up d-${index}`}>
                <h3>{category.category}</h3>
                <div className="menu-items">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="menu-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <span className="item-price">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="restaurant-gallery">
        <div className="ll-container">
          <h2 className="section-title anim-up">Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item anim-up">
              <img src="/images/restaurant-3.jpg" alt="Dining Area" />
            </div>
            <div className="gallery-item anim-up d-1">
              <img src="/images/restaurant-4.jpg" alt="Cuisine Presentation" />
            </div>
            <div className="gallery-item anim-up d-2">
              <img src="/images/restaurant-small-1.jpg" alt="Chef Preparation" />
            </div>
            <div className="gallery-item anim-up d-3">
              <img src="/images/restaurant-small-2.jpg" alt="Dessert Selection" />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="reservation-cta">
        <div className="ll-container">
          <div className="cta-content anim-up">
            <h2>Reserve Your Table</h2>
            <p>Experience our exceptional cuisine in an elegant setting</p>
            <button className="ll-btn">Make Reservation</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RestaurantPage;