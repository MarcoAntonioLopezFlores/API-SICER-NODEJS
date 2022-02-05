const Joi = require('joi');

const {
  createAddressSchema,
  updateAddressSchema,
} = require('./address.schema');
const { createUserSchema, updateUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
//const userId = Joi.number().integer();
const getProviderSchema = Joi.object({
  id: id.required(),
});

const createProviderSchema = Joi.object({
  name: name.required(),
  user: createUserSchema,
  address: createAddressSchema,
});

const updateProviderSchema = Joi.object({
  name,
  user: updateUserSchema,
  address: updateAddressSchema,
});

module.exports = {
  getProviderSchema,
  createProviderSchema,
  updateProviderSchema,
};
