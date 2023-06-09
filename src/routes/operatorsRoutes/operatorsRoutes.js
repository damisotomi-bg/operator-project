const express = require('express')
const operatorsRoutes = express.Router()
const verifyToken = require('../../middleware/verifyToken')
const getUserFromToken = require('../../middleware/getUserFromToken')
const verifyUserOperatorStatus = require('../../middleware/verfiyUserOperatorStatus')
const checkOperatorVerificationStatus = require('../../middleware/checkOperatorVerificationStatus')
const operatorsController = require('../../controllers/operatorsControllers/operatorsControllers')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

//to complete registration
operatorsRoutes.post('/me', verifyToken, getUserFromToken,
    verifyUserOperatorStatus, upload.single('picture'), operatorsController.completeRegistration)

//select product and seedtypes
operatorsRoutes.post('/selectProductSeedType', verifyToken, getUserFromToken,
    verifyUserOperatorStatus, checkOperatorVerificationStatus, operatorsController.selectProductSeedType)




module.exports = operatorsRoutes