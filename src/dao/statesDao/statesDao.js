const pool = require('../../db')

const getAllStates = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await pool.connect()
            const sql = 'SELECT * from states;'
            const result = await conn.query(sql)
            const rows = result.rows
            conn.release()

            resolve(rows)

        } catch (error) {
            reject(error)
        }
    })
}
const getAStateLgas = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { state_id } = req.params
            const conn = await pool.connect()
            const sql = 'SELECT * from lgas where state_id =($1);'
            const result = await conn.query(sql, [state_id])
            const rows = result.rows
            conn.release()

            resolve(rows)

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { getAllStates, getAStateLgas }