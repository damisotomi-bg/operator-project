const operatorsServices = require('../../services/operatorsServices/operatorsServices')
const operatorsDao = require('../../dao/operatorsDao/operatorsDao')



const completeRegistration = async (req, res) => {
    try {
        await operatorsServices.validateOperatorsData(req)
        const result = await operatorsDao.insertOperatorsData(req)
        res.status(201).json(result)
    } catch (error) {
        console.log("Error completing operator registration:", error);
        res.status(400).send({ error });;
    }
}


const selectProductSeedType = async (req, res) => {
    try {
        await operatorsServices.validateSelections(req)
        const result = await operatorsDao.insertOperatorsSelections(req)
        res.status(201).json(result)
    } catch (error) {
        console.log("Error saving selections:", error);
        res.status(400).send({ error });;
    }
}

module.exports = { completeRegistration, selectProductSeedType }