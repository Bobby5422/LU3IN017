// server/routes/users.js
const express = require('express');
const { body } = require('express-validator');
const { register, login, logout, me , validateUser , getAllUsers } = require('../controllers/usersController');
const validate = require('../middlewares/validate');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// Inscription : email valide + mdp ≥ 8 caractères
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  validate,
  register
);

// Connexion : email valide + mdp non vide
router.post(
  '/login',
  body('email').isEmail(),
  body('password').exists(),
  validate,
  login
);

// Déconnexion
router.post('/logout', logout);

// Récupère l'utilisateur courant via la session
router.get('/me', me);

// Route admin pour valider un utilisateur
router.patch('/:id/validate', isAdmin, validateUser);

// Route admin pour obtenir tous les utilisateurs
router.get('/', isAdmin, getAllUsers);

module.exports = router;
