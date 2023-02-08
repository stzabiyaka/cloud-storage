const fs = require('fs/promises');
const path = require('path');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const deleteUserAvatar = async ({ owner }) => {
  try {
    const avatarExtension = 'jpg';
    const avatarName = `${owner}.${avatarExtension}`;
    const avatarDeletePath = path.join(avatarsDir, avatarName);
    await fs.unlink(avatarDeletePath);
    return 'Avatar successfully deleted';
  } catch (error) {
    throw error;
  }
};

module.exports = deleteUserAvatar;
