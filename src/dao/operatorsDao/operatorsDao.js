const pool = require('../../db')
const fs = require('fs')

const insertOperatorsData = (req) => {

    return new Promise(async (resolve, reject) => {

        try {
            const conn = await pool.connect()

            const checkSql = 'select * from operators where user_id = ($1)'
            const checkValues = [req.validatedData.user_id]
            const checkResult = await conn.query(checkSql, checkValues)
            const operator = checkResult.rows[0]

            if (!operator) {
                const sql = `INSERT INTO operators(
                    firstname,lastname, phonenumber, nationality, state_id, lga_id, sex, dateofbirth, nin, picture, user_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING *;`;

                const values = [req.validatedData.firstname, req.validatedData.lastname, req.validatedData.phonenumber,
                req.validatedData.nationality, req.validatedData.state_id, req.validatedData.lga_id, req.validatedData.sex,
                req.validatedData.dateofbirth, req.validatedData.nin, req.validatedData.picture, req.validatedData.user_id];

                const result = await conn.query(sql, values)
                conn.release()

                const newPicturePath = `uploads/${req.file.originalname}`

                fs.unlinkSync(req.file.path);
                fs.writeFileSync(newPicturePath, req.validatedData.picture);

                resolve(result.rows[0])

            }
            else {
                reject('Operator profile already created for this user')
            }


        } catch (error) {
            reject(error)
        }
    })
}


const insertOperatorsSelections = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `INSERT INTO operator_selections(
                operator_id, product_id, seed_type_id)
                VALUES ($1, $2, $3)
                    RETURNING *;`;

            const values = [req.validatedData.operator_id, req.validatedData.product_id, req.validatedData.seed_type_id];

            const result = await conn.query(sql, values)

            conn.release()

            resolve(result.rows[0])


        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { insertOperatorsData, insertOperatorsSelections }