const pool = require('../../db')

const insertOperatorsData = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await pool.connect()
            const sql = `INSERT INTO operators(
                firstname,lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin, picture)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *;`;

            const values = [req.validatedData.firstname, req.validatedData.lastname, req.validatedData.phonenumber,
            req.validatedData.nationality, req.validatedData.state, req.validatedData.lga, req.validatedData.sex,
            req.validatedData.dateofbirth, req.validatedData.nin, req.validatedData.picture];

            const result = await conn.query(sql, values)
            conn.release()

            resolve(result.rows[0])


        } catch (error) {
            reject(error)
        }
    })
}


module.exports = { insertOperatorsData }