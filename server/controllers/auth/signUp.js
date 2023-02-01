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

  const dirData = { owner: user._id, filePath: '' };

  const isDirExist = await fileServices.checkIsExistService(dirData);

  if (isDirExist) {
    throw requestError(409, `Directory already exists.`);
  }

  await fileServices.createDirService(dirData);

  return res.status(201).json({ message: 'User successfully created' });
};

module.exports = signUp;
