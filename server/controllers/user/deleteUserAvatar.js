const userServices = require('../../services/userServices');
const { User } = require('../../models');

const updateUserAvatar = async (req, res) => {
  const { _id: owner } = req.user;

  const user = await User.findById(owner);

  if (user.avatarURL) {
    await userServices.deleteUserAvatar({ avatarURL: user.avatarURL });
  }

  const updatedUser = await User.findByIdAndUpdate(owner, { avatarURL: null }, { new: true });

  res.status(200).json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      diskSpace: updatedUser.diskSpace,
      usedSpace: updatedUser.usedSpace,
      avatarURL: updatedUser.avatarURL,
    },
  });
};

module.exports = updateUserAvatar;
