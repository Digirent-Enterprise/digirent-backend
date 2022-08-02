const jwt = require('jsonwebtoken');

const generateAccessToken = async (user) => {
    return await jwt.sign({ user_id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        }, {});
};


const generateRefreshToken = async (user) => {
    return await jwt.sign({ user_id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION_DAYS,
        }, {});
}


const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return;
            const accessToken = await generateAccessToken(user);
            return {accessToken}
        }
    );
};

const generateResetPasswordToken = async (email) => {
    return await jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_SECRET,
        {
            expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRED_TIME,
        }, {});
};


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    generateResetPasswordToken,
};
