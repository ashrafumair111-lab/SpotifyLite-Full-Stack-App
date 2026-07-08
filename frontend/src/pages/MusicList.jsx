import { useState, useEffect } from 'react';
import { musicAPI } from '../services/api';
import './ListPages.css';

export default function MusicList() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    fetchMusics();
  }, []);

  const fetchMusics = async () => {
    try {
      const response = await musicAPI.getAll();
      setMusics(response.data.musics || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch music');
    } finally {
      setLoading(false);
    }
  };

  const playTrack = (music) => {
    if (currentTrack?.id === music.id) {
      setAudioUrl(null);
      setCurrentTrack(null);
    } else {
      setAudioUrl(music.uri);
      setCurrentTrack(music);
    }
  };

  if (loading) {
    return (
      <div className="list-page">
        <div className="container">
          <div className="loading-dots"><span /><span /><span /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-page">
      <div className="container">
        <div className="list-header">
          <h1>Browse Music</h1>
          <p>Discover all available tracks</p>
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

        {musics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>♪</span>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff' }}>No Music Yet</h3>
            <p style={{ color: '#a0a0b8' }}>Upload your first track to get started!</p>
          </div>
        ) : (
          <div className="music-grid">
            {musics.map((music, index) => (
              <div
                key={music.id || index}
                className="music-card"
                style={{ animationDelay: `${(index % 5 + 1) * 0.1}s` }}
                onClick={() => playTrack(music)}
              >
                <div className="music-thumb">
                  <span>♪</span>
                  {currentTrack?.id === music.id ? (
                    <div className="playing-indicator">
                      <span /><span /><span />
                    </div>
                  ) : (
                    <div className="play-btn">▶</div>
                  )}
                </div>
                <div className="music-info">
                  <h3>{music.title}</h3>
                  <p>{music.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {audioUrl && currentTrack && (
          <div className="player-bar">
            <div className="player-info">
              <div className="player-artwork">♪</div>
              <div>
                <div className="player-title">{currentTrack.title}</div>
                <div className="player-artist">{currentTrack.artist}</div>
              </div>
            </div>
            <audio controls autoPlay onEnded={() => setAudioUrl(null)}>
              <source src={audioUrl} type="audio/mpeg" />
            </audio>
            <button onClick={() => setAudioUrl(null)} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#1db954', border: 'none', color: '#000', cursor: 'pointer',
            }}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
}