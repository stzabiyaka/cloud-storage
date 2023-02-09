const fs = require('fs/promises');
const path = require('path');

const publicDir = path.join(__dirname, '../../', 'public');

const deleteUserAvatar = async ({ avatarURL }) => {
  try {
    const avatarDeletePath = path.join(publicDir, avatarURL);
    await fs.unlink(avatarDeletePath);
    return 'Avatar successfully deleted';
  } catch (error) {
    throw error;
  }
};

module.exports = deleteUserAvatar;
