const { connectDB } = require('../db');
const { createUser, findUserByEmail } = require('../models/user');

async function registerUser(req, res) {
  const db = await connectDB();
  const user = await createUser(db, req.body);
  res.json(user);
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  try {
    const user = await req.db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Auth OK → on crée la session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ message: 'Connexion réussie' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

function logoutUser(req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Erreur de déconnexion' });
    res.clearCookie('connect.sid');  // optionnel mais conseillé
    res.status(200).json({ message: 'Déconnecté' });
  });
}

function getCurrentUser(req, res) {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Non authentifié' });
  }
}

module.exports = { registerUser, loginUser , logoutUser, getCurrentUser };
