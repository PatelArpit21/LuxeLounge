// import React, { useEffect, useMemo, useState } from 'react';
// const slides = [
//   { title: 'Different', span: 'Experience!', img: '/images/slider-1.jpg', alt: 'Slider 1' },
//   { title: 'Explore', span: 'our rooms', img: '/images/slider-2.jpg', alt: 'Slider 2' },
//   { title: 'Prishtina', span: 'Downtown', img: '/images/slider-3.jpg', alt: 'Slider 3' },
// ];
// const Slider = () => {
//   const [index, setIndex] = useState(0);
//   const max = useMemo(() => slides.length, []);
//   useEffect(() => {
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % max);
//     }, 5000);
//     return () => clearInterval(id);
//   }, [max]);
//   return (
//     <div className="slider-wrapper">
//       <div className="slider-inner">
//         <div className="slider">
//           {slides.map((s, i) => (
//             <div key={s.alt} style={{
//               position: 'absolute', inset: 0, transition: 'opacity 800ms ease',
//               opacity: i === index ? 1 : 0,
//             }}
//             >
//               <h2 className="anim-up d-2" style={{ position: 'absolute', zIndex: 2, left: '5%', top: '20%', color: '#fff' }}>{s.title}<br/><span>{s.span}</span></h2>
//               <img className="anim-scale" src={s.img} alt={s.alt} style={{ width: '100%', height: '70vh', objectFit: 'cover', filter: 'brightness(0.7)' }} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="slider-arrows" style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
//         <button aria-label="Previous" className="slider-arrow" onClick={() => setIndex((i) => (i - 1 + max) % max)} style={{ background: 'rgba(0,0,0,0.35)', color: '#fff', borderRadius: '999px', width: 44, height: 44 }}>
//           ‹
//         </button>
//         <button aria-label="Next" className="slider-arrow" onClick={() => setIndex((i) => (i + 1) % max)} style={{ background: 'rgba(0,0,0,0.35)', color: '#fff', borderRadius: '999px', width: 44, height: 44 }}>
//           ›
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Slider;
"use strict";
//# sourceMappingURL=Slider.dev.js.map
