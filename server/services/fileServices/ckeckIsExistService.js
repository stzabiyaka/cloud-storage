const fs = require('fs/promises');
const { pathResolver } = require('../../helpers');

const checkIsExistService = async ({ owner, filePath }) => {
  const checkPath = pathResolver({ owner, filePath });
  try {
    await fs.access(checkPath);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = checkIsExistService;
