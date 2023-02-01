const path = require('path');
const fileServices = require('../../services/fileServices');
const { File, User } = require('../../models');
const { requestError } = require('../../helpers');

const downloadFile = async (req, res) => {
  const { id } = req.query;
  const { _id: owner } = req.user;
  const file = await File.findOne({ _id: id, owner });

  const isFileExist = await fileServices.checkIsExistService(file);
  if (!isFileExist) {
    throw requestError(404, 'File not found');
  }

  const downloadPath = fileServices.downloadFileService(file);

  return res.status(200).download(downloadPath);
};

module.exports = downloadFile;
