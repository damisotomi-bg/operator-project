const pool = require('../db')

const checkOperatorVerificationStatus = async (req, res, next) => {
    let conn
    try {
        const user = req.user
        conn = await pool.connect()
        const sql = 'SELECT * from operators where user_id =($1);'
        const result = await conn.query(sql, [user.user_id])
        const operator = result.rows[0]

        req.operator = operator
        if (operator) {
            if (operator.isverified) {
                next()
            }
            else {
                res.status(401).json('Account Unverified. Contact Admin ')
            }
        }
        else {
            res.status(401).json('Unauthorized access. Complete operator registration ')
        }
    } catch (error) {
        res.status(401).json(`Error verifying user operator status- ${error}`)
    }
    finally {
        conn.release()
    }

}

module.exports = checkOperatorVerificationStatus