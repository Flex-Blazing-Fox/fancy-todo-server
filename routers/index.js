const express = require('express')
const todos = require('./todos.js')
const users = require('./users.js')
const avatars = require('./avatars')
const routers = express.Router()

routers.use('/todos', todos)
routers.use('/users', users)
routers.use('/avatars', avatars)

module.exports = routers
