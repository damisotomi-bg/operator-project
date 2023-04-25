const statesDao = require('../../dao/statesDao/statesDao')


const getAllStates = async (req, res) => {
    try {
        const result = await statesDao.getAllStates()
        res.status(201).send({ result })

    } catch (error) {
        console.log("Error retieving states data:", error);
        res.status(400).send({ error });
    }
}

const getAStateLgas = async (req, res) => {
    try {
        const result = await statesDao.getAStateLgas(req)
        res.status(201).send({ result })

    } catch (error) {
        console.log("Error retieving states data:", error);
        res.status(400).send({ error });
    }
}

module.exports = { getAllStates, getAStateLgas }