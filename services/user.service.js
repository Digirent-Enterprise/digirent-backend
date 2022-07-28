const User = require("../models/user.model");

const updateUser = async (email, token) => {
  let newUser;
  try {
    newUser = await User.findOneAndUpdate({ email }, { token });
  } catch (e) {
    console.log("Error: ", e);
  }
  return newUser;
};

const createUser = async (
  name,
  email,
  password,
  role,
  isEmailVerified,
  token = "",
  phone,
  currentTime,
) => {
  const user = new User({
    name,
    email,
    password,
    role,
    isEmailVerified,
    token,
    phone,
    currentTime,
  });
  try {
    await user.save();
  } catch (e) {
    console.log("Error when create user ", e);
  }
  return user;
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findAndUpdateUser = async (query, update, options) => {
  return User.findOneAndUpdate(query, update, options);
};

module.exports = {
  updateUser,
  createUser,
  findAndUpdateUser,
};
