// server/db.js
// Charge les variables du .env
require('dotenv').config();

const { MongoClient } = require('mongodb');

// Crée un client Mongo à partir de l'URI configurée
const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  // Essaie de se connecter au serveur Mongo
  await client.connect();
  // Retourne l'objet `Db` (ici : forumDB)
  return client.db();
}

// Expose la fonction de connexion
module.exports = { connectDB };
