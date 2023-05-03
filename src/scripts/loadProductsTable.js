const pool = require('../db')

const loadProductsTable = async () => {
    let conn;
    try {
        conn = await pool.connect()
        const checkSql = 'SELECT COUNT(*) FROM products';
        const rows = await conn.query(checkSql)
        const rowCount = rows.rows[0].count
        if (rowCount == 0) {
            const insertSql = `INSERT INTO products (product)
            VALUES 
                      ('Maize'),
                      ('Rice')           
                        RETURNING *;`;
            const result = await conn.query(insertSql)
            console.log('Products Table loaded successfully');
        }
        console.log('Products Table Already loaded');

    } catch (error) {
        console.log(error);
    }
    finally {
        conn.release()
    }
}

loadProductsTable()

module.exports = loadProductsTable