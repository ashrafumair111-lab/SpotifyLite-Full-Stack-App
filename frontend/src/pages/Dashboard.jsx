import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const isArtist = user?.role === 'artist';

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <p>{isArtist ? 'Manage your music and albums' : 'Discover new music'}</p>
      </div>

      {/* Cards */}
      <div className="cards-grid">
        <Link to="/music" className="dashboard-card">
          <span className="card-icon" style={{ background: 'linear-gradient(135deg,#1db954,#1ed760)' }}>♪</span>
          <h3>Browse Music</h3>
          <p>Find and stream your favorite tracks</p>
        </Link>

        <Link to="/albums" className="dashboard-card">
          <span className="card-icon" style={{ background: 'linear-gradient(135deg,#4a4aff,#8b5cf6)' }}>♫</span>
          <h3>View Albums</h3>
          <p>Explore curated album collections</p>
        </Link>

        {isArtist && (
          <>
            <Link to="/upload" className="dashboard-card">
              <span className="card-icon" style={{ background: 'linear-gradient(135deg,#ec4899,#f59e0b)' }}>♩</span>
              <h3>Upload Music</h3>
              <p>Share your tracks with the world</p>
            </Link>
            <Link to="/create-album" className="dashboard-card">
              <span className="card-icon" style={{ background: 'linear-gradient(135deg,#f59e0b,#1db954)' }}>♬</span>
              <h3>Create Album</h3>
              <p>Organize your music into albums</p>
            </Link>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">∞</span>
          <span className="stat-label">Tracks Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">∞</span>
          <span className="stat-label">Albums</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{isArtist ? 'Artist' : 'Listener'}</span>
          <span className="stat-label">Account Type</span>
        </div>
      </div>
    </div>
  );
}