// server/controllers/usersController.js
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail, getUserById } = require('../models/user');

/**
 * POST /api/users/register
 */
async function register(req, res, next) {
  try {
    const user = await createUser(req.db, req.body);
    // On initialise la session
    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/users/login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    // 1) Recherche par email
    const user = await getUserByEmail(req.db, email);
    // 2) Vérifie l'existence et le hash
    if (!user || user.password !== password) {
      const err = new Error('Email ou mot de passe invalide');
      err.statusCode = 401;
      return next(err);
    }
    // 3) Établit la session
    req.session.userId = user._id;
    // 4) Renvoie les infos publiques
    res.json({ _id: user._id, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/users/logout
 */
async function logout(req, res) {
  req.session.destroy();
  res.sendStatus(204);
}

/**
 * GET /api/users/me
 */
async function me(req, res, next) {
  if (!req.session.userId) {
    return res.sendStatus(401);
  }
  const user = await getUserById(req.db, req.session.userId);
  if (!user) {
    return res.sendStatus(404);
  }
  res.json({ _id: user._id, email: user.email, role: user.role });
}

module.exports = { register, login, logout, me };
