const operatorsServices = require('../../services/operatorsServices/operatorsServices')
const operatorsDao = require('../../dao/operatorsDao/operatorsDao')



const completeRegistration = async (req) => {
    try {
        await operatorsServices.validateOperatorsData(req)
        const result = await operatorsDao.insertOperatorsData(req)
        res.status(201).json(result)
    } catch (error) {
        console.log("Error completing operator registration:", error);
        res.status(400).send({ error });;
    }
}

module.exports = { completeRegistration }