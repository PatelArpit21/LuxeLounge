// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/rooms/${id}/`);
        setRoom(res.data);
      } catch (e) {
        setError('Failed to load room');
      }
    })();
  }, [id]);

  // Check room availability
  const checkAvailability = async () => {
    try {
      const response = await api.post('/bookings/check_availability/', {
        room: Number(id),
        check_in: checkIn,
        check_out: checkOut
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to check availability');
    }
  };

  // Validate dates before submission
  const validateDates = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
    
    if (checkInDate < todayDate) {
      setError('Check-in date cannot be in the past');
      return false;
    }
    
    if (checkOutDate <= checkInDate) {
      setError('Check-out date must be after check-in date');
      return false;
    }
    
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    
    if (!validateDates()) {
      setLoading(false);
      return;
    }
    
    try {
      // First check availability
      const availability = await checkAvailability();
      
      if (!availability.is_available) {
        setError(availability.message || 'Selected room is not available for the chosen dates');
        setLoading(false);
        return;
      }
      
      // If available, proceed with booking
      await api.post('/bookings/', {
        room: Number(id),
        check_in: checkIn,
        check_out: checkOut,
        adults: Number(adults),
        children: Number(children),
      });
      setMessage('Booking successful!');
      setTimeout(() => navigate('/profile'), 800);
    } catch (e) {
      setError(e.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  }

  useRevealOnScroll();
  return (
    <div>
      <Navbar />
      <section className="ll-page">
        <div className="ll-container" style={{ maxWidth: 720 }}>
          <h1 className="title anim-up">Book Room</h1>
          {room && <p className="anim-fade" style={{ color: '#b9c0c4' }}>{room.room_type} — ${Number(room.rate_per_night).toFixed(2)} / night</p>}
          <form onSubmit={handleSubmit} className="ll-card anim-scale" style={{ marginTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Check-in</label>
                <input 
                  type="date" 
                  value={checkIn} 
                  onChange={(e)=>setCheckIn(e.target.value)} 
                  className="ll-input" 
                  min={today}
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Check-out</label>
                <input 
                  type="date" 
                  value={checkOut} 
                  onChange={(e)=>setCheckOut(e.target.value)} 
                  className="ll-input" 
                  min={checkIn || today}
                  required 
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Adults</label>
                <input type="number" min="1" value={adults} onChange={(e)=>setAdults(e.target.value)} className="ll-input" placeholder="Adults" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Children</label>
                <input type="number" min="0" value={children} onChange={(e)=>setChildren(e.target.value)} className="ll-input" placeholder="Children" />
              </div>
            </div>
            {message && <p style={{ color: '#34d399', marginTop: 12 }}>{message}</p>}
            {error && <p style={{ color: '#f87171', marginTop: 12 }}>{error}</p>}
            <button 
              className="ll-btn" 
              style={{ marginTop: 14 }}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookingPage;