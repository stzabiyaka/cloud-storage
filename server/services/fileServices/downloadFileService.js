const path = require('path');

const downloadFileService = ({ owner, filePath }) => {
  const downloadPath = path.join(__dirname, '../../', 'files', `${owner}`, filePath);
  return downloadPath;
};

module.exports = downloadFileService;
