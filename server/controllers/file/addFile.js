const path = require('path');
const fileServices = require('../../services/fileServices');
const { File } = require('../../models');

const AddFile = async (req, res) => {
  const { name, type, parent } = req.body;
  const { id } = req.user;

  const parentFile = parent ? await File.findById(parent) : null;

  const filePath = !parentFile ? name : path.join(parentFile.filePath, name);

  const file = await File.create({ name, type, filePath, parent, owner: id });

  if (parentFile) {
    await File.findByIdAndUpdate({ _id: parentFile._id }, { $push: { children: file._id } });
  }

  await fileServices.addFileService(file);

  return res.status(201).json(file);
};

module.exports = AddFile;
