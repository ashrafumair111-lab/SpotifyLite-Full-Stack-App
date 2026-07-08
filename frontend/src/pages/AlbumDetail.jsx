import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { musicAPI } from '../services/api';
import './ListPages.css';

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  const fetchAlbum = async () => {
    try {
      const response = await musicAPI.getAlbumById(id);
      setAlbum(response.data.album);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch album');
    } finally {
      setLoading(false);
    }
  };

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      setAudioUrl(null);
      setCurrentTrack(null);
    } else {
      setAudioUrl(track.uri);
      setCurrentTrack(track);
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="container">
          <div className="loading-dots"><span /><span /><span /></div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="detail-page">
        <div className="container">
          <h1 style={{ color: '#fff', textAlign: 'center' }}>Album Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="container">
        <div className="detail-header">
          <h1 style={{ color: '#fff' }}>{album.title}</h1>
          <p className="detail-artist">by {album.artist?.name || 'Unknown Artist'}</p>
          <p style={{ color: '#6b6b80', fontSize: '14px' }}>{album.musics?.length || 0} tracks</p>
        </div>

        <div className="tracks-list">
          {album.musics?.map((track, index) => (
            <div
              key={track.id || index}
              className="track-item"
              style={{ animationDelay: `${(index % 5 + 1) * 0.1}s` }}
              onClick={() => playTrack(track)}
            >
              <span className="track-num">{index + 1}</span>
              <div className="track-item-info">
                <h4>{track.title}</h4>
              </div>
              <span className="track-play">{currentTrack?.id === track.id ? '⏹' : '▶'}</span>
            </div>
          ))}
        </div>

        {audioUrl && currentTrack && (
          <div className="player-bar">
            <div className="player-info">
              <div className="player-artwork">♫</div>
              <div>
                <div className="player-title">{currentTrack.title}</div>
                <div className="player-artist">{album.title}</div>
              </div>
            </div>
            <audio controls autoPlay onEnded={() => setAudioUrl(null)}>
              <source src={audioUrl} type="audio/mpeg" />
            </audio>
            <button onClick={() => setAudioUrl(null)} className="btn-icon" style={{ background: '#1db954', color: '#000' }}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
}