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
"use strict";
//# sourceMappingURL=RoomsPage.dev.js.map
