const jwt = require('jsonwebtoken');
const config = require('config');
const { requestError } = require('../helpers');
const { User } = require('../models');

const SECRET_KEY = config.get('secretKey');

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer = '', token = null] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw requestError(401, 'Authentication error.');
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw requestError(401, 'Authentication error.');
      }
      req.user = user;
      next();
    } catch (error) {
      throw requestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
