const jwt = require('jsonwebtoken')

const getUserFromToken = (req, res, next) => {
    try {
        const jwtToken = req.headers.authorization
        const decodedToken = jwt.decode(jwtToken)
        const user = decodedToken.user
        req.user = user
        next()

    } catch (error) {
        res.status(401).json(`Error extracting user object from token- ${error}`)
    }

}


module.exports = getUserFromToken