const path = require('path');
const fileServices = require('../../services/fileServices');
const { File } = require('../../models');
const { requestError } = require('../../helpers');

const fetchFiles = async (req, res) => {
  const { id } = req.user;
  const { parent } = req.query;
  const files = await File.find({ owner: id, parent });

  res.status(200).json(files);
};

module.exports = fetchFiles;
