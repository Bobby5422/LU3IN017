// server/controllers/usersController.js
const { ObjectId } = require('mongodb');
const { createUser, getUserByEmail, getUserById } = require('../models/user');

/**
 * POST /api/users/register
 */
async function register(req, res, next) {
  try {
    // Ajout du champ validated à false
    const dataWithValidation = { ...req.body, validated: false, role: req.body.role || 'user' };
    const user = await createUser(req.db, dataWithValidation);
    // Pas de session automatique, l'utilisateur doit attendre validation
    res.status(201).json({ message: 'Inscription enregistrée, en attente de validation par un admin.' });
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
    const user = await getUserByEmail(req.db, email);
    if (!user || user.password !== password) {
      const err = new Error('Email ou mot de passe invalide');
      err.statusCode = 401;
      return next(err);
    }
    if (!user.validated) {
      const err = new Error('Votre compte n’a pas encore été validé par un administrateur.');
      err.statusCode = 403;
      return next(err);
    }
    req.session.userId = user._id;
    res.json({ _id: user._id, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
}


/**
 * POST /api/users/logout
 */
function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid'); // très important
    res.sendStatus(204);
  });
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

async function validateUser(req, res, next) {
  try {
    const userId = req.params.id;
    const result = await req.db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { validated: true } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé ou déjà validé.' });
    }
    res.json({ message: 'Utilisateur validé avec succès.' });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await req.db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout, me , validateUser , getAllUsers };
