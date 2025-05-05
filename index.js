const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const museoWebRoutes = require('./routes/museos');
const obrasWebRoutes = require('./routes/obrasDeArte');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const PORT = process.env.PORT || 3000;

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
);

sequelize.authenticate()
  .then(() => console.log(' Sequelize conectado'))
  .catch(err => console.error('Error Sequelize:', err));

//Multer para imágenes
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'),
  filename: (_req, file, cb) => {
    const ts = Date.now(), ext = path.extname(file.originalname);
    cb(null, `${ts}${ext}`);
  }
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/museos', museoWebRoutes);
app.use('/obras', upload.single('imagen'), obrasWebRoutes);

app.get('/', (_req, res) => res.redirect('/museos'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
