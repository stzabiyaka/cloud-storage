const sizeFormatter = (size, digits = 2) => {
  if (size > 1024 ** 3) {
    return `${(size / 1024 ** 3).toFixed(digits)} GB`;
  }
  if (size > 1024 ** 2) {
    return `${(size / 1024 ** 2).toFixed(digits)} MB`;
  }
  if (size > 1024) {
    return `${(size / 1024).toFixed(digits)} KB`;
  }
  if (size > 0) {
    return `${size} B`;
  }
  return '';
};

export default sizeFormatter;
