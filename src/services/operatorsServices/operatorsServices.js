const validator = require('validator');
const requiredKeysValidator = require('../../utils/requiredKeysValidator')


const validateOperatorsData = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = req.user
            const { firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin, picture } = req.body

            const requiredKeys = ["firstname", "lastname", "phonenumber", "nationality", "state", "lga", "sex", "dateofbirth",
                "nin", "picture"]

            await requiredKeysValidator(req, requiredKeys)

            if (!firstname || !lastname || !phonenumber || !nationality || !state || !lga || !sex || !dateofbirth || !nin
                || !picture) {
                reject("firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided")
            }

            else if (!(firstname.trim() && lastname.trim() && phonenumber.trim() && nationality.trim() && state.trim() && lga.trim()
                && sex.trim() && dateofbirth.trim() && nin.trim() && picture.trim())) {
                reject("firstname, lastname, phonenumber, nationality, state, lga, sex, dateofbirth, nin and picture must be provided")
            }
            else {
                req.validatedData = {
                    firstname: firstname, lastname: lastname, nationality: nationality, state: state, lga: lga,
                    sex: sex, dateofbirth: dateofbirth, nin: nin, picture: picture
                }
            }

            resolve(true)

        } catch (error) {
            reject(error)
        }

    })
}


module.exports = { validateOperatorsData }