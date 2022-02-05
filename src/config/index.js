require('dotenv').config();

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  API_KEY: process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = { config };
