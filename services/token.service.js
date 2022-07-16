const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');


const generateToken = (userId, expires, type, secret = config.jwt.secret) => {

};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {

};


const verifyToken = async (token, type) => {

};

const generateAuthTokens = async (user) => {

};


const generateResetPasswordToken = async (email) => {

};


const generateVerifyEmailToken = async (user) => {
    
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
};
