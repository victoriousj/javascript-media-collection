require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const models = require('../models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'media_development.db',
});

app.get('/movies', async function (req, res) {
  models.Movie.findAll().then(function (movies) {
    var titles = movies.map(function (movie) {
      return {
        title: movie.title,
        id: movie.id
      }
    });

    res.json(titles);
    console.log('Sent list of items');
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