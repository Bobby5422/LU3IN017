// server/models/user.js
const { ObjectId } = require('mongodb');

/**
 * Crée un nouvel utilisateur
 * - Vérifie unicité de l'email
 * - Hash le mot de passe
 * - Insert en base
 */
// models/user.js

async function createUser(db, data) {
  const existingUser = await db.collection('users').findOne({ email: data.email });

  if (existingUser) {
    const err = new Error('Cet email est déjà utilisé');
    err.statusCode = 400; // Bad Request
    throw err;
  }

  const newUser = {
    email: data.email,
    username: data.username || '',
    password: data.password, // Non haché (comme demandé)
    role: 'user',            // Rôle par défaut, à adapter si besoin
  };

  const result = await db.collection('users').insertOne(newUser);
  return { _id: result.insertedId, ...newUser };
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
