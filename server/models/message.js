// server/models/message.js
const { ObjectId } = require('mongodb');

/**
 * Crée un message
 * - authorId : ObjectId de l'utilisateur
 * - text : contenu
 */
async function createMessage(db, { authorId, text }) {
  const doc = {
    authorId: new ObjectId(authorId),
    text,
    createdAt: new Date()
  };
  const { insertedId } = await db.collection('messages').insertOne(doc);
  return { _id: insertedId, ...doc };
}

/**
 * Récupère tous les messages triés par date
 * et enrichit l'auteur via un $lookup
 */
async function getAllMessages(db) {
  return db.collection('messages')
    .aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          text: 1,
          createdAt: 1,
          'author._id': 1,
          'author.username': 1
        }
      }
    ])
    .toArray();
}

/**
 * Supprime un message par son ID
 */
async function deleteMessage(db, id) {
  return db.collection('messages').deleteOne({ _id: new ObjectId(id) });
}

module.exports = { createMessage, getAllMessages, deleteMessage };
