const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const avatarSize = 250;

const storeUserAvatar = async ({ owner, data }) => {
  try {
    const avatarExtension = 'jpg';
    const avatarName = `${owner}.${avatarExtension}`;
    const avatarUpload = path.join(avatarsDir, avatarName);
    const image = await jimp.read(data);
    await image.cover(avatarSize, avatarSize).write(avatarUpload);
    return path.join('avatars', avatarName);
  } catch (error) {
    throw error;
  }
};

module.exports = storeUserAvatar;
