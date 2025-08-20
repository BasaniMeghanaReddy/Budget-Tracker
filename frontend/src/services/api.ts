import axios from 'axios';
import { Transaction } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  create: (data: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => 
    api.post('/transactions', data),
  update: (id: number, data: Partial<Transaction>) => 
    api.put(`/transactions/${id}`, data),
  delete: (id: number) => api.delete(`/transactions/${id}`),
  getStats: () => api.get('/transactions/stats'),
};

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
};

export default api; 