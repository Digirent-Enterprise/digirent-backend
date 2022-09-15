const objectValidator = (obj) => {
  return obj && Object.keys(obj).length;
};

module.exports = {
  ObjectValidator: objectValidator,
};
