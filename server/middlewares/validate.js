// server/middlewares/validate.js
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  // Récupère les erreurs de validation
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    // Envoie un 400 avec le détail des erreurs
    return res.status(400).json({ errors: errs.array() });
  }
  next();
};
