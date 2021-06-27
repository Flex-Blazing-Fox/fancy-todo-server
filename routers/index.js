const router = require('express').Router()
const { authentication } = require('../middleware/auth')
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.use('/users', userRouter)
router.use('/todos', authentication, todoRouter)

module.exports = router