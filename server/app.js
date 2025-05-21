const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const { connectDB } = require('./db');               // ton module de connexion Mongo
const usersRouter   = require('./routes/users');
const messagesRouter= require('./routes/messages');

const app = express();

// 1) MIDDLEWARES GLOBAUX
app.use(express.json());  // lit les JSON dans le body
app.use(cookieParser());  // parse les cookies
app.use(cors({
  origin: 'http://localhost:5173',  // client React
  credentials: true                 // autorise les cookies cross-site
}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }     // en prod mettre secure: true + HTTPS
}));

// 2) ROUTE DE TEST
app.get('/', (req, res) => {
  res.send('Serveur Node/Express opérationnel !');
});

// 3) CONNEXION À MONGODB ET MONTAGE DES ROUTERS
connectDB()
  .then(db => {
    console.log('✅ MongoDB connecté !');

    // injecte `db` dans chaque req
    app.use((req, _, next) => {
      req.db = db;
      next();
    });

    // monte les routers
    app.use('/api/users',    usersRouter);
    app.use('/api/messages', messagesRouter);

    // 4) LANCE LE SERVEUR
    app.listen(3000, () => {
      console.log('Serveur démarré sur le port 3000');
    });
  })
  .catch(err => {
    console.error('Échec de la connexion à MongoDB :', err);
    process.exit(1);
  });
