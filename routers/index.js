const express = require('express')
const todos = require('./todos.js')
const routers = express.Router()

routers.use('/todos', todos)

module.exports = routers
