// server/middlewares/isAdmin.js
module.exports = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  const user = req.user; // On suppose que user est chargé dans req (à voir si tu as un middleware sessionUser)
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé : admin uniquement' });
  }
  next();
};
