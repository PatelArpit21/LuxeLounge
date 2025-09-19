import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  useRevealOnScroll();
  return (
    <div>
      <Navbar />
      <section className="ll-page auth-page">
        <div className="ll-container auth-grid">
          <div className="auth-visual anim-scale">
            <h2 className="auth-visual-title">Welcome back</h2>
            <p className="auth-visual-sub">Sign in to manage your bookings and profile.</p>
          </div>
          <div className="ll-card auth-form anim-scale">
            <h1 className="title" style={{ marginBottom: 16 }}>Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="ll-input" required />
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="ll-input" required />
              {error && <p className="form-error">{error}</p>}
              <button disabled={loading} className="ll-btn" style={{ width: '100%' }}>{loading ? 'Signing in...' : 'Login'}</button>
            </form>
            <p style={{ marginTop: 12, color: '#b9c0c4' }}>No account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;