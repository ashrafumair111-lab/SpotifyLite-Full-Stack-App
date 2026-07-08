import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo-icon">♪</span>
            <span className="footer-logo-text">SoundWave</span>
            <p className="footer-desc">Experience the rhythm of life with our premium music streaming platform.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="/music">Music</a>
              <a href="/albums">Albums</a>
              <a href="/dashboard">Dashboard</a>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <a href="/login">Sign In</a>
              <a href="/register">Register</a>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="#">GitHub</a>
              <a href="#">Twitter</a>
              <a href="#">Discord</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SoundWave. All rights reserved.</p>
          <div className="footer-social">
            <span className="social-icon">𝕏</span>
            <span className="social-icon">▶</span>
            <span className="social-icon">●</span>
          </div>
        </div>
      </div>
    </footer>
  );
}