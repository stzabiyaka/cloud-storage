const fs = require('fs/promises');
const { pathResolver } = require('../../helpers');

const createDirService = async ({ owner, filePath }) => {
  const dirPath = pathResolver({ owner, filePath });
  try {
    await fs.mkdir(dirPath);
    return 'Directory successfully created';
  } catch (error) {
    throw error;
  }
};

module.exports = createDirService;
