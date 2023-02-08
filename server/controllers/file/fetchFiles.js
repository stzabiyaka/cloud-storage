const { File } = require('../../models');

const fetchFiles = async (req, res) => {
  const { id } = req.user;
  const { parent, sort, sortDirection = 1 } = req.query;
  let sortParam = {};
  switch (sort) {
    case 'name':
      sortParam = { name: sortDirection };
      break;
    case 'type':
      sortParam = { type: sortDirection };
      break;
    case 'date':
      sortParam = { createdAt: sortDirection };
    default:
  }

  const files = await File.find({ owner: id, parent }).sort(sortParam);

  res.status(200).json(files);
};

module.exports = fetchFiles;
