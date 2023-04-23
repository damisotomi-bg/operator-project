const express = require('express')
const usersRouter = express.Router()
const usersController = require('../../controllers/usersControllers/usersControllers')



usersRouter.post('/signup', usersController.createUser)
usersRouter.post('/login', usersController.authenticateUser)



module.exports = usersRouter