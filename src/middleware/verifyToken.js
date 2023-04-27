const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        jwt.verify(authorizationHeader, process.env.TOKEN_SECRET);

        next();

    } catch (error) {
        res.status(401).json(`Invalid token- ${error}`)
    }
};


module.exports = verifyToken