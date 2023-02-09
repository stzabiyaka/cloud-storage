const joi = require('joi');

const signUpSchema = joi.object({
  name: joi.string(),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  password: joi.string().required().min(4).max(12).messages({
    'any.required': `missing required field: {{#label}}`,
  }),
});
module.exports = signUpSchema;
