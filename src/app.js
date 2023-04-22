const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const port = process.env.PORT || process.env.port

const app = express()

//configure cors
app.use(cors({ origin: /http:\/\/localhost/ }))
app.options('*', cors())


app.get('/', (req, res) => {
    res.send("Ok")
})

//for when the client navigates to a route not listed in any of this routers
app.use((req, res) => {
    console.error(`Requested resource ${req.method} &${req.url} not found...!`);
    res.status(404).send("Resource not found")
})

app.listen(port, () => {
    console.log(`server up at http://localhost:${port}/`)
})