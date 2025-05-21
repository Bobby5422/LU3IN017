// server/app.js
require('dotenv').config();           // Charge .env en début
const express = require('express');
const cors   = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { connectDB } = require('./db');
const usersRouter    = require('./routes/users');
const messagesRouter = require('./routes/messages');

const app = express();

// 1) Sécurité des headers
app.use(helmet());

// 2) CORS (autorise ton client React sur 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 3) Parser JSON et cookies
app.use(express.json());
app.use(cookieParser());

// 4) Sessions (stockées en mémoire en dev)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // mettre true en production avec HTTPS
}));

// 5) Health-check simple
app.get('/healthz', (_req, res) => res.sendStatus(200));

// 6) Connexion à MongoDB, puis démarrage du serveur
connectDB()
  .then(db => {
    console.log('✅ MongoDB connecté');

    // Injecte `db` dans chaque requête
    app.use((req, _res, next) => {
      req.db = db;
      next();
    });

    // 7) Monte les routers
    app.use('/api/users',    usersRouter);
    app.use('/api/messages', messagesRouter);

    // 8) Middleware global de gestion d’erreur
    app.use((err, _req, res, _next) => {
      console.error(err);
      res
        .status(err.statusCode || 500)
        .json({ error: err.message });
    });

    // 9) Démarrage de l’écoute
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server sur port ${process.env.PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Impossible de se connecter à MongoDB', err);
    process.exit(1);
  });
