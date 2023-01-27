const { validationResult } = require('express-validator');
const { requestError } = require('../helpers');

const validateBody = () => {
  const func = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errors.errors.map(error => error.msg).join(' ');

      next(requestError(400, message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
