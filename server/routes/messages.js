const express = require('express');
const {
  createMessageController,
  getAllMessagesController,
  getMessageByIdController,
  updateMessageController,
  deleteMessageController
} = require('../controllers/messagesController');

const router = express.Router();

// Créer un message
router.post('/', createMessageController);

// Récupérer tous les messages
router.get('/', getAllMessagesController);

// Récupérer un seul message par son ID
router.get('/:id', getMessageByIdController);

// Mettre à jour un message (PUT ou PATCH selon tes préférences)
router.put('/:id', updateMessageController);

// Supprimer un message
router.delete('/:id', deleteMessageController);

module.exports = router;
