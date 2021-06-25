require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./router')

app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`)
})