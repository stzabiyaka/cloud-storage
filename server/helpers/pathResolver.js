const path = require('path');

const pathResolver = ({ owner, filePath }) => {
  return path.join(__dirname, '../', 'files', `${owner}`, filePath);
};

module.exports = pathResolver;
