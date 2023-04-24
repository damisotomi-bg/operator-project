const pool = require('../../db')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()



const insertNewUser = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await pool.connect()
            const sql = `INSERT INTO users(
                email, password, isoperator)
                VALUES ($1, $2, $3)
                RETURNING *;`;

            const hash = bcrypt.hashSync(
                req.validatedData.password + process.env.BCRYPT_PASSWORD,
                parseInt(process.env.SALT_ROUNDS)
            );
            const values = [req.validatedData.email, hash, req.validatedData.isoperator];
            const result = await conn.query(sql, values)
            conn.release()

            resolve(result.rows[0])


        } catch (error) {
            reject(error)
        }
    })
}

const getUserObject = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = req.body
            const conn = await pool.connect()
            const sql = 'SELECT * from users where email =($1);'
            const result = await conn.query(sql, [email])
            const rows = result.rows
            conn.release()

            if (rows.length) {
                const passwordMatch = await bcrypt.compare(password + process.env.BCRYPT_PASSWORD, rows[0].password)
                if (passwordMatch) {
                    resolve(rows[0])
                }
                else {
                    reject("Email and/or password do not match")
                }
            }
            else {
                reject("Invalid User")
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = { insertNewUser, getUserObject }