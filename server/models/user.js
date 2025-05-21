async function createUser(db, user) {
  return db.collection("users").insertOne(user);
}

async function findUserByEmail(db, email) {
  return db.collection("users").findOne({ email });
}

module.exports = { createUser, findUserByEmail };
