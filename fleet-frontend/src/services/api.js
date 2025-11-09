import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Make sure backend runs here
});

export const fetchTrucks = () => api.get('/trucks');
export const createTruck = (data) => api.post('/trucks', data);
export const updateTruck = (id, data) => api.put(`/trucks/${id}`, data);
export const deleteTruck = (id) => api.delete(`/trucks/${id}`);
