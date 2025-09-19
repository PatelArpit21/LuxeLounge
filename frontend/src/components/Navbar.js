// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`ll-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="ll-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="brand">LuxeLounge</Link>
        <div className="menu">
          <NavLink to="/rooms">Rooms</NavLink>
          <NavLink to="/restaurant">Restaurant</NavLink>
          <NavLink to="/offers">Offers</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/booking">Book</NavLink>
        </div>
        <div className="menu">
          {!authState.isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link to="/register" className="cta">Sign Up</Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setOpen(!open)} aria-expanded={open} className="ll-account-btn" title="Account">
                <span className="ll-avatar" aria-hidden>
                  { (authState.user?.email && authState.user.email.charAt(0).toUpperCase()) || 'A' }
                </span>
                <span className="ll-account-name">{authState.user?.email?.split('@')[0]}</span>
              </button>
              <div className={`ll-account-dropdown ${open ? 'show' : ''}`} role="menu">
                <Link to="/profile" className="block px-4 py-2">Profile</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;












// import React, { useEffect, useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { authState, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
  
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     onScroll();
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <nav className={`ll-navbar ${scrolled ? 'scrolled' : ''}`}>
//       <div className="ll-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Link to="/" className="brand">LuxeLounge</Link>
//         <div className="menu">
//           <NavLink to="/rooms">Rooms</NavLink>
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/booking">Book</NavLink>
//         </div>
//         <div className="menu">
//           {!authState.isAuthenticated ? (
//             <>
//               <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
//               <Link to="/register" className="cta">Sign Up</Link>
//             </>
//           ) : (
//             <div className="relative">
//               <button onClick={() => setOpen(!open)} aria-expanded={open} className="ll-account-btn" title="Account">
//                 <span className="ll-avatar" aria-hidden>
//                   { (authState.user?.email && authState.user.email.charAt(0).toUpperCase()) || 'A' }
//                 </span>
//                 <span className="ll-account-name">{authState.user?.email?.split('@')[0]}</span>
//               </button>
//               <div className={`ll-account-dropdown ${open ? 'show' : ''}`} role="menu">
//                 <Link to="/profile" className="block px-4 py-2">Profile</Link>
//                 <button onClick={logout} className="w-full text-left px-4 py-2">Logout</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;