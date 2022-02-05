const { Sequelize } = require('sequelize');

const { config } = require('../config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'postgres',
  logging: false,
};

if (config.IS_PROD) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.DB_URL, options);

setupModels(sequelize);

module.exports = sequelize;
