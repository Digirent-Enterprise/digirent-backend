const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { TokenService, UserService } = require("./index");

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const decryptPassword = async (password) => {
  return await bcrypt.decode(password, 10);
};

const findUser = async (email) => {
  return await User.findOne({ email });
};

const logout = async (email) => {
  const user = await User.findOneAndUpdate({ email }, { token: "" });
  if (!user) return false;
  return user;
};

const loginUserWithEmailAndPassword = async (user) => {
  const accessToken = await TokenService.generateAccessToken(user);
  const refreshToken = await TokenService.generateRefreshToken(user);
  await UserService.updateUser(user._id, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

const changeUserPassword = async (email, password) => {
  const update = User.findOneAndUpdate({ email }, { password })
    .select("-password")
    .select("-token");
  if (!update) return false;
  return update;
};

const findUserByToken = async (token) => {
  return User.findOne({ token });
};

const refreshAuth = async (refreshToken) => {};

const resetPassword = async (resetPasswordToken, newPassword) => {};

const verifyEmail = async (verifyEmailToken) => {};

module.exports = {
  loginUserWithEmailAndPassword,
  refreshAuth,
  resetPassword,
  verifyEmail,
  findUser,
  encryptPassword,
  decryptPassword,
  findUserByToken,
  logout,
  changeUserPassword,
};
