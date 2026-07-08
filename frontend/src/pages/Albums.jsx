import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { musicAPI } from '../services/api';
import './ListPages.css';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await musicAPI.getAlbums();
      setAlbums(response.data.albums || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch albums');
    } finally {
      setLoading(false);
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
          <h1>Albums</h1>
          <p>Explore curated album collections</p>
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

        {albums.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>♫</span>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff' }}>No Albums Yet</h3>
            <p style={{ color: '#a0a0b8' }}>Create your first album to get started!</p>
          </div>
        ) : (
          <div className="albums-grid">
            {albums.map((album, index) => (
              <Link
                to={`/albums/${album.id}`}
                key={album.id}
                className="album-card"
                style={{ animationDelay: `${(index % 5 + 1) * 0.1}s` }}
              >
                <span style={{ fontSize: '42px', display: 'block', marginBottom: '16px' }}>♫</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{album.title}</h3>
                <p style={{ fontSize: '14px', color: '#a0a0b8', marginBottom: '12px' }}>by {album.artist?.name || 'Unknown Artist'}</p>
                <span style={{ fontSize: '13px', color: '#6b6b80' }}>View Tracks →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}