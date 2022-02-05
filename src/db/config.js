const { config } = require('../config');

module.exports = {
  development: {
    url: config.DB_URL,
    dialect: 'postgres',
  },
  production: {
    url: config.DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
