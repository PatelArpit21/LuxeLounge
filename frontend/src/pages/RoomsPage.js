// src/pages/RoomsPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import RoomFilter from '../components/RoomFilter';
import api from '../services/api';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    roomType: 'all'
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/rooms/');
        const roomsData = res.data || [];
        setRooms(roomsData);
        setFilteredRooms(roomsData);
        
        // Set max price based on room rates
        if (roomsData.length > 0) {
          const maxRoomPrice = Math.max(...roomsData.map(room => room.rate_per_night));
          setFilters(prev => ({
            ...prev,
            maxPrice: Math.ceil(maxRoomPrice)
          }));
        }
      } catch (err) {
        setError('Failed to load rooms.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    const filtered = rooms.filter(room => {
      const matchesPrice = room.rate_per_night >= filters.minPrice && 
                          room.rate_per_night <= filters.maxPrice;
      const matchesType = filters.roomType === 'all' || 
                         room.room_type.toLowerCase().includes(filters.roomType.toLowerCase());
      
      return matchesPrice && matchesType;
    });
    
    setFilteredRooms(filtered);
  }, [filters, rooms]);

  useRevealOnScroll();

  return (
    <div className="rooms-page">
      <Navbar />
      
      {/* Hero Section with inline background image */}
      <section 
        className="rooms-hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/main.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title anim-up">Our Luxurious Accommodations</h1>
          <p className="hero-subtitle anim-up d-1">Experience unparalleled comfort and elegance in our carefully curated rooms</p>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      <section className="filter-section">
        <div className="ll-container">
          <RoomFilter filters={filters} setFilters={setFilters} />
        </div>
      </section>

      <section className="rooms-grid-section">
        <div className="ll-container">
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading our luxurious rooms...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <>
              <div className="results-header">
                <h2 className="results-title">
                  {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Available
                </h2>
                <p className="results-subtitle">
                  Discover your perfect retreat
                </p>
              </div>
              
              {filteredRooms.length === 0 ? (
                <div className="no-rooms">
                  <h3>No rooms match your filters</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="rooms-grid">
                  {filteredRooms.map((room, index) => (
                    <RoomCard 
                      key={room.id} 
                      room={room} 
                      className="anim-up" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RoomsPage;


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import RoomCard from '../components/RoomCard';
// import api from '../services/api';
// import useRevealOnScroll from '../hooks/useRevealOnScroll';

// const RoomsPage = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get('/rooms/');
//         setRooms(res.data || []);
//       } catch (err) {
//         setError('Failed to load rooms.');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   useRevealOnScroll();
//   return (
//     <div>
//       <Navbar />
//       <section className="ll-page" style={{ paddingBottom: 56 }}>
//         <div className="ll-container">
//           <h1 className="title anim-up">Explore Our Rooms</h1>
//           <div className="room-grid" style={{ marginTop: 24 }}>
//             {loading && <p className="anim-fade">Loading rooms...</p>}
//             {error && <p className="anim-fade" style={{ color: '#f87171' }}>{error}</p>}
//             {rooms.map((room) => (
//               <div key={room.id} className="anim-up d-1">
//                 <RoomCard room={room} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default RoomsPage;