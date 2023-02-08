const userServices = require('../../services/userServices');
const { User } = require('../../models');

const updateUserAvatar = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    avatar: { data },
  } = req.files;

  const avatarURL = await userServices.storeUserAvatar({ owner, data });

  const user = await User.findByIdAndUpdate(owner, { avatarURL }, { new: true });

  res.status(200).json(user);
};

module.exports = updateUserAvatar;
