const fs = require('fs/promises');
const { pathResolver } = require('../../helpers');

const deleteFile = async ({ owner, type, filePath }) => {
  const deletePath = pathResolver({ owner, filePath });

  if (type === 'dir') {
    await fs.rmdir(deletePath, { recursive: true });
    return 'Directory successfully deleted';
  } else {
    await fs.unlink(deletePath);
    return 'File successfully deleted';
  }
};

module.exports = deleteFile;
