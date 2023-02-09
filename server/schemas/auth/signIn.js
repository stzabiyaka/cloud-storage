const joi = require('joi');

const signInSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  password: joi.string().required().messages({
    'any.required': `missing required field: {{#label}}`,
  }),
});

module.exports = signInSchema;
