const router = require('express').Router()
const { authentication } = require('../middleware/auth')
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const gameRouter = require('./gemeRouter')

router.use('/users', userRouter)
router.use('/games', gameRouter)
router.use('/todos', authentication, todoRouter)


module.exports = router