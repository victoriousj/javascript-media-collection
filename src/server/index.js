require('dotenv').config({ path: '.env.local' });

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

const port = process.env.SERVER_PORT || 3001;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});