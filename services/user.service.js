const User = require("../models/user.model");

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

const updateUser = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: data })
    .select("-_id")
    .select("-password")
    .select("-token");
  if (!updatedUser) return false;
  return updatedUser;
};

const adminUpdateUser = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: data })
    .select("-_id")
    .select("-password")
    .select("-token");
  if (!updatedUser) return false;
  return updatedUser;
};

const getUserStatistic = async () => {
  const activeUsers = await User.find({status: true}).count();
  const deactivatedUsers = await User.find({status: false}).count();
  return {
    activeUsers: activeUsers | 0,
    deactivatedUsers: deactivatedUsers | 0
  }
}

module.exports = {
  updateUser,
  createUser,
  deleteUser,
  findUserByEmail,
  getAllUser,
  findAndUpdateUser,
  adminUpdateUser,
  getUserStatistic
};
