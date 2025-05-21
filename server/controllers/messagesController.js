const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} = require('../models/message');

/**
 * POST /api/messages
 */
async function createMessageController(req, res) {
  try {
    const messageData = req.body;
    const result = await createMessage(req.db, messageData);
    // On renvoie l'objet créé, en injectant l'_id
    res.status(201).json({ _id: result.insertedId, ...messageData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/messages
 */
async function getAllMessagesController(req, res) {
  try {
    const messages = await getAllMessages(req.db);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /api/messages/:id
 */
async function getMessageByIdController(req, res) {
  try {
    const { id } = req.params;
    const message = await getMessageById(req.db, id);
    if (!message) return res.status(404).json({ error: 'Message non trouvé' });
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'ID invalide' });
  }
}

/**
 * PUT /api/messages/:id
 */
async function updateMessageController(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await updateMessage(req.db, id, update);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    // On peut renvoyer le nombre de documents modifiés
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'ID invalide ou données incorrectes' });
  }
}

/**
 * DELETE /api/messages/:id
 */
async function deleteMessageController(req, res) {
  try {
    const {id } = req.params;
    const result = await deleteMessage(req.db, id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    // 204 No Content
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'ID invalide' });
  }
}

module.exports = {
  createMessageController,
  getAllMessagesController,
  getMessageByIdController,
  updateMessageController,
  deleteMessageController
};
