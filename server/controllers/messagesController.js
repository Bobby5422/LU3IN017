// server/controllers/messagesController.js
const { createMessage, getAllMessages, deleteMessage } = require('../models/message');

/**
 * POST /api/messages
 */
async function postMessage(req, res, next) {
  try {
    // Vérifie la session
    if (!req.session.userId) return res.sendStatus(401);

    const msg = await createMessage(req.db, {
      authorId: req.session.userId,
      text: req.body.text
    });
    res.status(201).json(msg);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/messages
 */
async function listMessages(req, res, next) {
  try {
    const msgs = await getAllMessages(req.db);
    res.json(msgs);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/messages/:id
 */
async function removeMessage(req, res, next) {
  try {
    const result = await deleteMessage(req.db, req.params.id);
    if (result.deletedCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = { postMessage, listMessages, removeMessage };
