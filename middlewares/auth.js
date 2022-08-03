const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    });
}

const authenticateAdmin = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403);
        req.user = user;
        if (user.role !== 'admin') return res.sendStatus(403)
        next()
    });
}

const authenticateResetPasswordToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.JWT_FORGET_PASSWORD_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403);
        req.email = user.email;
        next()
    });
}

module.exports = {
    authenticateToken,
    authenticateAdmin,
    authenticateResetPasswordToken
};
