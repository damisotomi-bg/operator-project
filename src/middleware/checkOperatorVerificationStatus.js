const pool = require('../db')

const checkOperatorVerificationStatus = async (req, res, next) => {
    try {
        const user = req.user
        const conn = await pool.connect()
        const sql = 'SELECT * from operators where user_id =($1);'
        const result = await conn.query(sql, [user.user_id])
        const operator = result.rows[0]
        conn.release()

        if (operator.isverified) {
            next()
        }
        else {
            res.status(401).json('Account Unverified. Contact Admin ')
        }
    } catch (error) {
        res.status(401).json(`Error verifying user operator status- ${err}`)
    }

}

module.exports = checkOperatorVerificationStatus