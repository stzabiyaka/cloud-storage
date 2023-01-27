const { check } = require('express-validator');

const signInSchema = [check('email').isEmail().withMessage('Incorrect email provided.')];

module.exports = signInSchema;
