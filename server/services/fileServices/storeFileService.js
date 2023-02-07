const { pathResolver } = require('../../helpers');

const storeFile = async ({ owner, filePath }, file) => {
  const storePath = pathResolver({ owner, filePath });
  try {
    await file.mv(storePath);
    return 'File successfully stored';
  } catch (error) {
    throw error;
  }
};

module.exports = storeFile;
