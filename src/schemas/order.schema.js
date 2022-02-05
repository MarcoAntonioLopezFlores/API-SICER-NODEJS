const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const sellerId = Joi.number().integer();
const methodPayment = Joi.string().min(3).max(30);
const status = Joi.string().min(3).max(30);

const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  sellerId: sellerId.required(),
  customerId: customerId.required(),
  methodPayment: methodPayment.required(),
  status,
});

const updateOrderSchema = Joi.object({
  sellerId,
  customerId,
  methodPayment,
  status,
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
  updateOrderSchema,
};
