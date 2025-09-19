import React from 'react';

const BookingDetailsModal = ({ booking, user, onClose, onDownloadReceipt }) => {
  // Calculate number of nights
  const calculateNights = () => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Booking Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="booking-details-grid">
            <div className="detail-group">
              <h3>Guest Information</h3>
              <p><strong>Name:</strong> {user.email.split('@')[0]}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            
            <div className="detail-group">
              <h3>Booking Information</h3>
              <p><strong>Booking ID:</strong> #{booking.id}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${booking.status.toLowerCase()}`}>{booking.status}</span></p>
              <p><strong>Room Type:</strong> {booking.room_type}</p>
            </div>
            
            <div className="detail-group">
              <h3>Stay Details</h3>
              <p><strong>Check-in:</strong> {booking.check_in}</p>
              <p><strong>Check-out:</strong> {booking.check_out}</p>
              <p><strong>Nights:</strong> {nights}</p>
              <p><strong>Guests:</strong> {booking.adults} Adult(s), {booking.children} Child(ren)</p>
            </div>
            
            <div className="detail-group">
              <h3>Payment Information</h3>
              <p><strong>Rate per night:</strong> ${(booking.total_amount / nights).toFixed(2)}</p>
              <p><strong>Total amount:</strong> ${Number(booking.total_amount || 0).toFixed(2)}</p>
              <p><strong>Booking date:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="ll-btn bg-gray-600 hover:bg-gray-700"
            onClick={() => onDownloadReceipt(booking)}
          >
            Download Receipt
          </button>
          <button className="ll-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;