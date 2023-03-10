const { File } = require('../../models');

const searchFiles = async (req, res) => {
  const { search } = req.query;
  const { id: owner } = req.user;
  const $regex = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

  const files = await File.find({ name: { $regex }, owner });

  return res.status(200).json(files);
};

module.exports = searchFiles;
