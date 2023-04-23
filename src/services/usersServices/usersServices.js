const usersDao = require('../../dao/usersDao/usersDao')
const pool = require('../../db')
const validator = require('validator');

const requiredKeysValidator = (req, requiredKeysArray) => {
    return new Promise((resolve, reject) => {
        for (const key in req.body) {
            if (!requiredKeysArray.includes(key)) {
                reject(`'${key}' not expected. Only ${requiredKeysArray} are allowed`);
            }
        }
        resolve(true)
    })

}

const checkDuplicateEmail = (req) => {
    return new Promise(async (resolve, reject) => {
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

            resolve(check)

        } catch (error) {
            reject(error)
        }
    })
}



const validateUserSignupData = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password, isOperator } = req.body

            const requiredKeys = ["email", "password", "isOperator"]

            await requiredKeysValidator(req, requiredKeys)

            if (!email || !password) {
                reject("Email and password must be provided. isOperator is optional but will be taken as false if not provided")
            }

            else if (!(email.trim() && password.trim())) {
                reject("Email and password must be provided. isOperator is optional but will be taken as false if not provided")
            }

            else if (await checkDuplicateEmail(req)) {
                reject("Email already exists")
            }
            else if (!validator.isEmail(email)) {
                reject('Invalid Email Address')
            }
            else {
                req.validatedData = { email: email, password: password, isOperator: isOperator === undefined ? false : isOperator }
            }

            resolve(true)

        } catch (error) {
            reject(error)
        }

    })
}




const validateRequestBody = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const requiredKeys = ["email", "password"]
            await requiredKeysValidator(req, requiredKeys)

            const { email, password } = req.body

            if (!email || !password) {
                reject("Email and password must be provided")
            }

            else if (!(email.trim() && password.trim())) {
                reject("Email and password must be provided")
            }
            else {
                resolve(true)
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { validateUserSignupData, validateRequestBody }