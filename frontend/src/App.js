// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingPage from './pages/BookingPage';
import BookNowPage from './pages/BookNowPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import RestaurantPage from './pages/RestaurantPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/book/:id" element={
        <ProtectedRoute>
          <BookingPage />
        </ProtectedRoute>
      } />
      <Route path="/booking" element={
        <ProtectedRoute>
          <BookNowPage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;