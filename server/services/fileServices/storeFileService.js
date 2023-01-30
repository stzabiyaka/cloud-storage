const path = require('path');

const storeFileService = async ({ owner, filePath }, file) => {
  const storePath = path.join(__dirname, '../../', 'files', `${owner}`, filePath);
  try {
    await file.mv(storePath);
    return 'File successfully stored';
  } catch (error) {
    throw error;
  }
};

module.exports = storeFileService;
