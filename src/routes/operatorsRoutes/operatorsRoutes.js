const express = require('express')
const operatorsRoutes = express.Router()
const verifyToken = require('../../middleware/verifyToken')
const getUserFromToken = require('../../middleware/getUserFromToken')
const verifyUserOperatorStatus = require('../../middleware/verfiyUserOperatorStatus')


operatorsRoutes.post('/completeRegistration', verifyToken, getUserFromToken, verifyUserOperatorStatus)




module.exports = operatorsRoutes