const Joi = require('joi');

const id = Joi.number().integer();
const sku = Joi.string().min(3).max(45);
const stock = Joi.number().integer().positive();
const description = Joi.string().min(3).max(300);
const image = Joi.string().min(3).max(140);
const price = Joi.number().positive();
const providerId = Joi.number().integer();

const getFormSchema = Joi.object({
  id: id.required(),
});

const createFormSchema = Joi.object({
  sku: sku.required(),
  stock: stock.required(),
  description: description.required(),
  image,
  price: price.required(),
  providerId: providerId.required(),
});

const updateFormSchema = Joi.object({
  sku,
  stock,
  description,
  image,
  price,
  providerId,
});

module.exports = {
  getFormSchema,
  createFormSchema,
  updateFormSchema,
};
