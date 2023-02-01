const path = require('path');
const fileServices = require('../../services/fileServices');
const { File, User } = require('../../models');
const { requestError } = require('../../helpers');

const uploadFile = async (req, res) => {
  const { parentId } = req.params;
  const { id, diskSpace, usedSpace } = req.user;
  const { file } = req.files;

  const parentFile = parentId ? await File.findOne({ _id: parentId, owner: id }) : null;

  const type = file.name.split('.').pop();
  const { name, size } = file;

  if (usedSpace + size > diskSpace) {
    throw requestError(409, 'There is not enough space on the disk');
  }

  const updatedUsedSpace = usedSpace + size;

  const filePath = !parentFile ? name : path.join(parentFile.filePath, name);

  const fileData = { name, type, size, filePath, parent: parentId, owner: id };

  const isFileExist = await fileServices.checkIsExistService(fileData);

  if (isFileExist) {
    throw requestError(409, `File ${name} already exists in this directory.`);
  }

  await fileServices.storeFileService(fileData, file);

  const storedFile = await File.create(fileData);

  if (parentFile) {
    await File.findByIdAndUpdate({ _id: parentFile._id }, { $push: { children: storedFile._id } });
  }

  await User.findByIdAndUpdate({ _id: id }, { usedSpace: updatedUsedSpace });

  return res.status(201).json(storedFile);
};

module.exports = uploadFile;
