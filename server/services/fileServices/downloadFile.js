const { pathResolver } = require('../../helpers');

const downloadFile = ({ owner, filePath }) => {
  const downloadPath = pathResolver({ owner, filePath });
  return downloadPath;
};

module.exports = downloadFile;
