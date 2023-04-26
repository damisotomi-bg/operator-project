const validator = require('validator');
const requiredKeysValidator = require('../../utils/requiredKeysValidator')
const pool = require('../../db')
const fs = require('fs')

const checkCorrectLgaId = (lga_id, state_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await pool.connect()
            const lgasSql = 'SELECT * from lgas where state_id =($1);'
            const lgasresult = await conn.query(lgasSql, [state_id])
            const allLgas = lgasresult.rows

            const sql = 'SELECT * from lgas where state_id =($1) and lga_id = ($2);'
            const result = await conn.query(sql, [state_id, lga_id])
            const lga = result.rows[0]
            conn.release()

            if (!lga) {
                reject({ "Invalid Lga_id for state_id provided. Valid Lga id Include": allLgas })
            }
            else {
                resolve(true)
            }
        }

        catch (error) {
            reject(error)
        }
    })
}

const validateOperatorsData = (req) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = req.user
            const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

            const { firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin } = req.body

            const requiredKeys = ["firstname", "lastname", "phonenumber", "nationality", "state", "lga", "sex", "dateofbirth",
                "nin", "picture"]

            await requiredKeysValidator(req, requiredKeys)

            if (!firstname || !lastname || !phonenumber || !nationality || !state || !lga || !sex || !dateofbirth || !nin) {
                reject("firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided")
            }

            else if (!(firstname.trim() && lastname.trim() && phonenumber.trim() && nationality.trim() && state.trim() && lga.trim()
                && sex.trim() && dateofbirth.trim() && nin.trim())) {
                reject("firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided")
            }

            else if (!req.file) {
                reject('Upload a Picture')
            }
            else if (!allowedImageMimeTypes.includes(req.file.mimetype)) {
                reject('Upload an image as picture')
            }
            else {
                if (!validator.isNumeric(phonenumber)) reject('Invalid Phone number. Only Numbers are allowed')
                if (!validator.isInt(state)) reject('Invalid State id. Integer expected')
                if (!validator.isInt(lga)) reject('Invalid Lga id. Integer expected')
                await checkCorrectLgaId(lga, state)
                if (!validator.isIn(sex, ['male', 'female'])) reject("Invalid Sex. Only 'male' and 'female' are allowed")
                if (!validator.isDate(dateofbirth)) reject('Invalid Date of birth. Use format yyyy-mm-dd')
                if (!validator.isNumeric(nin)) reject('Invalid Nin. Only Numbers are allowed')

                const picture = fs.readFileSync(req.file.path)

                req.validatedData = {
                    user_id: user.user_id, firstname: firstname, lastname: lastname, phonenumber: phonenumber,
                    nationality: nationality, state: state, lga: lga, sex: sex, dateofbirth: dateofbirth,
                    nin: nin, picture: picture
                }
            }

            resolve(true)

        } catch (error) {
            reject(error)
        }
    })
}


module.exports = { validateOperatorsData }