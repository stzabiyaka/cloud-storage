const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../../models');
const { requestError } = require('../../helpers');

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });

  if (!user) {
    throw requestError(400, 'No user found.');
  }

  const SECRET_KEY = config.get('SECRET_KEY');
  const TOKEN_EXPIRES_IN = config.get('TOKEN_EXPIRES_IN');
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });

  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      diskSpace: user.diskSpace,
      usedSpace: user.usedSpace,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = getCurrentUser;
