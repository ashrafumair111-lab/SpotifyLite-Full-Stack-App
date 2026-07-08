import axios from 'axios';

const API_BASE = '/api';

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