const express = require('express')
const todos = require('./todos.js')
const users = require('./users.js')
const routers = express.Router()

routers.use('/todos', todos)
routers.use('/users', users)

module.exports = routers
