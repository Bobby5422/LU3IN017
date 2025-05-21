// src/services/api.js
import axios from 'axios';

// On crée une instance pour éviter de modifier le defaults global
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ton server écoute sur :3000/api
  withCredentials: true,                // si tu utilises express-session
});

// ----- AUTHENTIFICATION -----

// POST /api/users/register
export const register = (email, password) => {
  return api.post('/users/register', { email, password });
};

// POST /api/users/login
export const login = (email, password) => {
  return api.post('/users/login', { email, password });
};

// POST (ou DELETE) /api/users/logout
// Si tu as implémenté un logout en POST, sinon ajuste en delete
export const logout = () => {
  return api.post('/users/logout');
};

// GET /api/users/me  (optionnel pour récupérer le profil courant)
export const fetchCurrentUser = () => {
  return api.get('/users/me');
};

// ----- MESSAGES -----

// GET /api/messages
export const fetchMessages = () => {
  return api.get('/messages');
};

// POST /api/messages
export const postMessage = (author, content) => {
  return api.post('/messages', { owner: author, contenu: content });
};

// DELETE /api/messages/:id
export const deleteMessage = (messageId) => {
  return api.delete(`/messages/${messageId}`);
};

// GET /api/messages/:id
export const fetchMessageById = (messageId) => {
  return api.get(`/messages/${messageId}`);
};

// PUT or PATCH /api/messages/:id
export const updateMessage = (messageId, update) => {
  return api.put(`/messages/${messageId}`, update);
};

// ----- UTILISATEURS (ADMIN / PROFIL) -----

// GET /api/users/:id
export const fetchUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

// GET /api/users       (si tu as un endpoint listant les users)
export const fetchAllUsers = () => {
  return api.get('/users');
};

// PATCH /api/users/:id
export const updateUser = (userId, data) => {
  return api.patch(`/users/${userId}`, data);
};

export default api;
