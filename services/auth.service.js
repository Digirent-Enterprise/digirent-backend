const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');


const loginUserWithEmailAndPassword = async (email, password) => {

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
};
