const router = require('express').Router()
const todoRouter = require('./todoRouter')
const UserController = require('../controller/userController')

router.use('/todos', todoRouter)
router.post('/register', UserController.register)

module.exports = router