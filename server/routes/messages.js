// server/routes/messages.js
const express = require('express');
const { body } = require('express-validator');
const { postMessage, listMessages, removeMessage } = require('../controllers/messagesController');
const validate = require('../middlewares/validate');

const router = express.Router();

// Liste tous les messages
router.get('/', listMessages);

// Crée un nouveau message (texte non vide)
router.post(
  '/',
  body('text').isString().notEmpty(),
  validate,
  postMessage
);

// Supprime par ID
router.delete('/:id', removeMessage);

module.exports = router;
