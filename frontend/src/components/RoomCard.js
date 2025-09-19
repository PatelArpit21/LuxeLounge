// src/components/RoomCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room, className = '', style }) => {
  // Map room types to specific images
  const roomImageMap = {
    'suite': '/images/img-1.jpg',
    'deluxe': '/images/img-2.jpg',
    'standard': '/images/img-3.jpg',
    'executive': '/images/img-4.jpg',
    'premium': '/images/img-5.jpg',
    'luxury': '/images/img-6.jpg',
    'aloevera': '/images/ximg-tile.jpg.pagespeed.ic.tlV_7G7r4h.jpg',
    'sanseveria': '/images/ximg-tile-1.jpg.pagespeed.ic.jb7yPH-7i0.jpg',
    'lavandula': '/images/ximg-tile-4.jpg.pagespeed.ic.XLPMM7eK3j.jpg',
    'cactus': '/images/ximg-tile-3.jpg.pagespeed.ic.u7USdE2zss.jpg',
    'guzmania': '/images/ximg-tile-2.jpg.pagespeed.ic.uFpGar_DeQ.jpg',
    'bonsai': '/images/ximg-tile-5.jpg.pagespeed.ic.8ky8-UleJE.jpg',
    'dypsis': '/images/ximg-tile-6.jpg.pagespeed.ic.gNYYA_Ez9c.jpg',
    'bamboo': '/images/ximg-tile-7.jpg.pagespeed.ic.0oN_-g2yBN.jpg'
  };
  
  const getRoomImage = () => {
    const roomType = room.room_type.toLowerCase();
    
    // Check for specific room type matches
    for (const [key, value] of Object.entries(roomImageMap)) {
      if (roomType.includes(key)) {
        return value;
      }
    }
    
    // Default images based on room type
    if (roomType.includes('suite') || roomType.includes('executive') || roomType.includes('premium')) {
      return '/images/img-1.jpg';
    } else if (roomType.includes('deluxe')) {
      return '/images/img-2.jpg';
    } else {
      // Return a random room image for other types
      const defaultImages = [
        '/images/img-3.jpg',
        '/images/img-4.jpg',
        '/images/img-5.jpg',
        '/images/img-6.jpg'
      ];
      return defaultImages[Math.floor(Math.random() * defaultImages.length)];
    }
  };

  return (
    <div className={`room-card ${className}`} style={style}>
      <div className="room-card-inner">
        <div className="room-image">
          <img src={getRoomImage()} alt={room.room_type} />
          <div className="room-overlay">
            <div className="room-price">
              ${Number(room.rate_per_night).toFixed(2)} <span>/ night</span>
            </div>
          </div>
        </div>
        
        <div className="room-content">
          <h3 className="room-type">{room.room_type}</h3>
          <p className="room-description">{room.description || 'Experience luxury and comfort in our beautifully appointed room.'}</p>
          
          <div className="room-features">
            <div className="feature">
              <span className="icon">🛏️</span>
              <span>King Bed</span>
            </div>
            <div className="feature">
              <span className="icon">🚿</span>
              <span>Luxury Bath</span>
            </div>
            <div className="feature">
              <span className="icon">📶</span>
              <span>Free WiFi</span>
            </div>
          </div>
          
          <div className="room-actions">
            <Link to={`/book/${room.id}`} className="book-button">
              Book Now
            </Link>
            <button className="details-button">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;



// import React from 'react';
// import { Link } from 'react-router-dom';

// const RoomCard = ({ room }) => {
//   return (
//     <div className="bg-white shadow overflow-hidden hover-lift">
//       <div className="p-6">
//         <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{room.room_type}</h3>
//         <p className="mt-2 text-gray-600">{room.description}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-purple-700 font-bold">${Number(room.rate_per_night).toFixed(2)} / night</span>
//           <Link to={`/book/${room.id}`} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
//             Book
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomCard;