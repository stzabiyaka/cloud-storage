const path = require('path');
const fileServices = require('../../services/fileServices');
const { File, User } = require('../../models');
const { requestError } = require('../../helpers');

const downloadFile = async (req, res) => {
  const { fileId } = req.params;
  const { _id: owner } = req.user;
  const file = await File.findOne({ _id: fileId, owner });

  const isFileExist = await fileServices.checkIsExist(file);
  if (!isFileExist) {
    throw requestError(404, 'File not found');
  }

  const downloadPath = fileServices.downloadFile(file);

  return res.status(200).download(downloadPath);
};

module.exports = downloadFile;
