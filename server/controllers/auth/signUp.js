const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { requestError } = require('../../helpers');
const fileServices = require('../../services/fileServices');

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw requestError(409, `User with email ${email} already exists`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  await fileServices.addFileService({ owner: user._id, filePath: '' });

  return res.status(201).json({ message: 'User successfully created' });
};

module.exports = signUp;
