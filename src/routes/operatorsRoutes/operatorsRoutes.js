const express = require('express')
const operatorsRoutes = express.Router()
const verifyToken = require('../../middleware/verifyToken')
const getUserFromToken = require('../../middleware/getUserFromToken')
const verifyUserOperatorStatus = require('../../middleware/verfiyUserOperatorStatus')
const checkOperatorVerificationStatus = require('../../middleware/checkOperatorVerificationStatus')
const operatorsController = require('../../controllers/operatorsControllers/operatorsControllers')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

operatorsRoutes.post('/completeRegistration', verifyToken, getUserFromToken,
    verifyUserOperatorStatus, upload.single('picture'), operatorsController.completeRegistration)

operatorsRoutes.post('/selectProductSeedType', verifyToken, getUserFromToken,
    verifyUserOperatorStatus, checkOperatorVerificationStatus, operatorsController.selectProductSeedType)




module.exports = operatorsRoutes