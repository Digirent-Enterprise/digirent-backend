const catchAsync = require('../utils/catchAsync');
const {AuthService, UserService, TokenService} = require('../services');
const bcrypt = require('bcryptjs')

const register = catchAsync(async (req, res) => {
    const {email, pw1, pw2, phone, name} = req.body;
    console.log('req.body', req.body)
    if (!(email && pw1 && pw2 && phone)) {
        res.status(400).send("All input is required");
    }

    const user = await AuthService.findUser({email});
    if (user) {
        return res.status(400).send("User Already Exist");
    }

    if (pw1.toLowerCase() !== pw2.toLowerCase()) {
        return res.status(400).send("Password doest not match");
    }
    const encryptedPassword = await AuthService.encryptPassword(pw1);
    const currentTime = (new Date()).toLocaleDateString()
    await UserService.createUser(name, email, encryptedPassword, 'user', false, '', phone, currentTime);

    return res.sendStatus(201)
});


const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const found = await AuthService.findUser({email});
    if (found) {
        if (bcrypt.compare(password, found.password)) {
            const response = await AuthService.loginUserWithEmailAndPassword(found);
            return res.status(200).json(response)
        }
    }
    return res.sendStatus(404);
});

const logout = catchAsync(async (req, res) => {
    const {email} = req.body;
    const user = await AuthService.logout(email);
    if (!user) return res.status(404).send('Something\'s wrong.cannot delete this user!')
    return res.status(200).send("logout successfully. Refresh token has been revoked.");
});

const refreshTokens = catchAsync(async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) return res.sendStatus(401);
    const found = await AuthService.findUserByToken(refreshToken);
    if (!found) return res.sendStatus(401);
    const newAccessToken = await TokenService.verifyToken(refreshToken);
    if (!newAccessToken) {
        return res.send(403)
    }
    return res.json(newAccessToken)
});

const forgotPassword = catchAsync(async (req, res) => {

});

const resetPassword = catchAsync(async (req, res) => {

});

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
};
