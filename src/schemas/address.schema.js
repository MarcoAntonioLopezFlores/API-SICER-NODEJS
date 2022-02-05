const Joi = require('joi');

const id = Joi.number().integer();
const province = Joi.string().min(3).max(100);
const city = Joi.string().min(3).max(100);
const zip = Joi.string().min(3).max(15);
const street_1 = Joi.string().min(3).max(200);
const street_2 = Joi.string().min(3).max(200);

const getAddressSchema = Joi.object({
  id: id.required(),
});

const createAddressSchema = Joi.object({
  province: province.required(),
  city: city.required(),
  zip: zip.required(),
  street_1: street_1.required(),
  street_2: street_2.required(),
});

const updateAddressSchema = Joi.object({
  province,
  city,
  zip,
  street_1,
  street_2,
});

module.exports = {
  getAddressSchema,
  createAddressSchema,
  updateAddressSchema,
};
