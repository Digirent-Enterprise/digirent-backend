const ApiError = require('../utils/ApiError');
const {User} = require("../models");
const bcrypt = require('bcryptjs')
const {TokenService, UserService} = require("./index");

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}


const decryptPassword = async (password) => {
    return await bcrypt.decode(password, 10);
}


const findUser = async (email) => {
    return  User.findOne(email);
}

const loginUserWithEmailAndPassword = async (user) => {
    const accessToken = await TokenService.generateAccessToken(user);
    const refreshToken = await TokenService.generateRefreshToken(user);
    await UserService.updateUser(user.email, refreshToken);
    return {
        accessToken, refreshToken
    }
};




const logout = async (refreshToken) => {

};


const refreshAuth = async (refreshToken) => {

};

const resetPassword = async (resetPasswordToken, newPassword) => {

};

const verifyEmail = async (verifyEmailToken) => {

};

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail,
    findUser,
    encryptPassword,
    decryptPassword
};
