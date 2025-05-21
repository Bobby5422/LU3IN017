const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "forumDB";

async function connectDB() {
  await client.connect();
  console.log("MongoDB connecté !");
  return client.db(dbName);
}

module.exports = { connectDB };
