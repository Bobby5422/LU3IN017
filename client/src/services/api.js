// client/src/services/api.js
import axios from 'axios';

// Instance dédiée pointant directement sur /api
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,  // en cas de cookie/session
});

// ----- AUTHENTIFICATION -----

/**
 * Inscription
 * @param {{ prenom, nom, pseudo, email, password }} data
 */
export const register = (data) => {
  return api.post('/users/register', data);
};

/**
 * Connexion
 * @param {string} email
 * @param {string} password
 */
export const login = (email, password) => {
  return api.post('/users/login', { email, password });
};

/** Déconnexion */
export const logout = () => {
  return api.post('/users/logout');
};

/** Récupère l’utilisateur courant (via session) */
export const fetchCurrentUser = () => {
  return api.get('/users/me');
};

// ----- MESSAGES -----

export const fetchMessages = () => api.get('/messages');
export const postMessage   = (text) => api.post('/messages', { text });
export const deleteMessage = (id)   => api.delete(`/messages/${id}`);

// ----- UTILISATEURS -----

export const fetchUserById = (id)   => api.get(`/users/${id}`);
export const fetchAllUsers = ()     => api.get('/users');
export const updateUser   = (id, data) => api.patch(`/users/${id}`, data);

export default api;
