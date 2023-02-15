const fileServices = require('../../services/fileServices');
const { File, User } = require('../../models');
const { requestError } = require('../../helpers');

const deleteFile = async (req, res) => {
  const { _id: owner, usedSpace } = req.user;
  const { fileId } = req.params;
  const file = await File.findOne({ _id: fileId, owner });

  const isFileExist = await fileServices.checkIsExist(file);
  if (!isFileExist) {
    throw requestError(404, 'File not found');
  }

  await fileServices.deleteFile(file);

  await File.findByIdAndDelete(fileId);

  const updatedUsedSpace = usedSpace - file.size;

  await User.findByIdAndUpdate(owner, { usedSpace: updatedUsedSpace });

  res.status(200).json({ message: `File ${file.name} successfully deleted.` });
};

module.exports = deleteFile;
