if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const routers = require('./routers')
const errorHandlers = require('./helpers/errorHandlers')

const app = express()
const PORT = 5000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)
app.use(errorHandlers)

app.listen(PORT, () => console.log('listening on port ' + PORT))