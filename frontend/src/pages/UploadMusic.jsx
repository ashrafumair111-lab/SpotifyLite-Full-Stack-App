import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicAPI } from '../services/api';
import './ListPages.css';

export default function UploadMusic() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      setError('Please provide both title and file');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('music', file);
      await musicAPI.upload(formData);
      setSuccess('Music uploaded successfully!');
      setTimeout(() => navigate('/music'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h1>Upload Music</h1>
        <p style={{ color: '#a0a0b8', marginBottom: '24px' }}>Share your track with the world</p>

        {error && (
          <div style={{
            padding: '14px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px',
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>⚠️</span> {error}
          </div>
        )}
        {success && (
          <div style={{
            padding: '14px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px',
            background: 'rgba(29,185,84,0.15)', border: '1px solid rgba(29,185,84,0.3)',
            color: '#1db954', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>✓</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#a0a0b8' }}>Track Title</label>
            <input
              type="text" placeholder="Enter track title" value={title} onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '15px' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#a0a0b8' }}>Music File</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '40px',
                textAlign: 'center', cursor: 'pointer', background: file ? 'rgba(29,185,84,0.08)' : 'rgba(255,255,255,0.04)',
              }}
            >
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px', color: '#1db954' }}>♪</span>
              <p style={{ color: '#a0a0b8', fontSize: '14px', marginBottom: '4px' }}>{file ? file.name : 'Click to select a music file'}</p>
              {!file && <p style={{ color: '#1db954', fontSize: '14px', fontWeight: 600 }}>Browse files</p>}
              <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileSelect} style={{ display: 'none' }} />
            </div>
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: '50px', fontSize: '16px',
              fontWeight: 600, background: '#1db954', color: '#000', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Uploading...' : 'Upload Track'}
          </button>
        </form>
      </div>
    </div>
  );
}