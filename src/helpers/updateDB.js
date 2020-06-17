const { readdirSync, statSync } = require('fs');
const { join } = require('join');
const db = require('../server');

const { Movie } = db.models;

const movieFilesDirectory = process.env.REACT_APP_MOVIE_FILES_DIRECTORY;

const findDirectories = (p) => readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());

const movies = findDirectories(movieFilesDirectory);

async function updateDatabase() {
  await db.sequelize.sync({ force: true });

  try {
    movies.forEach(async (file) => {
      const title = file.replace(/\(\d{4}\)/, '').trim();
      const releaseDate = file.replace(/^[^(]*\(/, '').replace(/\)[^(]*$/, '');

      await Movie.create({
        title,
        releaseDate,
      });
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
};

module.exports = updateDatabase;
