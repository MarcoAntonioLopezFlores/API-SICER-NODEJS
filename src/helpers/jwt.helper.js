const { sign } = require('jsonwebtoken');
const { config } = require('../config');

module.exports.generateToken = (user) => {
  return sign({ user }, config.JWT_SECRET, { expiresIn: '4h' });
};
