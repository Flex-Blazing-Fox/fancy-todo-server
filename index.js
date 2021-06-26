require('dotenv').config()
const express = require('express')
const errHandler = require('./middleware/errHandler')
const app = express()
const PORT = 3000
const router = require('./router')

app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errHandler)

app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`)
})