// src/services/authService.js
import axios from 'axios';

// Base URL et configuration par défaut (si besoin)
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Pour les sessions avec cookies

export const login = (username, password) => {
  return axios.post('/api/login', { username, password });
};

export const register = (username, password) => {
  return axios.post('/api/register', { username, password });
};

export const logout = () => {
  return axios.delete('/api/logout');
};

export const checkSession = () => {
  return axios.get('/api/session'); // utile pour vérifier si l'utilisateur est toujours connecté
};
