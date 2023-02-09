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

  const isDirExist = await fileServices.checkIsExist(dirData);

  if (isDirExist) {
    throw requestError(409, `Directory ${name} already exists.`);
  }

  const dir = await File.create(dirData);

  await fileServices.createDir(dir);

  return res.status(201).json(dir);
};

module.exports = createDir;
