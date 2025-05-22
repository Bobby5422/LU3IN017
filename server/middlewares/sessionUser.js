const { getUserById } = require('../models/user');

module.exports = async (req, res, next) => {
  if (!req.session.userId) {
    return next(); // Pas connecté
  }

  try {
    const user = await getUserById(req.db, req.session.userId);
    if (user) {
      req.user = user; // On injecte l'utilisateur dans la requête
    }
  } catch (err) {
    console.error('Erreur récupération user session:', err);
  }

  next();
};
