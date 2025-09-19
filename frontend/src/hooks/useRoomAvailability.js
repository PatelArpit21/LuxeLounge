// src/hooks/useRoomAvailability.js
import { useState } from 'react';
import api from '../services/api';

const useRoomAvailability = () => {
  const [availability, setAvailability] = useState({
    isAvailable: true,
    availableRooms: 0,
    message: '',
    loading: false,
    error: null
  });

  const checkAvailability = async (roomId, checkIn, checkOut) => {
    if (!roomId || !checkIn || !checkOut) {
      setAvailability({
        isAvailable: false,
        availableRooms: 0,
        message: 'Please select room and dates',
        loading: false,
        error: null
      });
      return;
    }

    setAvailability(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await api.post('/bookings/check_availability/', {
        room: roomId,
        check_in: checkIn,
        check_out: checkOut
      });

      setAvailability({
        isAvailable: response.data.is_available,
        availableRooms: response.data.available_rooms,
        message: response.data.message,
        loading: false,
        error: null
      });

      return response.data.is_available;
    } catch (error) {
      const errorMsg = error.message || 'Failed to check availability';
      setAvailability({
        isAvailable: false,
        availableRooms: 0,
        message: errorMsg,
        loading: false,
        error: errorMsg
      });
      return false;
    }
  };

  const resetAvailability = () => {
    setAvailability({
      isAvailable: true,
      availableRooms: 0,
      message: '',
      loading: false,
      error: null
    });
  };

  return { availability, checkAvailability, resetAvailability };
};

export default useRoomAvailability;