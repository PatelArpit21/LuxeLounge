import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-black text-white h-screen flex items-center">
      <div className="absolute inset-0 opacity-50">
        <img src="/images/main.jpg" alt="LuxeLounge Lobby" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 container mx-auto px-6 text-left">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Welcome to LuxeLounge
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Experience an oasis of tranquility and luxury. Your exclusive escape awaits.
          </p>
          <div className="mt-8 flex space-x-4">
            <Link to="/booking" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
              Book a Room
            </Link>
            <Link to="/rooms" className="border border-white hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-md transition-colors">
              View Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;