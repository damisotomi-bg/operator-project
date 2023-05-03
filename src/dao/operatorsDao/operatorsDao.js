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

                const insertResult = await conn.query(sql, values)
                const initialOutput = insertResult.rows[0]

                // Get the state object
                const stateSql = 'SELECT * FROM states WHERE state_id = ($1)';
                const stateValue = [initialOutput.state_id];
                const stateResult = await conn.query(stateSql, stateValue);
                const state = stateResult.rows[0];

                // Get the LGA object
                const lgaSql = 'SELECT lga_id, lga FROM lgas WHERE lga_id = ($1)';
                const lgaValue = [initialOutput.lga_id];
                const lgaResult = await conn.query(lgaSql, lgaValue);
                const lga = lgaResult.rows[0];

                conn.release()

                const newPicturePath = `uploads/${req.file.originalname}`

                fs.unlinkSync(req.file.path);
                fs.writeFileSync(newPicturePath, req.validatedData.picture);

                const finalOutput = {
                    id: initialOutput.id,
                    operator_id: initialOutput.operator_id,
                    fullname: initialOutput.fullname,
                    phonenumber: initialOutput.phonenumber,
                    nationality: initialOutput.nationality,
                    state: state,
                    lga: lga,
                    sex: initialOutput.sex,
                    dateofbirth: initialOutput.dateofbirth,
                    nin: initialOutput.nin,
                    isverified: initialOutput.isverified,
                    user_id: initialOutput.user_id,
                    created_at: initialOutput.created_at,
                    updated_at: initialOutput.updated_at,
                    picture: "Uploaded Successfully"
                }

                resolve(finalOutput)

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
            const conn = await pool.connect()

            const sql = `INSERT INTO operator_selections(
                operator_id, product_id, seed_type_id)
                VALUES ($1, $2, $3)
                    RETURNING *;`;

            const values = [req.validatedData.operator_id, req.validatedData.product_id, req.validatedData.seed_type_id];

            const result = await conn.query(sql, values)
            const initialOutput = result.rows[0]


            // Get the Product object
            const productSql = 'SELECT * FROM products WHERE product_id = ($1)';
            const productValue = [initialOutput.product_id];
            const productResult = await conn.query(productSql, productValue);
            const product = productResult.rows[0];

            // Get the Seed type object
            const seedTypeSql = 'SELECT seed_type_id, seed_type FROM Seed_types WHERE seed_type_id = ($1)';
            const seedTypeValue = [initialOutput.seed_type_id];
            const seedTypeResult = await conn.query(seedTypeSql, seedTypeValue);
            const seedType = seedTypeResult.rows[0];

            conn.release()

            const finalOutput = {
                id: initialOutput.id,
                operator_id: initialOutput.operator_id,
                product: product,
                seedType: seedType,
            }

            resolve(finalOutput)


        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { insertOperatorsData, insertOperatorsSelections }