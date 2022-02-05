const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  //console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  return res.status(500).send({
    statusCode: 500,
    message: err.message,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;

    return res.status(output.statusCode).send(output.payload);
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(409).send({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
