const fs = require('fs/promises');
const { pathResolver } = require('../../helpers');

const deleteFileService = async ({ owner, type, filePath }) => {
  const deletePath = pathResolver({ owner, filePath });

  if (type === 'dir') {
    await fs.rmdir(deletePath);
    return 'Directory successfully deleted';
  } else {
    await fs.unlink(deletePath);
    return 'File successfully deleted';
  }
};

module.exports = deleteFileService;
