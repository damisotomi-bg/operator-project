const usersDao = require('../../dao/usersDao/usersDao')
const pool = require('../../db')
const validator = require('validator');
const requiredKeysValidator = require('../../utils/requiredKeysValidator')

const checkDuplicateEmail = async (req) => {
    try {
        const email = req.body.email

        const conn = await pool.connect()
        const sql = 'SELECT email from users;'
        const result = await conn.query(sql)
        const rows = result.rows
        conn.release()

        const check = rows.find((user) => {
            return user.email.trim() === email.trim()
        })

        return (check)

    } catch (error) {
        throw (error)
    }
}

const validateUserSignupData = async (req) => {
    try {
        const { email, password, isoperator } = req.body

        const requiredKeys = ["email", "password", "isoperator"]

        await requiredKeysValidator(req, requiredKeys)

        if (!email || !password) {
            throw new Error("Email and password must be provided. isoperator is optional but will be taken as false if not provided")
        }

        else if (!(email.trim() && password.trim())) {
            throw new Error("Email and password must be provided. isoperator is optional but will be taken as false if not provided")
        }

        else if (await checkDuplicateEmail(req)) {
            throw new Error("Email already exists")
        }
        else if (!validator.isEmail(email)) {
            throw new Error('Invalid Email Address')
        }
        else {
            req.validatedData = { email: email, password: password, isoperator: isoperator === undefined ? false : isoperator }
            return (true)
        }


    } catch (error) {
        throw (error)
    }
}




const validateRequestBody = async (req) => {
    try {
        const requiredKeys = ["email", "password"]
        await requiredKeysValidator(req, requiredKeys)

        const { email, password } = req.body

        if (!email || !password) {
            throw new Error("Email and password must be provided")
        }

        else if (!(email.trim() && password.trim())) {
            throw new Error("Email and password must be provided")
        }
        else {
            return (true)
        }

    } catch (error) {
        throw (error)
    }
}

module.exports = { validateUserSignupData, validateRequestBody }