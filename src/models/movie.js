const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var Movie = sequelize.define(
    'Movie', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "Title"',
        },
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    releaseDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, { sequelize });

  return Movie;
};
