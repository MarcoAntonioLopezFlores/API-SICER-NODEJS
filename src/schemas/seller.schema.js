const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
//const userId = Joi.number().integer();
const getSellerSchema = Joi.object({
  id: id.required(),
});

const createSellerSchema = Joi.object({
  name: name.required(),
  user: createUserSchema,
});

const updateSellerSchema = Joi.object({
  name,
  user: updateUserSchema,
});

module.exports = {
  getSellerSchema,
  createSellerSchema,
  updateSellerSchema,
};
