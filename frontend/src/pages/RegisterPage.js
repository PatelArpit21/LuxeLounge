import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register({ email, password1, password2 });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Registration failed');
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
            <h2 className="auth-visual-title">Welcome to LuxeLounge</h2>
            <p className="auth-visual-sub">Create your account and start booking exclusive rooms.</p>
          </div>
          <div className="ll-card auth-form anim-scale">
            <h1 className="title" style={{ marginBottom: 16 }}>Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="ll-input" required />
              <input value={password1} onChange={(e)=>setPassword1(e.target.value)} type="password" placeholder="Password" className="ll-input" required />
              <input value={password2} onChange={(e)=>setPassword2(e.target.value)} type="password" placeholder="Confirm Password" className="ll-input" required />
              {error && <p className="form-error">{error}</p>}
              <button disabled={loading} className="ll-btn" style={{ width: '100%' }}>{loading ? 'Creating account...' : 'Create Account'}</button>
            </form>
            <p style={{ marginTop: 12, color: '#b9c0c4' }}>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RegisterPage;