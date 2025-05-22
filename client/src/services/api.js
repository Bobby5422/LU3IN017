// client/src/services/api.js
import axios from 'axios';

// On crée une instance axios pointant sur /api
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,  // pour envoyer le cookie de session
});

// ——— AUTHENTIFICATION ———

/**
 * Inscription d’un nouvel utilisateur.
 * @param {{prenom, nom, pseudo, email, password}} data
 */
export const register = data => api.post('/users/register', data);

/**
 * Connexion d’un utilisateur existant.
 * @param {string} email 
 * @param {string} password 
 */
export const login = (email, password) =>
  api.post('/users/login', { email, password });

/** Déconnexion */
export const logout = () =>
  api.post('/users/logout');

/** Récupère l’utilisateur courant via la session */
export const fetchCurrentUser = () =>
  api.get('/users/me');

// ——— UTILISATEURS ———

/** Récupère un utilisateur par son ID */
export const fetchUserById = id =>
  api.get(`/users/${id}`);

/** Met à jour un utilisateur */
export const updateUser = (id, data) =>
  api.patch(`/users/${id}`, data);

/** Récupère tous les utilisateurs (admin) */
export const fetchAllUsers = () =>
  api.get('/users');

/** Récupère la liste des messages d’un utilisateur */
export const fetchUserMessages = userId =>
  api.get(`/users/${userId}/messages`);

// ——— MESSAGES ———

/** Récupère tous les messages publics */
export const fetchMessages = () =>
  api.get('/messages');

/** Publie un nouveau message */
export const postMessage = text =>
  api.post('/messages', { text });

/** Supprime un message par son ID */
export const deleteMessage = id =>
  api.delete(`/messages/${id}`);

export default api;
