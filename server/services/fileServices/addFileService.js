const fs = require('fs/promises');
const path = require('path');

const addFileService = async ({ owner, filePath }) => {
  const fileDir = path.join(__dirname, '../../', 'files', `${owner}`, filePath);
  try {
    await fs.mkdir(fileDir);
    return 'File successfully created';
  } catch (error) {
    throw error;
  }
};

module.exports = addFileService;
