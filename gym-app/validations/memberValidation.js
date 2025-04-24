const Joi = require('joi');

const memberValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  age: Joi.number().min(16).required(),
  weight: Joi.number().min(25).required()
});

module.exports = memberValidation;
