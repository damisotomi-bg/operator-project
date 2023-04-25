const express = require('express')
const statesRouter = express.Router()
const statesController = require('../../controllers/statesControllers/statesController')

statesRouter.get('/', statesController.getAllStates)
statesRouter.get('/:state_id/lgas', statesController.getAStateLgas)




module.exports = statesRouter