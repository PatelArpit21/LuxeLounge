import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="ll-footer">
      <div className="ll-container">
        <div className="columns">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>LuxeLounge</h3>
            <p className="text-gray-400">An oasis of tranquility and luxury.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul>
              <li><Link to="/rooms" className="text-gray-400 hover:text-white">Rooms</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-white">Book Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">123 Luxury Lane, Ahmedabad, India</p>
            <p className="text-gray-400">contact@luxelounge.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/PatelArpit21" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .5C5.73.5.84 5.4.84 11.66c0 4.86 3.16 8.98 7.55 10.44.55.10.75-.24.75-.53v-1.86c-3.07.67-3.72-1.48-3.72-1.48-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.1.08 1.68 1.14 1.68 1.14.97 1.67 2.54 1.19 3.16.91.10-.71.38-1.19.69-1.46-2.45-.28-5.03-1.23-5.03-5.47 0-1.21.43-2.20 1.13-2.98-.11-.28-.49-1.40.11-2.93 0 0 .92-.29 3 .11.87-.24 1.80-.36 2.73-.36.93 0 1.86.12 2.73.36 2.08-.40 3-.11 3-.11.60 1.53.22 2.65.11 2.93.70.78 1.13 1.77 1.13 2.98 0 4.24-2.59 5.19-5.05 5.47.39.34.73 1.02.73 2.06v3.05c0 .29.20.64.76.53 4.39-1.46 7.55-5.58 7.55-10.44C23.16 5.4 18.27.5 12 .5z" fill="currentColor"/></svg>
              </a>
              <a href="https://instagram.com/patel_arpit_3076" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/arpit-r-patel/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02C6.08 7.46 7 6.58 7 5.48 7 4.38 6.08 3.5 4.98 3.5z" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M3 9h4v11H3z" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M9 9h4v1.6c.6-1 2-2 4-2 4 0 4.5 2.6 4.5 6V20h-4v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V20h-4V9z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          &copy; 2025 LuxeLounge. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;