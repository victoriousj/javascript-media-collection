require('dotenv').config();

const bodyParser = require('body-parser');
const { Sequelize, Op } = require('sequelize');
const express = require('express');
const cors = require('cors');

const models = require('../models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'media_development.db',
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

app.get('/movies', async function (req, res) {
  models.Movie.findAll().then(function (movies) {
    var titles = movies.map(function (movie) {
      return {
        title: movie.title,
        id: movie.id
      }
    });
    res.json(titles);
  });
});

app.get('/movies/:query', async function (req, res) {
  const { query } = req.params;
  if (query === '') return;

  console.log('controller query', query)
  models.Movie.findAll({
    where: {
      title: {
        [Op.like]: `%${query}%`
      }
    }
  }).then(function (movies) {
    var titles = movies.map(function (movie) {
      return {
        title: movie.title,
        id: movie.id
      }
    });
    res.json(titles);
  });
});

app.get('/movie/:id', async function (req, res) {
  const { id } = req.params;

  models.Movie.findAll({
    where: {
      id: id
    },
    limit: 1
  }).then(function (movies) {
    var titles = {
      id: movies[0].id,
      title: movies[0].title,
      year: movies[0].releaseDate,
    }
    res.json(titles);
  });
});

const port = process.env.SERVER_PORT || 3001;

sequelize.sync().then(() => {
  app.listen(port);
});

db.models.Movie = require('../models/movie.js')(sequelize);

module.exports = db;
