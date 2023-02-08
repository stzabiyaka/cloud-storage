const userServices = require('../../services/userServices');
const { User } = require('../../models');

const updateUserAvatar = async (req, res) => {
  const { _id: owner } = req.user;

  const message = await userServices.deleteUserAvatar({ owner });

  const user = await User.findByIdAndUpdate(owner, { avatarURL: null }, { new: true });

  res.status(200).json(user);
};

module.exports = updateUserAvatar;
