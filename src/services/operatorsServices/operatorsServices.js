const validator = require('validator');
const requiredKeysValidator = require('../../utils/requiredKeysValidator')
const pool = require('../../db')

const checkCorrectLgaId = async (lga_id, state_id) => {
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
            throw new Error({ "Invalid Lga_id for state_id provided. Valid Lga id Include": allLgas })
        }
        else {

            return (true)
        }


    } catch (error) {
        throw (error)
    }
}

const validateOperatorsData = async (req) => {
    try {
        const user = req.user
        const { firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin } = req.body

        const requiredKeys = ["firstname", "lastname", "phonenumber", "nationality", "state", "lga", "sex", "dateofbirth",
            "nin", "picture"]

        await requiredKeysValidator(req, requiredKeys)

        if (!firstname || !lastname || !phonenumber || !nationality || !state || !lga || !sex || !dateofbirth || !nin) {
            throw new Error("firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided")
        }

        else if (!(firstname.trim() && lastname.trim() && phonenumber.trim() && nationality.trim() && state.trim() && lga.trim()
            && sex.trim() && dateofbirth.trim() && nin.trim())) {
            throw new Error("firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided")
        }

        else {
            if (!validator.isNumeric(phonenumber)) throw new Error('Invalid Phone number. Only Numbers are allowed')
            if (!validator.isInt(state)) throw new Error('Invalid State id. Integer expected')
            if (!validator.isInt(lga)) throw new Error('Invalid Lga id. Integer expected')
            await checkCorrectLgaId(lga, state)
            if (!validator.isIn(sex, ['male', 'female'])) throw new Error("Invalid Sex. Only 'male' and 'female' are allowed")
            if (!validator.isDate(dateofbirth)) throw new Error('Invalid Date of birth. Use format yyyy-mm-dd')
            if (!validator.isNumeric(nin)) throw new Error('Invalid Nin. Only Numbers are allowed')

            req.validatedData = {
                user_id: user.user_id, firstname: firstname, lastname: lastname, phonenumber: phonenumber,
                nationality: nationality, state: state, lga: lga, sex: sex, dateofbirth: dateofbirth,
                nin: nin
            }
        }

        return (true)

    } catch (error) {
        throw (error)
    }
}


module.exports = { validateOperatorsData }