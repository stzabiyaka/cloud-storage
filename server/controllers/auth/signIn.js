const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { requestError } = require('../../helpers');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const accessDeniedMessage = 'Email or Password is wrong.';

  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(404, accessDeniedMessage);
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw requestError(401, accessDeniedMessage);
  }

  const { SECRET_KEY, TOKEN_EXPIRES_IN } = process.env;
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

module.exports = signIn;
