// server/models/user.js
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

/**
 * Crée un nouvel utilisateur
 * - Vérifie unicité de l'email
 * - Hash le mot de passe
 * - Insert en base
 */
async function createUser(db, { email, password }) {
  // 1) Vérifie s'il existe déjà
  const exist = await db.collection('users').findOne({ email });
  if (exist) {
    const err = new Error('Email déjà utilisé');
    err.statusCode = 409;
    throw err;
  }
  // 2) Hash du mot de passe
  const hash = await bcrypt.hash(password, 10);
  // 3) Insert en DB
  const { insertedId } = await db.collection('users')
    .insertOne({ email, password: hash, role: 'user', createdAt: new Date() });
  return { _id: insertedId, email, role: 'user' };
}

/**
 * Récupère un utilisateur par email
 */
async function getUserByEmail(db, email) {
  return db.collection('users').findOne({ email });
}

/**
 * Récupère un utilisateur par ObjectId
 */
async function getUserById(db, id) {
  return db.collection('users').findOne({ _id: new ObjectId(id) });
}

module.exports = { createUser, getUserByEmail, getUserById };
