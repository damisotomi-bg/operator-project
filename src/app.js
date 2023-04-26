const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const usersRouter = require('./routes/usersRoutes/usersRoutes')
const operatorsRouter = require('./routes/operatorsRoutes/operatorsRoutes')
const statesRouter = require('./routes/statesRoutes/statesRoutes')
const loadStatesTable = require('./middleware/loadStatesTable')
const loadLgasTable = require('./middleware/loadLgasTable')


dotenv.config()
const port = process.env.PORT || process.env.port

const app = express()

//does the work of body parser. Helps us handle the input in the req body else we wouldnt be able to access the req.body object
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//configure cors
app.use(cors({ origin: /http:\/\/localhost/ }))
app.options('*', cors())

//use this if you want the loadtables function to be used as a middleware instead of a script
// app.use(loadStatesTable) 
// app.use(loadLgasTable)

app.get('/', (req, res) => {
    res.send("Ok")
})

app.use('/auth', usersRouter)
app.use('/operators', operatorsRouter)
app.use('/states', statesRouter)


//for when the client navigates to a route not listed in any of this routers
app.use((req, res) => {
    console.error(`Requested resource ${req.method} &${req.url} not found...!`);
    res.status(404).send("Resource not found")
})

app.listen(port, () => {
    console.log(`server up at http://localhost:${port}/`)
})