const fs = require('fs/promises');
const path = require('path');

const createDirService = async ({ owner, filePath }) => {
  const dirPath = path.join(__dirname, '../../', 'files', `${owner}`, filePath);
  try {
    await fs.mkdir(dirPath);
    return 'Directory successfully created';
  } catch (error) {
    throw error;
  }
};

module.exports = createDirService;
