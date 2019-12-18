const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(req.header('auth-token'), process.env.SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.send(400).send('Invalid Token');
    }
}

module.exports = auth;