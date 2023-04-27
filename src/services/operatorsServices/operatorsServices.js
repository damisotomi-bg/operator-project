const validator = require('validator');
const requiredKeysValidator = require('../../utils/requiredKeysValidator')
const pool = require('../../db')
const fs = require('fs')

const checkCorrectStateAndLgaId = (lga_id, state_id) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        try {
            conn = await pool.connect()
            const stateSql = 'SELECT * from states where state_id =($1);'
            const stateresult = await conn.query(stateSql, [state_id])
            const state = stateresult.rows[0]
            if (!state) reject("Invalid State_id provided.")

            const lgasSql = 'SELECT * from lgas where state_id =($1);'
            const lgasresult = await conn.query(lgasSql, [state_id])
            const allLgas = lgasresult.rows

            const sql = 'SELECT * from lgas where state_id =($1) and lga_id = ($2);'
            const result = await conn.query(sql, [state_id, lga_id])
            const lga = result.rows[0]
            if (!lga) reject({ "Invalid Lga_id for state_id provided. Valid Lga id Include": allLgas })


            resolve(true)
        }

        catch (error) {
            reject(error)
        }
        finally {
            conn.release()
        }
    })
}

const checkCorrectProductAndSeedTypeId = (operator_id, product_id, seed_type_id) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        try {
            conn = await pool.connect()
            const productSql = 'SELECT * from products where product_id =($1);'
            const productresult = await conn.query(productSql, [product_id])
            const product = productresult.rows[0]
            if (!product) reject("Invalid Product_id provided.")

            const allSeedTypeSql = 'SELECT * from seed_types where product_id=($1);'
            const allSeedTypeResult = await conn.query(allSeedTypeSql, [product_id])
            const allSeedTypes = allSeedTypeResult.rows

            const seedTypeSql = 'SELECT * from seed_types where seed_type_id =($1) and product_id=($2);'
            const seedTypeResult = await conn.query(seedTypeSql, [seed_type_id, product_id])
            const seedType = seedTypeResult.rows[0]
            if (!seedType) reject({ "Invalid Seed Type_id for product_id provided. Valid Seed_type_id Include": allSeedTypes })

            const sql = 'SELECT * from operator_selections where operator_id =($1) and seed_type_id =($2) and product_id=($3)'
            const result = await conn.query(sql, [operator_id, seed_type_id, product_id])
            const operatorSelection = result.rows[0]
            if (operatorSelection) reject("Product ID and SeedType ID combination already selected for this operator")

            resolve(true)
        }

        catch (error) {
            reject(err)
        }
        finally {
            conn.release()
        }

    })

}

const validateOperatorsData = (req) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = req.user
            const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

            const { firstname, lastname, phonenumber, nationality, state_id, lga_id, sex, dateofbirth, nin } = req.body

            const requiredKeys = ["firstname", "lastname", "phonenumber", "nationality", "state_id", "lga_id", "sex", "dateofbirth",
                "nin", "picture"]

            await requiredKeysValidator(req, requiredKeys)

            if (!firstname || !lastname || !phonenumber || !nationality || !state_id || !lga_id || !sex || !dateofbirth || !nin) {
                reject("firstname, lastname, phonenumber, nationality, state_id, lga_id, sex, dateofbirth, nin and picture must be provided")
            }

            else if (!(firstname.trim() && lastname.trim() && phonenumber.trim() && nationality.trim() && state_id.trim() && lga_id.trim()
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
                if (!validator.isInt(state_id)) reject('Invalid State id. Integer expected')
                if (!validator.isInt(lga_id)) reject('Invalid Lga id. Integer expected')
                await checkCorrectStateAndLgaId(lga_id, state_id)
                if (!validator.isIn(sex, ['male', 'female'])) reject("Invalid Sex. Only 'male' and 'female' are allowed")
                if (!validator.isDate(dateofbirth)) reject('Invalid Date of birth. Use format yyyy-mm-dd')
                if (!validator.isNumeric(nin)) reject('Invalid Nin. Only Numbers are allowed')

                const picture = fs.readFileSync(req.file.path)

                req.validatedData = {
                    user_id: user.user_id, firstname: firstname, lastname: lastname, phonenumber: phonenumber,
                    nationality: nationality, state_id: state_id, lga_id: lga_id, sex: sex, dateofbirth: dateofbirth,
                    nin: nin, picture: picture
                }
            }

            resolve(true)

        } catch (error) {
            reject(error)
        }
    })
}

const validateSelections = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = req.user
            const operator_id = req.operator.operator_id

            const { product_id, seed_type_id } = req.body

            const requiredKeys = ["product_id", "seed_type_id"]
            await requiredKeysValidator(req, requiredKeys)

            if (!product_id || !seed_type_id) {
                reject("Product_id and seed_type_id must be provided")
            }

            else if (!(product_id.trim() && seed_type_id.trim())) {
                reject("Product_id and seed_type_id must be provided")
            }
            else {
                if (!validator.isInt(product_id)) reject('Invalid Product id. Integer expected')
                if (!validator.isInt(seed_type_id)) reject('Invalid Seed type id. Integer expected')
                await checkCorrectProductAndSeedTypeId(operator_id, product_id, seed_type_id)

                req.validatedData = { product_id: product_id, operator_id: operator_id, seed_type_id: seed_type_id }
            }

        } catch (error) {
            reject(error)
        }
    })

}



module.exports = { validateOperatorsData, validateSelections }