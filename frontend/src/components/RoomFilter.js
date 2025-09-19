// src/components/RoomFilter.js
import React from 'react';

const RoomFilter = ({ filters, setFilters }) => {
  const roomTypes = ['all', 'suite', 'deluxe', 'standard', 'executive', 'premium'];
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="room-filter anim-scale">
      <div className="filter-header">
        <h3>Filter Rooms</h3>
        <p>Find your perfect accommodation</p>
      </div>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label>Price Range</label>
          <div className="price-range">
            <span>${filters.minPrice}</span>
            <input
              type="range"
              min="0"
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
              className="price-slider"
            />
            <span>${filters.maxPrice}</span>
          </div>
        </div>
        
        <div className="filter-group">
          <label>Room Type</label>
          <div className="type-buttons">
            {roomTypes.map(type => (
              <button
                key={type}
                className={filters.roomType === type ? 'active' : ''}
                onClick={() => handleFilterChange('roomType', type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;