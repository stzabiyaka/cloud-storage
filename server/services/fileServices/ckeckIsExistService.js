const fs = require('fs/promises');
const path = require('path');

const checkIsExistService = async ({ owner, filePath }) => {
  const checkPath = path.join(__dirname, '../../', 'files', `${owner}`, filePath);
  try {
    await fs.access(checkPath);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = checkIsExistService;
