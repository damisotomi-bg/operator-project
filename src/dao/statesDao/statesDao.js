const pool = require('../../db')

const getAllStates = async () => {
    try {
        const conn = await pool.connect()
        const sql = 'SELECT * from states;'
        const result = await conn.query(sql)
        const rows = result.rows
        conn.release()

        return (rows)

    } catch (error) {
        throw (error)
    }
}

const getAStateLgas = async (req) => {
    try {
        const { state_id } = req.params
        const conn = await pool.connect()
        const sql = 'SELECT lgas.lga_id, lgas.lga, states.state as State FROM lgas JOIN states ON lgas.state_id = states.state_id WHERE lgas.state_id = $1;'
        const result = await conn.query(sql, [state_id])
        const rows = result.rows
        conn.release()
        console.log(rows);
        return (rows)


    } catch (error) {
        throw (error)
    }

}

module.exports = { getAllStates, getAStateLgas }