const router = require('express').Router()
const {authentication} = require('../middlewares/auth')
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const errorHandler = require('../middlewares/errorHandler')

router.use('/users',userRouter)
router.use(authentication)
router.use('/todos',todoRouter)
router.use(errorHandler)

module.exports = router