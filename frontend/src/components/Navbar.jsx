import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">♪</span>
          <span>SoundWave</span>
        </Link>

        <div className="navbar-center">
          <Link to="/">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/music">Music</Link>
              <Link to="/albums">Albums</Link>
              <Link to="/dashboard">Dashboard</Link>
            </>
          )}
        </div>

        <div className="navbar-right">
          {isAuthenticated ? (
            <div className="navbar-user">
              <Link to="/dashboard" className="user-badge">
                <span className="user-avatar">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user?.username}</span>
              </Link>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}