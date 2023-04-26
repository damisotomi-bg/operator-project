const pool = require('../../db')

const insertOperatorsData = async (req) => {

    try {
        const conn = await pool.connect()

        const checkSql = 'select * from operators where user_id = ($1)'
        const checkValues = [req.validatedData.user_id]
        const checkResult = await conn.query(checkSql, checkValues)
        const operator = checkResult.rows[0]

        if (!operator) {
            const sql = `INSERT INTO operators(
                firstname,lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING *;`;

            const values = [req.validatedData.firstname, req.validatedData.lastname, req.validatedData.phonenumber,
            req.validatedData.nationality, req.validatedData.state, req.validatedData.lga, req.validatedData.sex,
            req.validatedData.dateofbirth, req.validatedData.nin, req.validatedData.user_id];

            const result = await conn.query(sql, values)
            conn.release()

            return (result.rows[0])

        }
        else {
            throw new Error('Operator profile already created for this user')
        }


    } catch (error) {
        throw (error)
    }
}


module.exports = { insertOperatorsData }