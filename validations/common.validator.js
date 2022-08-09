const verifyString = (string) => {
  return !!string;
};

const verifyNumber = (num) => {
  let newNum;
  try {
    newNum = Number(num);
  } catch (e) {
    return false;
  }
  return !!(newNum + "");
};

module.exports = {
  verifyString,
  verifyNumber,
};
