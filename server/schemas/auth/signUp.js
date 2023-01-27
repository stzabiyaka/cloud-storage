const { check } = require('express-validator');

const signUpSchema = [
  check('email').isEmail().withMessage('Incorrect email provided.'),
  check('password')
    .isLength({
      min: 4,
      max: 12,
    })
    .withMessage('Password length must be longer than 3 and shorter then 13 symbols.'),
];

module.exports = signUpSchema;
