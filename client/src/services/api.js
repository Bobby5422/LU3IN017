// src/services/api.js
import axios from 'axios';

// Configuration d'Axios
axios.defaults.baseURL = 'http://localhost:8000'; // à adapter selon ton backend
axios.defaults.withCredentials = true; // utile si le backend utilise des cookies de session

// ----- AUTHENTIFICATION -----
export const login = (username, password) => {
  return axios.post('/api/login', { username, password });
};

export const register = (username, password) => {
  return axios.post('/api/register', { username, password });
};

export const logout = () => {
  return axios.delete('/api/logout');
};

// ----- MESSAGES -----
export const fetchMessages = (isPrivate = false) => {
  return axios.get(isPrivate ? '/api/messages/private' : '/api/messages/public');
};

export const postMessage = (text) => {
  return axios.post('/api/messages', { text });
};

export const deleteMessage = (messageId) => {
  return axios.delete(`/api/messages/${messageId}`);
};

export const searchMessages = (query) => {
  return axios.get('/api/messages/search', { params: { q: query } });
};

export const getUserMessages = (userId) => {
  return axios.get(`/api/users/${userId}/messages`);
};

// ----- ADMINISTRATION -----
export const fetchPendingUsers = () => {
  return axios.get('/api/admin/pending');
};

export const validateUser = (userId) => {
  return axios.post(`/api/admin/validate/${userId}`);
};

export const updateUserStatus = (userId, newStatus) => {
  return axios.patch(`/api/admin/users/${userId}`, { status: newStatus });
};
