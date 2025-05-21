const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Serveur Node/Express opérationnel !');
});

app.listen(3000, () => console.log('Serveur sur le port 3000'));

const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // adresse de ton client React
  credentials: true
}));

app.use(session({
  secret: 'ton_secret_session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
