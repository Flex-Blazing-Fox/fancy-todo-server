if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const routers = require('./routers')
const errorHandlers = require('./helpers/errorHandlers')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)
app.use(errorHandlers)

app.listen(PORT, () => console.log('listening on port ' + PORT))