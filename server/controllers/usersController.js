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
  if (user) res.json(user);
  else res.status(404).send('Utilisateur introuvable');
}

module.exports = { registerUser, loginUser };
