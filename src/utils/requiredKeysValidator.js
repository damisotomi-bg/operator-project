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


module.exports = requiredKeysValidator