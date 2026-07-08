import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 60px',
      background: '#0a0a0f',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#12121a',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '40px',
        animation: 'fadeIn 0.5s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '20px', fontWeight: 700, color: '#fff',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '28px', color: '#1db954' }}>♪</span>
            SoundWave
          </Link>
          <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: '#a0a0b8', fontSize: '15px' }}>Sign in to continue your journey</p>
        </div>

        {error && (
          <div style={{
            padding: '14px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px',
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#a0a0b8' }}>
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff',
                fontSize: '15px', transition: 'all 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#1db954'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#a0a0b8' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff',
                fontSize: '15px', transition: 'all 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#1db954'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: '50px', fontSize: '16px',
              fontWeight: 600, background: '#1db954', color: '#000', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s ease', marginTop: '4px',
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.background = '#1ed760'; }}
            onMouseLeave={(e) => { if (!loading) e.target.style.background = '#1db954'; }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#a0a0b8', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#1db954', fontWeight: 600 }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}