const { connectDB } = require('../db');
const { createUser, findUserByEmail } = require('../models/user');

async function registerUser(req, res) {
  const db = await connectDB();
  const user = await createUser(db, req.body);
  res.json(user);
}

async function loginUser(req, res) {
  const db = await connectDB();
  const user = await findUserByEmail(db, req.body.email);
  if (user) {
    req.session.user = user; // Stocke dans session
    res.json(user);
  } else res.status(404).send('Utilisateur introuvable');
}

function logoutUser(req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Erreur de déconnexion' });
    res.clearCookie('connect.sid');  // optionnel mais conseillé
    res.status(200).json({ message: 'Déconnecté' });
  });
}

function getCurrentUser(req, res) {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Non authentifié' });
  }
}

module.exports = { registerUser, loginUser , logoutUser, getCurrentUser };
