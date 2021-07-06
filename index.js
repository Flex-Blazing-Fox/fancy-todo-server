require('dotenv').config()
const express = require('express')
const errHandler = require('./middleware/errHandler')
const app = express()
const PORT = process.env.PORT
const router = require('./router')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errHandler)

app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`)
})