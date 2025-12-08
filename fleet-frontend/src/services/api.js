// frontend/service/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// API functions with backend switch: 'mongo' or 'mysql'
export const fetchTrucks = (backend = 'mongo') => api.get(`/trucks-${backend}`);
export const createTruck = (data, backend = 'mongo') => api.post(`/trucks-${backend}`, data);
export const updateTruck = (id, data, backend = 'mongo') => api.put(`/trucks-${backend}/${id}`, data);
export const deleteTruck = (id, backend = 'mongo') => api.delete(`/trucks-${backend}/${id}`);
