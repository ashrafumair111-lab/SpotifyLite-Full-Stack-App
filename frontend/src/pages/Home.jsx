import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">🎵 Premium Music Streaming</div>
          <h1 className="hero-title">
            Your Music,
            <br />
            <span className="gradient-text">Your Way</span>
          </h1>
          <p className="hero-subtitle">
            Discover, stream, and share your favorite tracks. Experience music like never before.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/music" className="btn btn-gradient btn-lg">
                Explore Music <span className="arrow">→</span>
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-gradient btn-lg">
                  Get Started Free <span className="arrow">→</span>
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="equalizer">
              <span /><span /><span /><span />
              <span /><span /><span /><span />
            </div>
            <div className="now-playing">
              <div className="now-dot" />
              <span>Now Playing</span>
            </div>
            <div className="card-title">SoundWave Premium</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2>Why SoundWave?</h2>
            <p>Everything you need for the ultimate music experience</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '♪', title: 'High Quality Audio', desc: 'Stream in crystal-clear HD audio.', color: 'linear-gradient(135deg,#1db954,#1ed760)' },
              { icon: '♫', title: 'Curated Albums', desc: 'Hand-picked collections from artists.', color: 'linear-gradient(135deg,#4a4aff,#8b5cf6)' },
              { icon: '♩', title: 'Artist Dashboard', desc: 'Upload music and create albums.', color: 'linear-gradient(135deg,#ec4899,#f59e0b)' },
              { icon: '♬', title: 'Secure & Private', desc: 'Protected with enterprise-grade security.', color: 'linear-gradient(135deg,#f59e0b,#1db954)' },
            ].map((f, i) => (
              <div key={i} className="feature-card" style={{ animationDelay: `${(i+1)*0.1}s` }}>
                <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start?</h2>
            <p>Join thousands on SoundWave today.</p>
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn btn-primary btn-lg">
              {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}