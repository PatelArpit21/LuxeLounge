// src/components/RoomsGrid.js
import React from 'react';
import { Link } from 'react-router-dom';

const roomImages = [
  { src: '/images/ximg-tile.jpg.pagespeed.ic.tlV_7G7r4h.jpg', title: 'Cityscape Loft ' },
  { src: '/images/ximg-tile-1.jpg.pagespeed.ic.jb7yPH-7i0.jpg', title: 'Deluxe Queen Room' },
  { src: '/images/ximg-tile-4.jpg.pagespeed.ic.XLPMM7eK3j.jpg', title: 'Executive King Suite' },
  { src: '/images/ximg-tile-3.jpg.pagespeed.ic.u7USdE2zss.jpg', title: 'Family Garden Bungalow' },
  { src: '/images/ximg-tile-2.jpg.pagespeed.ic.uFpGar_DeQ.jpg', title: 'Luxury Suite' },
  { src: '/images/ximg-tile-5.jpg.pagespeed.ic.8ky8-UleJE.jpg', title: 'Ocean View Penthouse' },
  { src: '/images/ximg-tile-6.jpg.pagespeed.ic.gNYYA_Ez9c.jpg', title: 'Standard Twin Room' },
  { src: '/images/ximg-tile-7.jpg.pagespeed.ic.0oN_-g2yBN.jpg', title: 'Suite' },
];

const RoomsGrid = () => {
  return (
    <section className="content-room">
      <div className="ll-container">
        <h1 className="title anim-up">Our Rooms</h1>
        <p className="subtitle anim-up" style={{ textAlign: 'center', marginBottom: '40px', color: '#666' }}>
          Discover our carefully curated selection of luxurious accommodations
        </p>
        <div className="room-grid">
          {roomImages.map((img, index) => (
            <Link key={img.title} to="/rooms" className="room-item anim-up" style={{ textDecoration: 'none', color: 'inherit', animationDelay: `${index * 0.1}s` }}>
              <img src={img.src} alt={img.title} />
              <div className="room-overlay-text">
                {/* <h5 className="text-effect">Premium Room</h5> */}
                <h2 className="text-effect" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{img.title}</h2>
                {/* <button className="discover-btn">Discover</button> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsGrid;





// import React from 'react';
// import { Link } from 'react-router-dom';

// const images = [
//   { src: '/images/img-tile.jpg', title: 'Aloe Vera Room' },
//   { src: '/images/img-tile-1.jpg', title: 'Sanseveria Room' },
//   { src: '/images/img-tile-4.jpg', title: 'Lavandula Room' },
//   { src: '/images/img-tile-3.jpg', title: 'Cactus Room' },
//   { src: '/images/img-tile-2.jpg', title: 'Guzmania Room' },
//   { src: '/images/img-tile-5.jpg', title: 'Bonsai Room' },
//   { src: '/images/img-tile-6.jpg', title: 'Dypsis Room' },
//   { src: '/images/img-tile-7.jpg', title: 'Lucky Bamboo Room' },
// ];

// const RoomsGrid = () => {
//   return (
//     <section className="content-room">
//       <div className="ll-container">
//         <h1 className="title anim-up">Rooms</h1>
//         <div className="room-grid">
//           {images.map((img) => (
//             <Link key={img.title} to="/rooms" className="room-item anim-up d-1" style={{ textDecoration: 'none', color: 'inherit' }}>
//               <img src={img.src} alt={img.title} />
//               <h5 className="text-effect">City View</h5>
//               <h2 className="text-effect" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{img.title}</h2>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RoomsGrid;