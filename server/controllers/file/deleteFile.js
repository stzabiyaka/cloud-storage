const fileServices = require('../../services/fileServices');
const { File } = require('../../models');
const { requestError } = require('../../helpers');

const deleteFile = async (req, res) => {
  const { _id: owner } = req.user;
  const { fileId } = req.params;
  const file = await File.findOne({ _id: fileId, owner });

  const { parent } = file;

  const isFileExist = await fileServices.checkIsExist(file);
  if (!isFileExist) {
    throw requestError(404, 'File not found');
  }

  await fileServices.deleteFile(file);

  if (parent) {
    await File.findByIdAndUpdate(parent, { $pull: { children: fileId } });
  }

  await File.findByIdAndDelete(fileId);

  res.status(200).json({ message: `File ${file.name} successfully deleted.` });
};

module.exports = deleteFile;
