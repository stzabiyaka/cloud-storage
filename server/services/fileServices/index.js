const createDir = require('./createDir');
const storeFile = require('./storeFileService');
const downloadFile = require('./downloadFile');
const deleteFile = require('./deleteFile');
const checkIsExist = require('./ckeckIsExist');

module.exports = {
  createDir,
  storeFile,
  downloadFile,
  deleteFile,
  checkIsExist,
};
