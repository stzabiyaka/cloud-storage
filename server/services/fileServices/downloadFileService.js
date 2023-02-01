const { pathResolver } = require('../../helpers');

const downloadFileService = ({ owner, filePath }) => {
  const downloadPath = pathResolver({ owner, filePath });
  return downloadPath;
};

module.exports = downloadFileService;
