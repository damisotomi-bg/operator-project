const usersServices = require('../../services/usersServices/usersServices')
const usersDao = require('../../dao/usersDao/usersDao')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        await usersServices.validateUserSignupData(req)
        const result = await usersDao.insertNewUser(req)
        res.status(201).json(result)
    } catch (error) {
        console.log("Error creating user data:", error);
        res.status(400).send({ error });;
    }
}


const authenticateUser = async (req, res) => {
    try {
        await usersServices.validateRequestBody(req)
        const result = await usersDao.getUserObject(req)
        let token = jwt.sign({ user: result }, process.env.TOKEN_SECRET, { expiresIn: 3600 })
        res.status(201).send({ result, token })

    } catch (error) {
        console.log("Error at login:", error);
        res.status(400).send({ error });
    }
}


module.exports = { createUser, authenticateUser }