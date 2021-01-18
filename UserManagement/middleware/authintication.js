const jwt = require('jsonwebtoken');
const jwtKey = 'hakonaMatata'
const loginHeader = 'x-auth-token'

module.exports.auth = (req, res, next) => {
    let token = req.header(loginHeader);
    if (!token) return res.status(401).send('Unauthorized, No token provided');

    try {
        token = jwt.verify(token, jwtKey);
        req.user = token;
        next();
    } catch (ex) {
        return res.status(401).send('Invalid Token');
    }
}

module.exports.createToken = (user) => {
    let token = jwt.sign(user, jwtKey, {
        expiresIn: '24h'
    });
    return token
};