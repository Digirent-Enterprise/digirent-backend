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
  status,
  location,
  avatar,
  token = "",
  phone,
  currentDate,
) => {
  const user = new User({
    name,
    email,
    password,
    role,
    status,
    location,
    avatar,
    token,
    phone,
    currentDate,
  });
  try {
    await user.save();
  } catch (e) {
    console.log("Error when create user ", e);
  }
  return user;
};

const deleteUser = async (email) => {
  const user = await User.findOneAndDelete({ email });
  if (!user) return false;
  return user;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
    .select("-password")
    .select("-token");
  if (!user) return false;
  return user;
};

const getAllUser = async () => {
  const users = await User.find().select("-password").select("-token");
  if (!users) return false;
  return users;
};

const findAndUpdateUser = async (query, update, options) => {
  return User.findOneAndUpdate({ _id: query }, update, options);
};

module.exports = {
  updateUser,
  createUser,
  deleteUser,
  findUserByEmail,
  getAllUser,
  findAndUpdateUser,
};
