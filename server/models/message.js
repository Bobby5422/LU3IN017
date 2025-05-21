const { ObjectId } = require('mongodb');

/**
 * Ajoute un nouveau message dans la collection "messages".
 * @param {Db} db  instance de ta base MongoDB
 * @param {Object} message  objet { author, content, date, … }
 * @returns {Promise<InsertOneResult>}
 */
async function createMessage(db, message) {
  return db.collection('messages').insertOne({
    ...message,
    date: message.date || new Date()
  });
}

/**
 * Récupère tous les messages correspondants à un filtre optionnel.
 * @param {Db} db
 * @param {Object} [filter={}]
 * @returns {Promise<Array>}
 */
async function getAllMessages(db, filter = {}) {
  return db.collection('messages')
    .find(filter)
    .sort({ date: -1 })    // tri par date décroissante, facultatif
    .toArray();
}

/**
 * Récupère un message par son _id.
 * @param {Db} db
 * @param {string} id  chaîne hexadécimale de l’ObjectId
 * @returns {Promise<Object|null>}
 */
async function getMessageById(db, id) {
  return db.collection('messages').findOne({ _id: new ObjectId(id) });
}

/**
 * Met à jour un message existant (remplacement partiel).
 * @param {Db} db
 * @param {string} id
 * @param {Object} update  champs à mettre à jour, ex. { content: "...", edited: true }
 * @returns {Promise<UpdateResult>}
 */
async function updateMessage(db, id, update) {
  return db.collection('messages')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
}

/**
 * Supprime un message par son _id.
 * @param {Db} db
 * @param {string} id
 * @returns {Promise<DeleteResult>}
 */
async function deleteMessage(db, id) {
  return db.collection('messages').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};
