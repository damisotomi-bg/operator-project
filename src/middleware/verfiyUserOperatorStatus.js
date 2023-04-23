

const verifyUserOperatorStatus = (req, res, next) => {
    try {
        const user = req.user
        if (user.isoperator) {
            next()
        }
        else {
            res.status(401).json('You dont have permission to access this route. Login with an operator account')
        }
    } catch (error) {
        res.status(401).json(`Error verifying user operator status- ${err}`)
    }

}

module.exports = verifyUserOperatorStatus