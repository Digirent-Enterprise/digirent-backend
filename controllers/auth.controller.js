const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { AuthService, UserService, TokenService } = require('../services');

const register = catchAsync(async (req, res) => {

});

const login = catchAsync(async (req, res) => {

});

const logout = catchAsync(async (req, res) => {

});

const refreshTokens = catchAsync(async (req, res) => {

});

const forgotPassword = catchAsync(async (req, res) => {

});

const resetPassword = catchAsync(async (req, res) => {

});

const sendVerificationEmail = catchAsync(async (req, res) => {

});

const verifyEmail = catchAsync(async (req, res) => {

});

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
};
