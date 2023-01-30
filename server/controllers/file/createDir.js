const path = require('path');
const fileServices = require('../../services/fileServices');
const { File } = require('../../models');
const { requestError } = require('../../helpers');

const createDir = async (req, res) => {
  const { name, type, parent } = req.body;
  const { id } = req.user;

  const parentFile = parent ? await File.findById(parent) : null;

  const filePath = !parentFile ? name : path.join(parentFile.filePath, name);

  const dirData = { name, type, filePath, parent, owner: id };

  const isDirExist = await fileServices.checkIsExistService(dirData);

  if (isDirExist) {
    throw requestError(409, `Directory ${name} already exists.`);
  }

  const dir = await File.create(dirData);

  if (parentFile) {
    await File.findByIdAndUpdate({ _id: parentFile._id }, { $push: { children: dir._id } });
  }

  await fileServices.createDirService(dir);

  return res.status(201).json(dir);
};

module.exports = createDir;
