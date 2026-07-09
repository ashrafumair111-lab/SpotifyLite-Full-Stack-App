import axios from 'axios';

// In production, Vercel has no dev proxy, so point at the deployed backend.
// Set VITE_API_URL in Vercel (e.g. https://<service>.onrender.com/api).
// Falls back to "/api" for local dev (handled by the Vite proxy).
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/loginuser', data),
  logout: () => api.post('/auth/logout'),
};

// Music API
export const musicAPI = {
  getAll: () => api.get('/music'),
  upload: (formData) =>
    api.post('/music/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createAlbum: (data) => api.post('/music/album', data),
  getAlbums: () => api.get('/music/albums'),
  getAlbumById: (id) => api.get(`/music/album/${id}`),
};

export default api;