import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicAPI } from '../services/api';
import './ListPages.css';

export default function CreateAlbum() {
  const [title, setTitle] = useState('');
  const [musics, setMusics] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    musicAPI.getAll().then(res => setMusics(res.data.musics || [])).finally(() => setFetching(false));
  }, []);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return setError('Title required');
    setLoading(true);
    try {
      await musicAPI.createAlbum({ title, musicsid: selected });
      navigate('/albums');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create album');
    } finally { setLoading(false); }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h1>Create Album</h1>
        <p style={{ color: '#a0a0b8', marginBottom: '24px' }}>Organize your tracks into an album</p>

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
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#a0a0b8' }}>Album Title</label>
            <input
              type="text" placeholder="Enter album title" value={title} onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#a0a0b8' }}>Select Tracks</label>
            {fetching ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#a0a0b8' }}>Loading tracks...</div>
            ) : musics.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#a0a0b8' }}>No tracks available. Upload music first.</div>
            ) : (
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {musics.map(music => (
                  <label key={music.id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                    background: selected.includes(music.id) ? 'rgba(29,185,84,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selected.includes(music.id) ? 'rgba(29,185,84,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}>
                    <input type="checkbox" checked={selected.includes(music.id)} onChange={() => toggle(music.id)} style={{ accentColor: '#1db954', width: '16px', height: '16px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{music.title}</div>
                      <div style={{ fontSize: '12px', color: '#a0a0b8' }}>{music.artist}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading || selected.length === 0}
            style={{ width: '100%', padding: '14px', borderRadius: '50px', fontSize: '16px', fontWeight: 600, background: '#1db954', color: '#000', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Creating...' : 'Create Album'}
          </button>
        </form>
      </div>
    </div>
  );
}