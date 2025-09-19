import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import RoomsGrid from '../components/RoomsGrid';
import RoomCard from '../components/RoomCard';
import api from '../services/api';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/rooms/');
        setRooms(response.data.slice(0, 3));
      } catch (err) {
        setError('Failed to load rooms. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useRevealOnScroll();
  return (
    <div>
      <Navbar />
      <div className="anim-fade reveal"><Slider /></div>
      
      <div className="anim-up d-2"><RoomsGrid /></div>

      <section className="py-20 bg-slate-50">
        <div className="ll-container">
          <h2 className="text-4xl font-bold text-center text-gray-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Signature Rooms
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && <p>Loading rooms...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;