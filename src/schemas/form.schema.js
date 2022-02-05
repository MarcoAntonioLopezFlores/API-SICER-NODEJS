const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const email = Joi.string().min(3).max(40);
const phone = Joi.string().min(3).max(15);
const subject = Joi.string().min(3).max(50);
const message = Joi.string().min(3).max(200);

const getFormSchema = Joi.object({
  id: id.required(),
});

const createFormSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
  subject: subject.required(),
  message: message.required(),
});

const updateFormSchema = Joi.object({
  name,
  email,
  phone,
  subject,
  message,
});

module.exports = {
  getFormSchema,
  createFormSchema,
  updateFormSchema,
};
