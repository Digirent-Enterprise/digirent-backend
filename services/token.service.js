const jwt = require('jsonwebtoken');

const generateAccessToken = async (user) => {
    return jwt.sign({ user_id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        }, {});
};


const generateRefreshToken = async (user) => {
    return jwt.sign({ user_id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
        }, {});
}


const verifyToken = async (token, type) => {

};

const generateAuthTokens = async (user) => {

};


const generateResetPasswordToken = async (email) => {

};


const generateVerifyEmailToken = async (user) => {

};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
};
