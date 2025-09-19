// src/pages/BookNowPage.js
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const BookNowPage = () => {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  useRevealOnScroll();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/rooms/');
        setRooms(res.data || []);
      } catch (e) {
        setError('Failed to load rooms.');
      }
    })();
  }, []);

  // Check room availability
  const checkAvailability = async () => {
    try {
      const response = await api.post('/bookings/check_availability/', {
        room: Number(roomId),
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

  async function submitBooking(e) {
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
        room: Number(roomId),
        check_in: checkIn,
        check_out: checkOut,
        adults: Number(adults),
        children: Number(children),
        notes,
      });
      setMessage('Booking successful!');
    } catch (e) {
      setError(e.message || 'Booking failed. Please check your inputs or login status.');
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = useMemo(() => roomId && checkIn && checkOut, [roomId, checkIn, checkOut]);

  return (
    <div>
      <Navbar />
      <section className="ll-page">
        <div className="ll-container" style={{ maxWidth: 780 }}>
          <h1 className="title anim-up">Book a Room</h1>
          <form className="ll-card anim-scale" onSubmit={submitBooking}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Room</label>
                <select className="ll-input" value={roomId} onChange={(e)=>setRoomId(e.target.value)} required>
                  <option value="">Select a room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>{r.room_type} — ${Number(r.rate_per_night).toFixed(2)}/night</option>
                  ))}
                </select>
              </div>
              <div />
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Check-in</label>
                <input 
                  className="ll-input" 
                  type="date" 
                  value={checkIn} 
                  onChange={(e)=>setCheckIn(e.target.value)} 
                  min={today}
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Check-out</label>
                <input 
                  className="ll-input" 
                  type="date" 
                  value={checkOut} 
                  onChange={(e)=>setCheckOut(e.target.value)} 
                  min={checkIn || today}
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Adults</label>
                <input className="ll-input" type="number" min="1" value={adults} onChange={(e)=>setAdults(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Children</label>
                <input className="ll-input" type="number" min="0" value={children} onChange={(e)=>setChildren(e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: 6 }}>Notes</label>
                <textarea className="ll-input" rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any special requests" />
              </div>
            </div>
            {message && <p style={{ color: '#34d399', marginTop: 12 }}>{message}</p>}
            {error && <p style={{ color: '#f87171', marginTop: 12 }}>{error}</p>}
            <button className="ll-btn" disabled={!canSubmit || loading} style={{ marginTop: 16 }}>
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookNowPage;