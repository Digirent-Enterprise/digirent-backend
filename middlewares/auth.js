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
    console.log('auth token', authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403);
        req.user = user;
        if (user.role !== 'admin') return res.sendStatus(403)
        next()
    });
}

module.exports = {
    authenticateToken,
    authenticateAdmin
};
