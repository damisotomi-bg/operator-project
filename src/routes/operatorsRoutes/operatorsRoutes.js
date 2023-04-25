const express = require('express')
const operatorsRoutes = express.Router()
const verifyToken = require('../../middleware/verifyToken')
const getUserFromToken = require('../../middleware/getUserFromToken')
const verifyUserOperatorStatus = require('../../middleware/verfiyUserOperatorStatus')
const operatorsController = require('../../controllers/operatorsControllers/operatorsControllers')


operatorsRoutes.post('/completeRegistration', verifyToken, getUserFromToken,
    verifyUserOperatorStatus, operatorsController.completeRegistration)




module.exports = operatorsRoutes